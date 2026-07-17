import { Kicker } from "@/components/ui/Kicker";
import type { CaseStudy } from "@/lib/data/portfolio";

/**
 * Renders a single case study as a frosted glass card on the dark portfolio grid.
 * Project detail pages are temporarily unlinked, so this card is display-only.
 */
export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article
      className="glass relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-7 sm:p-8"
      style={{ ["--accent" as string]: study.accent }}
      aria-label={`${study.name} project`}
    >
      <Kicker>{study.specialty}</Kicker>

      <div className="flex flex-col gap-1">
        <h3 className="font-display text-h4 leading-snug text-onDark">{study.name}</h3>
        {study.tagline && (
          <p className="font-display text-base italic text-onDark-muted">&ldquo;{study.tagline}&rdquo;</p>
        )}
      </div>

      <p className="text-sm leading-relaxed text-onDark-muted">{study.line}</p>

      <ul className="flex flex-wrap gap-2" aria-label="Services delivered">
        {study.tags.map((tag) => (
          <li
            key={tag}
            className="inline-flex items-center rounded-pill border border-white/15 bg-white/[0.05] px-3 py-1 font-sans text-xs uppercase tracking-wider text-onDark-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 border-t border-white/15 pt-5">
        <span className="text-base font-semibold text-onDark">{study.result}</span>
        <span className="text-sm font-medium text-onDark-muted">Case study coming soon</span>
      </div>
    </article>
  );
}
