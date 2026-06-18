"use client";

import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import { Children, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/lib/hooks/useMagnetic";
import { useOrbStore } from "@/components/orb/store";
import { Brandmark } from "@/components/ui/Logo";
import { SparkleCluster } from "@/components/ui/SparkleCluster";
import styles from "./MagneticButton.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";
type Tone = "dark" | "light";

const BASE =
  "group relative inline-flex items-center justify-center rounded-pill font-sans font-semibold tracking-[0.01em] transition-[box-shadow,background-color,color] duration-ui ease-out-soft focus-visible:outline-none disabled:opacity-50";

const PRIMARY: Record<Size, string> = {
  sm: "btn-cta btn-cta-sm hover:-translate-y-0.5",
  md: "btn-cta btn-cta-md hover:-translate-y-0.5",
  lg: "btn-cta hover:-translate-y-0.5",
};

const BRANDMARK_PRIMARY: Record<Size, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const SECONDARY: Record<Tone, string> = {
  dark: "glass text-onDark border border-white/15 hover:shadow-glow-md",
  light: "border border-[#D8DEE1] bg-white/80 text-ink-900 hover:border-[#9FB6BD] hover:-translate-y-0.5",
};

const GHOST: Record<Tone, string> = {
  dark: "text-genie-200 hover:text-white",
  light: "border border-[#D8DEE1] bg-white text-ink-900 hover:border-[#9FB6BD] hover:-translate-y-0.5",
};

/** Padding for secondary/ghost only — primary uses `.btn-cta` tokens in globals.css */
const SIZES: Record<Size, string> = {
  sm: "gap-2 px-4 py-2 text-sm",
  md: "gap-2 px-6 py-3 text-[0.9375rem]",
  lg: "gap-2 px-8 py-4 text-base",
};

const BRANDMARK_SIZES: Record<Size, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-5 w-5",
};

const BUTTON_SPARKLES = [
  { x: "8%", y: "-8%", size: 8, color: "#18c4d9" },
  { x: "50%", y: "-12%", size: 11, color: "#54b9ce" },
  { x: "92%", y: "-8%", size: 7, color: "#78e2dd" },
  { x: "108%", y: "50%", size: 10, color: "#18c4d9" },
  { x: "92%", y: "108%", size: 9, color: "#54b9ce" },
  { x: "50%", y: "112%", size: 12, color: "#78e2dd" },
  { x: "8%", y: "108%", size: 8, color: "#18c4d9" },
  { x: "-8%", y: "50%", size: 10, color: "#54b9ce" },
] as const;

function getButtonLabel(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return Children.toArray(children).map(getButtonLabel).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return getButtonLabel(children.props.children);
  }

  return "";
}

function ButtonBrandmark({ size, primary }: { size: Size; primary: boolean }) {
  return (
    <Brandmark
      className={cn(
        primary ? BRANDMARK_PRIMARY[size] : BRANDMARK_SIZES[size],
        "shrink-0 text-current opacity-95"
      )}
      aria-hidden="true"
    />
  );
}

function renderLabelWithMagicHighlight(children: ReactNode, enabled: boolean): ReactNode {
  if (!enabled || typeof children !== "string") {
    return children;
  }

  const parts = children.split(/(magic)/i);
  if (parts.length === 1) {
    return children;
  }

  return parts.map((part, index) =>
    /magic/i.test(part) ? (
      <span key={`${part}-${index}`} className={styles.magicWord}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function MagneticButton({
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  tone = "dark",
  withMiniOrb = false,
  withSparkle,
  magnetic = true,
  className,
  children,
  ariaLabel,
}: {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  withMiniOrb?: boolean;
  withSparkle?: boolean;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const { ref, x, y, onMove, onLeave } = useMagnetic(0.25, 90);
  const labelX = useTransform(x, (n) => n * 0.6);
  const labelY = useTransform(y, (n) => n * 0.6);
  const pulse = useOrbStore((s) => s.pulse);
  const label = getButtonLabel(children);
  const showMagicSparkle = withSparkle ?? /magic/i.test(label);

  const inner = (
    <>
      {withMiniOrb && <ButtonBrandmark size={size} primary={variant === "primary"} />}
      <motion.span
        style={magnetic ? { x: labelX, y: labelY } : undefined}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {renderLabelWithMagicHighlight(children, showMagicSparkle)}
      </motion.span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-pill">
        <span className="absolute -inset-y-2 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 blur-md transition-all duration-700 ease-genie group-hover:left-[110%] group-hover:opacity-100" />
      </span>
      {showMagicSparkle && (
        <span className={styles.buttonSparkles} aria-hidden="true">
          {BUTTON_SPARKLES.map((spark, index) => (
            <span
              key={index}
              className={styles.buttonSparkle}
              style={{
                left: spark.x,
                top: spark.y,
                width: spark.size,
                height: spark.size,
                color: spark.color,
              }}
            >
              <SparkleCluster glow className="h-full w-full" />
            </span>
          ))}
        </span>
      )}
    </>
  );

  const handlers = {
    onPointerMove: magnetic ? onMove : undefined,
    onPointerLeave: magnetic ? onLeave : undefined,
    onPointerEnter: () => pulse(),
  };

  const variantClass =
    variant === "primary" ? PRIMARY[size] : variant === "secondary" ? SECONDARY[tone] : GHOST[tone];

  const classes = cn(
    BASE,
    variantClass,
    variant !== "primary" && SIZES[size],
    showMagicSparkle && styles.magicButton,
    className
  );

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <motion.span
          ref={ref as React.RefObject<HTMLSpanElement>}
          style={{ x, y }}
          className={cn("inline-block", showMagicSparkle && "overflow-visible")}
        >
          <Link href={href} className={classes} aria-label={ariaLabel} {...handlers}>
            {inner}
          </Link>
        </motion.span>
      );
    }
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x, y }}
        className={classes}
        aria-label={ariaLabel}
        {...handlers}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={() => {
        pulse();
        onClick?.();
      }}
      style={{ x, y }}
      className={classes}
      aria-label={ariaLabel}
      {...handlers}
    >
      {inner}
    </motion.button>
  );
}
