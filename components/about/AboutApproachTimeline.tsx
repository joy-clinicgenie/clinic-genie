"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_APPROACH_STEPS } from "@/lib/data/about";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { ProcessStepIcon } from "@/components/ui/ProcessStepIcon";
import { LandingIntro, LandingSection } from "@/components/home/landing/LandingLayout";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { ease } from "@/lib/motion";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.glide },
  },
};

const itemReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export function AboutApproachTimeline() {
  const reduced = useReducedMotion();

  return (
    <LandingSection
      id="how-we-work"
      tone="white"
      className="bg-gradient-to-b from-[#e3f6fa] via-[#f8fdfd] to-white py-24"
      containerClassName="flex flex-col items-center gap-12"
    >
      <Reveal>
        <LandingIntro
          kicker="How we work"
          title="Strategy first, then the magic"
          highlight="magic"
          subtitle="We listen, research, and build with discipline. Every step is designed to support clearer discovery, stronger trust, and responsible clinic growth."
        />
      </Reveal>

      <motion.ul
        className="flex w-full flex-wrap justify-center gap-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduced ? 0 : 0.08 } },
        }}
      >
        {ABOUT_APPROACH_STEPS.map((step) => (
            <motion.li
              key={step.slug}
              className="flex w-full min-w-0 sm:w-[calc(50%-0.625rem)] lg:w-auto lg:min-w-0 lg:flex-1 lg:basis-0"
              variants={reduced ? itemReduced : itemVariants}
            >
              <FeatureInfoCard
                title={step.title}
                body={step.body}
                href={step.href}
                align="center"
                icon={<ProcessStepIcon title={step.title} className="h-10 w-10 text-genie-600" />}
                className="h-full min-h-0"
              />
            </motion.li>
        ))}
      </motion.ul>

      <Reveal delay={0.08}>
        <div className="flex justify-center">
          <MagneticButton href="/services" size="md" withMiniOrb>
            Explore the Eight Wishes
          </MagneticButton>
        </div>
      </Reveal>
    </LandingSection>
  );
}
