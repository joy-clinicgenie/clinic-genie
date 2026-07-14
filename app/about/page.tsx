import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { GenieFeatureCards } from "@/components/ui/GenieFeatureCards";
import { LightHero } from "@/components/ui/LightHero";
import { LandingSection, LandingIntro } from "@/components/home/landing/LandingLayout";
import { AboutValuesCards } from "@/components/about/AboutValuesCards";
import { ExpertsCards, ExpertsTagline } from "@/components/about/ExpertsCards";
import { MagicProcess } from "@/components/home/landing/MagicProcess";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { HOME_PROCESS_STEPS } from "@/lib/data/services";
import { ABOUT_WISH_POINTS } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "About Clinic Genie | The Genie Behind Better Clinic Growth",
  description:
    "Clinic Genie is a medical marketing agency for specialist clinics in Singapore — helping good doctors get found, trusted, and chosen while you focus on the magic only you can do.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-ink-900">
      <LightHero
        className="bg-[#ffffff]"
        title="The genie behind better clinic growth."
        highlight="genie"
        subtitle="Behind every clinic is a wish: to be found by the patients who need it most. Clinic Genie grants it. A medical marketing agency for specialist clinics in Singapore, helping good doctors get found, trusted, and chosen, while you focus on the magic only you can do."
        primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        secondaryCta={{ href: "/services", label: "See the Magic We've Made" }}
        showOrb={false}
        showWishForm={false}
        align="center"
      />

      <GenieFeatureCards
        id="why-we-exist"
        kicker="Why we exist"
        title="Every genie has an origin."
        highlight="origin"
        subtitle="Communicate clearly and credibly, within Singapore's Healthcare Services Act (HCSA) guidelines."
        cards={ABOUT_WISH_POINTS}
      />

      {/* 3 — What we stand for */}
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
        <AboutValuesCards />
        <Reveal delay={0.1} className="text-center">
          <p className="mx-auto max-w-2xl font-display text-h5 text-balance text-ink-700">
            Ethical in practice. Emotional in craft. Logical in strategy.{" "}
            <span className="genie-text">That is the magic.</span>
          </p>
        </Reveal>
      </LandingSection>

      {/* 4 — How the magic works */}
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

      {/* 5 — The experts behind the work */}
      <LandingSection
        tone="white"
        navTheme="dark"
        className="bg-[#062D36] py-24 text-onDark"
        containerClassName="flex flex-col gap-12"
      >
        <Reveal>
          <LandingIntro
            light
            kicker="The experts behind the work"
            title="The specialists behind every clinic wish."
            highlight="specialists"
            subtitle="Growth strategists, SEO specialists, campaign experts, creative makers, and tech builders — each focused on one part of responsible clinic marketing."
          />
        </Reveal>
        <div className="relative">
          <div className="relative z-10">
            <ExpertsCards />
          </div>
          <ExpertsTagline />
        </div>
      </LandingSection>

      {/* Final CTA */}
      <PageFinale>
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
