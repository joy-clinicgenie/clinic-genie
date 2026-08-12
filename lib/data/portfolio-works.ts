export interface PortfolioWorkSlide {
  id: string;
  title: string;
  category: string;
  /** One-line project caption shown under the gallery image on hover/focus */
  line: string;
  /** Client logo shown on the resting project card */
  logo: string;
  /**
   * When false, the logo is already white/light-ready and should not be
   * forced through the brightness invert used for coloured logos.
   */
  invertLogo?: boolean;
  /** Optional image path under /public — shown first on hover */
  image?: string;
  /** Extra images shown on hover/focus (cycled while the tile stays focused) */
  hoverImages?: string[];
  /**
   * Link to an Our Works case study when one exists.
   * Omit when there is no matching case study page yet.
   */
  href?: string;
  /** Solid CSS colour used behind the logo on the resting card */
  cardColor: string;
}

/** Maps case-study slugs to PORTFOLIO_WORKS ids when they differ. */
const CASE_STUDY_PORTFOLIO_IDS: Record<string, string> = {
  aquaphysio: "aquaphysio",
  "cedar-endocrine-clinic": "cedar-endocrine",
  "singapore-brain-spine-nerves": "sbsn",
  "singapore-dental-implant-centre": "sdic",
  "the-acne-clinic": "tac",
  "joyful-seeds": "joyful-seeds",
};

export interface PortfolioCaseIndex {
  index: number;
  total: number;
}

/**
 * Resolve CASE STUDY NN / TT from the client works shown on the site.
 * Returns null when the study is not in PORTFOLIO_WORKS.
 */
export function getPortfolioCaseIndex(
  studySlug: string,
  studyName?: string
): PortfolioCaseIndex | null {
  const total = PORTFOLIO_WORKS.length;
  if (total === 0) return null;

  const mappedId = CASE_STUDY_PORTFOLIO_IDS[studySlug] ?? studySlug;
  let idx = PORTFOLIO_WORKS.findIndex((work) => work.id === mappedId);

  if (idx < 0 && studyName) {
    const name = normalizeClinicKey(studyName);
    idx = PORTFOLIO_WORKS.findIndex((work) => {
      const title = normalizeClinicKey(work.title);
      return name.includes(title) || title.includes(name);
    });
  }

  if (idx < 0) return null;
  return { index: idx + 1, total };
}

export function formatPortfolioCaseLabel(
  studySlug: string,
  studyName?: string
): string | null {
  const resolved = getPortfolioCaseIndex(studySlug, studyName);
  if (!resolved) return null;
  const nn = String(resolved.index).padStart(2, "0");
  const tt = String(resolved.total).padStart(2, "0");
  return `Case Study ${nn} / ${tt}`;
}

/** Normalise clinic names for fuzzy matching across copy variants. */
export function normalizeClinicKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\b(clinic|centre|center|paediatrics|pediatrics)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const PORTFOLIO_WORKS: PortfolioWorkSlide[] = [
  {
    id: "aquaphysio",
    title: "AquaPhysio Rehab Centre",
    category: "Aquatic Physiotherapy",
    line: "The flow of healing.",
    logo: "/clients/square/aquaphysio-rehab-square.png",
    image: "/works/aquaphysio/aquaphysio-mockup.png",
    cardColor: "#18C4D9",
    href: "/clinic-specialties/aquatic-physio",
  },
  {
    id: "cedar-endocrine",
    title: "Cedar Endocrine Clinic",
    category: "Endocrinology",
    line: "Your Health Nurtured",
    logo: "/clients/square/cedar-square-white.png",
    invertLogo: false,
    image: "/works/cedar.png",
    cardColor: "#2EC4CE",
    href: "/clinic-specialties/endocrinology",
  },
  {
    id: "thsc",
    title: "The Heart Specialist Clinic",
    category: "Heart & Cardiology",
    line: "Trusted pathways for heart specialist care",
    logo: "/clients/the-heart-specialist-clinic.png",
    image: "/works/thsc.png",
    cardColor: "#0E8FA0",
  },
  {
    id: "msdc",
    title: "Medical and Surgical Dermatology Clinic",
    category: "Dermatology",
    line: "Clearer pathways for specialist skin care",
    logo: "/clients/square/msdc-square.png",
    image: "/works/msdc/msdc-paperbag.jpg",
    hoverImages: ["/works/msdc/msdc-namecard.png", "/works/msdc.png"],
    cardColor: "#3DB8C4",
    href: "/clinic-specialties/dermatology",
  },
  {
    id: "sdic",
    title: "Singapore Dental Implant Centre",
    category: "Dental + Implantology",
    line: "Implanting the foundation of a timeless smile.",
    logo: "/clients/square/sdic-square.png",
    image: "/works/sdic.png",
    cardColor: "#4DCFC9",
    href: "/clinic-specialties/dental",
  },
  {
    id: "joyful-seeds",
    title: "Joyful Seeds",
    category: "Paediatrics + Child Development",
    line: "Planting joy. Harvesting potential.",
    logo: "/clients/square/joyfulseed-square.png",
    image: "/works/joyfulseeds.png",
    cardColor: "#13A8BA",
    href: "/clinic-specialties/paediatrics",
  },
  {
    id: "sbsn",
    title: "Singapore Brain Spine Nerves Centre",
    category: "Brain & Spine",
    line: "Specialist clarity for complex care journeys",
    logo: "/clients/square/sbsn-square.png",
    image: "/works/sbsn.png",
    cardColor: "#78E2DD",
    href: "/clinic-specialties/neurology",
  },
  {
    id: "sunrise-heart",
    title: "Sunrise Heart Clinic",
    category: "Heart & Cardiology",
    line: "Trusted pathways for heart health discovery",
    logo: "/clients/square/sunrise-square.png",
    image: "/works/sunrise-heart.png",
    cardColor: "#1A8C99",
    href: "/clinic-specialties/cardiology",
  },
  {
    id: "tac",
    title: "The Acne Clinic",
    category: "Skin + Aesthetics",
    line: "Face it. Fix it.",
    logo: "/clients/the-acne-clinic.png",
    image: "/works/tac/tac.jpg",
    hoverImages: [
      "/works/tac.png",
      "/works/tac/paper-bag.jpg",
      "/works/tac/TAC-ads.jpg",
      "/works/tac/TAC-ads-ls.jpg",
      "/works/tac/TAC-mock.jpg",
      "/works/tac/TAC-posters.png",
    ],
    cardColor: "#33D0DD",
    href: "/clinic-specialties/acne",
  },
  {
    id: "straits-geriatrics",
    title: "The Straits Geriatrics Centre",
    category: "Geriatrics",
    line: "Clearer pathways for older adult care",
    logo: "/clients/square/straits-geriatrics-square.png",
    image: "/works/straits-geriatrics.png",
    cardColor: "#20B2C2",
  },
  {
    id: "cfac",
    title: "Clementi Family and Aesthetic Clinic",
    category: "Family Medicine + Aesthetics",
    line: "Clearer pathways for family and aesthetic care",
    logo: "/clients/square/cfac-square.png",
    image: "/works/cfac.png",
    cardColor: "#45C4C8",
  },
];

export const PORTFOLIO_FILTER_ALL = "All our projects" as const;

export const PORTFOLIO_CATEGORIES: string[] = Array.from(
  new Set(PORTFOLIO_WORKS.map((work) => work.category))
);

export type PortfolioFilter = typeof PORTFOLIO_FILTER_ALL | string;
