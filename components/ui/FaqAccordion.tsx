"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useOrbStore } from "@/components/orb/store";
import type { Faq } from "@/lib/data/faqs";

export function FaqAccordion({
  items,
  tone = "dark",
}: {
  items: Faq[];
  tone?: "dark" | "light";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const pulse = useOrbStore((s) => s.pulse);
  const light = tone === "light";

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-trigger-${i}`;
        return (
          <div
            key={i}
            className={cn(
              "overflow-hidden rounded-2xl",
              light
                ? cn(
                    "border border-[#E6EEF1] bg-white shadow-card",
                    isOpen && "shadow-lg"
                  )
                : cn("glass", isOpen && "shadow-glow-sm")
            )}
          >
            <button
              id={btnId}
              type="button"
              onClick={() => {
                setOpen(isOpen ? null : i);
                if (!isOpen) pulse();
              }}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span
                className={cn(
                  "font-display text-base font-semibold",
                  light ? "text-ink-900" : "text-onDark"
                )}
              >
                {item.q}
              </span>
              <motion.span
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full",
                  light ? "bg-genie-100 text-genie-700" : "bg-genie-500/15 text-genie-300"
                )}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "px-5 pb-5 text-sm leading-relaxed",
                      light ? "text-ink-700" : "text-onDark-muted"
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
