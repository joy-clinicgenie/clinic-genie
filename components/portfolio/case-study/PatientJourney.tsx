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
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step}
            className="flex gap-4 lg:min-w-0 lg:flex-1 lg:flex-col lg:items-center lg:gap-4"
          >
            <div className="flex flex-col items-center self-stretch lg:w-full lg:flex-row lg:items-center">
              <span
                aria-hidden="true"
                className={cn(
                  "hidden h-px flex-1 lg:block",
                  isFirst ? "bg-transparent" : "bg-genie-500/40"
                )}
              />
              <motion.span
                className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-hairline-light bg-white font-display text-sm font-semibold text-ink-900"
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
                <span
                  aria-hidden="true"
                  className="w-px min-h-8 flex-1 bg-genie-500/40 lg:h-px lg:min-h-0"
                />
              ) : (
                <span aria-hidden="true" className="hidden flex-1 lg:block" />
              )}
            </div>
            <p className="pb-8 font-display text-h6 font-semibold text-ink-900 lg:w-full lg:max-w-[10rem] lg:pb-0 lg:text-center">
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
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <li key={`${label}-${step}`} className="flex gap-4">
              <div className="flex w-10 shrink-0 flex-col items-center">
                {isClear ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full font-display text-xs font-semibold tabular-nums",
                      isLast
                        ? "bg-genie-500 text-white"
                        : "border border-genie-500/40 bg-white text-genie-700"
                    )}
                  >
                    {padIndex(index)}
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="mt-2 size-2.5 rounded-full border border-hairline-light bg-cg-mist"
                  />
                )}
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex-1",
                      isClear
                        ? "min-h-6 w-px bg-genie-500/40"
                        : "min-h-5 w-0 border-l border-dashed border-hairline-light"
                    )}
                  />
                ) : null}
              </div>
              <p
                className={cn(
                  "min-w-0 pb-6 font-sans text-sm sm:text-base",
                  isClear && "pt-1 text-ink-900",
                  isClear && isLast && "font-semibold",
                  !isClear && "pt-0.5 text-ink-700",
                  isLast && "pb-0"
                )}
              >
                {step}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function PatientJourney({ study }: { study: CaseStudy }) {
  const beforeSteps = toPathSteps(study.journey.websiteMap.old);
  const afterSteps = toPathSteps(study.journey.websiteMap.new);

  return (
    <Section tone="light" className="bg-cg-mist ![background:theme(colors.cg-mist)]">
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
