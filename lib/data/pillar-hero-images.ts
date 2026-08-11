/** Hero backgrounds for services core-pillar subpages (`public/services`). */
export const PILLAR_HERO_IMAGES: Record<string, string> = {
  findclinic: "/services/findclinic-hero.png",
  "branding-copywriting": "/services/branding-copywriting-hero.png",
  "web-design-development": "/services/web-design-development-hero.png",
  "photo-video": "/services/photo-video-hero.png",
  "social-media": "/services/social-media-hero.png",
  "geo-ai-search": "/services/geo-ai-search-hero.png",
};

/** Optional per-pillar object-position / crop overrides for the hero image. */
export const PILLAR_HERO_IMAGE_CLASS: Record<string, string> = {
  "web-design-development":
    "object-cover object-[85%_center] lg:object-[100%_center] lg:translate-x-[6%]",
};

const DEFAULT_HERO_IMAGE_CLASS =
  "object-cover object-center lg:object-right";

export function getPillarHeroImage(slug: string): string | undefined {
  return PILLAR_HERO_IMAGES[slug];
}

export function getPillarHeroImageClass(slug: string): string {
  return PILLAR_HERO_IMAGE_CLASS[slug] ?? DEFAULT_HERO_IMAGE_CLASS;
}
