import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { LightHero } from "@/components/ui/LightHero";
import { PageFinale } from "@/components/ui/PageFinale";
import {
  LandingKicker,
  LandingHeading,
  LandingBody,
} from "@/components/home/landing/LandingLayout";
import { SITE } from "@/lib/data/nav";

export const metadata: Metadata = {
  title: "Wish Received | Clinic Genie",
  description:
    "Thank you for reaching out to Clinic Genie. We have your enquiry and will look at it with your clinic, goals, and growth in mind.",
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  {
    title: "We read your wish",
    body: "Your clinic, website, goals, and digital presence.",
  },
  {
    title: "We find the right next step",
    body: "A reply, a discovery call, or a few more questions.",
  },
  {
    title: "We follow up with direction",
    body: "We will come back to you with a clear next step, shaped around what you want to improve.",
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
      <LightHero
        kicker="Wish received"
        title="Your wish is on its way to the genie."
        highlight="genie"
        subtitle="Thank you for reaching out. We have your enquiry, and we will look at it with your clinic, your goals, and your growth in mind."
        primaryCta={{ href: "/", label: "Return to Homepage" }}
        secondaryCta={{ href: "/portfolio", label: "See the Magic We've Made" }}
        showWishForm={false}
        align="center"
      />

      {/* 2 — What happens next */}
      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Next steps"
            title="We read the right signals first."
            highlight="signals"
            align="center"
            subtitle="A useful reply starts with context. We will look at what you shared, your clinic, website, service interest, and the support you are after."
          />
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {NEXT_STEPS.map((step, i) => (
              <RevealItem key={step.title} className="h-full">
                <GlassCard tone="dark" radius="2xl" className="flex h-full flex-col gap-4 p-7">
                  <span className="font-display text-kicker uppercase tracking-[0.18em] text-genie-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-h3 text-onDark">{step.title}</h3>
                  <p className="text-pretty text-onDark-muted">{step.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal variant="up" className="text-center">
            <p className="text-sm text-onDark-faint">
              We aim to respond within 1 to 2 business days.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 3 — While you wait */}
      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Useful paths"
            title="Peek inside the lamp."
            highlight="lamp"
            align="center"
            subtitle="Curious how Clinic Genie thinks about visibility, trust, and patient search? These are a good place to start."
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {USEFUL_PATHS.map((path) => (
              <RevealItem key={path.href} className="h-full">
                <Link href={path.href} className="group block h-full" aria-label={path.title}>
                  <GlassCard tone="dark" radius="2xl" hover className="flex h-full flex-col gap-3 p-7">
                    <h3 className="font-display text-lg font-semibold text-onDark transition-colors group-hover:text-white">
                      {path.title}
                    </h3>
                    <p className="flex-1 text-pretty text-sm text-onDark-muted">{path.body}</p>
                    <span
                      aria-hidden="true"
                      className="text-sm font-semibold text-genie-200 transition-colors group-hover:text-white"
                    >
                      Explore →
                    </span>
                  </GlassCard>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 4 — Need to add context */}
      <PageFinale>
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
