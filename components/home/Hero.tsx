"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleField } from "@/components/ui/SparkleField";
import { HeroOrb } from "@/components/home/HeroOrb";
import { ease } from "@/lib/motion";

/**
 * Hero — CG-landing3 layout
 * Left: stacked headline + body + CTAs
 * Right: grey circle (floating orb placeholder per mockup)
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      data-nav-theme="light"
      aria-labelledby="hero-title"
      className="relative flex min-h-[88vh] items-center overflow-hidden pb-20 pt-28 lg:pt-32"
    >
      <SparkleField density={28} parallax className="opacity-60" />

      {/* Decorative dashed arcs — bottom-left per mockup */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-[8%] w-[min(380px,55vw)] opacity-[0.35] motion-reduce:hidden"
        viewBox="0 0 380 380"
        fill="none"
      >
        <circle cx="190" cy="190" r="170" stroke="#9CC8D2" strokeWidth="1" strokeDasharray="6 10" />
        <circle cx="190" cy="190" r="120" stroke="#B8D9E0" strokeWidth="0.8" strokeDasharray="4 8" />
        <circle cx="190" cy="190" r="70" stroke="#9CC8D2" strokeWidth="0.6" />
      </svg>

      <Container size="wide" className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Copy — PDF line breaks */}
          <div className="flex max-w-3xl flex-col gap-7 text-center lg:text-left">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.glide }}
            >
            </motion.div>

            <motion.h1
              id="hero-title"
              className="font-display text-h1 text-balance text-ink-900"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: ease.glide, delay: 0.05 }}
            >
              <span className="genie-text">Clinic Genie</span> helps patients find you.
            </motion.h1>

            <motion.p
              className="font-display text-h3 font-normal text-ink-700"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.glide, delay: 0.08 }}
            >
              Clinic marketing, granted
            </motion.p>

            <motion.p
              className="mx-auto max-w-[75%] text-lead leading-relaxed text-pretty text-ink-700 lg:mx-0"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.glide, delay: 0.12 }}
            >
              Skilled care deserves to be found. But online, the clinic that ranks first and looks trustworthy often wins the booking. Clinic Genie is the clinic marketing that closes that gap, helping patients find you, trust you, and book you.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.glide, delay: 0.24 }}
            >
              <MagneticButton href="/contact" size="lg" withMiniOrb>
                Make Your First Wish
              </MagneticButton>
              <MagneticButton href="/portfolio" size="lg" variant="ghost" tone="light">
                See the Magic We&apos;ve Made
              </MagneticButton>
              
            </motion.div>
          </div>

          {/* Grey orb — floating orb per mockup */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: ease.glide, delay: 0.15 }}
          >
            <HeroOrb />
          </motion.div>
        </div>
      </Container>

      <Link
        href="#gap"
        aria-label="Scroll to The Gap"
        className="absolute bottom-8 left-1/2 z-10 grid h-[42px] w-[26px] -translate-x-1/2 place-items-start rounded-[14px] border border-[#D8DEE1] pt-2 transition-colors hover:border-[#54B9CE] focus-visible:shadow-focus"
      >
        <span
          aria-hidden="true"
          className="h-2 w-1 rounded-sm bg-[#217B8E] motion-safe:animate-cue"
        />
      </Link>
    </section>
  );
}
