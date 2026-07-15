import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PostArticleHeader } from "@/components/blog/PostArticleHeader";
import { PostArticleBody } from "@/components/blog/PostArticleBody";
import { InsightPreviewCard } from "@/components/home/landing/InsightPreviewCard";
import {
  LandingKicker,
  LandingHeading,
  LandingBody,
} from "@/components/home/landing/LandingLayout";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { POSTS, getPost } from "@/lib/data/posts";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) {
    return { title: "Article not found | Clinic Genie" };
  }

  if (post.featured) {
    return {
      title: "Healthcare SEO Singapore: How Specialist Clinics Rank in 2026 | Clinic Genie",
      description:
        "A practical, compliance-aware guide to healthcare SEO for Singapore specialist clinics: what actually moves rankings and bookings in 2026.",
    };
  }

  return {
    title: `${post.title} | Clinic Genie`,
    description: post.dek,
  };
}

export default function GenieTipPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article
        data-nav-theme="light"
        className="bg-white pb-16 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] text-ink-900 md:pb-24 md:pt-36"
      >
        <Container size="article-hero" className="flex flex-col gap-12 md:gap-16">
          <PostArticleHeader post={post} />
          <div className="mx-auto w-full max-w-prose">
            <PostArticleBody post={post} />
          </div>
        </Container>
      </article>

      <PageFinale backdropClassName="bg-white">
        <section className="py-24">
          <div className="mx-auto w-full max-w-wide px-[var(--page-pad)]">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <LandingKicker light>Genie Insights</LandingKicker>
                  <LandingHeading highlight="growth" light className="text-center">
                    Clear insights on clinic growth today.
                  </LandingHeading>
                </div>
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                  <LandingBody light center={false}>
                    Search, design, content, branding, and trust.
                    <br />
                    Genie Insights covers every part of how patients discover and choose specialist clinics.
                  </LandingBody>
                  <Link
                    href="/genie-tips"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors hover:text-white"
                  >
                    Read the Genie&apos;s Insights <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <RevealGroup className="grid gap-5 md:grid-cols-3">
                {related.map((p) => (
                  <RevealItem key={p.slug} className="h-full">
                    <InsightPreviewCard post={p} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Want this done for you? Book a free strategy call."
          highlight="strategy call"
          body="Thirty minutes, no obligation. We'll map where the right patients are searching, and exactly how to make your clinic the one they trust."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        />
      </PageFinale>
    </>
  );
}
