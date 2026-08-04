import type { Metadata } from "next";
import Link from "next/link";
import { NotionPostCard } from "@/components/blog/NotionPostCard";
import { Container } from "@/components/ui/Container";
import { getPublishedPosts } from "@/lib/notion";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Genie Tips | Clinic Marketing Insights | Clinic Genie",
  description:
    "Practical Genie Tips on healthcare SEO, medical SEM, clinic websites, AI search readiness, and compliance-aware growth for specialist clinics in Singapore.",
};

export default async function GenieTipsPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-white text-ink-900">
      <header className="surface-light border-b border-hairline-light">
        <Container size="wide" className="py-16 sm:py-20">
          <p className="text-kicker uppercase text-genie-700">Genie Tips</p>
          <h1 className="mt-3 max-w-3xl font-display text-h1 text-ink-900">
            Clear insights on clinic growth
          </h1>
          <p className="mt-4 max-w-2xl text-lead text-ink-700">
            Practical guidance on healthcare SEO, clinic websites, medical SEM,
            and AI search readiness for specialist clinics.
          </p>
        </Container>
      </header>

      <main>
        <section aria-labelledby="genie-tips-heading" className="py-14 sm:py-20">
          <Container size="wide">
            <h2 id="genie-tips-heading" className="sr-only">
              Published Genie Tips
            </h2>

            {posts.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.id}>
                    <NotionPostCard post={post} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mx-auto max-w-xl rounded-xl bg-cg-mist px-6 py-10 text-center ring-1 ring-hairline-light">
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
            )}
          </Container>
        </section>
      </main>
    </div>
  );
}
