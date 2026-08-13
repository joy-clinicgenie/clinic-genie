import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { SparkleIcon } from "@/components/ui/SparkleIcon";

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
  const onDark = tone === "dark";

  return (
    <Tag
      className={cn(
        "inline-flex w-fit items-center gap-2 font-sans text-kicker font-semibold uppercase tracking-widest",
        onDark ? "text-genie-300" : "text-genie-700",
        className
      )}
    >
      <span className="inline-flex" aria-hidden="true">
        <SparkleIcon className={onDark ? "text-genie-300" : "text-genie-600"} />
      </span>
      {children}
    </Tag>
  );
}
