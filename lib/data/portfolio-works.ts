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
    id: "straits-eye",
    title: "Straits Eye Geriatrics",
    category: "Ophthalmology",
    line: "Vision care made clearer for patients and families",
    image: "/works/straits-eye.png",
    gradient: "linear-gradient(145deg, #FAFBFC 0%, #E3F6FA 50%, #006B7C 100%)",
  },
];
