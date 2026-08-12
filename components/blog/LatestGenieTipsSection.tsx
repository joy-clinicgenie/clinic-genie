import { NotionPostCard } from "@/components/blog/NotionPostCard";
import { Container } from "@/components/ui/Container";
import type { NotionPost } from "@/lib/notion";

type LatestGenieTipsSectionProps = {
  posts: NotionPost[];
};

export function LatestGenieTipsSection({ posts }: LatestGenieTipsSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section
      data-nav-theme="light"
      aria-labelledby="latest-genie-tips-heading"
      className="border-t border-hairline-light bg-cg-teal-5 py-16 sm:py-20"
    >
      <Container size="content">
        <p className="flex items-center gap-2 text-sm text-ink-500">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-ink-500"
          />
          Blog and articles.
        </p>
        <h2
          id="latest-genie-tips-heading"
          className="mt-3 font-display text-h2 text-ink-900"
        >
          Latest insights and trends.
        </h2>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <NotionPostCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
