"use client";

import { useEffect, useRef } from "react";
import { pointer, startPointerTracking } from "@/lib/hooks/usePointer";
import type { OrbVariant } from "./store";

interface Blob {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  hue: string;
}

// Official Clinic Genie palette
const PALETTE = ["#18C4D9", "#78E2DD", "#7DAFE3", "#CCF4F6"];

/**
 * Canvas2D additive plasma orb. Lighter than WebGL but still alive — used on
 * low-power / no-WebGL devices. Paused when offscreen or tab hidden.
 */
export function OrbCanvas2D({ variant = "home" }: { variant?: OrbVariant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startPointerTracking();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr);
      canvas.height = Math.max(1, r.height * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const blobCount = variant === "blog" || variant === "portfolio" ? 5 : 7;
    const blobs: Blob[] = Array.from({ length: blobCount }, (_, i) => ({
      angle: (i / blobCount) * Math.PI * 2,
      radius: 0.12 + (i % 3) * 0.07,
      speed: 0.0018 + (i % 4) * 0.0009,
      size: 0.34 + (i % 3) * 0.1,
      hue: PALETTE[i % PALETTE.length],
    }));

    const draw = () => {
      if (!running) return;
      t += 1;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) / 2;
      ctx.clearRect(0, 0, w, h);

      // base sphere
      const base = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.25, R * 0.1, cx, cy, R);
      base.addColorStop(0, "#EAFBFB");
      base.addColorStop(0.35, "#18C4D9");
      base.addColorStop(0.8, "#0E5F6B");
      base.addColorStop(1, "rgba(6,45,54,0)");
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = base;
      ctx.fill();

      // plasma blobs (additive)
      ctx.globalCompositeOperation = "screen";
      const lean = pointer.mx.get() * R * 0.12;
      const leanY = pointer.my.get() * R * 0.12;
      for (const b of blobs) {
        b.angle += b.speed;
        const bx = cx + lean + Math.cos(b.angle) * R * b.radius;
        const by = cy + leanY + Math.sin(b.angle * 1.3) * R * b.radius;
        const br = R * b.size;
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        g.addColorStop(0, b.hue);
        g.addColorStop(1, "rgba(108,186,217,0)");
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // bright core breathe
      const pulse = 0.5 + Math.sin(t * 0.03) * 0.5;
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.4);
      core.addColorStop(0, `rgba(234,248,254,${0.55 + pulse * 0.4})`);
      core.addColorStop(1, "rgba(108,186,217,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden;
        if (running && !raf) raf = requestAnimationFrame(draw);
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
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
