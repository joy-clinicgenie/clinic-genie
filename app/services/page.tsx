import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { PILLARS, PROCESS_STEPS } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services — Strategy, Digital Growth & Brand for Clinics | Clinic Genie",
  description:
    "Everything your clinic needs to grow under one lamp: business strategy, healthcare SEO and medical SEM, clinic websites, content, AI search and compliance-aware brand design — by a team that only works with clinics.",
};

const WISH_LABELS = ["Wish One", "Wish Two", "Wish Three"];
const PILLAR_MOODS = ["focus", "thinking", "idle"] as const;

const SPECIALTIES = [
  "Aesthetics & dermatology",
  "Dental",
  "Fertility & women's health",
  "Orthopaedics & sports medicine",
  "ENT",
  "Other private specialists",
];

export default function ServicesPage() {
  return (
    <>
      {/* 1 — Hero (dark, sets orb variant) */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-aurora-hero pb-20 pt-36">
        <SparkleField density={38} parallax />
        <OrbAnchor
          id="services-hero"
          variant="services"
          mood="idle"
          scale={1}
          intensity={0.85}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />
        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-7 pt-16 lg:pt-0">
            <Reveal variant="up">
              <Kicker>What we do</Kicker>
            </Reveal>
            <SectionHeading
              as="h1"
              title="Everything your clinic needs to grow — under one lamp."
              highlight="grow"
              className="gap-0"
            />
            <Reveal variant="up" delay={0.12}>
              <p className="max-w-xl text-lead text-onDark-muted">
                Strategy, digital growth and brand design, woven into one engine. Healthcare SEO, medical SEM, clinic
                websites, content, AI search and compliance-aware strategy — delivered by a team that only works with
                clinics.
              </p>
            </Reveal>
            <Reveal variant="up" delay={0.2}>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href="/contact" size="lg" withMiniOrb>
                  Book a strategy call
                </MagneticButton>
                <MagneticButton href="#strategy" size="lg" variant="secondary">
                  See the three wishes
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

      {/* 2,3,4 — One detailed section per pillar (the three wishes) */}
      {PILLARS.map((pillar, i) => {
        const tone = i % 2 === 0 ? "dark" : "light";
        const isDark = tone === "dark";
        const forwardLine =
          pillar.id === "growth"
            ? "And we optimise for AI search too — so your clinic shows up when patients ask an AI, not just a search bar."
            : null;

        return (
          <Section key={pillar.id} id={pillar.id} tone={tone}>
            {isDark && (
              <OrbAnchor
                id={`pillar-${pillar.id}`}
                mood={PILLAR_MOODS[i]}
                scale={0.85}
                intensity={0.9}
                className="absolute right-[10%] top-24 hidden h-px w-px lg:block"
              />
            )}
            <Container className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <Reveal variant="up">
                  <p className="flex items-center gap-3 font-mono text-kicker uppercase">
                    <span
                      className="inline-grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold text-night-950"
                      style={{ backgroundColor: pillar.accent }}
                      aria-hidden="true"
                    >
                      {pillar.number}
                    </span>
                    <span className={isDark ? "text-genie-300" : "text-genie-700"}>{WISH_LABELS[i]}</span>
                  </p>
                </Reveal>
                <Reveal variant="up" delay={0.05}>
                  <p
                    className={`max-w-2xl font-display text-h4 italic text-pretty ${
                      isDark ? "text-onDark/90" : "text-ink-900/85"
                    }`}
                  >
                    &ldquo;{pillar.wish}&rdquo;
                  </p>
                </Reveal>
                <SectionHeading
                  as="h2"
                  title={pillar.title}
                  tone={tone}
                  subtitle={pillar.intro}
                  className="mt-2"
                />
              </div>

              <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {pillar.services.map((service) => (
                  <RevealItem key={service.name} className="h-full">
                    <GlassCard
                      tone={isDark ? "dark" : "light"}
                      radius="xl"
                      hover
                      className="flex h-full flex-col gap-3 p-7"
                    >
                      <span
                        className="h-1 w-10 rounded-full"
                        style={{ backgroundColor: pillar.accent }}
                        aria-hidden="true"
                      />
                      <h3 className={`font-display text-h4 ${isDark ? "text-onDark" : "text-ink-900"}`}>
                        {service.name}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-onDark-muted" : "text-ink-700"}`}>
                        {service.body}
                      </p>
                    </GlassCard>
                  </RevealItem>
                ))}
              </RevealGroup>

              {forwardLine && (
                <Reveal variant="up">
                  <p className={`max-w-2xl text-base ${isDark ? "text-onDark-muted" : "text-ink-700"}`}>
                    {forwardLine}
                  </p>
                </Reveal>
              )}

              <Reveal variant="up">
                <p
                  className={`flex items-start gap-3 text-lead ${isDark ? "text-genie-200" : "text-genie-800"}`}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-current shadow-glow-sm"
                  />
                  <span>
                    <span className="font-mono text-xs uppercase tracking-wider opacity-70">The outcome</span>
                    <br />
                    {pillar.outcome}
                  </span>
                </p>
              </Reveal>
            </Container>
          </Section>
        );
      })}

      {/* 5 — Expanded process */}
      <Section tone="dark" id="process">
        <OrbAnchor
          id="process-guide"
          mood="thinking"
          scale={0.85}
          intensity={0.9}
          className="absolute left-1/2 top-20 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col gap-14">
          <SectionHeading
            kicker="The engagement"
            title="How an engagement works."
            highlight="works"
            subtitle="Three moves, fully transparent. Each one ends with something real in your hands — and compliance reviewed at every step."
            align="center"
          />
          <ProcessSteps steps={PROCESS_STEPS} />
        </Container>
      </Section>

      {/* 6 — Who we work with */}
      <Section tone="light">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            kicker="Who we work with"
            title="Built for specialist clinics."
            highlight="specialist"
            tone="light"
            subtitle="Aesthetics & dermatology, dental, fertility & women's health, orthopaedics & sports medicine, ENT, and other private specialist practices across Singapore. If your patients search before they book, we can help."
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALTIES.map((specialty) => (
              <RevealItem key={specialty}>
                <div className="glass-light flex items-center gap-3 rounded-xl p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-genie-100 text-genie-700">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 8.5l3 3 7-7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink-900">{specialty}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 7 — Compliance strip */}
      <Section tone="dark">
        <OrbAnchor
          id="compliance"
          mood="idle"
          scale={0.8}
          intensity={0.85}
          className="absolute right-[12%] top-1/2 hidden h-px w-px lg:block"
        />
        <Container className="max-w-prose">
          <SectionHeading
            kicker="Compliance, handled"
            title="Ambitious growth, responsibly delivered."
            highlight="responsibly"
            as="h2"
          />
          <Reveal variant="up" delay={0.1}>
            <p className="mt-6 text-lead text-onDark-muted">
              Every word we publish is written with Singapore&apos;s healthcare advertising guidelines (PHMC/HCSA) in
              mind, and reviewed with your team. Growth should never put your licence at risk.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 8 — Final CTA */}
      <Section tone="light" className="overflow-hidden">
        <OrbAnchor
          id="services-cta"
          mood="celebrate"
          scale={1.08}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            kicker="Make your first wish"
            title="Tell us your wish."
            highlight="wish"
            tone="light"
            align="center"
          />
          <Reveal variant="up" delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-ink-700">
              Book a free strategy call and we&apos;ll recommend the right mix for your clinic — no hard sell.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.2}>
            <MagneticButton href="/contact" size="lg" withMiniOrb>
              Book a strategy call
            </MagneticButton>
          </Reveal>
          <Reveal variant="up" delay={0.3}>
            <p className="text-sm text-ink-500">No obligation. No jargon. Just a clear next step.</p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
