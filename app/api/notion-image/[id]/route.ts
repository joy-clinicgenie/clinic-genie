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
    if (!sourceUrl) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const upstream = await fetch(sourceUrl, { cache: "no-store" });
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Failed to fetch Notion image" },
        { status: 502 }
      );
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
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
