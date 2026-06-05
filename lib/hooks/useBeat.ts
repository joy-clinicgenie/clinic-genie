"use client";

import { useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useOrbStore, type SceneInput } from "@/components/orb/store";

/**
 * Attach an element as a scrollytelling "beat". As the element scrolls through
 * the viewport, `mapper(progress 0..1)` returns a scene that is pushed to the
 * orb store. Returns the scroll progress MotionValue for local use.
 */
export function useBeat(
  ref: React.RefObject<HTMLElement>,
  mapper: (progress: number) => SceneInput,
  options?: { active?: boolean }
) {
  const setScene = useOrbStore((s) => s.setScene);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (options?.active === false) return;
    const scene = mapper(p);
    const next: Partial<ReturnType<typeof useOrbStore.getState>> = {};
    if (scene.mood !== undefined) next.mood = scene.mood;
    if (scene.anchor !== undefined) next.anchorId = scene.anchor;
    if (scene.variant !== undefined) next.variant = scene.variant;
    if (scene.scale !== undefined) next.scale = scene.scale;
    if (scene.intensity !== undefined) next.intensity = scene.intensity;
    setScene(next);
  });

  useEffect(() => {
    return () => {
      /* no-op cleanup; store persists across beats */
    };
  }, []);

  return scrollYProgress;
}
