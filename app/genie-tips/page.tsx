import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedGenieTip } from "@/components/blog/FeaturedGenieTip";
import { GenieTipsPagination } from "@/components/blog/GenieTipsPagination";
import { NotionPostCard } from "@/components/blog/NotionPostCard";
import { Container } from "@/components/ui/Container";
import { DefaultPageFinale } from "@/components/ui/DefaultPageFinale";
import { LightHero } from "@/components/ui/LightHero";
import { getPublishedPosts } from "@/lib/notion";

export const revalidate = 60;

const GRID_PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: "Genie Tips | Clinic Marketing Insights | Clinic Genie",
  description:
    "Practical Genie Tips on healthcare SEO, medical SEM, clinic websites, AI search readiness, and compliance-aware growth for specialist clinics in Singapore.",
};

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
      <LightHero
        title="Genie Tips"
        subtitle="Explore our latest articles and clinic growth insights."
        showOrb={false}
        showWishForm={false}
        showSparkles={false}
        align="center"
        minHeight="min-h-[48vh]"
        backgroundImage={{
          src: "/about/office.png",
          alt: "",
          treatment: "dark",
          imageClassName: "object-cover object-center",
        }}
        className="rounded-b-[44px] pb-16 pt-[calc(5rem+env(safe-area-inset-top,0px))] lg:pb-20 lg:pt-40"
        titleClassName="text-onDark"
      />

      <main>
        <section
          data-nav-theme="light"
          aria-labelledby="genie-tips-heading"
          className="pb-16 pt-12 sm:pb-20 sm:pt-16"
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
      </main>

      <DefaultPageFinale backdropClassName="bg-cg-teal-5" />
    </div>
  );
}
