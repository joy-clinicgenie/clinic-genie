export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Specialty Hub", href: "/specialty-hub" },
  { label: "Our Works", href: "/portfolio" },
  { label: "Genie Tips", href: "/genie-tips" },
  { label: "Meet Us", href: "/meet-us" },
];

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
