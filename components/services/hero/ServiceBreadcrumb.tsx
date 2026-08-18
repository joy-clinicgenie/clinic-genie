import { BackLink } from "@/components/ui/BackLink";
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
  return <BackLink href={href} label={label} className={cn(className)} />;
}
