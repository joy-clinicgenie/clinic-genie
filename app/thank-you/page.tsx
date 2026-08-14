import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { PageFinale } from "@/components/ui/PageFinale";
import {
  LandingKicker,
  LandingHeading,
  LandingBody,
} from "@/components/home/landing/LandingLayout";
import { ThankYouHero } from "@/components/contact/ThankYouHero";
import { SITE } from "@/lib/data/nav";

export const metadata: Metadata = pageMetadata({
  title: "Wish Received",
  description:
    "Thank you for reaching out to Clinic Genie. We have your enquiry and will look at it with your clinic, goals, and growth in mind.",
  path: "/thank-you",
  index: false,
  follow: false,
});

const NEXT_STEPS = [
  {
    title: "We read your wish",
    body: "We look at your clinic, website, goals, and the support you are asking about.",
  },
  {
    title: "We find the right starting point",
    body: "A strategy call, a discovery chat, or a few more questions, whatever fits.",
  },
  {
    title: "We talk growth priorities",
    body: "Your specialty, your patients, your current presence, and where you want to be.",
  },
  {
    title: "We point you in a direction",
    body: "If there is a fit, we show you exactly how Clinic Genie can help your clinic grow.",
  },
];

const USEFUL_PATHS = [
  {
    title: "Healthcare SEO",
    body: "How clinics build lasting visibility around how patients search.",
    href: "/services/core-pillars/healthcare-seo",
  },
  {
    title: "Web Design and Development",
    body: "How clearer websites earn trust, and turn visits into enquiries.",
    href: "/services/core-pillars/web-design-development",
  },
  {
    title: "GEO and AI Search",
    body: "How structured content gets clinics ready for AI-led discovery.",
    href: "/services/core-pillars/geo-ai-search",
  },
  {
    title: "Compliance Guide",
    body: "How responsible marketing protects credibility while growing visibility.",
    href: "/services#compliance",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <ThankYouHero />

      {/* Next steps — mirrors contact "What happens next" */}
      <Section tone="light" className="![background:#f4f7f8]">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Next steps"
            title="A clear next step, not a sales pitch."
            highlight="next step"
            align="center"
            tone="light"
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NEXT_STEPS.map((step, i) => (
              <RevealItem key={step.title} className="h-full">
                <GlassCard
                  tone="light"
                  radius="2xl"
                  className="flex h-full flex-col gap-4 p-6 sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-genie-500/15 font-sans text-sm font-semibold text-genie-700"
                  >
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-[1.125rem] font-semibold leading-snug text-ink-900">
                      {step.title}
                    </h3>
                    <p className="text-pretty text-body leading-relaxed text-ink-700">
                      {step.body}
                    </p>
                  </div>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Useful paths — FeatureInfoCard style from pillar specialty section */}
      <Section tone="light" className="bg-none bg-white">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Useful paths"
            title="Peek inside the lamp."
            highlight="lamp"
            align="center"
            tone="light"
            subtitle="Curious how Clinic Genie thinks about visibility, trust, and patient search? These are a good place to start."
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {USEFUL_PATHS.map((path) => (
              <RevealItem key={path.href} className="h-full">
                <FeatureInfoCard
                  title={path.title}
                  body={path.body}
                  href={path.href}
                  ariaLabel={`${path.title}: ${path.body}`}
                  className="h-full"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Need to add context */}
      <PageFinale backdropClassName="bg-white">
        <section className="pb-24 pt-16">
          <Container className="flex flex-col items-center gap-8 text-center">
            <LandingKicker light>Additional details</LandingKicker>
            <LandingHeading highlight="share" light>
              Have more to share?
            </LandingHeading>
            <LandingBody light>
              A website link, campaign details, a challenge you are facing, anything that helps us help you. Send it
              across and we will fold it in.
            </LandingBody>
            <Reveal variant="up" delay={0.1}>
              <MagneticButton href={`mailto:${SITE.email}`} size="lg" variant="ghost" tone="light">
                Email {SITE.email}
              </MagneticButton>
            </Reveal>
          </Container>
        </section>
      </PageFinale>
    </>
  );
}
