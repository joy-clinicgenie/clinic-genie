import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EcosystemConnection } from "@/components/ui/EcosystemConnection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FaqSection } from "@/components/ui/FaqSection";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { ComplianceCards } from "@/components/home/landing/ComplianceCards";
import { LandingIntro, LandingSection } from "@/components/home/landing/LandingLayout";
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";
import { PillarHero } from "@/components/services/PillarHero";
import { PillarMechanicsSection } from "@/components/services/PillarMechanicsSection";
import { PillarSpecialtySection } from "@/components/services/PillarSpecialtySection";
import { PillarWhyJoinSection } from "@/components/services/PillarWhyJoinSection";
import shineStyles from "@/components/services/PillarShineTitle.module.css";
import {
  getPillarHeroImage,
  getPillarHeroImageClass,
} from "@/lib/data/pillar-hero-images";
import { CORE_PILLARS, getPillar } from "@/lib/data/pillars";
import { pageMetadata } from "@/lib/seo";
import {
  normalizeClinicKey,
  PORTFOLIO_WORKS,
  type PortfolioWorkSlide,
} from "@/lib/data/portfolio-works";
import { cn } from "@/lib/cn";

/**
 * Build a full 10-card works carousel: pillar-featured clinics first
 * (with pillar-specific summaries), then the remaining portfolio works.
 */
