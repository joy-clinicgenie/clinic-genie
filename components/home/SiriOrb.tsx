"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import styles from "./SiriOrb.module.css";

const SIZE_THRESHOLD_SMALL = 50;
const SIZE_THRESHOLD_TINY = 30;
const BLUR_MULTIPLIER_SMALL = 0.008;
const BLUR_MIN_SMALL = 1;
const BLUR_MULTIPLIER_LARGE = 0.015;
const BLUR_MIN_LARGE = 4;
const CONTRAST_MULTIPLIER_SMALL = 0.004;
const CONTRAST_MIN_SMALL = 1.2;
const CONTRAST_MULTIPLIER_LARGE = 0.008;
const CONTRAST_MIN_LARGE = 1.5;
const SHADOW_MULTIPLIER_SMALL = 0.004;
const SHADOW_MIN_SMALL = 0.5;
const SHADOW_MULTIPLIER_LARGE = 0.008;
const SHADOW_MIN_LARGE = 2;
const CONTRAST_TINY = 1.1;
const CONTRAST_MULTIPLIER_FINAL = 1.2;
const CONTRAST_MIN_FINAL = 1.3;

/** Colour-picked from the hero teal gradient. */
export const SIRI_ORB_TEAL_COLORS = {
  bg: "#0B2A46",
  c1: "#53E1D7",
  c2: "#2AA3A0",
  c3: "#208C8E",
} as const;

export interface SiriOrbProps {
  animationDuration?: number;
  className?: string;
  colors?: {
    bg?: string;
    c1?: string;
    c2?: string;
    c3?: string;
  };
  /** Pixel diameter, e.g. `"192px"` or a number of pixels. */
  size?: string | number;
  /** When true, freezes the conic rotation. */
  reducedMotion?: boolean;
}

function parseSizePx(size: string | number): number {
  if (typeof size === "number") return size;
  const parsed = Number.parseInt(size.replace("px", ""), 10);
  return Number.isFinite(parsed) ? parsed : 192;
}

function getFinalContrast(value: number, contrastAmount: number): number {
  if (value < SIZE_THRESHOLD_TINY) return CONTRAST_TINY;
  if (value < SIZE_THRESHOLD_SMALL) {
    return Math.max(contrastAmount * CONTRAST_MULTIPLIER_FINAL, CONTRAST_MIN_FINAL);
  }
  return contrastAmount;
}

/**
 * Animated conic-gradient orb fill (smooth, no halftone). Decorative.
 */
export function SiriOrb({
  size = "192px",
  className,
  colors,
  animationDuration = 20,
  reducedMotion = false,
}: SiriOrbProps) {
  const finalColors = { ...SIRI_ORB_TEAL_COLORS, ...colors };
  const sizeValue = parseSizePx(size);

  const blurAmount =
    sizeValue < SIZE_THRESHOLD_SMALL
      ? Math.max(sizeValue * BLUR_MULTIPLIER_SMALL, BLUR_MIN_SMALL)
      : Math.max(sizeValue * BLUR_MULTIPLIER_LARGE, BLUR_MIN_LARGE);

  const contrastAmount =
    sizeValue < SIZE_THRESHOLD_SMALL
      ? Math.max(sizeValue * CONTRAST_MULTIPLIER_SMALL, CONTRAST_MIN_SMALL)
      : Math.max(sizeValue * CONTRAST_MULTIPLIER_LARGE, CONTRAST_MIN_LARGE);

  const shadowSpread =
    sizeValue < SIZE_THRESHOLD_SMALL
      ? Math.max(sizeValue * SHADOW_MULTIPLIER_SMALL, SHADOW_MIN_SMALL)
      : Math.max(sizeValue * SHADOW_MULTIPLIER_LARGE, SHADOW_MIN_LARGE);

  const finalContrast = getFinalContrast(sizeValue, contrastAmount);

  return (
    <div
      className={cn(styles.root, reducedMotion && styles.rootPaused, className)}
      style={
        {
          "--bg": finalColors.bg,
          "--c1": finalColors.c1,
          "--c2": finalColors.c2,
          "--c3": finalColors.c3,
          "--animation-duration": `${animationDuration}s`,
          "--blur-amount": `${blurAmount}px`,
          "--contrast-amount": finalContrast,
          "--shadow-spread": `${shadowSpread}px`,
        } as CSSProperties
      }
    />
  );
}

export default SiriOrb;
