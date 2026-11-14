"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";
import styles from "./number-ticker.module.css";

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
}

function formatTicker(amount: number, decimalPlaces: number): string {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(Number(amount.toFixed(decimalPlaces)));
}

function cssString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  style,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const settled = direction === "down" ? startValue : value;
  const motionStart = direction === "down" ? value : startValue;
  const settledText = formatTicker(settled, decimalPlaces);
  const motionValue = useMotionValue(motionStart);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    const node = ref.current;
    if (!node || !isInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const unsubscribe = springValue.on("change", (latest) => {
      node.style.setProperty("--ticker-live", cssString(formatTicker(latest, decimalPlaces)));
    });

    const timer = window.setTimeout(() => {
      motionValue.set(settled);
    }, delay * 1000);

    return () => {
      unsubscribe();
      window.clearTimeout(timer);
    };
  }, [decimalPlaces, delay, isInView, motionValue, settled, springValue]);

  return (
    <span
      ref={ref}
      {...props}
      className={cn(styles.root, "tabular-nums tracking-tighter", className)}
      style={
        {
          ...style,
          "--ticker-value": cssString(formatTicker(motionStart, decimalPlaces)),
        } as CSSProperties
      }
    >
      <span className={styles.value}>{settledText}</span>
      <span aria-hidden="true" className={styles.visual} />
    </span>
  );
}
