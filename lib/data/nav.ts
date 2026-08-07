export interface NavDropdownItem {
  title: string;
  description: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavDropdownItem[];
  /** When true, label is shown but not linked (e.g. coming soon). */
  disabled?: boolean;
}

export const SERVICES_DROPDOWN: NavDropdownItem[] = [
  {
    title: "FindClinic.sg",
    description: "Verified clinic discovery for patients across Singapore.",
    href: "/services/core-pillars/findclinic",
  },
  {
    title: "Healthcare SEO",
    description: "Organic search visibility for specialty care searches.",
    href: "/services/core-pillars/healthcare-seo",
  },
  {
    title: "Medical SEM",
    description: "Paid search that reaches ready-to-enquire patients.",
    href: "/services/core-pillars/medical-sem",
  },
  {
    title: "Branding + Copywriting",
    description: "Clear clinic voice, identity, and trust-led messaging.",
    href: "/services/core-pillars/branding-copywriting",
  },
  {
    title: "Web Design + Development",
    description: "Fast, accessible clinic websites built to convert.",
    href: "/services/core-pillars/web-design-development",
  },
  {
    title: "Photo + Video",
    description: "Real clinic visuals that build instant credibility.",
    href: "/services/core-pillars/photo-video",
  },
  {
    title: "Social Media",
    description: "Ongoing presence that keeps your clinic top of mind.",
    href: "/services/core-pillars/social-media",
  },
  {
    title: "GEO + AI Search",
    description: "Structure your clinic for AI answers and discovery.",
    href: "/services/core-pillars/geo-ai-search",
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: SERVICES_DROPDOWN,
  },
  { label: "Clinic Specialties", href: "/specialty-hub" },
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
