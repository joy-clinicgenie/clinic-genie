import Link from "next/link";
import { SpecialistIcon } from "@/components/home/landing/SpecialistIcons";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";
import type { SpecialtyHubCard as SpecialtyHubCardData } from "@/lib/data/specialty-hubs";
import { getSpecialtyHubHref } from "@/lib/data/specialty-hubs";

export function SpecialtyHubCard({ hub }: { hub: SpecialtyHubCardData }) {
  const href = getSpecialtyHubHref(hub);

  const card = (
    <GlassCard
      tone="light"
      radius="xl"
      hover={hub.published}
      className={cn(
        "flex h-full flex-col gap-4 p-7",
        !hub.published && "opacity-90",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-genie-100 text-genie-700"
        >
          <SpecialistIcon id={hub.iconId} className="h-7 w-7" />
        </span>
        {!hub.published && (
          <span className="rounded-pill bg-ink-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-600">
            Coming soon
          </span>
        )}
      </div>
      <h3 className="font-display text-h5 text-ink-900">{hub.name}</h3>
      <p className="text-sm leading-relaxed text-ink-700">{hub.summary}</p>
      {hub.published && (
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-genie-700 transition-colors group-hover:text-genie-900">
          Explore hub
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      )}
    </GlassCard>
  );

  if (hub.published) {
    return (
      <Link
        href={href}
        className="group block h-full"
        aria-label={`Explore ${hub.name} specialty hub`}
      >
        {card}
      </Link>
    );
  }

  return (
    <div className="h-full" aria-disabled="true" id={hub.slug}>
      {card}
    </div>
  );
}
