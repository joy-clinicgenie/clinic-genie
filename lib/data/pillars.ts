import type { Faq } from "@/lib/data/faqs";

export interface CtaLink {
  label: string;
  href: string;
}

export interface PillarCard {
  title: string;
  body: string;
  /** Optional cross-link shown under the card */
  link?: CtaLink;
}

export interface SpecialtyCard {
  title: string;
  body?: string;
  link?: CtaLink;
}

export interface GrantedWish {
  name: string;
  summary: string;
  href: string;
  image?: string;
  alt?: string;
  imageClassName?: string;
}

export interface CorePillar {
  slug: string;
  /** Short label used in nav, hub cards and related strips */
  name: string;
  accent: string;

  // 1 — Hero
  heroSubtitle: string;
  heroTitle: string;
  heroParagraph: string[];
  heroPrimaryCta: CtaLink;
  heroSecondaryCta: CtaLink;

  // 2 — Wishes / ecosystem intro
  wishesSubtitle: string;
  /** Phrase inside wishesSubtitle that receives the section hover shine */
  wishesHighlight?: string;
  /** Optional section title (FindClinic ecosystem) */
  wishesTitle?: string;
  wishesIntro?: string[];
  wishes: PillarCard[];

  // 3 — Mechanics / offers
  mechanicsId: "mechanics" | "offers";
  mechanicsSubtitle: string;
  mechanicsTitle: string;
  mechanicsLead: string;
  mechanicsIntro: string;
  mechanicsItems: PillarCard[];

  // 4 — Specialty matrix
  specialtySubtitle: string;
  specialtyTitle: string;
  specialtyLead: string;
  specialties: SpecialtyCard[];

  // 6 — Granted wishes
  grantedSubtitle: string;
  grantedTitle: string;
  grantedIntro: string;
  grantedWishes: GrantedWish[];
  grantedCta: CtaLink;

  // 7 — Compliance
  complianceTitle: string;
  complianceBody: string;
  complianceCta: CtaLink;
  complianceTrustNote?: string;

  // 8 — FAQs (omit for FindClinic)
  faqs?: Faq[];

  // 9 — Final CTA
  finalSubtitle: string;
  finalTitle: string;
  finalParagraph: string;
  finalPrimaryCta: CtaLink;
  finalSecondaryCta?: CtaLink;
}

const CONTACT = "/contact";
const PORTFOLIO = "/portfolio";
const COMPLIANCE = "/services#compliance";
const FINDCLINIC_URL = "https://findclinic.sg";

const CONTACT_CTA: CtaLink = { label: "Make Your First Wish", href: CONTACT };
const FINAL_PRIMARY_CTA: CtaLink = {
  label: "Make Your Clinic Wish Come True",
  href: CONTACT,
};
const COMPLIANCE_CTA: CtaLink = {
  label: "How We Keep You Compliant",
  href: COMPLIANCE,
};
const PORTFOLIO_CTA: CtaLink = {
  label: "See Our Granted Wishes",
  href: PORTFOLIO,
};

/** Portfolio case study detail pages. */
const CEDAR = "/portfolio/cedar-endocrine-clinic";
const JOYFUL = "/portfolio/joyful-seeds";
const ACNE = "/portfolio/the-acne-clinic";

