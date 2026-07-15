"use client";

import { motion } from "framer-motion";
import { COMPLIANCE_CARDS } from "@/lib/data/compliance-cards";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { ease } from "@/lib/motion";

export function ComplianceCards(_props: { tone?: "light" | "dark" } = {}) {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 px-[var(--page-pad)]">
      <motion.div
        className="mx-auto grid w-full max-w-[96rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {COMPLIANCE_CARDS.map((card) => (
          <motion.div
            key={card.title}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.6, ease: ease.glide } },
            }}
            className="flex h-full min-w-0"
          >
            <FeatureInfoCard
              title={card.title}
              body={card.body}
              image={card.image}
              alt={card.alt}
              compact
              className="h-full min-h-0"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
