import type { Transition, Variants } from "framer-motion";

/** Motion tokens — one grammar for the whole site. */
export const ease = {
  glide: [0.22, 1, 0.36, 1] as [number, number, number, number],
  outSoft: [0.16, 1, 0.3, 1] as [number, number, number, number],
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  spring: { type: "spring", stiffness: 260, damping: 24 } as Transition,
  springSoft: { type: "spring", stiffness: 150, damping: 20 } as Transition,
};

export const dur = {
  fast: 0.18,
  base: 0.4,
  slow: 0.8,
};

/** Standard reveal variants (up / scale / mask). */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.glide } },
};

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: ease.glide } },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.glide } },
};

/** Color pulses always travel #6CBAD9 -> #BFE0EE */
export const PULSE_FROM = "#6CBAD9";
export const PULSE_TO = "#BFE0EE";
