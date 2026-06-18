"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COMPLIANCE_CARDS } from "@/lib/data/compliance-cards";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export function ComplianceCards({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <motion.div
      className="grid grid-cols-5 gap-2 sm:gap-3"
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
          className={cn(
            "flex h-full min-w-0 flex-col items-center rounded-xl px-2 py-4 text-center sm:rounded-2xl sm:px-3 sm:py-5",
            isDark ? "glass" : "glass-light"
          )}
        >
          <Image
            src={card.image}
            alt={card.alt}
            width={48}
            height={48}
            className="mb-2 h-8 w-8 shrink-0 object-contain sm:mb-3 sm:h-10 sm:w-10"
          />
          <h3
            className={cn(
              "font-display text-[0.6875rem] font-semibold leading-snug sm:text-xs",
              isDark ? "text-white" : "text-ink-900"
            )}
          >
            {card.title}
          </h3>
          <p
            className={cn(
              "mt-1.5 text-[0.625rem] leading-snug text-pretty sm:mt-2 sm:text-[0.6875rem] sm:leading-relaxed",
              isDark ? "text-[#C9E4EA]" : "text-[#7E8C92]"
            )}
          >
            {card.body}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
