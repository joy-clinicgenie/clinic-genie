"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";
type Tone = "dark" | "light";

const PRIMARY =
  "bg-gradient-to-br from-genie-500 to-genie-700 text-white shadow-glow-cta hover:shadow-glow-cta-hover hover:-translate-y-0.5";

const GHOST: Record<Tone, string> = {
  dark:  "border border-white/20 bg-white/5 text-onDark hover:border-genie-400/50 hover:bg-genie-500/10 hover:-translate-y-0.5",
  light: "border border-ink-900/20 bg-transparent text-ink-900 hover:border-genie-600/50 hover:bg-genie-500/10 hover:-translate-y-0.5",
};

/**
 * Accessible CTA for the homepage — keyboard focusable, no hover-only behaviour.
 */
export function CTAButton({
  href,
  variant = "primary",
  tone = "dark",
  className,
  children,
  ariaLabel,
}: {
  href: string;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-pill px-8 py-4 font-display text-base font-semibold tracking-[0.01em] transition-[transform,box-shadow,background-color,border-color] duration-ui ease-out-soft focus-visible:outline-none focus-visible:shadow-focus";

  const variantClass = variant === "primary" ? PRIMARY : GHOST[tone];

  return (
    <Link href={href} className={cn(base, variantClass, className)} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
