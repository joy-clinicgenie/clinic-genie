"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
import { ease } from "@/lib/motion";
import type { CorePillar } from "@/lib/data/pillars";

const HERO_PROOF = [
  { n: "01", label: "Research-led" },
  { n: "02", label: "Brand-aligned" },
  { n: "03", label: "Trust-focused" },
] as const;

const t = {
  breadcrumb: 0.05,
  serviceName: 0.12,
  headline: 0.22,
  description: 0.38,
  proof: 0.48,
  cta: 0.72,
} as const;

type PillarHeroProps = {
  pillar: CorePillar;
  wishImageSrc?: string;
  imageClassName?: string;
};

export function PillarHero({
  pillar,
  wishImageSrc,
  imageClassName = "object-cover object-center lg:object-right",
}: PillarHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[40rem] items-center overflow-hidden bg-white pb-16 pt-[calc(3.25rem+env(safe-area-inset-top,0px))] text-ink-900 sm:min-h-[42rem] lg:h-[46rem] lg:min-h-[46rem] lg:pb-24 lg:pt-36"
    >
      {wishImageSrc ? (
        <ParallaxBackground
          src={wishImageSrc}
          priority
          entranceScale
          imageClassName={imageClassName}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
          />
        </ParallaxBackground>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${pillar.accent} 28%, white), color-mix(in srgb, ${pillar.accent} 12%, #f7fafb))`,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
          />
        </>
      )}

      <Container className="relative z-10 w-full">
        <div className="flex max-w-xl flex-col items-start text-left">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: ease.glide, delay: t.breadcrumb }}
          >
            <Link
              href="/services"
              className="mb-5 inline-flex w-fit items-center gap-2 font-sans text-kicker uppercase text-genie-700 transition-colors hover:text-genie-900"
            >
              <span aria-hidden="true">←</span> Services
            </Link>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: ease.glide, delay: t.serviceName }}
          >
            <h1 className="font-display text-h1 uppercase text-balance text-ink-900">
              {pillar.name}
            </h1>
            <p className="mt-1.5 font-display text-[0.9375rem] font-normal text-ink-700 sm:mt-2 sm:text-base">
              for clinics
            </p>
          </motion.div>

          <div className="mt-5 overflow-hidden sm:mt-6">
            <motion.p
              className="font-display text-h3 text-balance text-ink-900 lg:text-h2"
              initial={
                reduceMotion
                  ? false
                  : { y: "110%", opacity: 0.35 }
              }
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, ease: ease.glide, delay: t.headline }}
            >
              {pillar.heroTitle}
            </motion.p>
          </div>

          <motion.div
            className="mt-4 flex w-full max-w-[90%] flex-col gap-3 sm:mt-5"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: ease.glide, delay: t.description }}
          >
            {pillar.heroParagraph.map((para, i) => (
              <p key={i} className="text-body text-pretty text-ink-700">
                {para}
              </p>
            ))}
          </motion.div>

          <motion.ul
            className="mt-6 flex w-full max-w-md list-none flex-wrap gap-x-8 gap-y-4 p-0 sm:mt-7"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.06,
                  delayChildren: reduceMotion ? 0 : t.proof,
                },
              },
            }}
          >
            {HERO_PROOF.map((item) => (
              <motion.li
                key={item.n}
                className="flex min-w-[5.5rem] flex-col gap-1"
                variants={{
                  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: ease.glide },
                  },
                }}
              >
                <span className="font-sans text-kicker text-genie-700">{item.n}</span>
                <span className="font-sans text-kicker uppercase text-ink-800">
                  {item.label}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-7 flex w-full flex-col flex-wrap items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: ease.glide, delay: t.cta }}
          >
            <MagneticButton href={pillar.heroPrimaryCta.href} size="md" withMiniOrb>
              {pillar.heroPrimaryCta.label}
            </MagneticButton>
            <MagneticButton
              href={pillar.heroSecondaryCta.href}
              size="md"
              variant="ghost"
              tone="light"
            >
              {pillar.heroSecondaryCta.label}
            </MagneticButton>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
