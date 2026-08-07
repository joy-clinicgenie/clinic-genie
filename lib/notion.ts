import "server-only";

import {
  Client,
  collectPaginatedAPI,
  isFullDatabase,
  isFullPage,
  type PageObjectResponse,
} from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

/**
 * Expected Notion Content database properties (Genie Tips):
 * - Name (title) — post title
 * - Slug (rich_text) — URL slug
 * - Ready to Publish (checkbox) — only `true` rows are public
 * - Publish Date (date) — publish date
 * - Excerpt / Meta Description (rich_text) — short summary for cards and metadata
 * - Tags (relation) — optional; resolved separately when needed
 * - Hide in Main Feed (checkbox) — optional feed exclusion
 */

export type NotionPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string | null;
  dateLabel: string | null;
  tags: string[];
  category: string | null;
};

export type NotionPostWithContent = NotionPost & {
  markdown: string;
};

function getEnv(name: "NOTION_TOKEN" | "NOTION_DATABASE_ID"): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function getNotionClient(): Client | null {
  const token = getEnv("NOTION_TOKEN");
  if (!token) return null;
  return new Client({ auth: token });
}

async function getDataSourceId(notion: Client): Promise<string | null> {
  const databaseId = getEnv("NOTION_DATABASE_ID");
  if (!databaseId) return null;

  const database = await notion.databases.retrieve({ database_id: databaseId });
  if (!isFullDatabase(database) || database.data_sources.length === 0) {
    return null;
  }

  return database.data_sources[0].id;
}

