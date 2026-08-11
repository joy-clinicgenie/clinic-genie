"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useOrbStore } from "@/components/orb/store";
import type { Faq } from "@/lib/data/faqs";

export type FaqItem = Faq & {
  link?: { label: string; href: string };
};

function FaqToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-900 text-white transition-colors duration-ui",
        "group-hover:bg-cg-teal-80 group-focus-visible:bg-cg-teal-80"
      )}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        {!open ? (
          <path d="M7 2v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        ) : null}
      </svg>
    </span>
  );
}

export function FaqAccordion({
  items,
  className,
  idPrefix,
}: {
  items: FaqItem[];
  className?: string;
  /** Optional prefix so multiple FAQ blocks on one page keep unique ids. */
  idPrefix?: string;
}) {
  const reactId = useId();
  const prefix = idPrefix ?? reactId;
  const [open, setOpen] = useState<number | null>(0);
  const pulse = useOrbStore((s) => s.pulse);
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("grid gap-4 sm:gap-5 md:grid-cols-2", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${prefix}-panel-${i}`;
        const btnId = `${prefix}-trigger-${i}`;

        return (
          <div
            key={`${item.q}-${i}`}
            className={cn(
              "flex h-fit flex-col overflow-hidden rounded-2xl bg-white shadow-xs transition-shadow duration-ui",
              isOpen && "shadow-sm"
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
              className="group flex w-full items-start gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-100 focus-visible:ring-inset sm:px-6 sm:py-6"
            >
              <span className="min-w-0 flex-1 font-display text-[1.25rem] font-semibold leading-snug text-ink-900">
                {item.q}
              </span>
              <FaqToggleIcon open={isOpen} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-3 px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                    <p className="text-sm leading-relaxed text-ink-700 sm:text-base">{item.a}</p>
                    {item.link ? (
                      <Link
                        href={item.link.href}
                        className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-genie-700 transition-colors hover:text-genie-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-100 focus-visible:ring-offset-2"
                      >
                        {item.link.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
