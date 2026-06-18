import type { Faq } from "@/lib/data/faqs";

export interface SpecialtyHubFaq extends Faq {
  link?: { label: string; href: string };
}

export interface SpecialtyHubCard {
  id: string;
  slug: string;
  name: string;
  /** Short orb-hover tagline on the landing specialist section */
  highlight: string;
  summary: string;
  iconId: string;
  published: boolean;
}

export interface SpecialtyHubDetail extends SpecialtyHubCard {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight?: string;
  heroBody: string;
  heroCta: { label: string; href: string };
  patientDiff: {
    subtitle: string;
    cards: { title: string; body: string }[];
  };
  searchCompare: {
    subtitle: string;
    title: string;
    intro: string;
    traditional: { title: string; body: string };
    aiSearch: { title: string; body: string };
    closing: string;
  };
  transformation: {
    subtitle: string;
    title: string;
    image: string;
    imageAlt: string;
    intro: string;
    anchor: { title: string; body: string };
    engine: { label: string }[];
    metricsIntro: string;
    metrics: string[];
    cta: { label: string; href: string };
  };
  routings: {
    subtitle: string;
    title: string;
    intro: string;
    links: { label: string; href: string }[];
  };
  compliance: {
    title: string;
    intro: string;
    bullets: string[];
  };
  faqs: SpecialtyHubFaq[];
  finalCta: {
    subtitle: string;
    title: string;
    body: string;
    cta: { label: string; href: string };
  };
}

export type SpecialtyHub = SpecialtyHubCard & Partial<Omit<SpecialtyHubDetail, keyof SpecialtyHubCard>>;

