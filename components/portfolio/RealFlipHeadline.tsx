"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const WORDS = ["clinics", "rankings", "bookings"] as const;
const INTERVAL_MS = 2800;
const ACCESSIBLE_TITLE = "Real clinics. Real rankings. Real bookings";

export function RealFlipHeadline({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % WORDS.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const word = WORDS[index];

  if (reduceMotion) {
    return (
      <span
        className={cn("inline-flex items-baseline justify-center gap-x-[0.28em]", className)}
        aria-label={ACCESSIBLE_TITLE}
      >
        <span aria-hidden="true" className="text-right">
          Real
        </span>
        <span aria-hidden="true" className="genie-text text-left">
          clinics
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-baseline justify-center gap-x-[0.28em]", className)}
    >
      <span className="sr-only">{ACCESSIBLE_TITLE}</span>
      <span aria-hidden="true" className="text-right">
        Real
      </span>
      <span
        aria-hidden="true"
        className="relative inline-grid justify-items-start overflow-hidden pb-[0.18em] text-left align-baseline"
      >
        {WORDS.map((placeholder) => (
          <span
            key={placeholder}
            className="invisible col-start-1 row-start-1 whitespace-nowrap"
          >
            {placeholder}
          </span>
        ))}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            className="genie-text col-start-1 row-start-1 inline-block whitespace-nowrap text-left"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: ease.glide }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
