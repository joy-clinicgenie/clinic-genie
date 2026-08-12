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
    image: "/works/cedar.png",
    imageAlt: "Cedar Endocrine Clinic website and brand work",
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
    image: "/works/sbsn.png",
    imageAlt: "Singapore Brain Spine Nerves Center website and brand work",
    logo: "/clients/singapore-brain-spine-nerves-center.png",
    logoAlt: "Singapore Brain Spine Nerves Center",
  },
  cardiology: {
    studySlug: "sunrise-heart",
    image: "/works/sunrise-heart.png",
    imageAlt: "Sunrise Heart Specialist Clinic website and brand work",
    heroImage: "/specialty-hub/specialty-cardiology.png",
    logo: "/clients/sunrise-heart.png",
    logoAlt: "Sunrise Heart Clinic",
  },
  acne: {
    studySlug: "the-acne-clinic",
    image: "/works/tac.png",
    imageAlt: "The Acne Clinic reception and clinic branding",
    logo: "/clients/the-acne-clinic.png",
    logoAlt: "The Acne Clinic",
  },
  paediatrics: {
    studySlug: "joyful-seeds",
    image: "/works/joyfulseeds.png",
    imageAlt: "Joyful Seeds Paediatric and Developmental Clinic branding and website",
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
    projectScope: ["Brand Strategy / Website", "SEO / SEM / Copywriting"],
    projectArchitecture: [
      { value: "04", label: "Therapy Streams" },
      { value: "01", label: "Heated Pool" },
      { value: "01", label: "Medical Centre" },
    ],
    snapshot: {
      clinicType: "Licensed physiotherapy and aquatic rehabilitation centre",
      projectFocus:
        "Brand and voice, website structure, therapy architecture, healthcare SEO, and paid search",
      mainChallenge:
        "AquaPhysio's greatest strength is also its biggest vulnerability. Water therapy sells, so plenty of unregulated operators run pool sessions in condominiums and call it aqua therapy. The work had to make a licensed clinical service distinguishable from a swim class, without disparaging anyone.",
      role: "Brand, copywriting, website structure, therapy architecture, search planning, content direction, and SEM",
    },
    beforeIntro:
      "A genuinely rare facility, a licensed clinical team, and a category being quietly diluted by everyone who owns a pool.",
    before: [
      {
        title: "A differentiator anyone can claim",
        body: "A heated therapy pool inside Camden Medical Centre is unusual. The phrase \"aqua therapy\" is not. The ƒdistinction had to be built into the site, not just asserted on it.",
      },
      {
        title: "Nobody searches for the solution",
        body: "Patients search knee pain, slipped disc, or physio near Orchard. Almost nobody searches aquatic physiotherapy. The architecture had to catch the symptom and introduce the water later.",
      },
      {
        title: "Trust without a single name",
        body: "Unlike a specialist practice, the credibility here rests on facility, licensing, and registered therapists rather than one recognisable doctor. That needs a different kind of proof.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses. How patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That produced a therapy structure patients could navigate by need, a plain explanation of what regulated physiotherapy actually means, and trust signals built on licensing and facility rather than a single name.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before they choose a clinic, and which queries signal real enquiry intent.",
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
      "Five workstreams, one goal. Help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand and voice",
        body: "Built an identity around water as method rather than novelty. Calm, clinical, and unmistakably a healthcare setting rather than a wellness one.",
      },
      {
        title: "Therapy architecture",
        body: "Structured four streams. Aquatic, electrotherapy, precision, and combined. Patients choose by what their body needs, not by what equipment the clinic owns.",
      },
      {
        title: "Copywriting",
        body: "Wrote the site in hedged, honest language throughout. What therapy may help with, what a session involves, and who it suits, without promising recovery timelines.",
      },
      {
        title: "Category clarity content",
        body: "Wrote a plain guide to choosing water-based rehabilitation. What a licensed facility looks like, why a registered physiotherapist matters, and what questions to ask. Educational, not adversarial, and it does the positioning work no strapline could.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped condition and symptom searches first, therapy modality second, with local Orchard intent layered on top.",
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
      "We reframed the centre's website as a guided patient journey, not a collection of disconnected pages.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: "Homepage → services list → contact",
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
        body: "Copy, structure, and claims were shaped around the Healthcare Services Act and Singapore healthcare advertising guidelines from the first draft.",
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
    changesTitle: "What the centre can now measure.",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the centre can point at.",
    changes: [
      {
        title: "Condition-led search visibility",
        body: "Search visibility across condition, symptom, and therapy intent, so patients arrive through the queries they actually type.",
      },
      {
        title: "Four therapy streams",
        body: "Aquatic, electrotherapy, precision, and combined care structured and explained so patients choose by need, not equipment.",
      },
      {
        title: "Category position by education",
        body: "A licensed clinical position defended through patient education rather than assertion or comparison.",
      },
      {
        title: "Booking attribution",
        body: "Click to booking attribution across WhatsApp, call, and form.",
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
    projectScope: ["Brand Strategy / Website", "SEO / SEM / Collaterals"],
    projectArchitecture: [
      { value: "06", label: "Treatment Pillars" },
      { value: "02", label: "Hospital Locations" },
      { value: "01", label: "Enquiry Pathway" },
    ],
    snapshot: {
      clinicType: "Specialist endocrinology clinic",
      projectFocus:
        "Brand identity, website clarity, condition page structure, healthcare SEO, paid search, and clinic collaterals",
      mainChallenge:
        "Nobody wakes up searching for an endocrinologist. They search thyroid, diabetes, or whatever symptom is worrying them at 11pm. The clinic needed a structure that met patients at that moment, then guided them towards the right consultation.",
      role: "Brand, website structure, condition architecture, search planning, content direction, SEM, and collateral design",
    },
    beforeIntro:
      "The starting point was familiar. A respected specialist with genuine depth of expertise, and a digital presence that did not yet show it.",
    before: [
      {
        title: "Specialty before symptom",
        body: "Endocrinology is a word patients rarely type. They search the condition, or the worry behind it. The structure needed to start where patients start.",
      },
      {
        title: "Wide scope, thin structure",
        body: "Six distinct condition areas sat inside one broad specialty. Each needed its own page logic, keyword intent, and plain explanation.",
      },
      {
        title: "Two locations, one decision",
        body: "Consulting across two hospitals is a strength. Presented unclearly, it becomes one more thing a patient has to work out before booking.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses. How patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That showed us where the brand needed a warmer voice, where the website needed stronger condition structure, and where enquiry points were missing at the moments that mattered.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before they choose a clinic, and which queries signal real enquiry intent.",
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
      "Five workstreams, one goal. Help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand identity",
        body: "Built a calmer, warmer clinical identity around the idea of nurtured care, then carried it across web, print, and clinic collateral.",
      },
      {
        title: "Condition architecture",
        body: "Structured six endocrine areas into clear pillars, with diabetes and thyroid expanded into supporting condition pages.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped pages and campaigns around what patients search first. The condition, not the specialty.",
      },
      {
        title: "Trust-led page flow",
        body: "Reordered page sections so patients understand the doctor and the clinic before being asked to enquire.",
      },
      {
        title: "Conversion touchpoints",
        body: "Reviewed where call, WhatsApp, booking form, and appointment CTAs should appear across both locations.",
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
      "We reframed the clinic website as a guided patient journey, not a collection of disconnected pages.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: "Homepage → general treatment page → contact",
        new: [
          "Homepage",
          "Condition pillar",
          "Specific condition page",
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
        body: "Copy, structure, and claims were shaped around Singapore healthcare advertising guidelines from the first draft.",
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
    changesTitle: "What the clinic can now measure.",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the clinic can point at.",
    changes: [
      {
        title: "Six treatment pillars",
        body: "Search visibility across six treatment pillars, each with its own page logic and keyword intent.",
      },
      {
        title: "Condition-level content",
        body: "Condition-level content built for real patient search intent, starting with thyroid, diabetes, and symptom queries.",
      },
      {
        title: "Paid search attribution",
        body: "Click to booking attribution from paid search, so the clinic can see which campaigns earn consultations.",
      },
      {
        title: "One enquiry pathway",
        body: "One enquiry pathway across two clinic locations, so patients do not have to work out where to book.",
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
    projectScope: ["Brand Strategy / Website", "SEO / SEM / Copywriting"],
    projectArchitecture: [
      { value: "25+", label: "Condition Pages" },
      { value: "18", label: "Years Practice" },
    ],
    snapshot: {
      clinicType: "Specialist medical and surgical dermatology practice",
      projectFocus:
        "Brand and voice, website architecture, condition page structure, healthcare SEO, and paid search",
      mainChallenge:
        "Search for a dermatologist in Singapore and most of what comes back is aesthetics. MSDC is a medical practice led by a Mohs surgeon who built the first such service at NUHS. The work had to separate genuine specialist dermatology from the cosmetic noise around it, while still serving the everyday eczema and acne patient who arrives through the same door.",
      role: "Brand, copywriting, website structure, condition architecture, search planning, content direction, and SEM",
    },
    beforeIntro:
      "A rare depth of surgical credentials, a very broad clinical scope, and a category where the loudest voices are not the most qualified ones.",
    before: [
      {
        title: "Specialist care in a crowded category",
        body: "Medical dermatology competes for the same search terms as aesthetic clinics with far larger ad budgets. Credentials do not rank on their own.",
      },
      {
        title: "Twenty-five conditions, one navigation",
        body: "Eczema, psoriasis, vitiligo, hidradenitis suppurativa, warts, hair loss, skin cancer. Each is a distinct patient with a distinct search. A single services page could not hold them.",
      },
      {
        title: "Serious and everyday, side by side",
        body: "A patient with a changing mole and a patient with dandruff need very different tones on the same website. The structure had to hold both without either feeling misplaced.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses. How patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That produced a clear split between medical and surgical care, a condition-level page structure patients could navigate by symptom, and a Mohs offering given the prominence its rarity deserves.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before they choose a clinic, and which queries signal real enquiry intent.",
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
      "Five workstreams, one goal. Help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand and voice",
        body: "Built an identity that reads clinical rather than cosmetic, warm rather than cold, and family-first rather than treatment-first.",
      },
      {
        title: "Condition architecture",
        body: "Structured more than twenty-five conditions and procedures into two clear branches, medical and surgical, then grouped them so patients can find themselves in the menu.",
      },
      {
        title: "Copywriting",
        body: "Wrote every condition page in plain language, matching tone to stakes. Reassuring where reassurance is warranted, direct where it is not.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped condition, symptom, and procedure searches separately, and kept high-volume cosmetic queries from crowding out the medical terms that matter more.",
      },
      {
        title: "Paid search and landing pages",
        body: "Built dedicated campaign landing pages, including a standalone skin cancer route, rather than sending paid traffic to a general services page.",
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
      "We reframed the clinic website as a guided patient journey, not a collection of disconnected pages.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: "Homepage → general services page → contact",
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
        body: "Copy, structure, and claims were shaped around Singapore healthcare advertising guidelines from the first draft.",
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
        body: "No guaranteed outcomes, no alarmist framing, and no pressure-led messaging on a subject where patients are already anxious.",
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
    changesTitle: "What the practice can now measure.",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the practice can point at.",
    changes: [
      {
        title: "Condition-level search visibility",
        body: "Search visibility across twenty-five plus conditions and procedures, from everyday skin concerns to surgical care.",
      },
      {
        title: "Medical and surgical routes",
        body: "Medical and surgical care separated into clear patient routes, so serious and everyday concerns each feel correctly placed.",
      },
      {
        title: "Campaign landing pages",
        body: "Campaign landing pages with click to booking attribution, including a dedicated skin cancer pathway.",
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
    projectScope: ["Brand Strategy / Website", "SEO / SEM"],
    projectArchitecture: [
      { value: "30+", label: "Years Practice" },
      { value: "09", label: "Treatment Areas" },
    ],
    snapshot: {
      clinicType: "Specialist dental implant practice",
      projectFocus:
        "Brand articulation, website structure, treatment architecture, healthcare SEO, and paid search",
      mainChallenge:
        "Dental implants are one of the most competitive and most expensive categories in Singapore paid search. The practice had three decades of genuine expertise and a name that described the service rather than the standard. The work had to turn experience into something a patient could recognise before they ever sat in the chair.",
      role: "Brand, website structure, treatment architecture, search planning, content direction, SEM, and landing page direction",
    },
    beforeIntro:
      "Thirty years of clinical reputation does not automatically translate online. The starting point was a respected practice whose digital presence sat well behind its expertise.",
    before: [
      {
        title: "Experience without a story",
        body: "Three decades of implant work is a genuine differentiator. Without a brand idea to hold it, it reads as just another line on an about page.",
      },
      {
        title: "A name that says one thing, a practice that does nine",
        body: "The centre is known for implants but delivers full-scope dentistry, from check-ups to wisdom teeth. The structure had to serve both without diluting either.",
      },
      {
        title: "High-cost category, thin search structure",
        body: "Implant keywords are among the priciest in Singapore. Sending that traffic to general pages wastes budget. The site needed dedicated intent-led landing pages.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses. How patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That produced a brand framework the practice could own, a treatment structure patients could follow, and a paid search set-up that sends expensive clicks somewhere worth landing.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before they choose a clinic, and which queries signal real enquiry intent.",
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
      "Five workstreams, one goal. Help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand framework",
        body: "Built the ORAL Concept, four principles the practice already worked by but had never named. Optimisation, Restoration, Aesthetics, Longevity. A philosophy patients can grasp in one screen.",
      },
      {
        title: "Treatment architecture",
        body: "Structured nine treatment areas into dedicated pages, then grouped them into four care categories so patients could self-select without dental vocabulary.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped implant, restorative, and general dentistry queries separately, since a patient researching implants and a patient booking a scale and polish are not the same person.",
      },
      {
        title: "Paid search landing pages",
        body: "Built dedicated landing pages for high-value campaigns rather than pointing paid traffic at the homepage.",
      },
      {
        title: "Trust-led page flow",
        body: "Led with the doctor, the philosophy, and the location before asking for the booking.",
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
      "We reframed the practice website as a guided patient journey, not a collection of disconnected pages.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: "Homepage → general treatment page → contact",
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
        body: "Copy, structure, and claims were shaped around Singapore healthcare and dental advertising guidance from the first draft.",
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
    changesTitle: "What the practice can now measure.",
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
        body: "A named brand framework, the ORAL Concept, carried across every page.",
      },
      {
        title: "Campaign landing pages",
        body: "Campaign-level landing pages with click to booking attribution for high-value implant intent.",
      },
      {
        title: "Separate intent tracking",
        body: "Separate tracking for implant and general dentistry intent, so budget follows the right patient.",
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
    projectScope: ["Brand Strategy / Website", "SEO / SEM / Copywriting"],
    projectArchitecture: [
      { value: "03", label: "Clinical Pillars" },
      { value: "04", label: "Hospitals Covered" },
    ],
    snapshot: {
      clinicType: "Specialist neurosurgery and spine practice",
      projectFocus:
        "Brand and voice, website architecture, condition structure, healthcare SEO, and paid search",
      mainChallenge:
        "Nobody browses for a neurosurgeon. Patients arrive after a scan result, a referral, or a symptom that has stopped being ignorable, and often they are searching on behalf of a parent or a spouse. The site had to hold everything from office lower back pain to brain tumours without the everyday feeling trivial or the serious feeling frightening.",
      role: "Brand, copywriting, website structure, condition architecture, search planning, content direction, and SEM",
    },
    beforeIntro:
      "One of Singapore's most credentialed neurosurgeons, an enormous clinical scope, and patients arriving in the worst week of their lives. Clarity was not a nice-to-have here.",
    before: [
      {
        title: "Credentials that read as a wall",
        body: "Cleveland Clinic, Mayo, MD Anderson, Toronto Sick Kids, five postgraduate fellowships. Extraordinary on paper, and genuinely hard to absorb when you are worried and scrolling on a phone.",
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
      "We looked at the project through four lenses. How patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That produced a three-pillar structure taken straight from the clinic's own name, credentials translated into plain reassurance, and a tone calibrated for people making one of the hardest decisions of their lives.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before they choose a specialist, and which queries signal real enquiry intent.",
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
      "Five workstreams, one goal. Help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand and voice",
        body: "Built an identity around the three things the practice treats, then wrote a voice that stays calm without going cold. Serious subject matter, human delivery.",
      },
      {
        title: "Three-pillar architecture",
        body: "Turned the clinic's own name into its navigation. Brain, Spine, Nerves. Three doors, each leading to the conditions and treatments underneath.",
      },
      {
        title: "Copywriting",
        body: "Translated fellowships and sub-specialties into what a patient actually wants to know. Who is treating me, what have they done before, and what happens next.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped high-volume everyday pain queries separately from low-volume, high-stakes surgical searches, so neither crowds the other out.",
      },
      {
        title: "Trust-led page flow",
        body: "Led with the pillar, then the condition, then the surgeon, then the four hospitals he operates from, before asking for the appointment.",
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
      "We reframed the clinic website as a guided patient journey, not a collection of disconnected pages.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: "Homepage → general information page → contact",
        new: [
          "Homepage",
          "Brain, Spine or Nerves",
          "Condition",
          "Treatment options",
          "Dr Prem",
          "Hospitals and location",
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
        body: "Copy, structure, and claims were shaped around Singapore healthcare advertising guidelines from the first draft.",
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
    changesTitle: "What the practice can now measure.",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the practice can point at.",
    changes: [
      {
        title: "Pillar-led search visibility",
        body: "Search visibility across brain, spine, and nerve conditions, matched to how patients describe their problem.",
      },
      {
        title: "Three-pillar architecture",
        body: "Three-pillar architecture matching how patients describe their problem: Brain, Spine, and Nerves.",
      },
      {
        title: "Surgeon-attributed articles",
        body: "Clinical articles attributed to the treating surgeon, so patients can connect expertise to a name.",
      },
      {
        title: "Enquiry attribution",
        body: "Click to enquiry attribution across call, WhatsApp, and booking.",
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
    projectScope: ["Brand Strategy / Website", "SEO / SEM / GEO"],
    projectArchitecture: [
      { value: "03", label: "Modes of Care" },
      { value: "05", label: "Northern Towns" },
    ],
    snapshot: {
      clinicType: "Community cardiology and internal medicine clinic",
      projectFocus:
        "Brand and voice, website structure, healthcare SEO, paid search, and generative search visibility",
      mainChallenge:
        "Private cardiology in Singapore clusters around Orchard and the central hospitals. Sunrise Heart sits at Sembawang Crescent, serving the north on access and affordability rather than address. The work had to make a heartland clinic read as genuinely specialist, without borrowing the language of prestige it had deliberately chosen not to compete on.",
      role: "Brand, copywriting, website structure, service architecture, search planning, content direction, SEM, and AI search optimisation",
    },
    beforeIntro:
      "A cardiologist with tertiary hospital credentials, a community mission, and a catchment that had been underserved for years. The pieces were all there. They were not yet joined up.",
    before: [
      {
        title: "Specialist care, heartland address",
        body: "Patients associate specialist cardiology with Orchard and the major hospitals. The clinic needed to signal specialist standard and neighbourhood access at the same time.",
      },
      {
        title: "A service model nobody was explaining",
        body: "On-site, at-home, and off-site cardiac care is genuinely unusual. Without clear structure it looked like a list of tests rather than three distinct ways to be cared for.",
      },
      {
        title: "Search was changing underneath everyone",
        body: "Patients with chest pain at midnight increasingly ask an AI assistant before they open Google. Ranking on page one was no longer the whole job.",
      },
    ],
    diagnosisIntro:
      "We looked at the project through four lenses. How patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That shaped a brand built on warmth and access, a site organised by how care is delivered rather than what equipment is used, and a content approach written to be understood by patients and quoted by machines.",
    diagnosisLenses: [
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
        body: "Whether call, WhatsApp, form, and booking actions appear at the moments patients are ready to act.",
      },
    ],
    workedOnIntro:
      "Six workstreams, one goal. Help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand and voice",
        body: "Built an identity around sunrise, warmth, and community rather than clinical distance, then wrote a voice that sounds like a neighbour who happens to be a cardiologist.",
      },
      {
        title: "Service architecture",
        body: "Structured care into three clear modes. On-site at the clinic, at home, and off-site for advanced imaging. Patients now choose by circumstance, not by test name.",
      },
      {
        title: "Copywriting",
        body: "Wrote the site around what patients are actually worried about, with plain explanations of what each test does and, just as importantly, what it does not.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped screening, symptom, and condition queries separately, with attention to the northern catchment across Sembawang, Admiralty, Yishun, Woodlands, and Canberra.",
      },
      {
        title: "Paid search",
        body: "Structured campaigns around screening and symptom intent, with tracking through to enquiry.",
      },
      {
        title: "GEO and AI search",
        body: "Built content designed to be cited by AI assistants. Question-shaped headings, direct answers up front, explicit limits, and doctor attribution on every article.",
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
      "We reframed the clinic website as a guided patient journey, and extended it to where the journey now often begins, inside an AI answer.",
    journey: {
      flow: ["Ask", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: "Search → generic clinic page → contact",
        new: [
          "AI answer or search",
          "Article with doctor attribution",
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
        body: "Copy, structure, and claims were shaped around Singapore healthcare advertising guidelines from the first draft.",
        image: "/compliance/rules.png",
        alt: "Built within the rules icon",
      },
      {
        title: "Honest about limits",
        body: "Articles state plainly what screening can and cannot detect. Nothing on the site suggests a test rules out every condition.",
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
    changesTitle: "What the clinic can now measure.",
    changesHighlight: "measure",
    changesLead: "No smoke. No mirrors.",
    changesIntro: "Every claim on this page is something the clinic can point at.",
    changes: [
      {
        title: "Search visibility",
        body: "Search visibility across screening, symptom, and condition intent for the northern catchment.",
      },
      {
        title: "Three modes of care",
        body: "On-site, at-home, and off-site cardiac care structured and explained so patients choose by circumstance.",
      },
      {
        title: "AI-ready content",
        body: "Doctor-attributed content built for AI citation, with direct answers and explicit limits.",
      },
      {
        title: "Enquiry attribution",
        body: "Click to enquiry attribution across call, WhatsApp, and booking.",
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
    projectScope: ["Brand Strategy / Website", "SEO / SEM / Collaterals"],
    projectArchitecture: [
      { value: "05", label: "Acne Types" },
      { value: "01", label: "Clinic Focus" },
    ],
    snapshot: {
      clinicType: "Single-focus acne clinic",
      projectFocus:
        "Brand creation, website build, condition-led SEO, paid search, clinic collaterals, and social video",
      mainChallenge:
        "A brand new clinic entering one of Singapore's most crowded aesthetic categories, competing against established dermatology and medispa names with years of domain authority. The clinic had one real advantage. It does one thing only. The work had to make that specificity impossible to miss.",
      role: "Brand identity, website structure, condition architecture, search planning, content direction, SEM, collateral design, and social video production",
    },
    beforeIntro:
      "Starting from nothing is a blank page, not a shortcut. Everything had to be conjured from scratch, and every decision had to earn its place in a competitive category.",
    before: [
      {
        title: "No brand, no presence",
        body: "A new clinic with no identity, no site, and no search footprint in a category where competitors had years of head start.",
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
      "We looked at the project through four lenses. How patients search, what they need to understand, where trust is built, and what makes them ready to enquire.",
    diagnosisBody:
      "That shaped a brand built on focus, a site organised by acne type, and a content plan that meets patients at the exact breakout they are worried about.",
    diagnosisLenses: [
      {
        title: "Search Intent",
        body: "How patients look for care before they choose a clinic, and which queries signal real enquiry intent.",
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
      "Six workstreams, one goal. Help patients move from search to understanding to enquiry with less friction.",
    workedOn: [
      {
        title: "Brand identity",
        body: "Created the name treatment, voice, and visual system around one idea. Face it. Fix it. Direct, unfussy, and built for a patient who is tired of being sold to.",
      },
      {
        title: "Condition architecture",
        body: "Structured the site around five acne types rather than one treatment list, so each patient lands on the page that matches their skin.",
      },
      {
        title: "Search intent mapping",
        body: "Mapped pages and campaigns around how patients actually describe acne, symptom first, diagnosis second.",
      },
      {
        title: "Trust-led page flow",
        body: "Built the four-step journey and doctor introduction so patients understand the care model before being asked to book.",
      },
      {
        title: "Conversion touchpoints",
        body: "Placed call, WhatsApp, and booking across the site at the points where patients are ready to act.",
      },
      {
        title: "Social video",
        body: "Produced educational Reels and TikTok content that carries the clinic voice and feeds the same condition topics the site ranks for.",
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
      "We built the clinic website as a guided patient journey, not a collection of disconnected pages.",
    journey: {
      flow: ["Search", "Learn", "Compare", "Trust", "Enquire"],
      websiteMap: {
        old: "No site. Search visibility starting at zero.",
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
        body: "Copy, structure, and claims were shaped around Singapore healthcare advertising guidelines from the first draft.",
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
    changesTitle: "What the clinic can now measure.",
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
        body: "A brand launched from zero to live presence across web, print, and social.",
      },
      {
        title: "Paid search attribution",
        body: "Click to booking attribution from paid search.",
      },
      {
        title: "One topic map",
        body: "Social video and search content drawn from one topic map, so every channel reinforces the same condition structure.",
      },
    ],
  },
];
