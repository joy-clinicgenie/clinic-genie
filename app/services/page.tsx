import type { Metadata } from "next";
import { DEFAULT_KEYWORDS, pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";
import { LightHero } from "@/components/ui/LightHero";
import { CorePillarsSection } from "@/components/services/CorePillarsSection";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";
import { ComplianceCards } from "@/components/home/landing/ComplianceCards";
import { LandingIntro, LandingSection } from "@/components/home/landing/LandingLayout";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "@/components/services/ServicesHero.module.css";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Healthcare SEO, medical SEM, clinic websites, branding, content, AI search, and compliance-aware strategy for specialist clinics in Singapore. Eight services, one growth engine.",
  path: "/services",
  keywords: [...DEFAULT_KEYWORDS, "clinic digital strategy"],
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-genie-20 text-ink-900">
      <div className={cn(styles.stage, "bg-genie-20")}>
        <LightHero
          title="Everything your clinic needs to grow, under one lamp"
          highlight="grow"
          subtitle="Clinic Genie unites healthcare SEO, medical SEM, websites and content to help specialist clinics get found, trusted and chosen."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          secondaryCta={{ href: "#core-pillars", label: "Explore core service pillars" }}
          showOrb={false}
          showWishForm={false}
          showSparkles={false}
          mobileAlign="center"
          backgroundImage={{
            src: "/services/hero-bg.png",
            alt: "",
            treatment: "dark",
            imageClassName:
              "object-cover max-lg:object-[82%_40%] lg:object-center",
          }}
          minHeight="max-lg:min-h-0 lg:min-h-[78vh]"
          subtitleClassName="max-w-sm whitespace-pre-line text-pretty max-lg:mx-auto sm:max-w-[75%]"
          className={`${styles.hero} relative z-10 rounded-b-2xl shadow-lg max-lg:items-start max-lg:pb-20 lg:rounded-b-[44px]`}
        />

        <CorePillarsSection />
      </div>

      <Reveal delay={0.12} className="w-full overflow-visible">
        <PortfolioWorksCarousel />
      </Reveal>

      <LandingSection
        id="compliance"
        tone="white"
        className="py-24"
        containerClassName="flex flex-col gap-12"
      >
        <Reveal>
          <LandingIntro
            kicker="Magic with a Conscience"
            title="Stay visible. Stay credible. Stay within the rules."
            subtitle="We build Singapore's healthcare advertising standards into every draft, page, and campaign from the start. Nothing is bolted on after."
          />
        </Reveal>
        <ComplianceCards />
        <Reveal delay={0.08}>
          <div className="flex justify-center">
            <MagneticButton href="/contact" size="md" withMiniOrb>
              Start a Conversation
            </MagneticButton>
          </div>
        </Reveal>
      </LandingSection>

      <PageFinale backdropClassName="bg-genie-20">
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Tell us your wish."
          highlight="wish"
          body="Book a free strategy call and we'll recommend the right mix for your clinic. No hard sell."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          footnote="No obligation. No jargon. Just a clear next step."
        />
      </PageFinale>
    </div>
  );
}
