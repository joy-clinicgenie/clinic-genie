"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ProcessStep } from "@/lib/data/services";
import { LandingIntro } from "@/components/home/landing/LandingLayout";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import styles from "./MagicProcess.module.css";

type Point = { x: number; y: number };

export type MagicProcessIntro = {
  kicker: string;
  title: string;
  subtitle?: string;
  highlight?: string;
};

const GRAIN_DOTS = [
  { radius: 36, size: 3, kind: "dot" as const, angle: 0 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 36 },
  { radius: 36, size: 2.5, kind: "dot" as const, angle: 72 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 108 },
  { radius: 36, size: 3, kind: "dot" as const, angle: 144 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 180 },
  { radius: 36, size: 2.5, kind: "dot" as const, angle: 216 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 252 },
  { radius: 36, size: 3, kind: "dot" as const, angle: 288 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 324 },
  { radius: 42, size: 2, kind: "speck" as const, angle: 18 },
  { radius: 42, size: 2.5, kind: "dot" as const, angle: 90 },
  { radius: 42, size: 2, kind: "speck" as const, angle: 162 },
  { radius: 42, size: 2.5, kind: "dot" as const, angle: 234 },
  { radius: 42, size: 2, kind: "speck" as const, angle: 306 },
];

function buildMagicPath(points: Point[], vertical: boolean) {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
    const ctrl = vertical
      ? { x: mid.x + 28, y: mid.y }
      : { x: mid.x, y: mid.y - 22 };
    path += ` Q ${ctrl.x} ${ctrl.y} ${p1.x} ${p1.y}`;
  }
  return path;
}

function stepThresholds(count: number, index: number) {
  if (index === 0) {
    return { start: 0, end: 0, activeAt: 0 };
  }

  const revealCount = count - 1;
  const lead = 0.1;
  const tail = 0.08;
  const span = (1 - lead - tail) / revealCount;
  const revealIndex = index - 1;
  const start = lead + revealIndex * span;
  const end = start + span * 0.72;
  return { start, end, activeAt: start + span * 0.2 };
}

function MagicNumber({
  n,
  active,
  circleRef,
}: {
  n: number;
  active: boolean;
  circleRef?: (el: HTMLSpanElement | null) => void;
}) {
  const reduced = useReducedMotion();
  const grainsActive = active && !reduced;

  return (
    <div className={styles.grainRing}>
      {!reduced && (
        <>
          <div className={cn(styles.grainOrbit, grainsActive && styles.grainOrbitSlow)}>
            {GRAIN_DOTS.slice(0, 10).map((grain) => (
              <span
                key={`a-${grain.angle}`}
                className={cn(styles.grain, grain.kind === "dot" ? styles.grainDot : styles.grainSpeck)}
                style={{
                  width: grain.size,
                  height: grain.size,
                  transform: `rotate(${grain.angle}deg) translate(${grain.radius}px, -50%)`,
                }}
              />
            ))}
          </div>
          <div className={cn(styles.grainOrbit, grainsActive && styles.grainOrbitFast)}>
            {GRAIN_DOTS.slice(10).map((grain) => (
              <span
                key={`b-${grain.angle}`}
                className={cn(styles.grain, grain.kind === "dot" ? styles.grainDot : styles.grainSpeck)}
                style={{
                  width: grain.size,
                  height: grain.size,
                  transform: `rotate(${grain.angle}deg) translate(${grain.radius}px, -50%)`,
                }}
              />
            ))}
          </div>
        </>
      )}
      <span
        ref={circleRef}
        className={cn(
          styles.numberCircle,
          "relative z-10 grid h-16 w-16 place-items-center rounded-full border border-[#9CC8D2]/80 bg-white/75 font-display text-h4 text-ink-900 backdrop-blur-glass-light"
        )}
      >
        {n}
      </span>
    </div>
  );
}

