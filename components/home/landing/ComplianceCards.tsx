"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COMPLIANCE_CARDS } from "@/lib/data/compliance-cards";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export function ComplianceCards(_props: { tone?: "light" | "dark" } = {}) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3"
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
          className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E6EEF1] bg-white text-left shadow-card"
        >
          <div className="flex items-center justify-center bg-genie-50 px-5 pt-6 sm:px-6 sm:pt-7">
            <Image
              src={card.image}
              alt={card.alt}
              width={134}
              height={134}
              className="h-28 w-28 shrink-0 object-contain sm:h-[8.4rem] sm:w-[8.4rem]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 px-5 py-6 sm:gap-2 sm:px-6 sm:py-7">
            <h3 className="font-display text-sm font-semibold leading-snug text-ink-900 sm:text-xs">
              {card.title}
            </h3>
            <p
              className={cn(
                "text-xs leading-relaxed text-pretty text-ink-700 sm:text-[0.6875rem]"
              )}
            >
              {card.body}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
