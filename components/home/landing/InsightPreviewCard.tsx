"use client";

import { getCategoryIllustration } from "@/components/blog/category-illustrations";
import { LinkPreview } from "@/components/ui/link-preview";
import { cn } from "@/lib/cn";
import type { Post } from "@/lib/data/posts";

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
  post: Post;
  className?: string;
}) {
  const href = `/genie-tips/${post.slug}`;

  return (
    <LinkPreview
      url={href}
      isStatic
      preview={getCategoryIllustration(post.category)}
      aria-label={`Read: ${post.title}`}
      className={cn(
        "group/card block h-full rounded-xl text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-100 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900",
        className
      )}
    >
      <article
        className={cn(
          "glass relative flex h-full min-h-[17.5rem] w-full flex-col items-start gap-5 rounded-xl p-6 text-left shadow-sm transition-[box-shadow] duration-ui hover:shadow-glow-sm motion-reduce:transition-none"
        )}
      >
        <div className="flex w-full items-start justify-between gap-3">
          <span className="rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-onDark-muted">
            {post.category}
          </span>
          <time className="shrink-0 text-xs text-onDark-faint">{post.updated}</time>
        </div>

        <div className="flex w-full flex-col gap-2">
          <h3 className="font-display text-h4 font-semibold leading-snug text-onDark transition-colors group-hover/card:text-genie-200">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-body text-onDark-muted">
            {post.dek}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="card-arrow-btn mt-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-onDark transition-[background-color,box-shadow,color] duration-ui group-hover/card:bg-white group-hover/card:ring-4 group-hover/card:ring-genie-100/10 motion-reduce:transition-none"
        >
          <CardArrowIcon />
        </span>
      </article>
    </LinkPreview>
  );
}
