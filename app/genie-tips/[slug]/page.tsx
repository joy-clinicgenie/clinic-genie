import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GenieTipArticleSidebar } from "@/components/blog/GenieTipArticleSidebar";
import { LatestGenieTipsSection } from "@/components/blog/LatestGenieTipsSection";
import { NotionArticleBody } from "@/components/blog/NotionArticleBody";
import { Container } from "@/components/ui/Container";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import {
  getPostBySlug,
  getPublishedPosts,
  getPublishedPostSlugs,
} from "@/lib/notion";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

type GenieTipPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GenieTipPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return pageMetadata({
      title: "Genie Tip not found",
      description:
        "This Genie Tip could not be found. Browse clinic marketing insights from Clinic Genie.",
      path: "/genie-tips",
      index: false,
      follow: true,
    });
  }

  return pageMetadata({
    title: `${post.title} | Genie Tips`,
    description:
      post.description ||
      "Clinic marketing insight from Clinic Genie for specialist clinics in Singapore.",
    path: `/genie-tips/${post.slug}`,
    keywords: post.tags.length > 0 ? post.tags : ["clinic marketing insights"],
    ogType: "article",
    index: !post.noIndex,
    follow: !post.noIndex,
    image: post.coverImage ?? undefined,
    publishedTime: post.date ?? undefined,
  });
}

export default async function GenieTipPage({ params }: GenieTipPageProps) {
  const [post, allPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getPublishedPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const latestPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-ink-900">
      <article data-nav-theme="light">
        <Container size="content" className="pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pt-32">
          <Link
            href="/genie-tips"
            className="inline-flex w-fit items-center gap-1.5 rounded-pill px-3.5 py-2 text-sm font-medium text-ink-500 transition-[background-color,color,box-shadow] duration-ui ease-out-soft hover:bg-cg-mist hover:text-genie-700 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/50"
          >
            <span aria-hidden="true">←</span>
            Genie Tips
          </Link>

          <header className="mt-8 max-w-article">
            {post.dateLabel ? (
              <time
                dateTime={post.date ?? undefined}
                className="block text-sm text-ink-500"
              >
                {post.dateLabel}
              </time>
            ) : null}

            <h1 className="mt-3 font-display text-h1 text-balance text-ink-900">
              {post.title}
            </h1>

            {post.description ? (
              <p className="mt-5 max-w-prose text-lead text-pretty text-ink-500">
                {post.description}
              </p>
            ) : null}
          </header>

          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-12">
            {post.coverImage ? (
              <figure className="overflow-hidden rounded-2xl bg-cg-mist lg:col-span-8 lg:col-start-1 lg:row-start-1 xl:col-span-9">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt=""
                  className="aspect-[16/10] h-auto w-full object-cover"
                />
              </figure>
            ) : null}

            <div className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 xl:col-span-3 xl:col-start-10">
              <GenieTipArticleSidebar
                tags={post.tags}
                category={post.category}
              />
            </div>

            <div
              className={
                post.coverImage
                  ? "min-w-0 lg:col-span-8 lg:col-start-1 lg:row-start-2 xl:col-span-9"
                  : "min-w-0 lg:col-span-8 lg:col-start-1 lg:row-start-1 xl:col-span-9"
              }
            >
              {post.markdown ? (
                <NotionArticleBody markdown={post.markdown} />
              ) : (
                <p className="text-lead text-ink-700">
                  This article is still being prepared. Please check back
                  shortly.
                </p>
              )}
            </div>
          </div>
        </Container>
      </article>

      <LatestGenieTipsSection posts={latestPosts} />

      <PageFinale backdropClassName="bg-cg-teal-5">
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Want a clearer patient journey for your clinic?"
          highlight="clearer patient journey"
          body="Book a strategy call. We will map how patients find, understand, and enquire with your clinic, then show you where Clinic Genie can help."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          secondaryCta={{ href: "/portfolio", label: "See Our Work" }}
          footnote="No obligation. No jargon. Just a clear next step."
        />
      </PageFinale>
    </div>
  );
}
