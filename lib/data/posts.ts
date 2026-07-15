export type PostCategory =
  | "SEO"
  | "SEM & Ads"
  | "AI Search"
  | "Compliance"
  | "Web & Brand"
  | "Growth Strategy";

export interface PostListItem {
  title: string;
  body: string;
}

export interface PostQuote {
  text: string;
  attribution: string;
}

export interface PostSection {
  heading: string;
  body: string[];
  listLabel?: string;
  list?: PostListItem[];
  quote?: PostQuote;
  /** Show a category illustration after this section's copy */
  showImage?: boolean;
}

export interface Post {
  slug: string;
  title: string;
  dek: string;
  category: PostCategory;
  readingTime: string;
  updated: string;
  /** Display date for the article meta row, e.g. "12 June 2026" */
  published?: string;
  featured?: boolean;
  intro?: string;
  sections?: PostSection[];
}

export const POST_AUTHOR = {
  name: "Clinic Genie",
  role: "Healthcare growth team",
} as const;

export const POSTS: Post[] = [
  {
    slug: "healthcare-seo-singapore-2026",
    title: "Healthcare SEO in Singapore: How Specialist Clinics Actually Rank in 2026",
    dek: "The honest playbook: what moves the needle, what wastes budget, and how to stay on the right side of advertising rules.",
    category: "SEO",
    readingTime: "8 min read",
    updated: "Updated June 2026",
    published: "12 June 2026",
    featured: true,
    intro:
      "If you run a specialist clinic in Singapore, you already know the hardest part isn't the medicine. It's being found by the patients who need you. This is the no-fluff version of how healthcare SEO actually works in 2026, what's changed, and where to spend your effort first.",
    sections: [
      {
        heading: "Introduction",
        body: [
          "Specialist clinics in Singapore compete in a search landscape shaped by intent-led queries, AI answers, and strict advertising rules. Ranking well is less about tricks and more about clear structure, credible expertise, and pages that help patients decide with confidence.",
        ],
      },
      {
        heading: "Patients search by problem, not by specialty",
        body: [
          "Your future patients rarely type \"dermatologist.\" They type \"acne scar treatment,\" \"why won't my acne go away,\" or \"laser for acne scars Singapore.\" These intent-led searches are where consideration begins.",
          "Map your treatments to the words patients actually use, then build a page for each. The clinic that matches the patient's language, not the textbook term, earns the click.",
        ],
        listLabel: "Where to focus first:",
        list: [
          {
            title: "Treatment intent queries",
            body: "Pages built around the problem and procedure patients search for.",
          },
          {
            title: "Doctor and credential signals",
            body: "Named specialists, qualifications, and clear authorship on key pages.",
          },
          {
            title: "Local discovery",
            body: "Location clarity, Google Business Profile hygiene, and consistent NAP data.",
          },
          {
            title: "AI-ready answers",
            body: "Direct answers near the top of the page, supported by deeper explanation below.",
          },
        ],
        showImage: true,
      },
      {
        heading: "Treatment pages are your highest-leverage asset",
        body: [
          "One strong, doctor-reviewed page per treatment beats a dozen thin blog posts. Each page should explain the problem, the treatment, what to expect, and answer the questions patients ask before booking.",
          "Structure matters: clear headings, honest expectations, and no claims you can't support. This is where compliance and conversion meet.",
        ],
      },
      {
        heading: "E-E-A-T matters more in healthcare than anywhere else",
        body: [
          "Google holds medical content to a higher bar. Real doctors, named credentials, genuine reviews and clear authorship all signal trust to both search engines and patients.",
          "Put your specialists front and centre. Faceless clinics struggle to rank for treatments where trust is everything.",
        ],
        quote: {
          text: "Compliant copy and strong rankings are not a trade-off. Honest, specific, patient-first content is exactly what ranks.",
          attribution: "Clinic Genie, Healthcare growth team",
        },
      },
      {
        heading: "AI search is the new front page",
        body: [
          "More patients now ask an AI assistant before they ever see a list of blue links. If your content is clear, well-structured and authoritative, it gets cited in AI overviews and answers.",
          "Write for the question, answer it directly near the top, and support it with depth below. That's what gets surfaced.",
        ],
      },
      {
        heading: "Speed, mobile, and compliance",
        body: [
          "A slow clinic site loses patients in seconds, and Google notices. Fast, accessible, mobile-first sites support both rankings and trust.",
          "Singapore's healthcare advertising guidelines (PHMC/HCSA) set real limits on what you can say. Growth should never put your licence at risk. Stay specific, stay honest, and keep claims supportable.",
        ],
      },
      {
        heading: "Where to start this week",
        body: [
          "Pick your three highest-value treatments and check whether each has a dedicated, doctor-reviewed page.",
          "Test your site speed on a phone. Fix anything over three seconds.",
          "Make sure your specialists, their credentials and real patient reviews are visible on every key page.",
        ],
      },
    ],
  },
  {
    slug: "will-ai-search-kill-clinic-google-traffic",
    title: "Will AI Search Kill Your Clinic's Google Traffic? What to Do Now",
    dek: "How patients are searching with AI, and how to make sure your clinic still shows up.",
    category: "AI Search",
    readingTime: "6 min read",
    updated: "Updated May 2026",
    published: "18 May 2026",
  },
  {
    slug: "7-things-slowing-down-clinic-website",
    title: "The 7 Things Slowing Down Your Clinic Website (and Costing You Bookings)",
    dek: "Speed is trust. Here's what to fix first.",
    category: "Web & Brand",
    readingTime: "5 min read",
    updated: "Updated May 2026",
    published: "4 May 2026",
  },
  {
    slug: "medical-sem-without-wasting-budget",
    title: "Medical SEM Without Wasting Budget: A Specialist's Guide to Google Ads",
    dek: "Stop paying for clicks that never book.",
    category: "SEM & Ads",
    readingTime: "7 min read",
    updated: "Updated April 2026",
    published: "22 April 2026",
  },
  {
    slug: "healthcare-advertising-rules-singapore",
    title: "Healthcare Advertising Rules in Singapore: A Plain-English Guide for Clinics",
    dek: "What you can and can't say in your marketing, without the legalese.",
    category: "Compliance",
    readingTime: "9 min read",
    updated: "Updated April 2026",
    published: "8 April 2026",
  },
  {
    slug: "clinic-name-and-logo-patients-trust",
    title: "How to Choose a Clinic Name and Logo That Patients Actually Trust",
    dek: "Lessons from rebranding real specialist clinics.",
    category: "Web & Brand",
    readingTime: "6 min read",
    updated: "Updated March 2026",
    published: "20 March 2026",
  },
  {
    slug: "5-treatment-pages-every-aesthetic-clinic-needs",
    title: "5 Treatment Pages Every Aesthetic Clinic Should Have (and How to Write Them)",
    dek: "Turn your services into pages that rank and convert.",
    category: "SEO",
    readingTime: "7 min read",
    updated: "Updated March 2026",
    published: "6 March 2026",
  },
  {
    slug: "google-business-profile-for-clinics",
    title: "Google Business Profile for Clinics: The 20-Minute Setup That Wins Local Patients",
    dek: "The fastest free win in clinic marketing.",
    category: "SEO",
    readingTime: "4 min read",
    updated: "Updated February 2026",
    published: "18 February 2026",
  },
  {
    slug: "first-90-days-of-clinic-growth",
    title: "From Research to Results: How We Plan a Clinic's First 90 Days of Growth",
    dek: "A look inside the Clinic Genie method.",
    category: "Growth Strategy",
    readingTime: "8 min read",
    updated: "Updated February 2026",
    published: "4 February 2026",
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

export function getPostPublishedLabel(post: Post): string {
  if (post.published) return `Published on ${post.published}`;
  const monthYear = post.updated.replace(/^Updated\s+/i, "");
  return `Published on ${monthYear}`;
}
