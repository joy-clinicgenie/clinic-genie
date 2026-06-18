"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleField } from "@/components/ui/SparkleField";
import { HeroOrb } from "@/components/home/HeroOrb";
import orbStyles from "@/components/home/HeroOrb.module.css";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

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
  layout = "split",
  contentOrder = "headingFirst",
  orbSize = "compact",
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
  layout?: "split" | "stacked";
  contentOrder?: "headingFirst" | "childrenFirst";
  orbSize?: "compact" | "hero";
  minHeight?: string;
  containerSize?: "wide" | "prose" | "content";
  leading?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const stacked = layout === "stacked";
  const centered = align === "center";

  const headingBlock =
    (kicker || title) ? (
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
          "flex flex-wrap items-center gap-4",
          centered ? "justify-center" : "justify-start"
        )}
      >
        {primaryCta && (
          <MagneticButton href={primaryCta.href} size="lg" withMiniOrb>
            {primaryCta.label}
          </MagneticButton>
        )}
        {secondaryCta && (
          <MagneticButton href={secondaryCta.href} size="lg" variant="ghost" tone="light">
            {secondaryCta.label}
          </MagneticButton>
        )}
      </div>
    ) : null;

  const copyBlock = (
    <>
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
    </>
  );

  const orbBlock = showOrb ? (
    <motion.div
      className={cn(
        "flex shrink-0",
        stacked
          ? cn("w-full", centered ? "justify-center" : "w-36 justify-start")
          : "min-h-0 min-w-0 w-full justify-center lg:justify-end"
      )}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: ease.glide, delay: 0.15 }}
    >
      <HeroOrb
        showWishForm={showWishForm}
        className={
          stacked
            ? orbSize === "hero"
              ? orbStyles.stackHero
              : orbStyles.stackCompact
            : undefined
        }
      />
    </motion.div>
  ) : null;

  return (
    <section
      data-nav-theme="light"
      className={cn(
        "surface-light relative flex items-center overflow-hidden pb-20 pt-36 text-ink-900",
        minHeight,
        className
      )}
    >
      <SparkleField density={28} parallax variant="cluster" className="opacity-60" />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-[8%] w-[min(380px,55vw)] opacity-[0.35] motion-reduce:hidden"
        viewBox="0 0 380 380"
        fill="none"
      >
        <circle cx="190" cy="190" r="170" stroke="#9CC8D2" strokeWidth="1" strokeDasharray="6 10" />
        <circle cx="190" cy="190" r="120" stroke="#B8D9E0" strokeWidth="0.8" strokeDasharray="4 8" />
        <circle cx="190" cy="190" r="70" stroke="#9CC8D2" strokeWidth="0.6" />
      </svg>

      <Container size={containerSize} className="relative z-10">
        {stacked ? (
          <motion.div
            className={cn(
              "flex w-full max-w-3xl flex-col gap-6",
              centered ? "mx-auto items-center text-center" : "items-start text-left"
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: ease.glide, delay: 0.05 }}
          >
            {orbBlock}
            {copyBlock}
          </motion.div>
        ) : (
          <div
            className={cn(
              "grid w-full min-w-0 items-center gap-8 lg:gap-10",
              showOrb && "lg:grid-cols-[1.05fr_0.95fr]"
            )}
          >
            <motion.div
              className={cn(
                "flex flex-col gap-6",
                centered ? "items-center text-center" : "max-w-3xl lg:text-left",
                !showOrb && centered && "mx-auto",
                !showOrb && !centered && "max-w-3xl"
              )}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: ease.glide, delay: 0.05 }}
            >
              {copyBlock}
            </motion.div>
            {orbBlock}
          </div>
        )}
      </Container>
    </section>
  );
}
