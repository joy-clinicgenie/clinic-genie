import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PageFinale } from "@/components/ui/PageFinale";
import {
  LandingKicker,
  LandingHeading,
  LandingBody,
} from "@/components/home/landing/LandingLayout";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Clinic Genie where your clinic wants to grow. Book a strategy conversation about healthcare SEO, clinic websites, medical SEM, and compliance-aware marketing in Singapore.",
  path: "/contact",
  keywords: ["clinic marketing enquiry", "book a strategy call", "Clinic Genie contact"],
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

export default function ContactPage() {
  return (
    <>
      <ContactSection />

      {/* 3 — What happens next */}
      <Section tone="light" className="![background:#f4f7f8]">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="What happens next"
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

      {/* 4 — Before you enquire */}
      <PageFinale backdropClassName="bg-[#f4f7f8]">
        <section className="py-24">
          <Container className="flex flex-col items-center gap-8 text-center">
            <LandingKicker light>Before you enquire</LandingKicker>
            <LandingHeading highlight="lamp" light>
              Peek inside the lamp.
            </LandingHeading>
            <LandingBody light>
              Real thinking on how specialist clinics get found, trusted, and chosen. SEO, SEM, websites, AI search, and
              compliance, explained simply.
            </LandingBody>
            <Reveal variant="up" delay={0.1}>
              <MagneticButton href="/genie-tips" size="lg">
                Read the Genie&apos;s Tips
              </MagneticButton>
            </Reveal>
            <Reveal variant="up" delay={0.15}>
              <p className="text-sm text-[#8FB7C2]">
                <span className="font-sans uppercase tracking-[0.14em] text-[#9FDCE8]">Genie Tips</span>
                {" · "}
                <Link href="/genie-tips" className="text-white/80 underline-offset-4 hover:text-white hover:underline">
                  Browse all articles
                </Link>
              </p>
            </Reveal>
          </Container>
        </section>
      </PageFinale>
    </>
  );
}
