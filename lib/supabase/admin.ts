import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ContactSubmissionInput, ContactSubmissionRecord } from "@/lib/contact/schema";

let adminClient: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) {
    return adminClient;
  }

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase server credentials are not configured.");
  }

  adminClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}

export async function saveContactSubmission(
  submission: ContactSubmissionInput
): Promise<ContactSubmissionRecord> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("contact_submissions")
    .insert({
      name: submission.name,
      clinic_name: submission.clinic,
      email: submission.email,
      phone: submission.phone ?? null,
      specialty: submission.specialty,
      message: submission.message,
      consent: submission.consent,
    })
    .select("id, name, clinic_name, email, phone, specialty, message, consent, created_at")
    .single();

  if (error || !data) {
    console.error("Failed to save contact submission:", error?.message);
    throw new Error("Unable to save your enquiry right now.");
  }

  return {
    id: data.id,
    name: data.name,
    clinic: data.clinic_name,
    email: data.email,
    phone: data.phone ?? undefined,
    specialty: data.specialty,
    message: data.message,
    consent: data.consent,
    created_at: data.created_at,
  };
}
