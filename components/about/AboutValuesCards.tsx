"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_VALUES } from "@/lib/data/about";
import cardStyles from "@/components/ui/GenieFeatureCards.module.css";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export function AboutValuesCards(_props: { tone?: "light" | "dark" } = {}) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3"
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
          className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E6EEF1] bg-white text-left shadow-card"
        >
          <div className="flex items-center justify-center bg-genie-50 px-5 pt-6 sm:px-6 sm:pt-7">
            <Image
              src={value.image}
              alt={value.alt}
              width={120}
              height={120}
              className="h-28 w-28 shrink-0 object-contain sm:h-[6.4rem] sm:w-[6.4rem]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 px-5 py-6 sm:gap-2 sm:px-6 sm:py-7">
            <h6 className="font-display text-h6 text-ink-900">{value.title}</h6>
            <p className={cn(cardStyles.cardBody, "w-full text-ink-700")}>{value.body}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
