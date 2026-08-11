import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NotionArticleBody } from "@/components/blog/NotionArticleBody";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/Container";
import {
  getPostBySlug,
  getPublishedPostSlugs,
} from "@/lib/notion";

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
    return {
      title: "Genie Tip not found | Clinic Genie",
    };
  }

  return {
    title: `${post.title} | Genie Tips | Clinic Genie`,
    description:
      post.description ||
      "Clinic marketing insight from Clinic Genie for specialist clinics in Singapore.",
    robots: post.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function GenieTipPage({ params }: GenieTipPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-ink-900">
      <article>
        <header className="surface-light border-b border-hairline-light">
          <Container size="article-hero" className="py-14 sm:py-16">
            <Link
              href="/genie-tips"
              className="text-sm font-medium text-genie-700 underline-offset-4 hover:underline"
            >
              Back to Genie Tips
            </Link>

            {post.dateLabel ? (
              <time
                dateTime={post.date ?? undefined}
                className="mt-6 block text-xs text-ink-500"
              >
                {post.dateLabel}
              </time>
            ) : null}

            <h1 className="mt-3 font-display text-h1 text-ink-900">
              {post.title}
            </h1>

            {post.description ? (
              <p className="mt-4 max-w-2xl text-lead text-ink-700">
                {post.description}
              </p>
            ) : null}

            {post.tags.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="secondary">{tag}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </header>

        <Container size="article" className="py-12 sm:py-16">
          <NotionArticleBody markdown={post.markdown} />
        </Container>
      </article>
    </div>
  );
}
