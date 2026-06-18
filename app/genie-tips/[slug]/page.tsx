import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SparkleField } from "@/components/ui/SparkleField";
import { PostCard } from "@/components/blog/PostCard";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { POSTS, getPost } from "@/lib/data/posts";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) {
    return { title: "Article not found | Clinic Genie" };
  }

  // The spec gives a bespoke meta title/description for the featured cornerstone post.
  if (post.featured) {
    return {
      title: "Healthcare SEO Singapore: How Specialist Clinics Rank in 2026 | Clinic Genie",
      description:
        "A practical, compliance-aware guide to healthcare SEO for Singapore specialist clinics — what actually moves rankings and bookings in 2026.",
    };
  }

  return {
    title: `${post.title} | Clinic Genie`,
    description: post.dek,
  };
}

/**
 * A short, on-brand editorial note for posts that have a dek but no long-form
 * body yet. Derived only from the dek — no fabricated statistics or fake depth.
 */
function editorialNote(dek: string) {
  const cleaned = dek.replace(/\s+$/, "").replace(/[.!?]$/, "");
  return [
    `We're putting the finishing touches on the full guide: ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}.`,
    "Every Genie Tip is written for clinic owners and specialist doctors — practical, compliance-aware, and grounded in what we see working for clinics across Singapore. No fluff, no jargon, no claims we can't stand behind.",
    "Want the answer for your clinic specifically? That's exactly what a strategy call is for.",
  ];
}

export default function GenieTipPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const hasSections = Array.isArray(post.sections) && post.sections.length > 0;

  return (
    <>
      {/* 1 — Reading hero */}
      <Section tone="dark" className="relative min-h-[68vh] overflow-hidden bg-transparent pb-20 pt-36">
        <SparkleField density={32} parallax />
        {/* Companion orb parked in the upper-right margin of the article. */}
        <OrbAnchor
          id="post"
          variant="blog"
          mood="idle"
          scale={0.9}
          intensity={0.85}
          className="absolute right-[10%] top-[24%] hidden h-px w-px lg:block"
        />

        <Container size="prose" className="relative z-10 flex flex-col gap-6">
          <Reveal variant="up">
            <Link
              href="/genie-tips"
              className="inline-flex w-fit items-center gap-1.5 text-sm text-onDark-muted transition-colors hover:text-genie-200"
            >
              <span aria-hidden="true">←</span> Genie Tips
            </Link>
          </Reveal>

          <Reveal variant="up" delay={0.05}>
            <span className="inline-flex w-fit items-center rounded-pill bg-genie-500/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-genie-300">
              {post.category}
            </span>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="overflow-hidden">
            <h1 className="text-h1 font-display text-balance text-onDark">{post.title}</h1>
          </Reveal>

          <Reveal variant="up" delay={0.18}>
            <p className="text-sm text-onDark-faint">
              By the Clinic Genie team · {post.readingTime} · {post.updated}
            </p>
          </Reveal>
        </Container>

      </Section>

      {/* 2 — Reading body */}
      <Section tone="dark" className="bg-transparent">
        <Container size="prose" className="flex flex-col gap-12">
          <article className="flex flex-col gap-10">
            {hasSections ? (
              <>
                {post.intro && (
                  <Reveal variant="up">
                    <p className="text-lead text-pretty text-onDark-muted">{post.intro}</p>
                  </Reveal>
                )}

                {post.sections!.map((section) => (
                  <Reveal key={section.heading} variant="up" className="flex flex-col gap-4">
                    <h2 className="text-h3 font-display text-onDark">{section.heading}</h2>
                    {section.body.map((para, i) => (
                      <p key={i} className="text-body leading-relaxed text-onDark-muted">
                        {para}
                      </p>
                    ))}
                  </Reveal>
                ))}
              </>
            ) : (
              <>
                <Reveal variant="up">
                  <p className="text-lead text-pretty text-onDark-muted">{post.intro ?? post.dek}</p>
                </Reveal>

                <Reveal variant="up" delay={0.05} className="flex flex-col gap-4">
                  {editorialNote(post.dek).map((para, i) => (
                    <p key={i} className="text-body leading-relaxed text-onDark-muted">
                      {para}
                    </p>
                  ))}
                </Reveal>
              </>
            )}
          </article>

          {/* CTA box — the wish */}
          <Reveal variant="scale">
            <GlassCard tone="dark" radius="2xl" glow className="flex flex-col items-start gap-5 p-8 sm:p-10">
              <Kicker>Make your first wish</Kicker>
              <h2 className="text-h3 font-display text-balance text-onDark">
                Want this done for you? Book a free <span className="genie-text">strategy call</span>.
              </h2>
              <p className="max-w-xl text-body leading-relaxed text-onDark-muted">
                Thirty minutes, no obligation. We&apos;ll map where the right patients are searching — and exactly how to
                make your clinic the one they trust.
              </p>
              <MagneticButton href="/contact" size="lg" withMiniOrb>
                Book a strategy call
              </MagneticButton>
            </GlassCard>
          </Reveal>

          {/* Author / agency bio */}
          <Reveal variant="up">
            <div className="flex flex-col gap-2 border-t border-white/10 pt-8">
              <p className="font-display text-kicker uppercase tracking-wider text-genie-300">Written by</p>
              <p className="font-display text-h4 text-onDark">The Clinic Genie team</p>
              <p className="max-w-xl text-sm leading-relaxed text-onDark-faint">
                Strategists, writers, designers and developers who work only with clinics — turning specialist expertise
                into a digital presence patients can find, believe and book, the compliant way.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 3 — Related posts */}
      <Section tone="dark" className="bg-transparent">
        <OrbAnchor
          id="post-related"
          mood="curious"
          scale={0.85}
          className="absolute left-1/2 top-20 hidden h-px w-px -translate-x-1/2 lg:block"
        />
        <Container className="flex flex-col gap-10">
          <Reveal variant="up">
            <h2 className="text-h2 font-display text-balance text-onDark">
              More <span className="genie-text">wishes</span> worth granting.
            </h2>
          </Reveal>
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <RevealItem key={p.slug} className="h-full">
                <PostCard post={p} tone="dark" />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="flex">
            <MagneticButton href="/genie-tips" variant="secondary">
              All Genie Tips
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
