"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import type { CtaLink } from "@/lib/data/pillars";
import type { ServiceHeroSurface, ServiceVisualVariant } from "@/lib/data/service-hero";
import { ServiceBreadcrumb } from "./ServiceBreadcrumb";
import { ServiceHeroActions } from "./ServiceHeroActions";
import styles from "./ServiceHero.module.css";

const t = {
  breadcrumb: 0.05,
  serviceName: 0.12,
  headline: 0.22,
  description: 0.38,
  cta: 0.48,
} as const;

const SURFACE_CLASS: Record<ServiceHeroSurface, string> = {
  white: "",
  mist: "max-lg:bg-cg-mist",
  cyan: "max-lg:bg-genie-10",
};

export function ServiceHero({
  breadcrumbHref = "/services",
  breadcrumbLabel = "Services",
  title,
  supportingLine = "for clinics",
  highlight,
  highlightColor,
  description,
  primaryCta,
  secondaryCta,
  visual,
  visualVariant: _visualVariant,
  backgroundImage,
  backgroundImageClassName = "object-cover object-center lg:object-right",
  surface = "white",
  accent,
}: {
  breadcrumbHref?: string;
  breadcrumbLabel?: string;
  title: string;
  supportingLine?: string;
  highlight: string;
  highlightColor?: string;
  description: string[];
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  visual?: ReactNode;
  visualVariant?: ServiceVisualVariant;
  backgroundImage?: string;
  backgroundImageClassName?: string;
  surface?: ServiceHeroSurface;
  accent?: string;
}) {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: ease.glide, delay },
  });

  return (
    <section
      data-nav-theme="light"
      className={cn(styles.hero, SURFACE_CLASS[surface])}
    >
      <div className={styles.desktopBackdrop}>
        {backgroundImage ? (
          <ParallaxBackground
            src={backgroundImage}
            priority
            entranceScale
            imageClassName={backgroundImageClassName}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
            />
          </ParallaxBackground>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${accent ?? "#18C4D9"} 28%, white), color-mix(in srgb, ${accent ?? "#18C4D9"} 12%, #f7fafb))`,
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
            />
          </>
        )}
      </div>

      <Container className="relative z-10 w-full">
        <div className={styles.copy}>
          <motion.div {...enter(t.breadcrumb)}>
            <ServiceBreadcrumb href={breadcrumbHref} label={breadcrumbLabel} className="mb-6" />
          </motion.div>

          <motion.div {...enter(t.serviceName)}>
            <h1 className="font-display text-h1 uppercase text-balance text-ink-900">
              {title}
            </h1>
            {supportingLine ? (
              <p className={cn(styles.supportingLine, "font-display text-subtitle font-normal text-ink-700")}>
                {supportingLine}
              </p>
            ) : null}
          </motion.div>

          <div className={cn(styles.highlight, "overflow-hidden pb-[0.22em]")}>
            <motion.p
              className="font-display text-h3 text-balance leading-[1.2] lg:text-h2 lg:leading-[1.18]"
              style={{ color: highlightColor }}
              initial={reduceMotion ? false : { y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: ease.glide, delay: t.headline }}
            >
              {highlight}
            </motion.p>
          </div>

          <motion.div
            className={cn(styles.body, "flex flex-col gap-3")}
            {...enter(t.description)}
          >
            {description.map((para) => (
              <p key={para} className="text-body text-pretty text-ink-700">
                {para}
              </p>
            ))}
          </motion.div>

          <motion.div className={cn(styles.actions, styles.mobileActions)} {...enter(t.cta)}>
            <ServiceHeroActions
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              layout="mobile"
            />
          </motion.div>

          <motion.div className={cn(styles.actions, styles.desktopActions)} {...enter(t.cta)}>
            <ServiceHeroActions
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              layout="desktop"
            />
          </motion.div>
        </div>

        {visual ? <div className={styles.visualZone}>{visual}</div> : null}
      </Container>
    </section>
  );
}
