import { SPECIALTY_HUB_WORKS } from "@/lib/data/specialty-hub-works";

export type WorkTag =
  | "Branding"
  | "Photography"
  | "Web Design"
  | "SEO"
  | "SEM"
  | "Content"
  | "Video"
  | "Social Media"
  | "Strategy"
  | "Lead Gen"
  | "AI Search";

export interface CaseStudySnapshot {
  clinicType: string;
  projectFocus: string;
  mainChallenge: string;
  role: string;
}

export interface CaseStudyCard {
  title: string;
  body: string;
  image?: string;
  alt?: string;
  /** Oversized value shown in metrics and architecture treatments */
  metric?: string;
  /** Optional schematic shown beside a workstream */
  diagram?: "pillars";
}

export interface CaseStudyShift {
  before: string;
  after: string;
}

export interface CaseStudyJourney {
  flow: string[];
  websiteMap: { old: string | string[]; new: string | string[] };
  growthSystem: string[];
}

export interface CaseStudy {
  slug: string;
  name: string;
  tagline?: string;
  specialty: string;
  line: string;
  /** Search snippet. Falls back to `line` when omitted. */
  metaDescription?: string;
  tags: WorkTag[];
  /** Display tags for hero chips when they differ from filterable WorkTag values */
  serviceTags?: string[];
  result: string;
  accent: string;

  heroTitle: string;
  heroSubtitle: string;
  heroBody: string;
  heroHighlight?: string;
  /** Optional full hero eyebrow. Falls back to case label plus specialty. */
  heroEyebrow?: string;
  /** Condensed service lines for the specialty case-study hero */
  projectScope?: string[];
  /** Numbered architecture metrics for the specialty case-study hero */
  projectArchitecture?: { value: string; label: string }[];

  snapshot: CaseStudySnapshot;
  beforeIntro?: string;
  before: CaseStudyCard[];
  diagnosisIntro: string;
  diagnosisBody: string;
  diagnosisLenses: CaseStudyCard[];
  workedOnIntro?: string;
  workedOn: CaseStudyCard[];
  strategyIntro: string;
  strategyBody: string;
  strategyShifts: CaseStudyShift[];
  journeyIntro?: string;
  journeyTitle?: string;
  journeyHighlight?: string;
  journey: CaseStudyJourney;
  deliverablesTitle?: string;
  deliverablesHighlight?: string;
  deliverablesIntro?: string;
  deliverables: string[];
  complianceIntro?: string;
  compliancePoints: CaseStudyCard[];
  changesTitle?: string;
  changesHighlight?: string;
  changesLead?: string;
  changesIntro?: string;
  changes: CaseStudyCard[];
}

const DEFAULT_DIAGNOSIS_LENSES: CaseStudyCard[] = [
  {
    title: "Search Intent",
    body: "How patients look for care before they choose a clinic, and which queries signal real enquiry intent.",
  },
  {
    title: "Service Clarity",
    body: "Whether services are grouped, explained, and connected in a way patients can follow without guessing.",
  },
  {
    title: "Trust Signals",
    body: "Where credibility is built through structure, doctor context, location clarity, and responsible claims.",
  },
  {
    title: "Enquiry Readiness",
    body: "Whether call, form, WhatsApp, and booking actions appear at the moments patients are ready to act.",
  },
];

