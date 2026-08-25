export function padIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export type WorkstreamImageSlotKey = "brand" | "structure" | "patientJourney";

/** 01 → Brand, 02 → Structure, 03 onwards → Patient journey. */
export function slotKeyForWorkstreamIndex(index: number): WorkstreamImageSlotKey {
  if (index <= 0) return "brand";
  if (index === 1) return "structure";
  return "patientJourney";
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
