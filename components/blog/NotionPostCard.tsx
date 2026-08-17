import Link from "next/link";
import { GenieTipAuthor } from "@/components/blog/GenieTipAuthor";
import { GenieTipCoverImage, GENIE_TIP_COVER_SIZES } from "@/components/blog/GenieTipCoverImage";
import { GenieTipMeta } from "@/components/blog/GenieTipMeta";
import type { NotionPost } from "@/lib/notion";

export function NotionPostCard({ post }: { post: NotionPost }) {
  const category = post.category ?? post.tags[0] ?? null;

  return (
    <article className="h-full">
      <Link
        href={`/genie-tips/${post.slug}`}
        aria-label={`Read: ${post.title}`}
        className="group flex h-full flex-col gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/50 focus-visible:ring-offset-4"
      >
        <div className="overflow-hidden rounded-xl bg-cg-mist">
          {post.coverImage ? (
            <GenieTipCoverImage
              src={post.coverImage}
              sizes={GENIE_TIP_COVER_SIZES.grid}
              hoverScale
            />
          ) : (
            <div className="aspect-[16/10] w-full bg-gradient-to-br from-cg-mist to-cg-soft-grey" />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <GenieTipMeta
            date={post.date}
            dateLabel={post.dateLabel}
            category={category}
          />

          <h3 className="font-display text-h4 text-balance text-ink-900 transition-colors group-hover:text-genie-700">
            {post.title}
          </h3>

          {post.description ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-ink-500">
              {post.description}
            </p>
          ) : null}

          <GenieTipAuthor className="mt-auto pt-2" />
        </div>
      </Link>
    </article>
  );
}
