"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ALLIES } from "@/lib/data/allies";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import styles from "./AlliesCards.module.css";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    boxShadow: "0 0 0 rgba(84, 185, 206, 0)",
  },
  show: {
    opacity: 1,
    y: 0,
    boxShadow: "0 0 0 1px rgba(120, 226, 221, 0.12), 0 0 28px rgba(84, 185, 206, 0.22)",
    transition: { duration: 0.65, ease: ease.glide },
  },
};

const shineVariants = {
  hidden: { x: "-120%", opacity: 0 },
  show: {
    x: "120%",
    opacity: [0, 0.9, 0],
    transition: { duration: 0.75, ease: ease.glide, delay: 0.06 },
  },
};

export function AlliesCards() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.1 } },
      }}
    >
      {ALLIES.map((ally) => (
        <motion.div
          key={ally.name}
          variants={cardVariants}
          className="glass group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-5 transition-shadow duration-ui hover:shadow-glow-md sm:p-8"
        >
          {!reduced && (
            <motion.span aria-hidden="true" className={styles.shine} variants={shineVariants} />
          )}

          <div className="relative z-[2] flex h-12 items-center">
            <Image
              src={ally.image}
              alt={ally.name}
              width={ally.imageWidth ?? 160}
              height={ally.imageHeight ?? 48}
              className={cn(
                "h-9 w-auto max-w-[180px] object-contain object-left sm:h-10",
                ally.logoWhite !== false && "brightness-0 invert opacity-90"
              )}
              sizes="180px"
            />
          </div>
          <h3 className="relative z-[2] font-display text-base font-semibold text-white">{ally.name}</h3>
          <p className="relative z-[2] text-sm leading-relaxed text-[#C9E4EA]">{ally.body}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

const TAGLINE =
  "Stronger partners. Better support. Clearer growth for your clinic.";

const taglineVariants = {
  hidden: { opacity: 0, y: -80, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: ease.glide, delay: 1 },
  },
};

export function AlliesTagline() {
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
