"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { useOrbStore } from "@/components/orb/store";
import { CASE_STUDIES, WORK_FILTERS, type WorkTag } from "@/lib/data/portfolio";
import { CaseCard } from "./CaseCard";

type Filter = (typeof WORK_FILTERS)[number];

export function FilterGrid() {
  const [active, setActive] = useState<Filter>("All");
  const pulse = useOrbStore((s) => s.pulse);

  const visible = useMemo(() => {
    if (active === "All") return CASE_STUDIES;
    return CASE_STUDIES.filter((c) => c.tags.includes(active as WorkTag));
  }, [active]);

  function selectFilter(filter: Filter) {
    if (filter === active) return;
    setActive(filter);
    // sparkle-wipe reaction from the companion orb on every re-sort
    pulse();
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter works by service">
        {WORK_FILTERS.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => selectFilter(filter)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-pill px-4 py-2 font-sans text-sm font-medium transition-colors duration-ui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-400/60",
                isActive ? "text-white" : "text-onDark-muted hover:text-onDark"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  aria-hidden="true"
                  className="btn-cta absolute inset-0 rounded-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((study) => (
            <motion.div
              key={study.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: ease.glide }}
              className="h-full"
            >
              <CaseCard study={study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "work" : "works"}
        {active !== "All" ? ` filtered by ${active}` : ""}.
      </p>
    </div>
  );
}
