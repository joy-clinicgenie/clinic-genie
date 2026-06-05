import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

const SIZES = {
  content: "max-w-content",
  wide: "max-w-wide",
  prose: "max-w-prose",
};

export function Container({
  size = "content",
  as: Tag = "div",
  className,
  children,
}: {
  size?: "content" | "wide" | "prose";
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full px-[var(--page-pad)]", SIZES[size], className)}>{children}</Tag>
  );
}
