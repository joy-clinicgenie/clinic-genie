import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LightHero } from "@/components/ui/LightHero";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { SpecialtyHubCard } from "@/components/specialty-hub/SpecialtyHubCard";
import {
  LandingSection,
  LandingIntro,
} from "@/components/home/landing/LandingLayout";
import {
  SpecialistClinicsBackdrop,
  SpecialistClinicsOrb,
} from "@/components/home/landing/SpecialistClinicsOrb";
import specialistSectionStyles from "@/components/home/landing/SpecialistClinicsOrb.module.css";
import { SPECIALTY_HUBS } from "@/lib/data/specialty-hubs";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "Clinic Specialties",
  description:
    "Marketing systems shaped around how patients search for specialist care in Singapore, from paediatrics and cardiology to dermatology, dental, neurology, and rehabilitation.",
  path: "/clinic-specialties",
  keywords: [
    "specialist clinic marketing",
    "paediatric clinic marketing",
    "cardiology clinic marketing",
    "dermatology clinic marketing",
    "clinic specialties Singapore",
  ],
});

export default function ClinicSpecialtiesPage() {
  return (
    <div className="min-h-screen bg-genie-20 text-ink-900">
      <LightHero
        title="Growth engines built for your specialty"
        highlight="your specialty"
        subtitle="From how patients search to what earns their trust, explore tailored medical marketing strategies for specialist clinics in Singapore."
        primaryCta={{
          href: "#clinic-specialties",
          label: "Explore specialties",
          withMiniOrb: false,
        }}
        showOrb={false}
        showWishForm={false}
        showSparkles={false}
        backgroundImage={{
          src: "/specialty-hub/hero-bg.png",
          alt: "",
          treatment: "light",
          imageClassName:
            "object-cover object-[30%_center] lg:object-[74%_center] lg:-translate-x-[4%]",
        }}
        minHeight="min-h-[78vh]"
        className="relative z-10 rounded-b-2xl shadow-lg lg:rounded-b-[44px]"
      />

      <Section id="clinic-specialties" tone="light" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-genie-20 via-8% via-cg-mist to-cg-mist"
        />
        <Container className="relative flex flex-col gap-12">
          <SectionHeading
            kicker="Clinic Specialties"
            title="Choose your specialty"
            highlight="specialty"
            tone="light"
            subtitle="Each specialty is tuned to how patients in your field find, trust, and decide, not a generic marketing package."
            align="center"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SPECIALTY_HUBS.map((hub, index) => (
              <RevealItem key={hub.slug} className="h-full">
                <SpecialtyHubCard hub={hub} sparkleIndex={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <LandingSection
        tone="white"
        className={cn("pt-24 pb-0", specialistSectionStyles.sectionShell)}
        containerClassName="relative z-10 flex flex-col gap-16"
        backdrop={<SpecialistClinicsBackdrop />}
      >
        <Reveal>
          <LandingIntro
            kicker="Clinic specialties"
            title="Built around how patients choose specialist care."
            subtitle="Every specialty has different patient concerns, search behaviour, and trust barriers. Clinic Genie shapes each clinic marketing strategy around how patients search, compare, and decide."
          />
        </Reveal>
        <Reveal delay={0.08} className="w-full">
          <SpecialistClinicsOrb />
        </Reveal>
      </LandingSection>

      <PageFinale backdropClassName="bg-white">
        <PageFinaleCTA
          kicker="Your specialty not listed yet?"
          title="The magic still works."
          highlight="magic"
          body="If patients search for your specialty, we can help them find you. Tell us your wish and we'll map the right growth engine."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        />
      </PageFinale>
    </div>
  );
}
