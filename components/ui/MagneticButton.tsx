"use client";

import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/lib/hooks/useMagnetic";
import { useOrbStore } from "@/components/orb/store";
import { Brandmark } from "@/components/ui/Logo";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";
type Tone = "dark" | "light";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-pill font-sans font-semibold tracking-[0.01em] transition-[box-shadow,background-color,color] duration-ui ease-out-soft focus-visible:outline-none disabled:opacity-50";

const PRIMARY = "btn-cta hover:-translate-y-0.5";

const SECONDARY: Record<Tone, string> = {
  dark: "glass text-onDark border border-white/15 hover:shadow-glow-md",
  light: "border border-[#D8DEE1] bg-white/80 text-ink-900 hover:border-[#9FB6BD] hover:-translate-y-0.5",
};

const GHOST: Record<Tone, string> = {
  dark: "text-genie-200 hover:text-white",
  light: "border border-[#D8DEE1] bg-white text-ink-900 hover:border-[#9FB6BD] hover:-translate-y-0.5",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.9375rem]",
  lg: "px-8 py-4 text-base",
};

const BRANDMARK_SIZES: Record<Size, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-5 w-5",
};

function ButtonBrandmark({ size }: { size: Size }) {
  return (
    <Brandmark
      className={cn(BRANDMARK_SIZES[size], "shrink-0 text-current opacity-95")}
      aria-hidden="true"
    />
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
      {withMiniOrb && <ButtonBrandmark size={size} />}
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

  const variantClass =
    variant === "primary" ? PRIMARY : variant === "secondary" ? SECONDARY[tone] : GHOST[tone];

  const classes = cn(BASE, variantClass, SIZES[size], className);

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
