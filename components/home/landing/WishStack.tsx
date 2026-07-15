"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingIntro } from "@/components/home/landing/LandingLayout";
import { cn } from "@/lib/cn";
import type { CorePillar } from "@/lib/data/pillars";
import { WISH_STACK_IMAGES } from "@/lib/data/wish-stack-images";
import styles from "./WishStack.module.css";

const STACK_STEP = 16;
const INTRO_HEIGHT_FALLBACK = 280;

export type WishStackIntro = {
  kicker: string;
  title: string;
  highlight?: string;
  subtitle?: string;
};

function CardArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 18.256 18.256"
      aria-hidden="true"
      className="transition-transform duration-ui group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 motion-reduce:transition-none"
    >
      <g transform="translate(5.363 5.325)">
        <path
          d="M14.581,7.05,7.05,14.581"
          transform="translate(-7.05 -7.012)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M10,7l5.287.037.038,5.287"
          transform="translate(-7.756 -7)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

function WishExploreCta() {
  return (
    <span className={cn(styles.exploreCta, "group/cta")}>
      <span aria-hidden="true" className={styles.exploreButton}>
        <CardArrowIcon />
      </span>
      <span className={styles.exploreLabelClip}>
        <span aria-hidden="true" className={styles.exploreLabel}>
          Explore
        </span>
      </span>
    </span>
  );
}

function WishCardImage({ slug, accent }: { slug: string; accent: string }) {
  const image = WISH_STACK_IMAGES[slug];
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(image) && !failed;

  return (
    <div className={styles.imageCol}>
      <div
        aria-hidden="true"
        className={styles.imageFallback}
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 28%, white), color-mix(in srgb, ${accent} 12%, #f7fafb))`,
        }}
      />
      {showPhoto && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 240px"
            onError={() => setFailed(true)}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-15% via-white/60 via-35% to-transparent"
          />
        </>
      )}
      {!showPhoto && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-20% via-white/50 via-40% to-transparent"
        />
      )}
    </div>
  );
}

export function WishStack({
  pillars,
  chips,
  intro,
}: {
  pillars: CorePillar[];
  chips: Record<string, string>;
  intro: WishStackIntro;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [stackBase, setStackBase] = useState(INTRO_HEIGHT_FALLBACK + 96);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const intro = introRef.current;
    if (!root || !intro) return;

    const measure = () => {
      const stickyTop = parseFloat(getComputedStyle(root).getPropertyValue("--wish-sticky-top")) || 96;
      setStackBase(stickyTop + intro.offsetHeight);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(intro);
    observer.observe(root);

    return () => observer.disconnect();
  }, [intro.kicker, intro.title, intro.subtitle, intro.highlight]);

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={introRef} className={styles.introSticky}>
        <LandingIntro
          kicker={intro.kicker}
          title={intro.title}
          highlight={intro.highlight}
          subtitle={intro.subtitle}
        />
      </div>

      <div className={styles.stack}>
        {pillars.map((pillar, index) => (
          <article
            key={pillar.slug}
            className="sticky"
            style={{
              top: stackBase + index * STACK_STEP,
              zIndex: index + 1,
            }}
          >
            <Link
              href={`/services/core-pillars/${pillar.slug}`}
              className={cn(
                "group block overflow-hidden rounded-2xl border border-[#E6EEF1] bg-white shadow-card transition-[transform,box-shadow,border-color] duration-ui hover:-translate-y-0.5 hover:border-[#C5DDE3] hover:shadow-lg motion-reduce:hover:translate-y-0",
                index < pillars.length - 1 ? "mb-[min(11vh,6.5rem)]" : "mb-0"
              )}
              aria-label={`Explore ${pillar.name}`}
            >
              <div className={styles.cardBody}>
                <div className={styles.textCol}>
                  <span className="inline-flex items-center rounded-pill bg-[#E3F6FA] px-2.5 py-0.5 font-sans text-[10px] uppercase tracking-wider text-[#217B8E]">
                    {chips[pillar.slug] ?? "SERVICE"}
                  </span>
                  <h3 className="font-display text-h4 font-semibold leading-snug text-ink-900">
                    {pillar.name}
                  </h3>
                  <p className="text-body text-[#7E8C92]">{pillar.heroTitle}</p>
                  <div className={styles.ctaRow}>
                    <WishExploreCta />
                  </div>
                </div>
                <WishCardImage slug={pillar.slug} accent={pillar.accent} />
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div aria-hidden="true" className={styles.spacer} />
    </div>
  );
}
