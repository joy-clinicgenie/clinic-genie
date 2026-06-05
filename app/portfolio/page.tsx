import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatTrio } from "@/components/ui/StatTrio";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { FilterGrid } from "@/components/portfolio/FilterGrid";

export const metadata: Metadata = {
  title: "Our Works — Real Clinic Marketing Results | Clinic Genie",
  description:
    "Real clinics, real rankings, real bookings. Explore the brands, websites and campaigns we've conjured for specialist clinics across Singapore — and the results that followed.",
};

const RESULTS_STATS = [
  { value: "3.4×", label: "average enquiry lift" },
  { value: "40+", label: "page-1 treatment keywords across clients" },
  { value: "100%", label: "healthcare-only" },
];

export default function PortfolioPage() {
  return (
    <>
      {/* 1 — Hero (carries the portfolio orb variant) */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-aurora-hero pb-20 pt-36">
        <SparkleField density={38} parallax />
        <OrbAnchor
          id="portfolio-hero"
          variant="portfolio"
          mood="curious"
          scale={1}
          intensity={0.85}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />

        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-7 pt-24 lg:pt-0">
            <Reveal variant="up">
              <Kicker>Our works</Kicker>
            </Reveal>
            <SectionHeading
              as="h1"
              title="Real clinics. Real rankings. Real bookings."
              highlight="bookings"
            />
            <Reveal variant="up" delay={0.12}>
              <p className="max-w-xl text-lead text-onDark-muted">
                A look at the brands, websites and campaigns we&apos;ve conjured for specialist clinics across Singapore
                — and the results that followed.
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

      {/* 2 — Filter + grid */}
      <Section tone="dark">
        <OrbAnchor
          id="portfolio-grid"
          mood="thinking"
          scale={0.8}
          intensity={0.8}
          className="absolute right-[6%] top-24 hidden h-px w-px lg:block"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="The gallery"
            title="Pick a kind of magic, see who we conjured it for."
            highlight="magic"
            subtitle="Filter by service to see how strategy, brand, web and search came together for each clinic."
          />
          <FilterGrid />
        </Container>
      </Section>

      {/* 3 — Results band */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Proof, not promises"
            title="Outcomes we're proud of."
            highlight="proud"
            tone="light"
            align="center"
            subtitle="Numbers from real engagements with specialist clinics — every result earned within healthcare advertising rules."
          />
          <StatTrio stats={RESULTS_STATS} tone="light" />
        </Container>
      </Section>

      {/* 4 — Final CTA */}
      <Section tone="dark" className="overflow-hidden">
        <OrbAnchor
          id="portfolio-cta"
          mood="celebrate"
          scale={1.1}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            kicker="Make your first wish"
            title="Your clinic could be next."
            highlight="next"
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
