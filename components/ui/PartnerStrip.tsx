import { cn } from "@/lib/cn";
import type { Partner } from "@/lib/data/partners";
import { RevealGroup, RevealItem } from "./Reveal";

export function PartnerStrip({
  intro,
  partners,
  layout = "grid",
}: {
  intro?: string;
  partners: Partner[];
  layout?: "grid" | "satellite";
}) {
  return (
    <div className="flex flex-col gap-8">
      {intro && <p className="max-w-xl text-lead text-onDark-muted">{intro}</p>}
      <RevealGroup
        className={cn(
          "grid gap-5",
          layout === "satellite" ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {partners.map((p) => (
          <RevealItem
            key={p.name}
            className="glass group relative flex flex-col gap-3 rounded-xl p-6 transition-transform duration-ui hover:-translate-y-1 motion-reduce:hover:translate-y-0"
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full transition-shadow duration-ui"
              style={{ background: p.accent, boxShadow: `0 0 12px 1px ${p.accent}` }}
            />
            <h3 className="font-display text-base font-semibold text-onDark">{p.name}</h3>
            <p className="text-sm leading-relaxed text-onDark-muted">{p.blurb}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
