"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { CaseStudy, CaseStudyCard } from "@/lib/data/portfolio";
import {
  WorkstreamActiveImage,
} from "./WorkstreamImageSlots";
import { padIndex, parsePillarCount, slotKeyForWorkstreamIndex } from "./utils";
import styles from "./WorkstreamList.module.css";

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

  return null;
}

export function WorkstreamList({ study }: { study: CaseStudy }) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const elements = itemRefs.current.filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }

        let nextIndex = 0;
        let bestRatio = -1;
        elements.forEach((el, index) => {
          const ratio = ratios.get(el) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            nextIndex = index;
          }
        });

        if (bestRatio > 0) {
          setActiveIndex(nextIndex);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [study.workedOn]);

  const pillarMetric = study.projectArchitecture?.find((metric) =>
    /pillar/i.test(metric.label)
  );
  const pillarCount = parsePillarCount(pillarMetric?.value);
  const activeKey = slotKeyForWorkstreamIndex(activeIndex);

  return (
    <Section
      id="granted-wish"
      tone="light"
      className="-mt-8 overflow-clip pb-20 pt-28 md:-mt-11 md:pb-32 md:pt-40 ![background:white]"
    >
      <Container size="wide" className="max-w-[90rem]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)] lg:gap-12">
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <SectionHeading
              kicker="What we worked on"
              title="The work behind the clearer journey"
              highlight="clearer journey"
              tone="light"
              subtitle={study.workedOnIntro}
            />
            <WorkstreamActiveImage
              images={study.workedOnImages}
              activeKey={activeKey}
            />
          </div>

          <div className="relative lg:-mt-40 lg:-mb-32 lg:pb-32 lg:pt-40">
            <div aria-hidden="true" className={styles.edgeFadeTop} />
            <RevealGroup className="flex flex-col divide-y divide-hairline-light">
              {study.workedOn.map((item, index) => (
                <RevealItem key={item.title}>
                  <article
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    className="flex flex-col gap-6 py-10 lg:py-12"
                  >
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
            <div aria-hidden="true" className={styles.edgeFadeBottom} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
