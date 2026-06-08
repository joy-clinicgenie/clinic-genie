"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { OrbVisual } from "@/components/home/OrbVisual";
import { CTAButton } from "@/components/home/CTAButton";
import { useOrbStore } from "@/components/orb/store";
import { ease } from "@/lib/motion";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const setScene = useOrbStore((s) => s.setScene);

  // Inline misty orb is the hero focal point — hide the global companion until scroll.
  useEffect(() => {
    setScene({ anchorId: null, intensity: 0.25, mood: "idle" });
    return () => setScene({ anchorId: "orb-anchor-hero", intensity: 0.7 });
  }, [setScene]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-white pb-20 pt-28 lg:pt-32"
    >
      {/* Soft ambient teal/cyan tints on white */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_50%_at_75%_8%,rgba(24,196,217,0.08),transparent_65%),radial-gradient(55%_45%_at_8%_78%,rgba(120,226,221,0.06),transparent_65%),linear-gradient(180deg,#F0F7F8_0%,#FFFFFF_40%,#F0F7F8_100%)]"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Copy */}
          <div className="flex flex-col gap-7 text-center lg:text-left">
            <motion.h1
              id="hero-title"
              className="font-display text-h1 text-balance text-ink-900"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: ease.glide }}
            >
              The right patients are searching.
              <span className="mt-2 block bg-gradient-to-r from-genie-700 to-genie-500 bg-clip-text text-transparent">
                Clinic Genie helps them find you.
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto max-w-[38ch] text-lead text-ink-700 lg:mx-0"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.glide, delay: 0.12 }}
            >
              Clinic Genie helps specialist clinics grow through healthcare SEO, medical SEM, clinic websites,
              content, AI search, and compliance-aware digital strategy.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.glide, delay: 0.24 }}
            >
              <CTAButton href="/contact">Book a Strategy Call</CTAButton>
              <CTAButton href="/portfolio" variant="ghost" tone="light">
                See Our Work
              </CTAButton>
            </motion.div>
          </div>

          {/* Misty orb — soft, barely formed */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: ease.glide, delay: 0.15 }}
          >
            <OrbVisual state="misty" float={!reduceMotion} size="hero" />
          </motion.div>
        </div>
      </Container>

      <Link
        href="#why"
        aria-label="Scroll to Why Clinic Genie"
        className="absolute bottom-8 left-1/2 z-10 grid h-[42px] w-[26px] -translate-x-1/2 place-items-start rounded-[14px] border border-ink-900/15 pt-2 transition-colors hover:border-genie-500/50 focus-visible:shadow-focus"
      >
        <span
          aria-hidden="true"
          className="h-2 w-1 rounded-sm bg-genie-600 motion-safe:animate-cue"
        />
      </Link>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#EAFBFB]"
      />
    </section>
  );
}
