import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LandingKicker } from "@/components/home/landing/LandingLayout";
import type { CaseStudy } from "@/lib/data/portfolio";

export function CaseStudyMetrics({ study }: { study: CaseStudy }) {
  return (
    <section
      id="what-changed"
      data-nav-theme="dark"
      className="scroll-mt-24 bg-[#062D36] py-20 text-onDark md:py-28"
    >
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <Reveal className="lg:col-span-4">
            <header className="flex max-w-md flex-col items-start gap-4 text-left">
              <LandingKicker light align="left">
                What changed
              </LandingKicker>
              <h2 className="font-display text-h2 text-balance text-white">
                {study.changesTitle ?? "What the clinic can now measure"}
              </h2>
              {study.changesLead ? (
                <p className="text-body leading-relaxed text-white">{study.changesLead}</p>
              ) : null}
              {study.changesIntro ? (
                <p className="text-body leading-relaxed text-onDark-muted">
                  {study.changesIntro}
                </p>
              ) : null}
            </header>
          </Reveal>

          <RevealGroup className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {study.changes.map((change) => (
              <RevealItem key={change.title}>
                <article className="flex flex-col items-start">
                  <h3 className="font-display text-[1.125rem] font-semibold leading-snug text-white">
                    {change.title}
                  </h3>
                  {change.body ? (
                    <p className="mt-2 text-body leading-relaxed text-onDark-muted">
                      {change.body}
                    </p>
                  ) : null}
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
