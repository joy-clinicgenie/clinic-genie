import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Kicker({
  children,
  as: Tag = "span",
  tone = "light",
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
        "inline-flex w-fit items-center rounded-pill border bg-transparent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider",
        tone === "dark"
          ? "border-genie-400 text-genie-300"
          : "border-genie-600 text-genie-700",
        className
      )}
    >
      {children}
    </Tag>
  );
}
