"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_EXPERT_ROLES } from "@/lib/data/about";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import styles from "./ExpertsCards.module.css";

const TRACKER_COUNT = 25;

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: ease.glide },
  },
};

const TAGLINE =
  "Different crafts, one growth engine. Every wish backed by the right specialist skill.";

const taglineVariants = {
  hidden: { opacity: 0, y: -80, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: ease.glide, delay: 1 },
  },
};

export function ExpertsCards() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.1 } },
      }}
    >
      {ABOUT_EXPERT_ROLES.map((role) => (
        <motion.div key={role.title} variants={cardVariants} className="h-full">
          <div className={styles.container}>
            <div className={styles.canvas}>
              {Array.from({ length: TRACKER_COUNT }, (_, index) => (
                <div
                  key={index}
                  className={styles.tracker}
                  aria-hidden="true"
                />
              ))}
              <article className={styles.card} tabIndex={0}>
                <p className={cn(styles.prompt, "font-display")} aria-hidden="true">
                  Hover to reveal
                </p>
                <h3 className={cn(styles.title, "font-display")}>{role.title}</h3>
                <p className={styles.body}>{role.body}</p>
              </article>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ExpertsTagline() {
  const reduced = useReducedMotion();

  return (
    <motion.p
      className={cn(
        "relative z-0 text-center font-display text-h6 font-regular italic leading-snug text-[#9FDCE8]",
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
