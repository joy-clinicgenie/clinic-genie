import type { Faq } from "@/lib/data/faqs";
import { getSpecialtyHub, getSpecialtyHubHref } from "@/lib/data/specialty-hubs";

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
  body: string;
  link: CtaLink;
}

export interface GrantedWish {
  name: string;
  summary: string;
  href: string;
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

  // 4 — Why clinics join (FindClinic only)
  whyJoin?: {
    subtitle: string;
    title: string;
    paragraph: string;
    points: PillarCard[];
  };

  // 5 — Specialty matrix
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

function specialtyHref(slug: string): string {
  const hub = getSpecialtyHub(slug);
  return hub ? getSpecialtyHubHref(hub) : "/specialty-hub";
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

const AESTHETIC_HREF = specialtyHref("dermatology");
const DENTAL_HREF = specialtyHref("dental");
const MEDICAL_HREF = "/specialty-hub";

/** Project detail pages are temporarily unlinked; point to the Our Works index. */
const CEDAR = PORTFOLIO;
const JOYFUL = PORTFOLIO;
const ACNE = PORTFOLIO;

export const CORE_PILLARS: CorePillar[] = [
  // ───────────────────────────── 1. FindClinic.sg ─────────────────────────────
  {
    slug: "findclinic",
    name: "FindClinic.sg",
    accent: "#6CBAD9",
    heroSubtitle: "FindClinic.sg",
    heroTitle: "Where patients discover the right care, with clarity.",
    heroParagraph: [
      "The Clinic Genie wish does not stop at your website. FindClinic.sg is a healthcare discovery platform that connects patients with specialist clinics across Singapore, through verified listings, doctor profiles, and real conversations with local doctors.",
      "One more way for the right patients to find you.",
    ],
    heroPrimaryCta: { label: "Join FindClinic.sg", href: CONTACT },
    heroSecondaryCta: { label: "Explore the Platform", href: FINDCLINIC_URL },
    wishesSubtitle: "The Clinic Genie ecosystem",
    wishesTitle: "Clinic Genie builds your visibility. FindClinic.sg extends it.",
    wishesIntro: [
      "Clinic Genie grows your clinic's presence through SEO, websites, content, and campaigns.",
      "FindClinic.sg carries that visibility further, onto a dedicated clinic discovery network where patients are already searching, comparing, and deciding. Two parts of the same wish: helping the right patients find the right care.",
    ],
    wishes: [],
    mechanicsId: "offers",
    mechanicsSubtitle: "What's on the platform",
    mechanicsTitle: "A clearer path from search to the right clinic.",
    mechanicsLead: "What FindClinic.sg offers",
    mechanicsIntro:
      "FindClinic.sg brings the information patients look for into one trusted Singapore healthcare directory.",
    mechanicsItems: [
      {
        title: "Verified Doctor Profiles",
        body: "Each profile features qualifications, clinic details, and insights straight from the doctor.",
      },
      {
        title: "Medical Clinic Listings",
        body: "Clear, verified medical clinic listings that help patients understand and compare specialist care.",
      },
      {
        title: "Specialist Media Interviews",
        body: "Real health advice from local specialists, the doctor-led content patients trust most.",
      },
      {
        title: "Healthcare Article Publishing",
        body: "Patient-friendly medical education that answers real questions and builds health literacy.",
      },
      {
        title: "Search and AI Visibility",
        body: "Patient-facing healthcare information is structured so Google and AI tools surface it clearly.",
      },
      {
        title: "High-Authority Local Citations",
        body: "A presence that strengthens your clinic's high-authority local citations and search credibility.",
      },
    ],
    whyJoin: {
      subtitle: "The clinic advantage",
      title: "Be discovered, understood, and chosen.",
      paragraph:
        "A listing on FindClinic.sg is more than a directory entry. It is doctor-led content marketing that builds trust before a patient ever enquires.",
      points: [
        {
          title: "Specialist Practice Amplification",
          body: "Extend your reach through specialist practice amplification across the platform and its channels.",
        },
        {
          title: "Ethical Patient Acquisition",
          body: "Ethical patient acquisition pathways that guide interested patients toward the right next step.",
        },
        {
          title: "Trusted Discovery",
          body: "A credible, SMC-compliant presence patients can rely on while they compare and decide.",
        },
      ],
    },
    specialtySubtitle: "Specialist discovery",
    specialtyTitle: "Built for Your Specialty",
    specialtyLead:
      "Every specialty is searched differently. FindClinic.sg already features specialists across oncology, neurosurgery, dermatology, geriatrics, and dental care, with room for more.",
    specialties: [
      {
        title: "Aesthetic and Dermatology",
        body: "Aesthetic specialist listings for skin, aesthetic, and procedure-led clinics.",
        link: { label: "Explore aesthetic listings", href: FINDCLINIC_URL },
      },
      {
        title: "Dental and Orthodontics",
        body: "Dental clinic search networks for implant, oral surgery, and orthodontic practices.",
        link: { label: "Explore dental listings", href: FINDCLINIC_URL },
      },
      {
        title: "Medical and Specialist Clinics",
        body: "Verified profiles for oncology, neurosurgery, geriatrics, and other specialist care.",
        link: { label: "Explore specialist listings", href: FINDCLINIC_URL },
      },
    ],
    grantedSubtitle: "Clinics on the platform",
    grantedTitle: "Specialists patients are already finding.",
    grantedIntro: "Clinics already discovered through FindClinic.sg include:",
    grantedWishes: [
      {
        name: "Parkway Cancer Centre",
        summary: "Oncology, Gleneagles Hospital.",
        href: FINDCLINIC_URL,
      },
      {
        name: "Singapore Brain Spine Nerves Centre",
        summary: "Neurosurgery, Camden Medical.",
        href: FINDCLINIC_URL,
      },
      {
        name: "Medical and Surgical Dermatology Centre",
        summary: "Dermatology, Novena Medical Centre.",
        href: FINDCLINIC_URL,
      },
      {
        name: "The Straits Geriatrics Centre",
        summary: "Geriatrics, Gleneagles Medical Centre.",
        href: FINDCLINIC_URL,
      },
      {
        name: "Singapore Dental Implant Centre",
        summary: "Dental and implants.",
        href: FINDCLINIC_URL,
      },
    ],
    grantedCta: { label: "Explore Clinic Listings", href: FINDCLINIC_URL },
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
      "Patients search Google long before they call. Healthcare SEO makes sure your clinic is the answer they find, and the one they trust.",
      "Clinic Genie is a healthcare SEO agency for specialist clinics, blending search data, proven tools, and AI to turn quiet searches into real enquiries, all within HCSA and SMC guidelines.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What healthcare SEO grants your clinic",
    wishes: [
      {
        title: "To Be Found",
        body: "Appear the moment patients search. We target the exact terms patients type, then build the pages that rank.",
      },
      {
        title: "To Be Trusted",
        body: "Show up with credibility. Compliant, patient-focused content that earns confidence, within SMC guidelines.",
      },
      {
        title: "To Be Chosen",
        body: "Turn searches into bookings. Clear journeys and local SEO that drive organic patient acquisition.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What healthcare SEO includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Every wish needs real machinery behind it.",
    mechanicsIntro:
      "Our medical SEO services bring together everything a specialist clinic needs to rank and grow, powered by the same tools and AI the best search teams trust.",
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
        body: "Authoritative, compliant content built around patient search intent, with AI-assisted research, always human-reviewed.",
        link: {
          label: "See our Branding and Copywriting",
          href: "/services/core-pillars/branding-copywriting",
        },
      },
      {
        title: "Technical SEO",
        body: "A fast, clean, well-structured site that search engines and AI tools understand at a glance.",
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
        body: "We measure every result through Google Search Console and Google Analytics, tying rankings to real enquiries.",
      },
    ],
    specialtySubtitle: "Specialist clinic SEO",
    specialtyTitle: "Built for Your Specialty",
    specialtyLead: "Every specialty is searched differently.",
    specialties: [
      {
        title: "Aesthetic + Dermatology",
        body: "SEO for skin, aesthetic, and procedure-led clinics.",
        link: { label: "Explore aesthetic clinic SEO", href: AESTHETIC_HREF },
      },
      {
        title: "Dental + Orthodontics",
        body: "SEO for dental, implant, and orthodontic practices.",
        link: { label: "Explore dental clinic SEO", href: DENTAL_HREF },
      },
      {
        title: "Medical + Specialist Clinics",
        body: "SEO for endocrine, cardiology, neurology, and other specialist care.",
        link: { label: "Explore specialist clinic SEO", href: MEDICAL_HREF },
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
      "Some patients are not browsing. They are ready, searching for the very care you provide. Medical SEM grants their wish and yours in the same moment, placing your clinic at the top the instant they look.",
      "Clinic Genie is a healthcare Google Ads agency for specialist clinics, weaving Search, Performance Max, and video into one growth engine, measured down to every enquiry.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What medical SEM grants your clinic",
    wishes: [
      {
        title: "To Be Seen First",
        body: "Rise above every result, the instant patients search. We conjure campaigns around the high-intent search terms patients use just before they book.",
      },
      {
        title: "To Be Trusted",
        body: "Compliant ads that earn the click and the confidence, through HCSA compliant Google Ads.",
      },
      {
        title: "To Be Chosen",
        body: "Turn a single click into a booked consultation, with conversion rate optimisation for clinics built into every landing page.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What medical SEM includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Every wish needs real machinery behind it.",
    mechanicsIntro:
      "Our medical PPC services bring together the campaigns, platforms, and creativity a specialist clinic needs to win high-intent patients. Magic on the surface, precision underneath.",
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
    specialtyTitle: "Built for Your Specialty",
    specialtyLead: "Every specialty makes a different wish.",
    specialties: [
      {
        title: "Aesthetic + Dermatology",
        body: "Pay-per-click for aesthetic, skin, and procedure-led clinics.",
        link: { label: "Explore aesthetic clinic SEM", href: AESTHETIC_HREF },
      },
      {
        title: "Dental and Orthodontics",
        body: "SEM for dental, implant, and orthodontic practices.",
        link: { label: "Explore dental clinic SEM", href: DENTAL_HREF },
      },
      {
        title: "Medical and Specialist Clinics",
        body: "Pay-per-click for doctors across endocrine, cardiology, neurology, and other specialist care.",
        link: { label: "Explore specialist clinic SEM", href: MEDICAL_HREF },
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
    heroTitle: "Sound like the clinic patients can trust.",
    heroParagraph: [
      "A patient decides how they feel about your clinic in seconds, from your name, your message, your words. Healthcare branding and medical copywriting make sure that feeling is trust.",
      "Clinic Genie shapes how specialist clinics are seen and heard, blending research, strategy, and AI-assisted craft to turn clinical expertise into a message patients believe.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What branding and copywriting grant your clinic",
    wishes: [
      {
        title: "To Be Understood",
        body: "Cut through the noise with clear specialist clinic positioning, so patients instantly grasp who you are and what you do.",
      },
      {
        title: "To Be Trusted",
        body: "Words that ease patient trust barriers and signal clinical authority, all within HCSA guidelines.",
      },
      {
        title: "To Be Chosen",
        body: "Patient-centric messaging that turns a reader into an enquiry.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What branding and copywriting include",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Every wish needs real machinery behind it.",
    mechanicsIntro:
      "Our medical copywriting services and branding work bring together research, strategy, and craft. Magic on the surface, method underneath.",
    mechanicsItems: [
      {
        title: "Audience and Keyword Research",
        body: "With SEMrush and AnswerThePublic, we learn how your patients search, speak, and decide, so every word meets real intent.",
      },
      {
        title: "Brand Positioning",
        body: "We define your specialist clinic positioning: what sets you apart, and why patients should choose you.",
      },
      {
        title: "Brand Identity and Voice",
        body: "A name, tone, and personality that feels credible, human, and unmistakably yours.",
      },
      {
        title: "Website and Page Copywriting",
        body: "As your medical website copywriter, we write the pages that inform, reassure, and convert.",
      },
      {
        title: "Content and Campaign Copy",
        body: "Patient-centric messaging across web, social, email, and campaigns, consistent everywhere.",
      },
      {
        title: "AI-Assisted, Human-Crafted",
        body: "We use AI to work faster and sharper, then a human shapes every line for tone, accuracy, and compliance.",
      },
    ],
    specialtySubtitle: "Specialist clinic branding",
    specialtyTitle: "Built for Your Specialty",
    specialtyLead: "Every specialty speaks differently.",
    specialties: [
      {
        title: "Aesthetic and Dermatology",
        body: "Branding and copywriting for skin, aesthetic, and procedure-led clinics.",
        link: { label: "Explore aesthetic clinic branding", href: AESTHETIC_HREF },
      },
      {
        title: "Dental and Orthodontics",
        body: "Branding and copywriting for dental, implant, and orthodontic practices.",
        link: { label: "Explore dental clinic branding", href: DENTAL_HREF },
      },
      {
        title: "Medical and Specialist Clinics",
        body: "Copywriting for doctors across endocrine, cardiology, neurology, and other specialist care.",
        link: { label: "Explore specialist clinic branding", href: MEDICAL_HREF },
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
    heroTitle: "A clinic website that earns trust and books patients.",
    heroParagraph: [
      "Your website is often a patient's first impression, and their decision. Healthcare web development makes sure that impression is clear, fast, and trustworthy.",
      "Clinic Genie designs and builds clinic websites that load quickly, read beautifully, and turn visitors into enquiries.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What web development grants your clinic",
    wishes: [
      {
        title: "To Be Clear",
        body: "A clean, mobile-responsive medical website that patients understand in seconds.",
      },
      {
        title: "To Be Trusted",
        body: "A secure, PDPA-compliant medical website that protects patient data and your reputation, within HCSA guidelines.",
      },
      {
        title: "To Be Chosen",
        body: "Conversion rate optimisation for clinics that turns visits into booked enquiries.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What healthcare web development includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Every wish needs real machinery behind it.",
    mechanicsIntro:
      "As a medical web design agency, we bring together design, build, and performance. Magic on the surface, clean code underneath.",
    mechanicsItems: [
      {
        title: "Design and Prototyping",
        body: "We design in Figma and Photoshop, mapping the patient user experience before a single page is built.",
      },
      {
        title: "Custom Clinic Web Design",
        body: "Custom clinic web design shaped around your brand, your patients, and your enquiry goals.",
      },
      {
        title: "Development and Build",
        body: "We build with Wix and modern tools like Cursor, writing clean code for medical sites that stay fast and reliable.",
      },
      {
        title: "Speed and Responsiveness",
        body: "Fast-loading clinic websites that work flawlessly on every screen, mobile first.",
      },
      {
        title: "Patient Enquiry Architecture",
        body: "Patient inquiry architecture and secure patient intake forms that guide visitors smoothly from interest to booking.",
      },
      {
        title: "SEO-Ready Foundations",
        body: "SEO-friendly medical web design, structured so your site is built to rank from day one.",
      },
    ],
    specialtySubtitle: "Specialist clinic websites",
    specialtyTitle: "Built for Your Specialty",
    specialtyLead: "Every specialty needs a different journey.",
    specialties: [
      {
        title: "Aesthetic and Dermatology",
        body: "Web design for skin, aesthetic, and procedure-led clinics.",
        link: { label: "Explore aesthetic clinic web design", href: AESTHETIC_HREF },
      },
      {
        title: "Dental and Orthodontics",
        body: "Web design for dental, implant, and orthodontic practices.",
        link: { label: "Explore dental clinic web design", href: DENTAL_HREF },
      },
      {
        title: "Medical and Specialist Clinics",
        body: "Website development for doctors across endocrine, cardiology, neurology, and other specialist care.",
        link: { label: "Explore specialist clinic web design", href: MEDICAL_HREF },
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
    heroTitle: "Show patients the clinic they can trust.",
    heroParagraph: [
      "Patients trust what they can see. A real face, a calm space, a doctor who explains with warmth. Medical video production and photography turn your clinic, your team, and your care into visuals that build instant trust.",
      "Clinic Genie captures the authentic story behind your expertise.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What visuals grant your clinic",
    wishes: [
      {
        title: "To Be Seen Clearly",
        body: "Authentic medical content that shows your clinic, doctors, and care as they truly are.",
      },
      {
        title: "To Be Trusted",
        body: "Clinical authority visuals that ease patient trust barriers, within HCSA guidelines.",
      },
      {
        title: "To Be Remembered",
        body: "Patient-centric storytelling that stays with patients long after they watch.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What medical video production includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Every wish needs real machinery behind it.",
    mechanicsIntro:
      "As a healthcare photography agency and video team, we handle everything from shoot to final cut. Magic on the surface, craft underneath.",
    mechanicsItems: [
      {
        title: "Clinic and Doctor Photography",
        body: "Medical clinic photoshoots and doctor headshot photography, edited in Photoshop and Lightroom.",
      },
      {
        title: "Medical Video Production",
        body: "Doctor interviews, clinic tours, and educational video, filmed and shaped for trust.",
      },
      {
        title: "Doctor Personal Branding",
        body: "Specialist doctor profiles and content that build doctor personal branding and clinical authority.",
      },
      {
        title: "Editing and Post-Production",
        body: "Edited in Premiere, After Effects, and CapCut, polished, paced, and patient-ready.",
      },
      {
        title: "Social and Short-Form Cuts",
        body: "Short, scroll-stopping clips built in Canva and CapCut for social and reels.",
        link: {
          label: "See our Social Media",
          href: "/services/core-pillars/social-media",
        },
      },
      {
        title: "Authentic, On-Brand Storytelling",
        body: "Authentic medical content that reflects your real clinic, never staged or stocky.",
      },
    ],
    specialtySubtitle: "Specialist clinic visuals",
    specialtyTitle: "Built for Your Specialty",
    specialtyLead: "Every specialty tells a different story.",
    specialties: [
      {
        title: "Aesthetic and Dermatology",
        body: "Aesthetic clinic videography for skin, aesthetic, and procedure-led clinics.",
        link: { label: "Explore aesthetic clinic visuals", href: AESTHETIC_HREF },
      },
      {
        title: "Dental and Orthodontics",
        body: "Dental practice photography for dental, implant, and orthodontic clinics.",
        link: { label: "Explore dental clinic visuals", href: DENTAL_HREF },
      },
      {
        title: "Medical and Specialist Clinics",
        body: "Corporate video for doctors across endocrine, cardiology, neurology, and other specialist care.",
        link: { label: "Explore specialist clinic visuals", href: MEDICAL_HREF },
      },
    ],
    grantedSubtitle: "Our work",
    grantedTitle: "Clinics we have brought to life.",
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
    heroTitle: "Stay in the minds of patients, long before they need you.",
    heroParagraph: [
      "Patients follow, watch, and trust a clinic long before they book. Healthcare social media marketing keeps your clinic present, credible, and remembered.",
      "Clinic Genie creates content built on research, shaped to your brand voice, and tailored to your patients, turning quiet scrolls into lasting trust.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What social media grants your clinic",
    wishes: [
      {
        title: "To Be Seen",
        body: "Stay visible where patients spend their time, with consistent, credible healthcare content.",
      },
      {
        title: "To Be Trusted",
        body: "Patient education content that builds health literacy and earns belief, within HCSA guidelines.",
      },
      {
        title: "To Be Remembered",
        body: "Specialist clinic engagement that keeps your clinic top of mind, so you are the first name patients think of.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What social media marketing includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Every wish needs real machinery behind it.",
    mechanicsIntro:
      "Our healthcare content creation brings together research, strategy, and craft. Magic on the surface, method underneath.",
    mechanicsItems: [
      {
        title: "Audience and Topic Research",
        body: "With SEMrush and AnswerThePublic, we learn what your patients are asking, then turn it into content they want.",
      },
      {
        title: "Social Media Strategy",
        body: "A clear plan built around your target audience, your objectives, and your brand voice.",
      },
      {
        title: "Content Creation",
        body: "Credible healthcare content across posts, carousels, and stories, consistent and on-brand.",
      },
      {
        title: "Medical Video Production",
        body: "Short, compliant video that explains, reassures, and builds doctor personal branding.",
        link: {
          label: "See our Photo and Video Production",
          href: "/services/core-pillars/photo-video",
        },
      },
      {
        title: "Patient Education Content",
        body: "Health literacy marketing that informs patients and positions your clinic as the trusted voice.",
      },
      {
        title: "AI-Assisted, Human-Crafted",
        body: "We use AI to plan and produce faster, then a human shapes every piece for tone, accuracy, and compliance.",
      },
    ],
    specialtySubtitle: "Specialist clinic social media",
    specialtyTitle: "Built for Your Specialty",
    specialtyLead: "Every specialty has its own audience.",
    specialties: [
      {
        title: "Aesthetic and Dermatology",
        body: "Aesthetic clinic social media for skin, aesthetic, and procedure-led clinics.",
        link: { label: "Explore aesthetic clinic social", href: AESTHETIC_HREF },
      },
      {
        title: "Dental and Orthodontics",
        body: "Dental social media marketing for dental, implant, and orthodontic practices.",
        link: { label: "Explore dental clinic social", href: DENTAL_HREF },
      },
      {
        title: "Medical and Specialist Clinics",
        body: "Social media for doctors across endocrine, cardiology, neurology, and other specialist care.",
        link: { label: "Explore specialist clinic social", href: MEDICAL_HREF },
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
    heroTitle: "Be the answer, even when no one is searching.",
    heroParagraph: [
      "Patients no longer just Google. They ask ChatGPT, Perplexity, and Google's AI for a recommendation, and act on the answer. AI search optimization makes sure your clinic is the answer they receive.",
      "Clinic Genie structures your content so AI tools understand, trust, and surface your clinic, the moment a patient asks.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See how the magic works", href: "#mechanics" },
    wishesSubtitle: "What AI search grants your clinic",
    wishes: [
      {
        title: "To Be Understood",
        body: "Build AI-ready content architecture so machines grasp exactly what your clinic does.",
      },
      {
        title: "To Be Trusted",
        body: "Strong E-E-A-T for medical websites that signals authority to both Google and AI, within HCSA guidelines.",
      },
      {
        title: "To Be Cited",
        body: "Answer engine optimization that lifts your LLM citation frequency, so AI tools name your clinic first.",
      },
    ],
    mechanicsId: "mechanics",
    mechanicsSubtitle: "What AI search optimization includes",
    mechanicsTitle: "The Mechanics Behind the Magic",
    mechanicsLead: "Every wish needs real machinery behind it.",
    mechanicsIntro:
      "We prepare your clinic for a search world led by AI. Magic on the surface, structure underneath.",
    mechanicsItems: [
      {
        title: "Conversational Keyword Research",
        body: "Using SEMrush and AnswerThePublic, we map conversational search intent: the way patients actually ask AI, not just type.",
      },
      {
        title: "Structured Data and Schema",
        body: "We add structured data for clinics and medical schema markup, so search engines and AI read your clinic clearly.",
      },
      {
        title: "AI-Ready Content Architecture",
        body: "Content built for semantic relevance, organised so LLMs can understand and reuse it.",
      },
      {
        title: "Entity and Authority Mapping",
        body: "Authoritative entity mapping that connects your clinic, doctors, and services into a clear, trusted whole.",
      },
      {
        title: "Citation and Local Consistency",
        body: "Local citation consistency and digital PR for clinic visibility, building the signals AI trusts.",
      },
      {
        title: "Optimising for AI Platforms",
        body: "We optimize for Google AI Overviews and visibility in ChatGPT and Perplexity, the answer engines patients now use.",
      },
    ],
    specialtySubtitle: "Specialist clinic AI search",
    specialtyTitle: "Built for Your Specialty",
    specialtyLead: "Every specialty is asked about differently.",
    specialties: [
      {
        title: "Aesthetic and Dermatology",
        body: "AI search optimisation for skin, aesthetic, and procedure-led clinics.",
        link: { label: "Explore aesthetic clinic AI search", href: AESTHETIC_HREF },
      },
      {
        title: "Dental and Orthodontics",
        body: "AI search optimisation for dental, implant, and orthodontic practices.",
        link: { label: "Explore dental clinic AI search", href: DENTAL_HREF },
      },
      {
        title: "Medical and Specialist Clinics",
        body: "AI search optimisation for endocrine, cardiology, neurology, and other specialist care.",
        link: { label: "Explore specialist clinic AI search", href: MEDICAL_HREF },
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
