import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatTrio } from "@/components/ui/StatTrio";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { PartnerStrip } from "@/components/ui/PartnerStrip";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { PROCESS_STEPS } from "@/lib/data/services";
import { PARTNERS } from "@/lib/data/partners";
import { TEAM_STATS } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "About Clinic Genie | The Marketing Agency Built Only for Clinics",
  description:
    "Clinic Genie is a Singapore creative and marketing agency built for one thing only — helping private and specialist medical clinics grow with strategy, data and a little magic.",
};

const VALUES = [
  {
    title: "Evidence over ego",
    body: "We don't guess what works. We research your market and let the data lead — just like good medicine.",
    accent: "#6CBAD9",
  },
  {
    title: "Compliance as craft",
    body: "Bold growth and clean advertising aren't a trade-off. We design for both, aligned to Singapore's healthcare advertising guidelines.",
    accent: "#8E7BE8",
  },
  {
    title: "Specialist focus",
    body: "We speak clinic. Aesthetics, dermatology, dental, fertility, orthopaedics — we know the patient journey behind each.",
    accent: "#7FE9F0",
  },
  {
    title: "Transparent partnership",
    body: "Clear reporting, plain language, no vanity metrics. You always know what's working and why.",
    accent: "#FFD79A",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1 — Hero */}
      <Section tone="dark" className="bg-aurora-hero overflow-hidden pt-36 pb-20 min-h-[68vh] flex items-center">
        <SparkleField density={40} parallax />
        <OrbAnchor
          id="about-hero"
          variant="about"
          mood="idle"
          scale={1}
          intensity={0.85}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />
        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-7 pt-20 lg:pt-0">
            <SectionHeading
              as="h1"
              kicker="About Clinic Genie"
              title="We're the genie behind Singapore's growing clinics."
              highlight="genie"
              subtitle="A creative and marketing agency built for one thing only — helping private and specialist medical clinics grow with strategy, data and a little magic."
            />
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
        />
      </Section>

      {/* 2 — Origin story */}
      <Section tone="light">
        <Container size="prose" className="flex flex-col gap-10">
          <SectionHeading
            as="h2"
            kicker="Our origin"
            title="Why a clinic-only agency?"
            highlight="clinic-only"
            tone="light"
          />
          <Reveal delay={0.1}>
            <p className="text-lead text-ink-700">
              We kept meeting brilliant doctors with quiet websites. Clinics doing world-class work that patients simply
              couldn&apos;t find — or worse, marketing that risked their licence. So we made a choice most agencies
              won&apos;t: we&apos;d serve clinics, and only clinics. That focus means we understand your patients, your
              specialty, and the advertising rules you live by. Clinic Genie was born to be the partner that turns
              specialist expertise into specialist growth.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <figure className="glass-light relative overflow-hidden rounded-2xl p-8 sm:p-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-genie-400 to-spark-violet"
              />
              <blockquote className="font-display text-h4 text-balance text-ink-900">
                &ldquo;The right patients are searching. Our job is to make sure your clinic is the one they{" "}
                <span className="text-genie-700">trust</span>.&rdquo;
              </blockquote>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* 3 — What we stand for (values) */}
      <Section tone="dark">
        <OrbAnchor
          id="about-values"
          mood="thinking"
          scale={0.85}
          intensity={0.9}
          className="absolute left-1/2 top-20 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h2"
            kicker="What we stand for"
            title="Research. Data. Results."
            highlight="Results"
            subtitle="Three words we hold ourselves to — and the principles behind them."
            align="center"
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <RevealItem key={v.title} className="h-full">
                <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: v.accent, boxShadow: `0 0 12px 1px ${v.accent}` }}
                  />
                  <h3 className="font-display text-h4 text-onDark">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-onDark-muted">{v.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 4 — Our approach (mini process) */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h2"
            kicker="Our approach"
            title="Strategy first, magic second."
            highlight="magic"
            tone="light"
            subtitle="Every engagement starts the same way: we listen, then we research. Strategy & Research, then Implementation & Design, then Results & Optimisation. The flourish patients see is built on a foundation they don't."
          />
          <ProcessSteps steps={PROCESS_STEPS} tone="light" />
          <Reveal className="flex justify-center">
            <MagneticButton href="/services#process" variant="secondary">
              See how we work
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>

      {/* 5 — By the numbers */}
      <Section tone="dark">
        <OrbAnchor
          id="about-numbers"
          mood="focus"
          scale={0.9}
          intensity={1}
          className="absolute left-1/2 top-16 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h2"
            kicker="By the numbers"
            title="A focused practice, measured plainly."
            highlight="focused"
            align="center"
          />
          <StatTrio stats={TEAM_STATS} tone="dark" />
        </Container>
      </Section>

      {/* 6 — Partner ecosystem */}
      <Section tone="dark">
        <OrbAnchor
          id="about-partners"
          mood="curious"
          scale={0.85}
          className="absolute left-1/2 top-20 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col gap-10">
          <SectionHeading
            as="h2"
            kicker="Allies in the lamp"
            title="Specialists, supported by specialists."
            highlight="Specialists"
            subtitle="When your wish needs more than marketing, we bring trusted partners into the room."
            align="center"
          />
          <PartnerStrip partners={PARTNERS} layout="satellite" />
        </Container>
      </Section>

      {/* 7 — Meet the team teaser */}
      <Section tone="light">
        <Container size="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <Kicker tone="light">The people behind it</Kicker>
              <h2 className="font-display text-h2 text-ink-900">
                There are real people behind the <span className="text-genie-700">lamp</span>.
              </h2>
              <p className="text-lead text-ink-700">
                Strategists, writers, designers and developers who only do clinics.
              </p>
              <div>
                <MagneticButton href="/meet-us">Meet us</MagneticButton>
              </div>
            </div>
            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {[
                "Growth strategists who live in SERPs",
                "Writers fluent in compliant clinical copy",
                "Designers who make clinics look as good as their outcomes",
                "Developers who treat three seconds as two too many",
              ].map((chip) => (
                <RevealItem key={chip}>
                  <div className="glass-light flex h-full items-center rounded-xl p-5">
                    <span className="text-sm font-medium text-ink-900">{chip}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* 8 — Final CTA */}
      <Section tone="dark" className="overflow-hidden">
        <OrbAnchor
          id="about-cta"
          mood="celebrate"
          scale={1.1}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            as="h2"
            kicker="Make your first wish"
            title="Let's make your clinic the one patients trust."
            highlight="trust"
            align="center"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-onDark-muted">
              Book a free 30-minute strategy call. We&apos;ll map where the right patients are searching — and exactly
              how to make your clinic the one they choose.
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
