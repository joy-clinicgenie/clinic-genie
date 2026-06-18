export interface PortfolioWorkSlide {
  id: string;
  title: string;
  category: string;
  /** Optional image path under /public — falls back to gradient when omitted */
  image?: string;
  /** Link to an Our Works case study or the portfolio gallery */
  href?: string;
  /** CSS gradient used when `image` is not set */
  gradient: string;
}

export const PORTFOLIO_WORKS: PortfolioWorkSlide[] = [
  {
    id: "cedar-endocrine",
    title: "Cedar Endocrine Clinic",
    category: "Endocrinology",
    image: "/works/cedar.png",
    href: "/portfolio/stellaris-fertility",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #EAFBFB 45%, #54B9CE 100%)",
  },
  {
    id: "msdc",
    title: "Medical & Surgical Dermatology",
    category: "Dermatology",
    image: "/works/msdc.png",
    href: "/portfolio/the-aesthetics-clinic",
    gradient: "linear-gradient(145deg, #F3F5F6 0%, #C9E4EA 50%, #217B8E 100%)",
  },
  {
    id: "joyful-seeds",
    title: "Joyful Seeds",
    category: "Paediatrics",
    image: "/works/joyfulseeds.png",
    href: "/portfolio/the-acne-clinic",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #EAFBFB 50%, #78E2DD 100%)",
  },
  {
    id: "sbsn",
    title: "SBSN",
    category: "Breast surgery",
    image: "/works/sbsn.png",
    href: "/portfolio/orchard-orthopaedics",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #D8EEF5 50%, #3A8093 100%)",
  },
  {
    id: "sunrise-heart",
    title: "Sunrise Heart Clinic",
    category: "Cardiology",
    image: "/works/sunriseheart.png",
    href: "/portfolio/lumiere-dental",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #EAFBFB 45%, #54B9CE 100%)",
  },
  {
    id: "straits-eye",
    title: "Straits Eye Centre",
    category: "Ophthalmology",
    href: "/portfolio",
    gradient: "linear-gradient(145deg, #FAFBFC 0%, #E3F6FA 50%, #006B7C 100%)",
  },
];
