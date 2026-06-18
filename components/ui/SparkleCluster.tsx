import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";
import styles from "./SparkleCluster.module.css";

const SIZE_CLASS = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

export function SparkleCluster({
  size,
  glow = false,
  className,
  style,
}: {
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        styles.cluster,
        size && SIZE_CLASS[size],
        glow && styles.glow,
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}
