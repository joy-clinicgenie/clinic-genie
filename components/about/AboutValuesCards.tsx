"use client";

import { motion } from "framer-motion";
import { ABOUT_VALUES } from "@/lib/data/about";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { ease } from "@/lib/motion";

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
            titleAs="h6"
            className="h-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
