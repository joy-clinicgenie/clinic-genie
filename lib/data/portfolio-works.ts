export interface PortfolioWorkSlide {
  id: string;
  title: string;
  category: string;
  /** One-line project caption shown under the gallery image on hover/focus */
  line: string;
  /** Optional image path under /public — falls back to gradient when omitted */
  image?: string;
  /**
   * Link to an Our Works case study when one exists.
   * Omit when there is no matching case study page yet.
   */
  href?: string;
  /** CSS gradient used when `image` is not set */
  gradient: string;
}

/** Maps case-study slugs to PORTFOLIO_WORKS ids when they differ. */
const CASE_STUDY_PORTFOLIO_IDS: Record<string, string> = {
  "cedar-endocrine-clinic": "cedar-endocrine",
  "singapore-brain-spine-nerves": "sbsn",
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
    const name = studyName.toLowerCase();
    idx = PORTFOLIO_WORKS.findIndex((work) => {
      const title = work.title.toLowerCase();
      return name.includes(title) || title.includes(name.split(" clinic")[0] ?? name);
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

export const PORTFOLIO_WORKS: PortfolioWorkSlide[] = [
  {
    id: "cedar-endocrine",
    title: "Cedar Endocrine Clinic",
    category: "Endocrinology",
    line: "Your Health Nurtured",
    image: "/works/cedar.png",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #EAFBFB 45%, #54B9CE 100%)",
  },
  {
    id: "msdc",
    title: "Medical & Surgical Dermatology",
    category: "Dermatology",
    line: "Clearer pathways for specialist skin care",
    image: "/works/msdc.png",
    gradient: "linear-gradient(145deg, #F3F5F6 0%, #C9E4EA 50%, #217B8E 100%)",
  },
  {
    id: "joyful-seeds",
    title: "Joyful Seeds",
    category: "Paediatrics + Child Development",
    line: "Planting joy. Harvesting potential.",
    image: "/works/joyfulseeds.png",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #EAFBFB 50%, #78E2DD 100%)",
    href: "/specialty-hub/paediatrics",
  },
  {
    id: "sbsn",
    title: "Singapore Brain & Spine Nerves Centre",
    category: "Brain & Spine",
    line: "Specialist clarity for complex care journeys",
    image: "/works/sbsn.png",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #D8EEF5 50%, #3A8093 100%)",
  },
  {
    id: "sunrise-heart",
    title: "Sunrise Heart Clinic",
    category: "Heart & Cardiology",
    line: "Trusted pathways for heart health discovery",
    image: "/works/sunrise-heart.png",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #EAFBFB 45%, #54B9CE 100%)",
  },
  {
    id: "straits-geriatrics",
    title: "The Straits Geriatrics Centre",
    category: "Geriatrics",
    line: "Vision care made clearer for patients and families",
    image: "/works/straits-eye.png",
    gradient: "linear-gradient(145deg, #FAFBFC 0%, #E3F6FA 50%, #006B7C 100%)",
  },
];
