import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Dark gradient block with rounded top — matches landing page finale shell */
export function PageFinale({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-nav-theme="dark" className={cn("finale-shell surface-finale text-onDark", className)}>
      {children}
    </div>
  );
}
