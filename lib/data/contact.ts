import { SPECIALTY_HUBS } from "@/lib/data/specialty-hubs";

export const CONTACT_BUILT_FOR = [
  {
    label: "Search visibility",
    icon: "search" as const,
  },
  {
    label: "Clinic websites",
    icon: "monitor" as const,
  },
  {
    label: "Healthcare content",
    icon: "document" as const,
  },
  {
    label: "AI search readiness",
    icon: "sparkles" as const,
  },
] as const;

export const CONTACT_SPECIALTIES = [
  ...SPECIALTY_HUBS.map((hub) => hub.name),
  "Other",
] as const;
