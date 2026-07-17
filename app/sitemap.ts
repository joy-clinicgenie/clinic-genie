import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data/nav";
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
    "/contact",
    "/terms",
  ];

  const specialtyHubRoutes = getPublishedSpecialtyHubs().map((hub) => `/specialty-hub/${hub.slug}`);

  return [...staticRoutes, ...specialtyHubRoutes].map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    lastModified,
  }));
}
