import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  parseContactSubmission,
  type ContactSubmissionInput,
  type ContactSubmissionRecord,
} from "@/lib/contact/schema";
import { sendContactNotification } from "@/lib/contact/notify";
import { allowContactAttempt, getClientIp } from "@/lib/contact/rate-limit";
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
  if (!allowContactAttempt(getClientIp(request))) {
    return NextResponse.json(
      {
        error:
          "Too many enquiries from this connection. Please wait a few minutes or email hello@clinic-genie.com.",
      },
      { status: 429 }
    );
  }

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
    let persisted = false;

    if (hasSupabaseConfig()) {
      record = await saveContactSubmission(parsed.data);
      persisted = true;
    } else {
      record = buildLocalRecord(parsed.data);
    }

    let emailed = false;
    try {
      await sendContactNotification(record);
      emailed = true;
    } catch (emailError) {
      console.error("Contact notification failed:", emailError);
    }

    if (!persisted && !emailed) {
      return NextResponse.json(
        {
          error:
            "We could not send your enquiry right now. Please try again or email hello@clinic-genie.com.",
        },
        { status: 500 }
      );
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
