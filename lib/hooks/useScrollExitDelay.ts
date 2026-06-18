"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

type Options = {
  containerRef: RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  threshold: number;
  delayMs?: number;
  enabled?: boolean;
};

/**
 * When scroll progress reaches `threshold`, block downward exit scroll for
 * `delayMs` before allowing the page to scroll into the next section.
 */
export function useScrollExitDelay({
  containerRef,
  scrollYProgress,
  threshold,
  delayMs = 500,
  enabled = true,
}: Options) {
  const progressRef = useRef(0);
  const exitReleasedRef = useRef(false);
  const delayTimerRef = useRef<number | undefined>();
  const touchStartYRef = useRef<number | null>(null);

  const clearDelayTimer = () => {
    if (delayTimerRef.current !== undefined) {
      window.clearTimeout(delayTimerRef.current);
      delayTimerRef.current = undefined;
    }
  };

  const setBlocking = (blocking: boolean) => {
    const el = containerRef.current;
    if (!el) return;

    if (blocking) {
      el.setAttribute("data-lenis-prevent-wheel", "");
    } else {
      el.removeAttribute("data-lenis-prevent-wheel");
    }
  };

  const resetExitGate = () => {
    clearDelayTimer();
    exitReleasedRef.current = false;
    setBlocking(false);
  };

  const releaseExit = () => {
    clearDelayTimer();
    exitReleasedRef.current = true;
    setBlocking(false);
  };

  const startExitDelay = () => {
    if (exitReleasedRef.current || delayTimerRef.current !== undefined) return;

    setBlocking(true);
    delayTimerRef.current = window.setTimeout(() => {
      delayTimerRef.current = undefined;
      releaseExit();
    }, delayMs);
  };

  const isComplete = () => progressRef.current >= threshold;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progressRef.current = value;
    if (value < threshold) {
      resetExitGate();
    }
  });

  useEffect(() => {
    if (!enabled) return;

    const onWheel = (event: WheelEvent) => {
      if (!isComplete()) return;

      if (event.deltaY < 0) {
        resetExitGate();
        return;
      }

      if (event.deltaY <= 0) return;

      if (exitReleasedRef.current) return;

      event.preventDefault();
      event.stopPropagation();
      startExitDelay();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isComplete()) return;

      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY === null || currentY === undefined) return;

      const delta = startY - currentY;

      if (delta < -5) {
        resetExitGate();
        return;
      }

      if (delta <= 5) return;

      if (exitReleasedRef.current) return;

      event.preventDefault();
      startExitDelay();
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, { capture: true });
    window.addEventListener("touchcancel", onTouchEnd, { capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd, { capture: true });
      window.removeEventListener("touchcancel", onTouchEnd, { capture: true });
      clearDelayTimer();
      containerRef.current?.removeAttribute("data-lenis-prevent-wheel");
    };
  }, [containerRef, delayMs, enabled, threshold]);
}
