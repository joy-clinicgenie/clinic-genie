import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { ComplianceCards } from "@/components/home/landing/ComplianceCards";
import { LandingIntro, LandingSection } from "@/components/home/landing/LandingLayout";
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";
import { PillarMechanicsSection } from "@/components/services/PillarMechanicsSection";
import { PillarSpecialtySection } from "@/components/services/PillarSpecialtySection";
import { CORE_PILLARS, getPillar } from "@/lib/data/pillars";
import { PORTFOLIO_WORKS, type PortfolioWorkSlide } from "@/lib/data/portfolio-works";
import { WISH_STACK_IMAGES } from "@/lib/data/wish-stack-images";

const GRANTED_GRADIENTS = [
  "linear-gradient(145deg, #F7FAFB 0%, #EAFBFB 45%, #54B9CE 100%)",
  "linear-gradient(145deg, #F3F5F6 0%, #C9E4EA 50%, #217B8E 100%)",
  "linear-gradient(145deg, #F7FAFB 0%, #EAFBFB 50%, #78E2DD 100%)",
  "linear-gradient(145deg, #F7FAFB 0%, #D8EEF5 50%, #3A8093 100%)",
  "linear-gradient(145deg, #FAFBFC 0%, #E3F6FA 50%, #006B7C 100%)",
] as const;

function grantedWishSlides(
  wishes: { name: string; summary: string; href: string }[],
  slug: string
): PortfolioWorkSlide[] {
  return wishes.map((wish, index) => {
    const wishKey = wish.name.toLowerCase();
    const match = PORTFOLIO_WORKS.find((work) => {
      const workKey = work.title.toLowerCase();
      return (
        wishKey === workKey ||
        wishKey.includes(workKey) ||
        workKey.includes(wishKey.replace(/\s+clinic$/, "").trim())
      );
    });

    return {
      id: `${slug}-granted-${index}`,
      title: wish.name,
      category: wish.summary,
      line: wish.summary,
      href: wish.href,
      image: match?.image,
      gradient: match?.gradient ?? GRANTED_GRADIENTS[index % GRANTED_GRADIENTS.length],
    };
  });
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
  const hasFaqs = Boolean(pillar.faqs && pillar.faqs.length > 0);
  const wishImage = WISH_STACK_IMAGES[pillar.slug];
  const grantedSlides = grantedWishSlides(pillar.grantedWishes, pillar.slug);

  return (
    <>
      <section
        data-nav-theme="light"
        className="relative flex min-h-[64vh] items-center overflow-hidden bg-white pb-16 pt-[calc(3.25rem+env(safe-area-inset-top,0px))] text-ink-900 lg:pb-24 lg:pt-36"
      >
        {wishImage ? (
          <Image
            src={wishImage.src}
            alt=""
            fill
            priority
            className="object-cover object-center lg:object-right"
            sizes="100vw"
            aria-hidden="true"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${pillar.accent} 28%, white), color-mix(in srgb, ${pillar.accent} 12%, #f7fafb))`,
            }}
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
        />

        <Container className="relative z-10 w-full">
          <div className="flex max-w-xl flex-col items-start text-left">
            <Link
              href="/services/core-pillars"
              className="mb-5 inline-flex w-fit items-center gap-2 font-sans text-kicker uppercase text-genie-700 transition-colors hover:text-genie-900"
            >
              <span aria-hidden="true">←</span> Core service pillars
            </Link>

            <h1 className="font-display text-h1 text-balance text-ink-900">
              {pillar.heroTitle}
            </h1>

            <p className="mt-2 font-display text-[0.9375rem] font-normal text-ink-700 sm:mt-2.5 sm:text-base lg:text-h4">
              {pillar.name}
            </p>

            <div className="mt-4 flex w-full max-w-[90%] flex-col gap-3 sm:mt-5">
              {pillar.heroParagraph.map((para, i) => (
                <p key={i} className="text-body text-pretty text-ink-700">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-7 flex w-full flex-col flex-wrap items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <MagneticButton href={pillar.heroPrimaryCta.href} size="md" withMiniOrb>
                {pillar.heroPrimaryCta.label}
              </MagneticButton>
              <MagneticButton
                href={pillar.heroSecondaryCta.href}
                size="md"
                variant="ghost"
                tone="light"
              >
                {pillar.heroSecondaryCta.label}
              </MagneticButton>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — Three wishes / ecosystem intro */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          {hasWishes ? (
            <>
              <SectionHeading
                title={pillar.wishesSubtitle}
                tone="light"
                align="center"
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
        <Section tone="light">
          <Container className="flex flex-col gap-12">
            <SectionHeading
              kicker={pillar.whyJoin.subtitle}
              title={pillar.whyJoin.title}
              tone="light"
              subtitle={pillar.whyJoin.paragraph}
              align="center"
            />
            <RevealGroup className="grid gap-4 sm:grid-cols-3">
              {pillar.whyJoin.points.map((point) => (
                <RevealItem key={point.title}>
                  <GlassCard tone="light" radius="xl" className="flex h-full flex-col gap-2 p-6">
                    <span
                      aria-hidden="true"
                      className="h-1 w-10 rounded-full"
                      style={{ background: pillar.accent }}
                    />
                    <h3 className="font-display text-h4 text-ink-900">{point.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-700">{point.body}</p>
                  </GlassCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
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

      {/* 7 — Compliance */}
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

      {/* 8 — FAQs */}
      {hasFaqs && pillar.faqs && (
        <Section tone="light" className="bg-white">
          <Container size="prose" className="flex flex-col gap-12">
            <header className="flex flex-col items-center gap-3 text-center">
              <h2 className="font-display text-h2 text-balance text-ink-900">
                Frequently asked questions
              </h2>
              <p className="max-w-lg text-body text-pretty text-ink-700">
                Everything you need to know about {pillar.name}.
              </p>
            </header>
            <FaqAccordion items={pillar.faqs} tone="light" />
          </Container>
        </Section>
      )}

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
    </>
  );
}
