import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Post, PostCategory } from "@/lib/data/posts";
import { getCategoryIllustration } from "@/components/blog/category-illustrations";

function PostCardImage({ category }: { category: PostCategory }) {
  return (
    <div className="h-56 w-full overflow-hidden">
      <div className="h-full w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover">
        {getCategoryIllustration(category)}
      </div>
    </div>
  );
}

export function PostCard({
  post,
  tone = "dark",
  className,
}: {
  post: Post;
  tone?: "dark" | "light";
  /** @deprecated Media band is always shown to match the article card layout. */
  showImage?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <Link
      href={`/genie-tips/${post.slug}`}
      aria-label={`Read: ${post.title}`}
      className={cn(
        "group block h-full overflow-hidden rounded-2xl shadow-sm transition-[transform,box-shadow] duration-ui ease-out-soft hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0",
        dark ? "glass hover:shadow-glow-sm" : "bg-white",
        className
      )}
    >
      <article className="flex h-full flex-col overflow-hidden">
        <PostCardImage category={post.category} />

        <div
          className={cn(
            "flex flex-1 flex-col p-4 sm:p-6",
            dark ? "bg-transparent" : "bg-white"
          )}
        >
          <time
            className={cn(
              "block text-xs",
              dark ? "text-onDark-faint" : "text-ink-500"
            )}
          >
            {post.updated}
          </time>

          <h3
            className={cn(
              "mt-0.5 font-display text-lg leading-snug transition-colors",
              dark
                ? "text-onDark group-hover:text-genie-200"
                : "text-ink-900 group-hover:text-genie-700"
            )}
          >
            {post.title}
          </h3>

          <p
            className={cn(
              "mt-2 line-clamp-3 text-sm leading-relaxed",
              dark ? "text-onDark-muted" : "text-ink-500"
            )}
          >
            {post.dek}
          </p>
        </div>
      </article>
    </Link>
  );
}
