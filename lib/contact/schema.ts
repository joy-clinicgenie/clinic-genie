import { SPECIALTIES } from "@/lib/data/faqs";

export interface ContactSubmissionInput {
  name: string;
  clinic: string;
  email: string;
  phone?: string;
  specialty: string;
  message: string;
  consent: boolean;
}

export interface ContactSubmissionRecord extends ContactSubmissionInput {
  id: string;
  created_at: string;
}

export type ContactValidationResult =
  | { ok: true; data: ContactSubmissionInput }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPECIALTY_SET = new Set<string>(SPECIALTIES);

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactSubmission(body: unknown): ContactValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid submission." };
  }

  const raw = body as Record<string, unknown>;
  const name = trim(raw.name);
  const clinic = trim(raw.clinic);
  const email = trim(raw.email).toLowerCase();
  const phone = trim(raw.phone);
  const specialty = trim(raw.specialty);
  const message = trim(raw.message);
  const consent = raw.consent === true;

  if (!name || name.length > 200) {
    return { ok: false, error: "Please enter your name." };
  }

  if (!clinic || clinic.length > 200) {
    return { ok: false, error: "Please enter your clinic name." };
  }

  if (!email || !EMAIL_PATTERN.test(email) || email.length > 320) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (phone.length > 30) {
    return { ok: false, error: "Please enter a shorter phone number." };
  }

  if (!specialty || !SPECIALTY_SET.has(specialty)) {
    return { ok: false, error: "Please select a valid specialty." };
  }

  if (!message || message.length > 5000) {
    return { ok: false, error: "Please tell us what you would like to grow." };
  }

  if (!consent) {
    return { ok: false, error: "Please confirm that Clinic Genie may contact you." };
  }

  return {
    ok: true,
    data: {
      name,
      clinic,
      email,
      phone: phone || undefined,
      specialty,
      message,
      consent,
    },
  };
}
