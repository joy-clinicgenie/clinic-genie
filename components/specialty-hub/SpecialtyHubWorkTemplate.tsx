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
import { ease } from "@/lib/motion";
import type { CaseStudy, CaseStudyCard } from "@/lib/data/portfolio";
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
  backLink = { href: "/specialty-hub", label: "Specialty Hub" },
}: {
  study: CaseStudy;
  image?: string;
  imageAlt?: string;
  backLink?: { href: string; label: string };
}) {
  return (
    <>
      {/* 01 Hero */}
      <section
        data-nav-theme="light"
        className="relative flex min-h-[64vh] items-center overflow-hidden bg-white pb-16 pt-[calc(3.25rem+env(safe-area-inset-top,0px))] text-ink-900 lg:pb-24 lg:pt-36"
      >
        <Image
          src="/specialty-hub/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center lg:object-right"
          sizes="100vw"
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
        />

        <Container className="relative z-10 w-full">
          <div className="flex max-w-3xl flex-col items-start text-left">
            <Link
              href={backLink.href}
              className="mb-5 inline-flex w-fit items-center gap-2 font-sans text-kicker uppercase text-genie-700 transition-colors hover:text-genie-900"
            >
              <span aria-hidden="true">←</span> {backLink.label}
            </Link>

            <p className="font-sans text-kicker uppercase text-genie-700">{study.specialty}</p>

            <h1 className="mt-3 whitespace-pre-line font-display text-h1 text-ink-900">
              {study.heroHighlight && study.heroTitle.includes(study.heroHighlight) ? (
                <>
                  {study.heroTitle.split(study.heroHighlight)[0]}
                  <span className="genie-text">{study.heroHighlight}</span>
                  {study.heroTitle.split(study.heroHighlight).slice(1).join(study.heroHighlight)}
                </>
              ) : (
                study.heroTitle
              )}
            </h1>

            <p className="mt-2 font-display text-[0.9375rem] font-normal text-ink-700 sm:mt-2.5 sm:text-base lg:text-h4">
              {study.name}
            </p>

            {study.tagline ? (
              <p className="mt-2 font-display text-h5 font-normal text-genie-700">
                &ldquo;{study.tagline}&rdquo;
              </p>
            ) : null}

            {study.heroBody ? (
              <div className="mt-4 flex w-full max-w-[90%] flex-col gap-3 sm:mt-5">
                <p className="text-body text-pretty text-ink-700">{study.heroBody}</p>
              </div>
            ) : null}

            <div className="mt-5 flex flex-col items-start gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {(study.serviceTags ?? study.tags).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-pill border border-[#E6EEF1] bg-white px-4 py-2 text-sm font-medium text-ink-900 shadow-card"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center rounded-pill border border-genie-200 bg-genie-50 px-4 py-2 text-sm font-medium text-genie-800">
                {study.result}
              </span>
            </div>
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
