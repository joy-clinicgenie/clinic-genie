import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Kicker({
  children,
  as: Tag = "span",
  tone = "dark",
  className,
}: {
  children: ReactNode;
  as?: "span" | "p";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2 font-display text-kicker uppercase",
        tone === "dark" ? "text-genie-300" : "text-genie-700",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          tone === "dark" ? "bg-genie-400 shadow-glow-sm" : "bg-genie-600"
        )}
        aria-hidden="true"
      />
      {children}
    </Tag>
  );
}
