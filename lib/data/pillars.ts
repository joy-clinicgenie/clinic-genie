import type { Faq } from "@/lib/data/faqs";

export interface CtaLink {
  label: string;
  href: string;
}

export interface KeyPoint {
  title: string;
  body: string;
}

export interface PillarCard {
  title: string;
  body: string;
}

export interface PillarStep {
  title: string;
  body: string;
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

  // 2 — Why it matters
  whyTitle: string;
  whyParagraph: string[];
  keyPoints: KeyPoint[];

  // 3 — What it helps clinics build
  buildSubtitle: string;
  buildTitle: string;
  buildParagraph: string;
  cards: PillarCard[];
  /** Sibling pillar slugs to surface in the related-services strip */
  relatedServices: string[];

  // 4 — The Clinic Genie approach
  approachSubtitle: string;
  approachTitle: string;
  approachParagraph: string[];
  steps: PillarStep[];
  trustNote: string;

  // 5 — Built for specialist clinics
  specialtyTitle: string;
  specialtyParagraph: string;

  // 6 — Related insights + FAQs
  insights: CtaLink[];
  faqs: Faq[];

  // 7 — Final CTA
  finalSubtitle: string;
  finalTitle: string;
  finalParagraph: string;
  finalSecondaryCta: CtaLink;
}

/** Shared specialty cards — the patient journeys every pillar is built around. */
export const PILLAR_SPECIALTIES: KeyPoint[] = [
  { title: "Endocrinology", body: "For diabetes, thyroid, hormonal, and metabolic care clinics." },
  { title: "Aesthetic & Dermatology", body: "For skin, aesthetic, laser, and procedure-led clinics." },
  { title: "Dental & Orthodontics", body: "For dental, implant, oral surgery, and orthodontic practices." },
  { title: "Cardiology", body: "For heart specialists and cardiac clinics." },
  { title: "Paediatrics", body: "For children's clinics and parent-focused care." },
  { title: "Acne Specialist", body: "For acne-focused clinics and skin confidence journeys." },
  { title: "Neurology & Neurosurgery", body: "For brain, spine, nerve, and pain-related specialist care." },
  { title: "Aqua Physiotherapy", body: "For aquatic physiotherapy and rehabilitation clinics." },
];

const CONTACT_CTA: CtaLink = { label: "Book a strategy call", href: "/contact" };

