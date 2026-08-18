"use client";

import { useSyncExternalStore } from "react";

const LG_BREAKPOINT = 1024;

type NavigatorHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

export function hasCoarsePointer(): boolean {
  return window.matchMedia("(any-pointer: coarse)").matches;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Tablets, phones, and low-power machines that should skip heavy GPU work. */
export function isLowPowerDevice(): boolean {
  const n = navigator as NavigatorHints;
  if (n.connection?.saveData) return true;
  if (typeof n.deviceMemory === "number" && n.deviceMemory < 4) return true;
  if (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4) {
    return true;
  }
  if (hasCoarsePointer()) return true;
  if (window.innerWidth < LG_BREAKPOINT) return true;
  return false;
}

export function isConstrainedMotion(): boolean {
  return prefersReducedMotion() || isLowPowerDevice();
}

export function syncPointerDataset(): void {
  document.documentElement.dataset.pointer = hasCoarsePointer() ? "coarse" : "fine";
}

function subscribeConstrainedMotion(onStoreChange: () => void): () => void {
  const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarseMq = window.matchMedia("(any-pointer: coarse)");
  motionMq.addEventListener("change", onStoreChange);
  coarseMq.addEventListener("change", onStoreChange);
  window.addEventListener("resize", onStoreChange);
  return () => {
    motionMq.removeEventListener("change", onStoreChange);
    coarseMq.removeEventListener("change", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
  };
}

function subscribeCoarsePointer(onStoreChange: () => void): () => void {
  const mq = window.matchMedia("(any-pointer: coarse)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

/** SSR-safe. Defaults to constrained so heavy motion stays off until we know. */
export function useConstrainedMotion(): boolean {
  return useSyncExternalStore(subscribeConstrainedMotion, isConstrainedMotion, () => true);
}

/** SSR-safe. Defaults to coarse so pointer parallax stays off until we know. */
export function useCoarsePointer(): boolean {
  return useSyncExternalStore(subscribeCoarsePointer, hasCoarsePointer, () => true);
}
