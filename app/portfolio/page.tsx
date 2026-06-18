import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatTrio } from "@/components/ui/StatTrio";
import { LightHero } from "@/components/ui/LightHero";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
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
      <LightHero
        kicker="Our works"
        title="Real clinics. Real rankings. Real bookings."
        highlight="bookings"
        subtitle="A look at the brands, websites and campaigns we've conjured for specialist clinics across Singapore — and the results that followed."
      />

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
      <PageFinale>
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Your clinic could be next."
          highlight="next"
          body="Book a free 30-minute strategy call. We'll map where the right patients are searching — and exactly how to make your clinic the one they trust."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          footnote="No obligation. No jargon. Just a clear next step."
        />
      </PageFinale>
    </>
  );
}
