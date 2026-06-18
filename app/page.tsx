import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PostCard } from "@/components/blog/PostCard";
import { CORE_PILLARS } from "@/lib/data/pillars";
import { HOME_PROCESS_STEPS } from "@/lib/data/services";
import { POSTS } from "@/lib/data/posts";
import {
  LandingSection,
  LandingIntro,
  LandingKicker,
  LandingHeading,
  LandingBody,
  MetricsRowStats,
  MetricCell,
} from "@/components/home/landing/LandingLayout";
import { PageFinale } from "@/components/ui/PageFinale";
import { ClinicGenieGap } from "@/components/home/landing/ClinicGenieGap";
import { WishStack } from "@/components/home/landing/WishStack";
import { MagicProcess } from "@/components/home/landing/MagicProcess";
import { SpecialistClinicsOrb } from "@/components/home/landing/SpecialistClinicsOrb";
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";
import { AlliesCards, AlliesTagline } from "@/components/home/landing/AlliesCards";
import { ComplianceCards } from "@/components/home/landing/ComplianceCards";
import { CLIENT_LOGOS } from "@/lib/data/client-logos";

const WISH_CHIPS: Record<string, string> = {
  findclinic: "PLATFORM",
  "healthcare-seo": "SEO",
  "medical-sem": "SEM",
  "branding-copywriting": "BRAND",
  "web-design-development": "WEB",
  "photo-video": "MEDIA",
  "social-media": "SOCIAL",
  "geo-ai-search": "AI SEARCH",
};

const METRICS = [
  { value: "20+", label: "Added enquiries / month" },
  { value: "8-12", label: "Potential consultations" },
  { value: "$33.6K+", label: "Annual revenue opportunity" },
  { value: "5 channels", label: "Working as one engine" },
];

export default function HomePage() {
  return (
    <div className="home-landing-flow">
      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Trust: client logos */}
      <LandingSection
        tone="white"
        className="border-y border-[#E6EEF1] bg-white py-14 shadow-[0_8px_32px_rgba(6,45,54,0.05)]"
        containerClassName="flex flex-col gap-8"
      >
        <Reveal>
          <LandingKicker>Clinics we&apos;ve helped grow</LandingKicker>
        </Reveal>
        <Reveal className="-mx-[var(--page-pad)] w-[calc(100%+2*var(--page-pad))] bg-white">
          <LogoMarquee logos={CLIENT_LOGOS} />
        </Reveal>
      </LandingSection>

      {/* 3 — Marketing metrics */}
      <LandingSection tone="white" className="py-24" containerClassName="flex flex-col">
        <Reveal>
          <div className="flex flex-col items-center gap-10 text-center">
            <LandingKicker>Marketing metrics</LandingKicker>

            <MetricsRowStats>
              {METRICS.map((metric, i) => (
                <MetricCell key={metric.label} value={metric.value} label={metric.label} index={i} />
              ))}
            </MetricsRowStats>

            <LandingBody className="text-sm">
              Figures are illustrative estimates only. Actual results vary by specialty, clinic fees, competition, budget, patient journey, and conversion performance.
            </LandingBody>

            <MagneticButton href="/portfolio" size="md" withMiniOrb>
              See the Numbers
            </MagneticButton>
          </div>
        </Reveal>
      </LandingSection>

      {/* 4 — Meet your Clinic Genie: capabilities-style rows */}
      <ClinicGenieGap />

      {/* 5 — Eight Wishes: cyan band, sticky stacked cards */}
      <LandingSection id="wishes" tone="cyan" className="py-24" containerClassName="flex flex-col">
        <WishStack
          pillars={CORE_PILLARS}
          chips={WISH_CHIPS}
          intro={{
            kicker: "The eight wishes we grant",
            title: "Eight kinds of magic, one growth engine.",
            highlight: "magic",
            subtitle:
              "Clinic marketing should never work in silos. We connect search, content, design, and campaigns into one engine, so your digital presence is clearer, stronger, and easier to measure.",
          }}
        />
      </LandingSection>

      {/* 6 — How the magic works: sticky scroll + 5 steps */}
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

      {/* 7 — Compliance: three cards in one row, CTA below */}
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

      {/* 8 — Allies: strategic teal band, 4 partner cards */}
      <LandingSection
        tone="white"
        navTheme="dark"
        className="bg-[#062D36] py-24 text-onDark"
        containerClassName="flex flex-col gap-12"
      >
        <Reveal>
          <LandingIntro
            light
            kicker="Allies in the lamp"
            title="The Network Behind Better Clinic Growth"
            highlight="Network"
            subtitle={
              <>
                The genie works best with good company.
                <br />
                Trusted partners in design, technology, AI, and growth, so your clinic gets more than marketing.
              </>
            }
          />
        </Reveal>
        <div className="relative">
          <div className="relative z-10">
            <AlliesCards />
          </div>
          <AlliesTagline />
        </div>
      </LandingSection>

      {/* 8b — Specialist clinics & works: interactive grey orb */}
      <LandingSection
        tone="white"
        className="bg-white pt-24 pb-0"
        containerClassName="flex flex-col gap-16"
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

      {/* 10 — Dark finale: Genie Tips + final CTA */}
      <PageFinale>
        <section className="py-24">
          <div className="mx-auto w-full max-w-wide px-[var(--page-pad)]">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <LandingKicker light>Genie Insights</LandingKicker>
                  <LandingHeading highlight="growth" light className="text-center">
                    Clear insights on clinic growth today.
                  </LandingHeading>
                </div>
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                  <LandingBody light center={false}>
                    Search, design, content, branding, and trust.
                    <br />
                    Genie Insights covers every part of how patients discover and choose specialist clinics.
                  </LandingBody>
                  <Link
                    href="/genie-tips"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors hover:text-white"
                  >
                    Read the Genie&apos;s Insights <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <RevealGroup className="grid gap-5 md:grid-cols-3">
                {POSTS.slice(0, 3).map((post) => (
                  <RevealItem key={post.slug} className="h-full">
                    <PostCard post={post} tone="dark" showImage={false} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        <section className="pb-32 pt-16">
          <div className="mx-auto flex max-w-wide flex-col items-center gap-7 px-[var(--page-pad)] text-center">
            <Reveal>
              <LandingKicker light>Make your first wish</LandingKicker>
            </Reveal>
            <Reveal delay={0.05}>
              <LandingHeading highlight="growth" light>
              What is your clinic’s growth wish?
              <br />
              Let’s help make it come true.
              </LandingHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <LandingBody light>
              Whether you are launching, scaling, or refining your clinic marketing, start with a focused conversation about your clinic, your goals, and the enquiries you want to attract.
              </LandingBody>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact" size="lg" withMiniOrb>
                  Make Your First Wish
                </MagneticButton>
                <MagneticButton href="/contact" size="lg" variant="ghost" tone="light">
                  Send Your Wish to the Genie
                </MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mx-auto max-w-[75%] text-sm text-[#8FB7C2]">No vague wishes. No confusing jargon. Just a clearer path to responsible clinic growth.</p>
            </Reveal>
          </div>
        </section>
      </PageFinale>
    </div>
  );
}
