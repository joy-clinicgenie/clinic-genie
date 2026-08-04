import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { GenieFeatureCards } from "@/components/ui/GenieFeatureCards";
import { AboutOverlapHero } from "@/components/about/AboutOverlapHero";
import { LandingSection, LandingIntro } from "@/components/home/landing/LandingLayout";
import { AboutValuesCards, AboutValuesTagline } from "@/components/about/AboutValuesCards";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { ABOUT_WISH_POINTS } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "About Clinic Genie | The Genie Behind Better Clinic Growth",
  description:
    "Clinic Genie is a medical marketing agency for specialist clinics in Singapore. Helping good doctors get found, trusted, and chosen while you focus on the magic only you can do.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-ink-900">
      <AboutOverlapHero />

      <GenieFeatureCards
        id="why-we-exist"
        className="surface-cyan"
        kicker="Why we exist"
        title="Every genie has an origins"
        highlight="origin"
        subtitle="Helping specialist clinics get found, trusted, and chosen by the patients who need them."
        headerClassName="max-w-wide"
        subtitleClassName="max-w-none sm:max-w-none md:whitespace-nowrap"
        cards={ABOUT_WISH_POINTS}
      />

      {/* What we stand for */}
      <LandingSection
        tone="white"
        className="bg-gradient-to-b from-[#f8fdfd] via-[#eafbfb] to-[#e3f6fa] py-24"
        containerClassName="flex flex-col gap-12"
      >
        <Reveal>
          <LandingIntro
            kicker="What guides our work"
            title="Magic has rules. Growth needs discipline."
            highlight="rules"
            subtitle="The values behind our clinic marketing strategy."
          />
        </Reveal>
        <div className="relative">
          <div className="relative z-10">
            <AboutValuesCards />
          </div>
          <AboutValuesTagline />
        </div>
      </LandingSection>

      {/* Final CTA */}
      <PageFinale backdropClassName="surface-cyan">
        <PageFinaleCTA
          kicker="Make your first wish"
          title="What is your clinic's growth wish?"
          highlight="wish"
          body="Tell us about your clinic, your specialty, and the enquiries you want to attract."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          secondaryCta={{ href: "/contact", label: "Send Your Wish to the Genie" }}
          footnote="No vague wishes. No confusing jargon. Just a clearer path to responsible clinic marketing."
        />
      </PageFinale>
    </div>
  );
}
