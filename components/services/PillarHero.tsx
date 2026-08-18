"use client";

import type { CorePillar } from "@/lib/data/pillars";
import { getServiceHeroVisual } from "@/lib/data/service-hero";
import { ServiceHero } from "./hero/ServiceHero";
import { ServiceVisual } from "./hero/ServiceVisual";

type PillarHeroProps = {
  pillar: CorePillar;
  wishImageSrc?: string;
  imageClassName?: string;
};

export function PillarHero({
  pillar,
  wishImageSrc,
  imageClassName = "object-cover object-center lg:object-right",
}: PillarHeroProps) {
  const visual = getServiceHeroVisual(pillar.slug);

  return (
    <ServiceHero
      title={pillar.name}
      supportingLine={pillar.heroSupportingLine ?? "for Singapore specialist clinics"}
      highlight={pillar.heroTitle}
      highlightColor={pillar.accent}
      description={pillar.heroParagraph}
      primaryCta={pillar.heroPrimaryCta}
      secondaryCta={pillar.heroSecondaryCta}
      visual={<ServiceVisual config={visual} />}
      visualVariant={visual.variant}
      backgroundImage={wishImageSrc}
      backgroundImageClassName={imageClassName}
      surface={visual.surface}
      accent={pillar.accent}
    />
  );
}
