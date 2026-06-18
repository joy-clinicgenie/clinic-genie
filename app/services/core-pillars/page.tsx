import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { LightHero } from "@/components/ui/LightHero";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { CORE_PILLARS } from "@/lib/data/pillars";

export const metadata: Metadata = {
  title: "Core Service Pillars — The Full Clinic Genie Toolkit | Clinic Genie",
  description:
    "Eight core service pillars that grow specialist clinics: FindClinic.sg, Healthcare SEO, Medical SEM, Branding & Copywriting, Web Design & Development, Photo & Video, Social Media, and GEO & AI Search.",
};

export default function CorePillarsPage() {
  return (
    <>
      <LightHero
        leading={
          <Link
            href="/services"
            className="inline-flex w-fit items-center gap-2 font-display text-kicker uppercase text-genie-700 transition-colors hover:text-genie-900"
          >
            <span aria-hidden="true">←</span> Services
          </Link>
        }
        kicker="Core service pillars"
        title="Eight pillars. One growth engine."
        highlight="growth engine"
        subtitle="Every core service we offer, built to work together. Explore each pillar to see exactly how it helps your clinic get discovered, understood, and trusted by the right patients."
        primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        minHeight="min-h-[60vh]"
      />

      {/* 2 — Pillar grid */}
      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="The toolkit"
            title="Choose where your clinic needs the most magic."
            highlight="magic"
            subtitle="Each pillar stands on its own — and works even harder alongside the others."
            align="center"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CORE_PILLARS.map((pillar, i) => (
              <RevealItem key={pillar.slug} className="h-full">
                <Link
                  href={`/services/core-pillars/${pillar.slug}`}
                  className="group block h-full"
                  aria-label={`Explore ${pillar.name}`}
                >
                  <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold text-night-900"
                        style={{ background: pillar.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-h4 text-onDark">{pillar.name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-onDark-muted">{pillar.heroTitle}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-genie-300 transition-colors group-hover:text-white">
                      Explore pillar
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </GlassCard>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 3 — Final CTA */}
      <PageFinale>
        <PageFinaleCTA
          kicker="Not sure where to start?"
          title="Tell us your wish."
          highlight="wish"
          body="Book a free strategy call and we'll recommend the right mix of pillars for your clinic — no hard sell."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        />
      </PageFinale>
    </>
  );
}
