export interface SubService {
  name: string;
  body: string;
}

export interface Pillar {
  id: "strategy" | "growth" | "brand";
  number: string;
  wish: string;
  title: string;
  blurb: string;
  intro: string;
  outcome: string;
  services: SubService[];
  href: string;
  accent: string;
}

export const PILLARS: Pillar[] = [
  {
    id: "strategy",
    number: "01",
    wish: "I wish my clinic had a clear path to grow.",
    title: "Business Strategy & Development",
    blurb:
      "Know exactly where to grow. Market research, strategic planning, and partnership & grant consultancy that point your clinic at the right opportunity.",
    intro: "Grow on purpose, not by accident. We find the opportunity before we spend a dollar chasing it.",
    outcome: "You'll know exactly where your next patients will come from.",
    services: [
      {
        name: "Market Research",
        body: "Understand your patients, competitors and the searches that signal real demand in your specialty.",
      },
      {
        name: "Strategic Planning",
        body: "A clear, prioritised roadmap for the next 6–12 months, tied to revenue, not vanity metrics.",
      },
      {
        name: "Partnership & Grant Consultancy",
        body: "Tap government grants and the right partners (with Real Inbound) to fund and accelerate your growth.",
      },
    ],
    href: "/services#strategy",
    accent: "#6CBAD9",
  },
  {
    id: "growth",
    number: "02",
    wish: "I wish the right patients could find me online.",
    title: "Digital Growth Solutions",
    blurb:
      "Be the clinic patients find first. Healthcare SEO, medical SEM, conversion copywriting and lead generation that fill your appointment book.",
    intro: "Be the clinic patients find first — and the one they choose.",
    outcome: "More qualified enquiries, every month, measured transparently.",
    services: [
      {
        name: "Healthcare SEO",
        body: "Rank for the high-intent treatment searches patients actually type, with compliance-aware, doctor-reviewed content.",
      },
      {
        name: "Medical SEM (Paid Search)",
        body: "Targeted Google campaigns that bring in bookings, not just clicks — managed to a cost-per-enquiry you can live with.",
      },
      {
        name: "Copywriting",
        body: "Patient-first, compliant copy that explains, reassures and converts.",
      },
      {
        name: "Lead Generation",
        body: "Landing pages, funnels and tracking that turn interest into booked consultations.",
      },
    ],
    href: "/services#growth",
    accent: "#7FE9F0",
  },
  {
    id: "brand",
    number: "03",
    wish: "I wish my brand looked as good as my care.",
    title: "Brand & Experience Design",
    blurb:
      "Look as good as your outcomes. Branding & logo design, clinic websites, and photography & video that make patients trust you on sight.",
    intro: "Trust is decided in seconds. We make those seconds count.",
    outcome: "Patients trust you on sight, and the booking feels inevitable.",
    services: [
      {
        name: "Branding & Logo Design",
        body: "A distinctive, premium clinic identity that signals quality before a word is read.",
      },
      {
        name: "Web Design & Development",
        body: "Fast, accessible, conversion-focused clinic websites built on a modern stack (Next.js).",
      },
      {
        name: "Photography & Video",
        body: "Real clinic visuals — your space, your team, your work — that build instant credibility.",
      },
    ],
    href: "/services#brand",
    accent: "#8E7BE8",
  },
];

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
  { label: "Healthcare SEO", href: "/services#growth" },
  { label: "Medical SEM & Paid Ads", href: "/services#growth" },
  { label: "Clinic Websites & Web Dev", href: "/services#brand" },
  { label: "Content & Copywriting", href: "/services#growth" },
  { label: "AI Search Optimisation", href: "/services#growth" },
  { label: "Branding & Logo Design", href: "/services#brand" },
  { label: "Photography & Video", href: "/services#brand" },
];
