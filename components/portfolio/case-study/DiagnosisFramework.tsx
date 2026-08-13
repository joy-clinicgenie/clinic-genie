"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { LandingIntro } from "@/components/home/landing/LandingLayout";
import { ease } from "@/lib/motion";
import type { CaseStudyCard } from "@/lib/data/portfolio";
import alliesStyles from "@/components/home/landing/AlliesCards.module.css";

const lensCardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: ease.glide },
  },
};

const lensShineVariants = {
  hidden: { x: "-120%", opacity: 0 },
  show: {
    x: "120%",
    opacity: [0, 0.9, 0],
    transition: { duration: 0.75, ease: ease.glide, delay: 0.06 },
  },
};

const diagnosisTaglineVariants = {
  hidden: { opacity: 0, y: -80, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: ease.glide, delay: 1 },
  },
};

export function DiagnosisFramework({
  intro,
  body,
  lenses,
}: {
  intro: string;
  body: string;
  lenses: CaseStudyCard[];
}) {
  const reduced = useReducedMotion();

  return (
    <Section
      tone="dark"
      className="relative z-10 overflow-hidden rounded-b-2xl bg-[#062D36] py-24 text-onDark lg:rounded-b-[44px] md:py-24"
    >
      <Container className="flex flex-col gap-12">
        <Reveal>
          <LandingIntro
            light
            kicker="Clinic Genie diagnosis"
            title="Four lenses. One clearer picture"
            highlight="clearer picture"
            subtitle={intro}
          />
        </Reveal>

        <div className="relative">
          <motion.ul
            className="relative z-10 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduced ? 0 : 0.1 } },
            }}
            aria-label="Diagnostic lenses"
          >
            {lenses.map((lens) => (
              <motion.li
                key={lens.title}
                variants={lensCardVariants}
                className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-shadow duration-ui hover:shadow-glow-md"
              >
                {!reduced && (
                  <motion.span
                    aria-hidden="true"
                    className={alliesStyles.shine}
                    variants={lensShineVariants}
                  />
                )}
                <article className="relative z-[2] flex flex-1 flex-col gap-2 px-5 py-5 sm:px-8 sm:py-6">
                  <h3 className="font-display text-base font-semibold text-onDark">
                    {lens.title}
                  </h3>
                  <p className="text-body leading-relaxed text-onDark-muted">{lens.body}</p>
                </article>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className={`relative z-0 text-center font-display text-h6 font-regular italic leading-snug text-[#9FDCE8] ${alliesStyles.tagline}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={
              reduced
                ? {
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { duration: 0.4 } },
                  }
                : diagnosisTaglineVariants
            }
          >
            {body}
          </motion.p>
        </div>
      </Container>
    </Section>
  );
}
