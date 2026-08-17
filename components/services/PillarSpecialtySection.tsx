import { LandingBody, LandingHeading, LandingIntro, LandingSection } from "@/components/home/landing/LandingLayout";
import { SpecialistClinicsBackdrop } from "@/components/home/landing/SpecialistClinicsOrb";
import { Reveal } from "@/components/ui/Reveal";
import { SPECIALTY_CATEGORIES } from "@/lib/data/specialty-hubs";
import type { SpecialtyCard } from "@/lib/data/pillars";
import { cn } from "@/lib/cn";
import specialistSectionStyles from "@/components/home/landing/SpecialistClinicsOrb.module.css";

interface PillarSpecialtySectionProps {
  kicker?: string;
  title: string;
  subtitle: string;
  specialties: SpecialtyCard[];
  variant?: "cards" | "chips";
}

export function PillarSpecialtySection({
  kicker,
  title,
  subtitle,
  specialties,
  variant = "cards",
}: PillarSpecialtySectionProps) {
  const intro = kicker ? (
    <LandingIntro kicker={kicker} title={title} subtitle={subtitle} kickerVariant="editorial" />
  ) : (
    <div className="flex flex-col items-center gap-4 text-center">
      <LandingHeading>{title}</LandingHeading>
      <LandingBody>{subtitle}</LandingBody>
    </div>
  );

  const section = (
    <LandingSection
      tone="white"
      className={cn(
        "pt-24 pb-24",
        specialistSectionStyles.sectionShell,
        variant === "chips" && "overflow-hidden rounded-2xl lg:rounded-[44px]"
      )}
      containerClassName="relative z-10 flex flex-col gap-12"
      backdrop={<SpecialistClinicsBackdrop />}
    >
      <Reveal>{intro}</Reveal>

      {variant === "chips" ? (
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {specialties.map((specialty) => (
              <li
                key={specialty.title}
                className="rounded-pill border border-hairline-light bg-white/80 px-4 py-2 font-sans text-sm text-ink-700"
              >
                {specialty.title}
              </li>
            ))}
          </ul>
        </Reveal>
      ) : (
        <Reveal>
          <ul
            className={cn(specialistSectionStyles.categoryGrid, "m-0 list-none p-0")}
            aria-label="Specialist clinic categories"
          >
            {SPECIALTY_CATEGORIES.map((category) => (
              <li key={category.id} className={specialistSectionStyles.categoryTitle}>
                {category.name}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </LandingSection>
  );

  if (variant === "chips") {
    return (
      <div className="bg-genie-20 px-gutter py-10 lg:px-gutter-lg lg:py-12">
        {section}
      </div>
    );
  }

  return section;
}
