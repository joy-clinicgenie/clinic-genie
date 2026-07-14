"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type LinkPreviewProps = {
  children: ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  isStatic: true;
  preview: ReactNode;
  "aria-label"?: string;
};

export function LinkPreview({
  children,
  url,
  className,
  width = 280,
  height = 140,
  preview,
  "aria-label": ariaLabel,
}: LinkPreviewProps) {
  const [isOpen, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    if (prefersReducedMotion) return;
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  }

  return (
    <HoverCardPrimitive.Root
      openDelay={50}
      closeDelay={100}
      onOpenChange={(open) => {
        if (prefersReducedMotion) {
          setOpen(false);
          return;
        }
        setOpen(open);
      }}
    >
      <HoverCardPrimitive.Trigger asChild>
        <a
          href={url}
          onMouseMove={handleMouseMove}
          aria-label={ariaLabel}
          className={cn("text-inherit no-underline", className)}
        >
          {children}
        </a>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        className="z-50 [transform-origin:var(--radix-hover-card-content-transform-origin)]"
        side="top"
        align="center"
        sideOffset={10}
      >
        <AnimatePresence>
          {isOpen && !prefersReducedMotion ? (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.22, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                y: 6,
                scale: 0.97,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              className="overflow-hidden rounded-xl shadow-xl"
              style={{ x: translateX }}
            >
              <div
                className="block overflow-hidden rounded-xl border border-white/15 bg-night-800 p-1 shadow-lg"
                style={{ width, height }}
              >
                <div className="h-full w-full overflow-hidden rounded-lg [&>svg]:h-full [&>svg]:w-full">
                  {preview}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
}
