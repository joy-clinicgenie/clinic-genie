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
import { SparkleRing } from "@/components/ui/SparkleRing";
import { cn } from "@/lib/cn";
import { useScrollExitDelay } from "@/lib/hooks/useScrollExitDelay";
import styles from "./MagicProcess.module.css";

type Point = { x: number; y: number };

export type MagicProcessIntro = {
  kicker: string;
  title: string;
  subtitle?: string;
  highlight?: string;
};

function buildMagicPath(points: Point[]) {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  return path;
}

function pathLayoutMode() {
  if (window.matchMedia("(min-width: 1280px)").matches) return "horizontal";
  if (window.matchMedia("(max-width: 639px)").matches) return "vertical";
  return "free";
}

function alignPathPoints(points: Point[], layout: "horizontal" | "vertical" | "free") {
  if (points.length < 2 || layout === "free") return points;

  if (layout === "horizontal") {
    const y = points.reduce((sum, point) => sum + point.y, 0) / points.length;
    return points.map((point) => ({ x: point.x, y }));
  }

  const x = points.reduce((sum, point) => sum + point.x, 0) / points.length;
  return points.map((point) => ({ x, y: point.y }));
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

  return (
    <SparkleRing
      size="md"
      ambient={false}
      active={active && !reduced}
      glow
      intensifyOnHover
      coreRef={circleRef}
      coreClassName={cn(
        styles.numberCircle,
        "grid h-16 w-16 place-items-center rounded-full border border-[#9CC8D2]/80 bg-white/75 font-display text-h4 text-ink-900 backdrop-blur-glass-light"
      )}
    >
      {n}
    </SparkleRing>
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
    <article className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <MagicNumber n={step.n} active={active} circleRef={circleRef} />
      <motion.div
        className="flex flex-col gap-2"
        style={reduced ? undefined : { opacity, y }}
      >
        <h3 className={cn("font-display text-h4", dark ? "text-white" : "text-ink-900")}>{step.title}</h3>
        <p
          className={cn(
            "mx-auto max-w-full text-sm leading-relaxed text-pretty sm:max-w-[75%]",
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
      </motion.div>
    </article>
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
  const [lineAxis, setLineAxis] = useState({ x1: 0, y1: 0, x2: 1, y2: 0 });
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

  useScrollExitDelay({
    containerRef: sectionRef,
    scrollYProgress,
    threshold: ctaRevealEnd,
    delayMs: 500,
    enabled: !reduced,
  });

  const measurePath = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

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

    const aligned = alignPathPoints(points, pathLayoutMode());
    const first = aligned[0];
    const last = aligned[aligned.length - 1];
    setLineAxis({ x1: first.x, y1: first.y, x2: last.x, y2: last.y });
    setPathD(buildMagicPath(aligned));

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
              <linearGradient
                id="magic-process-line"
                gradientUnits="userSpaceOnUse"
                x1={lineAxis.x1}
                y1={lineAxis.y1}
                x2={lineAxis.x2}
                y2={lineAxis.y2}
              >
                <stop offset="0%" stopColor="#78E2DD" stopOpacity="0" />
                <stop offset="7%" stopColor="#78E2DD" stopOpacity="0.35" />
                <stop offset="16%" stopColor="#CCF4F6" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#EAFBFB" stopOpacity="1" />
                <stop offset="84%" stopColor="#CCF4F6" stopOpacity="0.9" />
                <stop offset="93%" stopColor="#78E2DD" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#78E2DD" stopOpacity="0" />
              </linearGradient>

              <filter id="magic-process-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {pathD && (
              <>
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#magic-process-line)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#magic-process-glow)"
                  strokeDasharray={pathLength}
                  style={{
                    strokeDashoffset: reduced ? 0 : dashOffset,
                    opacity: 0.55,
                  }}
                />
                <motion.path
                  ref={pathRef}
                  d={pathD}
                  fill="none"
                  stroke="url(#magic-process-line)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.lineGlow}
                  strokeDasharray={pathLength}
                  style={{
                    strokeDashoffset: reduced ? 0 : dashOffset,
                  }}
                />
              </>
            )}
          </motion.svg>

          <div className={cn("relative grid grid-cols-1 items-start gap-8 sm:grid-cols-2 xl:grid-cols-5 xl:gap-4", styles.stepsGrid)}>
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
              Make Your First Wish
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
