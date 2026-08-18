"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { BackLink } from "@/components/ui/BackLink";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { FaqSection } from "@/components/ui/FaqSection";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
import type { SpecialtyHubDetail } from "@/lib/data/specialty-hubs";

export function SpecialtyHubTemplate({ hub }: { hub: SpecialtyHubDetail }) {
  return (
    <>
      <section
        data-nav-theme="light"
        className="relative flex min-h-[64vh] items-center overflow-hidden bg-white pb-16 pt-[calc(3.25rem+env(safe-area-inset-top,0px))] text-ink-900 lg:pb-24 lg:pt-36"
      >
        {hub.heroImage ? (
          <ParallaxBackground
            src={hub.heroImage}
            priority
            imageClassName="object-cover object-[30%_center] lg:object-[18%_center] lg:-translate-x-[4%]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
            />
          </ParallaxBackground>
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
          />
        )}

        <Container className="relative z-10 w-full">
          <div className="flex max-w-xl flex-col items-start text-left">
            <BackLink
              href="/clinic-specialties"
              label="Clinic Specialties"
              className="mb-5"
            />

            <h1 className="font-display text-h1 text-balance text-ink-900">
              {hub.heroHighlight && hub.heroTitle.includes(hub.heroHighlight) ? (
                <>
                  {hub.heroTitle.split(hub.heroHighlight)[0]}
                  <span className="genie-text">{hub.heroHighlight}</span>
                  {hub.heroTitle.split(hub.heroHighlight).slice(1).join(hub.heroHighlight)}
                </>
              ) : (
                hub.heroTitle
              )}
            </h1>

            <p className="mt-2 font-display text-body font-normal text-ink-700 sm:mt-2.5 lg:text-h4">
              {hub.heroLabel ?? hub.name}
            </p>

            <div className="mt-4 flex w-full max-w-[90%] flex-col gap-3 sm:mt-5">
              <p className="text-body text-pretty text-ink-700">{hub.heroBody}</p>
            </div>

            <div className="mt-7 flex w-full flex-col flex-wrap items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <MagneticButton href={hub.heroCta.href} size="md" withMiniOrb>
                {hub.heroCta.label}
              </MagneticButton>
              <MagneticButton
                href={hub.heroSecondaryCta.href}
                size="md"
                variant="ghost"
                tone="light"
              >
                {hub.heroSecondaryCta.label}
              </MagneticButton>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — Before the work / patient difference */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker={hub.patientDiff.kicker}
            title={hub.patientDiff.title}
            highlight={hub.patientDiff.highlight}
            tone="light"
            subtitle={hub.patientDiff.subtitle}
            align="center"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {hub.patientDiff.cards.map((card) => (
              <RevealItem key={card.title} className="h-full">
                <FeatureInfoCard
                  title={card.title}
                  body={card.body}
                  className="h-full"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 3 — Diagnosis / search compare */}
      <Section tone="dark">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <header className="flex max-w-md flex-col items-start gap-4 text-left">
                <SectionHeading
                  kicker={hub.searchCompare.kicker}
                  title={hub.searchCompare.title}
                  highlight={hub.searchCompare.highlight}
                  subtitle={hub.searchCompare.intro}
                />
                <p className="text-body leading-relaxed text-onDark-muted">
                  {hub.searchCompare.closing}
                </p>
              </header>
            </Reveal>

            <RevealGroup className="flex flex-col gap-5 lg:col-span-7">
              {hub.searchCompare.cards.map((card) => (
                <RevealItem key={card.title}>
                  <GlassCard tone="dark" radius="xl" className="flex flex-col gap-3 p-7">
                    <h3 className="font-display text-h4 text-onDark">{card.title}</h3>
                    <p className="text-base text-onDark-muted">{card.body}</p>
                  </GlassCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* 4 — Featured transformation */}
      <Section id="granted-wish" tone="light">
        <Container className="flex flex-col gap-12">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal variant="up">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-card">
                <Image
                  src={hub.transformation.image}
                  alt={hub.transformation.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </Reveal>

            <div className="flex flex-col gap-8">
              <Reveal variant="up" delay={0.06}>
                <div className="flex flex-col gap-4">
                  <SectionHeading
                    kicker={hub.transformation.subtitle}
                    title={hub.transformation.title}
                    highlight={hub.transformation.highlight}
                    tone="light"
                  />
                  <p className="font-display text-h5 font-normal text-pretty text-ink-700">
                    {hub.transformation.intro}
                  </p>
                </div>
              </Reveal>
              <Reveal variant="up" delay={0.1}>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-h4 text-ink-900">
                    {hub.transformation.anchor.title}
                  </h3>
                  <p className="text-body leading-relaxed text-ink-700">
                    {hub.transformation.anchor.body}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex justify-center">
              <Kicker tone="light">{hub.transformation.engineKicker}</Kicker>
            </div>
            <RevealGroup className="grid gap-5 md:grid-cols-2">
              {hub.transformation.engine.map((item) => (
                <RevealItem key={item.title} className="h-full">
                  <FeatureInfoCard title={item.title} body={item.body} className="h-full" />
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal variant="up">
              <p className="text-center text-sm font-medium text-ink-900">
                {hub.transformation.engineClosing}
              </p>
            </Reveal>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="flex max-w-md flex-col items-start gap-5 text-left">
                <SectionHeading
                  kicker={hub.transformation.metricsKicker}
                  title={hub.transformation.metricsTitle}
                  highlight={hub.transformation.metricsHighlight}
                  tone="light"
                />
                <p className="font-display text-h5 font-normal text-pretty text-ink-700">
                  {hub.transformation.metricsIntro}
                </p>
                <p className="text-sm font-medium text-ink-900">
                  {hub.transformation.metricsClosing}
                </p>
                <MagneticButton href={hub.transformation.cta.href} size="md" withMiniOrb>
                  {hub.transformation.cta.label}
                </MagneticButton>
              </div>
            </Reveal>

            <RevealGroup className="flex flex-col gap-5 lg:col-span-7">
              {hub.transformation.metrics.map((metric) => (
                <RevealItem key={metric.title}>
                  <FeatureInfoCard
                    title={metric.title}
                    body={metric.body}
                    className="h-full"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* 5 — Cross-channel routings */}
      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker={hub.routings.subtitle}
            title={hub.routings.title}
            highlight={hub.routings.highlight}
            subtitle={hub.routings.intro}
            align="center"
          />
          <RevealGroup className="flex flex-wrap justify-center gap-3">
            {hub.routings.links.map((link) => (
              <RevealItem key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-pill border border-[#E6EEF1] bg-white px-5 py-2.5 text-sm font-medium text-ink-900 shadow-card transition-colors hover:border-genie-400/50 hover:text-genie-900"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 6 — FAQ */}
      <FaqSection
        items={hub.faqs}
        subtitle={`Common questions about ${hub.name.toLowerCase()} clinic marketing and growth.`}
        idPrefix={`hub-${hub.slug}`}
      />

      {/* 7 — Compliance safeguard */}
      <Section tone="light">
        <Container className="flex flex-col gap-8">
          <SectionHeading
            kicker={hub.compliance.kicker}
            title={hub.compliance.title}
            highlight={hub.compliance.highlight}
            tone="light"
            subtitle={hub.compliance.intro}
            align="center"
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {hub.compliance.points.map((point) => (
              <RevealItem key={point.title} className="h-full">
                <FeatureInfoCard title={point.title} body={point.body} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 8 — Final CTA */}
      <PageFinale backdropClassName="surface-light">
        <PageFinaleCTA
          kicker={hub.finalCta.subtitle}
          title={hub.finalCta.title}
          highlight={hub.finalCta.highlight}
          body={hub.finalCta.body}
          primaryCta={{ href: hub.finalCta.cta.href, label: hub.finalCta.cta.label }}
          secondaryCta={
            hub.finalCta.secondaryCta
              ? { href: hub.finalCta.secondaryCta.href, label: hub.finalCta.secondaryCta.label }
              : undefined
          }
          footnote={hub.finalCta.footnote}
        />
      </PageFinale>
    </>
  );
}
