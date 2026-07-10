import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Elevated white shell for light sections. */
const LIGHT_SHELL =
  "bg-white text-ink-900 border border-[#E6EEF1] shadow-card";

/** Frosted glass shell for dark sections. */
const DARK_SHELL = "glass text-onDark";
const TINT_SHELL = "glass-tint text-onDark";

const RADIUS: Record<string, string> = {
  lg: "rounded-2xl",
  xl: "rounded-2xl",
  "2xl": "rounded-2xl",
};

const TONE: Record<"dark" | "light" | "tint", string> = {
  dark: DARK_SHELL,
  light: LIGHT_SHELL,
  tint: TINT_SHELL,
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
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        TONE[tone],
        RADIUS[radius],
        glow && (isLight ? "shadow-lg" : "shadow-glow-md"),
        hover &&
          (isLight
            ? "transition-[transform,box-shadow] duration-ui ease-out-soft hover:-translate-y-1.5 hover:shadow-lg motion-reduce:hover:translate-y-0"
            : "transition-[transform,box-shadow] duration-ui ease-out-soft hover:-translate-y-1.5 hover:shadow-glow-md motion-reduce:hover:translate-y-0"),
        className
      )}
    >
      {children}
    </div>
  );
}
