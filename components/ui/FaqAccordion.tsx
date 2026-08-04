"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useOrbStore } from "@/components/orb/store";
import type { Faq } from "@/lib/data/faqs";

function FaqToggleIcon({ open, light }: { open: boolean; light: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-ui",
        light
          ? open
            ? "border-genie-100 bg-genie-10 text-genie-700"
            : "border-hairline-light bg-cg-mist text-ink-700"
          : "border-white/20 bg-genie-500/15 text-genie-300"
      )}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        {!open ? (
          <path d="M7 1v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        ) : null}
      </svg>
    </span>
  );
}

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
    <div className={cn("flex flex-col", light ? "gap-3" : "gap-2")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-trigger-${i}`;

        return (
          <div
            key={i}
            className={cn(
              "overflow-hidden rounded-2xl transition-[background-color,box-shadow,border-color] duration-ui",
              light
                ? cn(
                    "border bg-white shadow-xs",
                    isOpen
                      ? "border-genie-100 shadow-sm"
                      : "border-hairline-light hover:border-genie-40"
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
              className={cn(
                "flex w-full items-start gap-4 px-5 py-5 text-left transition-colors duration-ui",
                !light && "items-center justify-between"
              )}
            >
              {light ? <FaqToggleIcon open={isOpen} light /> : null}

              <span
                className={cn(
                  "min-w-0 flex-1 font-display text-base font-semibold leading-snug",
                  light ? "text-ink-900" : "text-onDark"
                )}
              >
                {item.q}
              </span>

              {!light ? (
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-genie-500/15 text-genie-300"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </motion.span>
              ) : null}
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
                      "text-sm leading-relaxed",
                      light
                        ? "border-t border-hairline-light bg-cg-mist px-5 py-4 pl-[3.75rem] text-ink-700"
                        : "px-5 pb-5 text-onDark-muted"
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
