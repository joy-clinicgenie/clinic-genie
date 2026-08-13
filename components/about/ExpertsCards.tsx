"use client";

import {
  Compass,
  Megaphone,
  Palette,
  PencilRuler,
  Search,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_EXPERT_ROLES } from "@/lib/data/about";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import styles from "./ExpertsCards.module.css";

const ROLE_ICONS: Record<string, LucideIcon> = {
  "Growth Strategists": Compass,
  "SEO Specialists": Search,
  "Campaign Experts": Megaphone,
  "Creative Makers": Palette,
  "Tech Builders": PencilRuler,
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.glide },
  },
};

const TAGLINE =
  "Different crafts, one growth engine. Every wish backed by the right specialist skill.";

const taglineVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.glide, delay: 0.25 },
  },
};

export function ExpertsCards() {
  const reduced = useReducedMotion();

  return (
    <motion.ul
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.06 } },
      }}
    >
      {ABOUT_EXPERT_ROLES.map((role) => {
        const Icon = ROLE_ICONS[role.title] ?? PencilRuler;

        return (
          <motion.li key={role.title} variants={cardVariants} className="h-full min-w-0">
            <article
              className={cn(
                "glass relative grid h-full min-h-64 w-full grid-cols-1 overflow-hidden rounded-2xl",
                "grid-rows-[4rem_3rem_1fr] gap-3 px-6 py-6 transition-shadow duration-ui",
                "hover:shadow-glow-sm sm:min-h-72 sm:grid-rows-[4.5rem_3.25rem_1fr] sm:gap-4 sm:px-7 sm:py-7"
              )}
            >
              <h3 className="line-clamp-3 w-full font-display text-[20px] font-semibold leading-snug tracking-tight text-onDark lg:text-lg">
                {role.title}
              </h3>

              <div className="flex w-full items-center">
                <Icon
                  className="h-7 w-7 shrink-0 text-onDark/80 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              <p className="line-clamp-4 w-full self-end text-body leading-relaxed text-onDark-muted">
                {role.body}
              </p>
            </article>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export function ExpertsTagline() {
  const reduced = useReducedMotion();

  return (
    <motion.p
      className={cn(
        "relative z-0 text-center font-display text-h6 font-regular italic leading-snug text-genie-300",
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
