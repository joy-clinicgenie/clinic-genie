"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_APPROACH_STEPS } from "@/lib/data/about";
import { LandingIntro, LandingSection } from "@/components/home/landing/LandingLayout";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
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
      containerClassName="flex flex-col gap-12"
    >
      <Reveal>
        <LandingIntro
          kicker="How we work"
          title="Strategy first, then the magic"
          highlight="magic"
          subtitle="We listen, research, and build with discipline. Every step is designed to support clearer discovery, stronger trust, and responsible clinic growth."
        />
      </Reveal>

      <motion.ol
        className="relative mx-auto flex w-full max-w-2xl flex-col gap-0"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduced ? 0 : 0.08 } },
        }}
      >
        {ABOUT_APPROACH_STEPS.map((step, index) => {
          const isLast = index === ABOUT_APPROACH_STEPS.length - 1;
          return (
            <motion.li
              key={step.n}
              className="relative flex gap-6 pb-10 last:pb-0"
              variants={reduced ? itemReduced : itemVariants}
            >
              <div className="relative flex shrink-0 flex-col items-center">
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-full border border-genie-300/60",
                    "bg-white font-mono text-sm font-semibold text-genie-700 shadow-sm"
                  )}
                  aria-hidden="true"
                >
                  {String(step.n).padStart(2, "0")}
                </span>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-10 h-[calc(100%+0.5rem)] w-px bg-gradient-to-b from-genie-300/70 to-genie-200/30"
                  />
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-1">
                <h3 className="font-display text-h5 text-ink-900">{step.title}</h3>
                <p className="text-base leading-relaxed text-ink-700">{step.body}</p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>

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