const PAEDIATRICS_DETAIL: Omit<SpecialtyHubDetail, keyof SpecialtyHubCard> = {
  metaTitle: "Paediatric Clinic Marketing Singapore | Growth for Children's Clinics | Clinic Genie",
  metaDescription:
    "Marketing growth systems built for paediatric clinics in Singapore. Clinic Genie helps children's clinics get found, trusted, and chosen, through SEO, branding, web, and compliant content.",
  heroEyebrow: "Paediatric Clinic Marketing",
  heroTitle: "Growth, conjured for children's clinics.",
  heroHighlight: "children's clinics",
  heroBody:
    "Parents do not search like everyone else. They search with worry, and choose with care. So we built a growth engine made only for paediatric clinics, tuned to how parents find, trust, and decide. Not a generic package. A wish granted for children's care.",
  heroCta: { label: "Make Your First Wish", href: "/contact" },
  patientDiff: {
    subtitle: "Why parents need a different approach",
    cards: [
      {
        title: "They search for someone else",
        body: "A parent is rarely searching for themselves. They are anxious, protective, and researching on behalf of a child who cannot speak for themselves. Every word has to earn a parent's trust first.",
      },
      {
        title: "They decide fast, then double-check",
        body: "Parents act quickly when worried, then verify everything: reviews, credentials, the clinic's tone. We make sure every signal reassures.",
      },
      {
        title: "They stay, or they leave",
        body: "A good paediatric experience creates a loyal family for years — siblings, vaccinations, growth. We help your clinic become the one they keep coming back to.",
      },
    ],
  },
  searchCompare: {
    subtitle: "How paediatric patients search now",
    title: "Two kinds of search. One growth engine.",
    intro:
      "We understand the exact search footprint of paediatric care, across both traditional search and the AI tools parents now turn to.",
    traditional: {
      title: "Traditional SEO",
      body: 'Commercial and clinical terms parents type into Google: "paediatrician Singapore," "child vaccination clinic near me," "paediatric clinic [area]," specific conditions and treatments.',
    },
    aiSearch: {
      title: "GEO and AI Search",
      body: 'Long-tail, question-based prompts parents ask ChatGPT, Gemini, and Perplexity: "Where can I treat my child\'s eczema in Singapore," "best paediatrician for ADHD assessment near me," "is my toddler\'s fever serious."',
    },
    closing: "We build your clinic to be found in both — the search bar and the answer engine.",
  },
  transformation: {
    subtitle: "A granted wish",
    title: "Joyful Seeds Paediatrics",
    image: "/works/joyfulseeds.png",
    imageAlt: "Joyful Seeds Paediatrics branding and website",
    intro:
      "Joyful Seeds wanted to grow, but growth needed a voice as warm and trustworthy as their care. That became the wish we granted first.",
    anchor: {
      title: "The Anchor: Branding and Copywriting",
      body: "We shaped a brand and voice built for parents — warm, clear, reassuring — that turns clinical expertise into words families trust at first read. Every line written to ease a worry and earn confidence, within HCSA and SMC guidelines.",
    },
    engine: [
      { label: "Healthcare SEO · So parents find Joyful Seeds the moment they search." },
      { label: "Web Design · A clear, mobile-first site that turns visits into enquiries." },
      { label: "Patient Education Content · Resources that build trust and reassure parents." },
      { label: "Social Media · Consistent, credible content that keeps the clinic close." },
    ],
    metricsIntro:
      "Magic means nothing without proof. So here is the proof. After we rebuilt Joyful Seeds' brand, website, and search engine, the numbers moved where they matter: visibility, reach, and efficiency.",
    metrics: [
      "Ad clicks nearly tripled, reaching over 8,000 a month as campaigns found more parents searching for paediatric care.",
      "Search impressions rose more than 40%, widening the clinic's visibility across paediatric search terms.",
      "Cost per click was cut by more than a quarter, stretching every dollar of the clinic's budget further.",
      "Website visits grew from a near standing start to over 6,000 a month, building to more than 60,000 across the year.",
    ],
    cta: { label: "Read the Full Joyful Seeds Story", href: "/portfolio" },
  },
  routings: {
    subtitle: "Growth never happens in silos",
    title: "The full engine behind paediatric growth.",
    intro:
      "Every paediatric clinic's growth draws on more than one service. Explore the systems that power it.",
    links: [
      {
        label: "Healthcare SEO",
        href: "/services/core-pillars/healthcare-seo",
      },
      {
        label: "Web Design and Development",
        href: "/services/core-pillars/web-design-development",
      },
      {
        label: "Medical SEM",
        href: "/services/core-pillars/medical-sem",
      },
    ],
  },
  compliance: {
    title: "Magic with a conscience.",
    intro: "Your reputation with families is everything, so we guard it.",
    bullets: [
      "Built within Singapore's HCSA, PHMC, and SMC guidelines, from the first draft.",
      "Human-verified, with no false promises, exaggerated claims, or testimonial misuse.",
    ],
  },
  faqs: [
    {
      q: "How is marketing for a paediatric clinic different?",
      a: "Parents decide protectively and emotionally. Paediatric marketing has to lead with warmth and trust, not just visibility, while staying fully compliant.",
      link: { label: "How to market a children's clinic", href: "/genie-tips" },
    },
    {
      q: "Can you help parents find my clinic in AI search?",
      a: "Yes. We structure your content so ChatGPT, Gemini, and Perplexity surface your clinic when parents ask for paediatric care.",
      link: { label: "How clinics appear in AI search", href: "/genie-tips/will-ai-search-kill-clinic-google-traffic" },
    },
    {
      q: "Is paediatric content compliant with HCSA rules?",
      a: "Yes. Every piece is built within Singapore's HCSA, PHMC, and SMC guidelines, with human review.",
      link: { label: "A guide to compliant clinic marketing", href: "/genie-tips/healthcare-advertising-rules-singapore" },
    },
    {
      q: "What makes good branding for a children's clinic?",
      a: "A voice that reassures parents and a look that feels safe and warm. We shape both around how families actually feel.",
      link: { label: "What healthcare branding really means", href: "/genie-tips/clinic-name-and-logo-patients-trust" },
    },
    {
      q: "How long until I see results?",
      a: "SEO builds over three to four months, while branding, web, and SEM can lift enquiries sooner. We build for both quick wins and lasting growth.",
      link: { label: "How clinic growth timelines work", href: "/genie-tips/first-90-days-of-clinic-growth" },
    },
  ],
  finalCta: {
    subtitle: "Ready to grow your paediatric clinic?",
    title: "What is your clinic's growth wish?",
    body: "Tell us about your clinic, your young patients, and the families you want to reach. No vague wishes. No confusing jargon. Just a clearer path to being found, trusted, and chosen.",
    cta: { label: "Make Your First Wish", href: "/contact" },
  },
};

