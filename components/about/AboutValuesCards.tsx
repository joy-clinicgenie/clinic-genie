"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_VALUES } from "@/lib/data/about";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import styles from "./AboutValuesCards.module.css";

export function AboutValuesCards(_props: { tone?: "light" | "dark" } = {}) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {ABOUT_VALUES.map((value) => (
        <motion.div
          key={value.title}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.6, ease: ease.glide } },
          }}
          className="flex h-full min-w-0"
        >
          <FeatureInfoCard
            title={value.title}
            body={value.body}
            image={value.image}
            alt={value.alt}
            compact
            className="h-full min-h-0"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

const TAGLINE =
  "Ethical in practice. Emotional in craft. Logical in strategy. That is the magic.";

const taglineVariants = {
  hidden: { opacity: 0, y: -80, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: ease.glide, delay: 1 },
  },
};

export function AboutValuesTagline() {
  const reduced = useReducedMotion();

  return (
    <motion.p
      className={cn(
        "relative z-0 text-center font-display text-h6 font-regular italic leading-snug text-[#3A8093]",
        styles.tagline
      )}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={
        reduced
          ? {
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.4 } },
            }
          : taglineVariants
      }
    >
      {TAGLINE}
    </motion.p>
  );
}
