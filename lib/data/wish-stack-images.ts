export interface WishStackImage {
  src: string;
  alt: string;
}

export const WISH_STACK_IMAGES: Record<string, WishStackImage> = {
  findclinic: {
    src: "/wishes/findclinic.png",
    alt: "FindClinic.sg platform preview",
  },
  "healthcare-seo": {
    src: "/wishes/healthcare-seo.png",
    alt: "Healthcare SEO for specialist clinics",
  },
  "medical-sem": {
    src: "/wishes/medical-sem.png",
    alt: "Medical SEM and paid search campaigns",
  },
  "branding-copywriting": {
    src: "/wishes/branding-copywriting.png",
    alt: "Clinic branding and copywriting",
  },
  "web-design-development": {
    src: "/wishes/web-design-development.png",
    alt: "Clinic website design and development",
  },
  "photo-video": {
    src: "/wishes/photo-video.png",
    alt: "Healthcare photography and video",
  },
  "social-media": {
    src: "/wishes/social-media.png",
    alt: "Social media for specialist clinics",
  },
  "geo-ai-search": {
    src: "/wishes/geo-ai-search.png",
    alt: "GEO and AI search optimisation",
  },
};
