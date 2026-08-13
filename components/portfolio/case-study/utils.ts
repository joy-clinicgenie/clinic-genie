export function padIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function toPathSteps(value: string | string[]): string[] {
  if (Array.isArray(value)) {
    return value.map((step) => step.trim()).filter(Boolean);
  }

  return value
    .split(/\s*→\s*/)
    .map((step) => step.trim())
    .filter(Boolean);
}

export function composeCaseEyebrow({
  heroEyebrow,
  caseLabel,
  specialty,
}: {
  heroEyebrow?: string;
  caseLabel: string | null;
  specialty: string;
}): string {
  if (heroEyebrow) return heroEyebrow;
  return [caseLabel, specialty].filter(Boolean).join(" · ");
}

export function parsePillarCount(value?: string): number {
  if (!value) return 6;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 6;
}
