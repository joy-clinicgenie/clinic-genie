"use client";

import { useState } from "react";
import { Kicker } from "@/components/ui/Kicker";
import { PORTFOLIO_WORKS } from "@/lib/data/portfolio-works";
import { RealFlipHeadline } from "./RealFlipHeadline";
import { WorkGalleryItem } from "./WorkGalleryItem";
import styles from "./WorksGalleryLayout.module.css";

export function WorksGalleryLayout() {
  const [focusedId, setFocusedId] = useState<string | null>(null);

  return (
    <section
      data-nav-theme="dark"
      aria-labelledby="our-works-heading"
      className="bg-night-950 text-onDark"
    >
      <div className="mx-auto grid w-full max-w-wide gap-10 px-[var(--page-pad)] pb-16 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] lg:grid-cols-[minmax(16rem,32%)_minmax(0,1fr)] lg:gap-12 lg:pb-24 lg:pt-[calc(6.5rem+env(safe-area-inset-top,0px))]">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-[5.5rem] lg:self-start lg:pr-4">
          <div className="flex flex-col gap-5">
            <Kicker tone="dark">Our works</Kicker>
            <h1
              id="our-works-heading"
              className="font-display text-4xl font-semibold tracking-tight text-onDark sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]"
            >
              <RealFlipHeadline />
            </h1>
            <p className="max-w-sm font-sans text-base leading-relaxed text-onDark/70">
              A look at the brands, websites and campaigns we&apos;ve conjured for specialist
              clinics across Singapore, and the results that followed.
            </p>
          </div>
        </aside>

        <div className={styles.gallery} onMouseLeave={() => setFocusedId(null)}>
          {PORTFOLIO_WORKS.map((work, index) => (
            <WorkGalleryItem
              key={work.id}
              work={work}
              index={index}
              isFocused={focusedId === work.id}
              isDimmed={focusedId !== null && focusedId !== work.id}
              onFocusChange={setFocusedId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
