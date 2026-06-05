"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { ease } from "@/lib/motion";

const VARIANTS: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  mask: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  },
};

const MotionTag = motion.div;

export function Reveal({
  variant = "up",
  delay = 0,
  once = true,
  as,
  className,
  children,
}: {
  variant?: "up" | "scale" | "mask";
  delay?: number;
  once?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const Comp = as ? motion(as) : MotionTag;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      variants={VARIANTS[variant]}
      transition={{ duration: 0.7, ease: ease.glide, delay }}
    >
      {children}
    </Comp>
  );
}

/** Stagger container — children should be <RevealItem> or motion elements. */
export function RevealGroup({
  className,
  children,
  stagger = 0.08,
  once = true,
}: {
  className?: string;
  children: ReactNode;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  className,
  children,
  as,
}: {
  className?: string;
  children: ReactNode;
  as?: ElementType;
}) {
  const Comp = as ? motion(as) : MotionTag;
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.glide } },
      }}
    >
      {children}
    </Comp>
  );
}
