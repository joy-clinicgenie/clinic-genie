import { SpecialistIcon } from "@/components/home/landing/SpecialistIcons";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { cn } from "@/lib/cn";
import type { SpecialtyHubCard as SpecialtyHubCardData } from "@/lib/data/specialty-hubs";
import { getSpecialtyHubHref } from "@/lib/data/specialty-hubs";

interface SpecialtyHubCardProps {
  hub: SpecialtyHubCardData;
  sparkleIndex?: number;
}

export function SpecialtyHubCard({ hub, sparkleIndex = 0 }: SpecialtyHubCardProps) {
  const card = (
    <FeatureInfoCard
      title={hub.name}
      body={hub.summary}
      icon={<SpecialistIcon id={hub.iconId} className="h-12 w-12" />}
      alt=""
      href={hub.published ? getSpecialtyHubHref(hub) : undefined}
      badge={hub.published ? undefined : "Coming soon"}
      showSparkles
      sparkleIndex={sparkleIndex}
      className={cn("h-full", !hub.published && "opacity-90")}
    />
  );

  if (!hub.published) {
    return (
      <div className="h-full" aria-disabled="true" id={hub.slug}>
        {card}
      </div>
    );
  }

  return card;
}
