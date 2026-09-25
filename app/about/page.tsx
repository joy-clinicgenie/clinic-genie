import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import {
  breadcrumbList,
  nestedBreadcrumbs,
  schemaGraph,
  webPageSchema,
} from "@/lib/schema";
import { Reveal } from "@/components/ui/Reveal";
import { GenieFeatureCards } from "@/components/ui/GenieFeatureCards";
import { AboutOverlapHero } from "@/components/about/AboutOverlapHero";
import { AboutApproachTimeline } from "@/components/about/AboutApproachTimeline";
import { AboutTrustedMarquee } from "@/components/about/AboutTrustedMarquee";
import { LandingSection, LandingIntro } from "@/components/home/landing/LandingLayout";
import { AboutValuesCards, AboutValuesTagline } from "@/components/about/AboutValuesCards";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { ABOUT_WISH_POINTS } from "@/lib/data/about";

const ABOUT_TITLE = "About Us";
const ABOUT_DESCRIPTION =
  "Clinic Genie is a medical marketing agency for specialist clinics in Singapore. We help clinics get found, trusted, and chosen, with strategy built around healthcare search, websites, and compliance-aware growth.";
const ABOUT_PATH = "/about";

export const metadata: Metadata = pageMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: ABOUT_PATH,
  keywords: [
    "about Clinic Genie",
    "specialist clinic marketing",
    "healthcare marketing Singapore",
  ],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-ink-900">
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            path: ABOUT_PATH,
            name: ABOUT_TITLE,
            description: ABOUT_DESCRIPTION,
            type: "AboutPage",
          }),
          breadcrumbList(nestedBreadcrumbs([{ name: ABOUT_TITLE, path: ABOUT_PATH }])),
        ])}
      />
      <AboutOverlapHero />

      <GenieFeatureCards
        id="why-we-exist"
        className="surface-cyan"
        kicker="Why we exist"
        title="Every genie has an origin"
        highlight="origin"
        subtitle="Helping specialist clinics get found, trusted, and chosen by the patients who need them."
        headerClassName="max-w-wide"
        subtitleClassName="max-w-none sm:max-w-none md:whitespace-nowrap"
        cards={ABOUT_WISH_POINTS}
      />

      {/* What we stand for */}
      <LandingSection
        tone="white"
        className="bg-gradient-to-b from-[#f8fdfd] via-[#eafbfb] to-[#e3f6fa] pb-10 pt-16 md:py-20 lg:py-24"
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

      <AboutApproachTimeline />

      <AboutTrustedMarquee />

      {/* Final CTA */}
      <PageFinale backdropClassName="surface-cyan">
        <PageFinaleCTA
          kicker="Make your first wish"
          title="What is your clinic's growth wish?"
          highlight="wish"
          body="Tell us about your clinic, your specialty, and the enquiries you want to attract."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          secondaryCta={{ href: "/portfolio", label: "View Our Works" }}
          footnote="No vague wishes. No confusing jargon. Just a clearer path to responsible clinic marketing."
        />
      </PageFinale>
    </div>
  );
}