export const SPECIALTY_HUBS: SpecialtyHub[] = [
  {
    id: "endocrinology",
    slug: "endocrinology",
    name: "Endocrinology",
    highlight: "Rank for lifelong conditions.",
    summary: "Growth systems for hormone and metabolic specialists — found when patients need answers fast.",
    iconId: "endocrinology",
    published: false,
  },
  {
    id: "cardiology",
    slug: "cardiology",
    name: "Cardiology",
    highlight: "Rank where patients look.",
    summary: "Marketing tuned to heart care — from symptom searches to specialist referrals.",
    iconId: "cardiology",
    published: false,
  },
  {
    id: "dermatology",
    slug: "dermatology",
    name: "Aesthetic + Dermatology",
    highlight: "Paid ads, ready patients.",
    summary: "Visibility and trust for skin and aesthetic clinics — compliant, credible, conversion-ready.",
    iconId: "dermatology",
    published: false,
  },
  {
    id: "dental",
    slug: "dental",
    name: "Dental + Orthodontics",
    highlight: "Win comparison shoppers.",
    summary: "Local discovery and family trust for dental practices that patients choose for the long term.",
    iconId: "dental",
    published: false,
  },
  {
    id: "ophthalmology",
    slug: "ophthalmology",
    name: "Ophthalmology",
    highlight: "Be found when patients search symptoms.",
    summary: "Search and brand systems for eye care — clear paths from symptoms to your clinic door.",
    iconId: "ophthalmology",
    published: false,
  },
  {
    id: "paediatrics",
    slug: "paediatrics",
    name: "Paediatrics",
    highlight: "A voice parents trust.",
    summary: "Growth engines built for children's clinics — how parents find, trust, and choose.",
    iconId: "paediatrics",
    published: true,
    ...PAEDIATRICS_DETAIL,
  },
  {
    id: "acne",
    slug: "acne",
    name: "Acne Specialist",
    highlight: "Meet patients on social.",
    summary: "Targeted marketing for acne and skin-condition clinics — where anxious patients search first.",
    iconId: "acne",
    published: false,
  },
  {
    id: "neurology",
    slug: "neurology",
    name: "Neurology + Neurosurgery",
    highlight: "A clear, navigable site.",
    summary: "Specialist visibility for complex neurological care — clarity when patients need reassurance.",
    iconId: "neurology",
    published: false,
  },
  {
    id: "aquatic-physio",
    slug: "aquatic-physio",
    name: "Aquatic Physiotherapy",
    highlight: "Show the road to recovery.",
    summary: "Niche discovery for aquatic rehab — reaching patients searching for a different kind of recovery.",
    iconId: "aquatic-physio",
    published: false,
  },
];

export function getSpecialtyHub(slug: string): SpecialtyHub | undefined {
  return SPECIALTY_HUBS.find((hub) => hub.slug === slug);
}

export function getPublishedSpecialtyHubs(): SpecialtyHub[] {
  return SPECIALTY_HUBS.filter((hub) => hub.published);
}

export function getSpecialtyHubHref(hub: SpecialtyHubCard): string {
  return hub.published ? `/specialty-hub/${hub.slug}` : "/specialty-hub";
}

export function isSpecialtyHubDetail(hub: SpecialtyHub): hub is SpecialtyHubDetail {
  return hub.published && Boolean(hub.heroTitle);
}
