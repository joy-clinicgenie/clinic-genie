"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type WishEntry = {
  /** Shown above the rotating lines. Includes trailing "a" when needed. */
  prefix: string;
  lines: readonly [string, string];
};

/**
 * Each wish is exactly two display lines.
 * Phrases that start with "A" keep that word in the prefix instead.
 */
export const ORB_WISHES: readonly WishEntry[] = [
  { prefix: "I Wish for...", lines: ["More", "Patients"] },
  { prefix: "I Wish for...", lines: ["Higher", "Rankings"] },
  { prefix: "I Wish for...", lines: ["More", "Enquiries"] },
  { prefix: "I Wish for a...", lines: ["Better", "Website"] },
  { prefix: "I Wish for a...", lines: ["Stronger", "Brand"] },
] as const;

/** @deprecated Prefer ORB_WISHES. Kept for any older imports. */
export const ORB_WISH_SUFFIXES = ORB_WISHES.map((wish) => wish.lines);

const LINE1_LONGEST = ORB_WISHES.reduce(
  (longest, { lines }) =>
    lines[0].length > longest.length ? lines[0] : longest,
  ORB_WISHES[0].lines[0]
);
const LINE2_LONGEST = ORB_WISHES.reduce(
  (longest, { lines }) =>
    lines[1].length > longest.length ? lines[1] : longest,
  ORB_WISHES[0].lines[1]
);

const DWELL_MS = 3200;

export interface OrbWishDecryptProps {
  className?: string;
}

/**
 * Soft crossfade between two-line wish phrases under a static “I wish for” prefix.
 */
export function OrbWishDecrypt({ className }: OrbWishDecryptProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  const activeWish = ORB_WISHES[index];
  const fullWish = `${activeWish.prefix} ${activeWish.lines[0]} ${activeWish.lines[1]}`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % ORB_WISHES.length);
    }, DWELL_MS);

    return () => window.clearTimeout(timer);
  }, [index]);

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="relative flex h-6 items-center justify-center sm:h-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={activeWish.prefix}
            className="font-display text-sm font-medium tracking-wide text-ink-700 sm:text-base"
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: ease.glide }}
          >
            {activeWish.prefix}
          </motion.p>
        </AnimatePresence>
      </div>

      <p
        className="relative mt-1 w-full max-w-full font-display text-[clamp(1.85rem,10.5vw,2.25rem)] font-extrabold leading-[0.95] tracking-tight text-genie-800 sm:text-[clamp(2.15rem,6.5vw,2.75rem)] lg:text-[clamp(2.4rem,4.2vw,3.25rem)]"
        aria-hidden="true"
      >
        <span className="invisible block" aria-hidden="true">
          <span className="block whitespace-nowrap">{LINE1_LONGEST}</span>
          <span className="block whitespace-nowrap">{LINE2_LONGEST}</span>
        </span>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: ease.glide }}
          >
            <span className="block whitespace-nowrap">
              {activeWish.lines[0]}
            </span>
            <span className="block whitespace-nowrap">
              {activeWish.lines[1]}
            </span>
          </motion.span>
        </AnimatePresence>
      </p>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {fullWish}
      </p>
    </div>
  );
}

export default OrbWishDecrypt;
