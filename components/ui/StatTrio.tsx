import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { RevealGroup, RevealItem } from "./Reveal";

export interface Stat {
  value: string;
  label: string;
  countTo?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function StatTrio({ stats, tone = "dark" }: { stats: Stat[]; tone?: "dark" | "light" }) {
  return (
    <RevealGroup
      className={cn(
        "grid gap-px overflow-hidden rounded-2xl",
        stats.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3",
        tone === "dark" ? "glass" : "glass-light"
      )}
    >
      {stats.map((s, i) => (
        <RevealItem
          key={i}
          className={cn(
            "flex flex-col gap-2 p-7 text-center sm:p-8",
            tone === "dark" ? "bg-night-900/30" : "bg-white/40"
          )}
        >
          <span
            className={cn(
              "font-display text-h2 leading-none",
              tone === "dark" ? "genie-text" : "text-genie-800"
            )}
          >
            {s.countTo != null ? (
              <CountUp to={s.countTo} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} />
            ) : (
              s.value
            )}
          </span>
          <span className={cn("text-sm", tone === "dark" ? "text-onDark-muted" : "text-ink-500")}>
            {s.label}
          </span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
