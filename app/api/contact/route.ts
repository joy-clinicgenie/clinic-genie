import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  parseContactSubmission,
  type ContactSubmissionInput,
  type ContactSubmissionRecord,
} from "@/lib/contact/schema";
import { sendContactNotification } from "@/lib/contact/notify";
import { saveContactSubmission } from "@/lib/supabase/admin";

function hasSupabaseConfig(): boolean {
  return Boolean(
    process.env.SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}

function buildLocalRecord(
  data: ContactSubmissionInput
): ContactSubmissionRecord {
  return {
    ...data,
    id: randomUUID(),
    created_at: new Date().toISOString(),
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const parsed = parseContactSubmission(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    let record: ContactSubmissionRecord;

    if (hasSupabaseConfig()) {
      record = await saveContactSubmission(parsed.data);
    } else {
      // Allow Resend verification / local testing when Supabase is not configured.
      record = buildLocalRecord(parsed.data);
    }

    try {
      await sendContactNotification(record);
    } catch (emailError) {
      console.error("Contact saved but email failed:", emailError);
    }

    return NextResponse.json({ ok: true, id: record.id });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json(
      {
        error:
          "We could not send your enquiry right now. Please try again or email hello@clinic-genie.com.",
      },
      { status: 500 }
    );
  }
}
