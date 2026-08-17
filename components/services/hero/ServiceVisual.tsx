"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import type { ServiceHeroVisualConfig, ServiceVisualVariant } from "@/lib/data/service-hero";
import styles from "./ServiceVisual.module.css";

const VARIANT_CLASS: Record<ServiceVisualVariant, string> = {
  right: styles.right,
  centre: styles.centre,
  "full-width": styles.fullWidth,
  "bottom-overflow": styles.bottomOverflow,
  layered: styles.layered,
};

const ENTER: Record<ServiceVisualVariant, { x?: number; y?: number; scale?: number }> = {
  right: { x: 16, y: 8, scale: 0.98 },
  centre: { y: 12, scale: 0.98 },
  "full-width": { y: 12, scale: 0.99 },
  "bottom-overflow": { x: 14, y: 10, scale: 0.98 },
  layered: { y: 10, scale: 0.98 },
};

function SerpVisual() {
  return (
    <div className={styles.interface} aria-hidden="true">
      <div className={styles.serpBar}>
        <span className={styles.serpDot} />
        <span className={styles.serpQuery} />
      </div>
      <div className={styles.serpList}>
        <div className={cn(styles.serpRow, styles.serpRowActive)}>
          <span className={cn(styles.line, styles.lineMid)} />
          <span className={cn(styles.line, styles.lineWide)} />
          <span className={cn(styles.line, styles.lineShort)} />
        </div>
        <div className={styles.serpRow}>
          <span className={cn(styles.line, styles.lineMid)} />
          <span className={cn(styles.line, styles.lineWide)} />
        </div>
        <div className={styles.serpRow}>
          <span className={cn(styles.line, styles.lineShort)} />
          <span className={cn(styles.line, styles.lineMid)} />
        </div>
      </div>
    </div>
  );
}

function CampaignVisual() {
  return (
    <div className={styles.interface} aria-hidden="true">
      <div className={styles.adBar}>
        <span className={styles.adDot} />
        <span className={styles.adQuery} />
      </div>
      <div className={styles.adGrid}>
        <div className={cn(styles.adCard, styles.adCardAccent)}>
          <span className={cn(styles.line, styles.lineMid)} />
          <span className={cn(styles.line, styles.lineShort)} />
        </div>
        <div className={styles.adCard}>
          <span className={cn(styles.line, styles.lineMid)} />
          <span className={cn(styles.line, styles.lineShort)} />
        </div>
        <div className={styles.adCard}>
          <span className={cn(styles.line, styles.lineWide)} />
          <span className={cn(styles.line, styles.lineShort)} />
        </div>
        <div className={styles.adCard}>
          <span className={cn(styles.line, styles.lineMid)} />
          <span className={cn(styles.line, styles.lineShort)} />
        </div>
      </div>
    </div>
  );
}

export function ServiceVisual({
  config,
}: {
  config: ServiceHeroVisualConfig;
}) {
  const reduceMotion = useReducedMotion();
  const enter = ENTER[config.variant];

  return (
    <motion.div
      className={cn(styles.frame, VARIANT_CLASS[config.variant])}
      initial={reduceMotion ? false : { opacity: 0, ...enter }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: ease.glide, delay: 0.28 }}
    >
      {config.kind === "serp" ? (
        <SerpVisual />
      ) : config.kind === "campaign" ? (
        <CampaignVisual />
      ) : config.src ? (
        <div className={styles.imageWrap}>
          <Image
            key={config.src}
            src={config.src}
            alt={config.alt ?? ""}
            fill
            priority
            sizes="(max-width: 1023px) 80vw, 0px"
            className={config.imageClassName ?? "object-cover object-center"}
          />
          <div className={styles.fade} aria-hidden="true" />
        </div>
      ) : null}
    </motion.div>
  );
}
