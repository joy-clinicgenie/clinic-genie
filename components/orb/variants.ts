import type { OrbVariant } from "./store";

export interface OrbVariantConfig {
  scale: number;
  floatSpeed: number;
  distortion: number;
  samples: number;
  resolution: number;
  sparkles: number;
  bloom: boolean;
}

export const ORB_VARIANTS: Record<OrbVariant, OrbVariantConfig> = {
  home:      { scale: 1.0,  floatSpeed: 1.2, distortion: 0.4,  samples: 6, resolution: 256, sparkles: 40, bloom: true },
  about:     { scale: 0.85, floatSpeed: 0.9, distortion: 0.25, samples: 6, resolution: 256, sparkles: 30, bloom: true },
  services:  { scale: 0.9,  floatSpeed: 1.4, distortion: 0.6,  samples: 5, resolution: 256, sparkles: 36, bloom: true },
  portfolio: { scale: 0.7,  floatSpeed: 1.0, distortion: 0.3,  samples: 4, resolution: 192, sparkles: 24, bloom: true },
  blog:      { scale: 0.6,  floatSpeed: 0.7, distortion: 0.2,  samples: 4, resolution: 192, sparkles: 18, bloom: false },
  contact:   { scale: 0.95, floatSpeed: 1.6, distortion: 0.7,  samples: 5, resolution: 256, sparkles: 44, bloom: true },
};

// === Official Clinic Genie brand colours ===
export const ORB_BLUE = "#18C4D9";   // Genie Cyan (primary accent)
export const ORB_TINT = "#78E2DD";   // Soft Aqua  (secondary accent)
export const ORB_DARK = "#062D36";   // Strategic Teal (dark attenuation)
