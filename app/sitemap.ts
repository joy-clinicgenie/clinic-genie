import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data/nav";
import { CASE_STUDIES } from "@/lib/data/portfolio";
import { POSTS } from "@/lib/data/posts";

const BASE = SITE.url;
const lastModified = new Date("2026-06-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/portfolio",
    "/genie-tips",
    "/meet-us",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const caseStudyRoutes = CASE_STUDIES.map((study) => `/portfolio/${study.slug}`);
  const postRoutes = POSTS.map((post) => `/genie-tips/${post.slug}`);

  return [...staticRoutes, ...caseStudyRoutes, ...postRoutes].map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    lastModified,
  }));
}
