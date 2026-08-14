import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data/nav";
import { CASE_STUDIES } from "@/lib/data/portfolio";
import { CORE_PILLARS } from "@/lib/data/pillars";
import { getPublishedSpecialtyHubs, isSpecialtyHubDetail } from "@/lib/data/specialty-hubs";
import { getPublishedPosts } from "@/lib/notion";

const BASE = SITE.url.replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/clinic-specialties",
    "/portfolio",
    "/genie-tips",
    "/contact",
    "/terms-privacy",
  ];

  const pillarRoutes = CORE_PILLARS.map(
    (pillar) => `/services/core-pillars/${pillar.slug}`
  );

  const specialtyHubRoutes = getPublishedSpecialtyHubs()
    .filter(isSpecialtyHubDetail)
    .map((hub) => `/clinic-specialties/${hub.slug}`);

  const portfolioRoutes = CASE_STUDIES.map((study) => `/portfolio/${study.slug}`);

  let genieTipRoutes: string[] = [];
  try {
    const posts = await getPublishedPosts();
    genieTipRoutes = posts
      .filter((post) => !post.noIndex)
      .map((post) => `/genie-tips/${post.slug}`);
  } catch {
    // Notion may be unavailable during local builds without credentials.
  }

  const paths = [
    ...staticRoutes,
    ...pillarRoutes,
    ...specialtyHubRoutes,
    ...portfolioRoutes,
    ...genieTipRoutes,
  ];

  return paths.map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    lastModified,
  }));
}
