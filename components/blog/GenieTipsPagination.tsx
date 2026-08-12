import Link from "next/link";
import { cn } from "@/lib/cn";

type GenieTipsPaginationProps = {
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number): string {
  return page <= 1 ? "/genie-tips" : `/genie-tips?page=${page}`;
}

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="size-4"
    >
      <path
        d={direction === "prev" ? "M12 4.5 6.5 10 12 15.5" : "M8 4.5 13.5 10 8 15.5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GenieTipsPagination({
  currentPage,
  totalPages,
}: GenieTipsPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Genie Tips pages" className="flex justify-center pt-4">
      <ul className="flex items-center gap-2">
        <li>
          {currentPage > 1 ? (
            <Link
              href={pageHref(currentPage - 1)}
              aria-label="Previous page"
              className="inline-flex size-10 items-center justify-center rounded-full border border-hairline-light text-ink-700 transition-colors hover:border-genie-500 hover:text-genie-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/50"
            >
              <Chevron direction="prev" />
            </Link>
          ) : (
            <span
              aria-hidden="true"
              className="inline-flex size-10 items-center justify-center rounded-full border border-hairline-light text-ink-500/40"
            >
              <Chevron direction="prev" />
            </span>
          )}
        </li>

        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <li key={page}>
              <Link
                href={pageHref(page)}
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/50",
                  isActive
                    ? "bg-genie-700 text-white"
                    : "border border-hairline-light text-ink-700 hover:border-genie-500 hover:text-genie-700"
                )}
              >
                {page}
              </Link>
            </li>
          );
        })}

        <li>
          {currentPage < totalPages ? (
            <Link
              href={pageHref(currentPage + 1)}
              aria-label="Next page"
              className="inline-flex size-10 items-center justify-center rounded-full border border-hairline-light text-ink-700 transition-colors hover:border-genie-500 hover:text-genie-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/50"
            >
              <Chevron direction="next" />
            </Link>
          ) : (
            <span
              aria-hidden="true"
              className="inline-flex size-10 items-center justify-center rounded-full border border-hairline-light text-ink-500/40"
            >
              <Chevron direction="next" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
