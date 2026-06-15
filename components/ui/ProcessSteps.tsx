"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export interface Step {
  n: number;
  title: string;
  body: string;
  deliverable?: string;
}

/* ─── Per-step visuals ──────────────────────────────────────────────────────── */

function IconResearch() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.5 17.5L24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconBuild() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="22" height="15" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M9 23h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 20v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 10l2.5 2.5L8 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconResults() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M4 20l5.5-6 4.5 3.5 6-9L24 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="21" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20.3 21.7l.7-.7 1 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Hover preview illustrations ───────────────────────────────────────────── */

function PreviewResearch() {
  return (
    <svg viewBox="0 0 220 130" fill="none" aria-hidden="true" className="h-full w-full">
      <rect width="220" height="130" rx="10" fill="url(#pr-bg)" />
      <defs>
        <linearGradient id="pr-bg" x1="0" y1="0" x2="220" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B3D47" />
          <stop offset="1" stopColor="#062833" />
        </linearGradient>
      </defs>
      {/* bar chart */}
      <rect x="20" y="80" width="16" height="32" rx="3" fill="#18C4D9" opacity="0.7" />
      <rect x="42" y="62" width="16" height="50" rx="3" fill="#18C4D9" opacity="0.85" />
      <rect x="64" y="50" width="16" height="62" rx="3" fill="#78E2DD" />
      <rect x="86" y="68" width="16" height="44" rx="3" fill="#18C4D9" opacity="0.7" />
      {/* magnifying glass */}
      <circle cx="162" cy="55" r="26" stroke="#78E2DD" strokeWidth="3" />
      <circle cx="162" cy="55" r="18" fill="#0E5F6B" opacity="0.6" />
      <path d="M174 67l12 12" stroke="#78E2DD" strokeWidth="3.5" strokeLinecap="round" />
      {/* cross-hairs inside lens */}
      <path d="M155 55h14M162 48v14" stroke="#CCF4F6" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      {/* data dots on chart */}
      <circle cx="28" cy="76" r="3" fill="#CCF4F6" />
      <circle cx="50" cy="58" r="3" fill="#CCF4F6" />
      <circle cx="72" cy="46" r="3" fill="#CCF4F6" />
      <circle cx="94" cy="64" r="3" fill="#CCF4F6" />
      <path d="M28 76l22-18 22-12 22 18" stroke="#CCF4F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2" opacity="0.6" />
      {/* label */}
      <text x="20" y="18" fontFamily="monospace" fontSize="8" fill="#78E2DD" opacity="0.7" letterSpacing="2">RESEARCH</text>
    </svg>
  );
}

function PreviewBuild() {
  return (
    <svg viewBox="0 0 220 130" fill="none" aria-hidden="true" className="h-full w-full">
      <rect width="220" height="130" rx="10" fill="url(#pb-bg)" />
      <defs>
        <linearGradient id="pb-bg" x1="0" y1="0" x2="220" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B3D47" />
          <stop offset="1" stopColor="#1A1040" />
        </linearGradient>
      </defs>
      {/* browser window */}
      <rect x="20" y="22" width="140" height="92" rx="6" fill="#0D2D35" stroke="#78E2DD" strokeWidth="1.5" />
      {/* toolbar */}
      <rect x="20" y="22" width="140" height="20" rx="6" fill="#0E3D4A" />
      <circle cx="34" cy="32" r="4" fill="#FF6B6B" opacity="0.8" />
      <circle cx="47" cy="32" r="4" fill="#FFD93D" opacity="0.8" />
      <circle cx="60" cy="32" r="4" fill="#6BCB77" opacity="0.8" />
      {/* address bar */}
      <rect x="72" y="26" width="76" height="12" rx="3" fill="#0A2730" stroke="#18C4D9" strokeWidth="0.8" opacity="0.6" />
      {/* page content skeleton */}
      <rect x="30" y="52" width="80" height="7" rx="2" fill="#18C4D9" opacity="0.5" />
      <rect x="30" y="65" width="60" height="5" rx="2" fill="#78E2DD" opacity="0.3" />
      <rect x="30" y="76" width="70" height="5" rx="2" fill="#78E2DD" opacity="0.25" />
      <rect x="30" y="87" width="50" height="5" rx="2" fill="#78E2DD" opacity="0.2" />
      {/* image placeholder */}
      <rect x="118" y="52" width="32" height="28" rx="3" fill="#0A2730" stroke="#18C4D9" strokeWidth="0.8" opacity="0.5" />
      <path d="M122 74l8-8 4 4 4-6 8 10" stroke="#18C4D9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* cursor / pen tool outside */}
      <g transform="translate(170 48)">
        <path d="M0 0l4 18 5-6 7 7 4-4-7-7 6-5z" fill="#CCF4F6" stroke="#78E2DD" strokeWidth="1" strokeLinejoin="round" />
      </g>
      <text x="20" y="18" fontFamily="monospace" fontSize="8" fill="#78E2DD" opacity="0.7" letterSpacing="2">DESIGN & BUILD</text>
    </svg>
  );
}

