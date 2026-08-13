import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { CaseStudy, CaseStudyCard } from "@/lib/data/portfolio";
import { padIndex, parsePillarCount } from "./utils";

function PillarDiagram({ count }: { count: number }) {
  const items = Array.from({ length: count }, (_, index) => padIndex(index));

  return (
    <ul
      className="grid list-none grid-cols-2 gap-3 sm:grid-cols-3"
      aria-label={`${count} treatment pillars`}
    >
      {items.map((label) => (
        <li
          key={label}
          className="flex flex-col gap-2 rounded-2xl border border-hairline-light bg-white px-4 py-5"
        >
          <span className="font-display text-h3 font-normal tabular-nums text-genie-600">
            {label}
          </span>
          <span className="font-sans text-xs uppercase tracking-widest text-ink-700">
            Pillar
          </span>
        </li>
      ))}
    </ul>
  );
}

function WorkstreamMedia({
  item,
  pillarCount,
}: {
  item: CaseStudyCard;
  pillarCount: number;
}) {
  if (item.diagram === "pillars") {
    return <PillarDiagram count={pillarCount} />;
  }

  if (!item.image) return null;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-card">
      <Image
        src={item.image}
        alt={item.alt ?? item.title}
        fill
        className="object-contain object-center"
        sizes="(min-width: 1024px) 42vw, 100vw"
      />
    </div>
  );
}

export function WorkstreamList({ study }: { study: CaseStudy }) {
  const pillarMetric = study.projectArchitecture?.find((metric) =>
    /pillar/i.test(metric.label)
  );
  const pillarCount = parsePillarCount(pillarMetric?.value);

  return (
    <Section
      id="granted-wish"
      tone="light"
      className="-mt-8 pb-20 pt-28 md:-mt-11 md:pb-32 md:pt-40"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              kicker="What we worked on"
              title="The work behind the clearer journey"
              highlight="clearer journey"
              tone="light"
              subtitle={study.workedOnIntro}
            />
          </div>

          <RevealGroup className="flex flex-col divide-y divide-hairline-light border-y border-hairline-light">
            {study.workedOn.map((item, index) => (
              <RevealItem key={item.title}>
                <article className="flex flex-col gap-6 py-10 lg:py-12">
                  <div className="flex flex-col gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-h1 font-normal tabular-nums leading-none text-genie-600"
                    >
                      {padIndex(index)}
                    </span>
                    <h3 className="font-display text-h4 font-semibold text-ink-900">
                      {item.title}
                    </h3>
                    <p className="max-w-xl text-body text-ink-700">{item.body}</p>
                  </div>
                  <WorkstreamMedia item={item} pillarCount={pillarCount} />
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
