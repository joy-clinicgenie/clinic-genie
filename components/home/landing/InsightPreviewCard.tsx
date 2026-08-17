import Link from "next/link";
import { GenieTipCoverImage, GENIE_TIP_COVER_SIZES } from "@/components/blog/GenieTipCoverImage";
import { cn } from "@/lib/cn";
import type { NotionPost } from "@/lib/notion";

function CardArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 18.256 18.256"
      aria-hidden="true"
      className="transition-transform duration-ui group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none"
    >
      <g transform="translate(5.363 5.325)">
        <path
          d="M14.581,7.05,7.05,14.581"
          transform="translate(-7.05 -7.012)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M10,7l5.287.037.038,5.287"
          transform="translate(-7.756 -7)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

export function InsightPreviewCard({
  post,
  className,
}: {
  post: NotionPost;
  className?: string;
}) {
  const href = `/genie-tips/${post.slug}`;
  const category = post.category ?? post.tags[0] ?? null;

  return (
    <Link
      href={href}
      aria-label={`Read: ${post.title}`}
      className={cn(
        "group/card block h-full rounded-xl text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-100 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900",
        className
      )}
    >
      <article
        className={cn(
          "glass relative flex h-full w-full flex-col overflow-hidden rounded-xl text-left shadow-sm transition-[box-shadow] duration-ui hover:shadow-glow-sm motion-reduce:transition-none"
        )}
      >
        <div className="overflow-hidden bg-white/10">
          {post.coverImage ? (
            <GenieTipCoverImage
              src={post.coverImage}
              sizes={GENIE_TIP_COVER_SIZES.grid}
              hoverScale
            />
          ) : (
            <div className="aspect-[16/10] w-full bg-gradient-to-br from-white/10 to-white/5" />
          )}
        </div>

        <div className="flex flex-1 flex-col items-start gap-5 p-6">
          <div className="flex w-full items-start justify-between gap-3">
            {category ? (
              <span className="rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-onDark-muted">
                {category}
              </span>
            ) : (
              <span />
            )}
            {post.dateLabel ? (
              <time dateTime={post.date ?? undefined} className="shrink-0 text-xs text-onDark-faint">
                {post.dateLabel}
              </time>
            ) : null}
          </div>

          <div className="flex w-full flex-col gap-2">
            <h3 className="font-display text-[20px] font-semibold leading-snug text-onDark transition-colors group-hover/card:text-genie-200 lg:text-h4">
              {post.title}
            </h3>
            {post.description ? (
              <p className="line-clamp-3 text-body text-onDark-muted">{post.description}</p>
            ) : null}
          </div>

          <span
            aria-hidden="true"
            className="card-arrow-btn mt-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-onDark transition-[background-color,box-shadow,color] duration-ui group-hover/card:bg-white group-hover/card:ring-4 group-hover/card:ring-genie-100/10 motion-reduce:transition-none"
          >
            <CardArrowIcon />
          </span>
        </div>
      </article>
    </Link>
  );
}
