"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleField } from "@/components/ui/SparkleField";
import { HeroOrb } from "@/components/home/HeroOrb";
import heroStyles from "@/components/home/Hero.module.css";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import styles from "./LightHero.module.css";

type CtaLink = {
  href: string;
  label: string;
};

export function LightHero({
  kicker,
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
  showOrb = true,
  showWishForm = true,
  align = "left",
  layout: _layout = "split",
  contentOrder = "headingFirst",
  orbSize: _orbSize = "compact",
  minHeight = "min-h-[68vh]",
  containerSize = "wide",
  leading,
  className,
  children,
}: {
  kicker?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  showOrb?: boolean;
  showWishForm?: boolean;
  align?: "left" | "center";
  /** @deprecated Mobile always uses landing-style orb-first layout */
  layout?: "split" | "stacked";
  contentOrder?: "headingFirst" | "childrenFirst";
  /** @deprecated Landing orb sizing is used on mobile */
  orbSize?: "compact" | "hero";
  minHeight?: string;
  containerSize?: "wide" | "prose" | "content";
  leading?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const centered = align === "center";

  const headingBlock =
    kicker || title ? (
      <SectionHeading
        as="h1"
        kicker={kicker}
        title={title ?? ""}
        highlight={highlight}
        subtitle={subtitle}
        tone="light"
        align={centered ? "center" : "left"}
        className="gap-5"
      />
    ) : null;

  const ctaBlock =
    primaryCta || secondaryCta ? (
      <div
        className={cn(
          "flex flex-col flex-wrap items-center gap-3 sm:flex-row sm:gap-4",
          centered ? "justify-center" : "justify-center lg:justify-start"
        )}
      >
        {primaryCta && (
          <MagneticButton href={primaryCta.href} size="md" withMiniOrb>
            {primaryCta.label}
          </MagneticButton>
        )}
        {secondaryCta && (
          <MagneticButton href={secondaryCta.href} size="md" variant="ghost" tone="light">
            {secondaryCta.label}
          </MagneticButton>
        )}
      </div>
    ) : null;

  const copyBlock = (
    <motion.div
      className={cn(
        styles.copyBlock,
        centered ? "items-center text-center" : "max-w-3xl lg:text-left"
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: ease.glide, delay: 0.1 }}
    >
      {contentOrder === "headingFirst" ? (
        <>
          {leading}
          {headingBlock}
          {children}
        </>
      ) : (
        <>
          {leading}
          {children}
          {headingBlock}
        </>
      )}
      {ctaBlock}
    </motion.div>
  );

  const orbBlock = showOrb ? (
    <motion.div
      className={cn(heroStyles.orbSlot, styles.orbSlot)}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: ease.glide, delay: 0.05 }}
    >
      <HeroOrb className={heroStyles.heroOrb} orbWishLayout showWishForm={showWishForm} />
    </motion.div>
  ) : null;

  return (
    <section
      data-nav-theme="light"
      className={cn(
        "surface-light relative flex items-center overflow-hidden pb-12 pt-[calc(3.25rem+env(safe-area-inset-top,0px))] text-ink-900 lg:pb-20 lg:pt-36",
        minHeight,
        className
      )}
    >
      <SparkleField density={28} parallax variant="cluster" className="opacity-60" />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-[8%] hidden w-[min(380px,55vw)] opacity-[0.35] motion-reduce:hidden lg:block"
        viewBox="0 0 380 380"
        fill="none"
      >
        <circle cx="190" cy="190" r="170" stroke="#9CC8D2" strokeWidth="1" strokeDasharray="6 10" />
        <circle cx="190" cy="190" r="120" stroke="#B8D9E0" strokeWidth="0.8" strokeDasharray="4 8" />
        <circle cx="190" cy="190" r="70" stroke="#9CC8D2" strokeWidth="0.6" />
      </svg>

      <Container
        size={containerSize}
        className={cn(styles.lightHeroContent, "relative z-10 w-full")}
      >
        <div
          className={cn(
            heroStyles.heroGrid,
            styles.lightHeroGrid,
            !showOrb && "lg:block"
          )}
        >
          {orbBlock}
          {copyBlock}
        </div>
      </Container>
    </section>
  );
}
