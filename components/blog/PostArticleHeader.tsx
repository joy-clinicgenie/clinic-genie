import Link from "next/link";
import {
  POST_AUTHOR,
  getPostPublishedLabel,
  type Post,
} from "@/lib/data/posts";
import { PostHeroImage } from "@/components/blog/PostHeroImage";

function MetaDot() {
  return (
    <span
      aria-hidden="true"
      className="mx-1 inline-block size-1 shrink-0 rounded-[1px] bg-cg-soft-grey sm:mx-2"
    />
  );
}

export function PostArticleHeader({ post }: { post: Post }) {
  return (
    <header className="flex w-full flex-col gap-5">
      <Link
        href="/genie-tips"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-genie-700"
      >
        <span aria-hidden="true">←</span> Genie Tips
      </Link>

      <h1 className="font-display text-h1 text-balance text-ink-900">{post.title}</h1>

      <p className="text-lead text-pretty text-ink-700">{post.dek}</p>

      <div className="flex flex-wrap items-center gap-y-2 text-sm text-ink-500">
        <div className="flex items-center gap-2.5 text-ink-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/brandmark.svg"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full bg-cg-mist object-contain p-1"
          />
          <span className="font-medium">{POST_AUTHOR.name}</span>
        </div>
        <MetaDot />
        <time dateTime={post.published}>{getPostPublishedLabel(post)}</time>
        <MetaDot />
        <span>{post.readingTime}</span>
      </div>

      <PostHeroImage
        category={post.category}
        title={post.title}
        idSuffix="-hero"
        className="mt-8 md:mt-10"
      />
    </header>
  );
}
