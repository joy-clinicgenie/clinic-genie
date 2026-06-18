import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { CORE_PILLARS, PILLAR_SPECIALTIES, getPillar } from "@/lib/data/pillars";

export function generateStaticParams() {
  return CORE_PILLARS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pillar = getPillar(params.slug);
  if (!pillar) {
    return {
      title: "Service not found | Clinic Genie",
      description: "The service pillar you're looking for couldn't be conjured.",
    };
  }
  return {
    title: `${pillar.name} — Core Service Pillar | Clinic Genie`,
    description: pillar.heroParagraph[0],
  };
}

export default function PillarPage({ params }: { params: { slug: string } }) {
  const pillar = getPillar(params.slug);
  if (!pillar) notFound();

  const related = pillar.relatedServices
    .map((slug) => getPillar(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative flex min-h-[64vh] items-center overflow-hidden bg-aurora-hero pb-20 pt-36">
        <SparkleField density={34} parallax />
        <OrbAnchor
          id="pillar-hero"
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
                href="/services/core-pillars"
                className="inline-flex w-fit items-center gap-2 font-display text-kicker uppercase text-genie-300 transition-colors hover:text-white"
              >
                <span aria-hidden="true">←</span> Core service pillars
              </Link>
            </Reveal>
            <Reveal variant="up" delay={0.04}>
              <Kicker>{pillar.heroSubtitle}</Kicker>
            </Reveal>
            <SectionHeading as="h1" title={pillar.heroTitle} className="gap-0" />
            <div className="flex flex-col gap-4">
              {pillar.heroParagraph.map((para, i) => (
                <Reveal key={i} variant="up" delay={0.12 + i * 0.06}>
                  <p className="max-w-xl text-lead text-onDark-muted">{para}</p>
                </Reveal>
              ))}
            </div>
            <Reveal variant="up" delay={0.26}>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href={pillar.heroPrimaryCta.href} size="lg" withMiniOrb>
                  {pillar.heroPrimaryCta.label}
                </MagneticButton>
                <MagneticButton href={pillar.heroSecondaryCta.href} size="lg" variant="secondary">
                  {pillar.heroSecondaryCta.label}
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
        />
      </section>

      {/* 2 — Why it matters */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Why it matters"
            title={pillar.whyTitle}
            tone="light"
            subtitle={pillar.whyParagraph[0]}
          />
          {pillar.whyParagraph[1] && (
            <Reveal variant="up" delay={0.1}>
              <p className="max-w-2xl text-lead text-ink-700">{pillar.whyParagraph[1]}</p>
            </Reveal>
          )}
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {pillar.keyPoints.map((point) => (
              <RevealItem key={point.title}>
                <GlassCard tone="light" radius="xl" className="flex h-full flex-col gap-2 p-6">
                  <span
                    aria-hidden="true"
                    className="h-1 w-10 rounded-full"
                    style={{ background: pillar.accent }}
                  />
                  <h3 className="font-display text-h4 text-ink-900">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{point.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 3 — What it helps clinics build */}
      <Section tone="dark">
        <OrbAnchor
          id="pillar-build"
          mood="focus"
          scale={0.85}
          intensity={0.9}
          className="absolute right-[8%] top-24 hidden h-px w-px lg:block"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker={pillar.buildSubtitle}
            title={pillar.buildTitle}
            subtitle={pillar.buildParagraph}
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillar.cards.map((card) => (
              <RevealItem key={card.title} className="h-full">
                <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-3 p-7">
                  <span
                    aria-hidden="true"
                    className="h-1 w-10 rounded-full"
                    style={{ background: pillar.accent }}
                  />
                  <h3 className="font-display text-h4 text-onDark">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-onDark-muted">{card.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>

          {related.length > 0 && (
            <div className="flex flex-col gap-5 border-t border-hairline-dark pt-10">
              <p className="font-display text-kicker uppercase text-genie-300">Works well with</p>
              <RevealGroup className="flex flex-wrap gap-3">
                {related.map((rel) => (
                  <RevealItem key={rel.slug}>
                    <Link
                      href={`/services/core-pillars/${rel.slug}`}
                      className="glass inline-flex items-center gap-2 rounded-pill border border-white/10 px-5 py-2.5 text-sm font-medium text-onDark transition-colors hover:border-genie-400/50 hover:text-white"
                    >
                      {rel.name}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}
        </Container>
      </Section>

      {/* 4 — The Clinic Genie approach */}
      <Section tone="light">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            kicker={pillar.approachSubtitle}
            title={pillar.approachTitle}
            tone="light"
            subtitle={pillar.approachParagraph[0]}
            align="center"
          />
          {pillar.approachParagraph[1] && (
            <Reveal variant="up" className="text-center">
              <p className="mx-auto max-w-2xl text-base text-ink-700">{pillar.approachParagraph[1]}</p>
            </Reveal>
          )}
          <ProcessSteps
            steps={pillar.steps.map((s, i) => ({ n: i + 1, title: s.title, body: s.body }))}
            tone="light"
          />
          <Reveal variant="up">
            <div className="glass-light mx-auto flex max-w-2xl items-start gap-3 rounded-xl p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-genie-100 text-genie-700">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1l1.8 3.9L14 5.4l-3 3 .8 4.3L8 10.8 4.2 12.7 5 8.4l-3-3 4.2-.5L8 1z" fill="currentColor" />
                </svg>
              </span>
              <p className="text-sm leading-relaxed text-ink-700">{pillar.trustNote}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 5 — Built for specialist clinics */}
      <Section tone="dark">
        <OrbAnchor
          id="pillar-specialty"
          mood="thinking"
          scale={0.85}
          intensity={0.9}
          className="absolute left-1/2 top-20 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Built for specialist care"
            title={pillar.specialtyTitle}
            subtitle={pillar.specialtyParagraph}
            align="center"
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLAR_SPECIALTIES.map((specialty) => (
              <RevealItem key={specialty.title} className="h-full">
                <GlassCard tone="dark" radius="lg" className="flex h-full flex-col gap-2 p-5">
                  <h3 className="font-display text-base font-semibold text-onDark">{specialty.title}</h3>
                  <p className="text-sm leading-relaxed text-onDark-muted">{specialty.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 6 — Related insights */}
      <Section tone="light">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              kicker="Learn more"
              title="Useful thinking before you start."
              highlight="thinking"
              tone="light"
            />
            <MagneticButton href="/genie-tips" variant="ghost" className="text-genie-700 hover:text-genie-900">
              Read Genie Tips →
            </MagneticButton>
          </div>
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {pillar.insights.map((insight) => (
              <RevealItem key={insight.label} className="h-full">
                <Link href={insight.href} className="group block h-full" aria-label={insight.label}>
                  <GlassCard tone="light" radius="xl" hover className="flex h-full items-center gap-4 p-6">
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-genie-100 text-genie-700"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M2 7h10M7.5 2.5L12 7l-4.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-ink-900 transition-colors group-hover:text-genie-700">
                      {insight.label}
                    </span>
                  </GlassCard>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 7 — FAQs */}
      <Section tone="dark">
        <OrbAnchor
          id="pillar-faq"
          mood="curious"
          scale={0.8}
          intensity={0.85}
          className="absolute right-[10%] top-1/2 hidden h-px w-px lg:block"
        />
        <Container size="prose" className="flex flex-col gap-10">
          <SectionHeading
            kicker="Questions, answered"
            title={`${pillar.name}, explained.`}
            align="center"
          />
          <FaqAccordion items={pillar.faqs} />
        </Container>
      </Section>

      {/* 8 — Final CTA */}
      <Section tone="light" className="overflow-hidden">
        <OrbAnchor
          id="pillar-cta"
          mood="celebrate"
          scale={1.08}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            kicker={pillar.finalSubtitle}
            title={pillar.finalTitle}
            tone="light"
            align="center"
          />
          <Reveal variant="up" delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-ink-700">{pillar.finalParagraph}</p>
          </Reveal>
          <Reveal variant="up" delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={pillar.heroPrimaryCta.href} size="lg" withMiniOrb>
                {pillar.heroPrimaryCta.label}
              </MagneticButton>
              <MagneticButton
                href={pillar.finalSecondaryCta.href}
                size="lg"
                variant="ghost"
                className="text-genie-700 hover:text-genie-900"
              >
                {pillar.finalSecondaryCta.label}
              </MagneticButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
