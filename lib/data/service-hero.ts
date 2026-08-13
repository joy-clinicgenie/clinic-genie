export type ServiceVisualVariant =
  | "right"
  | "centre"
  | "full-width"
  | "bottom-overflow"
  | "layered";

export type ServiceVisualKind = "image" | "serp" | "campaign";

export type ServiceHeroSurface = "white" | "mist" | "cyan";

export interface ServiceHeroVisualConfig {
  variant: ServiceVisualVariant;
  kind: ServiceVisualKind;
  src?: string;
  alt?: string;
  imageClassName?: string;
  surface: ServiceHeroSurface;
}

const DEFAULT_CONFIG: ServiceHeroVisualConfig = {
  variant: "right",
  kind: "image",
  surface: "white",
};

/** Per-service mobile visual-zone art direction. Desktop still uses pillar hero images. */
export const SERVICE_HERO_VISUAL: Record<string, ServiceHeroVisualConfig> = {
  findclinic: {
    variant: "right",
    kind: "image",
    src: "/services/findclinic-hero.png",
    alt: "FindClinic.sg clinic listing interface on tablet and phone",
    imageClassName: "object-cover object-[70%_center]",
    surface: "white",
  },
  "healthcare-seo": {
    variant: "right",
    kind: "serp",
    surface: "mist",
  },
  "medical-sem": {
    variant: "layered",
    kind: "campaign",
    surface: "mist",
  },
  "branding-copywriting": {
    variant: "centre",
    kind: "image",
    src: "/services/branding-copywriting-hero.png",
    alt: "Brand and content system materials for specialist clinic marketing",
    imageClassName: "object-cover object-[60%_center]",
    surface: "white",
  },
  "web-design-development": {
    variant: "right",
    kind: "image",
    src: "/services/web-design-development-hero.png",
    alt: "Clinic website interface on a desktop in a specialist clinic setting",
    imageClassName: "object-cover object-[80%_center]",
    surface: "white",
  },
  "photo-video": {
    variant: "full-width",
    kind: "image",
    src: "/services/photo-video-hero.png",
    alt: "Clinic photography and film production in a healthcare setting",
    imageClassName: "object-cover object-center",
    surface: "white",
  },
  "social-media": {
    variant: "bottom-overflow",
    kind: "image",
    src: "/services/social-media-hero.png",
    alt: "Clinic social content shown across mobile screens",
    imageClassName: "object-cover object-[65%_center]",
    surface: "cyan",
  },
  "geo-ai-search": {
    variant: "layered",
    kind: "image",
    src: "/services/geo-ai-search-hero.png",
    alt: "Structured AI search and answer-engine presentation",
    imageClassName: "object-cover object-[center_40%]",
    surface: "mist",
  },
};

export function getServiceHeroVisual(slug: string): ServiceHeroVisualConfig {
  return SERVICE_HERO_VISUAL[slug] ?? DEFAULT_CONFIG;
}