const DEFAULT_COMPLIANCE: CaseStudyCard[] = [
  {
    title: "Built within the rules",
    body: "Copy, structure, and claims were shaped around Singapore healthcare advertising guidelines from the first draft.",
  },
  {
    title: "Evidence-led language",
    body: "Claims stay grounded in what the clinic can support. What cannot be substantiated is not said.",
  },
  {
    title: "No false promises",
    body: "No guaranteed outcomes, exaggerated comparisons, or pressure-led patient messaging.",
  },
  {
    title: "Reputation first",
    body: "Every page is designed to protect the clinic's name while making services easier to understand and enquire about.",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  ...SPECIALTY_HUB_WORKS,
  {
    slug: "pilotpulse",
    name: "PilotPulse",
    specialty: "Other",
    line: "Premium rebrand + content engine for chemical peels, fractional laser and skin boosters.",
    tags: ["Web Design", "SEO", "Content"],
    result: "Page 1 for 6 priority treatment keywords",
    accent: "#7FE9F0",
    heroTitle: "Turning patient search confusion into a clearer clinic enquiry journey.",
    heroSubtitle: "A specialist clinic project focused on improving how patients discover, understand, and enquire.",
    heroBody:
      "Clinic Genie reviewed the clinic's search journey, service structure, website flow, content clarity, and enquiry points to create a more connected digital growth system.",
    snapshot: {
      clinicType: "Specialist aesthetics clinic",
      projectFocus: "Website clarity, healthcare SEO, content structure, and enquiry flow",
      mainChallenge:
        "Patients needed a clearer path from online search to service understanding to contact, while the clinic looked dated against newer competitors.",
      role: "Strategy, website structure, search planning, content direction, copy refinement, and tracking review",
    },
    before: [
      {
        title: "Unclear service pathways",
        body: "Patients could reach the website, but the journey from treatment discovery to enquiry was not clear enough.",
      },
      {
        title: "Thin search structure",
        body: "Important clinic services needed stronger page structure, clearer keyword intent, and better supporting content.",
      },
      {
        title: "Weak enquiry visibility",
        body: "Contact actions were present, but they were not always positioned at the right decision points.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses: how patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "This helped identify where the website needed clearer structure, stronger service explanation, better content pathways, and more intentional enquiry points.",
    diagnosisLenses: DEFAULT_DIAGNOSIS_LENSES,
    workedOn: [
      {
        title: "Service architecture",
        body: "Restructured how chemical peels, fractional laser, and skin boosters were grouped, explained, and connected.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped content around what patients search before choosing a clinic for these treatments.",
      },
      {
        title: "Trust-led page flow",
        body: "Improved page sections so patients could understand the clinic before being asked to enquire.",
      },
      {
        title: "Conversion touchpoints",
        body: "Reviewed where call, WhatsApp, form, and appointment CTAs should appear.",
      },
      {
        title: "Content expansion plan",
        body: "Planned supporting articles and FAQs to strengthen topical relevance.",
      },
    ],
    strategyIntro:
      "The project gave the clinic a clearer website foundation, stronger service page logic, improved content direction, and a more connected enquiry journey.",
    strategyBody:
      "Instead of treating SEO, website copy, and lead tracking as separate tasks, the work connected them into one patient discovery system.",
    strategyShifts: [
      { before: "Service information scattered", after: "Services grouped by patient intent" },
      { before: "Generic content structure", after: "Search-led page planning" },
      { before: "Passive contact points", after: "CTAs placed around decision moments" },
    ],
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: "Homepage → generic service page → contact",
        new: "Homepage → service cluster → condition page → FAQ → doctor/location → enquiry",
      },
      growthSystem: ["SEO", "Website UX", "Content", "Tracking"],
    },
    deliverables: [
      "Homepage and treatment pages",
      "Service page architecture",
      "Doctor-reviewed content engine",
      "Healthcare SEO structure",
      "Enquiry pathway review",
    ],
    compliancePoints: DEFAULT_COMPLIANCE,
    changes: [
      { title: "Page 1 for 6 priority treatment keywords", body: "" },
      { title: "+74% organic sessions in 4 months", body: "" },
      { title: "2× longer average session duration", body: "" },
    ],
  },
  {
    slug: "stellaris",
    name: "Stellaris",
    specialty: "Other",
    line: "A reassuring, compliant brand for a sensitive specialty.",
    tags: ["Branding", "Social Media", "Strategy"],
    result: "+64% qualified enquiries in 5 months",
    accent: "#8E7BE8",
    heroTitle: "Turning patient search confusion into a clearer clinic enquiry journey.",
    heroSubtitle: "A specialist clinic project focused on improving how patients discover, understand, and enquire.",
    heroBody:
      "Clinic Genie reviewed the clinic's search journey, service structure, website flow, content clarity, and enquiry points to create a more connected digital growth system.",
    snapshot: {
      clinicType: "Specialist fertility clinic",
      projectFocus: "Brand, website clarity, content structure, and enquiry flow",
      mainChallenge:
        "Patients needed a clearer, calmer path from online search to service understanding to contact in an emotionally sensitive specialty.",
      role: "Strategy, brand, website structure, content direction, and patient journey planning",
    },
    before: [
      {
        title: "Unclear service pathways",
        body: "Patients could reach the website, but the journey from concern to understanding to enquiry was not clear or reassuring enough.",
      },
      {
        title: "Thin search structure",
        body: "Important clinic services needed stronger page structure, clearer keyword intent, and better supporting content.",
      },
      {
        title: "Weak enquiry visibility",
        body: "Contact actions were present, but they were not always positioned at the right decision points.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses: how patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "This helped identify where the website needed clearer structure, stronger service explanation, better content pathways, and more intentional enquiry points.",
    diagnosisLenses: DEFAULT_DIAGNOSIS_LENSES,
    workedOn: [
      {
        title: "Service architecture",
        body: "Restructured how key fertility services were grouped, explained, and connected.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped content around what patients search before choosing a fertility clinic.",
      },
      {
        title: "Trust-led page flow",
        body: "Improved page sections so patients could understand the clinic before being asked to enquire.",
      },
      {
        title: "Conversion touchpoints",
        body: "Reviewed where call, WhatsApp, form, and appointment CTAs should appear.",
      },
      {
        title: "Content expansion plan",
        body: "Planned supporting articles and FAQs to strengthen topical relevance with care and clarity.",
      },
    ],
    strategyIntro:
      "The project gave the clinic a clearer website foundation, stronger service page logic, improved content direction, and a more connected enquiry journey.",
    strategyBody:
      "Instead of treating brand, website copy, and patient messaging as separate tasks, the work connected them into one patient discovery system.",
    strategyShifts: [
      { before: "Service information scattered", after: "Services grouped by patient intent" },
      { before: "Generic content structure", after: "Search-led page planning" },
      { before: "Passive contact points", after: "CTAs placed around decision moments" },
    ],
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: "Homepage → generic service page → contact",
        new: "Homepage → service cluster → condition page → FAQ → doctor/location → enquiry",
      },
      growthSystem: ["Brand", "Website UX", "Content", "Social", "Tracking"],
    },
    deliverables: [
      "Brand identity system",
      "Homepage and service pages",
      "Patient journey messaging",
      "Social content direction",
      "Enquiry pathway review",
    ],
    compliancePoints: DEFAULT_COMPLIANCE,
    changes: [
      { title: "+64% qualified enquiries in 5 months", body: "" },
      { title: "Page 1 for key fertility consultation searches", body: "" },
      { title: "Significant drop in bounce on treatment pages", body: "" },
    ],
  },
  {
    slug: "joyful-seeds",
    name: "Joyful Seeds Paediatric & Developmental Clinic",
    tagline: "Planting joy. Harvesting potential.",
    specialty: "Paediatrics + Child Development",
    line: "A new paediatric clinic launched into Bukit Timah with a brand, a search footprint, and a listed presence from day one.",
    metaDescription:
      "Brand, website, SEO and directory presence for a new paediatric and developmental clinic in Bukit Timah, launched from zero online.",
    tags: ["Branding", "Content", "Web Design", "SEO", "SEM"],
    serviceTags: ["Branding", "Copywriting", "Web Design", "SEO", "SEM", "FindClinic"],
    result: "2 care pillars · 2 paediatricians · 4 hospitals covered",
    accent: "#FF6A88",
    heroTitle:
      "A new paediatric clinic launched into Bukit Timah with a brand, a search footprint, and a listed presence from day one.",
    heroHighlight: "from day one",
    heroSubtitle: "Planting joy. Harvesting potential.",
    heroBody: "",
    heroEyebrow: "Case Study 05 / 10 · Paediatrics + Child Development",
    projectScope: ["Brand Strategy / Website / SEO / SEM / FindClinic"],
    projectArchitecture: [
      { value: "02", label: "Care Pillars" },
      { value: "02", label: "Paediatricians" },
      { value: "04", label: "Hospitals Covered" },
    ],
    snapshot: {
      clinicType: "General and developmental paediatric clinic",
      projectFocus:
        "Brand and voice, website structure, service architecture, healthcare SEO, paid search, directory presence",
      mainChallenge:
        "Two experienced consultant paediatricians, a beautiful idea about how children should be cared for, and a starting position of absolute zero online. General paediatrics is available on almost every corner of one of Singapore's most competitive catchments. The real opportunity sat in developmental and behavioural care, where parents search with urgency and find very little clear guidance.",
      role: "Brand, copywriting, website structure, service architecture, search planning, content direction, SEM, and FindClinic listing",
    },
    beforeIntro:
      "Two experienced consultant paediatricians, a beautiful idea about how children should be cared for, and a starting position of absolute zero online. General paediatrics is available on almost every corner of one of Singapore's most competitive catchments. The real opportunity sat in developmental and behavioural care, where parents search with urgency and find very little clear guidance.",
    before: [
      {
        title: "Zero authority, crowded catchment",
        body: "A new domain in Bukit Timah against long-established clinics with years of accumulated search history and reviews.",
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
    diagnosisIntro:
      "We looked at the project through four lenses: how parents search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That produced a voice built on growth rather than urgency, and a launch plan that made the clinic findable while its own domain was still earning authority.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How parents look for care before choosing a clinic, and which queries signal real enquiry intent.",
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
    workedOnIntro:
      "Six workstreams, one goal: help parents move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand and voice",
        body: "A botanical identity around seeds, seasons, and growth, carried into the writing so consistently that even the closed sign has a reason. Rest is part of growth, too.",
      },
      {
        title: "Two-pillar architecture",
        body: "General paediatrics separated from developmental and behavioural care, so everyday health and complex needs each get the structure and tone they deserve.",
      },
      {
        title: "Copywriting",
        body: "Every page written for a parent, not a clinician. Calm, plain, and specific about what happens at a visit, with no rush and no pressure.",
      },
      {
        title: "Search intent mapping",
        body: "The searches parents actually type: not just paediatrician Bukit Timah, but P1 deferment, SG Enable referral, SPED placement report, developmental assessment. High intent, high need, little competition writing about them clearly.",
      },
      {
        title: "FindClinic presence",
        body: "Listed and structured on FindClinic.sg, giving a brand new practice a discoverable, credible profile from opening week.",
      },
      {
        title: "Paid search",
        body: "Campaigns structured around vaccination, general consultation, and developmental assessment intent, tracked through to booking.",
      },
    ],
    strategyIntro:
      "Brand, copy, website, organic search, paid search, and directory presence were built as one launch system rather than six separate briefs.",
    strategyBody: "",
    strategyShifts: [
      { before: "No presence at all", after: "Website, search footprint, and listed profile from day one" },
      {
        before: "Paediatrics as one undifferentiated service",
        after: "General and developmental care as two clear pillars",
      },
      {
        before: "Generic clinic search terms",
        after: "Singapore-specific developmental queries parents actually use",
      },
    ],
    journeyIntro:
      "We built the website as a guided family journey from day one, with brand, search, paid, and directory presence launched as one system.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: ["No site", "No listing", "No search presence"],
        new: [
          "Search or FindClinic profile",
          "General or developmental pillar",
          "Service page and what to expect",
          "Paediatricians, hospital access, and hours",
          "Booking, WhatsApp, or teleconsult",
        ],
      },
      growthSystem: ["Branding", "Copywriting", "Website UX", "SEO", "SEM", "FindClinic"],
    },
    deliverablesTitle: "Wishes granted.",
    deliverablesHighlight: "granted",
    deliverablesIntro:
      "Practical assets and systems designed to support clearer discovery, stronger trust, and better enquiry flow.",
    deliverables: [
      "Brand identity and botanical visual system",
      "Full website design and build",
      "General and developmental pillar architecture",
      "Site-wide copywriting in parent-first language",
      "Healthcare SEO foundation and resource content",
      "Google Ads structure and campaign planning",
      "FindClinic.sg clinic profile",
    ],
    complianceIntro:
      "Writing about children carries a duty that goes beyond compliance. A parent reading about developmental delay is already frightened. Every page was written to inform them without adding to that.",
    compliancePoints: [
      {
        title: "Built within the rules",
        body: "Copy, structure, and claims shaped around Singapore healthcare advertising guidelines and the Health Products Act from the first draft.",
        image: "/compliance/rules.png",
        alt: "Built within the rules icon",
      },
      {
        title: "Educational, never diagnostic",
        body: "Content helps parents recognise when to ask a question. It never suggests a diagnosis, a prognosis, or a medication decision online.",
        image: "/compliance/patient-comm.png",
        alt: "Educational, never diagnostic icon",
      },
      {
        title: "No fear, no false promises",
        body: "No guaranteed outcomes, no developmental timelines presented as certainties, and no urgency applied to families already under strain.",
        image: "/compliance/no-false-promises.png",
        alt: "No fear, no false promises icon",
      },
      {
        title: "Reputation first",
        body: "Every page protects the paediatricians' names while making children's care easier to understand and enquire about.",
        image: "/compliance/reputation-first.png",
        alt: "Reputation first icon",
      },
    ],
    changesTitle: "What the clinic can now measure",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the clinic can point at.",
    changes: [
      {
        title: "Brand from zero",
        body: "A live brand, website, and FindClinic presence from opening week, with no prior domain history behind it.",
      },
      {
        title: "Two clear care pillars",
        body: "General and developmental paediatrics each with their own structure, tone, and parent journey.",
      },
      {
        title: "Search visibility",
        body: "Singapore-specific developmental queries parents actually use, not only generic paediatrician terms.",
      },
      {
        title: "Booking attribution",
        body: "Click-to-booking tracked across the website, WhatsApp, and directory pathways.",
      },
    ],
  },
];

export const WORK_FILTERS: ("All" | WorkTag)[] = [
  "All",
  "Branding",
  "Web Design",
  "SEO",
  "SEM",
  "Content",
  "Strategy",
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
