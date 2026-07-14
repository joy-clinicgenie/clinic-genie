"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HERO_WISHES } from "@/lib/data/hero-wishes";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import styles from "./Hero.module.css";

const WishOrbGlass = dynamic(() => import("@/components/home/WishOrbGlass"), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero — headline, supporting copy, and CTAs
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const orbAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      data-nav-theme="light"
      aria-labelledby="hero-title"
      className={cn(
        styles.heroSection,
        "relative flex h-svh max-h-svh min-h-0 flex-col overflow-hidden pt-[calc(3.25rem+env(safe-area-inset-top,0px))] pb-3 lg:pt-[calc(5.25rem+env(safe-area-inset-top,0px))] lg:pb-12"
      )}
    >
      <div className={styles.heroBackground} data-hero-bg="true" aria-hidden="true">
        <div className={styles.heroSparkleField} />
        <div className={styles.heroSparkleFieldAlt} />
      </div>

      <div className={styles.heroSparkleLayer} data-hero-orb-layer="true" aria-hidden="true">
        <WishOrbGlass
          wishes={HERO_WISHES}
          reducedMotion={reduceMotion ?? false}
          anchorRef={orbAnchorRef}
        />
      </div>

      <Container
        size="wide"
        className={cn(styles.heroContent, "relative flex min-h-0 w-full flex-1 items-center")}
      >
        <div className={styles.heroSplit}>
          <div className={styles.heroCopyCol}>
            <div className={styles.heroGrid}>
              <motion.h1
                id="hero-title"
                className={cn(styles.headline, "font-display text-h1 text-balance text-ink-900")}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: ease.glide, delay: 0.05 }}
              >
                <span className="genie-text">Clinic Genie</span> helps patients find you.
              </motion.h1>

              <motion.p
                className={cn(
                  styles.tagline,
                  "font-display text-[0.9375rem] font-normal text-ink-700 sm:text-base lg:text-h4"
                )}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: ease.glide, delay: 0.08 }}
              >
                Clinic marketing, granted
              </motion.p>

              <motion.p
                className={cn(styles.body, "text-lead text-pretty text-ink-700")}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: ease.glide, delay: 0.12 }}
              >
                Online, the clinic that ranks first often wins the booking. Clinic Genie makes sure that clinic is
                yours.
              </motion.p>

              <motion.div
                className={styles.ctaRow}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: ease.glide, delay: 0.24 }}
              >
                <MagneticButton href="/contact" size="md" withMiniOrb>
                  Make Your First Wish
                </MagneticButton>
                <MagneticButton href="/portfolio" size="md" variant="ghost" tone="light">
                  See the Magic We&apos;ve Made
                </MagneticButton>
              </motion.div>
            </div>
          </div>

          <div ref={orbAnchorRef} className={styles.heroOrbCol} aria-hidden="true" />
        </div>
      </Container>

      <Link
        href="#gap"
        aria-label="Scroll to The Gap"
        className={cn(
          styles.scrollCue,
          "absolute left-1/2 z-[30] grid h-[42px] w-[26px] -translate-x-1/2 place-items-start rounded-[14px] border border-[#D8DEE1] pt-2 transition-colors hover:border-[#54B9CE] focus-visible:shadow-focus"
        )}
      >
        <span
          aria-hidden="true"
          className="h-2 w-1 rounded-sm bg-[#217B8E] motion-safe:animate-cue"
        />
      </Link>
    </section>
  );
}
