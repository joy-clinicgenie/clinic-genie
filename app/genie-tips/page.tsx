import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_KEYWORDS, pageMetadata } from "@/lib/seo";
import { FeaturedGenieTip } from "@/components/blog/FeaturedGenieTip";
import { GenieTipsPagination } from "@/components/blog/GenieTipsPagination";
import { NotionPostCard } from "@/components/blog/NotionPostCard";
import { Container } from "@/components/ui/Container";
import { GenieTipsHero } from "@/components/blog/GenieTipsHero";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { getPublishedPosts } from "@/lib/notion";

export const revalidate = 60;

const GRID_PAGE_SIZE = 6;

export const metadata: Metadata = pageMetadata({
  title: "Genie Tips",
  description:
    "Practical clinic marketing insights on healthcare SEO, medical SEM, clinic websites, AI search readiness, and compliance-aware growth for specialist clinics in Singapore.",
  path: "/genie-tips",
  keywords: [...DEFAULT_KEYWORDS, "clinic marketing insights"],
});

type GenieTipsPageProps = {
  searchParams?: {
    page?: string;
  };
};

function parsePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

export default async function GenieTipsPage({
  searchParams,
}: GenieTipsPageProps) {
  const posts = await getPublishedPosts();
  const [featuredPost, ...remainingPosts] = posts;
  const currentPage = parsePage(searchParams?.page);
  const totalPages = Math.max(
    1,
    Math.ceil(remainingPosts.length / GRID_PAGE_SIZE)
  );
  const page = Math.min(currentPage, totalPages);
  const showFeatured = page === 1 && Boolean(featuredPost);
  const gridPosts =
    page === 1
      ? remainingPosts.slice(0, GRID_PAGE_SIZE)
      : remainingPosts.slice(
          (page - 1) * GRID_PAGE_SIZE,
          page * GRID_PAGE_SIZE
        );

  return (
    <div className="min-h-screen bg-cg-teal-5 text-ink-900">
      <GenieTipsHero
        title="Genie Tips"
        subtitle="Explore our latest articles and clinic growth insights."
      />

      <section
          data-nav-theme="light"
          aria-labelledby="genie-tips-heading"
          className="pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pt-16"
        >
          <Container size="wide" className="flex flex-col gap-14 sm:gap-16">
            <h2 id="genie-tips-heading" className="sr-only">
              Published Genie Tips
            </h2>

            {posts.length === 0 ? (
              <div className="mx-auto max-w-xl rounded-xl bg-white px-6 py-10 text-center ring-1 ring-hairline-light">
                <p className="font-display text-h4 text-ink-900">
                  No Genie Tips published yet
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  New clinic growth insights will appear here once they are
                  published. In the meantime, start a conversation about your
                  clinic goals.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex text-sm font-medium text-genie-700 underline-offset-4 hover:underline"
                >
                  Make Your First Wish
                </Link>
              </div>
            ) : (
              <>
                {showFeatured && featuredPost ? (
                  <FeaturedGenieTip post={featuredPost} />
                ) : null}

                {gridPosts.length > 0 ? (
                  <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                    {gridPosts.map((post) => (
                      <li key={post.id}>
                        <NotionPostCard post={post} />
                      </li>
                    ))}
                  </ul>
                ) : null}

                <GenieTipsPagination
                  currentPage={page}
                  totalPages={totalPages}
                />
              </>
            )}
          </Container>
        </section>

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
