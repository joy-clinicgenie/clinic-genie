import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pillar = getPillar(params.slug);
  if (!pillar) {
    return {
      title: "Service not found | Clinic Genie",
      description: "The service pillar you're looking for couldn't be conjured.",
    };
  }
  return {
    title: `${pillar.name} — Core Service Pillar | Clinic Genie`,
    description: pillar.heroParagraph[0],
  };
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
    <div className="min-h-screen surface-light text-ink-900">
      <PillarHero
        pillar={pillar}
        wishImageSrc={heroImageSrc}
        imageClassName={heroImageClass}
      />

      {/* 2 — Three wishes / ecosystem intro */}
      <Section tone="light" className={cn(hasWishesShine && shineStyles.shineHost)}>
        <Container className="flex flex-col gap-12">
          {hasWishes ? (
            <>
              <SectionHeading
                title={pillar.wishesSubtitle}
                highlight={pillar.wishesHighlight}
                highlightClassName={shineStyles.shineTitle}
                tone="light"
                align="center"
                titleClassName="max-w-none"
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
              <SectionHeading
                kicker={pillar.wishesSubtitle}
                title={pillar.wishesTitle ?? pillar.name}
                highlight={pillar.wishesHighlight}
                highlightClassName={
                  pillar.wishesHighlight ? shineStyles.shineTitle : undefined
                }
                tone="light"
                align="center"
              />
              {pillar.wishesIntro && (
                <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
                  {pillar.wishesIntro.map((para, i) => (
                    <Reveal key={i} variant="up" delay={0.05 * i}>
                      <p className="text-lead text-ink-700">{para}</p>
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
