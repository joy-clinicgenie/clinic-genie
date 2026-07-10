/** Decorative wish phrases shown inside the hero glass orb. */
export const HERO_WISHES = [
  { text: "I wish more patients could find us on Google…", dwellMs: 4000 },
  { text: "I wish our website looked as premium as our clinic…", dwellMs: 4000 },
  { text: "I wish bookings came in while we sleep…", dwellMs: 4000 },
  { text: "I wish we ranked #1 for ‘aesthetic clinic Singapore’…", dwellMs: 4000 },
  { text: "I wish our reviews turned into new patients…", dwellMs: 4000 },
] as const;

export type HeroWishEntry = (typeof HERO_WISHES)[number];
export type HeroWish = HeroWishEntry["text"];
