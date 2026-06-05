"use client";

import { useEffect } from "react";
import { useOrbStore, type OrbRenderer } from "@/components/orb/store";
import { startPointerTracking } from "@/lib/hooks/usePointer";

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

function isLowPower(): boolean {
  const n = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (n.connection?.saveData) return true;
  if (typeof n.deviceMemory === "number" && n.deviceMemory < 4) return true;
  if (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4) return true;
  // coarse pointer on a small viewport = phone
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (coarse && window.innerWidth < 768) return true;
  return false;
}

function detectRenderer(): OrbRenderer {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  if (!canUseWebGL()) return "canvas2d";
  if (isLowPower()) return "canvas2d";
  return "webgl";
}

/** Runs capability detection once and starts global pointer tracking. */
export function OrbProvider({ children }: { children: React.ReactNode }) {
  const setScene = useOrbStore((s) => s.setScene);

  useEffect(() => {
    startPointerTracking();
    setScene({ renderer: detectRenderer() });

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setScene({ renderer: detectRenderer() });
    mq.addEventListener("change", onChange);

    // pause/resume on tab visibility is handled inside each renderer
    return () => mq.removeEventListener("change", onChange);
  }, [setScene]);

  return <>{children}</>;
}
