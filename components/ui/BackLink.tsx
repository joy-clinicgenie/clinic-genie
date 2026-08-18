import Link from "next/link";
import { cn } from "@/lib/cn";

export function BackLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative z-20 inline-flex w-fit items-center gap-1.5 rounded-pill px-3.5 py-2 text-sm font-medium text-ink-500 transition-[background-color,color,box-shadow] duration-ui ease-out-soft hover:bg-cg-mist hover:text-genie-700 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/50",
        className
      )}
    >
      <span aria-hidden="true">←</span>
      {label}
    </Link>
  );
}
