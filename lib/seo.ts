import type { Metadata } from "next";
import { SITE } from "@/lib/data/nav";

const TITLE_SUFFIX = " | Clinic Genie";

/** File-based OG/Twitter image route (see app/opengraph-image.tsx). */
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

export const DEFAULT_OG_IMAGE = {
  url: DEFAULT_OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "Clinic Genie. Strategies for specialist clinic growth in Singapore.",
} as const;

export const DEFAULT_KEYWORDS = [
  "healthcare SEO",
  "medical SEM",
  "clinic websites",
  "specialist clinic marketing",
  "AI search readiness",
  "clinic marketing Singapore",
] as const;

export interface PageSeoInput {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  index?: boolean;
  follow?: boolean;
  ogType?: "website" | "article";
  /** Use the title as-is. Skip the root `%s | Clinic Genie` template. */
  absoluteTitle?: boolean;
  image?: string;
  publishedTime?: string;
}

function sanitiseMetaText(value: string): string {
  return value.replace(/\s*—\s*/g, ". ").replace(/—/g, ", ").trim();
}

function withBrand(title: string): string {
  if (title.includes("Clinic Genie")) return title;
  return `${title}${TITLE_SUFFIX}`;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  index = true,
  follow = true,
  ogType = "website",
  absoluteTitle = false,
  image,
  publishedTime,
}: PageSeoInput): Metadata {
  const cleanTitle = sanitiseMetaText(title);
  const cleanDescription = sanitiseMetaText(description);
  const socialTitle = absoluteTitle ? cleanTitle : withBrand(cleanTitle);
  const canonical = path
    ? path === "/"
      ? "/"
      : path.startsWith("/")
        ? path
        : `/${path}`
    : undefined;
  const ogImages = image
    ? [{ url: image, width: 1200, height: 630, alt: socialTitle }]
    : [DEFAULT_OG_IMAGE];

  return {
    title: absoluteTitle ? { absolute: cleanTitle } : cleanTitle,
    description: cleanDescription,
    keywords: keywords && keywords.length > 0 ? [...keywords] : undefined,
    alternates: canonical ? { canonical } : undefined,
    robots:
      index && follow
        ? undefined
        : {
            index,
            follow,
          },
    openGraph: {
      title: socialTitle,
      description: cleanDescription,
      url: canonical,
      siteName: SITE.name,
      locale: "en_SG",
      type: ogType,
      images: ogImages,
      ...(ogType === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: cleanDescription,
      images: image ? [image] : [DEFAULT_OG_IMAGE_PATH],
    },
  };
}
