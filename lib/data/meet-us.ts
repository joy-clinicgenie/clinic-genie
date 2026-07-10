export interface MeetUsWorkBlock {
  title: string;
  body: string;
}

export const MEET_US_INTRO = {
  kicker: "The team",
  title: "A small team built around search, trust, and clarity.",
  highlight: "search",
  paragraphs: [
    "We are not a generic marketing team trying to fit clinics into standard campaigns.",
    "Clinic Genie works specifically around how patients search, compare, understand, and enquire. Every project brings together strategy, healthcare SEO, medical content, website UX, paid search, AI search readiness, and enquiry tracking.",
    "The goal is simple: make your clinic easier to find, easier to understand, and easier to contact.",
  ],
  supportLine: "Granted, not promised. Built clearly, not loudly.",
} as const;

export const MEET_US_BEHIND_THE_WORK = {
  kicker: "Behind the work",
  title: "Behind the Work",
  highlight: "Work",
  paragraphs: [
    "What patients see is the website, the content, the ad, or the search result.",
    "Behind that is the real work: keyword research, patient journey mapping, service architecture, competitor review, compliance checks, wireframing, copy refinement, campaign planning, tracking setup, and performance analysis.",
    "The work may look simple when it is done well. The system behind it is where the magic happens.",
  ],
  blocks: [
    {
      title: "Search Mapping",
      body: "Understanding how patients search for symptoms, services, doctors, clinics, and locations.",
    },
    {
      title: "Service Architecture",
      body: "Organising clinic services so patients and search engines can understand them more clearly.",
    },
    {
      title: "Patient Journey UX",
      body: "Designing pages around what patients need to know before contacting the clinic.",
    },
    {
      title: "Content Planning",
      body: "Creating educational content that supports search visibility and patient understanding.",
    },
    {
      title: "Tracking and Reporting",
      body: "Connecting calls, forms, WhatsApp clicks, and campaign performance to clearer reporting.",
    },
  ] satisfies MeetUsWorkBlock[],
} as const;
