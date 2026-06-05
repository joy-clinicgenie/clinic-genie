import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatTrio } from "@/components/ui/StatTrio";
import { Kicker } from "@/components/ui/Kicker";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { TEAM, TEAM_STATS } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Meet Us — The Minds Behind the Magic",
  description:
    "Meet the Clinic Genie team — strategists, writers, designers and developers who work only with Singapore's specialist clinics. Healthcare-only, compliance-aware, results-driven.",
};

/** A short, on-brand value line per role family, threaded under each card. */
const VALUES = [
  {
    title: "We only do clinics.",
    body:
      "No retail, no SaaS, no side projects. Every strategy, every line of copy and every page we ship is built for a specialist clinic — so the work compounds instead of starting from scratch.",
  },
  {
    title: "Compliance is built in.",
    body:
      "Ambitious marketing, responsibly delivered. We write and ship with PHMC/HCSA advertising guidelines in mind from the first draft — never as an afterthought that dulls the message.",
  },
  {
    title: "We report in plain English.",
    body:
      "No vanity dashboards. We measure what moves a clinic — qualified enquiries, cost-per-enquiry, rankings that matter — and we tell you the truth, in numbers you can act on.",
  },
];

export default function MeetUsPage() {
  return (
    <>
      {/* 1 — Hero (dark, conjuring) */}
      <Section
        tone="dark"
        className="bg-aurora-hero overflow-hidden relative pt-36 pb-20 min-h-[68vh] flex items-center"
      >
        <SparkleField density={32} parallax />
        <OrbAnchor
          id="team-hero"
          variant="about"
          mood="curious"
          scale={1}
          intensity={0.85}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />
        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-7">
            <SectionHeading
              as="h1"
              kicker="Meet the team"
              title="The minds behind the magic."
              highlight="magic"
              subtitle="Strategists, writers, designers and developers who only do clinics."
            />
            <Reveal delay={0.2}>
              <MagneticButton href="/contact" size="lg" withMiniOrb>
                Book a strategy call
              </MagneticButton>
            </Reveal>
          </div>
        </Container>
        {/* fade into next (light) section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
        />
      </Section>

      {/* 2 — The team grid (light, clarity) */}
      <Section tone="light">
        <Container size="wide" className="flex flex-col gap-12">
          <SectionHeading
            kicker="The genie's circle"
            title="A small team that goes deep on clinics."
            highlight="deep"
            tone="light"
            align="center"
            subtitle="Six specialists, one focus. The people who turn your expertise into a presence patients can find, believe and book."
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <RevealItem key={member.name} className="h-full">
                <GlassCard
                  tone="light"
                  radius="2xl"
                  hover
                  className="flex h-full flex-col gap-5 p-7"
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-genie-400 to-genie-700 font-display text-xl font-semibold text-white shadow-glow-sm"
                    >
                      {member.name.charAt(0)}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-display text-lg font-semibold text-ink-900">
                        {member.name}
                      </span>
                      <span className="text-sm font-medium text-genie-700">{member.role}</span>
                    </div>
                  </div>
                  <p className="text-pretty text-ink-700">{member.bio}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 3 — Culture / values band (dark, conjuring) */}
      <Section tone="dark">
        <OrbAnchor
          id="values"
          mood="thinking"
          scale={0.85}
          intensity={0.9}
          className="absolute left-1/2 top-20 hidden h-px w-px -translate-x-1/2 lg:block"
        />
        <Container size="wide" className="flex flex-col gap-12">
          <SectionHeading
            kicker="How we work"
            title="What it means to be clinic-only."
            highlight="clinic-only"
            align="center"
            subtitle="The same beliefs run through every engagement — the reason serious clinic owners trust us with their growth."
          />
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {VALUES.map((value, i) => (
              <RevealItem key={value.title} className="h-full">
                <GlassCard tone="dark" radius="2xl" className="flex h-full flex-col gap-4 p-7">
                  <span className="font-mono text-kicker uppercase tracking-[0.18em] text-genie-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-h3 text-onDark">{value.title}</h3>
                  <p className="text-pretty text-onDark-muted">{value.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 4 — By the numbers (light, clarity) */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="By the numbers"
            title="A specialist team, measured by what we move."
            highlight="move"
            tone="light"
            align="center"
            subtitle="Healthcare-only since day one, based in Singapore, accountable to outcomes that matter to clinics."
          />
          <StatTrio stats={TEAM_STATS} tone="light" />
        </Container>
      </Section>

      {/* 5 — Final CTA (dark, celebrate) */}
      <Section tone="dark" className="overflow-hidden">
        <OrbAnchor
          id="meet-cta"
          mood="celebrate"
          scale={1.08}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <Kicker>Make your first wish</Kicker>
          <h2 className="text-h2 font-display text-balance text-onDark">
            Let&apos;s make your clinic the one patients <span className="genie-text">trust</span>.
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-onDark-muted">
              Book a free 30-minute strategy call and meet the people who will work on your clinic.
              We&apos;ll map where the right patients are searching — and exactly how to win them.
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
