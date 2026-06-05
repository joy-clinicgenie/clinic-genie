"use client";

import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor, usePageOrb } from "@/components/orb/OrbAnchor";
import { MakeAWish } from "./MakeAWish";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const WORDS = "The right patients are searching.".split(" ");

export function Hero() {
  usePageOrb("home");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-aurora-hero pb-20 pt-32">
      <SparkleField density={46} parallax />
      {/* orb sits center-right (mobile: top-center, behind copy) */}
      <OrbAnchor
        id="hero"
        variant="home"
        mood="idle"
        scale={1}
        intensity={0.85}
        className="absolute left-1/2 top-[16%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
      />

      <Container size="wide" className="relative z-10">
        <div className="flex max-w-3xl flex-col gap-7 pt-24 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: ease.glide }}>
            <Kicker>Singapore&apos;s clinic marketing genie</Kicker>
          </motion.div>

          <h1 className="text-h1 font-display text-balance text-onDark">
            {WORDS.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, ease: ease.glide, delay: 0.1 + i * 0.08 }}
              >
                {w}&nbsp;
              </motion.span>
            ))}
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.glide, delay: 0.5 }}
            >
              Make sure your clinic is the one they <span className="genie-text">trust</span>.
            </motion.span>
          </h1>

          <motion.p
            className="max-w-xl text-lead text-onDark-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ease.glide, delay: 0.7 }}
          >
            We help specialist clinics grow through healthcare SEO, medical SEM, clinic websites, content, AI search, and
            compliance-aware digital strategy.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ease.glide, delay: 0.85 }}
          >
            <MagneticButton href="/contact" size="lg" withMiniOrb>
              Book a strategy call
            </MagneticButton>
            <MagneticButton href="/portfolio" size="lg" variant="secondary">
              See our works
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ease.glide, delay: 1 }}
          >
            <MakeAWish />
          </motion.div>

          <motion.p
            className="max-w-lg text-sm text-onDark-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.15 }}
          >
            Trusted by aesthetic, dermatology, dental, fertility and orthopaedic clinics across Singapore.
          </motion.p>
        </div>
      </Container>

      {/* fade into next (light) section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900" />
    </section>
  );
}