export const CORE_PILLARS: CorePillar[] = [
  // ───────────────────────────── 1. FindClinic.sg ─────────────────────────────
  {
    slug: "findclinic",
    name: "FindClinic.sg",
    accent: "#FF575C",
    heroSubtitle: "FindClinic.sg",
    heroTitle: "Where patients discover the right care, with clarity.",
    heroParagraph: [
      "The wish does not stop at your website.",
      "FindClinic.sg connects patients with specialist clinics across Singapore through verified listings and doctor profiles. One more way for the right patients to find you.",
    ],
    heroPrimaryCta: { label: "Join FindClinic.sg", href: CONTACT },
    heroSecondaryCta: { label: "Explore the Platform", href: FINDCLINIC_URL },
    wishesSubtitle: "The Clinic Genie ecosystem",
    wishesTitle: "Clinic Genie builds your visibility. FindClinic.sg extends it.",
    wishesHighlight: "FindClinic.sg",
    wishesIntro: [
      "Clinic Genie grows your presence through SEO, websites, content, and campaigns. FindClinic.sg carries it further, onto a platform where patients are already comparing and deciding. Two parts of the same wish.",
    ],
    wishes: [],
    mechanicsId: "offers",
    mechanicsSubtitle: "What's on the platform",
    mechanicsTitle: "A clearer path from search to the right clinic",
    mechanicsLead: "What FindClinic.sg offers",
    mechanicsIntro:
      "Everything a patient needs to choose well, in one trusted Singapore healthcare directory.",
    mechanicsItems: [
      {
        title: "Verified Doctor Profiles",
        body: "Qualifications, clinic details, and insights straight from the doctor.",
      },
      {
        title: "Medical Clinic Listings",
        body: "Clear, verified listings that help patients understand and compare specialist care.",
      },
      {
        title: "Specialist Media Interviews",
        body: "Real health advice from local specialists, the content patients trust most.",
      },
      {
        title: "Healthcare Article Publishing",
        body: "Patient-friendly medical education that answers real questions.",
      },
      {
        title: "Search and AI Visibility",
        body: "Structured so Google and AI tools surface it clearly.",
      },
      {
        title: "High-Authority Local Citations",
        body: "A listing that strengthens your clinic's citations and search credibility.",
      },
    ],
    specialtySubtitle: "Who is already there",
    specialtyTitle: "Who is already there",
    specialtyLead: "FindClinic.sg already features specialists across these fields, with room for more.",
    specialties: [
      { title: "Cardiology" },
      { title: "Dentistry" },
      { title: "Dermatology" },
      { title: "Endocrinology" },
      { title: "General Surgery" },
      { title: "Geriatric Medicine" },
      { title: "Neurosurgery" },
      { title: "Obstetrics & Gynaecology" },
      { title: "Ophthalmology" },
      { title: "Orthopaedic Surgery" },
      { title: "Paediatrics" },
      { title: "Urology" },
    ],
    grantedSubtitle: "On the platform",
    grantedTitle: "Interviews, specialists, and health conditions",
    grantedIntro:
      "Patients use FindClinic.sg to hear from doctors, compare specialists, and understand health conditions before they choose care.",
    grantedWishes: [
      {
        name: "Interview",
        summary: "Doctor interviews that explain real conditions and treatments.",
        href: `${FINDCLINIC_URL}/blog/categories/doctor-interviews`,
        image: "/services/findclinic/findclinic-interview.png",
        alt: "FindClinic.sg doctor interview on a phone",
      },
      {
        name: "Specialists",
        summary: "Verified doctor profiles patients can compare with confidence.",
        href: `${FINDCLINIC_URL}/specialist-listing`,
        image: "/services/findclinic/findclinic-specialists.png",
        alt: "FindClinic.sg specialist listing on tablet and phone",
      },
      {
        name: "Health Conditions",
        summary: "Clear guides that help patients understand symptoms, treatments, and next steps.",
        href: `${FINDCLINIC_URL}/heatlh-conditions/cataracts`,
        image: "/services/findclinic/findclinic-health-conditions.png",
        alt: "FindClinic.sg health condition guides",
      },
    ],
    grantedCta: { label: "Explore FindClinic.sg", href: FINDCLINIC_URL },
    complianceTitle: "Magic with a conscience.",
    complianceBody:
      "A healthcare discovery platform carries a duty of care. FindClinic.sg maintains SMC-compliant clinic profiles and follows HCSA guidelines for medical directories, so every profile, interview, and article supports patients responsibly.",
    complianceCta: COMPLIANCE_CTA,
    complianceTrustNote:
      "All content on FindClinic.sg is for general information only. It is not intended as medical advice and should not replace consultation with a qualified healthcare professional.",
    finalSubtitle: "Ready to be discovered?",
    finalTitle: "Make your clinic easier to find, understand, and trust.",
    finalParagraph:
      "If you want verified profiles, doctor-led content, and patient-friendly information working for your clinic, let's grant that wish together. Start a conversation about joining FindClinic.sg.",
    finalPrimaryCta: { label: "Join FindClinic.sg", href: CONTACT },
    finalSecondaryCta: {
      label: "Explore Healthcare SEO",
      href: "/services/core-pillars/healthcare-seo",
    },
  },

  // ───────────────────────────── 2. Healthcare SEO ─────────────────────────────
  {
    slug: "healthcare-seo",
    name: "Healthcare SEO",
    accent: "#7FE9F0",
    heroSubtitle: "Healthcare SEO",
    heroTitle: "Make your clinic the answer patients are searching for.",
    heroParagraph: [
      "Patients search long before they call. Our healthcare SEO turns those quiet searches into real enquiries for your specialist clinic, guided by search data, not guesswork.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What healthcare SEO grants your clinic",
    wishesHighlight: "healthcare SEO",
    wishes: [
      {
        title: "To Be Found",
        body: "Pages built around the exact terms patients type, ranked where they look first.",
      },
      {
        title: "To Be Trusted",
        body: "Patient-focused content that earns confidence, written within SMC guidelines.",
      },
      {
        title: "To Be Chosen",
        body: "Clear patient journeys and local SEO that turn searches into bookings.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What healthcare SEO includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Rankings don't come from wishes alone.",
    mechanicsIntro:
      "This is the machinery underneath: built on search data, checked against compliance, measured against enquiries.",
    mechanicsItems: [
      {
        title: "Medical Keyword Research",
        body: "With SEMrush and AnswerThePublic, we map the conditions, treatments, and real questions your patients search for.",
      },
      {
        title: "On-Page SEO",
        body: "Titles, structure, and content are shaped so every page ranks for the terms that matter.",
      },
      {
        title: "Content Strategy",
        body: "Compliant, authoritative content built around patient search intent, always human-reviewed.",
        link: {
          label: "See our Branding and Copywriting",
          href: "/services/core-pillars/branding-copywriting",
        },
      },
      {
        title: "Technical SEO",
        body: "A fast, clean site that search engines and AI tools understand at a glance.",
        link: {
          label: "See our Web Design and Development",
          href: "/services/core-pillars/web-design-development",
        },
      },
      {
        title: "Local SEO for Clinics",
        body: "Visibility for patients searching nearby, from Google Maps to local results.",
      },
      {
        title: "Tracking and Reporting",
        body: "Every ranking tied to real enquiries through Search Console and Analytics.",
      },
    ],
    specialtySubtitle: "Specialist clinic SEO",
    specialtyTitle: "Built for Your Specialty",
    specialtyLead: "Every specialty is searched differently.",
    specialties: [
      {
        title: "Endocrine & Metabolic",
        body: "Chronic conditions mean months of research. Content that answers diabetes, thyroid, and hormone questions patients keep asking.",
      },
      {
        title: "Neurosciences",
        body: "High-stakes conditions, careful patients. Authoritative pages that make your practice the credible answer they keep returning to.",
      },
      {
        title: "Musculoskeletal & Rehab",
        body: "Pain sends patients searching for answers. Content that ranks for every symptom, treatment, and recovery question.",
      },
    ],
    grantedSubtitle: "Our work",
    grantedTitle: "Clinics we have helped patients find.",
    grantedIntro:
      "Specialist clinics across Singapore trust Clinic Genie with their search visibility.",
    grantedWishes: [
      {
        name: "Cedar Endocrine Clinic",
        summary: "Healthcare SEO, content, and SEM.",
        href: CEDAR,
      },
      {
        name: "The Heart Specialist Clinic",
        summary: "SEO across cardiology search terms.",
        href: PORTFOLIO,
      },
      {
        name: "Medical and Surgical Dermatology Clinic",
        summary: "SEO and content for dermatology.",
        href: PORTFOLIO,
      },
      {
        name: "Singapore Dental Implant Centre",
        summary: "SEO for a procedure-led dental practice.",
        href: PORTFOLIO,
      },
    ],
    grantedCta: PORTFOLIO_CTA,
    complianceTitle: "Magic with a conscience.",
    complianceBody:
      "In healthcare, a careless claim costs more than a click. We build HCSA compliant marketing into every page, and wherever AI helps, a human checks the work. Visibility that protects your reputation, within Singapore's HCSA, PHMC, and SMC guidelines.",
    complianceCta: COMPLIANCE_CTA,
    faqs: [
      {
        q: "How long does healthcare SEO take to work?",
        a: "Most clinics see early movement within three to four months, with stronger results as content and authority build. SEO is a compound investment, not an overnight switch.",
      },
      {
        q: "Is healthcare SEO compliant with HCSA and SMC rules?",
        a: "Yes. Every page we build is created within Singapore's HCSA, PHMC, and SMC guidelines, with no exaggerated claims.",
      },
      {
        q: "What is the difference between SEO and SEM for clinics?",
        a: "SEO earns organic visibility over time. SEM uses paid ads for immediate reach. Most clinics grow fastest with both.",
      },
      {
        q: "Can SEO help my clinic appear in AI search and Google AI Overviews?",
        a: "Yes. We structure content so both search engines and AI tools can understand and surface your clinic.",
      },
      {
        q: "Do you offer local SEO for clinics?",
        a: "Yes. We optimise for patients searching in your area, including Google Maps and local results.",
      },
    ],
    finalSubtitle: "Ready to be found?",
    finalTitle: "What is your clinic's growth wish?",
    finalParagraph:
      "Tell us about your clinic, your specialty, and the patients you hope to reach. No vague wishes. No confusing jargon. Just a clearer path to being found, trusted, and chosen.",
    finalPrimaryCta: FINAL_PRIMARY_CTA,
  },

  // ───────────────────────────── 3. Medical SEM ─────────────────────────────
  {
    slug: "medical-sem",
    name: "Medical SEM",
    accent: "#8E7BE8",
    heroSubtitle: "Medical SEM",
    heroTitle: "Appear the instant a patient makes a wish.",
    heroParagraph: [
      "Some patients are not browsing. They are ready. Medical SEM puts your specialist clinic at the top of Google the instant they search, with every enquiry measured.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See How the Magic Works", href: "#mechanics" },
    wishesSubtitle: "What medical SEM grants your clinic",
    wishesHighlight: "medical SEM",
    wishes: [
      {
        title: "To Be Seen First",
        body: "Campaigns built around the high-intent searches patients make just before they book.",
      },
      {
        title: "To Be Trusted",
        body: "HCSA-compliant Google Ads that earn both the click and the confidence.",
      },
      {
        title: "To Be Chosen",
        body: "Landing pages with conversion optimisation built in, turning clicks into booked consultations.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What medical SEM includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Every wish needs real machinery behind it.",
    mechanicsIntro:
      "Medical SEM that unites the campaigns, platforms, and creative a specialist clinic needs. Magic on the surface, precision underneath.",
    mechanicsItems: [
      {
        title: "Keyword and Audience Research",
        body: "With SEMrush and Google's tools, we find the high-intent search terms patients use just before they book.",
      },
      {
        title: "Google Search Campaigns",
        body: "Targeted healthcare paid search that meets patients at the exact moment of intent.",
      },
      {
        title: "Performance Max Campaigns",
        body: "One campaign, conjured across Search, Display, YouTube, Maps, and Gmail through Google's AI, with our hands on every lever.",
      },
      {
        title: "Video Ads",
        body: "Short, compliant video that builds trust and recall across YouTube and Discovery.",
        link: {
          label: "See our Photo and Video Production",
          href: "/services/core-pillars/photo-video",
        },
      },
      {
        title: "Negative Keyword Filtering",
        body: "We filter out the wrong searches through negative keyword filtering, so your budget reaches patients who are ready to book, not browsers.",
      },
      {
        title: "Conversion + Landing Pages",
        body: "Fast, focused pages built for conversion rate optimisation for clinics, turning clicks into qualified clinic enquiries.",
        link: {
          label: "See our Web Design and Development",
          href: "/services/core-pillars/web-design-development",
        },
      },
      {
        title: "Tracking + Reporting",
        body: "We measure clicks, conversions, and patient acquisition cost through Google Ads and Analytics. Every dollar accounted for, every result in the light.",
      },
    ],
    specialtySubtitle: "Specialist clinic SEM",
    specialtyTitle: "Every specialty makes a different wish",
    specialtyLead: "",
    specialties: [
      {
        title: "Dermatology",
        body: 'Patients compare before they commit. Campaigns built for the research phase, right to the "near me" moment.',
      },
      {
        title: "Cardiovascular Care",
        body: "Symptom-led searches with urgency behind them. Campaigns that reach patients the moment concern turns into action.",
      },
      {
        title: "Paediatrics",
        body: "Parents search carefully and decide slowly. Campaigns that build trust from first worry to booked appointment.",
      },
    ],
    grantedSubtitle: "Our work",
    grantedTitle: "Clinics whose wishes we have granted.",
    grantedIntro:
      "Specialist clinics across Singapore trust Clinic Genie with their paid search.",
    grantedWishes: [
      {
        name: "Cedar Endocrine Clinic",
        summary: "Google Ads, Search, and SEM strategy.",
        href: CEDAR,
      },
      {
        name: "The Heart Specialist Clinic",
        summary: "SEM across cardiology services.",
        href: PORTFOLIO,
      },
      {
        name: "Clementi Family and Aesthetic Clinic",
        summary: "SEM for aesthetic treatments.",
        href: PORTFOLIO,
      },
      {
        name: "Singapore Dental Implant Centre",
        summary: "SEM for implant enquiries.",
        href: PORTFOLIO,
      },
    ],
    grantedCta: PORTFOLIO_CTA,
    complianceTitle: "Magic with a conscience.",
    complianceBody:
      "In healthcare, a careless claim costs more than a click. We build compliant clinic marketing campaigns into everything we run, and wherever AI lends a hand, a human checks the work. Paid search that grows enquiries while guarding your reputation, within Singapore's HCSA and SMC guidelines for medical advertising.",
    complianceCta: COMPLIANCE_CTA,
    faqs: [
      {
        q: "How much should a clinic spend on Google Ads?",
        a: "It depends on your specialty, competition, and goals. We build budgets around a realistic patient acquisition cost, never guesswork.",
      },
      {
        q: "Are your Google Ads compliant with HCSA rules?",
        a: "Yes. We run HCSA compliant Google Ads, with every ad and landing page built within Singapore's SMC guidelines for medical advertising.",
      },
      {
        q: "What is the difference between SEO and SEM for clinics?",
        a: "SEO earns organic visibility over time. SEM uses paid ads for immediate reach. Most clinics grow fastest with both.",
      },
      {
        q: "What are Performance Max campaigns?",
        a: "PMax uses Google AI to place your ads across Search, YouTube, Display, Maps, and Gmail from one campaign, with our oversight on targeting and creative.",
      },
      {
        q: "How do you measure SEM success?",
        a: "We track conversions and patient acquisition cost, not just clicks, so every dollar ties to a qualified clinic enquiry.",
      },
    ],
    finalSubtitle: "Ready to be found?",
    finalTitle: "What is your clinic's growth wish?",
    finalParagraph:
      "Tell us about your clinic, your specialty, and the patients you hope to reach. No vague wishes. No confusing jargon. Just a clearer path to being seen, trusted, and chosen.",
    finalPrimaryCta: FINAL_PRIMARY_CTA,
  },

  // ───────────────────────────── 4. Branding + Copywriting ─────────────────────────────
  {
    slug: "branding-copywriting",
    name: "Branding + Copywriting",
    accent: "#F2A65A",
    heroSubtitle: "Branding + Copywriting",
    heroTitle: "Words patients remember. A brand they trust.",
    heroParagraph: [
      "Your name, your message, your words. Patients judge them in seconds. Healthcare branding and medical copywriting make sure the verdict is trust.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What branding and copywriting grant your clinic",
    wishesHighlight: "branding and copywriting",
    wishes: [
      {
        title: "To Be Understood",
        body: "Clear positioning, so patients instantly grasp who you are and what you do.",
      },
      {
        title: "To Be Trusted",
        body: "Words that ease patient concerns and signal clinical authority, within HCSA guidelines.",
      },
      {
        title: "To Be Chosen",
        body: "Patient-centred messaging that turns a reader into an enquiry.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What branding and copywriting include",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "A good copy looks effortless.",
    mechanicsIntro:
      "Underneath sits research, positioning, and a voice built deliberately for your clinic.",
    mechanicsItems: [
      {
        title: "Audience and Keyword Research",
        body: "How your patients search, speak, and decide, so every word meets real intent.",
      },
      {
        title: "Brand Positioning",
        body: "What sets your specialist clinic apart, and why patients should choose you.",
      },
      {
        title: "Brand Identity and Voice",
        body: "A name, tone, and personality that feels credible, human, and unmistakably yours.",
      },
      {
        title: "Website and Page Copywriting",
        body: "Medical website copy that informs, reassures, and converts.",
      },
      {
        title: "Content and Campaign Copy",
        body: "Patient-centred messaging across web, social, email, and campaigns, consistent everywhere.",
      },
      {
        title: "AI-Assisted, Human-Crafted",
        body: "AI for speed and sharpness, a human shaping every line for tone, accuracy, and compliance.",
      },
    ],
    specialtySubtitle: "Specialist clinic branding",
    specialtyTitle: "Every specialty speaks differently",
    specialtyLead: "",
    specialties: [
      {
        title: "Aesthetic and Dermatology",
        body: "Branding and copywriting for skin, aesthetic, and procedure-led clinics.",
      },
      {
        title: "Dental and Orthodontics",
        body: "Branding and copywriting for dental, implant, and orthodontic practices.",
      },
      {
        title: "Medical and Specialist Clinics",
        body: "Copywriting for doctors across endocrine, cardiology, neurology, and other specialist care.",
      },
    ],
    grantedSubtitle: "Our work",
    grantedTitle: "Clinics whose voice we have shaped.",
    grantedIntro:
      "Specialist clinics across Singapore trust Clinic Genie with their brand and their words.",
    grantedWishes: [
      {
        name: "Cedar Endocrine Clinic",
        summary: "Branding, identity, and website copywriting.",
        href: CEDAR,
      },
      {
        name: "The Heart Specialist Clinic",
        summary: "Branding and patient-focused copy.",
        href: PORTFOLIO,
      },
      {
        name: "Clementi Family and Aesthetic Clinic",
        summary: "Brand voice and website copy.",
        href: PORTFOLIO,
      },
      {
        name: "Joyful Seeds Paediatrics",
        summary: "Branding and patient education content.",
        href: JOYFUL,
      },
    ],
    grantedCta: PORTFOLIO_CTA,
    complianceTitle: "Magic with a conscience.",
    complianceBody:
      "In healthcare, the wrong word costs more than a click. We build SMC compliant copywriting and ethical medical branding into every line, and wherever AI lends a hand, a human checks the work. A message that earns trust while guarding your reputation, within Singapore's HCSA guidelines for medical text and SMC rules.",
    complianceCta: COMPLIANCE_CTA,
    faqs: [
      {
        q: "What does a medical copywriter actually do?",
        a: "We turn clinical expertise into clear, compliant, patient-friendly words, for your website, content, and campaigns, built around a medical communication strategy.",
      },
      {
        q: "How is healthcare branding different from a logo?",
        a: "A logo is one part. Branding is your whole identity: positioning, voice, message, and the trust they build. We shape all of it.",
      },
      {
        q: "Is your copywriting compliant with HCSA and SMC rules?",
        a: "Yes. Every word follows HCSA guidelines for medical text and SMC rules, with no exaggerated claims.",
      },
      {
        q: "Do you use AI to write the content?",
        a: "We use AI to research and draft faster, then a human writer shapes every line for tone, accuracy, and compliance. The judgement is always human.",
      },
      {
        q: "Can a good copy really bring more patients?",
        a: "Yes. Clear positioning and patient-centric messaging remove trust barriers and turn more readers into enquiries.",
      },
    ],
    finalSubtitle: "Ready to be heard?",
    finalTitle: "What is your clinic's growth wish?",
    finalParagraph:
      "Tell us about your clinic, your specialty, and the patients you hope to reach. No vague wishes. No confusing jargon. Just a clearer path to being understood, trusted, and chosen.",
    finalPrimaryCta: FINAL_PRIMARY_CTA,
  },

  // ───────────────────────────── 5. Web Design + Development ─────────────────────────────
  {
    slug: "web-design-development",
    name: "Web Design + Development",
    accent: "#6CBAD9",
    heroSubtitle: "Web Design and Development",
    heroTitle: "Where first impressions become first appointments.",
    heroParagraph: [
      "A patient's first impression is your website. Clinic web design that earns trust in seconds and turns visitors into enquiries.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What web development grants your clinic",
    wishesHighlight: "web development",
    wishes: [
      {
        title: "To Be Clear",
        body: "A clean, mobile-first medical website patients understand in seconds.",
      },
      {
        title: "To Be Trusted",
        body: "Secure and PDPA-compliant, protecting patient data and your reputation.",
      },
      {
        title: "To Be Chosen",
        body: "Conversion optimisation built in, turning visits into booked enquiries.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What healthcare web development includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "A clinic website is judged in seconds and built in layers. ",
    mechanicsIntro:
      "Design, code, and performance, each one deliberate. Magic on the surface, clean code underneath.",
    mechanicsItems: [
      {
        title: "Design and Prototyping",
        body: "The patient journey is mapped and designed before a single page is built.",
      },
      {
        title: "Custom Clinic Web Design",
        body: "Shaped around your brand, your patients, and your enquiry goals.",
      },
      {
        title: "Development and Build",
        body: "Clean, modern code for medical sites that stay fast and reliable.",
      },
      {
        title: "Speed and Responsiveness",
        body: "Fast-loading clinic websites that work on every screen, mobile first.",
      },
      {
        title: "Patient Enquiry Architecture",
        body: "Forms and pathways that guide visitors smoothly from interest to booking.",
      },
      {
        title: "SEO-Ready Foundations",
        body: "Structured to rank from day one, ready for search and AI tools.",
      },
    ],
    specialtySubtitle: "Specialist clinic websites",
    specialtyTitle: "Every specialty needs a different journey",
    specialtyLead: "An aesthetic clinic's website should feel different from a cardiology or dental practice. We design each site around how your patients browse, trust, and decide.",
    specialties: [
      {
        title: "Dental",
        body: "Websites that explain procedures, pricing, and next steps without friction.",
      },
      {
        title: "Ophthalmology",
        body: "Built for readability, accessibility, and easy booking.",
      },
      {
        title: "Digestive Medicine",
        body: "Websites patients can research privately and book discreetly.",
      },
    ],
    grantedSubtitle: "Our work",
    grantedTitle: "Clinics whose websites we have built.",
    grantedIntro:
      "Specialist clinics across Singapore trust Clinic Genie with their websites.",
    grantedWishes: [
      {
        name: "Cedar Endocrine Clinic",
        summary: "Branding, web design, and development.",
        href: CEDAR,
      },
      {
        name: "The Heart Specialist Clinic",
        summary: "Full website design and build.",
        href: PORTFOLIO,
      },
      {
        name: "Clementi Family and Aesthetic Clinic",
        summary: "Web design and development.",
        href: PORTFOLIO,
      },
      {
        name: "Singapore Dental Implant Centre",
        summary: "Clinic website and enquiry flow.",
        href: PORTFOLIO,
      },
    ],
    grantedCta: PORTFOLIO_CTA,
    complianceTitle: "Magic with a conscience.",
    complianceBody:
      "In healthcare, a careless page costs more than a click. We build every site with an HCSA compliant website layout, a PDPA-compliant medical website structure, and secure forms, with human review wherever AI lends a hand. Websites that grow enquiries while guarding patient data and your reputation, within Singapore's HCSA, PDPA, and SMC guidelines for website content.",
    complianceCta: COMPLIANCE_CTA,
    faqs: [
      {
        q: "How long does it take to build a clinic website?",
        a: "Most specialist clinic websites take four to eight weeks, depending on size and content. We keep every stage clear and on schedule.",
      },
      {
        q: "Will my clinic website be mobile-friendly?",
        a: "Yes. Every site is a mobile-responsive medical website, built mobile first, since most patients browse on their phones.",
      },
      {
        q: "Is my patients' data secure?",
        a: "Yes. We build secure patient intake forms and a PDPA-compliant medical website, protecting patient information at every step.",
      },
      {
        q: "Will the website be built for SEO?",
        a: "Yes. We build SEO-friendly medical web design with clean code and fast loading, so your site is ready to rank.",
      },
      {
        q: "Do you use AI to build the site?",
        a: "We use modern tools, including AI-assisted development, to work faster, then a human reviews every build for quality and compliance.",
      },
    ],
    finalSubtitle: "Ready to be found and booked?",
    finalTitle: "What is your clinic's growth wish?",
    finalParagraph:
      "Tell us about your clinic, your specialty, and the patients you hope to reach. No vague wishes. No confusing jargon. Just a clearer path to a website that is clear, trusted, and chosen.",
    finalPrimaryCta: FINAL_PRIMARY_CTA,
  },

  // ───────────────────────────── 6. Photo + Video ─────────────────────────────
  {
    slug: "photo-video",
    name: "Photo + Video",
    accent: "#F27A8E",
    heroSubtitle: "Photography and Videography",
    heroTitle: "Faces build trust faster than words.",
    heroParagraph: [
      "Patients trust what they can see. Medical photography and video capture your clinic, your team, and your care as they really are.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What visuals grant your clinic",
    wishesHighlight: "visuals",
    wishes: [
      {
        title: "To Be Seen Clearly",
        body: "Authentic visuals of your clinic, your doctors, and your care as they truly are.",
      },
      {
        title: "To Be Trusted",
        body: "Visuals that signal clinical authority and ease patient concerns, within HCSA guidelines.",
      },
      {
        title: "To Be Remembered",
        body: "Patient-centred storytelling that stays with viewers long after they watch.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What medical video production includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "A camera doesn't lie, but it does need direction. ",
    mechanicsIntro:
      "From shoot to final cut, every frame is planned, filmed, and finished with intent. Magic on the surface, craft underneath.",
    mechanicsItems: [
      {
        title: "Clinic and Doctor Photography",
        body: "Clinic photoshoots and doctor headshots, styled and edited to feel like you.",
      },
      {
        title: "Medical Video Production",
        body: "Doctor interviews, clinic tours, and educational video, filmed and shaped for trust.",
      },
      {
        title: "Doctor Personal Branding",
        body: "Profiles and content that build a doctor's presence and clinical authority.",
      },
      {
        title: "Editing and Post-Production",
        body: "Every cut is polished, paced, and patient-ready.",
      },
      {
        title: "Social and Short-Form Cuts",
        body: "Short, scroll-stopping clips made for social and reels.",
        link: {
          label: "See our Social Media",
          href: "/services/core-pillars/social-media",
        },
      },
      {
        title: "Authentic, On-Brand Storytelling",
        body: "Your real clinic on screen, never staged or stocky.",
      },
    ],
    specialtySubtitle: "Specialist clinic visuals",
    specialtyTitle: "Every specialty tells a different story",
    specialtyLead: "An aesthetic clinic's visuals should feel different from a dental or specialist practice. We shape every shoot around your specialty, your patients, and the trust they need.",
    specialties: [
      {
        title: "Paediatrics",
        body: "Warm, friendly visuals that reassure parents and put children at ease.",
      },
      {
        title: "Cardiology",
        body: "Doctor interviews and clinic tours that make serious care feel approachable.",
      },
      {
        title: "ENT",
        body: "Procedure explainers and clinic visuals that demystify treatment for hesitant patients.",
      },
    ],
    grantedSubtitle: "Our work",
    grantedTitle: "Clinics we have brought to life",
    grantedIntro:
      "Specialist clinics across Singapore trust Clinic Genie with their photography and video.",
    grantedWishes: [
      {
        name: "Cedar Endocrine Clinic",
        summary: "Branding photography and clinic video.",
        href: CEDAR,
      },
      {
        name: "The Heart Specialist Clinic",
        summary: "Doctor interviews and clinic photography.",
        href: PORTFOLIO,
      },
      {
        name: "The Acne Clinic",
        summary: "Short-form video and social content.",
        href: ACNE,
      },
      {
        name: "Clementi Family and Aesthetic Clinic",
        summary: "Clinic photoshoot and video.",
        href: PORTFOLIO,
      },
    ],
    grantedCta: PORTFOLIO_CTA,
    complianceTitle: "Magic with a conscience.",
    complianceBody:
      "In healthcare, the wrong image costs more than a click. We create ethical clinic photography and HCSA compliant medical video, with human review wherever AI lends a hand. Compliant healthcare media that builds trust while guarding your reputation, within Singapore's HCSA and SMC guidelines for medical visuals.",
    complianceCta: COMPLIANCE_CTA,
    faqs: [
      {
        q: "Why does my clinic need professional photos and video?",
        a: "Patients trust what they see. Authentic visuals ease patient trust barriers and help patients choose you with confidence.",
      },
      {
        q: "Do you produce doctor interview videos?",
        a: "Yes. Doctor interviews are one of the strongest ways to build clinical authority and personal branding.",
      },
      {
        q: "Are your videos compliant with HCSA rules?",
        a: "Yes. We produce HCSA compliant medical video, with every piece built within Singapore's SMC guidelines for medical visuals.",
      },
      {
        q: "Can you create short videos for social media?",
        a: "Yes. We produce short-form cuts for reels and social, alongside longer-form clinic and doctor content.",
      },
      {
        q: "Do you handle photography too?",
        a: "Yes. From doctor headshot photography to full medical clinic photoshoots, we cover both photo and video.",
      },
    ],
    finalSubtitle: "Ready to be seen?",
    finalTitle: "What is your clinic's growth wish?",
    finalParagraph:
      "Tell us about your clinic, your specialty, and the patients you hope to reach. No vague wishes. No confusing jargon. Just a clearer path to being seen, trusted, and remembered.",
    finalPrimaryCta: FINAL_PRIMARY_CTA,
  },

  // ───────────────────────────── 7. Social Media ─────────────────────────────
  {
    slug: "social-media",
    name: "Social Media",
    accent: "#7FE9F0",
    heroSubtitle: "Social Media",
    heroTitle: "Today's follower. Tomorrow's patient.",
    heroParagraph: [
      "Patients follow, watch, and trust a clinic long before they book. Healthcare social media keeps your clinic present, credible, and remembered.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What social media grants your clinic",
    wishesHighlight: "social media",
    wishes: [
      {
        title: "To Be Seen",
        body: "Consistent, credible content where patients already spend their time.",
      },
      {
        title: "To Be Trusted",
        body: "Patient education that builds understanding and earns belief, within HCSA guidelines.",
      },
      {
        title: "To Be Remembered",
        body: "Engagement that keeps your clinic the first name patients think of.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What social media marketing includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Trust is built post by post.",
    mechanicsIntro:
      "Research shapes the message, strategy sets the rhythm, craft earns the follow. Magic on the surface, method underneath.",
    mechanicsItems: [
      {
        title: "Audience and Topic Research",
        body: "What your patients are actually asking, turned into content they want.",
      },
      {
        title: "Social Media Strategy",
        body: "A clear plan built around your audience, objectives, and brand voice.",
      },
      {
        title: "Content Creation",
        body: "Credible healthcare content across posts, carousels, and stories, consistent and on-brand.",
      },
      {
        title: "Medical Video Production",
        body: "Short, compliant video that explains, reassures, and builds your doctors' presence.",
        link: {
          label: "See our Photo and Video Production",
          href: "/services/core-pillars/photo-video",
        },
      },
      {
        title: "Patient Education Content",
        body: "Content that informs patients and positions your clinic as the trusted voice.",
      },
      {
        title: "AI-Assisted, Human-Crafted",
        body: "AI for speed, a human shaping every piece for tone, accuracy, and compliance.",
      },
    ],
    specialtySubtitle: "Specialist clinic social media",
    specialtyTitle: "Every specialty has its own audience",
    specialtyLead: "",
    specialties: [
      {
        title: "Dermatology",
        body: "Educational skin and treatment content, built to be followed and safely shared.",
      },
      {
        title: "Women's Health",
        body: "Sensitive topics handled with warmth, building a community patients trust.",
      },
      {
        title: "Musculoskeletal & Rehab",
        body: "Exercise tips, recovery stories, and content that keeps patients engaged between visits.",
      },
    ],
    grantedSubtitle: "Our work",
    grantedTitle: "Clinics we have helped patients follow.",
    grantedIntro:
      "Specialist clinics across Singapore trust Clinic Genie with their social presence.",
    grantedWishes: [
      {
        name: "The Acne Clinic",
        summary: "Social content and reel strategy for skin confidence.",
        href: ACNE,
      },
      {
        name: "Joyful Seeds Paediatrics",
        summary: "Patient education content for parents.",
        href: JOYFUL,
      },
      {
        name: "Cedar Endocrine Clinic",
        summary: "Credible content and video.",
        href: CEDAR,
      },
      {
        name: "The Heart Specialist Clinic",
        summary: "Doctor-led social and video.",
        href: PORTFOLIO,
      },
    ],
    grantedCta: PORTFOLIO_CTA,
    complianceTitle: "Magic with a conscience.",
    complianceBody:
      "In healthcare, the wrong post costs more than a like. We build ethical medical social media into every piece, and wherever AI lends a hand, a human checks the work. Content and compliant healthcare videos that grow trust while guarding your reputation, within Singapore's HCSA and SMC guidelines for social media.",
    complianceCta: COMPLIANCE_CTA,
    faqs: [
      {
        q: "Why does my clinic need social media?",
        a: "Patients research and judge clinics on social long before they book. A credible presence builds trust and keeps you top of mind for specialist clinic engagement.",
      },
      {
        q: "Is healthcare social media compliant with HCSA rules?",
        a: "Yes. We run HCSA compliant social media, with every post and video built within Singapore's SMC guidelines for social media.",
      },
      {
        q: "Do you create video content?",
        a: "Yes. We produce compliant medical video production, from doctor interviews to short educational reels.",
      },
      {
        q: "Can social media really bring patients?",
        a: "Indirectly, yes. It builds the trust and recall that lead patients to choose you when they are ready.",
      },
      {
        q: "Do you use AI to create the content?",
        a: "We use AI to plan and produce faster, then a human shapes every piece for tone, accuracy, and compliance.",
      },
    ],
    finalSubtitle: "Ready to be followed?",
    finalTitle: "What is your clinic's growth wish?",
    finalParagraph:
      "Tell us about your clinic, your specialty, and the patients you hope to reach. No vague wishes. No confusing jargon. Just a clearer path to being seen, trusted, and remembered.",
    finalPrimaryCta: FINAL_PRIMARY_CTA,
  },

  // ───────────────────────────── 8. GEO + AI Search ─────────────────────────────
  {
    slug: "geo-ai-search",
    name: "GEO + AI Search",
    accent: "#8E7BE8",
    heroSubtitle: "GEO and AI Search",
    heroTitle: "When patients ask AI, be the answer.",
    heroParagraph: [
      "Patients no longer just Google. They ask AI for a recommendation and act on the answer. GEO makes sure your clinic is the answer they receive.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What AI search grants your clinic",
    wishesHighlight: "AI search",
    wishes: [
      {
        title: "To Be Understood",
        body: "Content structured so AI tools grasp exactly what your clinic does.",
      },
      {
        title: "To Be Trusted",
        body: "Authority signals that both Google and AI recognise, within HCSA guidelines.",
      },
      {
        title: "To Be Cited",
        body: "When patients ask AI for a recommendation, your clinic gets named.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What AI search optimization includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "AI doesn't rank pages, it chooses answers.",
    mechanicsIntro:
      "We structure your clinic to be the one it chooses. Magic on the surface, structure underneath.",
    mechanicsItems: [
      {
        title: "Conversational Keyword Research",
        body: "Mapping how patients actually ask AI, not just what they type.",
      },
      {
        title: "Structured Data and Schema",
        body: "Medical schema markup so search engines and AI read your clinic clearly.",
      },
      {
        title: "AI-Ready Content Architecture",
        body: "Content organised so AI tools can understand, trust, and reuse it.",
      },
      {
        title: "Entity and Authority Mapping",
        body: "Connecting your clinic, doctors, and services into one clear, trusted whole.",
      },
      {
        title: "Citation and Local Consistency",
        body: "Consistent citations and digital PR, building the signals AI trusts.",
      },
      {
        title: "Optimising for AI Platforms",
        body: "Visibility in Google AI Overviews, ChatGPT, and Perplexity, where patients now ask.",
      },
    ],
    specialtySubtitle: "Specialist clinic AI search",
    specialtyTitle: "Every specialty is asked about differently",
    specialtyLead: "The way patients ask AI about acne differs from how they ask about heart screening or implants. We shape your AI-ready content around how your specialty's patients actually ask.",
    specialties: [
      {
        title: "Respiratory Medicine",
        body: "Patients ask AI about symptoms first. Be the clinic those answers point to.",
      },
      {
        title: "Renal & Urological Care",
        body: "Private questions go to AI before anyone else. Be the trusted name in the reply.",
      },
      {
        title: "Infectious Diseases",
        body: "When health questions spike, AI answers first. Be the credible source it cites.",
      },
    ],
    grantedSubtitle: "Our work",
    grantedTitle: "Clinics we are making AI-ready.",
    grantedIntro:
      "Specialist clinics across Singapore trust Clinic Genie to prepare them for AI search.",
    grantedWishes: [
      {
        name: "Cedar Endocrine Clinic",
        summary: "Schema, structure, and AI-ready content.",
        href: CEDAR,
      },
      {
        name: "The Heart Specialist Clinic",
        summary: "Entity mapping and AI visibility.",
        href: PORTFOLIO,
      },
      {
        name: "Medical and Surgical Dermatology Clinic",
        summary: "Structured data and authority signals.",
        href: PORTFOLIO,
      },
      {
        name: "Singapore Dental Implant Centre",
        summary: "AI-ready content and schema.",
        href: PORTFOLIO,
      },
    ],
    grantedCta: PORTFOLIO_CTA,
    complianceTitle: "Magic with a conscience.",
    complianceBody:
      "In healthcare, the wrong answer costs more than a click. We build HCSA compliant AI marketing into every page, with compliant clinical data structuring and human review wherever AI lends a hand. Visibility in AI search that grows trust while guarding your reputation, within Singapore's HCSA, PHMC, and SMC guidelines.",
    complianceCta: COMPLIANCE_CTA,
    faqs: [
      {
        q: "What is AI search optimization?",
        a: "It prepares your clinic to be found and cited by AI tools like Google AI Overviews, ChatGPT, and Perplexity, not just traditional search. It is also called answer engine optimization, or GEO.",
      },
      {
        q: "How do I get my clinic to appear in ChatGPT or Perplexity?",
        a: "Through LLM optimization: structured data, clear authority signals, and content built so AI can understand and cite you.",
      },
      {
        q: "Is schema markup important for clinics?",
        a: "Yes. Medical schema markup helps both search engines and AI understand your clinic, doctors, and services clearly.",
      },
      {
        q: "What is E-E-A-T and why does it matter?",
        a: "E-E-A-T for medical websites (experience, expertise, authoritativeness, trust) is how Google and AI judge medical content. Strong E-E-A-T means you are surfaced more often.",
      },
      {
        q: "Is AI search optimisation compliant with HCSA rules?",
        a: "Yes. We build HCSA compliant AI marketing, with all content structured and reviewed within Singapore's guidelines.",
      },
    ],
    finalSubtitle: "Ready to be the answer?",
    finalTitle: "What is your clinic's growth wish?",
    finalParagraph:
      "Tell us about your clinic, your specialty, and the patients you hope to reach. No vague wishes. No confusing jargon. Just a clearer path to being understood, trusted, and chosen, by patients and the AI they ask.",
    finalPrimaryCta: FINAL_PRIMARY_CTA,
  },
];

export function getPillar(slug: string) {
  return CORE_PILLARS.find((p) => p.slug === slug);
}