function PreviewResults() {
  return (
    <svg viewBox="0 0 220 130" fill="none" aria-hidden="true" className="h-full w-full">
      <rect width="220" height="130" rx="10" fill="url(#prr-bg)" />
      <defs>
        <linearGradient id="prr-bg" x1="0" y1="0" x2="220" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B3D47" />
          <stop offset="1" stopColor="#062833" />
        </linearGradient>
        <linearGradient id="prr-line" x1="20" y1="90" x2="180" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#18C4D9" />
          <stop offset="1" stopColor="#78E2DD" />
        </linearGradient>
      </defs>
      {/* grid lines */}
      {[30, 55, 80, 105].map((y) => (
        <path key={y} d={`M20 ${y}h180`} stroke="#78E2DD" strokeWidth="0.5" opacity="0.12" />
      ))}
      {/* area fill under trend */}
      <path d="M20 90 30 82 55 74 85 60 115 48 150 38 180 26 180 110 20 110z" fill="#18C4D9" opacity="0.1" />
      {/* trend line */}
      <path d="M20 90 30 82 55 74 85 60 115 48 150 38 180 26" stroke="url(#prr-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* data points */}
      {[[20,90],[55,74],[115,48],[180,26]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#78E2DD" stroke="#0B3D47" strokeWidth="1.5" />
      ))}
      {/* rising arrow badge */}
      <rect x="158" y="12" width="46" height="22" rx="5" fill="#18C4D9" opacity="0.15" stroke="#18C4D9" strokeWidth="1" />
      <path d="M168 27l4-8 4 8" stroke="#78E2DD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="178" y="26" fontFamily="sans-serif" fontSize="9" fill="#CCF4F6" fontWeight="bold">+3.4×</text>
      {/* sparkles */}
      <path d="M15 20 l1.5 4 1.5-4-4 1.5 4 1.5z" fill="#CCF4F6" opacity="0.7" />
      <path d="M195 95 l1 2.5 1-2.5-2.5 1 2.5 1z" fill="#78E2DD" opacity="0.6" />
      <text x="20" y="18" fontFamily="monospace" fontSize="8" fill="#78E2DD" opacity="0.7" letterSpacing="2">RESULTS</text>
    </svg>
  );
}

const STEP_VISUALS: Record<number, { icon: React.ReactNode; preview: React.ReactNode }> = {
  1: { icon: <IconResearch />, preview: <PreviewResearch /> },
  2: { icon: <IconBuild />, preview: <PreviewBuild /> },
  3: { icon: <IconResults />, preview: <PreviewResults /> },
};

/* ─── Component ─────────────────────────────────────────────────────────────── */

export function ProcessSteps({ steps, tone = "dark" }: { steps: Step[]; tone?: "dark" | "light" }) {
  const isDark = tone === "dark";
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* connecting line */}
      <motion.div
        aria-hidden="true"
        className="absolute left-8 top-10 hidden w-px origin-top bg-gradient-to-b from-genie-500 via-genie-400 to-spark-violet md:left-0 md:top-10 md:h-px md:w-full md:origin-left md:bg-gradient-to-r md:block"
        initial={{ scaleX: 0, scaleY: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 1.1, ease: ease.glide }}
        style={{ boxShadow: "0 0 12px rgba(108,186,217,0.6)" }}
      />
      <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((s, i) => {
          const visuals = STEP_VISUALS[s.n];
          const isHovered = hoveredStep === s.n;
          return (
            <motion.li
              key={s.n}
              className="relative flex flex-col gap-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: ease.glide, delay: i * 0.15 }}
            >
              {/* hover preview card — floats above the step */}
              <AnimatePresence>
                {isHovered && visuals && (
                  <motion.div
                    className="pointer-events-none absolute -top-4 left-0 z-30 w-[220px] overflow-hidden rounded-xl shadow-2xl"
                    style={{ translateY: "-100%" }}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="h-[130px] w-[220px]">{visuals.preview}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* number circle with icon */}
              <div className="relative h-16 w-16">
                <span
                  className={cn(
                    "relative z-10 grid h-16 w-16 place-items-center rounded-full font-display text-h4 font-bold text-night-950",
                    "bg-gradient-to-br from-genie-200 to-genie-500 shadow-glow-md"
                  )}
                >
                  {visuals ? (
                    <span className="flex flex-col items-center leading-none">
                      <span className="text-night-900 opacity-80">{visuals.icon}</span>
                    </span>
                  ) : (
                    s.n
                  )}
                </span>
                {/* step number badge */}
                <span className="absolute -bottom-1 -right-1 z-20 grid h-5 w-5 place-items-center rounded-full bg-genie-600 text-[10px] font-bold text-white shadow">
                  {s.n}
                </span>
              </div>

              {/* title — hover triggers preview */}
              <h3
                className={cn(
                  "cursor-default font-display text-h4 transition-colors duration-150",
                  isDark ? "text-onDark" : "text-ink-900",
                  isHovered && "text-genie-300"
                )}
                onMouseEnter={() => setHoveredStep(s.n)}
                onMouseLeave={() => setHoveredStep(null)}
                onFocus={() => setHoveredStep(s.n)}
                onBlur={() => setHoveredStep(null)}
              >
                {s.title}
              </h3>

              <p className={cn("text-sm leading-relaxed", isDark ? "text-onDark-muted" : "text-ink-700")}>{s.body}</p>
              {s.deliverable && (
                <p className={cn("mt-1 flex flex-col gap-0.5 text-sm", isDark ? "text-genie-300" : "text-genie-700")}>
                  <span className={cn("font-mono text-xs uppercase tracking-wider", isDark ? "text-genie-400" : "text-genie-700")}>
                    Deliverable
                  </span>
                  {s.deliverable}
                </p>
              )}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
