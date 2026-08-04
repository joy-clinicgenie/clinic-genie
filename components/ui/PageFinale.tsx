import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/cn";

/** Rounded closing unit: bottom CTA content + site footer as one block. */
export function PageFinale({
  children,
  className,
  backdropClassName = "bg-[#eafbfb]",
}: {
  children: ReactNode;
  className?: string;
  /** Fills the corner gaps behind the rounded shell so the dark body does not show through */
  backdropClassName?: string;
}) {
  return (
    <div className={backdropClassName}>
      <div data-nav-theme="dark" className={cn("finale-shell text-onDark", className)}>
        <div className="surface-finale">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
