export interface WishStackImage {
  src: string;
  alt: string;
  className?: string;
}

export const WISH_STACK_IMAGES: Record<string, WishStackImage> = {
  findclinic: {
    src: "/services/findclinic-hero-mobile.png",
    alt: "FindClinic.sg clinic listing interface on tablet and phone",
    className: "object-cover object-center",
  },
  "healthcare-seo": {
    src: "/services/healthcare-seo.png",
    alt: "Healthcare SEO for specialist clinics",
    className: "object-cover object-[center_30%]",
  },
  "medical-sem": {
    src: "/services/medical-sem.png",
    alt: "Medical SEM and paid search campaigns",
    className: "object-cover object-[center_40%]",
  },
  "branding-copywriting": {
    src: "/services/branding-copywriting-hero.png",
    alt: "Clinic branding and copywriting",
    className: "object-cover object-[60%_center]",
  },
  "web-design-development": {
    src: "/services/web-design-development-hero.png",
    alt: "Clinic website design and development",
    className: "object-cover object-[80%_center]",
  },
  "photo-video": {
    src: "/services/photo-video-hero.png",
    alt: "Healthcare photography and video",
    className: "object-cover object-center",
  },
  "social-media": {
    src: "/services/social-media-hero.png",
    alt: "Social media for specialist clinics",
    className: "object-cover object-[65%_center]",
  },
  "geo-ai-search": {
    src: "/services/geo-ai-search-hero.png",
    alt: "GEO and AI search optimisation",
    className: "object-cover object-[center_40%]",
  },
};
