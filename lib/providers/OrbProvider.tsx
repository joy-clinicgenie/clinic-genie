"use client";

import { useEffect } from "react";
import { useOrbStore, type OrbRenderer } from "@/components/orb/store";
import { startPointerTracking } from "@/lib/hooks/usePointer";
import {
  isLowPowerDevice,
  prefersReducedMotion,
  syncPointerDataset,
} from "@/lib/hooks/useConstrainedMotion";

function canUseWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      c.getContext("webgl2") ||
      c.getContext("webgl") ||
      c.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

function detectRenderer(): OrbRenderer {
  if (prefersReducedMotion()) return "static";
  if (!canUseWebGL()) return "canvas2d";
  if (isLowPowerDevice()) return "canvas2d";
  return "webgl";
}

/** Runs capability detection once and starts global pointer tracking. */
export function OrbProvider({ children }: { children: React.ReactNode }) {
  const setScene = useOrbStore((s) => s.setScene);

  useEffect(() => {
    startPointerTracking();
    syncPointerDataset();
    setScene({ renderer: detectRenderer() });

    const onChange = () => {
      syncPointerDataset();
      setScene({ renderer: detectRenderer() });
    };

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseMq = window.matchMedia("(any-pointer: coarse)");
    motionMq.addEventListener("change", onChange);
    coarseMq.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);

    return () => {
      motionMq.removeEventListener("change", onChange);
      coarseMq.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, [setScene]);

  return <>{children}</>;
}
