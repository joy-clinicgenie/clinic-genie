import type { Faq } from "@/lib/data/faqs";

export type SpecialtyHubFaq = Faq;

export interface SpecialtyHubCard {
  id: string;
  slug: string;
  name: string;
  /** Short orb-hover tagline on the landing specialist section */
  highlight: string;
  summary: string;
  /** Card graphic under /public/specialty-hub */
  image: string;
  published: boolean;
  /** Future Genie Tips article. Cards stay unlinked until this is set. */
  blogHref?: string;
}

export interface SpecialtyHubDetail extends SpecialtyHubCard {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight?: string;
  heroLabel?: string;
  heroBody: string;
  heroImage?: string;
  heroCta: { label: string; href: string };
  heroSecondaryCta: { label: string; href: string };
  patientDiff: {
    kicker: string;
    title: string;
    highlight?: string;
    subtitle: string;
    cards: { title: string; body: string }[];
  };
  searchCompare: {
    kicker: string;
    title: string;
    highlight?: string;
    intro: string;
    closing: string;
    cards: { title: string; body: string }[];
  };
  transformation: {
    subtitle: string;
    title: string;
    highlight?: string;
    image: string;
    imageAlt: string;
    intro: string;
    accent: string;
    anchor: { title: string; body: string };
    engineKicker: string;
    engineClosing: string;
    engine: { title: string; body: string }[];
    metricsKicker: string;
    metricsTitle: string;
    metricsHighlight?: string;
    metricsIntro: string;
    metricsClosing: string;
    metrics: { title: string; body: string }[];
    cta: { label: string; href: string };
  };
  routings: {
    subtitle: string;
    title: string;
    highlight?: string;
    intro: string;
    links: { label: string; href: string }[];
  };
  compliance: {
    kicker: string;
    title: string;
    highlight?: string;
    intro: string;
    points: { title: string; body: string }[];
  };
  faqs: SpecialtyHubFaq[];
  finalCta: {
    subtitle: string;
    title: string;
    highlight?: string;
    body: string;
    cta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    footnote?: string;
  };
}

export type SpecialtyHub = SpecialtyHubCard & Partial<Omit<SpecialtyHubDetail, keyof SpecialtyHubCard>>;

