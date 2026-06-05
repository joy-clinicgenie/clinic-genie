"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { OrbFallback } from "./OrbFallback";
import { OrbCanvas2D } from "./OrbCanvas2D";
import type { OrbVariant } from "./store";

/**
 * Lightweight inline orb for decorative, non-companion placements (footer, 404,
 * section accents). It never spins up a second WebGL context — it uses the
 * Canvas2D plasma when motion is allowed, and the static CSS aura otherwise.
 * The hero/companion orb is always the singleton <OrbCompanion>.
 */
export function MagicOrb({
  variant = "home",
  className,
  static: forceStatic = false,
}: {
  variant?: OrbVariant;
  className?: string;
  static?: boolean;
}) {
  const [mode, setMode] = useState<"pending" | "animated" | "static">("pending");

  useEffect(() => {
    if (forceStatic || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("static");
      return;
    }
    setMode("animated");
  }, [forceStatic]);

  return (
    <div className={cn("relative aspect-square", className)} aria-hidden="true">
      {mode === "animated" ? <OrbCanvas2D variant={variant} /> : <OrbFallback variant={variant} static />}
    </div>
  );
}
