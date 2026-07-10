import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LightHero } from "@/components/ui/LightHero";
import {
  LandingSection,
  LandingIntro,
  LandingBody,
  LandingHeading,
  LandingKicker,
} from "@/components/home/landing/LandingLayout";
import { ExpertsCards, ExpertsTagline } from "@/components/about/ExpertsCards";
import { BehindTheWorkCards } from "@/components/meet-us/BehindTheWorkCards";
import { MagicProcess } from "@/components/home/landing/MagicProcess";
import { ComplianceCards } from "@/components/home/landing/ComplianceCards";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { HOME_PROCESS_STEPS } from "@/lib/data/services";
import { MEET_US_INTRO, MEET_US_BEHIND_THE_WORK } from "@/lib/data/meet-us";

export const metadata: Metadata = {
  title: "Meet Us | The Team Behind Clearer Clinic Growth",
  description:
    "Meet the Clinic Genie team. Strategists, creatives, search specialists, designers, and performance marketers helping specialist clinics in Singapore grow with clarity and trust.",
};

export default function MeetUsPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-ink-900">
      {/* 1 — Hero */}
      <LightHero
        className="bg-[#ffffff]"
        title="Meet the team behind clearer clinic growth."
        highlight="clearer"
        subtitle="Clinic Genie is built by a focused team of strategists, creatives, search specialists, designers, and performance marketers who understand that healthcare marketing needs to be clear, responsible, and built around patient trust. We help specialist clinics connect search, websites, content, campaigns, and tracking into one clearer digital growth system."
        primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        showOrb={false}
        showWishForm={false}
        align="center"
      />

      {/* 2 — Short team intro */}
      <LandingSection tone="white" className="py-24" containerClassName="flex flex-col gap-8">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <LandingKicker>{MEET_US_INTRO.kicker}</LandingKicker>
            <LandingHeading highlight={MEET_US_INTRO.highlight}>
              {MEET_US_INTRO.title}
            </LandingHeading>
          </div>
        </Reveal>
        <Reveal delay={0.06} className="flex flex-col items-center gap-5">
          {MEET_US_INTRO.paragraphs.map((paragraph) => (
            <LandingBody key={paragraph}>{paragraph}</LandingBody>
          ))}
          <p className="mx-auto max-w-2xl font-display text-h6 italic text-balance text-ink-700">
            {MEET_US_INTRO.supportLine}
          </p>
        </Reveal>
      </LandingSection>

      {/* 3 — Core team / roles */}
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
            subtitle="Growth strategists, SEO specialists, campaign experts, creative makers, and tech builders. Each focused on one part of responsible clinic marketing."
          />
        </Reveal>
        <div className="relative">
          <div className="relative z-10">
            <ExpertsCards />
          </div>
          <ExpertsTagline />
        </div>
      </LandingSection>

      {/* 4 — How we work with clinics (from landing) */}
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

      {/* 5 — Behind the work */}
      <LandingSection tone="white" className="py-24" containerClassName="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <LandingKicker>{MEET_US_BEHIND_THE_WORK.kicker}</LandingKicker>
            <LandingHeading highlight={MEET_US_BEHIND_THE_WORK.highlight}>
              {MEET_US_BEHIND_THE_WORK.title}
            </LandingHeading>
          </div>
        </Reveal>
        <Reveal delay={0.06} className="flex flex-col items-center gap-5">
          {MEET_US_BEHIND_THE_WORK.paragraphs.map((paragraph) => (
            <LandingBody key={paragraph}>{paragraph}</LandingBody>
          ))}
        </Reveal>
        <BehindTheWorkCards />
      </LandingSection>

      {/* 6 — Our working standards / compliance (from landing) */}
      <LandingSection tone="white" className="py-24" containerClassName="flex flex-col gap-12">
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

      {/* 7 — Final CTA */}
      <PageFinale>
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Ready to build a clearer clinic growth system?"
          highlight="clearer"
          body="Meet the team that helps specialist clinics turn search, websites, content, campaigns, and tracking into a clearer patient growth journey. If your clinic needs stronger visibility, clearer service pages, better enquiry flow, or a more structured digital strategy, Clinic Genie can help shape the next step."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          secondaryCta={{ href: "/contact", label: "Send Your Wish to the Genie" }}
          footnote="No vague wishes. No confusing jargon. Just a clearer path to responsible clinic growth."
        />
      </PageFinale>
    </div>
  );
}
