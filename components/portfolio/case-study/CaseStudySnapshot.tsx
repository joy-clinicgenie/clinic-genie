import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CaseStudy } from "@/lib/data/portfolio";

function SnapshotItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt>
        <Kicker tone="dark">{label}</Kicker>
      </dt>
      <dd className="text-sm leading-relaxed text-onDark-muted sm:text-base">{value}</dd>
    </div>
  );
}

export function CaseStudySnapshot({ study }: { study: CaseStudy }) {
  return (
    <Section tone="dark" className="-mt-8 bg-night-800 pb-20 pt-20 [background-image:none] md:-mt-11 md:pb-24 md:pt-24">
      <Container className="flex flex-col gap-6">
        <SectionHeading
          kicker="Project snapshot"
          title="The brief at a glance"
          highlight="glance"
          className="gap-3"
        />
        <Reveal variant="up">
          <dl className="grid gap-5 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6">
            <SnapshotItem label="Clinic type" value={study.snapshot.clinicType} />
            <SnapshotItem label="Project focus" value={study.snapshot.projectFocus} />
            <SnapshotItem label="Main challenge" value={study.snapshot.mainChallenge} />
            <SnapshotItem label="Clinic Genie role" value={study.snapshot.role} />
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
