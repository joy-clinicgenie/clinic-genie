import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { CORE_PILLARS } from "@/lib/data/pillars";

export const metadata: Metadata = {
  title: "Core Service Pillars — The Full Clinic Genie Toolkit | Clinic Genie",
  description:
    "Eight core service pillars that grow specialist clinics: FindClinic.sg, Healthcare SEO, Medical SEM, Branding & Copywriting, Web Design & Development, Photo & Video, Social Media, and GEO & AI Search.",
};

export default function CorePillarsPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-aurora-hero pb-20 pt-36">
        <SparkleField density={38} parallax />
        <OrbAnchor
          id="pillars-hero"
          variant="services"
          mood="idle"
          scale={1}
          intensity={0.85}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />
        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-7 pt-12 lg:pt-0">
            <Reveal variant="up">
              <Link
                href="/services"
                className="inline-flex w-fit items-center gap-2 font-mono text-kicker uppercase text-genie-300 transition-colors hover:text-white"
              >
                <span aria-hidden="true">←</span> Services
              </Link>
            </Reveal>
            <Reveal variant="up" delay={0.04}>
              <Kicker>Core service pillars</Kicker>
            </Reveal>
            <SectionHeading
              as="h1"
              title="Eight pillars. One growth engine."
              highlight="growth engine"
              className="gap-0"
            />
            <Reveal variant="up" delay={0.12}>
              <p className="max-w-xl text-lead text-onDark-muted">
                Every core service we offer, built to work together. Explore each pillar to see exactly how it helps your
                clinic get discovered, understood, and trusted by the right patients.
              </p>
            </Reveal>
            <Reveal variant="up" delay={0.2}>
              <MagneticButton href="/contact" size="lg" withMiniOrb>
                Book a strategy call
              </MagneticButton>
            </Reveal>
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
        />
      </section>

      {/* 2 — Pillar grid */}
      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="The toolkit"
            title="Choose where your clinic needs the most magic."
            highlight="magic"
            subtitle="Each pillar stands on its own — and works even harder alongside the others."
            align="center"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CORE_PILLARS.map((pillar, i) => (
              <RevealItem key={pillar.slug} className="h-full">
                <Link
                  href={`/services/core-pillars/${pillar.slug}`}
                  className="group block h-full"
                  aria-label={`Explore ${pillar.name}`}
                >
                  <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold text-night-900"
                        style={{ background: pillar.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-h4 text-onDark">{pillar.name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-onDark-muted">{pillar.heroTitle}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-genie-300 transition-colors group-hover:text-white">
                      Explore pillar
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

      {/* 3 — Final CTA */}
      <Section tone="light" className="overflow-hidden">
        <OrbAnchor
          id="pillars-cta"
          mood="celebrate"
          scale={1.08}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            kicker="Not sure where to start?"
            title="Tell us your wish."
            highlight="wish"
            tone="light"
            align="center"
          />
          <Reveal variant="up" delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-ink-700">
              Book a free strategy call and we&apos;ll recommend the right mix of pillars for your clinic — no hard sell.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.2}>
            <MagneticButton href="/contact" size="lg" withMiniOrb>
              Book a strategy call
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
