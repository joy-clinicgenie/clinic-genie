import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Section wrapper with the two registers:
 *  - "dark"  = conjuring register (transparent over night bg, glowing)
 *  - "light" = clarity register (near-white, high-contrast, for proof/reading)
 */
export function Section({
  tone = "dark",
  id,
  className,
  children,
}: {
  tone?: "dark" | "light";
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 md:py-32",
        tone === "light" && "bg-cg-mist text-ink-900",
        tone === "dark" && "bg-gradient-to-b from-night-700 to-night-800 text-onDark",
        className
      )}
    >
      {children}
    </section>
  );
}
