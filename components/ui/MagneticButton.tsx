"use client";

import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/lib/hooks/useMagnetic";
import { useOrbStore } from "@/components/orb/store";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-pill font-sans font-semibold tracking-[0.01em] transition-[box-shadow,background-color,color] duration-ui ease-out-soft focus-visible:outline-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-gradient-to-br from-genie-500 to-genie-700 text-white shadow-glow-cta hover:shadow-glow-cta-hover",
  secondary: "glass text-onDark border border-white/15 hover:shadow-glow-md",
  ghost: "text-genie-200 hover:text-white",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.9375rem]",
  lg: "px-8 py-4 text-base",
};

function MiniOrb() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-5 w-5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#EAF8FE,#6CBAD9_55%,#1E5C78)] shadow-[0_0_10px_2px_rgba(127,233,240,0.8)] motion-safe:animate-glow-breathe"
    />
  );
}

export function MagneticButton({
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  withMiniOrb = false,
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
  withMiniOrb?: boolean;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const { ref, x, y, onMove, onLeave } = useMagnetic(0.25, 90);
  const labelX = useTransform(x, (n) => n * 0.6);
  const labelY = useTransform(y, (n) => n * 0.6);
  const pulse = useOrbStore((s) => s.pulse);

  const inner = (
    <>
      {withMiniOrb && <MiniOrb />}
      <motion.span
        style={magnetic ? { x: labelX, y: labelY } : undefined}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-pill">
        <span className="absolute -inset-y-2 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 blur-md transition-all duration-700 ease-genie group-hover:left-[110%] group-hover:opacity-100" />
      </span>
    </>
  );

  const handlers = {
    onPointerMove: magnetic ? onMove : undefined,
    onPointerLeave: magnetic ? onLeave : undefined,
    onPointerEnter: () => pulse(),
  };

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <motion.span ref={ref as React.RefObject<HTMLSpanElement>} style={{ x, y }} className="inline-block">
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
