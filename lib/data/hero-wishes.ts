/** Decorative wish phrases shown inside the hero glass orb. */
export const HERO_WISHES = [
  { text: "More Patients", dwellMs: 4000 },
  { text: "Higher Rankings", dwellMs: 4000 },
  { text: "More Enquiries", dwellMs: 4000 },
  { text: "A Better Website", dwellMs: 4000 },
  { text: "A Stronger Brand", dwellMs: 4000 },
] as const;

export type HeroWishEntry = (typeof HERO_WISHES)[number];
export type HeroWish = HeroWishEntry["text"];
