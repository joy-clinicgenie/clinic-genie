import Link from "next/link";
import { GenieTipAuthor } from "@/components/blog/GenieTipAuthor";
import { GenieTipMeta } from "@/components/blog/GenieTipMeta";
import type { NotionPost } from "@/lib/notion";

export function FeaturedGenieTip({ post }: { post: NotionPost }) {
  const category = post.category ?? post.tags[0] ?? null;

  return (
    <article>
      <Link
        href={`/genie-tips/${post.slug}`}
        aria-label={`Read: ${post.title}`}
        className="group grid items-center gap-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/50 focus-visible:ring-offset-4 lg:grid-cols-2 lg:gap-12"
      >
        <div className="overflow-hidden rounded-lg bg-cg-mist lg:rounded-xl">
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt=""
              className="aspect-[16/11] h-auto w-full object-cover transition-transform duration-ui ease-out-soft group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="aspect-[16/11] w-full bg-gradient-to-br from-cg-mist to-cg-soft-grey" />
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <GenieTipMeta
            date={post.date}
            dateLabel={post.dateLabel}
            category={category}
            appearance="editorial"
          />

          <h2 className="font-display text-h2 text-balance text-ink-900 transition-colors group-hover:text-genie-700">
            {post.title}
          </h2>

          {post.description ? (
            <p className="max-w-prose text-lead text-pretty text-ink-500">
              {post.description}
            </p>
          ) : null}

          <GenieTipAuthor size="md" className="mt-2" />
        </div>
      </Link>
    </article>
  );
}
