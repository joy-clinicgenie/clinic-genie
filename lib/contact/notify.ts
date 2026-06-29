import { Resend } from "resend";
import type { ContactSubmissionRecord } from "@/lib/contact/schema";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml(record: ContactSubmissionRecord): string {
  const rows = [
    ["Name", record.name],
    ["Clinic", record.clinic],
    ["Email", record.email],
    ["Phone", record.phone ?? "Not provided"],
    ["Specialty", record.specialty],
    ["Message", record.message],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;color:#0f172a;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#334155;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h1 style="font-size:20px;margin:0 0 16px;">New contact enquiry</h1>
      <p style="margin:0 0 16px;">A new wish was submitted from the Clinic Genie contact form.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
        ${tableRows}
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:#64748b;">Submission ID: ${escapeHtml(record.id)}</p>
    </div>
  `;
}

export async function sendContactNotification(record: ContactSubmissionRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL ?? "hello@clinic-genie.com";
  const from = process.env.RESEND_FROM_EMAIL ?? "Clinic Genie <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error("Resend API key is not configured.");
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: record.email,
    subject: `New contact enquiry from ${record.name} (${record.clinic})`,
    html: buildEmailHtml(record),
    text: [
      "New contact enquiry",
      "",
      `Name: ${record.name}`,
      `Clinic: ${record.clinic}`,
      `Email: ${record.email}`,
      `Phone: ${record.phone ?? "Not provided"}`,
      `Specialty: ${record.specialty}`,
      "",
      "Message:",
      record.message,
      "",
      `Submission ID: ${record.id}`,
    ].join("\n"),
  });

  if (error) {
    console.error("Failed to send contact notification:", error.message);
    throw new Error("Unable to send notification email.");
  }
}
