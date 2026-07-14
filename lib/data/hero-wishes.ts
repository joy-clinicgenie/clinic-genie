/** Decorative wish phrases shown inside the hero glass orb. */
export const HERO_WISHES = [
  { text: "I wish our ads stopped chasing the wrong patients…", dwellMs: 4000 },
  { text: "I wish our phone rang before the clinic down the road…", dwellMs: 4000 },
  { text: "I wish our Instagram turned into a waiting list…", dwellMs: 4000 },
  { text: "I wish our empty slots filled while we slept…", dwellMs: 4000 },
  { text: "I wish our doctor's name came up first in search…", dwellMs: 4000 },
  { text: "I wish enquiries never went cold overnight…", dwellMs: 4000 },
  { text: "I wish our content worked as hard as we do…", dwellMs: 4000 },
  { text: "I wish Google sent us patients, not just our GPs…", dwellMs: 4000 },
  { text: "I wish our website felt as trusted as our care…", dwellMs: 4000 },
  { text: "I wish marketing followed the rules, quietly…", dwellMs: 4000 },
] as const;

export type HeroWishEntry = (typeof HERO_WISHES)[number];
export type HeroWish = HeroWishEntry["text"];
