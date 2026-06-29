import { NextResponse } from "next/server";
import { parseContactSubmission } from "@/lib/contact/schema";
import { sendContactNotification } from "@/lib/contact/notify";
import { saveContactSubmission } from "@/lib/supabase/admin";

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
    const record = await saveContactSubmission(parsed.data);

    try {
      await sendContactNotification(record);
    } catch (emailError) {
      console.error("Contact saved but email failed:", emailError);
    }

    return NextResponse.json({ ok: true, id: record.id });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json(
      { error: "We could not send your enquiry right now. Please try again or email hello@clinic-genie.com." },
      { status: 500 }
    );
  }
}
