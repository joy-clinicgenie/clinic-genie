export interface AboutValue {
  title: string;
  body: string;
  accent: string;
}

export interface AboutWishPoint {
  title: string;
  highlight: string;
  body: string;
  href: string;
  image: string;
}

export interface AboutTrustedClient {
  name: string;
  services: string;
  href: string;
}

export interface AboutTeamRole {
  title: string;
  body: string;
}

export const ABOUT_VALUES: AboutValue[] = [
  {
    title: "Doctor and clinic-focused",
    body: "Our values shape everything, from how we treat you and your clinic to the work we produce.",
    accent: "#18C4D9",
  },
  {
    title: "Strong values",
    body: "We put clients first, listening closely and tailoring every wish to your goals.",
    accent: "#78E2DD",
  },
  {
    title: "Solution-oriented",
    body: "We thrive on conjuring creative answers to complex clinic marketing challenges.",
    accent: "#7DAFE3",
  },
  {
    title: "Data-driven",
    body: "We believe in measurable magic, efficient, accountable, and built to last.",
    accent: "#0E5F6B",
  },
];

export const ABOUT_WISH_POINTS: AboutWishPoint[] = [
  {
    title: "Be found",
    highlight: "found",
    body: "Show up where patient decisions begin.",
    href: "/services/core-pillars/healthcare-seo",
    image: "/about/found-everywhere.svg",
  },
  {
    title: "Be trusted",
    highlight: "trusted",
    body: "Communicate clearly and credibly, within Singapore's Healthcare Services Act (HCSA) guidelines.",
    href: "/services#compliance",
    image: "/compliance/compliance-aware.svg",
  },
  {
    title: "Be chosen",
    highlight: "chosen",
    body: "Turn search intent into qualified clinic enquiries.",
    href: "/contact",
    image: "/about/statistic.svg",
  },
];

export const ABOUT_APPROACH_STEPS = [
  {
    n: 1,
    title: "Discover",
    body: "Your clinic, patients, services, and goals.",
  },
  {
    n: 2,
    title: "Strategise",
    body: "The right keywords, channels, and content.",
  },
  {
    n: 3,
    title: "Create",
    body: "Website, copy, SEO content, visuals, campaigns.",
  },
  {
    n: 4,
    title: "Launch",
    body: "SEO, forms, tracking, and key checks live.",
  },
  {
    n: 5,
    title: "Optimise",
    body: "Measure, refine, and improve over time.",
  },
] as const;

export const ABOUT_TRUSTED_CLIENTS: AboutTrustedClient[] = [
  {
    name: "Cedar Endocrine Clinic",
    services: "Branding, photography, web, SEO, and SEM.",
    href: "https://www.cedar-endocrine.sg/",
  },
  {
    name: "The Heart Specialist Clinic",
    services: "Branding, photography, web, SEO, and SEM.",
    href: "https://www.theheartspecialistclinic.com.sg/",
  },
  {
    name: "Sunrise Heart Specialist Clinic",
    services: "Web, SEO, and SEM.",
    href: "https://www.sunriseheart.com.sg/",
  },
  {
    name: "Clementi Family and Aesthetic Clinic",
    services: "Branding, web, SEO, and SEM.",
    href: "https://www.clementiaesthetic.com/",
  },
  {
    name: "Medical and Surgical Dermatology Clinic",
    services: "Branding, web, SEO, and SEM.",
    href: "https://www.msdermatology.com.sg/",
  },
  {
    name: "The Acne Clinic",
    services: "Content, SEO, and SEM.",
    href: "/portfolio/the-acne-clinic",
  },
  {
    name: "Singapore Dental Implant Centre",
    services: "Web, SEO, and SEM.",
    href: "/contact",
  },
  {
    name: "Singapore Brain Spine Nerves",
    services: "Web, SEO, and SEM.",
    href: "/contact",
  },
  {
    name: "Joyful Seeds Paediatrics",
    services: "Branding, content, and design.",
    href: "/specialty-hub/paediatrics",
  },
  {
    name: "AquaPhysio",
    services: "Web, SEO, and content.",
    href: "/contact",
  },
];

export const ABOUT_TEAM_ROLES: AboutTeamRole[] = [
  {
    title: "Growth Strategist",
    body: "Maps the roadmap and keeps every wish grounded in research.",
  },
  {
    title: "SEO Specialist",
    body: "Helps patients find your clinic when they search.",
  },
  {
    title: "SEM Specialist",
    body: "Runs the paid campaigns that reach high-intent patients.",
  },
  {
    title: "Lead Designer",
    body: "Shapes brand, websites, and visuals that earn trust.",
  },
  {
    title: "Executive Designer",
    body: "Brings the day-to-day design and production to life.",
  },
  {
    title: "Content and Marketing",
    body: "Crafts the words, campaigns, and content behind the search.",
  },
  {
    title: "Web Developer",
    body: "Builds fast, clear clinic websites that convert.",
  },
  {
    title: "AI and Automation",
    body: "Keeps the magic efficient with smarter workflows.",
  },
];
