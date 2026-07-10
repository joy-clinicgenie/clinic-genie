"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MEET_US_BEHIND_THE_WORK } from "@/lib/data/meet-us";
import { ease } from "@/lib/motion";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.glide },
  },
};

export function BehindTheWorkCards() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.1 } },
      }}
    >
      {MEET_US_BEHIND_THE_WORK.blocks.map((block) => (
        <motion.article
          key={block.title}
          variants={cardVariants}
          className="flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-[#E6EEF1] bg-white px-5 py-6 shadow-card sm:px-6 sm:py-7"
        >
          <h3 className="font-display text-base font-semibold text-ink-900">{block.title}</h3>
          <p className="text-sm leading-relaxed text-pretty text-[#7E8C92]">{block.body}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}
