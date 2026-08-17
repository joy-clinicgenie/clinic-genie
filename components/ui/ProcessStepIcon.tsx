import {
  Compass,
  PenTool,
  Rocket,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

export const PROCESS_STEP_ICONS: Record<string, LucideIcon> = {
  Discover: Search,
  Strategise: Compass,
  Create: PenTool,
  Launch: Rocket,
  Optimise: TrendingUp,
};

export function ProcessStepIcon({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const Icon = PROCESS_STEP_ICONS[title] ?? Search;

  return (
    <Icon
      className={cn("shrink-0", className)}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}
