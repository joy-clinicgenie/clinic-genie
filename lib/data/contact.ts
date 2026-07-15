import { SPECIALTY_HUBS } from "@/lib/data/specialty-hubs";

export const CONTACT_SPECIALTIES = [
  ...SPECIALTY_HUBS.map((hub) => hub.name),
  "Other",
] as const;
