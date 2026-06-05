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
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { CASE_STUDIES, getCaseStudy } from "@/lib/data/portfolio";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) {
    return {
      title: "Case study not found | Clinic Genie",
      description: "The case study you're looking for couldn't be conjured.",
    };
  }
  return {
    title: `${cs.name} — Case Study | Clinic Genie`,
    description: `${cs.line} ${cs.result}.`,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  // Other works for the "More works" strip (exclude the current study).
  const others = CASE_STUDIES.filter((c) => c.slug !== cs.slug).slice(0, 3);

  return (
    <>
      {/* 1 — Case hero (carries the portfolio orb variant) */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-aurora-hero pb-20 pt-36">
        <SparkleField density={34} parallax />
        <OrbAnchor
          id="case-hero"
          variant="portfolio"
          mood="idle"
          scale={0.95}
          intensity={0.85}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />

        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-7 pt-24 lg:pt-0">
            <Reveal variant="up">
              <Link
                href="/portfolio"
                className="inline-flex w-fit items-center gap-2 font-mono text-kicker uppercase text-genie-300 transition-colors hover:text-white"
              >
                <span aria-hidden="true">←</span> Our works
              </Link>
            </Reveal>

            <Reveal variant="up" delay={0.04}>
              <Kicker>{cs.specialty}</Kicker>
            </Reveal>

            <Reveal variant="up" delay={0.08} className="overflow-hidden">
              <h1 className="text-h1 font-display text-balance text-onDark">{cs.name}</h1>
            </Reveal>

            {cs.tagline && (
              <Reveal variant="up" delay={0.12}>
                <p className="font-display text-h3 text-pretty">
                  <span className="genie-text">{cs.tagline}</span>
                </p>
              </Reveal>
            )}

            <Reveal variant="up" delay={0.16}>
              <p className="max-w-xl text-lead text-onDark-muted">{cs.line}</p>
            </Reveal>

            <RevealGroup className="flex flex-wrap gap-2.5" stagger={0.06}>
              {cs.tags.map((tag) => (
                <RevealItem key={tag}>
                  <span className="glass inline-flex items-center rounded-pill border border-white/10 px-4 py-2 text-sm font-medium text-onDark">
                    {tag}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal variant="up" delay={0.24}>
              <p
                className="inline-flex w-fit items-center rounded-pill px-5 py-2.5 text-base font-semibold text-onDark"
                style={{
                  background: `${cs.accent}1f`,
                  boxShadow: `0 0 0 1px ${cs.accent}55 inset, 0 0 28px -8px ${cs.accent}`,
                }}
              >
                {cs.result}
              </p>
            </Reveal>
          </div>
        </Container>

        {/* fade into next section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
        />
      </section>

      {/* 2 — The Challenge (clarity register) */}
      <Section tone="light">
        <Container size="prose" className="flex flex-col gap-6">
          <SectionHeading
            kicker="The challenge"
            title="What stood in the way."
            highlight="way"
            tone="light"
          />
          <Reveal variant="up" delay={0.1}>
            <p className="text-lead text-ink-700">{cs.challenge}</p>
          </Reveal>
        </Container>
      </Section>

      {/* 3 — What we did (conjuring register) */}
      <Section tone="dark">
        <OrbAnchor
          id="case-approach"
          mood="thinking"
          scale={0.82}
          intensity={0.85}
          className="absolute right-[6%] top-24 hidden h-px w-px lg:block"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="What we did"
            title="How we conjured the result."
            highlight="conjured"
            subtitle="Strategy, brand, web and search — woven together for this clinic, never bolted on in isolation."
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2">
            {cs.approach.map((step, i) => (
              <RevealItem key={step.label} className="h-full">
                <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold text-night-900"
                      style={{ background: cs.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-h3 text-onDark">{step.label}</h3>
                  </div>
                  <p className="text-base text-onDark-muted">{step.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 4 — The Results (big stat tiles, conjuring register) */}
      <Section tone="dark">
        <OrbAnchor
          id="case-results"
          mood="celebrate"
          scale={0.9}
          intensity={0.95}
          className="absolute left-1/2 top-20 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="The results"
            title="Outcomes the numbers can prove."
            highlight="prove"
            align="center"
            subtitle="Every figure earned within Singapore's healthcare advertising rules."
          />
          <RevealGroup
            className={
              cs.results.length === 4
                ? "grid gap-5 sm:grid-cols-2"
                : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {cs.results.map((r) => (
              <RevealItem key={r} className="h-full">
                <GlassCard
                  tone="dark"
                  radius="2xl"
                  glow
                  hover
                  className="relative flex h-full flex-col justify-center overflow-hidden p-8 text-center"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
                    style={{ background: `${cs.accent}33` }}
                  />
                  <span className="relative font-display text-h3 leading-tight text-onDark">{r}</span>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 5 — Pull-quote (clarity register) */}
      <Section tone="light">
        <Container size="prose">
          <Reveal variant="up">
            <figure className="flex flex-col items-center gap-7 text-center">
              <span
                aria-hidden="true"
                className="font-display text-7xl leading-none text-genie-300"
              >
                &ldquo;
              </span>
              <blockquote className="-mt-8 font-display text-h3 text-balance text-ink-900">
                {cs.quote.text}
              </blockquote>
              <figcaption className="font-mono text-kicker uppercase text-genie-700">
                {cs.quote.author}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* 6 — What's next (optional, conjuring register) */}
      {cs.next && (
        <Section tone="dark">
          <OrbAnchor
            id="case-next"
            mood="curious"
            scale={0.8}
            intensity={0.8}
            className="absolute right-[8%] top-1/2 hidden h-px w-px lg:block"
          />
          <Container size="content" className="flex flex-col gap-6">
            <SectionHeading
              kicker="What's next"
              title="The wish keeps growing."
              highlight="growing"
            />
            <Reveal variant="up" delay={0.1}>
              <p className="max-w-2xl text-lead text-onDark-muted">{cs.next}</p>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* 7 — More works strip (clarity register) */}
      <Section tone="light">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              kicker="Wishes already granted"
              title="More works."
              highlight="works"
              tone="light"
            />
            <MagneticButton href="/portfolio" variant="ghost" className="text-genie-700 hover:text-genie-900">
              See all works →
            </MagneticButton>
          </div>
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {others.map((o) => (
              <RevealItem key={o.slug} className="h-full">
                <Link
                  href={`/portfolio/${o.slug}`}
                  className="group block h-full"
                  aria-label={`Read the ${o.name} case study`}
                >
                  <GlassCard
                    tone="light"
                    radius="xl"
                    hover
                    className="flex h-full flex-col gap-4 p-7"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-10 rounded-full"
                      style={{ background: o.accent }}
                    />
                    <p className="font-mono text-kicker uppercase text-genie-700">{o.specialty}</p>
                    <h3 className="font-display text-h3 text-ink-900">{o.name}</h3>
                    <p className="text-sm text-ink-700">{o.line}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-genie-700 transition-colors group-hover:text-genie-900">
                      Read the case study
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </GlassCard>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 8 — Final CTA (conjuring register, orb flare) */}
      <Section tone="dark" className="overflow-hidden">
        <OrbAnchor
          id="case-cta"
          mood="celebrate"
          scale={1.1}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            kicker="Make your first wish"
            title="Want results like these?"
            highlight="results"
            align="center"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-onDark-muted">
              Book a free 30-minute strategy call. We&apos;ll map where the right patients are searching — and exactly
              how to make your clinic the one they trust.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticButton href="/contact" size="lg" withMiniOrb>
              Book a strategy call
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-sm text-onDark-faint">No obligation. No jargon. Just a clear next step.</p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
