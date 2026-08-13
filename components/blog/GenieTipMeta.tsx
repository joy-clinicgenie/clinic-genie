import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

type GenieTipMetaProps = {
  date?: string | null;
  dateLabel?: string | null;
  category?: string | null;
  className?: string;
  appearance?: "badge" | "editorial";
};

export function GenieTipMeta({
  date,
  dateLabel,
  category,
  className,
  appearance = "badge",
}: GenieTipMetaProps) {
  if (!dateLabel && !category) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {dateLabel ? (
        <time dateTime={date ?? undefined} className="text-sm text-ink-500">
          {dateLabel}
        </time>
      ) : null}
      {category ? (
        appearance === "editorial" ? (
          <span className="font-sans text-kicker font-semibold uppercase tracking-widest text-genie-700">
            {category}
          </span>
        ) : (
          <Badge
            variant="secondary"
            className="bg-cg-mist px-3 text-xs font-medium text-genie-700"
          >
            {category}
          </Badge>
        )
      ) : null}
    </div>
  );
}
