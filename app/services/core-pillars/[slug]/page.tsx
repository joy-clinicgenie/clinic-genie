import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SparkleField } from "@/components/ui/SparkleField";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { PortfolioWorksCarousel } from "@/components/home/landing/PortfolioWorksCarousel";
import { CORE_PILLARS, getPillar } from "@/lib/data/pillars";
import { PORTFOLIO_WORKS, type PortfolioWorkSlide } from "@/lib/data/portfolio-works";

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
  const heroPanelItems = pillar.mechanicsItems.slice(0, 4);
  const grantedSlides = grantedWishSlides(pillar.grantedWishes, pillar.slug);

  // Keep light/dark alternation whether or not FindClinic's why-join section is present.
  // The Our work carousel uses the landing light band, so compliance follows specialty.
  // FAQ always uses the light cyan block for readability.
  const specialtyTone = pillar.whyJoin ? "dark" : "light";
  const complianceTone = specialtyTone === "dark" ? "light" : "dark";

  return (
    <>
      <section
        data-nav-theme="light"
        className="surface-light relative flex min-h-[64vh] items-center overflow-hidden pb-16 pt-[calc(3.25rem+env(safe-area-inset-top,0px))] text-ink-900 lg:pb-24 lg:pt-36"
      >
        <SparkleField density={28} parallax variant="cluster" className="opacity-60" />

        <Container className="relative z-10 w-full">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex max-w-xl flex-col items-start gap-6 text-left">
              <Link
                href="/services/core-pillars"
                className="inline-flex w-fit items-center gap-2 font-display text-kicker uppercase text-genie-700 transition-colors hover:text-genie-900"
              >
                <span aria-hidden="true">←</span> Core service pillars
              </Link>

              <Kicker>Core service pillar</Kicker>

              <h1 className="font-display text-h1 text-balance text-ink-900">{pillar.name}</h1>

              <h2 className="font-display text-h3 text-balance text-ink-900">{pillar.heroTitle}</h2>

              <div className="flex flex-col gap-4">
                {pillar.heroParagraph.map((para, i) => (
                  <p key={i} className="text-lead text-pretty text-ink-700">
                    {para}
                  </p>
                ))}
              </div>

              <p className="text-base italic text-ink-700">Three wishes. One growth engine.</p>

              <div className="flex w-full flex-col flex-wrap items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
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

            <GlassCard tone="light" radius="2xl" className="flex flex-col gap-5 p-7 sm:p-8">
              <div className="flex flex-col gap-2">
                <span
                  aria-hidden="true"
                  className="h-1 w-10 rounded-full"
                  style={{ background: pillar.accent }}
                />
                <Kicker>What this supports</Kicker>
              </div>
              <ul className="flex flex-col gap-3">
                {heroPanelItems.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-[#E6EEF1] bg-white/70 px-4 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: pillar.accent }}
                    />
                    <span className="font-display text-base font-semibold text-ink-900">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </Container>
      </section>

      {/* 2 — Three wishes / ecosystem intro */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          {hasWishes ? (
            <>
              <SectionHeading
                kicker={pillar.wishesSubtitle}
                title="What healthcare SEO grants your clinic"
                highlight="healthcare SEO"
                tone="light"
                align="center"
              />
              <RevealGroup className="grid gap-4 sm:grid-cols-3">
                {pillar.wishes.map((wish) => (
                  <RevealItem key={wish.title}>
                    <GlassCard tone="light" radius="xl" className="flex h-full flex-col gap-2 p-6">
                      <span
                        aria-hidden="true"
                        className="h-1 w-10 rounded-full"
                        style={{ background: pillar.accent }}
                      />
                      <h3 className="font-display text-h4 text-ink-900">{wish.title}</h3>
                      <p className="text-sm leading-relaxed text-ink-700">{wish.body}</p>
                    </GlassCard>
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
      <Section tone="dark" id={pillar.mechanicsId}>
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <SectionHeading
              kicker={pillar.mechanicsSubtitle}
              title={pillar.mechanicsTitle}
              subtitle={pillar.mechanicsLead}
            />
            <Reveal variant="up" delay={0.1}>
              <p className="max-w-2xl text-base leading-relaxed text-onDark-muted">
                {pillar.mechanicsIntro}
              </p>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillar.mechanicsItems.map((item) => (
              <RevealItem key={item.title} className="h-full">
                <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-3 p-7">
                  <span
                    aria-hidden="true"
                    className="h-1 w-10 rounded-full"
                    style={{ background: pillar.accent }}
                  />
                  <h3 className="font-display text-h4 text-onDark">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-onDark-muted">{item.body}</p>
                  {item.link && (
                    <PillarLink
                      href={item.link.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-genie-300 transition-colors hover:text-white"
                    >
                      {item.link.label}
                      <span aria-hidden="true">→</span>
                    </PillarLink>
                  )}
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

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

      {/* 5 — Specialty matrix */}
      <Section tone={specialtyTone}>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker={pillar.specialtySubtitle}
            title={pillar.specialtyTitle}
            subtitle={pillar.specialtyLead}
            tone={specialtyTone}
            align="center"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {pillar.specialties.map((specialty) => (
              <RevealItem key={specialty.title} className="h-full">
                <GlassCard
                  tone={specialtyTone}
                  radius="xl"
                  className="flex h-full flex-col gap-3 p-7"
                >
                  <h3
                    className={
                      specialtyTone === "dark"
                        ? "font-display text-h4 text-onDark"
                        : "font-display text-h4 text-ink-900"
                    }
                  >
                    {specialty.title}
                  </h3>
                  <p
                    className={
                      specialtyTone === "dark"
                        ? "text-sm leading-relaxed text-onDark-muted"
                        : "text-sm leading-relaxed text-ink-700"
                    }
                  >
                    {specialty.body}
                  </p>
                  <PillarLink
                    href={specialty.link.href}
                    className={
                      specialtyTone === "dark"
                        ? "mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-genie-300 transition-colors hover:text-white"
                        : "mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-genie-700 transition-colors hover:text-genie-900"
                    }
                  >
                    {specialty.link.label}
                    <span aria-hidden="true">→</span>
                  </PillarLink>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

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
      <Section tone={complianceTone}>
        <Container size="prose" className="flex flex-col gap-8">
          <SectionHeading
            kicker="Compliance"
            title={pillar.complianceTitle}
            highlight="conscience"
            tone={complianceTone}
            align="center"
          />
          <Reveal variant="up">
            <p
              className={
                complianceTone === "dark"
                  ? "text-center text-base leading-relaxed text-onDark-muted"
                  : "text-center text-base leading-relaxed text-ink-700"
              }
            >
              {pillar.complianceBody}
            </p>
          </Reveal>
          {pillar.complianceTrustNote && (
            <Reveal variant="up" delay={0.05}>
              <GlassCard radius="xl" className="flex items-start gap-3 p-5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-genie-100 text-genie-700">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M8 1l1.8 3.9L14 5.4l-3 3 .8 4.3L8 10.8 4.2 12.7 5 8.4l-3-3 4.2-.5L8 1z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-ink-700">{pillar.complianceTrustNote}</p>
              </GlassCard>
            </Reveal>
          )}
          <Reveal variant="up" delay={0.1} className="flex justify-center">
            <MagneticButton
              href={pillar.complianceCta.href}
              size="md"
              variant="ghost"
              tone={complianceTone === "dark" ? "dark" : "light"}
              className={
                complianceTone === "dark" ? undefined : "text-genie-700 hover:text-genie-900"
              }
            >
              {pillar.complianceCta.label} →
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>

      {/* 8 — FAQs */}
      {hasFaqs && pillar.faqs && (
        <Section tone="light" className="surface-cyan">
          <Container size="prose" className="flex flex-col gap-10">
            <SectionHeading
              kicker="Frequently Asked Questions"
              title={`${pillar.name}, explained.`}
              tone="light"
              align="center"
            />
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
