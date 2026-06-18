import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LightHero } from "@/components/ui/LightHero";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { PageFinale } from "@/components/ui/PageFinale";
import {
  LandingKicker,
  LandingHeading,
  LandingBody,
} from "@/components/home/landing/LandingLayout";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Tell Us Your Clinic's Wish",
  description:
    "Whatever you are dreaming up, launching, redesigning, or growing, it starts with one conversation. Tell Clinic Genie where your clinic wants to grow.",
  alternates: { canonical: "/contact" },
};

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
      <LightHero
        kicker="Contact"
        title="Tell us your clinic's wish."
        highlight="wish"
        subtitle="Whatever you are dreaming up, launching, redesigning, or growing, it starts with one conversation. We will help you make it happen."
      />

      {/* 2 — Contact form */}
      <Section tone="dark">
        <OrbAnchor
          id="contact-form"
          mood="thinking"
          scale={0.95}
          intensity={0.9}
          className="absolute left-1/2 top-16 hidden h-px w-px -translate-x-1/2 lg:block"
        />
        <Container size="wide">
          <Reveal variant="up">
            <ContactForm />
          </Reveal>
        </Container>
      </Section>

      {/* 3 — What happens next */}
      <Section tone="dark">
        <OrbAnchor
          id="contact-next"
          mood="thinking"
          scale={0.85}
          intensity={0.85}
          className="absolute right-[8%] top-1/4 hidden h-px w-px lg:block"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="What happens next"
            title="A clear next step, not a sales pitch."
            highlight="next step"
            align="center"
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
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
        </Container>
      </Section>

      {/* 4 — Before you enquire */}
      <PageFinale>
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
              <MagneticButton href="/genie-tips" size="lg" withMiniOrb>
                Read the Genie&apos;s Insights
              </MagneticButton>
            </Reveal>
            <Reveal variant="up" delay={0.15}>
              <p className="text-sm text-[#8FB7C2]">
                <span className="font-mono uppercase tracking-[0.14em] text-[#9FDCE8]">Genie Insights</span>
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
