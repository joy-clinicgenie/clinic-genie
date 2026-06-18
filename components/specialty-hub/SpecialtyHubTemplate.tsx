"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { cn } from "@/lib/cn";
import type { SpecialtyHubDetail } from "@/lib/data/specialty-hubs";
import { useOrbStore } from "@/components/orb/store";

function HubFaqAccordion({ items }: { items: SpecialtyHubDetail["faqs"] }) {
  const [open, setOpen] = useState<number | null>(0);
  const pulse = useOrbStore((s) => s.pulse);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `hub-faq-panel-${i}`;
        const btnId = `hub-faq-trigger-${i}`;
        return (
          <div key={i} className={cn("glass overflow-hidden rounded-xl", isOpen && "shadow-glow-sm")}>
            <button
              id={btnId}
              type="button"
              onClick={() => {
                setOpen(isOpen ? null : i);
                if (!isOpen) pulse();
              }}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-display text-base font-semibold text-onDark">{item.q}</span>
              <motion.span
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-genie-500/15 text-genie-300"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-3 px-5 pb-5">
                    <p className="text-sm leading-relaxed text-onDark-muted">{item.a}</p>
                    {item.link && (
                      <Link
                        href={item.link.href}
                        className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-genie-300 transition-colors hover:text-white"
                      >
                        {item.link.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function SpecialtyHubTemplate({ hub }: { hub: SpecialtyHubDetail }) {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative flex min-h-[64vh] items-center overflow-hidden bg-aurora-hero pb-20 pt-36">
        <SparkleField density={34} parallax />
        <OrbAnchor
          id="specialty-hub-hero"
          variant="services"
          mood="idle"
          scale={0.95}
          intensity={0.85}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />
        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-7 pt-16 lg:pt-0">
            <Reveal variant="up">
              <Link
                href="/specialty-hub"
                className="inline-flex w-fit items-center gap-2 font-display text-kicker uppercase text-genie-300 transition-colors hover:text-white"
              >
                <span aria-hidden="true">←</span> Specialty Hub
              </Link>
            </Reveal>
            <Reveal variant="up" delay={0.04}>
              <Kicker>{hub.heroEyebrow}</Kicker>
            </Reveal>
            <SectionHeading
              as="h1"
              title={hub.heroTitle}
              highlight={hub.heroHighlight}
              className="gap-0"
            />
            <Reveal variant="up" delay={0.12}>
              <p className="max-w-xl text-lead text-onDark-muted">{hub.heroBody}</p>
            </Reveal>
            <Reveal variant="up" delay={0.2}>
              <MagneticButton href={hub.heroCta.href} size="lg" withMiniOrb>
                {hub.heroCta.label}
              </MagneticButton>
            </Reveal>
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
        />
      </section>

      {/* 2 — What makes patients different */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="What makes paediatric patients different"
            title="Parents don't search like patients. They search like parents."
            highlight="parents"
            tone="light"
            subtitle={hub.patientDiff.subtitle}
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {hub.patientDiff.cards.map((card) => (
              <RevealItem key={card.title}>
                <GlassCard tone="light" radius="xl" className="flex h-full flex-col gap-2 p-6">
                  <span aria-hidden="true" className="h-1 w-10 rounded-full bg-genie-400" />
                  <h3 className="font-display text-h4 text-ink-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{card.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 3 — Traditional SEO vs AI Search */}
      <Section tone="dark">
        <OrbAnchor
          id="specialty-hub-search"
          mood="focus"
          scale={0.85}
          intensity={0.9}
          className="absolute right-[8%] top-24 hidden h-px w-px lg:block"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker={hub.searchCompare.subtitle}
            title={hub.searchCompare.title}
            subtitle={hub.searchCompare.intro}
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2">
            <RevealItem>
              <GlassCard tone="dark" radius="xl" className="flex h-full flex-col gap-3 p-7">
                <h3 className="font-display text-h4 text-onDark">{hub.searchCompare.traditional.title}</h3>
                <p className="text-sm leading-relaxed text-onDark-muted">{hub.searchCompare.traditional.body}</p>
              </GlassCard>
            </RevealItem>
            <RevealItem>
              <GlassCard tone="dark" radius="xl" className="flex h-full flex-col gap-3 p-7">
                <h3 className="font-display text-h4 text-onDark">{hub.searchCompare.aiSearch.title}</h3>
                <p className="text-sm leading-relaxed text-onDark-muted">{hub.searchCompare.aiSearch.body}</p>
              </GlassCard>
            </RevealItem>
          </RevealGroup>
          <Reveal variant="up">
            <p className="mx-auto max-w-2xl text-center text-base text-onDark-muted">{hub.searchCompare.closing}</p>
          </Reveal>
        </Container>
      </Section>

      {/* 4 — Featured transformation */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker={hub.transformation.subtitle}
            title={hub.transformation.title}
            tone="light"
            subtitle={hub.transformation.intro}
          />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal variant="up">
              <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-md">
                <Image
                  src={hub.transformation.image}
                  alt={hub.transformation.imageAlt}
                  width={560}
                  height={747}
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
            <div className="flex flex-col gap-6">
              <Reveal variant="up" delay={0.06}>
                <GlassCard tone="light" radius="xl" className="flex flex-col gap-2 p-6">
                  <h3 className="font-display text-h4 text-ink-900">{hub.transformation.anchor.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{hub.transformation.anchor.body}</p>
                </GlassCard>
              </Reveal>
              <Reveal variant="up" delay={0.1}>
                <div className="flex flex-col gap-3">
                  <p className="font-display text-kicker uppercase text-genie-700">The engine around it</p>
                  <ul className="flex flex-col gap-2">
                    {hub.transformation.engine.map((item) => (
                      <li key={item.label} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-genie-500" />
                        {item.label}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-ink-900">One voice, one engine, every part granting the same wish.</p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal variant="up" delay={0.14}>
            <div className="flex flex-col gap-6 rounded-2xl border border-ink-200 bg-genie-50/60 p-8">
              <div>
                <p className="font-display text-kicker uppercase text-genie-700">Measurable magic</p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-700">{hub.transformation.metricsIntro}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {hub.transformation.metrics.map((metric) => (
                  <li key={metric} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                    <span aria-hidden="true" className="mt-1.5 text-genie-600">✦</span>
                    {metric}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-medium text-ink-900">Measurable magic. Wishes realised in data, not promises.</p>
              <MagneticButton href={hub.transformation.cta.href} variant="ghost" className="w-fit text-genie-700 hover:text-genie-900">
                {hub.transformation.cta.label} →
              </MagneticButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 5 — Cross-channel routings */}
      <Section tone="dark">
        <OrbAnchor
          id="specialty-hub-routings"
          mood="thinking"
          scale={0.85}
          intensity={0.9}
          className="absolute left-1/2 top-20 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker={hub.routings.subtitle}
            title={hub.routings.title}
            subtitle={hub.routings.intro}
            align="center"
          />
          <RevealGroup className="flex flex-wrap justify-center gap-3">
            {hub.routings.links.map((link) => (
              <RevealItem key={link.href}>
                <Link
                  href={link.href}
                  className="glass inline-flex items-center gap-2 rounded-pill border border-white/10 px-5 py-2.5 text-sm font-medium text-onDark transition-colors hover:border-genie-400/50 hover:text-white"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 6 — Compliance safeguard */}
      <Section tone="light">
        <Container size="prose" className="flex flex-col gap-8">
          <SectionHeading
            kicker="The specialty compliance safeguard"
            title={hub.compliance.title}
            highlight="conscience"
            tone="light"
            subtitle={hub.compliance.intro}
            align="center"
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {hub.compliance.bullets.map((bullet) => (
              <RevealItem key={bullet}>
                <GlassCard tone="light" radius="xl" className="flex h-full items-start gap-3 p-6">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-genie-100 text-genie-700">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 1l1.8 3.9L14 5.4l-3 3 .8 4.3L8 10.8 4.2 12.7 5 8.4l-3-3 4.2-.5L8 1z" fill="currentColor" />
                    </svg>
                  </span>
                  <p className="text-sm leading-relaxed text-ink-700">{bullet}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 7 — FAQ */}
      <Section tone="dark">
        <OrbAnchor
          id="specialty-hub-faq"
          mood="curious"
          scale={0.8}
          intensity={0.85}
          className="absolute right-[10%] top-1/2 hidden h-px w-px lg:block"
        />
        <Container size="prose" className="flex flex-col gap-10">
          <SectionHeading kicker="Frequently asked questions" title={`${hub.name}, explained.`} align="center" />
          <HubFaqAccordion items={hub.faqs} />
        </Container>
      </Section>

      {/* 8 — Final CTA */}
      <Section tone="light" className="overflow-hidden">
        <OrbAnchor
          id="specialty-hub-cta"
          mood="celebrate"
          scale={1.08}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            kicker={hub.finalCta.subtitle}
            title={hub.finalCta.title}
            tone="light"
            align="center"
          />
          <Reveal variant="up" delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-ink-700">{hub.finalCta.body}</p>
          </Reveal>
          <Reveal variant="up" delay={0.2}>
            <MagneticButton href={hub.finalCta.cta.href} size="lg" withMiniOrb>
              {hub.finalCta.cta.label}
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