function plainText(
  richText: Array<{ plain_text: string }> | undefined
): string {
  if (!richText?.length) return "";
  return richText.map((item) => item.plain_text).join("").trim();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function formatDateLabel(isoDate: string | null): string | null {
  if (!isoDate) return null;

  const parsed = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return isoDate;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function getProperty(
  page: PageObjectResponse,
  names: string[]
): PageObjectResponse["properties"][string] | undefined {
  for (const name of names) {
    if (page.properties[name]) return page.properties[name];
  }
  return undefined;
}

function getTitle(page: PageObjectResponse): string {
  const property = getProperty(page, ["Name", "Title", "title"]);
  if (property?.type === "title") {
    return plainText(property.title) || "Untitled";
  }
  return "Untitled";
}

function getRichText(page: PageObjectResponse, names: string[]): string {
  const property = getProperty(page, names);
  if (property?.type === "rich_text") {
    return plainText(property.rich_text);
  }
  return "";
}

function getDate(page: PageObjectResponse): string | null {
  const property = getProperty(page, ["Date", "Published Date", "Publish Date"]);
  if (property?.type === "date") {
    return property.date?.start ?? null;
  }
  return page.created_time.slice(0, 10);
}

function getTags(page: PageObjectResponse): string[] {
  const property = getProperty(page, ["Tags", "Tag"]);
  if (property?.type === "multi_select") {
    return property.multi_select.map((tag) => tag.name);
  }
  if (property?.type === "select" && property.select?.name) {
    return [property.select.name];
  }
  return [];
}

function getCategory(page: PageObjectResponse): string | null {
  const property = getProperty(page, ["Category", "category"]);
  if (property?.type === "select") {
    return property.select?.name ?? null;
  }
  return null;
}

function getSlug(page: PageObjectResponse, title: string): string {
  const fromProperty = getRichText(page, ["Slug", "slug"]);
  if (fromProperty) return slugify(fromProperty);
  return slugify(title) || page.id.replace(/-/g, "");
}

export function mapPageToPost(page: PageObjectResponse): NotionPost {
  const title = getTitle(page);
  const date = getDate(page);
  const tags = getTags(page);
  const category = getCategory(page);

  return {
    id: page.id,
    title,
    slug: getSlug(page, title),
    description: getRichText(page, ["Description", "Summary", "Excerpt", "Dek"]),
    date,
    dateLabel: formatDateLabel(date),
    tags,
    category: category ?? tags[0] ?? null,
  };
}

function sortPostsByDateDesc(posts: NotionPost[]): NotionPost[] {
  return [...posts].sort((a, b) => {
    const aTime = a.date ? Date.parse(a.date) : 0;
    const bTime = b.date ? Date.parse(b.date) : 0;
    return bTime - aTime;
  });
}

/**
 * Fetches all published posts from the Notion Content database.
 * Prefers "Ready to Publish", with "Published" as a fallback for older schemas.
 */
const PUBLISH_CHECKBOX_PROPERTIES = [
  "Ready to Publish",
  "Published",
] as const;

export async function getPublishedPosts(): Promise<NotionPost[]> {
  const notion = getNotionClient();
  if (!notion) return [];

  let dataSourceId: string | null = null;
  try {
    dataSourceId = await getDataSourceId(notion);
  } catch {
    return [];
  }

  if (!dataSourceId) return [];

  try {
    let results: PageObjectResponse[] | null = null;

    for (const property of PUBLISH_CHECKBOX_PROPERTIES) {
      try {
        const queried = await collectPaginatedAPI(notion.dataSources.query, {
          data_source_id: dataSourceId,
          filter: {
            property,
            checkbox: {
              equals: true,
            },
          },
        });
        results = queried.filter(isFullPage);
        break;
      } catch {
        // Try the next known publish checkbox property name.
      }
    }

    if (!results) return [];

    const posts = results
      .map(mapPageToPost)
      .filter((post) => Boolean(post.slug));

    return sortPostsByDateDesc(posts);
  } catch {
    return [];
  }
}

/**
 * Fetches a single published post by slug, including Notion body as Markdown.
 */
export async function getPostBySlug(
  slug: string
): Promise<NotionPostWithContent | null> {
  const normalisedSlug = slugify(slug);
  if (!normalisedSlug) return null;

  const notion = getNotionClient();
  if (!notion) return null;

  const dataSourceId = await getDataSourceId(notion).catch(() => null);
  if (!dataSourceId) return null;

  let page: PageObjectResponse | null = null;

  try {
    for (const property of PUBLISH_CHECKBOX_PROPERTIES) {
      try {
        const results = await collectPaginatedAPI(notion.dataSources.query, {
          data_source_id: dataSourceId,
          filter: {
            and: [
              {
                property,
                checkbox: {
                  equals: true,
                },
              },
              {
                property: "Slug",
                rich_text: {
                  equals: normalisedSlug,
                },
              },
            ],
          },
        });
        page = results.find(isFullPage) ?? null;
        break;
      } catch {
        // Try the next known publish checkbox property name.
      }
    }
  } catch {
    // Slug property may be missing or differently typed; fall back below.
  }

  if (!page) {
    const published = await getPublishedPosts();
    const match = published.find((post) => post.slug === normalisedSlug);
    if (!match) return null;

    const retrieved = await notion.pages.retrieve({ page_id: match.id });
    if (!isFullPage(retrieved)) return null;
    page = retrieved;
  }

  const post = mapPageToPost(page);
  const n2m = new NotionToMarkdown({
    // notion-to-md types target an older Client shape; runtime API is compatible.
    notionClient: notion as unknown as ConstructorParameters<
      typeof NotionToMarkdown
    >[0]["notionClient"],
  });

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(
    convertToggleableHeadingsToDetails(mdBlocks)
  );
  const markdown = mdString.parent?.trim() ?? "";

  return {
    ...post,
    markdown,
  };
}

type NotionMdBlock = {
  type?: string;
  blockId: string;
  parent: string;
  children: NotionMdBlock[];
};

/**
 * Notion toggle headings become nested markdown (rendered as dark code blocks).
 * Remap them to notion-to-md's toggle type so they become <details> dropdowns.
 */
function convertToggleableHeadingsToDetails(
  blocks: NotionMdBlock[]
): NotionMdBlock[] {
  return blocks.map((block) => {
    const children = block.children?.length
      ? convertToggleableHeadingsToDetails(block.children)
      : [];

    const isToggleHeading =
      Boolean(children.length) &&
      (block.type === "heading_1" ||
        block.type === "heading_2" ||
        block.type === "heading_3");

    if (isToggleHeading) {
      return {
        ...block,
        type: "toggle",
        parent: block.parent
          .replace(/^#{1,6}\s+/, "")
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .replace(/__(.*?)__/g, "$1")
          .trim(),
        children,
      };
    }

    return {
      ...block,
      children,
    };
  });
}

/**
 * Returns slugs for ISR static path generation.
 */
export async function getPublishedPostSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((post) => post.slug);
}
