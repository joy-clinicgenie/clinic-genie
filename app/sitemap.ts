import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data/nav";
import { CASE_STUDIES } from "@/lib/data/portfolio";
import { POSTS } from "@/lib/data/posts";
import { getPublishedSpecialtyHubs } from "@/lib/data/specialty-hubs";

const BASE = SITE.url;
const lastModified = new Date("2026-06-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/specialty-hub",
    "/portfolio",
    "/genie-tips",
    "/meet-us",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const caseStudyRoutes = CASE_STUDIES.map((study) => `/portfolio/${study.slug}`);
  const postRoutes = POSTS.map((post) => `/genie-tips/${post.slug}`);
  const specialtyHubRoutes = getPublishedSpecialtyHubs().map((hub) => `/specialty-hub/${hub.slug}`);

  return [...staticRoutes, ...caseStudyRoutes, ...postRoutes, ...specialtyHubRoutes].map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    lastModified,
  }));
}
