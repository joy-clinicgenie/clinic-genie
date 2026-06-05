export type WorkTag = "Branding" | "Web Design" | "SEO" | "SEM" | "Content" | "Video" | "Strategy" | "Lead Gen" | "AI Search";

export interface CaseStudy {
  slug: string;
  name: string;
  tagline?: string;
  specialty: string;
  line: string;
  tags: WorkTag[];
  result: string;
  accent: string;
  challenge: string;
  approach: { label: string; body: string }[];
  results: string[];
  quote: { text: string; author: string };
  next?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "the-acne-clinic",
    name: "The Acne Clinic",
    tagline: "Face it. Fix it.",
    specialty: "Aesthetics / Acne & Scarring",
    line: "A bold new aesthetics brand that owns acne search in Singapore.",
    tags: ["Branding", "Web Design", "SEO", "SEM"],
    result: "+118% organic traffic · 2.1× consult bookings",
    accent: "#6CBAD9",
    challenge:
      "A new aesthetics clinic entered one of Singapore's most competitive niches — acne and acne-scar treatment — with no brand recognition and no search visibility. They needed to look established and rank fast, without overstepping advertising rules.",
    approach: [
      { label: "Brand", body: "Created the bold green-and-pink \"The Acne Clinic — Face it. Fix it.\" identity, namecards, packaging and clinic collateral." },
      { label: "Web", body: "Built a fast Next.js site structured around treatment intent (acne, acne scars, chemical peels, fractional laser, skin boosters)." },
      { label: "SEO", body: "Published compliance-aware, doctor-reviewed treatment pages and supporting Genie Tips content." },
      { label: "SEM", body: "Ran tightly geo-targeted Google campaigns on high-intent terms with conversion tracking." },
    ],
    results: [
      "+118% organic traffic in 6 months",
      "Page 1 for \"acne scar treatment Singapore\"",
      "2.1× increase in consult bookings",
      "38% lower cost-per-enquiry vs. launch month",
    ],
    quote: {
      text: "Clinic Genie made us look like we'd been around for years — in months. The bookings speak for themselves.",
      author: "Founder, The Acne Clinic",
    },
    next: "Now expanding into TikTok and live content with partner Qianyi.",
  },
  {
    slug: "the-aesthetics-clinic",
    name: "The Aesthetics Clinic",
    specialty: "Aesthetics / Dermatology",
    line: "Premium rebrand + content engine for chemical peels, fractional laser and skin boosters.",
    tags: ["Web Design", "SEO", "Content"],
    result: "Page 1 for 6 priority treatment keywords",
    accent: "#7FE9F0",
    challenge:
      "An established aesthetics practice looked dated online and was being out-ranked by newer, sharper competitors despite superior clinical outcomes.",
    approach: [
      { label: "Brand", body: "A premium visual refresh that matched the quality of their in-clinic experience." },
      { label: "Web", body: "Rebuilt the site around treatment journeys with fast, accessible, conversion-focused pages." },
      { label: "Content", body: "A doctor-reviewed content engine covering their highest-intent treatments." },
    ],
    results: [
      "Page 1 for 6 priority treatment keywords",
      "+74% organic sessions in 4 months",
      "2× longer average session duration",
    ],
    quote: {
      text: "Our website finally feels as considered as our care. Patients notice.",
      author: "Medical Director, The Aesthetics Clinic",
    },
  },
  {
    slug: "stellaris-fertility",
    name: "Stellaris Fertility",
    specialty: "Fertility & Women's Health",
    line: "A reassuring, compliant brand for a sensitive specialty.",
    tags: ["Branding", "Web Design", "Strategy"],
    result: "+64% qualified enquiries in 5 months",
    accent: "#8E7BE8",
    challenge:
      "A fertility clinic needed to communicate warmth, trust and clinical excellence for an emotionally sensitive patient journey — all within strict advertising guidelines.",
    approach: [
      { label: "Strategy", body: "Mapped the fertility patient journey and the searches behind each decision stage." },
      { label: "Brand", body: "A calm, hopeful identity built on a star motif — reassurance without overpromising." },
      { label: "Web", body: "A gentle, accessible site that answers patient questions before they ask." },
    ],
    results: [
      "+64% qualified enquiries in 5 months",
      "Page 1 for key fertility consultation searches",
      "Significant drop in bounce on treatment pages",
    ],
    quote: {
      text: "They understood the sensitivity of our work and the rules we operate under. Rare in an agency.",
      author: "Founder, Stellaris Fertility",
    },
  },
  {
    slug: "lumiere-dental",
    name: "Lumière Dental",
    specialty: "Dental",
    line: "Implant and Invisalign demand, captured with tightly targeted SEM.",
    tags: ["Web Design", "SEM", "Lead Gen"],
    result: "38% lower cost-per-enquiry",
    accent: "#6CBAD9",
    challenge:
      "A dental practice was spending on Google Ads with little to show for it — clicks were expensive and rarely turned into booked consultations.",
    approach: [
      { label: "Web", body: "Built dedicated, fast-loading landing pages for implants and Invisalign." },
      { label: "SEM", body: "Restructured campaigns around high-intent terms with conversion tracking and negative keywords." },
      { label: "Lead Gen", body: "Added clear booking funnels and call tracking to measure real outcomes." },
    ],
    results: [
      "38% lower cost-per-enquiry",
      "2.6× consultation bookings from paid search",
      "Clear attribution from click to booked patient",
    ],
    quote: {
      text: "For the first time, I know exactly what every marketing dollar brings back.",
      author: "Principal Dentist, Lumière Dental",
    },
  },
  {
    slug: "orchard-orthopaedics",
    name: "Orchard Orthopaedics",
    specialty: "Orthopaedics & Sports Medicine",
    line: "Owning \"knee replacement Singapore\" through doctor-reviewed content.",
    tags: ["SEO", "Content", "AI Search"],
    result: "Featured snippet + 3× organic leads",
    accent: "#7FE9F0",
    challenge:
      "An orthopaedic specialist had deep expertise but almost no organic visibility for the procedures that mattered most to their practice.",
    approach: [
      { label: "SEO", body: "Built authoritative, doctor-reviewed pages around key procedures and conditions." },
      { label: "Content", body: "Answered the real questions patients ask before surgery, structured for featured snippets." },
      { label: "AI Search", body: "Optimised content so the clinic surfaces in AI overviews and assistant answers." },
    ],
    results: [
      "Featured snippet for \"knee replacement Singapore\"",
      "3× organic leads in 6 months",
      "Cited in AI search answers for key procedures",
    ],
    quote: {
      text: "Patients arrive already informed and confident. That changes the whole consultation.",
      author: "Consultant Surgeon, Orchard Orthopaedics",
    },
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
