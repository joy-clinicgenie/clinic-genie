export interface ProcessStep {
  n: number;
  title: string;
  body: string;
  deliverable?: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    n: 1,
    title: "Strategy & Research",
    body: "We study your specialty, your market, your competitors and what your patients actually search for. No guesswork — just data.",
    deliverable: "Your growth roadmap.",
  },
  {
    n: 2,
    title: "Implementation & Design",
    body: "We build the assets that win: fast clinic websites, ranking content, compliant campaigns and a brand that earns trust.",
    deliverable: "Live, working growth assets.",
  },
  {
    n: 3,
    title: "Results & Optimisation",
    body: "We measure, report transparently, and refine every month. Rankings rise, enquiries climb, and you see exactly why.",
    deliverable: "Rising rankings, more enquiries, and a report you can actually read.",
  },
];

/** Homepage scroll-driven 5-step process (MagicProcess) */
export const HOME_PROCESS_STEPS: ProcessStep[] = [
  {
    n: 1,
    title: "Discover",
    body: "Understand your clinic, patients, services, and goals.",
  },
  {
    n: 2,
    title: "Strategise",
    body: "Build a roadmap around search intent and growth priorities.",
  },
  {
    n: 3,
    title: "Create",
    body: "Produce the website, content, campaigns, and visuals.",
  },
  {
    n: 4,
    title: "Launch",
    body: "Go live with SEO, tracking, forms, and key checks in place.",
  },
  {
    n: 5,
    title: "Optimise",
    body: "Measure, refine, and improve over time.",
  },
];

export const FOOTER_SERVICES = [
  { label: "Healthcare SEO", href: "/services/core-pillars/healthcare-seo" },
  { label: "Medical SEM & Paid Ads", href: "/services/core-pillars/medical-sem" },
  { label: "Clinic Websites & Web Dev", href: "/services/core-pillars/web-design-development" },
  { label: "Content & Copywriting", href: "/services/core-pillars/branding-copywriting" },
  { label: "AI Search Optimisation", href: "/services/core-pillars/geo-ai-search" },
  { label: "Branding & Logo Design", href: "/services/core-pillars/branding-copywriting" },
  { label: "Photography & Video", href: "/services/core-pillars/photo-video" },
];
