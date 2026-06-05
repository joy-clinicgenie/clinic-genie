import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const TONE: Record<string, string> = {
  dark: "glass text-onDark",
  tint: "glass-tint text-onDark",
  light: "glass-light text-ink-900",
};

const RADIUS: Record<string, string> = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export function GlassCard({
  tone = "dark",
  radius = "xl",
  hover = false,
  glow = false,
  className,
  children,
}: {
  tone?: "dark" | "light" | "tint";
  radius?: "lg" | "xl" | "2xl";
  hover?: boolean;
  glow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        TONE[tone],
        RADIUS[radius],
        glow && "shadow-glow-md",
        hover &&
          "transition-[transform,box-shadow] duration-ui ease-out-soft hover:-translate-y-1.5 hover:shadow-glow-md motion-reduce:hover:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