export const CORE_PILLARS: CorePillar[] = [
  // ───────────────────────────── 1. FindClinic.sg ─────────────────────────────
  {
    slug: "findclinic",
    name: "FindClinic.sg",
    accent: "#6CBAD9",
    heroSubtitle: "FindClinic.sg",
    heroTitle: "Helping patients find care with more clarity.",
    heroParagraph: [
      "Choosing a clinic can feel overwhelming. Patients search, compare, read, and look for signs that they are making the right decision.",
      "FindClinic.sg helps clinics become easier to discover, understand, and trust through clear clinic profiles, doctor-led content, healthcare articles, and patient-friendly information.",
    ],
    heroPrimaryCta: { label: "Join FindClinic.sg", href: "/contact" },
    heroSecondaryCta: { label: "Explore Clinic Listings", href: "/contact" },
    whyTitle: "Patients are searching for more than a clinic name.",
    whyParagraph: [
      "They want to know who the doctor is, what the clinic offers, where it is located, and whether the information feels clear enough to take the next step.",
      "FindClinic.sg gives clinics a clearer way to be present while patients are still learning, comparing, and deciding who to contact.",
    ],
    keyPoints: [
      { title: "Clarity", body: "Help patients understand your clinic, doctors, services, and areas of care." },
      { title: "Confidence", body: "Give patients useful information before they make an enquiry." },
      { title: "Discovery", body: "Support your clinic's visibility across healthcare search and patient research journeys." },
    ],
    buildSubtitle: "What it supports",
    buildTitle: "A clearer path from search to enquiry.",
    buildParagraph:
      "FindClinic.sg supports clinic discovery by giving patients structured, useful information in one place. Each profile and content piece is built to make your clinic easier to understand.",
    cards: [
      { title: "Clinic Profiles", body: "Show your clinic's services, location, specialties, and contact details clearly." },
      { title: "Doctor Profiles", body: "Help patients understand the people behind the care, including specialist focus and clinical interests." },
      { title: "Doctor Interviews", body: "Answer common patient questions in a clear, human way through doctor-led insights." },
      { title: "Healthcare Articles", body: "Support patient education with useful content around conditions, services, and care options." },
      { title: "Search-Friendly Structure", body: "Make clinic information easier for Google and AI search tools to understand." },
      { title: "Enquiry Pathways", body: "Guide interested patients from discovery to the right next step." },
    ],
    relatedServices: ["healthcare-seo", "branding-copywriting", "geo-ai-search", "web-design-development"],
    approachSubtitle: "How we build it",
    approachTitle: "Clear information. Responsible content. Better discovery.",
    approachParagraph: [
      "FindClinic.sg is part of the Clinic Genie ecosystem. It is built with the same thinking we bring to healthcare SEO, clinic websites, content, and AI search.",
      "Research shows where patients search. Data shows what works. Results show what to improve.",
    ],
    steps: [
      { title: "Understand the clinic", body: "We look at your specialty, doctors, services, location, and patient audience." },
      { title: "Shape the profile", body: "We organise clinic and doctor information so patients can understand it quickly." },
      { title: "Create useful content", body: "We develop interviews and articles that answer real patient questions." },
      { title: "Connect the journey", body: "We link profiles, articles, services, and enquiry paths so patients can move with less friction." },
      { title: "Improve over time", body: "We review visibility, engagement, and content opportunities as the platform grows." },
    ],
    trustNote:
      "FindClinic.sg content supports patient education. It does not replace medical consultation or clinical advice.",
    specialtyTitle: "Every specialty has a different patient journey.",
    specialtyParagraph:
      "A parent looking for a paediatrician may need warmth and reassurance. A patient comparing dental implants may need clarity and trust. FindClinic.sg helps clinics present information in a way that matches how patients search, compare, and choose.",
    insights: [
      { label: "Why Clinic Listings Matter for Healthcare Visibility in Singapore", href: "/genie-tips" },
      { label: "What Makes a Clinic Profile More Useful for Patients", href: "/genie-tips" },
      { label: "How Patients Use Clinic Directory Platforms to Compare Providers", href: "/genie-tips" },
      { label: "What Information Should Every Clinic Listing Include", href: "/genie-tips" },
    ],
    faqs: [
      {
        q: "What is FindClinic.sg?",
        a: "FindClinic.sg is a healthcare discovery platform by Clinic Genie. It helps patients explore clinic profiles, doctor-led content, healthcare articles, and specialist information in Singapore.",
      },
      {
        q: "How does FindClinic.sg help clinics?",
        a: "It gives clinics another way to be discovered, understood, and considered by patients who are searching for healthcare information.",
      },
      {
        q: "Can FindClinic.sg replace my clinic website?",
        a: "No. Your clinic website remains your main digital home. FindClinic.sg supports discovery by extending your visibility through profiles, interviews, and educational content.",
      },
      {
        q: "Is FindClinic.sg suitable for specialist clinics?",
        a: "Yes. It is especially useful for specialist clinics that need to explain services, doctors, conditions, and patient journeys clearly.",
      },
      {
        q: "Does FindClinic.sg provide medical advice?",
        a: "No. FindClinic.sg content is for general information and patient education only. It should not replace consultation with a qualified healthcare professional.",
      },
    ],
    finalSubtitle: "Ready to be easier to discover?",
    finalTitle: "Help patients understand your clinic before they enquire.",
    finalParagraph:
      "If your clinic wants to be found with clearer profiles, doctor-led content, and patient-friendly healthcare information, start a conversation about joining FindClinic.sg.",
    finalSecondaryCta: { label: "Explore Healthcare SEO", href: "/services/core-pillars/healthcare-seo" },
  },

  // ───────────────────────────── 2. Healthcare SEO ─────────────────────────────
  {
    slug: "healthcare-seo",
    name: "Healthcare SEO",
    accent: "#7FE9F0",
    heroSubtitle: "Healthcare SEO",
    heroTitle: "Be the clinic patients find first.",
    heroParagraph: [
      "Patients rarely search for your clinic by name. They search by problem — a treatment, a symptom, a question they need answered before they book.",
      "Healthcare SEO helps your clinic rank for the high-intent searches that lead to real enquiries, with compliance-aware, doctor-reviewed content built for how patients actually search in Singapore.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "Explore the SEO playbook", href: "/genie-tips/healthcare-seo-singapore-2026" },
    whyTitle: "Ranking is where the booking journey begins.",
    whyParagraph: [
      "When a patient searches for a treatment, the clinic that ranks first, loads fast, and reads as trustworthy usually wins the click — not always the best doctor.",
      "Healthcare SEO closes that gap. It puts your expertise in front of patients at the exact moment they're looking, and earns the trust that turns a search into an enquiry.",
    ],
    keyPoints: [
      { title: "Intent", body: "Rank for the treatment and symptom searches patients actually type." },
      { title: "Trust", body: "Doctor-reviewed, compliance-aware content that reads as credible." },
      { title: "Compounding", body: "Organic visibility that keeps working long after the work is done." },
    ],
    buildSubtitle: "What it supports",
    buildTitle: "Visibility that turns into enquiries.",
    buildParagraph:
      "Healthcare SEO is more than keywords. We build the structure, content, and authority that help your clinic rank — and convert — for the searches that matter most.",
    cards: [
      { title: "Keyword & Intent Research", body: "Map the treatment, symptom, and question searches that signal real patient demand." },
      { title: "Treatment Pages", body: "Doctor-reviewed pages that explain the problem, the treatment, and what to expect." },
      { title: "Technical SEO", body: "Fast, crawlable, mobile-first foundations that Google and patients both reward." },
      { title: "Local SEO", body: "Google Business Profile and local signals that win nearby, high-intent patients." },
      { title: "Content Strategy", body: "Supporting articles that build topical authority around your specialty." },
      { title: "E-E-A-T Signals", body: "Named specialists, credentials, and reviews that prove medical trustworthiness." },
    ],
    relatedServices: ["medical-sem", "geo-ai-search", "branding-copywriting", "findclinic"],
    approachSubtitle: "How we build it",
    approachTitle: "Research-led, compliance-aware, built to last.",
    approachParagraph: [
      "Healthcare SEO sits at the centre of the Clinic Genie growth engine. Every page is built with search intent and advertising compliance in mind, never one at the cost of the other.",
      "Research shows where patients search. Data shows what works. Results show what to improve.",
    ],
    steps: [
      { title: "Audit & research", body: "We assess your current visibility and map the searches your patients use." },
      { title: "Plan the architecture", body: "We structure treatments, conditions, and content so search engines understand them." },
      { title: "Create the content", body: "We write doctor-reviewed, compliant pages that explain and reassure." },
      { title: "Build authority", body: "We strengthen technical health, local signals, and topical depth." },
      { title: "Measure & refine", body: "We track rankings and enquiries, then improve what moves the needle." },
    ],
    trustNote:
      "All SEO content is written with Singapore's PHMC/HCSA advertising guidelines in mind, and reviewed with your team.",
    specialtyTitle: "Every specialty ranks differently.",
    specialtyParagraph:
      "Acne searches behave nothing like cardiology or dental implant searches. We tailor SEO to how patients in your specialty actually search, compare, and decide.",
    insights: [
      { label: "Healthcare SEO in Singapore: How Specialist Clinics Actually Rank in 2026", href: "/genie-tips/healthcare-seo-singapore-2026" },
      { label: "5 Treatment Pages Every Aesthetic Clinic Should Have", href: "/genie-tips/5-treatment-pages-every-aesthetic-clinic-needs" },
      { label: "Google Business Profile for Clinics: The 20-Minute Setup", href: "/genie-tips/google-business-profile-for-clinics" },
      { label: "Will AI Search Kill Your Clinic's Google Traffic?", href: "/genie-tips/will-ai-search-kill-clinic-google-traffic" },
    ],
    faqs: [
      {
        q: "How long does healthcare SEO take to work?",
        a: "Most clinics see meaningful movement within three to six months, with momentum compounding from there. SEO is a long-term asset, not an overnight switch.",
      },
      {
        q: "Is SEO content compliant with Singapore's advertising rules?",
        a: "Yes. Every page is written with PHMC/HCSA guidelines in mind and reviewed with your team before it goes live.",
      },
      {
        q: "Do you guarantee a #1 ranking?",
        a: "No reputable agency can guarantee a specific ranking. What we can promise is a research-led, compliant strategy focused on the searches that lead to enquiries.",
      },
      {
        q: "Will you write the content or do we?",
        a: "We write doctor-reviewed, compliance-aware content for you, then collaborate with your clinicians to verify clinical accuracy.",
      },
    ],
    finalSubtitle: "Ready to rank for what patients search?",
    finalTitle: "Turn high-intent searches into booked consultations.",
    finalParagraph:
      "If your clinic wants to be found first for the treatments that matter, let's map the searches your patients are already making.",
    finalSecondaryCta: { label: "Explore Medical SEM", href: "/services/core-pillars/medical-sem" },
  },

  // ───────────────────────────── 3. Medical SEM ─────────────────────────────
  {
    slug: "medical-sem",
    name: "Medical SEM",
    accent: "#8E7BE8",
    heroSubtitle: "Medical SEM",
    heroTitle: "Paid search that books patients, not just clicks.",
    heroParagraph: [
      "Google Ads can fill your appointment book — or quietly drain your budget. The difference is strategy, targeting, and tracking built specifically for clinics.",
      "Medical SEM puts your clinic in front of high-intent patients at the moment they're ready to book, managed to a cost-per-enquiry you can actually live with.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "Read the SEM guide", href: "/genie-tips/medical-sem-without-wasting-budget" },
    whyTitle: "Every wasted click is a patient you paid to lose.",
    whyParagraph: [
      "Generalist agencies chase clicks and impressions. Clinics need booked consultations — and a clear view of what each enquiry actually costs.",
      "Medical SEM is built around conversions, not vanity metrics. We target the searches that signal real intent and measure the outcomes that matter to your clinic.",
    ],
    keyPoints: [
      { title: "Intent", body: "Reach patients actively searching for the treatments you provide." },
      { title: "Control", body: "Manage spend to a transparent, predictable cost-per-enquiry." },
      { title: "Speed", body: "Generate qualified enquiries while your organic SEO builds." },
    ],
    buildSubtitle: "What it supports",
    buildTitle: "Campaigns engineered for booked consultations.",
    buildParagraph:
      "Medical SEM connects the right search to the right landing page to the right tracking — so every dollar is accountable and every enquiry is measurable.",
    cards: [
      { title: "Campaign Strategy", body: "Targeted Google campaigns built around high-intent treatment searches." },
      { title: "Keyword Targeting", body: "Bid on the terms that book patients and exclude the ones that waste budget." },
      { title: "Landing Pages", body: "Conversion-focused pages that turn paid clicks into enquiries." },
      { title: "Conversion Tracking", body: "Know exactly which campaigns, keywords, and ads produce real bookings." },
      { title: "Budget Management", body: "Spend managed to a cost-per-enquiry that makes commercial sense." },
      { title: "Transparent Reporting", body: "Clear monthly reporting you can actually read and act on." },
    ],
    relatedServices: ["healthcare-seo", "web-design-development", "branding-copywriting", "geo-ai-search"],
    approachSubtitle: "How we build it",
    approachTitle: "Targeted, measured, and compliant.",
    approachParagraph: [
      "Medical SEM works hand in hand with SEO and web design. Paid search brings patients in fast; the page and the offer do the converting.",
      "Research shows where patients search. Data shows what works. Results show what to improve.",
    ],
    steps: [
      { title: "Set the goal", body: "We define your target cost-per-enquiry and the treatments that matter most." },
      { title: "Build the campaigns", body: "We structure keywords, ads, and audiences around real patient intent." },
      { title: "Prepare the landing", body: "We make sure every click lands on a page built to convert." },
      { title: "Track everything", body: "We set up conversion tracking so every enquiry is attributed." },
      { title: "Optimise weekly", body: "We refine bids, copy, and targeting to lower cost and lift bookings." },
    ],
    trustNote:
      "All ad copy and landing pages are written with PHMC/HCSA advertising guidelines in mind, and reviewed with your team.",
    specialtyTitle: "Different specialties, different economics.",
    specialtyParagraph:
      "A consult for orthopaedics is worth very differently to one for aesthetics. We tune targeting and budget to the value of a patient in your specialty.",
    insights: [
      { label: "Medical SEM Without Wasting Budget: A Specialist's Guide to Google Ads", href: "/genie-tips/medical-sem-without-wasting-budget" },
      { label: "Healthcare SEO in Singapore: How Specialist Clinics Actually Rank", href: "/genie-tips/healthcare-seo-singapore-2026" },
      { label: "Healthcare Advertising Rules in Singapore: A Plain-English Guide", href: "/genie-tips/healthcare-advertising-rules-singapore" },
      { label: "The 7 Things Slowing Down Your Clinic Website", href: "/genie-tips/7-things-slowing-down-clinic-website" },
    ],
    faqs: [
      {
        q: "How much should my clinic spend on Google Ads?",
        a: "It depends on your specialty, competition, and goals. We start with a budget tied to a realistic cost-per-enquiry, then scale what works.",
      },
      {
        q: "Are healthcare ads allowed in Singapore?",
        a: "Yes, within limits. We build campaigns that respect PHMC/HCSA advertising guidelines and review copy with your team.",
      },
      {
        q: "How do you measure success?",
        a: "By qualified enquiries and cost-per-enquiry — not clicks or impressions. You'll see exactly what each booking costs.",
      },
      {
        q: "Can SEM and SEO run together?",
        a: "Absolutely. Paid search delivers patients now while SEO compounds over time. Together they cover the full search landscape.",
      },
    ],
    finalSubtitle: "Ready to stop wasting ad spend?",
    finalTitle: "Turn paid clicks into booked consultations.",
    finalParagraph:
      "If your clinic wants enquiries you can measure at a cost you can control, let's map a campaign around your most valuable treatments.",
    finalSecondaryCta: { label: "Explore Healthcare SEO", href: "/services/core-pillars/healthcare-seo" },
  },

  // ───────────────────────────── 4. Branding + Copywriting ─────────────────────────────
  {
    slug: "branding-copywriting",
    name: "Branding + Copywriting",
    accent: "#F2A65A",
    heroSubtitle: "Branding + Copywriting",
    heroTitle: "Look as good as the care you give.",
    heroParagraph: [
      "Patients decide whether to trust a clinic in seconds — long before they read a word about your clinical outcomes.",
      "Branding and copywriting give your clinic an identity and a voice that signal quality on sight, then explain, reassure, and convert in language patients understand.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "Read: choosing a clinic name", href: "/genie-tips/clinic-name-and-logo-patients-trust" },
    whyTitle: "Trust is decided before the first consultation.",
    whyParagraph: [
      "A dated logo, inconsistent visuals, or clinical jargon can quietly cost you patients who would otherwise have booked.",
      "A clear, premium brand and patient-first copy make the decision to enquire feel easy — and make your clinic memorable when patients compare their options.",
    ],
    keyPoints: [
      { title: "Identity", body: "A distinctive look that signals premium quality at a glance." },
      { title: "Voice", body: "Patient-first language that explains, reassures, and converts." },
      { title: "Consistency", body: "A coherent brand across every patient touchpoint." },
    ],
    buildSubtitle: "What it supports",
    buildTitle: "A brand patients trust on sight.",
    buildParagraph:
      "From logo to landing-page copy, we build a brand system and voice that make your clinic feel established, credible, and easy to choose.",
    cards: [
      { title: "Brand Identity", body: "A distinctive, premium clinic identity that signals quality before a word is read." },
      { title: "Logo Design", body: "A memorable mark that works across signage, print, and screen." },
      { title: "Brand Guidelines", body: "Colour, type, and voice rules that keep every touchpoint consistent." },
      { title: "Website Copywriting", body: "Patient-first, compliant copy that explains and converts." },
      { title: "Treatment Content", body: "Clear, reassuring writing that turns clinical detail into patient confidence." },
      { title: "Clinic Collateral", body: "Namecards, brochures, and packaging that extend the brand in-clinic." },
    ],
    relatedServices: ["web-design-development", "photo-video", "healthcare-seo", "findclinic"],
    approachSubtitle: "How we build it",
    approachTitle: "Premium design, patient-first words.",
    approachParagraph: [
      "Brand and copy are never decoration. They're the first proof a patient has that your clinic is worth their trust.",
      "Research shows how patients perceive you. Data shows what converts. Results show what to refine.",
    ],
    steps: [
      { title: "Understand the clinic", body: "We learn your specialty, your values, and the patients you serve." },
      { title: "Define the positioning", body: "We shape how your clinic should look, sound, and feel." },
      { title: "Design the identity", body: "We craft the logo, palette, and visual system." },
      { title: "Write the voice", body: "We develop patient-first, compliance-aware copy across your touchpoints." },
      { title: "Roll it out", body: "We apply the brand consistently from website to clinic collateral." },
    ],
    trustNote:
      "All clinic copy is written with PHMC/HCSA advertising guidelines in mind, and reviewed with your team.",
    specialtyTitle: "Every specialty earns trust differently.",
    specialtyParagraph:
      "A paediatric clinic needs warmth; a surgical practice needs precision and authority. We craft brand and voice to fit the emotional journey of your patients.",
    insights: [
      { label: "How to Choose a Clinic Name and Logo That Patients Actually Trust", href: "/genie-tips/clinic-name-and-logo-patients-trust" },
      { label: "5 Treatment Pages Every Aesthetic Clinic Should Have", href: "/genie-tips/5-treatment-pages-every-aesthetic-clinic-needs" },
      { label: "Healthcare Advertising Rules in Singapore: A Plain-English Guide", href: "/genie-tips/healthcare-advertising-rules-singapore" },
      { label: "The 7 Things Slowing Down Your Clinic Website", href: "/genie-tips/7-things-slowing-down-clinic-website" },
    ],
    faqs: [
      {
        q: "Do I need a rebrand or just new copy?",
        a: "Sometimes a sharper voice is enough; sometimes the whole identity needs a refresh. We'll tell you honestly after reviewing your current brand.",
      },
      {
        q: "Will the copy stay compliant?",
        a: "Yes. Every word is written with PHMC/HCSA guidelines in mind and reviewed with your clinical team.",
      },
      {
        q: "Can you match my existing brand?",
        a: "Of course. We can evolve and extend an identity you're happy with, or rebuild it from the ground up.",
      },
      {
        q: "Do you write treatment pages too?",
        a: "Yes. Patient-first treatment content is one of the highest-leverage assets a clinic can have, and we write it to rank and convert.",
      },
    ],
    finalSubtitle: "Ready to look the part?",
    finalTitle: "Give patients a reason to trust you instantly.",
    finalParagraph:
      "If your brand doesn't yet match the quality of your care, let's build an identity and a voice that earn trust on sight.",
    finalSecondaryCta: { label: "Explore Web Design + Development", href: "/services/core-pillars/web-design-development" },
  },

  // ───────────────────────────── 5. Web Design + Development ─────────────────────────────
  {
    slug: "web-design-development",
    name: "Web Design + Development",
    accent: "#6CBAD9",
    heroSubtitle: "Web Design + Development",
    heroTitle: "A clinic website that earns trust and books patients.",
    heroParagraph: [
      "Your website is the first consultation most patients have with your clinic. If it's slow, confusing, or dated, they leave before they enquire.",
      "We design and build fast, accessible, conversion-focused clinic websites that load in seconds, read as trustworthy, and turn visitors into booked consultations.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "Read: what slows clinic sites", href: "/genie-tips/7-things-slowing-down-clinic-website" },
    whyTitle: "Speed and clarity are trust factors.",
    whyParagraph: [
      "A site that takes more than three seconds to load on a phone loses patients — and Google notices too.",
      "A well-built clinic website is fast, mobile-first, and structured around how patients decide, so it ranks better and converts better at the same time.",
    ],
    keyPoints: [
      { title: "Speed", body: "Fast-loading pages that keep patients from bouncing." },
      { title: "Clarity", body: "Structure that guides patients from question to enquiry." },
      { title: "Credibility", body: "A polished, accessible site that reads as trustworthy." },
    ],
    buildSubtitle: "What it supports",
    buildTitle: "Websites built to rank and convert.",
    buildParagraph:
      "We build on a modern stack (Next.js) with SEO, accessibility, and conversion baked in — not bolted on afterwards.",
    cards: [
      { title: "Web Design", body: "Beautiful, on-brand interfaces designed around the patient journey." },
      { title: "Development", body: "Fast, accessible clinic websites built on a modern, reliable stack." },
      { title: "Mobile-First Build", body: "Sites that look and perform flawlessly on the phones patients use." },
      { title: "SEO Foundations", body: "Clean structure and speed that give your content room to rank." },
      { title: "Conversion Design", body: "Clear pathways and calls to action that turn visits into enquiries." },
      { title: "Booking Integration", body: "Enquiry forms and booking flows connected to how your clinic works." },
    ],
    relatedServices: ["branding-copywriting", "healthcare-seo", "photo-video", "medical-sem"],
    approachSubtitle: "How we build it",
    approachTitle: "Fast, accessible, conversion-focused.",
    approachParagraph: [
      "A clinic website is a growth asset, not a brochure. We design and engineer it to do real work — ranking, reassuring, and converting.",
      "Research shows what patients need. Data shows what converts. Results show what to improve.",
    ],
    steps: [
      { title: "Plan the structure", body: "We map the pages and journeys patients need, around real search intent." },
      { title: "Design the experience", body: "We design on-brand, conversion-focused interfaces." },
      { title: "Build for performance", body: "We develop a fast, accessible, mobile-first site on a modern stack." },
      { title: "Connect the journey", body: "We integrate enquiry forms, booking, and tracking." },
      { title: "Launch & optimise", body: "We measure speed, rankings, and conversions, then refine." },
    ],
    trustNote:
      "All website content is written with PHMC/HCSA advertising guidelines in mind, and reviewed with your team.",
    specialtyTitle: "Every specialty needs a different journey.",
    specialtyParagraph:
      "An aesthetics site sells outcomes and confidence; a cardiology site reassures and informs. We design the structure and flow to match how your patients decide.",
    insights: [
      { label: "The 7 Things Slowing Down Your Clinic Website", href: "/genie-tips/7-things-slowing-down-clinic-website" },
      { label: "Healthcare SEO in Singapore: How Specialist Clinics Actually Rank", href: "/genie-tips/healthcare-seo-singapore-2026" },
      { label: "5 Treatment Pages Every Aesthetic Clinic Should Have", href: "/genie-tips/5-treatment-pages-every-aesthetic-clinic-needs" },
      { label: "How to Choose a Clinic Name and Logo That Patients Trust", href: "/genie-tips/clinic-name-and-logo-patients-trust" },
    ],
    faqs: [
      {
        q: "What platform do you build on?",
        a: "We build on a modern stack (Next.js) for speed, security, and SEO — but we'll always match the right solution to your clinic's needs.",
      },
      {
        q: "Will my site be fast on mobile?",
        a: "Yes. Mobile-first performance is a core requirement, because that's where most patients first meet your clinic.",
      },
      {
        q: "Can you integrate booking or enquiry forms?",
        a: "Yes. We connect enquiry and booking flows to the way your clinic actually operates.",
      },
      {
        q: "Do you handle the SEO too?",
        a: "We build clean SEO foundations into every site, and our Healthcare SEO service can take rankings further.",
      },
    ],
    finalSubtitle: "Ready for a site that works?",
    finalTitle: "Turn your website into your hardest-working asset.",
    finalParagraph:
      "If your current site is slow, dated, or not converting, let's build a fast, trustworthy clinic website that books patients.",
    finalSecondaryCta: { label: "Explore Branding + Copywriting", href: "/services/core-pillars/branding-copywriting" },
  },

  // ───────────────────────────── 6. Photo + Video ─────────────────────────────
  {
    slug: "photo-video",
    name: "Photo + Video",
    accent: "#F27A8E",
    heroSubtitle: "Photo + Video",
    heroTitle: "Real visuals that build instant credibility.",
    heroParagraph: [
      "Stock photos signal a clinic that has something to hide. Real images of your space, your team, and your work signal one patients can trust.",
      "Professional photography and video show patients who you are before they ever walk in — building the confidence that turns interest into enquiries.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See our works", href: "/portfolio" },
    whyTitle: "Patients trust what they can see.",
    whyParagraph: [
      "A clean, well-lit clinic, a warm photo of the doctor, a short video that explains a treatment — these do more for trust than any claim you can write.",
      "Authentic visuals reduce the uncertainty patients feel before booking, and make your clinic feel real, present, and credible.",
    ],
    keyPoints: [
      { title: "Authenticity", body: "Real visuals of your clinic, team, and work — never stock." },
      { title: "Connection", body: "Human imagery that helps patients feel they already know you." },
      { title: "Credibility", body: "Professional production that signals quality and care." },
    ],
    buildSubtitle: "What it supports",
    buildTitle: "Visual content that earns trust.",
    buildParagraph:
      "From clinic photography to doctor interviews, we produce the visuals that make your website, profiles, and social presence feel real and reassuring.",
    cards: [
      { title: "Clinic Photography", body: "Show your space the way patients will experience it — clean, warm, and real." },
      { title: "Doctor & Team Portraits", body: "Help patients connect with the people behind the care." },
      { title: "Treatment & Service Video", body: "Explain procedures clearly to reduce patient uncertainty." },
      { title: "Doctor Interviews", body: "Answer common patient questions in a human, credible way." },
      { title: "Social Media Content", body: "Short-form video and imagery built for clinic social channels." },
      { title: "Brand Storytelling", body: "Visual narratives that bring your clinic's values to life." },
    ],
    relatedServices: ["branding-copywriting", "social-media", "web-design-development", "findclinic"],
    approachSubtitle: "How we build it",
    approachTitle: "Authentic, clinical-grade, on-brand.",
    approachParagraph: [
      "Great visuals aren't just pretty — they're proof. We produce imagery and video that reflect the real quality of your clinic and care.",
      "Research shows what reassures patients. Data shows what engages. Results show what to refine.",
    ],
    steps: [
      { title: "Plan the shoot", body: "We define the visuals your website, profiles, and channels need." },
      { title: "Prepare the clinic", body: "We guide setup so your space and team look their best." },
      { title: "Capture the content", body: "We shoot photography and video with a clinical, on-brand eye." },
      { title: "Edit & finish", body: "We produce polished assets ready for web, social, and print." },
      { title: "Deploy across channels", body: "We help place visuals where they build the most trust." },
    ],
    trustNote:
      "All visual content, including any treatment or before-and-after imagery, is produced with PHMC/HCSA advertising guidelines in mind.",
    specialtyTitle: "Every specialty tells a different story.",
    specialtyParagraph:
      "Aesthetics leans on transformation and confidence; paediatrics leans on warmth and reassurance. We shape the visual story to fit your patients.",
    insights: [
      { label: "How to Choose a Clinic Name and Logo That Patients Trust", href: "/genie-tips/clinic-name-and-logo-patients-trust" },
      { label: "What Makes a Clinic Profile More Useful for Patients", href: "/genie-tips" },
      { label: "Healthcare Advertising Rules in Singapore: A Plain-English Guide", href: "/genie-tips/healthcare-advertising-rules-singapore" },
      { label: "From Research to Results: A Clinic's First 90 Days of Growth", href: "/genie-tips/first-90-days-of-clinic-growth" },
    ],
    faqs: [
      {
        q: "Do you shoot on location at our clinic?",
        a: "Yes. We photograph and film at your clinic so the visuals are authentically yours — never generic stock.",
      },
      {
        q: "Can you produce before-and-after content compliantly?",
        a: "Where appropriate, yes — always within PHMC/HCSA advertising guidelines and reviewed with your team.",
      },
      {
        q: "Do you produce content for social media?",
        a: "Yes. We create short-form video and imagery designed for clinic social channels.",
      },
      {
        q: "How long does a shoot take?",
        a: "Most clinic shoots are completed in a half or full day, depending on the scope of photography and video required.",
      },
    ],
    finalSubtitle: "Ready to show patients the real you?",
    finalTitle: "Let patients trust you before they arrive.",
    finalParagraph:
      "If your clinic is still relying on stock imagery, let's capture the real visuals that build genuine patient confidence.",
    finalSecondaryCta: { label: "Explore Social Media", href: "/services/core-pillars/social-media" },
  },

  // ───────────────────────────── 7. Social Media ─────────────────────────────
  {
    slug: "social-media",
    name: "Social Media",
    accent: "#7FE9F0",
    heroSubtitle: "Social Media",
    heroTitle: "Stay visible, stay trusted — between visits.",
    heroParagraph: [
      "Patients follow clinics they trust, and recommend the ones that feel present and human. Social media keeps your clinic top of mind long before and after an enquiry.",
      "We help clinics show up consistently with compliant, on-brand content that educates patients, builds familiarity, and supports discovery across the platforms they use.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "See our works", href: "/portfolio" },
    whyTitle: "Familiarity is a form of trust.",
    whyParagraph: [
      "A clinic that shows up regularly with useful, human content feels more credible than one that's silent — even before a patient reads a single review.",
      "Social media builds that familiarity over time, keeping your clinic visible to patients who aren't ready to book yet but will be.",
    ],
    keyPoints: [
      { title: "Presence", body: "Show up consistently where your patients already spend time." },
      { title: "Education", body: "Useful, patient-friendly content that builds trust over time." },
      { title: "Familiarity", body: "Stay top of mind so your clinic is the one patients remember." },
    ],
    buildSubtitle: "What it supports",
    buildTitle: "A social presence patients trust.",
    buildParagraph:
      "We plan, create, and manage clinic social content that's compliant, on-brand, and genuinely useful — built to support discovery, not chase vanity metrics.",
    cards: [
      { title: "Content Strategy", body: "A clear plan tied to your specialty, patients, and growth goals." },
      { title: "Content Creation", body: "On-brand graphics, captions, and short-form video for clinic channels." },
      { title: "Channel Management", body: "Consistent posting and presence across the platforms that matter." },
      { title: "Patient Education", body: "Useful, compliant content that answers real patient questions." },
      { title: "Community Engagement", body: "Thoughtful responses that build relationships and trust." },
      { title: "Performance Reporting", body: "Clear reporting on reach, engagement, and what to do next." },
    ],
    relatedServices: ["photo-video", "branding-copywriting", "geo-ai-search", "findclinic"],
    approachSubtitle: "How we build it",
    approachTitle: "Consistent, compliant, genuinely useful.",
    approachParagraph: [
      "Social media for clinics isn't about going viral — it's about being consistently present, useful, and trustworthy.",
      "Research shows where patients engage. Data shows what resonates. Results show what to refine.",
    ],
    steps: [
      { title: "Set the strategy", body: "We define your channels, audience, and content pillars." },
      { title: "Plan the calendar", body: "We map a sustainable, compliant content schedule." },
      { title: "Create the content", body: "We produce on-brand graphics, captions, and video." },
      { title: "Manage & engage", body: "We post consistently and respond thoughtfully." },
      { title: "Review & improve", body: "We track engagement and refine what works." },
    ],
    trustNote:
      "All social content is created with PHMC/HCSA advertising guidelines in mind, and reviewed with your team.",
    specialtyTitle: "Every specialty has a different audience.",
    specialtyParagraph:
      "Aesthetics audiences want transformation and tips; paediatric audiences want reassurance for parents. We tailor content to who your patients are.",
    insights: [
      { label: "What Makes a Clinic Profile More Useful for Patients", href: "/genie-tips" },
      { label: "Healthcare Advertising Rules in Singapore: A Plain-English Guide", href: "/genie-tips/healthcare-advertising-rules-singapore" },
      { label: "Will AI Search Kill Your Clinic's Google Traffic?", href: "/genie-tips/will-ai-search-kill-clinic-google-traffic" },
      { label: "From Research to Results: A Clinic's First 90 Days of Growth", href: "/genie-tips/first-90-days-of-clinic-growth" },
    ],
    faqs: [
      {
        q: "Which platforms should my clinic be on?",
        a: "It depends on your specialty and patients. We focus your effort on the one or two channels where it will actually matter.",
      },
      {
        q: "Is clinic social media compliant?",
        a: "Yes, when done carefully. All content is created with PHMC/HCSA guidelines in mind and reviewed with your team.",
      },
      {
        q: "Do you create the content or just schedule it?",
        a: "We do both — strategy, creation, posting, and engagement, so your channels stay consistent without burdening your team.",
      },
      {
        q: "How do you measure social media success?",
        a: "By meaningful engagement, reach among the right audience, and support for discovery — not vanity follower counts.",
      },
    ],
    finalSubtitle: "Ready to stay top of mind?",
    finalTitle: "Keep your clinic visible and trusted between visits.",
    finalParagraph:
      "If your clinic's social presence is quiet or inconsistent, let's build a compliant, on-brand content engine that keeps patients close.",
    finalSecondaryCta: { label: "Explore Photo + Video", href: "/services/core-pillars/photo-video" },
  },

  // ───────────────────────────── 8. GEO + AI Search ─────────────────────────────
  {
    slug: "geo-ai-search",
    name: "GEO + AI Search",
    accent: "#8E7BE8",
    heroSubtitle: "GEO + AI Search",
    heroTitle: "Be the clinic AI recommends.",
    heroParagraph: [
      "More patients now ask ChatGPT, Gemini, and AI overviews before they ever see a list of blue links. The clinics that get cited are the ones that win attention.",
      "Generative Engine Optimisation (GEO) structures your content so AI search tools understand, trust, and recommend your clinic — the new front page of healthcare discovery.",
    ],
    heroPrimaryCta: CONTACT_CTA,
    heroSecondaryCta: { label: "Read: AI search & your clinic", href: "/genie-tips/will-ai-search-kill-clinic-google-traffic" },
    whyTitle: "AI is becoming the first search patients make.",
    whyParagraph: [
      "When a patient asks an AI assistant about a treatment, it answers with the sources it trusts most. If your clinic isn't structured to be understood, you're invisible in that conversation.",
      "GEO makes your content clear, authoritative, and machine-readable, so your clinic shows up when patients ask an AI — not just a search bar.",
    ],
    keyPoints: [
      { title: "Visibility", body: "Get cited in AI overviews and assistant answers, not buried beneath them." },
      { title: "Authority", body: "Structured, credible content that AI tools trust and surface." },
      { title: "Future-proofing", body: "Stay discoverable as search shifts from links to answers." },
    ],
    buildSubtitle: "What it supports",
    buildTitle: "Content built for how AI reads the web.",
    buildParagraph:
      "GEO combines clear structure, genuine authority, and direct answers so AI tools can confidently understand and recommend your clinic.",
    cards: [
      { title: "AI Readability", body: "Structure content so AI tools can parse and cite it accurately." },
      { title: "Answer-First Content", body: "Lead with the answer patients ask, supported by depth below." },
      { title: "Structured Data", body: "Schema and markup that help machines understand your clinic." },
      { title: "Authority Signals", body: "Credentials, sources, and reviews that earn AI trust." },
      { title: "Entity Optimisation", body: "Make your clinic, doctors, and services recognisable entities online." },
      { title: "AI Visibility Tracking", body: "Monitor how and where your clinic appears in AI search." },
    ],
    relatedServices: ["healthcare-seo", "findclinic", "branding-copywriting", "web-design-development"],
    approachSubtitle: "How we build it",
    approachTitle: "Clear, structured, authoritative.",
    approachParagraph: [
      "GEO is the natural evolution of SEO. The same principles — clarity, authority, and trust — applied to a world where AI answers first.",
      "Research shows how patients ask. Data shows what AI surfaces. Results show what to improve.",
    ],
    steps: [
      { title: "Audit AI visibility", body: "We assess how AI tools currently understand and represent your clinic." },
      { title: "Structure the content", body: "We organise information so machines can parse and cite it." },
      { title: "Answer the questions", body: "We write answer-first content around real patient queries." },
      { title: "Strengthen authority", body: "We add structured data and trust signals AI relies on." },
      { title: "Monitor & adapt", body: "We track AI visibility and refine as the landscape evolves." },
    ],
    trustNote:
      "All AI-optimised content is written with PHMC/HCSA advertising guidelines in mind, and reviewed with your team.",
    specialtyTitle: "Every specialty gets asked different questions.",
    specialtyParagraph:
      "Patients ask AI very different things about dental implants, fertility, or skin treatments. We optimise for the real questions in your specialty.",
    insights: [
      { label: "Will AI Search Kill Your Clinic's Google Traffic? What to Do Now", href: "/genie-tips/will-ai-search-kill-clinic-google-traffic" },
      { label: "Healthcare SEO in Singapore: How Specialist Clinics Actually Rank", href: "/genie-tips/healthcare-seo-singapore-2026" },
      { label: "What Makes a Clinic Profile More Useful for Patients", href: "/genie-tips" },
      { label: "From Research to Results: A Clinic's First 90 Days of Growth", href: "/genie-tips/first-90-days-of-clinic-growth" },
    ],
    faqs: [
      {
        q: "What is GEO?",
        a: "Generative Engine Optimisation is the practice of structuring content so AI search tools — like ChatGPT, Gemini, and Google's AI overviews — understand, trust, and cite your clinic.",
      },
      {
        q: "Is GEO different from SEO?",
        a: "It builds on the same foundations but optimises for AI-generated answers rather than ranked links. The two work best together.",
      },
      {
        q: "Can you guarantee my clinic appears in AI answers?",
        a: "No one can guarantee AI placement, but we maximise your chances with clear structure, authority, and answer-first content.",
      },
      {
        q: "Is AI search really worth investing in now?",
        a: "Yes. Patient behaviour is shifting fast, and clinics that adapt early build a durable visibility advantage.",
      },
    ],
    finalSubtitle: "Ready for the next era of search?",
    finalTitle: "Be the clinic patients' AI recommends.",
    finalParagraph:
      "If you want your clinic to show up when patients ask an AI — not just a search bar — let's make your content the answer.",
    finalSecondaryCta: { label: "Explore Healthcare SEO", href: "/services/core-pillars/healthcare-seo" },
  },
];

export function getPillar(slug: string) {
  return CORE_PILLARS.find((p) => p.slug === slug);
}
