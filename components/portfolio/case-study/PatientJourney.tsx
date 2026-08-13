"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/data/portfolio";
import { padIndex, toPathSteps } from "./utils";

function JourneyFlow({ steps }: { steps: string[] }) {
  const reduced = useReducedMotion();

  return (
    <ol
      className="flex list-none flex-col lg:flex-row lg:items-start"
      aria-label="Patient journey stages"
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step}
            className="flex flex-1 gap-4 lg:flex-col lg:items-center lg:gap-4"
          >
            <div className="flex flex-col items-center self-stretch lg:w-full lg:flex-row lg:items-center">
              <motion.span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-hairline-light bg-white font-display text-sm font-semibold text-ink-900"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.45,
                  ease: ease.glide,
                  delay: reduced ? 0 : index * 0.08,
                }}
              >
                {padIndex(index)}
              </motion.span>
              {!isLast ? (
                <motion.span
                  aria-hidden="true"
                  className="w-px min-h-8 flex-1 bg-genie-500/40 lg:h-px lg:min-h-0 lg:w-auto"
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.45,
                    ease: ease.glide,
                    delay: reduced ? 0 : 0.12 + index * 0.08,
                  }}
                />
              ) : (
                <span aria-hidden="true" className="hidden lg:block lg:flex-1" />
              )}
            </div>
            <p className="pb-8 font-display text-h6 font-semibold text-ink-900 lg:pb-0 lg:pt-0 lg:text-center">
              {step}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

function ArchitecturePath({
  label,
  steps,
  tone,
}: {
  label: string;
  steps: string[];
  tone: "muted" | "clear";
}) {
  const isClear = tone === "clear";

  return (
    <div className="flex flex-col gap-5">
      <Kicker tone="light">{label}</Kicker>
      <ol className="flex list-none flex-col" aria-label={`${label} website path`}>
        {steps.map((step, index) => (
          <li key={`${label}-${step}`} className="flex flex-col">
            <div
              className={cn(
                "rounded-2xl border px-4 py-3",
                isClear
                  ? "border-genie-500/30 bg-white text-ink-900 shadow-card"
                  : "border-hairline-light bg-cg-mist/60 text-ink-700"
              )}
            >
              <span className="flex items-center gap-3">
                {isClear ? (
                  <span
                    aria-hidden="true"
                    className="font-display text-sm font-semibold tabular-nums text-genie-700"
                  >
                    {padIndex(index)}
                  </span>
                ) : null}
                <span className={cn("font-sans text-sm sm:text-base", isClear && "font-medium")}>
                  {step}
                </span>
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "mx-auto h-5 w-px",
                  isClear ? "bg-genie-500/50" : "bg-hairline-light"
                )}
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PatientJourney({ study }: { study: CaseStudy }) {
  const beforeSteps = toPathSteps(study.journey.websiteMap.old);
  const afterSteps = toPathSteps(study.journey.websiteMap.new);

  return (
    <Section tone="light" className="![background:white]">
      <Container className="flex flex-col gap-14 lg:gap-20">
        <SectionHeading
          kicker="Patient journey map"
          title={study.journeyTitle ?? "From search to enquiry, mapped with intent"}
          highlight={study.journeyHighlight ?? "mapped with intent"}
          tone="light"
          subtitle={study.journeyIntro}
        />

        <Reveal variant="up">
          <JourneyFlow steps={study.journey.flow} />
        </Reveal>

        <div className="grid gap-10 border-t border-hairline-light pt-12 lg:grid-cols-2 lg:gap-16">
          <ArchitecturePath label="Before" steps={beforeSteps} tone="muted" />
          <ArchitecturePath label="After" steps={afterSteps} tone="clear" />
        </div>
      </Container>
    </Section>
  );
}
