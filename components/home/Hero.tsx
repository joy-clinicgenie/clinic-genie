"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { OrbWishDecrypt } from "@/components/home/OrbWishDecrypt";
import { SiriOrb } from "@/components/home/SiriOrb";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import styles from "./Hero.module.css";

/**
 * Hero — headline, supporting copy, and CTAs
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const orbRef = useRef<HTMLDivElement>(null);
  const [orbSize, setOrbSize] = useState(380);

  useEffect(() => {
    const el = orbRef.current;
    if (!el) return;

    const updateSize = () => {
      setOrbSize(Math.max(1, Math.round(el.getBoundingClientRect().width)));
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
      <div className={styles.heroBackground} data-hero-bg="true" aria-hidden="true" />

      <Container
        size="wide"
        className={cn(styles.heroContent, "relative flex min-h-0 w-full flex-1 items-center")}
      >
        <div className={styles.heroSplit}>
          <div className={styles.heroCopyCol}>
            <div className={styles.heroGrid}>
              <motion.p
                className={cn(
                  styles.tagline,
                  "font-display text-body font-medium leading-snug tracking-wide text-ink-700 sm:text-h6 lg:text-[length:calc(var(--text-h1)/2)]"
                )}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: ease.glide, delay: 0.05 }}
              >
                CLINIC MARKETING, GRANTED
              </motion.p>

              <motion.h1
                id="hero-title"
                className={cn(styles.headline, "font-display text-h1 text-balance text-ink-900")}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: ease.glide, delay: 0.08 }}
              >
                <span className="genie-text">Clinic Genie</span> helps the right patients find your clinic
              </motion.h1>

              <motion.p
                className={cn(styles.body, "text-body text-pretty text-ink-700")}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: ease.glide, delay: 0.12 }}
              >
                Patients rarely scroll past the first few results. Clinic Genie builds the search visibility that puts your clinic in front of them.
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

          <div className={styles.heroOrbCol}>
            <div ref={orbRef} className={styles.heroOrb}>
              <div className={styles.heroOrbVisual} aria-hidden="true">
                <SiriOrb
                  size={orbSize}
                  reducedMotion={reduceMotion ?? false}
                  colors={{
                    bg: "#C5DDE3",
                    c1: "color-mix(in srgb, #78E2DD 45%, #18C4D9 55%)",
                    c2: "color-mix(in srgb, #7DAFE3 65%, #18C4D9 35%)",
                  }}
                />
              </div>
              <OrbWishDecrypt className={styles.heroOrbWish} />
            </div>
          </div>
        </div>
      </Container>

      <Link
        href="#gap"
        aria-label="Scroll to The Gap"
        className={cn(
          styles.scrollCue,
          "absolute left-1/2 z-[30] grid h-[42px] w-[26px] -translate-x-1/2 justify-items-center rounded-[14px] border border-[#D8DEE1] pt-2 transition-colors hover:border-[#54B9CE] focus-visible:shadow-focus"
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
