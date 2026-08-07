import { LandingIntro, LandingSection } from "@/components/home/landing/LandingLayout";
import { SpecialistClinicsBackdrop } from "@/components/home/landing/SpecialistClinicsOrb";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { SpecialtyCard } from "@/lib/data/pillars";
import { cn } from "@/lib/cn";
import specialistSectionStyles from "@/components/home/landing/SpecialistClinicsOrb.module.css";

interface PillarSpecialtySectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  specialties: SpecialtyCard[];
}

export function PillarSpecialtySection({
  kicker,
  title,
  subtitle,
  specialties,
}: PillarSpecialtySectionProps) {
  return (
    <LandingSection
      tone="white"
      className={cn("pt-24 pb-24", specialistSectionStyles.sectionShell)}
      containerClassName="relative z-10 flex flex-col gap-12"
      backdrop={<SpecialistClinicsBackdrop />}
    >
      <Reveal>
        <LandingIntro kicker={kicker} title={title} subtitle={subtitle} />
      </Reveal>

      <RevealGroup className="grid gap-5 md:grid-cols-3">
        {specialties.map((specialty) => (
          <RevealItem key={specialty.title} className="h-full">
            <FeatureInfoCard
              title={specialty.title}
              body={specialty.body}
              href={specialty.link.href}
              ariaLabel={`${specialty.link.label}: ${specialty.body}`}
              className="h-full"
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </LandingSection>
  );
}
