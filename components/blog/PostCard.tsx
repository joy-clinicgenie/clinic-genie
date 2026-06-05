import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Post } from "@/lib/data/posts";

export function PostCard({ post, tone = "dark" }: { post: Post; tone?: "dark" | "light" }) {
  return (
    <Link
      href={`/genie-tips/${post.slug}`}
      className={cn(
        "group flex h-full flex-col gap-3 rounded-xl p-6 transition-[transform,box-shadow] duration-ui ease-out-soft hover:-translate-y-1.5 motion-reduce:hover:translate-y-0",
        tone === "dark" ? "glass hover:shadow-glow-sm" : "glass-light hover:shadow-card"
      )}
    >
      <span
        className={cn(
          "inline-flex w-fit items-center rounded-pill px-3 py-1 font-mono text-xs uppercase tracking-wider",
          tone === "dark" ? "bg-genie-500/15 text-genie-300" : "bg-genie-100 text-genie-700"
        )}
      >
        {post.category}
      </span>
      <h3
        className={cn(
          "font-display text-h4 leading-snug transition-colors",
          tone === "dark" ? "text-onDark group-hover:text-genie-200" : "text-ink-900 group-hover:text-genie-700"
        )}
      >
        {post.title}
      </h3>
      <p className={cn("text-sm leading-relaxed", tone === "dark" ? "text-onDark-muted" : "text-ink-500")}>
        {post.dek}
      </p>
      <span className={cn("mt-auto pt-2 text-xs", tone === "dark" ? "text-onDark-faint" : "text-ink-500")}>
        {post.readingTime}
      </span>
    </Link>
  );
}
