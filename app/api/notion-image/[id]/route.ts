import { Client, isFullBlock, isFullPage } from "@notionhq/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 3600;

function getNotionClient(): Client | null {
  const token = process.env.NOTION_TOKEN?.trim();
  if (!token) return null;
  return new Client({ auth: token });
}

function extractFileUrl(
  file:
    | { type: "external"; external: { url: string } }
    | { type: "file"; file: { url: string } }
    | null
    | undefined
): string | null {
  if (!file) return null;
  if (file.type === "external") return file.external.url;
  if (file.type === "file") return file.file.url;
  return null;
}

function isSafeUpstreamImageUrl(urlString: string): boolean {
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;

  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host === "127.0.0.1" ||
    host === "::1"
  ) {
    return false;
  }

  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (ipv4) {
    const octets = ipv4.slice(1, 5).map(Number);
    const [a, b] = octets;
    if (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    ) {
      return false;
    }
  }

  if (host.includes(":")) return false;

  return true;
}

async function resolveNotionImageUrl(id: string): Promise<string | null> {
  const notion = getNotionClient();
  if (!notion) return null;

  if (id.startsWith("cover-")) {
    const pageId = id.slice("cover-".length);
    const page = await notion.pages.retrieve({ page_id: pageId });
    if (!isFullPage(page)) return null;
    return extractFileUrl(page.cover);
  }

  const block = await notion.blocks.retrieve({ block_id: id });
  if (!isFullBlock(block) || block.type !== "image") return null;
  return extractFileUrl(block.image);
}

export async function GET(
  _request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id?.trim();
  if (!id) {
    return NextResponse.json({ error: "Missing image id" }, { status: 400 });
  }

  try {
    const sourceUrl = await resolveNotionImageUrl(id);
    if (!sourceUrl || !isSafeUpstreamImageUrl(sourceUrl)) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const upstream = await fetch(sourceUrl, { cache: "no-store", redirect: "error" });
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Failed to fetch Notion image" },
        { status: 502 }
      );
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (!contentType.toLowerCase().startsWith("image/")) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to resolve Notion image" },
      { status: 500 }
    );
  }
}
