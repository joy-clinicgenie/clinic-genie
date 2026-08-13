import Link from "next/link";
import { cn } from "@/lib/cn";

export function ServiceBreadcrumb({
  href = "/services",
  label = "Services",
  className,
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex w-fit items-center gap-2 font-sans text-kicker uppercase text-genie-700 transition-colors hover:text-genie-900",
        className
      )}
    >
      <span aria-hidden="true">←</span> {label}
    </Link>
  );
}
