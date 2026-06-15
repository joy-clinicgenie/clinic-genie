"use client";

import type { ReactNode } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** @deprecated Use MagneticButton directly. */
export function CTAButton({
  href,
  variant = "primary",
  tone = "dark",
  className,
  children,
  ariaLabel,
}: {
  href: string;
  variant?: "primary" | "ghost";
  tone?: "dark" | "light";
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <MagneticButton
      href={href}
      variant={variant === "ghost" ? "ghost" : "primary"}
      tone={tone}
      size="lg"
      withMiniOrb={variant === "primary"}
      className={className}
      ariaLabel={ariaLabel}
    >
      {children}
    </MagneticButton>
  );
}
