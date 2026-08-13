import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SparkleCluster } from "@/components/ui/SparkleCluster";

/**
 * Editorial section label.
 * Sparkle + uppercase teal metadata, on both mobile and desktop.
 */
export function SectionEyebrow({
  children,
  tone = "light",
  sparkle = true,
  index,
  align = "left",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  sparkle?: boolean;
  /** Optional index marker such as "01". */
  index?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-2 font-sans text-kicker font-semibold uppercase tracking-widest",
        onDark ? "text-genie-300" : "text-genie-700",
        align === "center" && "mx-auto",
        className
      )}
    >
      {index ? (
        <span className="font-mono text-[0.65em] tracking-wider opacity-70" aria-hidden="true">
          {index}
        </span>
      ) : sparkle ? (
        <span className="inline-flex" aria-hidden="true">
          <SparkleCluster size="sm" className={onDark ? "text-genie-300" : "text-genie-600"} />
        </span>
      ) : null}
      {children}
    </p>
  );
}
