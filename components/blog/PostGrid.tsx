"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";
import { useOrbStore } from "@/components/orb/store";
import { POSTS, POST_CATEGORIES, type PostCategory } from "@/lib/data/posts";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Filter = "All" | PostCategory;

const FILTERS: Filter[] = ["All", ...POST_CATEGORIES];

/**
 * Category filter chips + a FLIP re-flow grid of PostCards. On every filter
 * change the orb "sorts" with a one-shot pulse while the cards re-flow.
 */
export function PostGrid() {
  const [active, setActive] = useState<Filter>("All");
  const pulse = useOrbStore((s) => s.pulse);

  const posts = useMemo(
    () => (active === "All" ? POSTS : POSTS.filter((p) => p.category === active)),
    [active]
  );

  function selectFilter(filter: Filter) {
    if (filter === active) return;
    setActive(filter);
    pulse();
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Filter chips */}
      <div role="group" aria-label="Filter Genie Tips by category" className="flex flex-wrap justify-center gap-2.5">
        {FILTERS.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectFilter(filter)}
              className={cn(
                "relative rounded-pill px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-ui ease-out-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/40",
                isActive ? "text-white" : "text-ink-500 hover:text-genie-700"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="btn-cta absolute inset-0 rounded-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          );
        })}
      </div>

      {/* Re-flow grid */}
      <LayoutGroup>
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: ease.glide }}
                className="h-full"
              >
                <PostCard post={post} tone="light" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <p className="text-center text-sm text-ink-500" aria-live="polite">
        {active === "All"
          ? `Showing all ${posts.length} Genie Tips.`
          : `Showing ${posts.length} ${posts.length === 1 ? "tip" : "tips"} in ${active}.`}
      </p>
    </div>
  );
}
