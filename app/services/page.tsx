import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { LightHero } from "@/components/ui/LightHero";
import { CorePillarsSection } from "@/components/services/CorePillarsSection";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";
import styles from "@/components/services/ServicesHero.module.css";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services | Strategy, Digital Growth & Brand for Clinics | Clinic Genie",
  description:
    "Everything your clinic needs to grow under one lamp: business strategy, healthcare SEO and medical SEM, clinic websites, content, AI search and compliance-aware brand design — by a team that only works with clinics.",
};

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

      <PageFinale backdropClassName="surface-light">
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Tell us your wish."
          highlight="wish"
          body="Book a free strategy call and we'll recommend the right mix for your clinic — no hard sell."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          footnote="No obligation. No jargon. Just a clear next step."
        />
      </PageFinale>
    </div>
  );
}
