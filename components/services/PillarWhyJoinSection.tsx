import {
  LandingBody,
  LandingHeading,
  LandingKicker,
  LandingSection,
} from "@/components/home/landing/LandingLayout";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import styles from "./PillarShineTitle.module.css";

type WhyJoinPoint = {
  title: string;
  body: string;
};

type PillarWhyJoinSectionProps = {
  kicker: string;
  title: string;
  subtitle: string;
  points: WhyJoinPoint[];
};

export function PillarWhyJoinSection({
  kicker,
  title,
  subtitle,
  points,
}: PillarWhyJoinSectionProps) {
  return (
    <LandingSection
      tone="white"
      className={`py-24 ${styles.shineHost}`}
      containerClassName="flex flex-col gap-12"
    >
      <Reveal>
        <div className="flex flex-col items-center gap-4 text-center">
          <LandingKicker>{kicker}</LandingKicker>
          <LandingHeading className={styles.shineTitle}>{title}</LandingHeading>
          <LandingBody>{subtitle}</LandingBody>
        </div>
      </Reveal>
      <RevealGroup className="grid gap-5 md:grid-cols-3">
        {points.map((point, index) => (
          <RevealItem key={point.title} className="h-full">
            <FeatureInfoCard
              title={point.title}
              body={point.body}
              sparkleIndex={index}
              className="h-full"
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </LandingSection>
  );
}
