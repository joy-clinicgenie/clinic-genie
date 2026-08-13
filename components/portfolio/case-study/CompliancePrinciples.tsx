import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { CaseStudy } from "@/lib/data/portfolio";

export function CompliancePrinciples({ study }: { study: CaseStudy }) {
  return (
    <Section tone="light" className="![background:theme(colors.genie.10)]">
      <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            kicker="Built for responsible healthcare marketing"
            title="Clarity without overclaiming"
            highlight="overclaiming"
            tone="light"
            subtitle={study.complianceIntro}
          />
          <Reveal variant="up" delay={0.08}>
            <MagneticButton href="/services#compliance" size="md" withMiniOrb>
              How We Keep You Compliant
            </MagneticButton>
          </Reveal>
        </div>

        <RevealGroup className="flex flex-col divide-y divide-hairline-light border-y border-hairline-light">
          {study.compliancePoints.map((point) => (
            <RevealItem key={point.title}>
              <article className="flex gap-5 py-7">
                {point.image ? (
                  <div className="relative mt-0.5 h-12 w-12 shrink-0">
                    <Image
                      src={point.image}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                ) : null}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-h5 font-semibold text-ink-900">
                    {point.title}
                  </h3>
                  <p className="text-body text-ink-700">{point.body}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
