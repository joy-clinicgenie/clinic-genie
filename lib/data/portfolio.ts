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
}

export interface CaseStudyShift {
  before: string;
  after: string;
}

export interface CaseStudyJourney {
  flow: string[];
  websiteMap: { old: string; new: string };
  growthSystem: string[];
}

export interface CaseStudy {
  slug: string;
  name: string;
  tagline?: string;
  specialty: string;
  line: string;
  tags: WorkTag[];
  result: string;
  accent: string;

  heroTitle: string;
  heroSubtitle: string;
  heroBody: string;

  snapshot: CaseStudySnapshot;
  before: CaseStudyCard[];
  diagnosisIntro: string;
  diagnosisBody: string;
  diagnosisLenses: CaseStudyCard[];
  workedOn: CaseStudyCard[];
  strategyIntro: string;
  strategyBody: string;
  strategyShifts: CaseStudyShift[];
  journey: CaseStudyJourney;
  deliverables: string[];
  compliancePoints: CaseStudyCard[];
  changes: string[];
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
  {
    slug: "the-acne-clinic",
    name: "The Acne Clinic",
    tagline: "Face it. Fix it.",
    specialty: "Skin + Aesthetics",
    line: "A bold new aesthetics brand that owns acne search in Singapore.",
    tags: ["Branding", "Web Design", "SEO", "SEM"],
    result: "+118% organic traffic · 2.1× consult bookings",
    accent: "#6CBAD9",
    heroTitle: "Turning patient search confusion into a clearer clinic enquiry journey.",
    heroSubtitle: "A specialist clinic project focused on improving how patients discover, understand, and enquire.",
    heroBody:
      "Clinic Genie reviewed the clinic's search journey, service structure, website flow, content clarity, and enquiry points to create a more connected digital growth system.",
    snapshot: {
      clinicType: "Specialist aesthetics clinic",
      projectFocus: "Brand, website clarity, healthcare SEO, content structure, and enquiry flow",
      mainChallenge:
        "Patients needed a clearer path from online search to service understanding to contact in a competitive acne niche.",
      role: "Strategy, brand, website structure, search planning, content direction, SEM, and tracking review",
    },
    before: [
      {
        title: "Unclear service pathways",
        body: "Patients could reach the website, but the journey from acne concern to treatment understanding to enquiry was not clear enough.",
      },
      {
        title: "Thin search structure",
        body: "Key treatments needed stronger page structure, clearer keyword intent, and better supporting content.",
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
        body: "Restructured how acne, acne scars, peels, laser, and skin booster services were grouped, explained, and connected.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped content around what patients search before choosing an acne or aesthetics clinic.",
      },
      {
        title: "Trust-led page flow",
        body: "Improved page sections so patients could understand the clinic before being asked to enquire.",
      },
      {
        title: "Conversion touchpoints",
        body: "Reviewed where call, form, and appointment CTAs should appear across the treatment journey.",
      },
      {
        title: "Content expansion plan",
        body: "Planned supporting articles and FAQs to strengthen topical relevance around acne care.",
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
      growthSystem: ["SEO", "Website UX", "Content", "Tracking", "Ads"],
    },
    deliverables: [
      "Brand identity and clinic collateral",
      "Homepage and treatment pages",
      "Healthcare SEO structure",
      "Supporting content plan",
      "Google Ads and tracking setup",
    ],
    compliancePoints: DEFAULT_COMPLIANCE,
    changes: [
      "+118% organic traffic in 6 months",
      "Page 1 for \"acne scar treatment Singapore\"",
      "2.1× increase in consult bookings",
      "38% lower cost-per-enquiry vs launch month",
    ],
  },
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
      "Page 1 for 6 priority treatment keywords",
      "+74% organic sessions in 4 months",
      "2× longer average session duration",
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
      "+64% qualified enquiries in 5 months",
      "Page 1 for key fertility consultation searches",
      "Significant drop in bounce on treatment pages",
    ],
  },
  {
    slug: "cedar-endocrine-clinic",
    name: "CEDAR Endocrine Clinic",
    specialty: "Dental",
    line: "Your Health Nurtured",
    tags: ["Branding", "Photography", "Web Design", "SEM", "Lead Gen"],
    result: "38% lower cost-per-enquiry",
    accent: "#6CBAD9",
    heroTitle: "Turning patient search confusion into a clearer clinic enquiry journey.",
    heroSubtitle: "A specialist clinic project focused on improving how patients discover, understand, and enquire.",
    heroBody:
      "Clinic Genie reviewed the clinic's search journey, service structure, website flow, content clarity, and enquiry points to create a more connected digital growth system.",
    snapshot: {
      clinicType: "Specialist clinic",
      projectFocus: "Website clarity, medical SEM, landing pages, and enquiry flow",
      mainChallenge:
        "Patients needed a clearer path from paid search to service understanding to booked consultation, with better attribution along the way.",
      role: "Strategy, website structure, SEM planning, landing page direction, and tracking review",
    },
    before: [
      {
        title: "Unclear service pathways",
        body: "Patients could reach the website, but the journey from service discovery to enquiry was not clear enough.",
      },
      {
        title: "Thin search structure",
        body: "Important clinic services needed stronger landing page structure, clearer keyword intent, and better supporting content.",
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
        body: "Restructured how key services were grouped, explained, and connected across dedicated landing pages.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped campaigns and content around what patients search before choosing a clinic.",
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
        title: "Tracking and attribution",
        body: "Connected click, enquiry, and booking signals so the clinic could see what was working.",
      },
    ],
    strategyIntro:
      "The project gave the clinic a clearer website foundation, stronger service page logic, improved paid search direction, and a more connected enquiry journey.",
    strategyBody:
      "Instead of treating SEM, landing pages, and lead tracking as separate tasks, the work connected them into one patient discovery system.",
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
      growthSystem: ["SEM", "Website UX", "Landing pages", "Tracking", "Lead gen"],
    },
    deliverables: [
      "Dedicated service landing pages",
      "Google Ads restructuring",
      "Conversion tracking setup",
      "Booking funnel clarity",
      "Enquiry pathway review",
    ],
    compliancePoints: DEFAULT_COMPLIANCE,
    changes: [
      "38% lower cost-per-enquiry",
      "2.6× consultation bookings from paid search",
      "Clearer attribution from click to booked patient",
    ],
  },
  {
    slug: "joyful-seeds",
    name: "Joyful Seeds Paediatrics",
    specialty: "Paediatrics",
    line: "Planting Joy. Harvesting Potential.",
    tags: ["Branding", "Web Design", "SEO", "Content", "AI Search"],
    result: "Featured snippet + 3× organic leads",
    accent: "#FF6A88",
    heroTitle: "Turning patient search confusion into a clearer clinic enquiry journey.",
    heroSubtitle: "A specialist clinic project focused on improving how patients discover, understand, and enquire.",
    heroBody:
      "Clinic Genie reviewed the clinic's search journey, service structure, website flow, content clarity, and enquiry points to create a more connected digital growth system.",
    snapshot: {
      clinicType: "Specialist paediatric clinic",
      projectFocus: "Website clarity, healthcare SEO, content structure, AI search readiness, and enquiry flow",
      mainChallenge:
        "Parents needed a clearer path from online search to service understanding to contact, with stronger organic visibility for priority care journeys.",
      role: "Strategy, website structure, search planning, content direction, AI search readiness, and tracking review",
    },
    before: [
      {
        title: "Unclear service pathways",
        body: "Parents could reach the website, but the journey from concern to service understanding to enquiry was not clear enough.",
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
      "We looked at the project through four lenses: how parents search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "This helped identify where the website needed clearer structure, stronger service explanation, better content pathways, and more intentional enquiry points.",
    diagnosisLenses: DEFAULT_DIAGNOSIS_LENSES,
    workedOn: [
      {
        title: "Service architecture",
        body: "Restructured how key paediatric services were grouped, explained, and connected.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped content around what parents search before choosing a paediatric clinic.",
      },
      {
        title: "Trust-led page flow",
        body: "Improved page sections so parents could understand the clinic before being asked to enquire.",
      },
      {
        title: "Conversion touchpoints",
        body: "Reviewed where call, WhatsApp, form, and appointment CTAs should appear.",
      },
      {
        title: "Content expansion plan",
        body: "Planned supporting articles and FAQs to strengthen topical relevance and AI search clarity.",
      },
    ],
    strategyIntro:
      "The project gave the clinic a clearer website foundation, stronger service page logic, improved content direction, and a more connected enquiry journey.",
    strategyBody:
      "Instead of treating SEO, website copy, and AI search readiness as separate tasks, the work connected them into one patient discovery system.",
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
      growthSystem: ["SEO", "Website UX", "Content", "AI search", "Tracking"],
    },
    deliverables: [
      "Homepage and service pages",
      "Healthcare SEO structure",
      "Doctor-reviewed content system",
      "AI search readiness updates",
      "Enquiry pathway review",
    ],
    compliancePoints: DEFAULT_COMPLIANCE,
    changes: [
      "Featured snippet for a priority care search",
      "3× organic leads in 6 months",
      "Cited in AI search answers for key care topics",
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
