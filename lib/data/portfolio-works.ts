export interface PortfolioWorkSlide {
  id: string;
  title: string;
  category: string;
  /** Optional image path under /public — falls back to gradient when omitted */
  image?: string;
  /** Optional link — omit until case study pages exist */
  href?: string;
  /** CSS gradient used when `image` is not set */
  gradient: string;
}

export const PORTFOLIO_WORKS: PortfolioWorkSlide[] = [
  {
    id: "artisan-cafe",
    title: "Artisan Café",
    category: "Hospitality",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #EAFBFB 45%, #54B9CE 100%)",
  },
  {
    id: "strategy-consultancy",
    title: "Strategy Consultancy",
    category: "Professional services",
    gradient: "linear-gradient(145deg, #F3F5F6 0%, #C9E4EA 50%, #217B8E 100%)",
  },
  {
    id: "wellness-studio",
    title: "Wellness Studio",
    category: "Lifestyle",
    gradient: "linear-gradient(145deg, #FFF8F0 0%, #FFE8D6 40%, #E8A87C 100%)",
  },
  {
    id: "retail-brand",
    title: "Retail Brand",
    category: "Consumer",
    gradient: "linear-gradient(145deg, #F7FAFB 0%, #D8EEF5 50%, #3A8093 100%)",
  },
  {
    id: "creative-agency",
    title: "Creative Agency",
    category: "B2B",
    gradient: "linear-gradient(145deg, #F0F4F8 0%, #B8D4E3 45%, #26626F 100%)",
  },
  {
    id: "boutique-hotel",
    title: "Boutique Hotel",
    category: "Hospitality",
    gradient: "linear-gradient(145deg, #FAFBFC 0%, #E3F6FA 50%, #006B7C 100%)",
  },
];
