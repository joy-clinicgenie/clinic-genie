"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
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
  /** Defaults to true for the primary CTA. */
  withMiniOrb?: boolean;
};

export function LightHero({
  kicker,
  title,
  highlight,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  showOrb = true,
  showWishForm = true,
  showSparkles = true,
  backgroundImage,
  surface = "mist",
  align = "left",
  layout: _layout = "split",
  contentOrder = "headingFirst",
  orbSize: _orbSize = "compact",
  minHeight = "min-h-[68vh]",
  containerSize = "wide",
  leading,
  className,
  copyClassName,
  titleClassName,
  children,
}: {
  kicker?: string;
  title?: ReactNode;
  highlight?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  showOrb?: boolean;
  showWishForm?: boolean;
  showSparkles?: boolean;
  /** Full-bleed static hero background. Decorative sparkles/circles are hidden when set. */
  backgroundImage?: {
    src: string;
    alt?: string;
    /** Overlay and copy treatment. Use "dark" for photo heroes with light text. */
    treatment?: "light" | "dark";
    /** Applied to the background Image (object-position, etc.). */
    imageClassName?: string;
  };
  /** Section fill when no background image is set. */
  surface?: "mist" | "white";
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
  copyClassName?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const centered = align === "center";
  const centeredNoOrb = centered && !showOrb;
  const hasBackgroundImage = Boolean(backgroundImage?.src);
  const darkImageHero = hasBackgroundImage && backgroundImage?.treatment === "dark";
  const copyTone = darkImageHero ? "dark" : "light";
  const surfaceClass = hasBackgroundImage
    ? darkImageHero
      ? "bg-night-900"
      : "bg-cg-mist"
    : surface === "white"
      ? "bg-white"
      : "surface-light";

  const headingBlock =
    kicker || title ? (
      <SectionHeading
        as="h1"
        kicker={kicker}
        title={title ?? ""}
        highlight={highlight}
        subtitle={subtitle}
        description={description}
        tone={copyTone}
        align={centered ? "center" : "left"}
        className="gap-5"
        titleClassName={titleClassName}
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
          <MagneticButton
            href={primaryCta.href}
            size="md"
            withMiniOrb={primaryCta.withMiniOrb !== false}
          >
            {primaryCta.label}
          </MagneticButton>
        )}
        {secondaryCta && (
          <MagneticButton
            href={secondaryCta.href}
            size="md"
            variant="ghost"
            tone={darkImageHero ? "dark" : "light"}
          >
            {secondaryCta.label}
          </MagneticButton>
        )}
      </div>
    ) : null;

  const copyBlock = (
    <motion.div
      className={cn(
        styles.copyBlock,
        centered ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl lg:text-left",
        copyClassName
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
      data-nav-theme={darkImageHero ? "dark" : "light"}
      className={cn(
        "relative flex items-center overflow-hidden pb-12 pt-[calc(3.25rem+env(safe-area-inset-top,0px))] lg:pb-20 lg:pt-36",
        darkImageHero ? "text-onDark" : "text-ink-900",
        surfaceClass,
        minHeight,
        className
      )}
    >
      {hasBackgroundImage && backgroundImage ? (
        <ParallaxBackground
          src={backgroundImage.src}
          alt={backgroundImage.alt ?? ""}
          priority
          imageClassName={backgroundImage.imageClassName}
        >
          {darkImageHero ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25"
            />
          ) : (
            <div aria-hidden="true" className="absolute inset-0 bg-white/55" />
          )}
        </ParallaxBackground>
      ) : null}

      {showSparkles && !hasBackgroundImage ? (
        <SparkleField density={28} parallax variant="cluster" className="opacity-60" />
      ) : null}

      {!hasBackgroundImage ? (
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
      ) : null}

      <Container
        size={containerSize}
        className={cn(
          styles.lightHeroContent,
          centeredNoOrb && styles.lightHeroCenteredNoOrb,
          "relative z-10 w-full"
        )}
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