const PAEDIATRICS_DETAIL: Omit<SpecialtyHubDetail, keyof SpecialtyHubCard> = {
  metaTitle: "Joyful Seeds Paediatric & Developmental Clinic | Clinic Specialties | Clinic Genie",
  metaDescription:
    "A new paediatric clinic launched into Bukit Timah with a brand, a search footprint, and a listed presence from day one. See how Clinic Genie granted the growth wish.",
  heroEyebrow: "Paediatrics + Child Development",
  heroTitle:
    "A new paediatric clinic launched into Bukit Timah with a brand, a search footprint, and a listed presence from day one.",
  heroHighlight: "from day one",
  heroLabel: "Joyful Seeds Paediatric & Developmental Clinic",
  heroBody:
    "Planting joy. Harvesting potential. Brand, copy, website, organic search, paid search, and FindClinic presence built as one launch system for a clinic starting from absolute zero online.",
  heroImage: "/specialty-hub/hero-bg.png",
  heroCta: { label: "Make Your First Wish", href: "/contact" },
  heroSecondaryCta: { label: "See How the Magic Works", href: "#granted-wish" },
  patientDiff: {
    kicker: "Before the work",
    title: "What stood in the way",
    highlight: "way",
    subtitle:
      "Two experienced consultant paediatricians, a beautiful idea about how children should be cared for, and a starting position of absolute zero online.",
    cards: [
      {
        title: "Zero authority, crowded catchment",
        body: "A new domain in Bukit Timah competing against long-established clinics with years of accumulated search history and reviews.",
      },
      {
        title: "Two very different patients",
        body: "A parent booking a flu jab and a parent worried their three year old is not speaking need the same clinic and completely different journeys, tones, and search terms.",
      },
      {
        title: "The hardest content in paediatrics",
        body: "Developmental content is read by frightened parents at midnight. It has to inform without alarming, guide without diagnosing, and never suggest a child's future is fixed.",
      },
    ],
  },
  searchCompare: {
    kicker: "Clinic Genie diagnosis",
    title: "Four lenses. One clearer picture.",
    highlight: "clearer picture",
    intro:
      "We looked at the project through four lenses. How parents search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    closing:
      "That produced a two-pillar structure, a voice built on growth rather than urgency, and a launch plan that gave the clinic a findable presence while its own domain was still earning one.",
    cards: [
      {
        title: "Search Intent",
        body: "How parents look for care before they choose a clinic, and which queries signal real enquiry intent.",
      },
      {
        title: "Service Clarity",
        body: "Whether services are grouped, explained, and connected in a way parents can follow without guessing.",
      },
      {
        title: "Trust Signals",
        body: "Where credibility is built through structure, doctor context, hospital access, and responsible claims.",
      },
      {
        title: "Enquiry Readiness",
        body: "Whether call, WhatsApp, booking, and teleconsult actions appear at the moments parents are ready to act.",
      },
    ],
  },
  transformation: {
    subtitle: "A granted wish",
    title: "Joyful Seeds Paediatric & Developmental Clinic",
    highlight: "Joyful Seeds",
    image: "/works/joyfulseeds/joyfulseeds-mockup.png",
    imageAlt: "Joyful Seeds Paediatric and Developmental Clinic website mockup on laptop",
    intro:
      "A new paediatric clinic launched into Bukit Timah with a brand, a search footprint, and a listed presence from day one.",
    accent: "#FF6A88",
    anchor: {
      title: "Brand and voice",
      body: "Built a botanical identity around seeds, seasons, and growth, then carried it into the writing so consistently that even the closed sign has a reason. Rest is part of growth, too.",
    },
    engineKicker: "What we worked on",
    engineClosing: "Six workstreams, one goal. Help parents move from search to understanding to enquiry with less friction.",
    engine: [
      {
        title: "Two-pillar architecture",
        body: "Separated general paediatrics from developmental and behavioural care, so everyday health and complex needs each get the structure and tone they deserve.",
      },
      {
        title: "Copywriting",
        body: "Wrote every page for a parent, not a clinician. Calm, plain, and specific about what happens at a visit, with no rush and no pressure.",
      },
      {
        title: "Search intent mapping",
        body: "Prioritised the searches parents actually type. Not just paediatrician Bukit Timah, but P1 deferment, SG Enable referral, SPED placement report, and developmental assessment.",
      },
      {
        title: "FindClinic presence",
        body: "Listed and structured the clinic on FindClinic.sg, giving a brand new practice a discoverable, credible profile from opening week while its own domain built authority.",
      },
      {
        title: "Paid search",
        body: "Structured campaigns around vaccination, general consultation, and developmental assessment intent, tracked through to booking.",
      },
    ],
    metricsKicker: "What changed",
    metricsTitle: "What the clinic can now measure",
    metricsHighlight: "measure",
    metricsIntro: "No smoke. No mirrors. Every claim on this page is something the clinic can point at.",
    metricsClosing: "Measurable magic. Wishes realised in data, not promises.",
    metrics: [
      {
        title: "A brand launched from zero to live presence",
        body: "Website, search footprint, and listed profile from day one.",
      },
      {
        title: "Two clear care pillars",
        body: "General and developmental care structured so parents can find the journey they need.",
      },
      {
        title: "Singapore-specific search visibility",
        body: "Visibility across developmental queries parents actually use.",
      },
      {
        title: "Click to booking attribution",
        body: "Tracked pathways across web, WhatsApp, and directory.",
      },
    ],
    cta: {
      label: "Make Your First Wish",
      href: "/contact",
    },
  },
  routings: {
    subtitle: "Patient journey map",
    title: "From search to enquiry, mapped with intent.",
    highlight: "mapped with intent",
    intro:
      "We built the clinic website as a guided family journey, not a collection of disconnected pages. Branding, copywriting, website UX, SEO, SEM, and FindClinic worked as one system.",
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
      {
        label: "Branding and Copywriting",
        href: "/services/core-pillars/branding-copywriting",
      },
      {
        label: "FindClinic.sg",
        href: "/services/core-pillars/findclinic",
      },
    ],
  },
  compliance: {
    kicker: "Built for responsible healthcare marketing",
    title: "Clarity without overclaiming.",
    highlight: "overclaiming",
    intro:
      "Writing about children carries a duty that goes beyond compliance. A parent reading about developmental delay is already frightened. Every page was written to inform them without adding to that.",
    points: [
      {
        title: "Built within the rules",
        body: "Copy, structure, and claims were shaped around Singapore healthcare advertising guidelines and the Health Products Act from the first draft.",
      },
      {
        title: "Educational, never diagnostic",
        body: "Content helps parents recognise when to ask a question. It never suggests a diagnosis, a prognosis, or a medication decision online.",
      },
      {
        title: "No fear, no false promises",
        body: "No guaranteed outcomes, no developmental timelines presented as certainties, and no urgency applied to families already under strain.",
      },
      {
        title: "Reputation first",
        body: "Every page protects the paediatricians' names while making children's care easier to understand and enquire about.",
      },
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
    subtitle: "Make your first wish",
    title: "Want a clearer patient journey for your clinic?",
    highlight: "clearer patient journey",
    body: "Book a strategy call. We will map how patients find, understand, and enquire with your clinic, then show you where Clinic Genie can help.",
    cta: { label: "Make Your First Wish", href: "/contact" },
    secondaryCta: { label: "See Our Work", href: "/portfolio" },
    footnote: "No obligation. No jargon. Just a clear next step.",
  },
};

