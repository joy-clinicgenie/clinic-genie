export interface NavDropdownItem {
  title: string;
  description: string;
  href: string;
}

export interface ServicesNavGroup {
  id: string;
  label: string;
  items: NavDropdownItem[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavDropdownItem[];
  /** When true, label is shown but not linked (e.g. coming soon). */
  disabled?: boolean;
}

export const SERVICES_GROUPS: ServicesNavGroup[] = [
  {
    id: "discovery-growth",
    label: "Discovery + Growth",
    items: [
      {
        title: "FindClinic.sg",
        description: "Support healthcare discovery across Singapore.",
        href: "/services/core-pillars/findclinic",
      },
      {
        title: "Healthcare SEO",
        description: "Be found for specialist care searches.",
        href: "/services/core-pillars/healthcare-seo",
      },
      {
        title: "Medical SEM",
        description: "Reach patients actively looking for care.",
        href: "/services/core-pillars/medical-sem",
      },
      {
        title: "GEO + AI Search",
        description: "Build visibility across AI search and answers.",
        href: "/services/core-pillars/geo-ai-search",
      },
    ],
  },
  {
    id: "brand-experience",
    label: "Brand + Experience",
    items: [
      {
        title: "Branding + Copywriting",
        description: "Clear positioning, identity and clinic messaging.",
        href: "/services/core-pillars/branding-copywriting",
      },
      {
        title: "Web Design + Development",
        description: "Clinic websites built for clarity and conversion.",
        href: "/services/core-pillars/web-design-development",
      },
      {
        title: "Photo + Video",
        description: "Authentic clinic visuals that build credibility.",
        href: "/services/core-pillars/photo-video",
      },
      {
        title: "Social Media",
        description: "Maintain a consistent and relevant presence.",
        href: "/services/core-pillars/social-media",
      },
    ],
  },
];

/** Flat list for mobile nav and any consumers that need a single array. */
export const SERVICES_DROPDOWN: NavDropdownItem[] = SERVICES_GROUPS.flatMap(
  (group) => group.items
);

export const NAV_ITEMS: NavItem[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: SERVICES_DROPDOWN,
  },
  { label: "Clinic Specialties", href: "/clinic-specialties" },
  { label: "Our Works", href: "/portfolio" },
  { label: "Genie Tips", href: "/genie-tips" },
];

export const SERVICES_PILLARS_INDEX = {
  label: "View all services",
  href: "/services",
} as const;

export const PRIMARY_CTA = { label: "Make Your First Wish", href: "/contact" };

export const SITE = {
  name: "Clinic Genie",
  tagline: "Wishes, granted with data.",
  description:
    "A Singapore creative + marketing agency built only for private and specialist medical clinics. Healthcare SEO, medical SEM, clinic websites, content, AI search and compliance-aware strategy.",
  email: "hello@clinic-genie.com",
  address: "164 Bukit Merah Central, #03-3625, Singapore 150164",
  socials: {
    facebook: "https://www.facebook.com/people/Clinic-Genie/61552138754085/",
    instagram: "https://www.instagram.com/clinicgeniesg",
    linkedin: "https://www.linkedin.com/company/clinicgenie",
  },
  url: "https://clinicgenie-site.vercel.app/",
};
