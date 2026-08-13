import { cn } from "@/lib/cn";

const CARDINAL_ROTATIONS = [0, 90, 180, 270] as const;
const DIAGONAL_ROTATIONS = [45, 135, 225, 315] as const;

/**
 * Editorial kicker sparkle: concave four-point star with
 * eight capsules, short on the axes and longer on the diagonals.
 */
export function SparkleIcon({
  className,
  size = 14,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path d="M12 6.96Q13.32 10.68 17.04 12Q13.32 13.32 12 17.04Q10.68 13.32 6.96 12Q10.68 10.68 12 6.96Z" />
      {CARDINAL_ROTATIONS.map((rotate) => (
        <rect
          key={rotate}
          x="11.1"
          y="2.06"
          width="1.8"
          height="3.05"
          rx="0.9"
          transform={`rotate(${rotate} 12 12)`}
        />
      ))}
      {DIAGONAL_ROTATIONS.map((rotate) => (
        <rect
          key={rotate}
          x="11.15"
          y="0.6"
          width="1.7"
          height="6.1"
          rx="0.85"
          transform={`rotate(${rotate} 12 12)`}
        />
      ))}
    </svg>
  );
}
