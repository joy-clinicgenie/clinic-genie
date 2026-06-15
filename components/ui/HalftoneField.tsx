"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Subtle interactive halftone field — a grid of small dots whose size and
 * opacity ripple outward from the pointer like quiet magical waves. The canvas
 * is pointer-events-none and sits behind section content; hover is tracked on
 * the parent element. Paused offscreen / when the tab is hidden, and disabled
 * entirely under prefers-reduced-motion or on coarse pointers.
 */
export function HalftoneField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const host = canvas.parentElement ?? canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const GAP = 26; // grid spacing (CSS px)
    const DOT_MIN = 0.5; // resting dot radius
    const DOT_MAX = 2.6; // peak dot radius under the wave
    const REACH = 280; // pointer influence radius
    const WAVELENGTH = 92; // distance between ripple crests
    const SPEED = 0.05; // ripple travel speed

    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer (canvas-relative) with smoothing + a presence value that fades
    // in on enter and out on leave so the waves settle gracefully.
    let px = -9999;
    let py = -9999;
    let cx = -9999;
    let cy = -9999;
    let strength = 0;
    let targetStrength = 0;

    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };
    const onMove = (e: PointerEvent) => {
      toLocal(e);
      targetStrength = 1;
    };
    const onEnter = (e: PointerEvent) => {
      toLocal(e);
      cx = px;
      cy = py;
      targetStrength = 1;
    };
    const onLeave = () => {
      targetStrength = 0;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let running = true;
    let t = 0;

    const draw = () => {
      if (!running) return;
      t += 1;
      strength += (targetStrength - strength) * 0.06;
      cx += (px - cx) * 0.12;
      cy += (py - cy) * 0.12;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GAP;
          const y = j * GAP;

          // Faint ambient shimmer so the grid is alive but quiet at rest.
          const ambient = 0.5 + 0.5 * Math.sin((x + y) * 0.015 - t * 0.012);
          let amp = ambient * 0.16;

          if (strength > 0.001) {
            const dx = x - cx;
            const dy = y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < REACH) {
              const falloff = 1 - dist / REACH;
              const ripple = 0.5 + 0.5 * Math.sin((dist / WAVELENGTH) * Math.PI * 2 - t * SPEED);
              amp += ripple * falloff * falloff * strength;
            }
          }

          const a = Math.min(1, amp);
          const radius = DOT_MIN + (DOT_MAX - DOT_MIN) * a;
          const alpha = 0.05 + 0.42 * a;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 226, 221, ${alpha})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden;
        if (running && !raf) raf = requestAnimationFrame(draw);
        else if (!running) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => {
      running = !document.hidden;
      if (running && !raf) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
