export type PostCategory =
  | "SEO"
  | "SEM & Ads"
  | "AI Search"
  | "Compliance"
  | "Web & Brand"
  | "Growth Strategy";

export interface PostSection {
  heading: string;
  body: string[];
}

export interface Post {
  slug: string;
  title: string;
  dek: string;
  category: PostCategory;
  readingTime: string;
  updated: string;
  featured?: boolean;
  intro?: string;
  sections?: PostSection[];
}

export const POSTS: Post[] = [
  {
    slug: "healthcare-seo-singapore-2026",
    title: "Healthcare SEO in Singapore: How Specialist Clinics Actually Rank in 2026",
    dek: "The honest playbook — what moves the needle, what wastes budget, and how to stay on the right side of advertising rules.",
    category: "SEO",
    readingTime: "8 min read",
    updated: "Updated June 2026",
    featured: true,
    intro:
      "If you run a specialist clinic in Singapore, you already know the hardest part isn't the medicine — it's being found by the patients who need you. This is the no-fluff version of how healthcare SEO actually works in 2026, what's changed, and where to spend your effort first.",
    sections: [
      {
        heading: "1. Patients search by problem, not by specialty",
        body: [
          "Your future patients rarely type \"dermatologist.\" They type \"acne scar treatment,\" \"why won't my acne go away,\" or \"laser for acne scars Singapore.\" These intent-led searches are where bookings come from.",
          "Map your treatments to the words patients actually use, then build a page for each. The clinic that matches the patient's language — not the textbook term — wins the click.",
        ],
      },
      {
        heading: "2. Treatment pages are your highest-leverage asset",
        body: [
          "One strong, doctor-reviewed page per treatment beats a dozen thin blog posts. Each page should explain the problem, the treatment, what to expect, and answer the questions patients ask before booking.",
          "Structure matters: clear headings, honest expectations, and no claims you can't support. This is where compliance and conversion meet.",
        ],
      },
      {
        heading: "3. E-E-A-T matters more in healthcare than anywhere else",
        body: [
          "Google holds medical content to a higher bar. Real doctors, named credentials, genuine reviews and clear authorship all signal trust — to both search engines and patients.",
          "Put your specialists front and centre. Faceless clinics struggle to rank for treatments where trust is everything.",
        ],
      },
      {
        heading: "4. AI search is the new front page",
        body: [
          "More patients now ask an AI assistant before they ever see a list of blue links. If your content is clear, well-structured and authoritative, it gets cited in AI overviews and answers.",
          "Write for the question, answer it directly near the top, and support it with depth below. That's what gets surfaced.",
        ],
      },
      {
        heading: "5. Speed and mobile are ranking factors AND trust factors",
        body: [
          "A slow clinic site loses patients in seconds — and Google notices. Fast, accessible, mobile-first sites rank better and convert better.",
          "If your site takes more than three seconds to load on a phone, that's the first thing to fix.",
        ],
      },
      {
        heading: "6. Stay compliant while you grow",
        body: [
          "Singapore's healthcare advertising guidelines (PHMC/HCSA) set real limits on what you can say. Growth should never put your licence at risk.",
          "The good news: compliant copy and strong rankings aren't a trade-off. Honest, specific, patient-first content is exactly what ranks.",
        ],
      },
      {
        heading: "Where to start this week",
        body: [
          "Pick your three highest-value treatments and check whether each has a dedicated, doctor-reviewed page.",
          "Test your site speed on a phone — fix anything over three seconds.",
          "Make sure your specialists, their credentials and real patient reviews are visible on every key page.",
        ],
      },
    ],
  },
  {
    slug: "will-ai-search-kill-clinic-google-traffic",
    title: "Will AI Search Kill Your Clinic's Google Traffic? What to Do Now",
    dek: "How patients are searching with AI — and how to make sure your clinic still shows up.",
    category: "AI Search",
    readingTime: "6 min read",
    updated: "Updated May 2026",
  },
  {
    slug: "7-things-slowing-down-clinic-website",
    title: "The 7 Things Slowing Down Your Clinic Website (and Costing You Bookings)",
    dek: "Speed is trust. Here's what to fix first.",
    category: "Web & Brand",
    readingTime: "5 min read",
    updated: "Updated May 2026",
  },
  {
    slug: "medical-sem-without-wasting-budget",
    title: "Medical SEM Without Wasting Budget: A Specialist's Guide to Google Ads",
    dek: "Stop paying for clicks that never book.",
    category: "SEM & Ads",
    readingTime: "7 min read",
    updated: "Updated April 2026",
  },
  {
    slug: "healthcare-advertising-rules-singapore",
    title: "Healthcare Advertising Rules in Singapore: A Plain-English Guide for Clinics",
    dek: "What you can and can't say in your marketing, without the legalese.",
    category: "Compliance",
    readingTime: "9 min read",
    updated: "Updated April 2026",
  },
  {
    slug: "clinic-name-and-logo-patients-trust",
    title: "How to Choose a Clinic Name and Logo That Patients Actually Trust",
    dek: "Lessons from rebranding real specialist clinics.",
    category: "Web & Brand",
    readingTime: "6 min read",
    updated: "Updated March 2026",
  },
  {
    slug: "5-treatment-pages-every-aesthetic-clinic-needs",
    title: "5 Treatment Pages Every Aesthetic Clinic Should Have (and How to Write Them)",
    dek: "Turn your services into pages that rank and convert.",
    category: "SEO",
    readingTime: "7 min read",
    updated: "Updated March 2026",
  },
  {
    slug: "google-business-profile-for-clinics",
    title: "Google Business Profile for Clinics: The 20-Minute Setup That Wins Local Patients",
    dek: "The fastest free win in clinic marketing.",
    category: "SEO",
    readingTime: "4 min read",
    updated: "Updated February 2026",
  },
  {
    slug: "first-90-days-of-clinic-growth",
    title: "From Research to Results: How We Plan a Clinic's First 90 Days of Growth",
    dek: "A look inside the Clinic Genie method.",
    category: "Growth Strategy",
    readingTime: "8 min read",
    updated: "Updated February 2026",
  },
];

export const POST_CATEGORIES: PostCategory[] = [
  "SEO",
  "SEM & Ads",
  "AI Search",
  "Compliance",
  "Web & Brand",
  "Growth Strategy",
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