export const SPECIALTY_HUBS: SpecialtyHub[] = [
  {
    id: "endocrinology",
    slug: "endocrinology",
    name: "Endocrinology",
    highlight: "Rank for lifelong conditions.",
    summary:
      "Cedar Endocrine Clinic: specialist endocrine care across two hospitals, made findable and easy to understand.",
    image: "/specialty-hub/Endocrinology.png",
    published: true,
  },
  {
    id: "cardiology",
    slug: "cardiology",
    name: "Cardiology",
    highlight: "Rank where patients look.",
    summary:
      "Sunrise Heart: specialist cardiac care in the heartlands, built to be found by patients and by the AI they now ask first.",
    image: "/specialty-hub/Cardiology.png",
    published: true,
  },
  {
    id: "dermatology",
    slug: "dermatology",
    name: "Dermatology",
    highlight: "Paid ads, ready patients.",
    summary:
      "MSDC: a true medical dermatology practice, structured so patients can tell it apart from everything else calling itself a skin clinic.",
    image: "/specialty-hub/Aesthetic.png",
    published: true,
  },
  {
    id: "dental",
    slug: "dental",
    name: "Dental + Orthodontics",
    highlight: "Win comparison shoppers.",
    summary:
      "Singapore Dental Implant Centre: thirty years of implant expertise, given a brand and a search presence to match.",
    image: "/specialty-hub/Dental.png",
    published: true,
  },
  {
    id: "ophthalmology",
    slug: "ophthalmology",
    name: "Ophthalmology",
    highlight: "A clear, trust-building site.",
    summary: "Search and brand systems for eye care. Clear paths from symptoms to your clinic door.",
    image: "/specialty-hub/Ophthalmology.png",
    published: false,
  },
  {
    id: "paediatrics",
    slug: "paediatrics",
    name: "Paediatrics",
    highlight: "A voice parents trust.",
    summary:
      "Joyful Seeds launched into Bukit Timah with a brand, search footprint, and listed presence from day one.",
    image: "/specialty-hub/paediatric.png",
    published: true,
    ...PAEDIATRICS_DETAIL,
  },
  {
    id: "acne",
    slug: "acne",
    name: "Acne Specialist",
    highlight: "Meet patients on social.",
    summary:
      "The Acne Clinic: Singapore's first clinic devoted entirely to acne, built to own acne search from day one.",
    image: "/specialty-hub/Acne.png",
    published: true,
  },
  {
    id: "neurology",
    slug: "neurology",
    name: "Neurology",
    highlight: "A clear, navigable site.",
    summary:
      "Singapore Brain Spine Nerves Center: three decades of neurosurgical expertise, structured so a frightened patient can find the right answer quickly.",
    image: "/specialty-hub/Neurology.png",
    published: true,
  },
  {
    id: "aquatic-physio",
    slug: "aquatic-physio",
    name: "Aquatic Physiotherapy",
    highlight: "Show the road to recovery.",
    summary:
      "AquaPhysio: a licensed aquatic physiotherapy centre, positioned to be told apart from everything that merely looks like it.",
    image: "/specialty-hub/Aquatic.png",
    published: true,
  },
];

export interface SpecialtyCategoryItem {
  name: string;
  /** Specialty hub slug, used to resolve a future Genie Tips article */
  slug?: string;
  /** Future Genie Tips article. Items stay unlinked until this is set. */
  blogHref?: string;
}

export interface SpecialtyCategory {
  id: string;
  name: string;
  items: SpecialtyCategoryItem[];
}

