"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { LandingIntro, LandingKicker } from "@/components/home/landing/LandingLayout";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
import { ease } from "@/lib/motion";
import type { CaseStudy, CaseStudyCard } from "@/lib/data/portfolio";
import { formatPortfolioCaseLabel } from "@/lib/data/portfolio-works";
import alliesStyles from "@/components/home/landing/AlliesCards.module.css";

function splitSpecialtyLines(specialty: string): string[] {
  const parts = specialty.split(/\s*\+\s*/).map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) return parts;
  return [parts[0]!, ...parts.slice(1).map((part) => `+ ${part}`)];
}

function renderHeroLine(line: string, highlight?: string) {
  if (!highlight || !line.includes(highlight)) {
    return line;
  }

  const [before, ...rest] = line.split(highlight);
  const after = rest.join(highlight);

  return (
    <>
      {before}
      <span className="genie-text">{highlight}</span>
      {after}
    </>
  );
}

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

function DiagnosisLensesSection({
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
    <Section tone="dark" className="bg-[#062D36] py-24 text-onDark md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <LandingIntro
            light
            kicker="Clinic Genie diagnosis"
            title="Four lenses. One clearer picture."
            highlight="clearer picture"
            subtitle={intro}
          />
        </Reveal>

        <div className="relative">
          <motion.div
            className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduced ? 0 : 0.1 } },
            }}
          >
            {lenses.map((lens) => (
              <motion.div
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
                <div className="relative z-[2] flex flex-1 flex-col gap-2 px-5 py-5 sm:px-8 sm:py-6">
                  <h3 className="font-display text-base font-semibold text-onDark">
                    {lens.title}
                  </h3>
                  <p className="text-body leading-relaxed text-onDark-muted">{lens.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

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

const SNAPSHOT_KICKER =
  "border-white/40 bg-white/30 text-white";

function SnapshotItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt>
        <Kicker tone="dark" className={SNAPSHOT_KICKER}>
          {label}
        </Kicker>
      </dt>
      <dd className="text-sm leading-relaxed text-onDark-muted sm:text-base">{value}</dd>
    </div>
  );
}

export function SpecialtyHubWorkTemplate({
  study,
  image = "/works/joyfulseeds.png",
  imageAlt,
  logo,
  logoAlt,
  backLink = { href: "/specialty-hub", label: "Clinic Specialties" },
}: {
  study: CaseStudy;
  image?: string;
  imageAlt?: string;
  logo?: string;
  logoAlt?: string;
  backLink?: { href: string; label: string };
}) {
  const caseLabel = formatPortfolioCaseLabel(study.slug, study.name);
  const specialtyLines = splitSpecialtyLines(study.specialty);
  const projectScope = study.projectScope ?? [];
  const projectArchitecture = study.projectArchitecture ?? [];

  return (
    <>
      {/* 01 Hero */}
      <section
        data-nav-theme="light"
        className="relative flex min-h-[64vh] items-center overflow-hidden bg-white pb-16 pt-[calc(3.25rem+env(safe-area-inset-top,0px))] text-ink-900 lg:pb-24 lg:pt-36"
      >
        <ParallaxBackground
          src="/specialty-hub/hero-bg.png"
          priority
          imageClassName="object-cover object-[30%_center] lg:object-[18%_center] lg:-translate-x-[4%]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
          />
        </ParallaxBackground>

        <Container className="relative z-10 w-full">
          <div className="flex w-full max-w-content flex-col items-stretch text-left">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <Link
                href={backLink.href}
                className="inline-flex w-fit items-center gap-2 font-sans text-kicker uppercase text-genie-700 transition-colors hover:text-genie-900"
              >
                <span aria-hidden="true">←</span> {backLink.label}
              </Link>
              {caseLabel ? (
                <p className="font-sans text-kicker uppercase text-genie-700">{caseLabel}</p>
              ) : null}
            </div>

            <div className="mt-10 flex flex-col gap-0.5 sm:mt-12">
              {specialtyLines.map((line) => (
                <p key={line} className="font-sans text-kicker uppercase text-genie-700">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-start lg:gap-12">
              <div className="flex shrink-0 flex-col gap-3">
                {logo ? (
                  <div className="relative h-12 w-48 sm:h-14 lg:w-56">
                    <Image
                      src={logo}
                      alt={logoAlt ?? study.name}
                      fill
                      className="object-contain object-left"
                      sizes="14rem"
                      priority
                    />
                  </div>
                ) : null}
                <p className="whitespace-nowrap font-display text-xs font-semibold uppercase leading-snug tracking-wide text-ink-700 sm:text-sm">
                  {study.name}
                </p>
              </div>
              <h1 className="max-w-prose font-display text-h1 font-semibold leading-none tracking-tight text-ink-900 lg:text-display">
                {renderHeroLine(study.line, study.heroHighlight)}
              </h1>
            </div>

            {projectScope.length > 0 || projectArchitecture.length > 0 ? (
              <div className="mt-12 grid gap-10 border-t border-[#E6EEF1] pt-8 sm:mt-14 lg:grid-cols-2 lg:gap-16">
                {projectScope.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    <p className="font-sans text-kicker uppercase text-genie-700">Project Scope</p>
                    <div className="flex flex-col gap-1">
                      {projectScope.map((line) => (
                        <p key={line} className="font-display text-h6 font-semibold text-ink-900">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}

                {projectArchitecture.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    <p className="font-sans text-kicker uppercase text-genie-700">Project Architecture</p>
                    <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
                      {projectArchitecture.map((metric) => (
                        <div key={`${metric.value}-${metric.label}`} className="flex flex-col gap-1">
                          <dt className="sr-only">{metric.label}</dt>
                          <dd className="flex flex-col gap-1">
                            <span className="font-display text-h2 font-semibold tabular-nums leading-none text-ink-900">
                              {metric.value}
                            </span>
                            <span className="font-sans text-xs leading-snug text-ink-700">
                              {metric.label}
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* 02 Project snapshot */}
      <Section tone="dark" className="bg-cg-teal-20 py-12 [background-image:none] md:py-16">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            kicker="Project snapshot"
            title="The brief at a glance."
            highlight="glance"
            className="gap-3"
          />
          <Reveal variant="up">
            <dl className="grid gap-5 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6">
              <SnapshotItem label="Clinic type" value={study.snapshot.clinicType} />
              <SnapshotItem label="Project focus" value={study.snapshot.projectFocus} />
              <SnapshotItem label="Main challenge" value={study.snapshot.mainChallenge} />
              <SnapshotItem label="Clinic Genie role" value={study.snapshot.role} />
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* 03 Before the work */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Before the work"
            title="What stood in the way."
            highlight="way"
            tone="light"
            subtitle={study.beforeIntro}
            align="center"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {study.before.map((card) => (
              <RevealItem key={card.title} className="h-full">
                <FeatureInfoCard title={card.title} body={card.body} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 04 Clinic Genie diagnosis — Allies-style band */}
      <DiagnosisLensesSection
        intro={study.diagnosisIntro}
        body={study.diagnosisBody}
        lenses={study.diagnosisLenses}
      />

      {/* 05 What we worked on */}
      <Section id="granted-wish" tone="light">
        <Container className="flex flex-col gap-12">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal variant="up">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-card">
                <Image
                  src={image}
                  alt={imageAlt ?? `${study.name} branding and website`}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </Reveal>
            <Reveal variant="up" delay={0.06}>
              <SectionHeading
                kicker="What we worked on"
                title="The work behind the clearer journey."
                highlight="clearer journey"
                tone="light"
                subtitle={study.workedOnIntro}
              />
            </Reveal>
          </div>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {study.workedOn.map((item, index) => (
              <RevealItem key={item.title} className="h-full">
                <GlassCard
                  tone="light"
                  radius="2xl"
                  className="flex h-full flex-col gap-4 p-6 sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-genie-500/15 font-sans text-sm font-semibold text-genie-700"
                  >
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-[1.125rem] font-semibold leading-snug text-ink-900">
                      {item.title}
                    </h3>
                    <p className="text-pretty text-body leading-relaxed text-ink-700">
                      {item.body}
                    </p>
                  </div>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 06 Strategy system */}
      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Strategy system"
            title="One connected patient discovery system."
            highlight="discovery system"
            subtitle={study.strategyIntro}
            align="center"
          />
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-2 hidden grid-cols-[1fr_auto_1fr] items-center gap-6 md:grid">
              <Kicker tone="dark">Before</Kicker>
              <span aria-hidden="true" className="w-8" />
              <Kicker tone="dark">After</Kicker>
            </div>
            <RevealGroup className="flex flex-col divide-y divide-white/15 border-y border-white/15">
              {study.strategyShifts.map((shift) => (
                <RevealItem key={shift.before}>
                  <div className="grid items-start gap-4 py-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6 md:py-7">
                    <div className="flex flex-col gap-2">
                      <Kicker tone="dark" className="md:hidden">
                        Before
                      </Kicker>
                      <p className="text-base leading-relaxed text-onDark-muted">
                        {shift.before}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="hidden font-display text-lg text-[#9FDCE8] md:block"
                    >
                      →
                    </span>
                    <div className="flex flex-col gap-2">
                      <Kicker tone="dark" className="md:hidden">
                        After
                      </Kicker>
                      <p className="text-base font-medium leading-relaxed text-onDark">
                        {shift.after}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* 07 Patient journey map */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Patient journey map"
            title="From search to enquiry, mapped with intent."
            highlight="mapped with intent"
            tone="light"
            subtitle={study.journeyIntro}
            align="center"
          />

          <Reveal variant="up">
            <ol
              className="flex flex-wrap items-center justify-center gap-3"
              aria-label="Patient journey stages"
            >
              {study.journey.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2.5 rounded-pill border border-[#E6EEF1] bg-white px-4 py-2 text-sm font-medium text-ink-900 shadow-card">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-genie-500/15 font-sans text-xs font-semibold text-genie-700"
                    >
                      {i + 1}
                    </span>
                    {step}
                  </span>
                  {i < study.journey.flow.length - 1 ? (
                    <span aria-hidden="true" className="text-ink-400">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-2 hidden grid-cols-[1fr_auto_1fr] items-center gap-6 md:grid">
              <Kicker tone="light">Old</Kicker>
              <span aria-hidden="true" className="w-8" />
              <Kicker tone="light">New</Kicker>
            </div>
            <Reveal variant="up">
              <div className="grid items-start gap-4 border-y border-[#E6EEF1] py-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6 md:py-7">
                <div className="flex flex-col gap-2">
                  <Kicker tone="light" className="md:hidden">
                    Old
                  </Kicker>
                  <p className="text-base leading-relaxed text-ink-700">
                    {study.journey.websiteMap.old}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden font-display text-lg text-genie-600 md:block"
                >
                  →
                </span>
                <div className="flex flex-col gap-2">
                  <Kicker tone="light" className="md:hidden">
                    New
                  </Kicker>
                  {Array.isArray(study.journey.websiteMap.new) ? (
                    <ol className="flex flex-col gap-2.5" aria-label="New website path">
                      {study.journey.websiteMap.new.map((step, i) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 text-base font-medium leading-relaxed text-ink-900"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-genie-500/15 font-sans text-xs font-semibold text-genie-700"
                          >
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-base font-medium leading-relaxed text-ink-900">
                      {study.journey.websiteMap.new}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 08 Key deliverables */}
      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Key deliverables"
            title={study.deliverablesTitle ?? "Wishes granted."}
            highlight={study.deliverablesHighlight ?? "granted"}
            subtitle={study.deliverablesIntro}
            align="center"
          />
          <RevealGroup className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
            {study.deliverables.map((item) => (
              <RevealItem key={item} className="w-full sm:w-[calc(50%-0.5rem)]">
                <GlassCard tone="dark" radius="xl" className="flex h-full items-center justify-center p-6 text-center">
                  <p className="text-base font-medium text-onDark">{item}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 09 Compliance — homepage ComplianceCards pattern */}
      <Section tone="light" className="py-24 md:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <LandingIntro
              kicker="Built for responsible healthcare marketing"
              title="Clarity without overclaiming."
              highlight="overclaiming"
              subtitle={study.complianceIntro}
            />
          </Reveal>

          <div className="relative left-1/2 w-screen -translate-x-1/2 px-[var(--page-pad)]">
            <RevealGroup className="mx-auto grid w-full max-w-[96rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {study.compliancePoints.map((point) => (
                <RevealItem key={point.title} className="flex h-full min-w-0">
                  <FeatureInfoCard
                    title={point.title}
                    body={point.body}
                    image={point.image}
                    alt={point.alt}
                    compact
                    className="h-full min-h-0"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal delay={0.08}>
            <div className="flex justify-center">
              <MagneticButton href="/services#compliance" size="md" withMiniOrb>
                How We Keep You Compliant
              </MagneticButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 10 What changed — pillar mechanics layout */}
      <section
        id="what-changed"
        data-nav-theme="dark"
        className="scroll-mt-24 bg-night-800 py-20 text-onDark md:py-28"
      >
        <div className="relative left-1/2 w-screen -translate-x-1/2 px-[var(--page-pad)]">
          <div className="mx-auto grid w-full max-w-[96rem] gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <Reveal className="lg:col-span-4">
              <header className="flex max-w-md flex-col items-start gap-4 text-left">
                <LandingKicker light align="left">
                  What changed
                </LandingKicker>
                <h2 className="font-display text-h2 text-balance text-white">
                  {study.changesTitle ?? "What the clinic can now measure."}
                </h2>
                {study.changesLead ? (
                  <p className="text-body leading-relaxed text-white">{study.changesLead}</p>
                ) : null}
                {study.changesIntro ? (
                  <p className="text-body leading-relaxed text-onDark-muted">
                    {study.changesIntro}
                  </p>
                ) : null}
              </header>
            </Reveal>

            <RevealGroup className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
              {study.changes.map((change) => (
                <RevealItem key={change.title}>
                  <article className="flex flex-col items-start">
                    <h3 className="font-display text-[1.125rem] font-semibold leading-snug text-white">
                      {change.title}
                    </h3>
                    {change.body ? (
                      <p className="mt-2 text-body leading-relaxed text-onDark-muted">
                        {change.body}
                      </p>
                    ) : null}
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* 11 Final CTA */}
      <PageFinale backdropClassName="bg-night-800">
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Want a clearer patient journey for your clinic?"
          highlight="clearer patient journey"
          body="Book a strategy call. We will map how patients find, understand, and enquire with your clinic, then show you where Clinic Genie can help."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          secondaryCta={{ href: "/portfolio", label: "See Our Work" }}
          footnote="No obligation. No jargon. Just a clear next step."
        />
      </PageFinale>
    </>
  );
}
