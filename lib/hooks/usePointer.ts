"use client";

import { useEffect } from "react";
import { motionValue, type MotionValue } from "framer-motion";

/**
 * One global pointer source for the whole app. Components subscribe to these
 * MotionValues instead of attaching their own window listeners.
 *  - mx / my : normalized -1..1 (centered)
 *  - px / py : raw client pixels
 */
export const pointer = {
  mx: motionValue(0),
  my: motionValue(0),
  px: motionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0),
  py: motionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0),
};

let started = false;

export function startPointerTracking() {
  if (started || typeof window === "undefined") return;
  started = true;

  const onMove = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    pointer.px.set(e.clientX);
    pointer.py.set(e.clientY);
    pointer.mx.set((e.clientX / w) * 2 - 1);
    pointer.my.set((e.clientY / h) * 2 - 1);
  };

  window.addEventListener("pointermove", onMove, { passive: true });

  // Device tilt (mobile) maps onto the same values. iOS 13+ requires a
  // gesture-gated permission (DeviceOrientationEvent.requestPermission), so we
  // only attach automatically where no permission is required (e.g. Android).
  const onTilt = (e: DeviceOrientationEvent) => {
    if (e.gamma == null || e.beta == null) return;
    pointer.mx.set(Math.max(-1, Math.min(1, e.gamma / 35)));
    pointer.my.set(Math.max(-1, Math.min(1, (e.beta - 45) / 35)));
  };
  const DOE = (window as unknown as { DeviceOrientationEvent?: { requestPermission?: unknown } }).DeviceOrientationEvent;
  if (DOE && typeof DOE.requestPermission !== "function") {
    window.addEventListener("deviceorientation", onTilt, { passive: true });
  }
}

/** Convenience hook: ensure tracking is running and return the shared values. */
export function usePointer(): {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
} {
  useEffect(() => {
    startPointerTracking();
  }, []);
  return pointer;
}