export const SPECIALTY_CATEGORIES: SpecialtyCategory[] = [
  {
    id: "primary-care",
    name: "Primary Care",
    items: [{ name: "Family Medicine" }],
  },
  {
    id: "general-adult-geriatrics",
    name: "General Adult Medicine & Geriatrics",
    items: [{ name: "Internal Medicine" }, { name: "Geriatric Medicine" }],
  },
  {
    id: "occupational-aviation-population",
    name: "Occupational, Aviation & Population Health",
    items: [
      { name: "Occupational Medicine" },
      { name: "Aviation Medicine" },
      { name: "Public Health" },
    ],
  },
  {
    id: "cardiovascular-cardiothoracic",
    name: "Cardiovascular & Cardiothoracic Care",
    items: [{ name: "Cardiology", slug: "cardiology" }, { name: "Cardiothoracic Surgery" }],
  },
  {
    id: "endocrine-metabolic",
    name: "Endocrine & Metabolic Medicine",
    items: [{ name: "Endocrinology", slug: "endocrinology" }],
  },
  {
    id: "digestive",
    name: "Digestive Medicine",
    items: [{ name: "Gastroenterology" }],
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    items: [{ name: "General Surgery" }],
  },
  {
    id: "renal-urological",
    name: "Renal & Urological Care",
    items: [{ name: "Renal Medicine" }, { name: "Urology" }],
  },
  {
    id: "respiratory",
    name: "Respiratory Medicine",
    items: [{ name: "Respiratory Medicine" }],
  },
  {
    id: "infectious-diseases",
    name: "Infectious Diseases",
    items: [{ name: "Infectious Diseases" }],
  },
  {
    id: "haematology-oncology",
    name: "Haematology & Oncology",
    items: [
      { name: "Haematology" },
      { name: "Medical Oncology" },
      { name: "Radiation Oncology" },
    ],
  },
  {
    id: "palliative-care",
    name: "Palliative Care",
    items: [{ name: "Palliative Medicine" }],
  },
  {
    id: "neurosciences",
    name: "Neurosciences",
    items: [{ name: "Neurology", slug: "neurology" }, { name: "Neurosurgery" }],
  },
  {
    id: "musculoskeletal-hand-rehab",
    name: "Musculoskeletal, Hand & Rehabilitation Care",
    items: [
      { name: "Rheumatology" },
      { name: "Orthopaedic Surgery" },
      { name: "Hand Surgery" },
      { name: "Rehabilitation Medicine" },
      { name: "Sports Medicine" },
    ],
  },
  {
    id: "dermatology",
    name: "Dermatology",
    items: [{ name: "Dermatology", slug: "dermatology" }],
  },
  {
    id: "plastic-surgery",
    name: "Plastic Surgery",
    items: [{ name: "Plastic Surgery" }],
  },
  {
    id: "womens-health",
    name: "Women's Health",
    items: [{ name: "Obstetrics & Gynaecology" }],
  },
  {
    id: "paediatrics-neonatology",
    name: "Paediatrics & Neonatology",
    items: [
      { name: "Paediatric Medicine", slug: "paediatrics" },
      { name: "Paediatric Surgery" },
      { name: "Neonatology" },
      { name: "Paediatric Cardiology" },
      { name: "Paediatric Gastroenterology" },
      { name: "Paediatric Haematology & Oncology" },
      { name: "Paediatric Intensive Care" },
      { name: "Paediatric Nephrology" },
    ],
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    items: [{ name: "Ophthalmology", slug: "ophthalmology" }],
  },
  {
    id: "ent",
    name: "Ear, Nose & Throat",
    items: [{ name: "Otorhinolaryngology / Ear, Nose, Throat (ENT) Surgery" }],
  },
  {
    id: "mental-health",
    name: "Mental Health",
    items: [{ name: "Psychiatry" }],
  },
  {
    id: "anaesthesia-emergency-critical",
    name: "Anaesthesia, Emergency & Critical Care",
    items: [
      { name: "Anaesthesiology" },
      { name: "Emergency Medicine" },
      { name: "Intensive Care Medicine" },
    ],
  },
  {
    id: "diagnostic-imaging-laboratory",
    name: "Diagnostic, Imaging & Laboratory Medicine",
    items: [
      { name: "Diagnostic Radiology" },
      { name: "Nuclear Medicine" },
      { name: "Pathology" },
    ],
  },
];

export function getSpecialtyCategoryItems(category: SpecialtyCategory): SpecialtyCategoryItem[] {
  return category.items;
}

export function getSpecialtyHub(slug: string): SpecialtyHub | undefined {
  return SPECIALTY_HUBS.find((hub) => hub.slug === slug);
}

export function getPublishedSpecialtyHubs(): SpecialtyHub[] {
  return SPECIALTY_HUBS.filter((hub) => hub.published);
}

export function getSpecialtyHubHref(hub: SpecialtyHubCard): string | undefined {
  if (hub.blogHref) return hub.blogHref;
  if (!hub.published) return undefined;
  return `/clinic-specialties/${hub.slug}`;
}

export function getSpecialtyCategoryItemHref(
  item: SpecialtyCategoryItem
): string | undefined {
  if (item.blogHref) return item.blogHref;
  if (!item.slug) return undefined;
  const hub = getSpecialtyHub(item.slug);
  if (!hub) return undefined;
  return getSpecialtyHubHref(hub);
}

export function isSpecialtyHubDetail(hub: SpecialtyHub): hub is SpecialtyHubDetail {
  return hub.published && Boolean(hub.heroTitle);
}
