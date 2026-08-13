import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import type { CaseStudy } from "@/lib/data/portfolio";

export function CaseStudyChallenge({ study }: { study: CaseStudy }) {
  return (
    <Section
      tone="light"
      className="relative z-20 -mb-8 -mt-8 overflow-hidden rounded-2xl lg:-mb-11 lg:-mt-11 lg:rounded-[44px]"
    >
      <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
        <SectionHeading
          kicker="Before the work"
          title="What stood in the way"
          highlight="way"
          tone="light"
          subtitle={study.beforeIntro}
          align="left"
        />
        <RevealGroup className="flex flex-col gap-5">
          {study.before.map((card) => (
            <RevealItem key={card.title}>
              <FeatureInfoCard title={card.title} body={card.body} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
