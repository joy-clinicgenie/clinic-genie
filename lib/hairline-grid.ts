import { cn } from "@/lib/cn";

/** Two-column item hairlines used on service mechanics and project metrics. */
export function hairlineGridItemClass(index: number, count: number): string {
  const lastRowCount = count % 2 === 0 ? 2 : 1;
  const isLastRow = index >= count - lastRowCount;
  const isLeftCol = index % 2 === 0;

  return cn(
    "relative py-8 first:pt-0 last:max-sm:pb-0 sm:py-8",
    index < 2 && "sm:pt-0",
    isLastRow && "sm:pb-0",
    isLeftCol ? "sm:pr-10" : "sm:pl-10",
    index < count - 1 &&
      "max-sm:after:pointer-events-none max-sm:after:absolute max-sm:after:inset-x-4 max-sm:after:bottom-0 max-sm:after:h-px max-sm:after:bg-white/10 max-sm:after:content-['']",
    isLeftCol &&
      "sm:before:pointer-events-none sm:before:absolute sm:before:right-0 sm:before:w-px sm:before:bg-white/10 sm:before:content-['']",
    isLeftCol && (index < 2 ? "sm:before:top-8" : "sm:before:top-0"),
    isLeftCol && (isLastRow ? "sm:before:bottom-8" : "sm:before:bottom-0"),
    !isLastRow &&
      "sm:after:pointer-events-none sm:after:absolute sm:after:bottom-0 sm:after:h-px sm:after:bg-white/10 sm:after:content-['']",
    !isLastRow &&
      (isLeftCol ? "sm:after:left-8 sm:after:right-0" : "sm:after:left-0 sm:after:right-8")
  );
}
