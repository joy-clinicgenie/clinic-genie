import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Dark gradient block with rounded top — matches landing page finale shell */
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
      <div data-nav-theme="dark" className={cn("finale-shell surface-finale text-onDark", className)}>
        {children}
      </div>
    </div>
  );
}
