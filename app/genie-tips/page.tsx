import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SparkleField } from "@/components/ui/SparkleField";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { PostGrid } from "@/components/blog/PostGrid";
import { NewsletterCapture } from "@/components/blog/NewsletterCapture";
import { POSTS } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Genie Tips: Clinic Growth, Demystified | Clinic Genie",
  description:
    "Practical, compliance-aware advice on SEO, ads, websites and brand — written for clinic owners and specialist doctors in Singapore.",
};

const featured = POSTS.find((p) => p.featured) ?? POSTS[0];

export default function GenieTipsPage() {
  return (
    <>
      {/* 1 — Hero */}
      <Section tone="dark" className="bg-aurora-hero overflow-hidden pb-20 pt-36 md:min-h-[68vh]">
        <SparkleField density={32} parallax />
        <OrbAnchor
          id="genie-tips-hero"
          variant="blog"
          mood="curious"
          scale={0.9}
          intensity={0.7}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />
        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-6">
            <Reveal variant="up">
              <Kicker>Genie Tips</Kicker>
            </Reveal>
            <SectionHeading
              title="Clinic growth, demystified."
              highlight="demystified"
              as="h1"
              subtitle="Practical, compliance-aware advice on SEO, ads, websites and brand — written for clinic owners and specialist doctors in Singapore. Free wishes, basically."
            />
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
        />
      </Section>

      {/* 2 — Featured post */}
      <Section tone="light">
        <Container size="wide" className="flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <Kicker tone="light">The wish of the month</Kicker>
          </div>
          <Reveal variant="up">
            <Link
              href={`/genie-tips/${featured.slug}`}
              className="group block"
              aria-label={`Read featured Genie Tip: ${featured.title}`}
            >
              <GlassCard
                tone="light"
                radius="2xl"
                hover
                className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center"
              >
                <div className="flex flex-col gap-5">
                  <span className="inline-flex w-fit items-center rounded-pill bg-genie-100 px-3 py-1 font-mono text-xs uppercase tracking-wider text-genie-700">
                    Featured · {featured.category}
                  </span>
                  <h2 className="font-display text-h2 leading-tight text-ink-900 transition-colors group-hover:text-genie-700">
                    {featured.title}
                  </h2>
                  <p className="text-lead text-ink-700">{featured.dek}</p>
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <span className="inline-flex items-center gap-2 font-semibold text-genie-700">
                      Read the playbook
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M3 8h9m0 0l-3.5-3.5M12 8l-3.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-ui ease-out-soft group-hover:translate-x-0.5"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-ink-500">
                      {featured.readingTime} · {featured.updated}
                    </span>
                  </div>
                </div>

                <div className="relative hidden lg:block">
                  <OrbAnchor
                    id="featured-tip"
                    mood="focus"
                    scale={0.8}
                    className="absolute -right-2 top-1/2 h-px w-px -translate-y-1/2"
                  />
                  <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-genie-100 via-white to-genie-50">
                    <div
                      aria-hidden="true"
                      className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle_at_35%_30%,#EAF8FE,#6CBAD9_55%,#1E5C78)] opacity-90 blur-[1px] shadow-[0_0_60px_12px_rgba(127,233,240,0.45)] motion-safe:animate-glow-breathe"
                    />
                    <span className="relative z-10 max-w-[12rem] text-center font-display text-h4 text-ink-900/80">
                      The honest healthcare SEO playbook
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* 3 — Category filter + post grid */}
      <Section tone="light" id="all-tips">
        <Container size="wide" className="flex flex-col gap-12">
          <SectionHeading
            kicker="Every wish, filed and findable"
            title="Browse the genie's library."
            highlight="library"
            tone="light"
            align="center"
            subtitle="Filter by what you need to fix next. The orb sorts the shelves for you."
          />
          <PostGrid />
        </Container>
      </Section>

      {/* 4 — Newsletter capture */}
      <Section tone="dark">
        <NewsletterCapture />
      </Section>

      {/* 5 — Final CTA */}
      <Section tone="dark" className="overflow-hidden">
        <OrbAnchor
          id="genie-tips-cta"
          mood="celebrate"
          scale={1.05}
          intensity={1}
          className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            kicker="Skip the reading"
            title="Prefer we just handle it?"
            highlight="handle"
            align="center"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-onDark-muted">
              Tips are free, but a plan is faster. Book a 30-minute strategy call and we&apos;ll show you exactly where
              your clinic&apos;s next patients are searching.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticButton href="/contact" size="lg" withMiniOrb>
              Book a strategy call
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-sm text-onDark-faint">No obligation. No jargon. Just a clear next step.</p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
