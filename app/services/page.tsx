import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { LightHero } from "@/components/ui/LightHero";
import { CorePillarsSection } from "@/components/services/CorePillarsSection";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";

export const metadata: Metadata = {
  title: "Services | Strategy, Digital Growth & Brand for Clinics | Clinic Genie",
  description:
    "Everything your clinic needs to grow under one lamp: business strategy, healthcare SEO and medical SEM, clinic websites, content, AI search and compliance-aware brand design — by a team that only works with clinics.",
};

export default function ServicesPage() {
  return (
    <>
      <LightHero
        title="Everything your clinic needs to grow, under one lamp"
        highlight="grow"
        subtitle="Clinic Genie unites healthcare SEO, medical SEM, websites and content to help specialist clinics get found, trusted and chosen."
        primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        secondaryCta={{ href: "#core-pillars", label: "Explore core service pillars" }}
        showOrb={false}
        showWishForm={false}
        showSparkles={false}
        backgroundImage={{
          src: "/services/hero-bg.png",
          alt: "",
          treatment: "dark",
        }}
        minHeight="min-h-[78vh]"
      />

      <CorePillarsSection />

      <Reveal delay={0.12} className="w-full overflow-visible">
        <PortfolioWorksCarousel />
      </Reveal>

      {/* Final CTA */}
      <PageFinale backdropClassName="surface-cyan">
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
