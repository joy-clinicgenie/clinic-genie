import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  InsightPreviewCard,
  type InsightPreviewPost,
} from "@/components/home/landing/InsightPreviewCard";
import { CORE_PILLARS } from "@/lib/data/pillars";
import { HOME_PROCESS_STEPS } from "@/lib/data/services";
import { POSTS } from "@/lib/data/posts";
import { getPublishedPosts } from "@/lib/notion";
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
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";
import { AlliesCards, AlliesTagline } from "@/components/home/landing/AlliesCards";
import { ComplianceCards } from "@/components/home/landing/ComplianceCards";
import { SpecialtyHubCard } from "@/components/specialty-hub/SpecialtyHubCard";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CLIENT_LOGOS } from "@/lib/data/client-logos";
import { SPECIALTY_HUBS } from "@/lib/data/specialty-hubs";

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
  { value: "20+", label: "Specialist clinics served" },
  { value: "47,000+", label: "Patient enquiries generated" },
  { value: "S$350K>", label: "Google Ads spend managed" },
  { value: "3+", label: "Years in healthcare marketing" },
];

export default async function HomePage() {
  const notionPosts = await getPublishedPosts();
  const insightPosts: InsightPreviewPost[] =
    notionPosts.length > 0
      ? notionPosts.slice(0, 3).map((post) => ({
          slug: post.slug,
          title: post.title,
          dek: post.description,
          category: post.category ?? post.tags[0] ?? "Growth Strategy",
          updated: post.dateLabel ?? "",
        }))
      : POSTS.slice(0, 3).map((post) => ({
          slug: post.slug,
          title: post.title,
          dek: post.dek,
          category: post.category,
          updated: post.updated,
        }));

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
              Figures are based on aggregated campaign data across clients. Results vary by specialty, budget, competition, and patient journey.
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
              "Clinic marketing shouldn't live in silos. We conjure it into one growth engine.",
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

      {/* 7 — Allies: strategic teal band, 4 partner cards */}
      <LandingSection
        tone="white"
        navTheme="dark"
        className="bg-[#062D36] pb-36 pt-24 text-onDark"
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

      {/* 8 — Clinic specialties */}
      <Section id="clinic-specialties" tone="light" className="py-24">
        <Container className="flex flex-col gap-12">
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

      <Reveal delay={0.12} className="w-full overflow-visible">
        <PortfolioWorksCarousel />
      </Reveal>

      {/* 9 — Compliance: three cards in one row, CTA below */}
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

      {/* 10 — Dark finale: Genie Tips + final CTA */}
      <PageFinale backdropClassName="bg-white">
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
                {insightPosts.map((post) => (
                  <RevealItem key={post.slug} className="h-full">
                    <InsightPreviewCard post={post} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        <section className="pb-16 pt-16 lg:pb-20">
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
              <p className="mx-auto max-w-full text-sm text-[#8FB7C2] sm:max-w-[75%]">No vague wishes. No confusing jargon. Just a clearer path to responsible clinic growth.</p>
            </Reveal>
          </div>
        </section>
      </PageFinale>
    </div>
  );
}
