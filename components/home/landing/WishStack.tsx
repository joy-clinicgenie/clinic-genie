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
                "group block overflow-hidden rounded-[20px] border border-[#E6EEF1]/90 bg-white/95 shadow-none transition-[transform,box-shadow,border-color] duration-ui hover:-translate-y-0.5 hover:border-[#C5DDE3] hover:shadow-[0_8px_24px_rgba(6,45,54,0.08)] motion-reduce:hover:translate-y-0",
                index < pillars.length - 1 ? "mb-[min(11vh,6.5rem)]" : "mb-0"
              )}
              aria-label={`Explore ${pillar.name}`}
            >
              <div className={styles.cardBody}>
                <div className={styles.textCol}>
                  <span className="inline-flex items-center rounded-pill bg-[#E3F6FA] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#217B8E]">
                    {chips[pillar.slug] ?? "SERVICE"}
                  </span>
                  <h3 className="font-display text-[1.15rem] font-bold leading-snug text-ink-900">
                    {pillar.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#7E8C92]">{pillar.heroTitle}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 border-t border-[#EDF1F2] pt-3 text-sm font-semibold text-ink-900 transition-colors group-hover:text-[#217B8E]">
                    Explore
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
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
