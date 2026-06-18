import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { SpecialtyHubCard } from "@/components/specialty-hub/SpecialtyHubCard";
import { SPECIALTY_HUBS } from "@/lib/data/specialty-hubs";

export const metadata: Metadata = {
  title: "Specialty Hub — Growth Engines for Specialist Clinics | Clinic Genie",
  description:
    "Specialty-specific marketing systems for Singapore specialist clinics. Explore Clinic Genie's Specialty Hub — growth engines built for your field, from paediatrics to cardiology and beyond.",
};

export default function SpecialtyHubPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-aurora-hero pb-20 pt-36">
        <SparkleField density={38} parallax />
        <OrbAnchor
          id="specialty-hub-index-hero"
          variant="services"
          mood="idle"
          scale={1}
          intensity={0.85}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />
        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-7 pt-12 lg:pt-0">
            <Reveal variant="up">
              <p className="font-display text-kicker uppercase text-genie-300">Specialty Hub</p>
            </Reveal>
            <SectionHeading
              as="h1"
              title="Growth engines built for your specialty."
              highlight="your specialty"
              className="gap-0"
            />
            <Reveal variant="up" delay={0.12}>
              <p className="max-w-xl text-lead text-onDark-muted">
                Every specialty searches differently. Parents, patients, and families each need a different kind of
                trust. Explore the growth systems Clinic Genie has built — and is building — for specialist clinics
                like yours.
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

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Specialist clinics"
            title="Choose your specialty."
            highlight="specialty"
            tone="light"
            subtitle="Each hub is tuned to how patients in your field find, trust, and decide — not a generic marketing package."
            align="center"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SPECIALTY_HUBS.map((hub) => (
              <RevealItem key={hub.slug} className="h-full">
                <SpecialtyHubCard hub={hub} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="dark" className="overflow-hidden">
        <OrbAnchor
          id="specialty-hub-index-cta"
          mood="celebrate"
          scale={1.08}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            kicker="Your specialty not listed yet?"
            title="The magic still works."
            highlight="magic"
            align="center"
          />
          <Reveal variant="up" delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-onDark-muted">
              If patients search for your specialty, we can help them find you. Tell us your wish and we&apos;ll map
              the right growth engine.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.2}>
            <MagneticButton href="/contact" size="lg" withMiniOrb>
              Make your first wish
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
