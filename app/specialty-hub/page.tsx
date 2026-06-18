import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LightHero } from "@/components/ui/LightHero";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
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
      <LightHero
        kicker="Specialty Hub"
        title="Growth engines built for your specialty."
        highlight="your specialty"
        subtitle="Every specialty searches differently. Parents, patients, and families each need a different kind of trust. Explore the growth systems Clinic Genie has built — and is building — for specialist clinics like yours."
        primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        minHeight="min-h-[60vh]"
      />

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

      <PageFinale>
        <PageFinaleCTA
          kicker="Your specialty not listed yet?"
          title="The magic still works."
          highlight="magic"
          body="If patients search for your specialty, we can help them find you. Tell us your wish and we'll map the right growth engine."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        />
      </PageFinale>
    </>
  );
}
