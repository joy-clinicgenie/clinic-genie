import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GenieFeatureCards } from "@/components/ui/GenieFeatureCards";
import { GlassCard } from "@/components/ui/GlassCard";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { LightHero } from "@/components/ui/LightHero";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { CLIENT_LOGOS } from "@/lib/data/client-logos";
import {
  ABOUT_APPROACH_STEPS,
  ABOUT_TEAM_ROLES,
  ABOUT_TRUSTED_CLIENTS,
  ABOUT_VALUES,
  ABOUT_WISH_POINTS,
} from "@/lib/data/about";

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
        kicker="About Clinic Genie"
        title="The genie behind better clinic growth."
        highlight="genie"
        subtitle="Behind every clinic is a wish: to be found by the patients who need it most. Clinic Genie grants it. A medical marketing agency for specialist clinics in Singapore, helping good doctors get found, trusted, and chosen, while you focus on the magic only you can do."
        primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        secondaryCta={{ href: "/services", label: "See the Magic We've Made" }}
      />

      <GenieFeatureCards
        id="why-we-exist"
        kicker="Why we exist"
        title="Every genie has an origin."
        highlight="origin"
        subtitle="Ours began in the gap between great care and getting found. Too many brilliant healthcare specialists stayed invisible online, so we built a medical marketing agency made just for them."
        cards={ABOUT_WISH_POINTS}
      />

      {/* 3 — What we stand for */}
      <Section tone="light" className="bg-[#ffffff]">
        <OrbAnchor
          id="about-values"
          mood="thinking"
          scale={0.85}
          intensity={0.9}
          className="absolute left-1/2 top-20 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h2"
            kicker="What we stand for"
            title="Magic has rules."
            highlight="rules"
            subtitle="The values behind our clinic marketing strategy."
            align="center"
            tone="light"
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_VALUES.map((value) => (
              <RevealItem key={value.title} className="h-full">
                <GlassCard tone="light" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: value.accent, boxShadow: `0 0 12px 1px ${value.accent}` }}
                  />
                  <h3 className="font-display text-h4 text-ink-900">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{value.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1} className="text-center">
            <p className="mx-auto max-w-2xl font-display text-h5 text-balance text-ink-700">
              Ethical in practice. Emotional in craft. Logical in strategy.{" "}
              <span className="genie-text">That is the magic.</span>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 4 — Our approach */}
      <Section tone="light" className="bg-[#ffffff]">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h2"
            kicker="Our approach"
            title="Clear thinking before clearer growth."
            highlight="growth"
            tone="light"
            subtitle="Every good wish needs a plan. This is our healthcare growth framework — clear, connected, and strictly accountable."
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {ABOUT_APPROACH_STEPS.map((step) => (
              <RevealItem key={step.n} className="h-full">
                <GlassCard tone="light" radius="xl" className="flex h-full flex-col gap-3 p-6">
                  <span className="font-display text-sm font-semibold text-genie-700">{step.n}.</span>
                  <h3 className="font-display text-lg font-semibold text-ink-900">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{step.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.08} className="flex flex-col items-center gap-6 text-center">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-700">
              One growth engine, built within Singapore&apos;s HCSA, PHMC, and SMC guidelines.
            </p>
            <MagneticButton href="/services" variant="secondary">
              See How the Magic Happens
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>

      {/* 5 — Trusted by specialist clinics */}
      <Section tone="light" className="bg-[#ffffff]">
        <OrbAnchor
          id="about-clients"
          mood="celebrate"
          scale={0.9}
          intensity={1}
          className="absolute left-1/2 top-16 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h2"
            kicker="Trusted by specialist clinics"
            title="The clinics who made a wish."
            highlight="wish"
            align="center"
            tone="light"
            subtitle="Specialist clinics across Singapore trust Clinic Genie with their branding, websites, search, and growth."
          />
          <Reveal delay={0.05}>
            <LogoMarquee logos={CLIENT_LOGOS} className="opacity-90" />
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {ABOUT_TRUSTED_CLIENTS.map((client) => {
              const isExternal = client.href.startsWith("http");
              const card = (
                <GlassCard tone="light" radius="xl" hover className="flex h-full flex-col gap-2 p-6">
                  <h3 className="font-display text-base font-semibold text-ink-900">{client.name}</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{client.services}</p>
                </GlassCard>
              );

              return (
                <RevealItem key={client.name} className="h-full">
                  {isExternal ? (
                    <a
                      href={client.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                      aria-label={`${client.name} — ${client.services}`}
                    >
                      {card}
                    </a>
                  ) : (
                    <Link href={client.href} className="group block h-full">
                      {card}
                    </Link>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* 6 — Clinic Genie ecosystem */}
      <Section tone="light" className="bg-[#ffffff]">
        <Container size="prose" className="flex flex-col gap-8">
          <SectionHeading
            as="h2"
            kicker="Clinic Genie ecosystem"
            title="Two genies, one wish."
            highlight="wish"
            tone="light"
            align="center"
            subtitle="Clinic Genie builds the visibility. FindClinic.sg extends it, through clinic profiles, doctor-led content, healthcare articles, and patient-facing education. Two parts of the same wish: helping the right patients find the right care."
          />
          <Reveal className="flex justify-center">
            <MagneticButton href="/services/core-pillars/findclinic" withMiniOrb>
              Discover FindClinic.sg
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>

      {/* 7 — People behind it */}
      <Section tone="light" className="bg-[#ffffff]">
        <OrbAnchor
          id="about-team"
          mood="curious"
          scale={0.85}
          className="absolute left-1/2 top-20 h-px w-px -translate-x-1/2"
        />
        <Container size="wide" className="flex flex-col gap-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex max-w-2xl flex-col gap-4">
              <Kicker tone="light">Meet the Genies Behind the Magic</Kicker>
              <h2 className="font-display text-h2 text-balance text-ink-900">
                A boutique band of medical marketing experts.
              </h2>
              <p className="text-lead text-ink-700">
                Daring, innovative, and built for specialist clinics. Different crafts, one growth engine.
              </p>
            </div>
            <MagneticButton href="/meet-us" variant="secondary">
              Meet us
            </MagneticButton>
          </div>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_TEAM_ROLES.map((role) => (
              <RevealItem key={role.title} className="h-full">
                <GlassCard tone="light" radius="xl" hover className="flex h-full flex-col gap-3 p-6">
                  <h3 className="font-display text-base font-semibold text-ink-900">{role.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{role.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 8 — Final CTA */}
      <Section tone="light" className="bg-[#ffffff] pb-32">
        <Container className="flex flex-col items-center gap-7 text-center">
          <Reveal>
            <Kicker tone="light">Make your first wish</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-h2 text-balance text-ink-900">
              What is your clinic&apos;s growth{" "}
              <span className="genie-text">wish?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-full text-lead text-pretty text-ink-700 sm:max-w-[75%]">
              Tell us about your clinic, your specialty, and the enquiries you want to attract. No vague
              wishes. No confusing jargon. Just a clearer path to responsible clinic marketing.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="/contact" size="lg" withMiniOrb>
                Make Your First Wish
              </MagneticButton>
              <MagneticButton href="/contact" size="lg" variant="secondary">
                Send Your Wish to the Genie
              </MagneticButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
