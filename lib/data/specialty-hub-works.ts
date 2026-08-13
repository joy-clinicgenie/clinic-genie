import type { CaseStudy } from "@/lib/data/portfolio";

export interface SpecialtyHubWorkMeta {
  studySlug: string;
  image: string;
  imageAlt: string;
  /** Optional specialty hero background under /public/specialty-hub */
  heroImage?: string;
  /** Client logo for the case-study hero brand mark */
  logo?: string;
  logoAlt?: string;
}

export const HUB_CASE_STUDY_META: Record<string, SpecialtyHubWorkMeta> = {
  "aquatic-physio": {
    studySlug: "aquaphysio",
    image: "/works/aquaphysio/aquaphysio-mockup.png",
    imageAlt: "AquaPhysio Rehab Centre website mockup on laptop",
    logo: "/clients/aquaphysio.png",
    logoAlt: "AquaPhysio Rehab Centre",
  },
  endocrinology: {
    studySlug: "cedar-endocrine-clinic",
    image: "/works/cedar/cedar-mockup.png",
    imageAlt: "Cedar Endocrine Clinic website mockup on laptop",
    logo: "/clients/cedar-endocrine.png",
    logoAlt: "Cedar Endocrine Clinic",
  },
  dermatology: {
    studySlug: "msdc",
    image: "/works/msdc/msdc-paperbag.jpg",
    imageAlt: "Medical and Surgical Dermatology Clinic website and brand work",
    logo: "/clients/medical-surgical-dermatology.png",
    logoAlt: "Medical & Surgical Dermatology",
  },
  dental: {
    studySlug: "singapore-dental-implant-centre",
    image: "/works/sdic.png",
    imageAlt: "Singapore Dental Implant Centre reception and clinic branding",
    logo: "/clients/singapore-dental-implant-centre.png",
    logoAlt: "Singapore Dental Implant Centre",
  },
  neurology: {
    studySlug: "singapore-brain-spine-nerves",
    image: "/works/sbsn/sbsn-mockup.png",
    imageAlt: "Singapore Brain Spine Nerves Center website mockup on laptop",
    logo: "/clients/singapore-brain-spine-nerves-center.png",
    logoAlt: "Singapore Brain Spine Nerves Center",
  },
  cardiology: {
    studySlug: "sunrise-heart",
    image: "/works/sunrise/sunrise-mockup.png",
    imageAlt: "Sunrise Heart Specialist Clinic website mockup on laptop",
    heroImage: "/specialty-hub/specialty-cardiology.png",
    logo: "/clients/sunrise-heart.png",
    logoAlt: "Sunrise Heart Clinic",
  },
  acne: {
    studySlug: "the-acne-clinic",
    image: "/works/tac/TAC-posters.png",
    imageAlt: "The Acne Clinic treatment room with educational posters on acne causes, scarring, and patient care",
    logo: "/clients/the-acne-clinic.png",
    logoAlt: "The Acne Clinic",
  },
  paediatrics: {
    studySlug: "joyful-seeds",
    image: "/works/joyfulseeds/joyfulseeds-mockup.png",
    imageAlt: "Joyful Seeds Paediatric and Developmental Clinic website mockup on laptop",
    logo: "/clients/joyful-seeds.png",
    logoAlt: "Joyful Seeds Paediatric & Developmental Clinic",
  },
};

export function getSpecialtyHubWorkMeta(hubSlug: string): SpecialtyHubWorkMeta | undefined {
  return HUB_CASE_STUDY_META[hubSlug];
}

