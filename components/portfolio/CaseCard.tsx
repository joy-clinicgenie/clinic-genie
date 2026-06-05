import Link from "next/link";
import type { CaseStudy } from "@/lib/data/portfolio";

/**
 * Renders a single case study as a premium dark glass card that links into the
 * case study detail page. Server Component — purely presentational, no hooks.
 * Hover-lift + accent bloom mirror the home PillarCard language.
 */
export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/portfolio/${study.slug}`}
      aria-label={`Read the ${study.name} case study`}
      className="glass group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-7 transition-[transform,box-shadow] duration-ui ease-out-soft hover:-translate-y-1.5 hover:shadow-glow-md motion-reduce:hover:translate-y-0 sm:p-8"
      style={{ ["--accent" as string]: study.accent }}
    >
      <span
        aria-hidden="true"
        className="absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: study.accent }}
      />

      <span
        className="font-mono text-kicker uppercase tracking-wider text-genie-300"
        style={{ color: study.accent }}
      >
        {study.specialty}
      </span>

      <div className="flex flex-col gap-1">
        <h3 className="font-display text-h4 leading-snug text-onDark transition-colors group-hover:text-genie-200">
          {study.name}
        </h3>
        {study.tagline && (
          <p className="font-display text-base italic text-onDark-muted">&ldquo;{study.tagline}&rdquo;</p>
        )}
      </div>

      <p className="text-sm leading-relaxed text-onDark-muted">{study.line}</p>

      <ul className="flex flex-wrap gap-2" aria-label="Services delivered">
        {study.tags.map((tag) => (
          <li
            key={tag}
            className="inline-flex items-center rounded-pill border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs uppercase tracking-wider text-onDark-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-5">
        <span className="text-base font-semibold text-onDark">{study.result}</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-genie-300 transition-[gap] duration-ui group-hover:gap-2.5">
          Read the case study
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