function grantedWishSlides(
  wishes: { name: string; summary: string; href: string }[],
  slug: string
): PortfolioWorkSlide[] {
  const used = new Set<string>();
  const slides: PortfolioWorkSlide[] = [];

  for (const wish of wishes) {
    const wishKey = normalizeClinicKey(wish.name);
    const match = PORTFOLIO_WORKS.find((work) => {
      const workKey = normalizeClinicKey(work.title);
      return (
        wishKey === workKey ||
        wishKey.includes(workKey) ||
        workKey.includes(wishKey)
      );
    });
    if (!match) continue;

    const matchKey = normalizeClinicKey(match.title);
    if (used.has(matchKey)) continue;
    used.add(matchKey);

    slides.push({
      ...match,
      id: `${slug}-granted-${slides.length}`,
      title: wish.name,
      category: wish.summary,
      line: wish.summary,
      href: wish.href || match.href,
    });
  }

  for (const work of PORTFOLIO_WORKS) {
    const key = normalizeClinicKey(work.title);
    if (used.has(key)) continue;
    used.add(key);
    slides.push(work);
  }

  return slides;
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function PillarLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function generateStaticParams() {
  return CORE_PILLARS.map((p) => ({ slug: p.slug }));
}

const PILLAR_KEYWORDS: Record<string, string[]> = {
  findclinic: ["FindClinic.sg", "clinic discovery Singapore", "healthcare directory"],
  "healthcare-seo": ["healthcare SEO", "medical SEO Singapore", "clinic search visibility"],
  "medical-sem": ["medical SEM", "Google Ads for clinics", "healthcare paid search"],
  "branding-copywriting": ["clinic branding", "healthcare copywriting", "clinic messaging"],
  "web-design-development": [
    "clinic website design",
    "clinic website development",
    "healthcare websites",
  ],
  "photo-video": ["clinic photography", "healthcare videography", "clinic visuals"],
  "social-media": ["clinic social media", "healthcare social media Singapore"],
  "geo-ai-search": ["GEO", "AI search readiness", "clinic AI visibility"],
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pillar = getPillar(params.slug);
  if (!pillar) {
    return pageMetadata({
      title: "Service not found",
      description:
        "This Clinic Genie service page could not be found. Explore our core service pillars instead.",
      path: "/services",
      index: false,
      follow: true,
    });
  }

  return pageMetadata({
    title: pillar.name,
    description: pillar.heroParagraph.join(" "),
    path: `/services/core-pillars/${pillar.slug}`,
    keywords: PILLAR_KEYWORDS[pillar.slug],
  });
}

export default function PillarPage({ params }: { params: { slug: string } }) {
  const pillar = getPillar(params.slug);
  if (!pillar) notFound();

  const hasWishes = pillar.wishes.length > 0;
  const hasWishesShine = Boolean(pillar.wishesHighlight);
  const hasFaqs = Boolean(pillar.faqs && pillar.faqs.length > 0);
  const heroImageSrc = getPillarHeroImage(pillar.slug);
  const heroImageClass = getPillarHeroImageClass(pillar.slug);
  const grantedSlides = grantedWishSlides(pillar.grantedWishes, pillar.slug);

  return (
    <div className="min-h-screen bg-genie-20 text-ink-900">
      <PillarHero
        pillar={pillar}
        wishImageSrc={heroImageSrc}
        imageClassName={heroImageClass}
      />

      {/* 2 — Three wishes / ecosystem intro */}
      <Section
        tone="light"
        className={cn(
          "overflow-hidden max-lg:pt-14 max-lg:pb-16",
          hasWishesShine && shineStyles.shineHost
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-genie-20 via-8% via-cg-mist to-cg-mist"
        />
        <Container
          className={cn(
            "relative flex flex-col",
            hasWishes ? "max-lg:gap-8 lg:gap-12" : "max-lg:gap-0 lg:gap-12"
          )}
        >
          {hasWishes ? (
            <>
              <SectionHeading
                title={pillar.wishesSubtitle}
                highlight={pillar.wishesHighlight}
                highlightClassName={shineStyles.shineTitle}
                tone="light"
                align="center"
                titleClassName="max-w-none max-lg:max-w-xs"
              />
              <EcosystemConnection
                from="Clinic Genie"
                to={pillar.name}
                className="lg:hidden"
              />
              <RevealGroup className="grid gap-5 md:grid-cols-3">
                {pillar.wishes.map((wish) => (
                  <RevealItem key={wish.title} className="h-full">
                    <FeatureInfoCard
                      title={wish.title}
                      body={wish.body}
                      href={wish.link?.href}
                      ariaLabel={
                        wish.link
                          ? `${wish.link.label}: ${wish.body}`
                          : undefined
                      }
                      className="h-full"
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-4 text-center">
                <Reveal variant="upSoft">
                  <SectionEyebrow align="center">{pillar.wishesSubtitle}</SectionEyebrow>
                </Reveal>
                <SectionHeading
                  title={pillar.wishesTitle ?? pillar.name}
                  highlight={pillar.wishesHighlight}
                  highlightClassName={
                    pillar.wishesHighlight ? shineStyles.shineTitle : undefined
                  }
                  tone="light"
                  align="center"
                  titleClassName="max-lg:max-w-xs"
                />
              </div>
              <EcosystemConnection
                from="Clinic Genie"
                to={pillar.name}
                className="max-lg:mt-8 lg:hidden"
              />
              {pillar.wishesIntro && (
                <div className="mx-auto flex w-4/5 max-w-2xl flex-col gap-4 text-center max-lg:mt-8 lg:w-full">
                  {pillar.wishesIntro.map((para, i) => (
                    <Reveal key={i} variant="upSoft" delay={0.66}>
                      <p className="text-lead text-pretty text-ink-700">{para}</p>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      {/* 3 — Mechanics / offers */}
      <PillarMechanicsSection pillar={pillar} />

      {/* 4 — Why clinics join (FindClinic only) */}
      {pillar.whyJoin && (
        <PillarWhyJoinSection
          kicker={pillar.whyJoin.subtitle}
          title={pillar.whyJoin.title}
          subtitle={pillar.whyJoin.paragraph}
          points={pillar.whyJoin.points}
        />
      )}

      {/* 5 — Specialty matrix (landing specialist design) */}
      <PillarSpecialtySection
        kicker={pillar.specialtySubtitle}
        title={pillar.specialtyTitle}
        subtitle={pillar.specialtyLead}
        specialties={pillar.specialties}
      />

      {/* 6 — Granted wishes / Our work */}
      <Reveal delay={0.08} className="w-full overflow-visible">
        <PortfolioWorksCarousel
          variant="showcase"
          kicker={pillar.grantedSubtitle}
          title={pillar.grantedTitle}
          body={pillar.grantedIntro}
          cta={{
            label: pillar.grantedCta.label,
            href: pillar.grantedCta.href,
          }}
          slides={grantedSlides}
        />
      </Reveal>

      {/* 7 — FAQs */}
      {hasFaqs && pillar.faqs ? (
        <FaqSection
          items={pillar.faqs}
          subtitle={`Everything you need to know about ${pillar.name}.`}
          idPrefix={`pillar-${pillar.slug}`}
        />
      ) : null}

      {/* 8 — Compliance */}
      <LandingSection
        id="compliance"
        tone="cyan"
        className="py-24"
        containerClassName="flex flex-col gap-12"
      >
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
            <MagneticButton href={pillar.complianceCta.href} size="md" withMiniOrb>
              {pillar.complianceCta.label}
            </MagneticButton>
          </div>
        </Reveal>
      </LandingSection>

      {/* 9 — Final CTA */}
      <PageFinale backdropClassName="surface-cyan">
        <PageFinaleCTA
          kicker={pillar.finalSubtitle}
          title={pillar.finalTitle}
          body={pillar.finalParagraph}
          primaryCta={{
            href: pillar.finalPrimaryCta.href,
            label: pillar.finalPrimaryCta.label,
          }}
          secondaryCta={
            pillar.finalSecondaryCta
              ? {
                  href: pillar.finalSecondaryCta.href,
                  label: pillar.finalSecondaryCta.label,
                }
              : undefined
          }
        />
      </PageFinale>
    </div>
  );
}
