"use client";

import { create } from "zustand";

export type OrbMood = "idle" | "curious" | "thinking" | "focus" | "celebrate";
export type OrbVariant = "home" | "about" | "services" | "portfolio" | "blog" | "contact";
export type OrbRenderer = "pending" | "webgl" | "canvas2d" | "css" | "static";

export interface OrbState {
  mood: OrbMood;
  variant: OrbVariant;
  anchorId: string | null; // current data-orb-anchor target
  scale: number; // 0..1.2 target multiplier
  intensity: number; // 0..1 glow/bloom energy target
  renderer: OrbRenderer;
  isThinking: boolean;
  /** monotonic counters consumed by the renderer to trigger one-shot effects */
  pulseToken: number;
  burstToken: number;
  visible: boolean;
  setScene: (p: Partial<OrbState>) => void;
  pulse: () => void;
  burst: () => void;
}

export const useOrbStore = create<OrbState>((set) => ({
  mood: "idle",
  variant: "home",
  anchorId: "orb-anchor-hero",
  scale: 1,
  intensity: 0.7,
  renderer: "pending",
  isThinking: false,
  pulseToken: 0,
  burstToken: 0,
  visible: true,
  setScene: (p) => set((s) => ({ ...s, ...p })),
  pulse: () => set((s) => ({ pulseToken: s.pulseToken + 1 })),
  burst: () => set((s) => ({ burstToken: s.burstToken + 1, mood: "celebrate" })),
}));

export interface SceneInput {
  mood?: OrbMood;
  anchor?: string | null;
  variant?: OrbVariant;
  scale?: number;
  intensity?: number;
}

/**
 * Imperatively push a scene into the orb store. Call inside an effect on mount
 * and on scroll milestones. Returns nothing — the orb reads the store.
 */
export function useOrbScene() {
  const setScene = useOrbStore((s) => s.setScene);
  return (input: SceneInput) => {
    const next: Partial<OrbState> = {};
    if (input.mood !== undefined) next.mood = input.mood;
    if (input.anchor !== undefined) next.anchorId = input.anchor;
    if (input.variant !== undefined) next.variant = input.variant;
    if (input.scale !== undefined) next.scale = input.scale;
    if (input.intensity !== undefined) next.intensity = input.intensity;
    setScene(next);
  };
}
