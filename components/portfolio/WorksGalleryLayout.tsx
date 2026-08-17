"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_FILTER_ALL,
  PORTFOLIO_WORKS,
  type PortfolioFilter,
} from "@/lib/data/portfolio-works";
import { RealFlipHeadline } from "./RealFlipHeadline";
import { WorkGalleryItem } from "./WorkGalleryItem";
import styles from "./WorksGalleryLayout.module.css";

const FILTER_LABELS: Record<string, string> = {
  [PORTFOLIO_FILTER_ALL]: "All our projects",
  "Aquatic Physiotherapy": "Aquatic Physio",
  Endocrinology: "Endocrinology",
  "Heart & Cardiology": "Cardiology",
  Dermatology: "Dermatology",
  "Dental + Implantology": "Dental",
  "Paediatrics + Child Development": "Paediatrics",
  "Brain & Spine": "Neurology",
  "Skin + Aesthetics": "Aesthetics",
  Geriatrics: "Geriatrics",
  "Family Medicine + Aesthetics": "Family Medicine",
};

const FILTERS: PortfolioFilter[] = [PORTFOLIO_FILTER_ALL, ...PORTFOLIO_CATEGORIES];

export function WorksGalleryLayout() {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>(
    PORTFOLIO_FILTER_ALL
  );
  const reduceMotion = useReducedMotion();

  const visibleWorks = useMemo(() => {
    if (activeFilter === PORTFOLIO_FILTER_ALL) return PORTFOLIO_WORKS;
    return PORTFOLIO_WORKS.filter((work) => work.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      data-nav-theme="light"
      aria-labelledby="our-works-heading"
      className="relative overflow-hidden bg-white text-ink-900"
    >
      <div aria-hidden="true" className={styles.mesh} />

      <Container
        size="wide"
        className="relative z-10 flex flex-col items-center gap-12 pb-20 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:gap-14 sm:pb-24 lg:gap-16 lg:pt-[calc(8rem+env(safe-area-inset-top,0px))]"
      >
        <header className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h1
            id="our-works-heading"
            className={cn("font-display text-ink-900", styles.heroTitle)}
          >
            <RealFlipHeadline />
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-ink-500 sm:text-lead">
            A look at the brands, websites and campaigns we&apos;ve conjured for
            specialist clinics across Singapore, and the results that followed.
          </p>
        </header>

        <div
          role="group"
          aria-label="Filter works by specialty"
          className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-2"
        >
          <LayoutGroup>
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "relative rounded-pill px-4 py-2 font-sans text-xs font-semibold tracking-wide transition-colors duration-ui ease-out-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/40 sm:text-sm",
                    isActive
                      ? "text-white"
                      : "border border-ink-900/20 bg-white/80 text-ink-900 backdrop-blur-sm hover:border-ink-900/40 hover:bg-white"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="portfolio-filter-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-pill bg-ink-900"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">
                    {FILTER_LABELS[filter] ?? filter}
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>

        <div className="w-full">
          <motion.ul
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {visibleWorks.map((work, index) => (
                <motion.li
                  key={work.id}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: ease.glide }}
                >
                  <WorkGalleryItem work={work} index={index} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <p aria-live="polite" className="sr-only">
            Showing {visibleWorks.length}{" "}
            {visibleWorks.length === 1 ? "project" : "projects"}
            {activeFilter !== PORTFOLIO_FILTER_ALL
              ? ` in ${FILTER_LABELS[activeFilter] ?? activeFilter}`
              : ""}
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
