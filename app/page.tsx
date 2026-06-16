import Link from "next/link";
import Image from "next/image";
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
  LandingFinale,
  LandingIntro,
  LandingKicker,
  LandingHeading,
  LandingBody,
  MetricsGrid,
  MetricCell,
} from "@/components/home/landing/LandingLayout";
import { ClinicGenieGap } from "@/components/home/landing/ClinicGenieGap";
import { WishStack } from "@/components/home/landing/WishStack";
import { MagicProcess } from "@/components/home/landing/MagicProcess";
import { SpecialistClinicsOrb } from "@/components/home/landing/SpecialistClinicsOrb";
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";
import { ComplianceCards } from "@/components/home/landing/ComplianceCards";
import { CLIENT_LOGOS } from "@/lib/data/client-logos";
import { ALLIES } from "@/lib/data/allies";
import { cn } from "@/lib/cn";

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
      <LandingSection tone="white" className="py-16" containerClassName="flex flex-col gap-10">
        <Reveal>
          <p className="text-center font-mono text-kicker uppercase tracking-[0.3em] text-[#217B8E]">
            Clinics we&apos;ve helped grow
          </p>
        </Reveal>
        <Reveal className="-mx-[var(--page-pad)] w-[calc(100%+2*var(--page-pad))]">
          <LogoMarquee logos={CLIENT_LOGOS} />
        </Reveal>
      </LandingSection>

      {/* 3 — Meet your Clinic Genie: capabilities-style rows */}
      <ClinicGenieGap />

      {/* 4 — Eight Wishes: cyan band, sticky stacked cards */}
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

      {/* 5 — How the magic works: sticky scroll + 5 steps */}
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

      {/* 6 — Marketing metrics: left-aligned header + 2×2 grid */}
      <LandingSection tone="white" className="py-24" containerClassName="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Reveal>
            <LandingKicker align="left">Marketing metrics</LandingKicker>
          </Reveal>
        </div>
        <Reveal>
          <MetricsGrid>
            {METRICS.map((metric, i) => (
              <MetricCell key={metric.label} value={metric.value} label={metric.label} index={i} />
            ))}
          </MetricsGrid>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-col items-start gap-5">
            <LandingBody center={false} className="max-w-md text-sm">
              Figures are illustrative estimates only. Actual results vary by specialty, clinic fees, competition,
              budget, patient journey, and conversion performance.
            </LandingBody>
            <MagneticButton href="/portfolio" size="md" withMiniOrb>
              See the Numbers
            </MagneticButton>
          </div>
        </Reveal>
      </LandingSection>

      {/* 7 — Compliance: three cards in one row, CTA below */}
      <LandingSection tone="white" className="py-24" containerClassName="flex flex-col gap-12">
        <Reveal>
          <LandingIntro
            kicker="Stay visible, stay compliant."
            title="Our medical clinic marketing is built around Singapore's HCSA, PHMC, and SMC guidelines"
          />
        </Reveal>
        <Reveal>
          <ComplianceCards />
        </Reveal>
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
            subtitle="The genie works best with good company. Trusted partners in design, technology, AI, and growth, so your clinic gets more than marketing."
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ALLIES.map((ally) => (
            <RevealItem key={ally.name} className="h-full">
              <div className="glass flex h-full flex-col gap-4 rounded-2xl p-8 transition-shadow duration-ui hover:shadow-glow-md">
                <div className="flex h-12 items-center">
                  <Image
                    src={ally.image}
                    alt={ally.name}
                    width={ally.imageWidth ?? 160}
                    height={ally.imageHeight ?? 48}
                    className={cn(
                      "h-9 w-auto max-w-[180px] object-contain object-left sm:h-10",
                      ally.logoWhite !== false && "brightness-0 invert opacity-90"
                    )}
                    sizes="180px"
                  />
                </div>
                <h3 className="font-display text-base font-semibold text-white">{ally.name}</h3>
                <p className="text-sm leading-relaxed text-[#C9E4EA]">{ally.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.04}>
          <p className="text-center font-display text-lg font-bold italic leading-snug text-[#9FDCE8]">
            Stronger partners. Better support. Clearer growth for your clinic.
          </p>
        </Reveal>
      </LandingSection>

      {/* 8b — Specialist clinics & works: interactive grey orb */}
      <LandingSection tone="white" className="bg-white py-24" containerClassName="flex flex-col gap-16">
        <Reveal>
          <LandingIntro
            kicker="Specialist clinics & works"
            title="Built around how patients choose specialist care."
            subtitle="Every specialty has different patient concerns, search behaviour, and trust barriers. Clinic Genie shapes each clinic marketing strategy around how patients search, compare, and decide."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <SpecialistClinicsOrb />
        </Reveal>
        <Reveal delay={0.12}>
          <PortfolioWorksCarousel />
        </Reveal>
      </LandingSection>

      {/* 10 — Dark finale: Genie Tips + final CTA */}
      <LandingFinale>
        <section className="py-24">
          <div className="mx-auto w-full max-w-wide px-[var(--page-pad)]">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-4">
                  <LandingKicker light>Genie Insights</LandingKicker>
                  <LandingHeading highlight="growth" light>
                  Clear insights on clinic growth today.
                  </LandingHeading>
                  <LandingBody light center={false}>
                  Search, design, content, branding, and trust. Genie Insights covers every part of how patients discover and choose specialist clinics.
                  </LandingBody>
                </div>
                <Link
                  href="/genie-tips"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors hover:text-white"
                >
                  Read the Genie's Insights <span aria-hidden="true">→</span>
                </Link>
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
                  Make Your Clinic&apos;s Growth Wish Come True
                </MagneticButton>
                <MagneticButton href="/contact" size="lg" variant="ghost" tone="light">
                  Send Your Wish to the Genie
                </MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-sm text-[#8FB7C2]">No vague wishes. No confusing jargon. Just a clearer path to responsible clinic growth.</p>
            </Reveal>
          </div>
        </section>
      </LandingFinale>
    </div>
  );
}
