"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export interface Step {
  n: number;
  title: string;
  body: string;
  deliverable?: string;
}

export function ProcessSteps({ steps, tone = "dark" }: { steps: Step[]; tone?: "dark" | "light" }) {
  const isDark = tone === "dark";
  return (
    <div className="relative">
      {/* connecting line (draws on view) */}
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
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            className="relative flex flex-col gap-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: ease.glide, delay: i * 0.15 }}
          >
            <span
              className={cn(
                "relative z-10 grid h-16 w-16 place-items-center rounded-full font-display text-h4 font-bold text-night-950",
                "bg-gradient-to-br from-genie-200 to-genie-500 shadow-glow-md"
              )}
            >
              {s.n}
            </span>
            <h3 className={cn("font-display text-h4", isDark ? "text-onDark" : "text-ink-900")}>{s.title}</h3>
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
        ))}
      </ol>
    </div>
  );
}
