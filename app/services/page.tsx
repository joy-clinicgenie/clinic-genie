import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LightHero } from "@/components/ui/LightHero";
import { CorePillarsSection } from "@/components/services/CorePillarsSection";
import { LandingSection, LandingIntro } from "@/components/home/landing/LandingLayout";
import { MagicProcess } from "@/components/home/landing/MagicProcess";
import { HOME_PROCESS_STEPS } from "@/lib/data/services";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { ComplianceCards } from "@/components/home/landing/ComplianceCards";
import { SpecialistClinicsOrb } from "@/components/home/landing/SpecialistClinicsOrb";
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";
import specialistSectionStyles from "@/components/home/landing/SpecialistClinicsOrb.module.css";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services — Strategy, Digital Growth & Brand for Clinics | Clinic Genie",
  description:
    "Everything your clinic needs to grow under one lamp: business strategy, healthcare SEO and medical SEM, clinic websites, content, AI search and compliance-aware brand design — by a team that only works with clinics.",
};

export default function ServicesPage() {
  return (
    <>
      <LightHero
        className="surface-cyan"
        kicker="What we do"
        title="Everything your clinic needs to grow — under one lamp."
        highlight="grow"
        subtitle="Strategy, digital growth and brand design, woven into one engine. Healthcare SEO, medical SEM, clinic websites, content, AI search and compliance-aware strategy — delivered by a team that only works with clinics."
        primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        secondaryCta={{ href: "/services/core-pillars", label: "Explore core service pillars" }}
        showOrb={false}
        showWishForm={false}
      />

      <CorePillarsSection />

      {/* How the magic works */}
      <LandingSection
        tone="white"
        navTheme="dark"
        className="bg-[#062D36] py-0 text-onDark"
        containerClassName="flex flex-col"
      >
        <MagicProcess
          dark
          steps={HOME_PROCESS_STEPS}
          intro={{
            kicker: "How the magic works",
            title: "Clear process. Measurable direction.",
            subtitle:
              "Every good wish needs a plan. From first spark to long-term growth, Clinic Genie gives your clinic marketing a clearer path from strategy to execution.",
          }}
        />
      </LandingSection>

      {/* 6 — Specialist clinics & works */}
      <LandingSection
        tone="white"
        className={cn("pt-24 pb-0", specialistSectionStyles.sectionShell)}
        containerClassName="relative z-10 flex flex-col gap-16"
      >
        <Reveal>
          <LandingIntro
            kicker="Specialist clinics & works"
            title="Built around how patients choose specialist care."
            subtitle="Every specialty has different patient concerns, search behaviour, and trust barriers. Clinic Genie shapes each clinic marketing strategy around how patients search, compare, and decide."
          />
        </Reveal>
        <Reveal delay={0.08} className="w-full">
          <SpecialistClinicsOrb />
        </Reveal>
      </LandingSection>

      <Reveal delay={0.12} className="w-full overflow-visible">
        <PortfolioWorksCarousel />
      </Reveal>

      {/* 7 — Compliance: three cards in one row, CTA below */}
      <LandingSection
        id="compliance"
        tone="cyan"
        className="py-24"
        containerClassName="flex flex-col gap-12"
      >
        <Reveal>
          <LandingIntro
            kicker="Magic with a Conscience"
            title="Stay visible. Stay credible. Stay within the rules."
            subtitle="We build Singapore’s healthcare advertising standards into every draft, page, and campaign from the start. Nothing is bolted on after."
          />
        </Reveal>
        <ComplianceCards />
        <Reveal delay={0.08}>
          <div className="flex justify-center">
            <MagneticButton href="/services#compliance" size="md" withMiniOrb>
              How We Keep You Compliant
            </MagneticButton>
          </div>
        </Reveal>
      </LandingSection>

      {/* 8 — Final CTA */}
      <PageFinale>
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Tell us your wish."
          highlight="wish"
          body="Book a free strategy call and we'll recommend the right mix for your clinic — no hard sell."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          footnote="No obligation. No jargon. Just a clear next step."
        />
      </PageFinale>
    </>
  );
}
