import { cn } from "@/lib/cn";
import type { PostQuote } from "@/lib/data/posts";

export function PostBlockquote({
  quote,
  className,
}: {
  quote: PostQuote;
  className?: string;
}) {
  return (
    <blockquote
      className={cn(
        "flex flex-col items-center gap-5 rounded-lg bg-cg-teal-5 px-8 py-10 text-center sm:px-12 sm:py-12",
        className
      )}
    >
      <svg
        width="28"
        height="24"
        viewBox="0 0 28 24"
        fill="none"
        aria-hidden="true"
        className="text-ink-900"
      >
        <path
          d="M0 13.5C0 6.5 4.2 1.8 11 0l1.2 2.4C8.4 3.6 6.2 6.2 6.2 9.8c0 .8.2 1.4.5 1.8.8-.4 1.8-.6 2.8-.6 2.8 0 5 2 5 5s-2.2 5.2-5 5.2c-3.2 0-5.5-2.4-5.5-7.7zm14 0C14 6.5 18.2 1.8 25 0l1.2 2.4c-3.8 1.2-6 3.8-6 7.4 0 .8.2 1.4.5 1.8.8-.4 1.8-.6 2.8-.6 2.8 0 5 2 5 5s-2.2 5.2-5 5.2c-3.2 0-5.5-2.4-5.5-7.7z"
          fill="currentColor"
        />
      </svg>
      <p className="max-w-xl text-xl font-semibold italic leading-snug text-ink-900 sm:text-2xl">
        {quote.text}
      </p>
      <footer className="text-sm text-ink-500">{quote.attribution}</footer>
    </blockquote>
  );
}
