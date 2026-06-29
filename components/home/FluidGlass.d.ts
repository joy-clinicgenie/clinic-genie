import type { RefObject } from "react";

declare function FluidGlass(props: {
  mode?: "lens" | "bar" | "cube";
  lensProps?: Record<string, unknown>;
  barProps?: Record<string, unknown>;
  cubeProps?: Record<string, unknown>;
  eventSource?: RefObject<HTMLElement> | HTMLElement | null;
  overlay?: boolean;
  content?: { heading: string; tagline?: string; body: string } | null;
}): JSX.Element;

export default FluidGlass;