export const SPECIALTY_HUB_WORKS: CaseStudy[] = [
  {
    slug: "aquaphysio",
    name: "AquaPhysio Rehab Centre",
    tagline: "The flow of healing.",
    specialty: "Physiotherapy + Rehabilitation",
    line: "A licensed aquatic physiotherapy centre, positioned to be told apart from everything that merely looks like it.",
    tags: ["Branding", "Content", "Web Design", "SEO", "SEM"],
    serviceTags: ["Branding", "Copywriting", "Web Design", "SEO", "SEM"],
    result: "4 therapy streams · 1 heated pool inside a medical centre",
    accent: "#3BA8C8",
    heroTitle:
      "A licensed aquatic physiotherapy centre, positioned to be told apart from everything that merely looks like it.",
    heroHighlight: "told apart",
    heroSubtitle: "The flow of healing.",
    heroBody: "",
    heroEyebrow: "Case Study · Physiotherapy + Rehabilitation",
    projectScope: ["Branding / Copywriting / Web Design / SEO / SEM"],
    projectArchitecture: [
      { value: "04", label: "Therapy Streams" },
      { value: "01", label: "Heated Pool Inside a Medical Centre" },
    ],
    snapshot: {
      clinicType: "Licensed physiotherapy and aquatic rehabilitation centre",
      projectFocus: "Brand and voice, website structure, therapy architecture, healthcare SEO, paid search",
      mainChallenge:
        "A genuinely rare facility, a licensed clinical team, and a category quietly diluted by everyone who owns a pool. AquaPhysio's greatest strength is also its biggest vulnerability: water therapy sells, so unregulated operators run pool sessions in condominiums and call it aqua therapy. The work had to make a licensed clinical service distinguishable from a swim class, without disparaging anyone.",
      role: "Brand, copywriting, website structure, therapy architecture, search planning, content direction, and SEM",
    },
    beforeIntro:
      "A genuinely rare facility, a licensed clinical team, and a category quietly diluted by everyone who owns a pool. AquaPhysio's greatest strength is also its biggest vulnerability: water therapy sells, so unregulated operators run pool sessions in condominiums and call it aqua therapy. The work had to make a licensed clinical service distinguishable from a swim class, without disparaging anyone.",
    before: [
      {
        title: "A differentiator anyone can claim",
        body: "A heated therapy pool inside Camden Medical Centre is unusual. The phrase \"aqua therapy\" is not. The distinction had to be built into the site, not just asserted on it.",
      },
      {
        title: "Nobody searches for the solution",
        body: "Patients search knee pain, slipped disc, or physio near Orchard. Almost nobody searches aquatic physiotherapy. The architecture had to catch the symptom and introduce the water later.",
      },
      {
        title: "Trust without a single name",
        body: "Credibility here rests on facility, licensing, and registered therapists rather than one recognisable doctor. That needs a different kind of proof.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses: how patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That produced trust signals built on licensing and facility rather than a single name, and one rule for everything that followed: catch the symptom first, introduce the water later.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before choosing a clinic, and which queries signal real enquiry intent.",
      },
      {
        title: "Service Clarity",
        body: "Whether therapies are grouped, explained, and connected in a way patients can follow without guessing.",
      },
      {
        title: "Trust Signals",
        body: "Where credibility is built through licensing, registration, facility, and responsible claims.",
      },
      {
        title: "Enquiry Readiness",
        body: "Whether call, WhatsApp, and booking actions appear at the moments patients are ready to act.",
      },
    ],
    workedOnIntro:
      "Five workstreams, one goal: help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand and voice",
        body: "An identity built around water as method rather than novelty. Calm, clinical, and unmistakably a healthcare setting rather than a wellness one.",
      },
      {
        title: "Therapy architecture",
        body: "Four streams: aquatic, electrotherapy, precision, and combined. Patients choose by what their body needs, not by what equipment the clinic owns.",
      },
      {
        title: "Copywriting",
        body: "Hedged, honest language throughout. What therapy may help with, what a session involves, and who it suits, without promising recovery timelines.",
      },
      {
        title: "Category clarity content",
        body: "A plain guide to choosing water-based rehabilitation: what a licensed facility looks like, why a registered physiotherapist matters, and what questions to ask. Educational, not adversarial, and it does the positioning work no strapline could.",
      },
      {
        title: "Search intent mapping",
        body: "Condition and symptom searches mapped first, therapy modality second, with local Orchard intent layered on top, and the SEO foundation, blog programme, and Google Ads structure built on that map.",
      },
    ],
    strategyIntro:
      "Brand, copy, website, organic search, and paid search were built as one system, all reinforcing the same distinction between regulated care and everything adjacent to it.",
    strategyBody: "",
    strategyShifts: [
      { before: "Water framed as the offer", after: "Water framed as one clinical method among four" },
      { before: "Credentials assumed", after: "Licensing and registration stated plainly" },
      { before: "Content written to rank", after: "Content written to help patients choose well" },
    ],
    journeyIntro:
      "We reframed the website as a guided patient journey, with every part reinforcing the same distinction between regulated care and everything adjacent to it.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: ["Homepage", "Services list", "Contact"],
        new: [
          "Homepage or article",
          "Condition or symptom",
          "Therapy stream",
          "What a session involves",
          "Licensing and facility",
          "Booking",
        ],
      },
      growthSystem: ["Branding", "Copywriting", "Website UX", "SEO", "SEM"],
    },
    deliverablesTitle: "Wishes granted.",
    deliverablesHighlight: "granted",
    deliverablesIntro:
      "Practical assets and systems designed to support clearer discovery, stronger trust, and better enquiry flow.",
    deliverables: [
      "Brand identity and visual system",
      "Full website design and build",
      "Four-stream therapy architecture",
      "Site-wide copywriting in patient-first language",
      "Category clarity guide for patients choosing water-based rehab",
      "Healthcare SEO foundation and blog programme",
      "Google Ads structure and campaign planning",
    ],
    complianceIntro:
      "Rehabilitation is slow, non-linear, and different for every body. Any marketing that suggests otherwise sets a patient up to feel they have failed. Every page was written to avoid that.",
    compliancePoints: [
      {
        title: "Built within the rules",
        body: "Copy, structure, and claims shaped around the Healthcare Services Act and Singapore healthcare advertising guidelines from the first draft.",
        image: "/compliance/rules.png",
        alt: "Built within the rules icon",
      },
      {
        title: "Honest about variability",
        body: "Content states plainly that recovery differs week to week. No fixed timelines, no promised outcomes, no implied guarantees.",
        image: "/compliance/based-claims.png",
        alt: "Honest about variability icon",
      },
      {
        title: "Clear about what is regulated",
        body: "Patients are told what licensed physiotherapy involves and what to look for, so they can make an informed choice wherever they go.",
        image: "/compliance/patient-comm.png",
        alt: "Clear about what is regulated icon",
      },
      {
        title: "Reputation first",
        body: "Every page protects the centre's standing while making rehabilitation easier to understand and enquire about.",
        image: "/compliance/reputation-first.png",
        alt: "Reputation first icon",
      },
    ],
    changesTitle: "What the centre can now measure",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the centre can point at.",
    changes: [
      {
        title: "Search visibility",
        body: "Visibility across condition, symptom, and therapy intent.",
      },
      {
        title: "Four therapy streams",
        body: "Each structured and explained, so patients choose by need.",
      },
      {
        title: "A defended category position",
        body: "Positioning held through education rather than assertion.",
      },
      {
        title: "Booking attribution",
        body: "Click-to-booking attribution across WhatsApp, call, and form.",
      },
    ],
  },
  {
    slug: "cedar-endocrine-clinic",
    name: "Cedar Endocrine Clinic",
    tagline: "Your health nurtured.",
    specialty: "Endocrinology + Hormone Health",
    line: "Specialist endocrine care across two hospitals, made findable and easy to understand.",
    tags: ["Branding", "Web Design", "SEO", "SEM"],
    serviceTags: ["Branding", "Web Design", "SEO", "SEM", "Collaterals"],
    result: "6 treatment pillars structured · 2 locations, one enquiry path",
    accent: "#6CBAD9",
    heroTitle: "Specialist endocrine care across two hospitals, made findable and easy to understand.",
    heroHighlight: "made findable and easy to understand.",
    heroSubtitle: "Your health nurtured.",
    heroBody: "",
    heroEyebrow: "Case Study 01 / 10 · Endocrinology + Hormone Health",
    projectScope: ["Brand Strategy / Website / SEO / SEM / Collaterals"],
    projectArchitecture: [
      { value: "06", label: "Treatment Pillars" },
      { value: "02", label: "Hospital Locations" },
      { value: "01", label: "Enquiry Pathway" },
    ],
    snapshot: {
      clinicType: "Specialist endocrinology clinic",
      projectFocus: "Brand, website, condition structure, SEO, paid search, collaterals",
      mainChallenge:
        "Nobody wakes up searching for an endocrinologist. They search thyroid, diabetes, or whatever is worrying them at 11pm. The clinic needed to meet patients there, then guide them to the right consultation.",
      role: "Brand, website structure, condition architecture, search planning, content direction, SEM, and collateral design",
    },
    beforeIntro:
      "A respected specialist, and a digital presence that did not yet show it. The core problem: nobody wakes up searching for an endocrinologist. They search thyroid, diabetes, or whatever is worrying them at 11pm. The clinic needed to meet patients there, then guide them to the right consultation.",
    before: [
      {
        title: "Wide scope, thin structure",
        body: "Six condition areas inside one broad specialty, each needing its own page logic and plain explanation.",
      },
      {
        title: "Two locations, one decision",
        body: "Two hospitals is a strength. Presented unclearly, it becomes one more thing to work out before booking.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses: how patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That showed us where the brand needed a warmer voice, where the website needed stronger condition structure, and where enquiry points were missing at the moments that mattered.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before choosing a clinic, and which queries signal real enquiry intent.",
      },
      {
        title: "Service Clarity",
        body: "Whether conditions are grouped, explained, and connected in a way patients can follow without guessing.",
      },
      {
        title: "Trust Signals",
        body: "Where credibility is built through structure, doctor context, location clarity, and responsible claims.",
      },
      {
        title: "Enquiry Readiness",
        body: "Whether call, form, WhatsApp, and booking actions appear at the moments patients are ready to act.",
      },
    ],
    workedOnIntro:
      "Five workstreams, one goal: help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand identity",
        body: "A calmer, warmer clinical identity built around nurtured care, carried across web, print, and clinic collateral.",
        image: "/works/cedar.png",
        alt: "Cedar Endocrine Clinic reception with brand identity on the clinic wall",
      },
      {
        title: "Condition architecture",
        body: "Six endocrine areas structured into clear pillars, with diabetes and thyroid expanded into supporting condition pages.",
        diagram: "pillars",
      },
      {
        title: "Search intent mapping",
        body: "Pages and campaigns mapped around what patients search first, with a healthcare SEO foundation and Google Ads setup built on it.",
      },
      {
        title: "Trust-led page flow",
        body: "Page sections reordered so patients understand the doctor and the clinic before being asked to enquire.",
        image: "/works/cedar/cedar-mockup.png",
        alt: "Cedar Endocrine Clinic website homepage on a laptop mockup",
      },
      {
        title: "Conversion touchpoints",
        body: "Call, WhatsApp, booking form, and appointment CTAs reviewed and placed across both locations.",
      },
    ],
    strategyIntro:
      "The project gave the clinic a clearer brand foundation, stronger condition page logic, better paid search direction, and a more connected enquiry journey.",
    strategyBody:
      "Brand, website, search, and collateral stopped being four separate jobs. They became one patient discovery system.",
    strategyShifts: [
      { before: "Specialty-led navigation", after: "Condition-led navigation" },
      { before: "Single-layer treatment pages", after: "Pillars with supporting condition pages" },
      { before: "Passive contact points", after: "Call, WhatsApp, and booking placed at decision moments" },
    ],
    journeyIntro:
      "We reframed the website as a guided patient journey, not a collection of disconnected pages.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: ["Homepage", "General Treatment Page", "Contact"],
        new: [
          "Homepage",
          "Condition Pillar",
          "Specific Condition",
          "Doctor",
          "Location",
          "Booking",
        ],
      },
      growthSystem: ["Branding", "Website UX", "SEO", "SEM", "Collaterals"],
    },
    deliverablesTitle: "Wishes granted.",
    deliverablesHighlight: "granted",
    deliverablesIntro:
      "Practical assets and systems designed to support clearer discovery, stronger trust, and better enquiry flow.",
    deliverables: [
      "Brand identity and visual system",
      "Full website design and build",
      "Condition pillar and treatment page structure",
      "Healthcare SEO foundation",
      "Google Ads setup and search planning",
      "Clinic collateral and print assets",
    ],
    complianceIntro:
      "The work was designed to help patients understand the clinic while protecting the doctor's reputation and staying within healthcare advertising rules.",
    compliancePoints: [
      {
        title: "Built within the rules",
        body: "Copy, structure, and claims shaped around Singapore healthcare advertising guidelines from the first draft.",
        image: "/compliance/rules.png",
        alt: "Built within the rules icon",
      },
      {
        title: "Evidence-led language",
        body: "Claims stay grounded in what the clinic can support. What cannot be substantiated is not said.",
        image: "/compliance/based-claims.png",
        alt: "Evidence-led language icon",
      },
      {
        title: "No false promises",
        body: "No guaranteed outcomes, exaggerated comparisons, or pressure-led patient messaging.",
        image: "/compliance/no-false-promises.png",
        alt: "No false promises icon",
      },
      {
        title: "Reputation first",
        body: "Every page protects the clinic's name while making care easier to understand and enquire about.",
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
        title: "Six treatment pillars",
        body: "Search visibility across six pillars, each with its own page logic and keyword intent.",
      },
      {
        title: "Condition-level content",
        body: "Content built for real patient search intent, starting with thyroid, diabetes, and symptom queries.",
      },
      {
        title: "Paid search attribution",
        body: "Click-to-booking attribution, so the clinic can see which campaigns earn consultations.",
      },
      {
        title: "One enquiry pathway",
        body: "A single pathway across two clinic locations, so patients never have to work out where to book.",
      },
    ],
  },
  {
    slug: "msdc",
    name: "Medical & Surgical Dermatology Clinic",
    tagline: "Quality skincare for your whole family.",
    specialty: "Dermatology + Skin Surgery",
    line: "A true medical dermatology practice, structured so patients can tell it apart from everything else calling itself a skin clinic.",
    tags: ["Branding", "Content", "Web Design", "SEO", "SEM"],
    serviceTags: ["Branding", "Copywriting", "Web Design", "SEO", "SEM"],
    result: "25+ condition pages structured · 18 years of specialist practice",
    accent: "#5B8FA8",
    heroTitle:
      "A true medical dermatology practice, structured so patients can tell it apart from everything else calling itself a skin clinic.",
    heroHighlight: "tell it apart",
    heroSubtitle: "Quality skincare for your whole family.",
    heroBody: "",
    heroEyebrow: "Case Study 03 / 10 · Dermatology + Skin Surgery",
    projectScope: ["Brand Strategy / Website / SEO / SEM / Copywriting"],
    projectArchitecture: [
      { value: "25+", label: "Condition Pages" },
      { value: "18", label: "Years Practice" },
    ],
    snapshot: {
      clinicType: "Specialist medical and surgical dermatology practice",
      projectFocus: "Brand and voice, website architecture, condition structure, healthcare SEO, paid search",
      mainChallenge:
        "A rare depth of surgical credentials, a very broad clinical scope, and a category where the loudest voices are not the most qualified ones. Search for a dermatologist in Singapore and most of what comes back is aesthetics. MSDC is a medical practice led by a Mohs surgeon who built the first such service at NUHS. The work had to separate genuine specialist dermatology from the cosmetic noise, while still serving the everyday eczema patient arriving through the same door.",
      role: "Brand, copywriting, website structure, condition architecture, search planning, content direction, and SEM",
    },
    beforeIntro:
      "A rare depth of surgical credentials, a very broad clinical scope, and a category where the loudest voices are not the most qualified ones. Search for a dermatologist in Singapore and most of what comes back is aesthetics. MSDC is a medical practice led by a Mohs surgeon who built the first such service at NUHS. The work had to separate genuine specialist dermatology from the cosmetic noise, while still serving the everyday eczema patient arriving through the same door.",
    before: [
      {
        title: "Specialist care in a crowded category",
        body: "Medical dermatology competes for the same search terms as aesthetic clinics with far larger ad budgets. Credentials do not rank on their own.",
      },
      {
        title: "Twenty-five conditions, one navigation",
        body: "Eczema, psoriasis, vitiligo, warts, hair loss, skin cancer. Each is a distinct patient with a distinct search. A single services page could not hold them.",
      },
      {
        title: "Serious and everyday, side by side",
        body: "A patient with a changing mole and a patient with dandruff need very different tones on the same website. The structure had to hold both.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses: how patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That produced one organising question for everything that followed: what is the patient actually worried about?",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before choosing a clinic, and which queries signal real enquiry intent.",
      },
      {
        title: "Service Clarity",
        body: "Whether conditions are grouped, explained, and connected in a way patients can follow without guessing.",
      },
      {
        title: "Trust Signals",
        body: "Where credibility is built through structure, doctor context, location clarity, and responsible claims.",
      },
      {
        title: "Enquiry Readiness",
        body: "Whether call, WhatsApp, form, and booking actions appear at the moments patients are ready to act.",
      },
    ],
    workedOnIntro:
      "Five workstreams, one goal: help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand and voice",
        body: "An identity that reads clinical rather than cosmetic, warm rather than cold, and family-first rather than treatment-first.",
      },
      {
        title: "Condition architecture",
        body: "More than twenty-five conditions and procedures structured into two clear branches, medical and surgical, grouped so patients can find themselves in the menu.",
      },
      {
        title: "Copywriting",
        body: "Every condition page in plain language, matching tone to stakes. Reassuring where reassurance is warranted, direct where it is not.",
      },
      {
        title: "Search intent mapping",
        body: "Condition, symptom, and procedure searches mapped separately, keeping high-volume cosmetic queries from crowding out the medical terms that matter more.",
      },
      {
        title: "Paid search and landing pages",
        body: "Dedicated campaign landing pages, including a standalone skin cancer route, rather than paid traffic sent to a general services page.",
      },
    ],
    strategyIntro:
      "Brand, copy, website, organic search, and paid search were built as one system, organised around a single question. What is the patient actually worried about?",
    strategyBody: "",
    strategyShifts: [
      { before: "Services listed as a block", after: "Medical and surgical branches, grouped by condition" },
      { before: "Credentials stated in passing", after: "Mohs and surgical expertise given their own routes" },
      { before: "Paid traffic to general pages", after: "Dedicated landing pages by campaign intent" },
    ],
    journeyIntro:
      "We reframed the website as a guided patient journey, not a collection of disconnected pages.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: ["Homepage", "General services page", "Contact"],
        new: [
          "Homepage or campaign landing page",
          "Medical or surgical branch",
          "Condition page",
          "Doctor",
          "Insurance",
          "Booking or WhatsApp",
        ],
      },
      growthSystem: ["Branding", "Copywriting", "Website UX", "SEO", "SEM", "Landing Pages"],
    },
    deliverablesTitle: "Wishes granted.",
    deliverablesHighlight: "granted",
    deliverablesIntro:
      "Practical assets and systems designed to support clearer discovery, stronger trust, and better enquiry flow.",
    deliverables: [
      "Brand identity and visual system",
      "Full website design and build",
      "Twenty-five plus condition and procedure pages",
      "Site-wide copywriting in patient-first language",
      "Healthcare SEO foundation",
      "Google Ads structure and campaign landing pages",
    ],
    complianceIntro:
      "Skin cancer content is the hardest thing to write responsibly in this category. Too soft and a patient delays. Too hard and you are trading on fear. Every page was written to sit in between.",
    compliancePoints: [
      {
        title: "Built within the rules",
        body: "Copy, structure, and claims shaped around Singapore healthcare advertising guidelines from the first draft.",
        image: "/compliance/rules.png",
        alt: "Built within the rules icon",
      },
      {
        title: "Evidence-led language",
        body: "Claims stay grounded in what the practice can support. What cannot be substantiated is not said.",
        image: "/compliance/based-claims.png",
        alt: "Evidence-led language icon",
      },
      {
        title: "No fear, no false promises",
        body: "No guaranteed outcomes, no alarmist framing, no pressure-led messaging on a subject where patients are already anxious.",
        image: "/compliance/no-false-promises.png",
        alt: "No fear, no false promises icon",
      },
      {
        title: "Reputation first",
        body: "Every page protects the doctor's name while making dermatological care easier to understand and enquire about.",
        image: "/compliance/reputation-first.png",
        alt: "Reputation first icon",
      },
    ],
    changesTitle: "What the practice can now measure",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the practice can point at.",
    changes: [
      {
        title: "Condition-level search visibility",
        body: "Visibility across twenty-five plus conditions and procedures, from everyday skin concerns to surgical care.",
      },
      {
        title: "Medical and surgical routes",
        body: "Serious and everyday concerns each feel correctly placed, in clear separate patient routes.",
      },
      {
        title: "Campaign landing pages",
        body: "Click-to-booking attribution, including a dedicated skin cancer pathway.",
      },
      {
        title: "Site-wide analytics",
        body: "Analytics and tag management running site-wide, so the practice can see what is working.",
      },
    ],
  },
  {
    slug: "singapore-dental-implant-centre",
    name: "Singapore Dental Implant Centre",
    tagline: "Implanting the foundation of a timeless smile.",
    specialty: "Dental + Implantology",
    line: "Thirty years of implant expertise, given a brand and a search presence to match.",
    tags: ["Branding", "Web Design", "SEO", "SEM"],
    serviceTags: ["Branding", "Web Design", "SEO", "SEM"],
    result: "30+ years of practice · 9 treatment areas structured",
    accent: "#4A90A4",
    heroTitle: "Thirty years of implant expertise, given a brand and a search presence to match.",
    heroHighlight: "brand and a search presence",
    heroSubtitle: "Implanting the foundation of a timeless smile.",
    heroBody: "",
    heroEyebrow: "Case Study 04 / 10 · Dental + Implantology",
    projectScope: ["Brand Strategy / Website / SEO / SEM"],
    projectArchitecture: [
      { value: "30+", label: "Years Practice" },
      { value: "09", label: "Treatment Areas" },
    ],
    snapshot: {
      clinicType: "Specialist dental implant practice",
      projectFocus: "Brand articulation, website structure, treatment architecture, healthcare SEO, paid search",
      mainChallenge:
        "Thirty years of clinical reputation does not automatically translate online. Dental implants are one of the most competitive and most expensive categories in Singapore paid search, and the practice had a name that described the service rather than the standard. The work had to turn experience into something a patient could recognise before they ever sat in the chair.",
      role: "Brand, website structure, treatment architecture, search planning, content direction, SEM, and landing page direction",
    },
    beforeIntro:
      "Thirty years of clinical reputation does not automatically translate online. Dental implants are one of the most competitive and most expensive categories in Singapore paid search, and the practice had a name that described the service rather than the standard. The work had to turn experience into something a patient could recognise before they ever sat in the chair.",
    before: [
      {
        title: "Experience without a story",
        body: "Three decades of implant work is a genuine differentiator. Without a brand idea to hold it, it reads as just another line on an about page.",
      },
      {
        title: "A name that says one thing, a practice that does nine",
        body: "Known for implants, delivering full-scope dentistry from check-ups to wisdom teeth. The structure had to serve both without diluting either.",
      },
      {
        title: "High-cost category, thin search structure",
        body: "Implant keywords are among the priciest in Singapore. Sending that traffic to general pages wastes budget.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses: how patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That produced one organising principle for everything that followed: expensive clicks deserve somewhere worth landing, and experience deserves a story patients can follow.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before choosing a clinic, and which queries signal real enquiry intent.",
      },
      {
        title: "Service Clarity",
        body: "Whether treatments are grouped, explained, and connected in a way patients can follow without guessing.",
      },
      {
        title: "Trust Signals",
        body: "Where credibility is built through structure, doctor context, location clarity, and responsible claims.",
      },
      {
        title: "Enquiry Readiness",
        body: "Whether call, form, WhatsApp, and booking actions appear at the moments patients are ready to act.",
      },
    ],
    workedOnIntro:
      "Five workstreams, one goal: help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand framework",
        body: "The ORAL Concept: four principles the practice already worked by but had never named. Optimisation, Restoration, Aesthetics, Longevity. A philosophy patients can grasp in one screen.",
      },
      {
        title: "Treatment architecture",
        body: "Nine treatment areas structured into dedicated pages, grouped into four care categories so patients can self-select without dental vocabulary.",
      },
      {
        title: "Search intent mapping",
        body: "Implant, restorative, and general dentistry queries mapped separately, since a patient researching implants and a patient booking a scale and polish are not the same person.",
      },
      {
        title: "Paid search landing pages",
        body: "Dedicated landing pages for high-value campaigns, rather than paid traffic pointed at the homepage.",
      },
      {
        title: "Trust-led page flow",
        body: "The doctor, the philosophy, and the location first, before asking for the booking.",
      },
    ],
    strategyIntro:
      "Brand, website, organic search, and paid search stopped being four separate jobs. They were connected into one patient discovery system built around a single treatment map.",
    strategyBody: "",
    strategyShifts: [
      { before: "Experience stated, not framed", after: "A named philosophy patients can follow" },
      { before: "Treatments listed flat", after: "Nine pages grouped into four care categories" },
      { before: "Paid traffic to general pages", after: "Dedicated landing pages by campaign intent" },
    ],
    journeyIntro:
      "We reframed the website as a guided patient journey built around a single treatment map.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: ["Homepage", "General Treatment Page", "Contact"],
        new: [
          "Homepage or campaign landing page",
          "Treatment page",
          "Conditions",
          "Doctor",
          "FAQ",
          "Booking",
        ],
      },
      growthSystem: ["Branding", "Website UX", "SEO", "SEM", "Landing Pages"],
    },
    deliverablesTitle: "Wishes granted.",
    deliverablesHighlight: "granted",
    deliverablesIntro:
      "Practical assets and systems designed to support clearer discovery, stronger trust, and better enquiry flow.",
    deliverables: [
      "Brand framework and visual identity",
      "Full website design and build",
      "Nine treatment pages and four care categories",
      "Healthcare SEO foundation",
      "Google Ads structure and campaign planning",
      "Dedicated paid search landing pages",
    ],
    complianceIntro:
      "Implant marketing tempts everyone towards the same promises. Perfect smiles, permanent results, dramatic transformations. The work was built to stay within Singapore Dental Council advertising guidance and to protect the practice's name.",
    compliancePoints: [
      {
        title: "Built within the rules",
        body: "Copy, structure, and claims shaped around Singapore healthcare and dental advertising guidance from the first draft.",
        image: "/compliance/rules.png",
        alt: "Built within the rules icon",
      },
      {
        title: "Evidence-led language",
        body: "Claims stay grounded in what the practice can support. What cannot be substantiated is not said.",
        image: "/compliance/based-claims.png",
        alt: "Evidence-led language icon",
      },
      {
        title: "No false promises",
        body: "No guaranteed outcomes, no permanence claims, no pressure-led patient messaging.",
        image: "/compliance/no-false-promises.png",
        alt: "No false promises icon",
      },
      {
        title: "Reputation first",
        body: "Every page protects the practice's name while making treatment easier to understand and enquire about.",
        image: "/compliance/reputation-first.png",
        alt: "Reputation first icon",
      },
    ],
    changesTitle: "What the practice can now measure",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the practice can point at.",
    changes: [
      {
        title: "Nine treatment areas",
        body: "Search visibility across nine treatment areas, from implants to everyday dentistry.",
      },
      {
        title: "Named brand framework",
        body: "The ORAL Concept carried across every page.",
      },
      {
        title: "Campaign landing pages",
        body: "Click-to-booking attribution for high-value implant intent.",
      },
      {
        title: "Separate intent tracking",
        body: "Implant and general dentistry intent tracked separately, so budget follows the right patient.",
      },
    ],
  },
  {
    slug: "singapore-brain-spine-nerves",
    name: "Singapore Brain Spine Nerves Center",
    tagline: "Brain. Spine. Nerves.",
    specialty: "Neurosurgery + Spine",
    line: "Three decades of neurosurgical expertise, structured so a frightened patient can find the right answer quickly.",
    tags: ["Branding", "Content", "Web Design", "SEO", "SEM"],
    serviceTags: ["Branding", "Copywriting", "Web Design", "SEO", "SEM"],
    result: "3 clinical pillars · 4 hospitals covered",
    accent: "#4A6FA5",
    heroTitle:
      "Three decades of neurosurgical expertise, structured so a frightened patient can find the right answer quickly.",
    heroHighlight: "find the right answer quickly",
    heroSubtitle: "Brain. Spine. Nerves.",
    heroBody: "",
    heroEyebrow: "Case Study 06 / 10 · Neurosurgery + Spine",
    projectScope: ["Brand Strategy / Website", "SEO / SEM / Copywriting"],
    projectArchitecture: [
      { value: "03", label: "Clinical Pillars" },
      { value: "04", label: "Hospitals Covered" },
    ],
    snapshot: {
      clinicType: "Specialist neurosurgery and spine practice",
      projectFocus: "Brand and voice, website architecture, condition structure, healthcare SEO, paid search",
      mainChallenge:
        "One of Singapore's most credentialed neurosurgeons, an enormous clinical scope, and patients arriving in the worst week of their lives. Nobody browses for a neurosurgeon. Patients arrive after a scan, a referral, or a symptom that has stopped being ignorable, often searching for a parent or spouse. The site had to hold everything from office back pain to brain tumours without the everyday feeling trivial or the serious feeling frightening.",
      role: "Brand, copywriting, website structure, condition architecture, search planning, content direction, and SEM",
    },
    beforeIntro:
      "One of Singapore's most credentialed neurosurgeons, an enormous clinical scope, and patients arriving in the worst week of their lives. Nobody browses for a neurosurgeon. Patients arrive after a scan, a referral, or a symptom that has stopped being ignorable, often searching for a parent or spouse. The site had to hold everything from office back pain to brain tumours without the everyday feeling trivial or the serious feeling frightening.",
    before: [
      {
        title: "Credentials that read as a wall",
        body: "International fellowships, decades of practice, world-renowned training. Extraordinary on paper, and a lot to take in when you are worried and scrolling on a phone.",
      },
      {
        title: "Everyday pain and life-changing diagnosis, same site",
        body: "A desk worker with back pain and a family facing a brain tumour need the same clinic and completely different journeys through it.",
      },
      {
        title: "Emotion nobody was designing for",
        body: "Most clinic sites are built for a curious reader. This one had to work for a frightened one, and for the adult child doing the research.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses: how patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That showed us where credentials needed translating into reassurance, and where tone had to be calibrated for people making one of the hardest decisions of their lives.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before choosing a specialist, and which queries signal real enquiry intent.",
      },
      {
        title: "Service Clarity",
        body: "Whether conditions are grouped, explained, and connected in a way patients can follow without guessing.",
      },
      {
        title: "Trust Signals",
        body: "Where credibility is built through structure, doctor context, hospital access, and responsible claims.",
      },
      {
        title: "Enquiry Readiness",
        body: "Whether call, WhatsApp, form, and booking actions appear at the moments patients are ready to act.",
      },
    ],
    workedOnIntro:
      "Five workstreams, one goal: help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand and voice",
        body: "An identity built around the three things the practice treats, with a voice that stays calm without going cold. Serious subject matter, human delivery.",
      },
      {
        title: "Three-pillar architecture",
        body: "The clinic's own name became its navigation. Brain, Spine, Nerves. Three doors, each leading to the conditions and treatments underneath.",
      },
      {
        title: "Copywriting",
        body: "Fellowships and sub-specialties translated into what a patient wants to know: who is treating me, what have they done before, what happens next.",
      },
      {
        title: "Search intent mapping",
        body: "High-volume everyday pain queries mapped separately from low-volume, high-stakes surgical searches, with an SEO foundation, clinical article programme, and Google Ads structure built on the split.",
      },
      {
        title: "Trust-led page flow",
        body: "Pillar, then condition, then the surgeon, then the four hospitals he operates from, before asking for the appointment.",
      },
    ],
    strategyIntro:
      "Brand, copy, website, organic search, and paid search were built as one system organised around a single principle. Reduce the effort a worried person has to spend.",
    strategyBody: "",
    strategyShifts: [
      { before: "Specialty described in clinical terms", after: "Three pillars anyone can navigate" },
      { before: "Credentials listed as a CV", after: "Credentials framed as patient reassurance" },
      { before: "One tone across all conditions", after: "Tone calibrated to what is at stake on each page" },
    ],
    journeyIntro:
      "We reframed the website as a guided patient journey organised around a single principle: reduce the effort a worried person has to spend.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: ["Homepage", "General information page", "Contact"],
        new: [
          "Homepage",
          "Brain, Spine or Nerves",
          "Condition",
          "Treatment options",
          "Dr Prem",
          "Hospitals",
          "Booking",
        ],
      },
      growthSystem: ["Branding", "Copywriting", "Website UX", "SEO", "SEM"],
    },
    deliverablesTitle: "Wishes granted.",
    deliverablesHighlight: "granted",
    deliverablesIntro:
      "Practical assets and systems designed to support clearer discovery, stronger trust, and better enquiry flow.",
    deliverables: [
      "Brand identity and visual system",
      "Full website design and build",
      "Brain, Spine and Nerves pillar architecture",
      "Site-wide copywriting in patient-first language",
      "Healthcare SEO foundation and clinical article programme",
      "Google Ads structure and campaign planning",
    ],
    complianceIntro:
      "Neurosurgery is the category where irresponsible marketing does the most damage. A patient rushed into the wrong decision, or scared out of the right one, carries that for life. Every page was written with that weight in mind.",
    compliancePoints: [
      {
        title: "Built within the rules",
        body: "Copy, structure, and claims shaped around Singapore healthcare advertising guidelines from the first draft.",
        image: "/compliance/rules.png",
        alt: "Built within the rules icon",
      },
      {
        title: "Evidence-led language",
        body: "Claims stay grounded in what the practice can support. What cannot be substantiated is not said.",
        image: "/compliance/based-claims.png",
        alt: "Evidence-led language icon",
      },
      {
        title: "No fear, no false promises",
        body: "No guaranteed outcomes, no success rates as marketing, no urgency applied to people who are already frightened.",
        image: "/compliance/no-false-promises.png",
        alt: "No fear, no false promises icon",
      },
      {
        title: "Reputation first",
        body: "Every page protects the surgeon's name while making complex care easier to understand and enquire about.",
        image: "/compliance/reputation-first.png",
        alt: "Reputation first icon",
      },
    ],
    changesTitle: "What the practice can now measure",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the practice can point at.",
    changes: [
      {
        title: "Pillar-led search visibility",
        body: "Search visibility across brain, spine, and nerve conditions, matched to how patients describe their problem.",
      },
      {
        title: "Calibrated patient journeys",
        body: "Everyday pain and serious diagnosis each have their own path through the same site.",
      },
      {
        title: "Surgeon-attributed articles",
        body: "Clinical articles attributed to the treating surgeon, so patients can connect expertise to a name.",
      },
      {
        title: "Enquiry attribution",
        body: "Click-to-enquiry attribution across call, WhatsApp, and booking.",
      },
    ],
  },
  {
    slug: "sunrise-heart",
    name: "Sunrise Heart Specialist Clinic",
    tagline: "Affordable heart care at Sembawang.",
    specialty: "Cardiology + Community Care",
    line: "Specialist cardiac care in the heartlands, built to be found by patients and by the AI they now ask first.",
    tags: ["Branding", "Content", "Web Design", "SEO", "SEM", "AI Search"],
    serviceTags: ["Branding", "Copywriting", "Web Design", "SEO", "SEM", "GEO"],
    result: "3 modes of care · 5 northern towns served",
    accent: "#E85D4C",
    heroTitle:
      "Specialist cardiac care in the heartlands, built to be found by patients and by the AI they now ask first.",
    heroHighlight: "AI they now ask first",
    heroSubtitle: "Affordable heart care at Sembawang.",
    heroBody: "",
    heroEyebrow: "Case Study 07 / 10 · Cardiology + Community Care",
    projectScope: ["Brand Strategy / Website / SEO / SEM / GEO"],
    projectArchitecture: [
      { value: "03", label: "Modes of Care" },
      { value: "05", label: "Northern Towns" },
    ],
    snapshot: {
      clinicType: "Community cardiology and internal medicine clinic",
      projectFocus: "Brand and voice, website structure, healthcare SEO, paid search, generative search visibility",
      mainChallenge:
        "A cardiologist with tertiary hospital credentials, a community mission, and a catchment underserved for years. Private cardiology in Singapore clusters around Orchard and the central hospitals. Sunrise Heart sits at Sembawang Crescent, serving the north on access and affordability rather than address. The work had to make a heartland clinic read as genuinely specialist, without borrowing the language of prestige it had chosen not to compete on.",
      role: "Brand, copywriting, website structure, service architecture, search planning, content direction, SEM, and AI search optimisation",
    },
    beforeIntro:
      "A cardiologist with tertiary hospital credentials, a community mission, and a catchment underserved for years. Private cardiology in Singapore clusters around Orchard and the central hospitals. Sunrise Heart sits at Sembawang Crescent, serving the north on access and affordability rather than address. The work had to make a heartland clinic read as genuinely specialist, without borrowing the language of prestige it had chosen not to compete on.",
    before: [
      {
        title: "Specialist care, heartland address",
        body: "Patients associate specialist cardiology with Orchard and the major hospitals. The clinic needed to signal specialist standard and neighbourhood access at once.",
      },
      {
        title: "A service model nobody was explaining",
        body: "On-site, at-home, and off-site cardiac care is genuinely unusual. Without structure, it looked like a list of tests rather than three ways to be cared for.",
      },
      {
        title: "Search was changing underneath everyone",
        body: "Patients with chest pain at midnight increasingly ask an AI assistant before they open Google. Ranking on page one was no longer the whole job.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses: how patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That shaped a brand built on warmth and access, and content written to be understood by patients and quoted by machines.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before choosing a clinic, and which queries signal real enquiry intent.",
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
        body: "Whether call, WhatsApp, form, and booking actions appear at the moments patients are ready to act.",
      },
    ],
    workedOnIntro:
      "Six workstreams, one goal: help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand and voice",
        body: "An identity built around sunrise, warmth, and community rather than clinical distance, with a voice like a neighbour who happens to be a cardiologist.",
      },
      {
        title: "Service architecture",
        body: "Care structured into three clear modes: on-site at the clinic, at home, and off-site for advanced imaging. Patients choose by circumstance, not by test name.",
      },
      {
        title: "Copywriting",
        body: "The site written around what patients are actually worried about, with plain explanations of what each test does and, just as importantly, what it does not.",
      },
      {
        title: "Search intent mapping",
        body: "Screening, symptom, and condition queries mapped separately, with attention to the northern catchment across Sembawang, Admiralty, Yishun, Woodlands, and Canberra.",
      },
      {
        title: "Paid search",
        body: "Campaigns structured around screening and symptom intent, with tracking through to enquiry.",
      },
      {
        title: "GEO and AI search",
        body: "Content designed to be cited by AI assistants: question-shaped headings, direct answers up front, explicit limits, and doctor attribution on every article.",
      },
    ],
    strategyIntro:
      "Brand, copy, website, search, and AI visibility were built as one system rather than five briefs, all pointing at the same catchment and the same patient question.",
    strategyBody: "",
    strategyShifts: [
      { before: "Tests listed by equipment", after: "Care grouped by how patients receive it" },
      { before: "Content written to rank", after: "Content written to answer, then cited" },
      { before: "Specialist credentials buried", after: "Doctor attribution on every article" },
    ],
    journeyIntro:
      "We reframed the website as a guided patient journey, and extended it to where the journey now often begins: inside an AI answer.",
    journeyTitle: "From ask to enquiry, mapped with intent",
    journeyHighlight: "mapped with intent",
    journey: {
      flow: ["Ask", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: ["Search", "Generic clinic page", "Contact"],
        new: [
          "AI answer or search",
          "Doctor-attributed article",
          "Screening or treatment page",
          "Doctor",
          "Location and hours",
          "WhatsApp or booking",
        ],
      },
      growthSystem: ["Branding", "Copywriting", "Website UX", "SEO", "SEM", "GEO"],
    },
    deliverablesTitle: "Wishes granted.",
    deliverablesHighlight: "granted",
    deliverablesIntro:
      "Practical assets and systems designed to support clearer discovery, stronger trust, and better enquiry flow.",
    deliverables: [
      "Brand identity and community-led visual system",
      "Full website design and build",
      "Site-wide copywriting in patient-first language",
      "Three-mode service architecture",
      "Healthcare SEO foundation and blog programme",
      "Google Ads structure and campaign planning",
      "GEO content framework with doctor attribution",
    ],
    complianceIntro:
      "Cardiac content carries real stakes. Someone reading about chest pain at 2am is making a decision about whether to seek help. Every page was written with that reader in mind.",
    compliancePoints: [
      {
        title: "Built within the rules",
        body: "Copy, structure, and claims shaped around Singapore healthcare advertising guidelines from the first draft.",
        image: "/compliance/rules.png",
        alt: "Built within the rules icon",
      },
      {
        title: "Honest about limits",
        body: "Articles state plainly what screening can and cannot detect. Nothing suggests a test rules out every condition.",
        image: "/compliance/based-claims.png",
        alt: "Honest about limits icon",
      },
      {
        title: "No false promises",
        body: "No guaranteed outcomes, no fear-led messaging, no pressure tactics around a subject that frightens people.",
        image: "/compliance/no-false-promises.png",
        alt: "No false promises icon",
      },
      {
        title: "Reputation first",
        body: "Every page protects the doctor's name while making cardiac care easier to understand and enquire about.",
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
        title: "Search visibility",
        body: "Visibility across screening, symptom, and condition intent for the northern catchment.",
      },
      {
        title: "Three modes of care",
        body: "On-site, at-home, and off-site care structured so patients choose by circumstance.",
      },
      {
        title: "AI-ready content",
        body: "Doctor-attributed content built for AI citation, with direct answers and explicit limits.",
      },
      {
        title: "Enquiry attribution",
        body: "Click-to-enquiry attribution across call, WhatsApp, and booking.",
      },
    ],
  },
  {
    slug: "the-acne-clinic",
    name: "The Acne Clinic",
    tagline: "Face it. Fix it.",
    specialty: "Skin + Aesthetics",
    line: "Singapore's first clinic devoted entirely to acne, built to own acne search from day one.",
    tags: ["Branding", "Web Design", "SEO", "SEM", "Video", "Social Media"],
    serviceTags: ["Branding", "Web Design", "SEO", "SEM", "Collaterals", "Social Video"],
    result: "5 acne types mapped · 1 clinic, 1 focus",
    accent: "#6CBAD9",
    heroTitle: "Singapore's first clinic devoted entirely to acne, built to own acne search from day one.",
    heroHighlight: "from day one",
    heroSubtitle: "Face it. Fix it.",
    heroBody: "",
    heroEyebrow: "Case Study 08 / 10 · Skin + Aesthetics",
    projectScope: ["Brand Strategy / Website / SEO / SEM / Collaterals / Social Video"],
    projectArchitecture: [
      { value: "05", label: "Acne Types" },
      { value: "01", label: "Clinic Focus" },
    ],
    snapshot: {
      clinicType: "Single-focus acne clinic",
      projectFocus: "Brand creation, website build, condition-led SEO, paid search, collaterals, social video",
      mainChallenge:
        "A brand new clinic entering one of Singapore's most crowded aesthetic categories, against established dermatology and medispa names with years of domain authority. The clinic had one real advantage: it does one thing only. The work had to make that specificity impossible to miss.",
      role: "Brand identity, website structure, condition architecture, search planning, content direction, SEM, collateral design, and social video production",
    },
    beforeIntro:
      "A brand new clinic entering one of Singapore's most crowded aesthetic categories, against established dermatology and medispa names with years of domain authority. The clinic had one real advantage: it does one thing only. The work had to make that specificity impossible to miss.",
    before: [
      {
        title: "No brand, no presence",
        body: "No identity, no site, no search footprint, in a category where competitors had years of head start.",
      },
      {
        title: "Acne is not one condition",
        body: "Patients search comedonal, cystic, hormonal, rosacea, or simply \"the red painful ones\". A single treatment page could never answer all of them.",
      },
      {
        title: "Crowded category, thin differentiation",
        body: "Every aesthetic clinic in Singapore lists acne somewhere. Very few do only acne. That difference needed to be structural, not just a strapline.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses: how patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That shaped a brand built on focus, and a content plan that meets patients at the exact breakout they are worried about.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before choosing a clinic, and which queries signal real enquiry intent.",
      },
      {
        title: "Service Clarity",
        body: "Whether conditions are grouped, explained, and connected in a way patients can follow without guessing.",
      },
      {
        title: "Trust Signals",
        body: "Where credibility is built through structure, doctor context, location clarity, and responsible claims.",
      },
      {
        title: "Enquiry Readiness",
        body: "Whether call, form, WhatsApp, and booking actions appear at the moments patients are ready to act.",
      },
    ],
    workedOnIntro:
      "Six workstreams, one goal: help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand identity",
        body: "Name treatment, voice, and visual system built around one idea. Face it. Fix it. Direct, unfussy, and made for a patient tired of being sold to.",
      },
      {
        title: "Condition architecture",
        body: "The site structured around five acne types rather than one treatment list, so each patient lands on the page that matches their skin.",
      },
      {
        title: "Search intent mapping",
        body: "Pages and campaigns mapped around how patients actually describe acne: symptom first, diagnosis second, with the SEO foundation and Google Ads setup built on it.",
      },
      {
        title: "Trust-led page flow",
        body: "A four-step journey and doctor introduction, so patients understand the care model before being asked to book.",
      },
      {
        title: "Conversion touchpoints",
        body: "Call, WhatsApp, and booking placed across the site at the points where patients are ready to act.",
      },
      {
        title: "Social video",
        body: "Educational Reels and TikTok content carrying the clinic voice, feeding the same condition topics the site ranks for.",
      },
    ],
    strategyIntro:
      "Brand, website, search, collateral, and social were never treated as five separate jobs. They were built as one patient discovery system, launched together.",
    strategyBody: "",
    strategyShifts: [
      { before: "No brand presence", after: "A defined voice across web, print, and social" },
      { before: "Generic acne treatment page", after: "Five condition pages built for real search behaviour" },
      { before: "Social and search running apart", after: "Video topics drawn from the same condition map" },
    ],
    journeyIntro:
      "We built the website as a guided patient journey from day one, with brand, search, collateral, and social launched together as one system.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: ["No site", "No brand presence", "Search visibility starting at zero"],
        new: [
          "Homepage",
          "Condition page",
          "Treatment",
          "Doctor",
          "Four-step journey",
          "Booking",
        ],
      },
      growthSystem: ["Branding", "Website UX", "SEO", "SEM", "Social Video", "Collaterals"],
    },
    deliverablesTitle: "Wishes granted.",
    deliverablesHighlight: "granted",
    deliverablesIntro:
      "Practical assets and systems designed to support clearer discovery, stronger trust, and better enquiry flow.",
    deliverables: [
      "Full brand identity and visual system",
      "Website design and build",
      "Five condition pages and supporting content",
      "Healthcare SEO foundation",
      "Google Ads setup and search planning",
      "Clinic collateral and print assets",
      "Instagram and TikTok video production",
    ],
    complianceIntro:
      "Acne marketing is where healthcare advertising rules get tested hardest. Before and after shots, outcome promises, and pressure tactics are everywhere in this category. We did not use any of them.",
    compliancePoints: [
      {
        title: "Built within the rules",
        body: "Copy, structure, and claims shaped around Singapore healthcare advertising guidelines from the first draft.",
        image: "/compliance/rules.png",
        alt: "Built within the rules icon",
      },
      {
        title: "No before and after",
        body: "The category leans on transformation imagery. We built trust through explanation, doctor context, and honest process instead.",
        image: "/compliance/patient-comm.png",
        alt: "No before and after icon",
      },
      {
        title: "No false promises",
        body: "No guaranteed outcomes, no timelines to clear skin, no pressure-led patient messaging.",
        image: "/compliance/no-false-promises.png",
        alt: "No false promises icon",
      },
      {
        title: "Reputation first",
        body: "Every page protects the doctor's name while making acne care easier to understand and enquire about.",
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
        title: "Five condition pages",
        body: "Search visibility across five acne conditions, each mapped to how patients describe their skin.",
      },
      {
        title: "Brand from zero",
        body: "A brand launched from nothing to a live presence across web, print, and social.",
      },
      {
        title: "Paid search attribution",
        body: "Click-to-booking attribution from paid search.",
      },
      {
        title: "One topic map",
        body: "Social video and search content drawn from one topic map, so every channel reinforces the same structure.",
      },
    ],
  },
];