function ProcessCard({
  step,
  active,
  circleRef,
  progress,
  index,
  total,
  dark = false,
  className,
}: {
  step: ProcessStep;
  active: boolean;
  circleRef: (el: HTMLSpanElement | null) => void;
  progress: MotionValue<number>;
  index: number;
  total: number;
  dark?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { start, end } = stepThresholds(total, index);
  const isFirst = index === 0;
  const opacity = useTransform(progress, isFirst ? [0, 1] : [start, end], isFirst ? [1, 1] : [0, 1]);
  const y = useTransform(progress, isFirst ? [0, 1] : [start, end], isFirst ? [0, 0] : [24, 0]);

  return (
    <motion.article
      className={cn("flex flex-col items-center gap-4 text-center", className)}
      style={reduced ? undefined : { opacity, y }}
    >
      <MagicNumber n={step.n} active={active} circleRef={circleRef} />
      <div className="flex flex-col gap-2">
        <h3 className={cn("font-display text-h4", dark ? "text-white" : "text-ink-900")}>{step.title}</h3>
        <p
          className={cn(
            "mx-auto max-w-[75%] text-sm leading-relaxed text-pretty",
            dark ? "text-[#C9E4EA]" : "text-[#7E8C92]"
          )}
        >
          {step.body}
        </p>
        {step.deliverable && (
          <div className={cn("mt-2 w-full rounded-xl p-5 text-left", dark ? "glass" : "glass-light")}>
            <p className={cn("text-sm font-semibold", dark ? "text-white" : "text-ink-900")}>Deliverable</p>
            <p className={cn("mt-1 text-sm", dark ? "text-[#C9E4EA]" : "text-[#7E8C92]")}>{step.deliverable}</p>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function MagicProcess({
  steps,
  intro,
  dark = false,
}: {
  steps: ProcessStep[];
  intro?: MagicProcessIntro;
  dark?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const reduced = useReducedMotion();
  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(1);
  const [activeSteps, setActiveSteps] = useState(() => steps.map((_, index) => index === 0));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const lineReveal = useTransform(progress, [0.08, 0.18], [0, 1]);
  const lineDraw = useTransform(progress, [0.1, 0.9], [0, 1]);
  const dashOffset = useTransform(lineDraw, (v) => pathLength * (1 - v));

  const lastStepReveal = stepThresholds(steps.length, steps.length - 1);
  const ctaRevealEnd = Math.min(lastStepReveal.end + 0.08, 0.98);
  const ctaOpacity = useTransform(progress, [lastStepReveal.end, ctaRevealEnd], [0, 1]);
  const ctaY = useTransform(progress, [lastStepReveal.end, ctaRevealEnd], [20, 0]);

  const measurePath = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const isVertical = window.matchMedia("(max-width: 1023px)").matches;
    const svgRect = svg.getBoundingClientRect();
    const points = circleRefs.current
      .slice(0, steps.length)
      .map((el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - svgRect.left,
          y: rect.top + rect.height / 2 - svgRect.top,
        };
      })
      .filter((point): point is Point => point !== null);

    if (points.length < 2) return;

    setPathD(buildMagicPath(points, isVertical));

    requestAnimationFrame(() => {
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength() || 1);
      }
    });
  }, [steps.length]);

  useLayoutEffect(() => {
    measurePath();
  }, [measurePath]);

  useEffect(() => {
    const id = requestAnimationFrame(() => measurePath());
    return () => cancelAnimationFrame(id);
  }, [measurePath, pathD]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(measurePath);
    observer.observe(stage);
    window.addEventListener("resize", measurePath);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measurePath);
    };
  }, [measurePath]);

  useMotionValueEvent(progress, "change", (value) => {
    if (reduced) {
      setActiveSteps(steps.map(() => true));
      return;
    }
    setActiveSteps(
      steps.map((_, index) => index === 0 || value >= stepThresholds(steps.length, index).activeAt)
    );
  });

  return (
    <div
      ref={sectionRef}
      className={cn(styles.section, dark && styles.sectionDark)}
      style={{ minHeight: reduced ? undefined : `${steps.length * 100}vh` }}
    >
      <div ref={stageRef} className={styles.sticky}>
        <div className={styles.stickyInner}>
          {intro && (
            <div className={cn("relative z-10", styles.introBlock)}>
              <LandingIntro
                light={dark}
                kicker={intro.kicker}
                title={intro.title}
                highlight={intro.highlight}
                subtitle={intro.subtitle}
              />
            </div>
          )}

          <motion.svg
            ref={svgRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            style={{ opacity: reduced ? 1 : lineReveal }}
          >
            <defs>
              <linearGradient id="magic-process-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#54B9CE" />
                <stop offset="55%" stopColor="#217B8E" />
                <stop offset="100%" stopColor="#9CC8D2" />
              </linearGradient>
            </defs>
            {pathD && (
              <motion.path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="url(#magic-process-line)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={styles.lineGlow}
                strokeDasharray={pathLength}
                style={{
                  strokeDashoffset: reduced ? 0 : dashOffset,
                }}
              />
            )}
          </motion.svg>

          <div className={cn("relative grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-5 xl:gap-4", styles.stepsGrid)}>
            {steps.map((step, index) => (
              <ProcessCard
                key={step.n}
                step={step}
                active={activeSteps[index] ?? false}
                progress={progress}
                index={index}
                total={steps.length}
                dark={dark}
                circleRef={(el) => {
                  circleRefs.current[index] = el;
                }}
              />
            ))}
          </div>

          <motion.div
            className={cn("relative z-10 flex justify-center", styles.ctaBlock)}
            style={reduced ? undefined : { opacity: ctaOpacity, y: ctaY }}
          >
            <MagneticButton href="/contact" size="lg" withMiniOrb tone="dark">
              Start the Magic
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
