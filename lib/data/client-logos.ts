export interface ClientLogo {
  src: string;
  alt: string;
  href: string;
  width: number;
  height: number;
  /** Use a slightly taller marquee size for logos that read small at the default height */
  size?: "default" | "lg" | "xl";
}

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    src: "/clients/cedar-endocrine.png",
    alt: "Cedar Endocrine Clinic",
    href: "https://www.cedar-endocrine.sg/",
    width: 680,
    height: 180,
  },
  {
    src: "/clients/sunrise-heart.png",
    alt: "Sunrise Heart Clinic",
    href: "https://www.sunriseheart.com.sg/",
    width: 669,
    height: 180,
  },
  {
    src: "/clients/medical-surgical-dermatology.png",
    alt: "Medical & Surgical Dermatology",
    href: "https://www.msdermatology.com.sg/",
    width: 1102,
    height: 180,
  },
  {
    src: "/clients/joyful-seeds.png",
    alt: "Joyful Seeds Paediatric & Developmental Clinic",
    href: "/specialty-hub/paediatrics",
    width: 503,
    height: 180,
    size: "lg",
  },
  {
    src: "/clients/singapore-brain-spine-nerves-center.png",
    alt: "Singapore Brain Spine Nerves Center",
    href: "/specialty-hub/neurology",
    width: 446,
    height: 180,
    size: "lg",
  },
  {
    src: "/clients/singapore-dental-implant-centre.png",
    alt: "Singapore Dental Implant Centre",
    href: "/specialty-hub/dental",
    width: 451,
    height: 180,
    size: "lg",
  },
  {
    src: "/clients/aquaphysio-rehab-center.png",
    alt: "AquaPhysio Rehab Centre",
    href: "/specialty-hub/aquatic-physio",
    width: 156,
    height: 180,
    size: "lg",
  },
  {
    src: "/clients/the-straits-geriatrics-centre.png",
    alt: "The Straits Geriatrics Centre",
    href: "/portfolio",
    width: 712,
    height: 180,
    size: "lg",
  },
  {
    src: "/clients/the-acne-clinic.png",
    alt: "The Acne Clinic",
    href: "/specialty-hub/acne",
    width: 291,
    height: 180,
    size: "xl",
  },
  {
    src: "/clients/clementi-family-aesthetic.png",
    alt: "Clementi Family & Aesthetic Clinic",
    href: "https://www.clementiaesthetic.com/",
    width: 819,
    height: 180,
  },
];
