import { Resend } from "resend";
import type { ContactSubmissionRecord } from "@/lib/contact/schema";
import { SITE } from "@/lib/data/nav";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function siteOrigin(): string {
  return SITE.url.replace(/\/$/, "");
}

function buildEmailHtml(record: ContactSubmissionRecord): string {
  const origin = siteOrigin();
  const logoUrl = `${origin}/brand/brandmark.svg`;
  const year = new Date().getFullYear();

  const rows = [
    ["Name", record.name],
    ["Clinic", record.clinic],
    ["Email", record.email],
    ["Phone", record.phone ?? "Not provided"],
    ["Specialty", record.specialty],
    ["Message", record.message],
  ];

  const detailRows = rows
    .map(
      ([label, value], index) => `
        <tr>
          <td style="padding:14px 0;border-top:${index === 0 ? "none" : "1px solid #E6EEF1"};vertical-align:top;width:120px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#0B4652;letter-spacing:0.02em;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:14px 0;border-top:${index === 0 ? "none" : "1px solid #E6EEF1"};vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#395D66;white-space:pre-wrap;">
            ${escapeHtml(value)}
          </td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>New contact enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#EAFBFB;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    New contact enquiry from ${escapeHtml(record.name)} at ${escapeHtml(record.clinic)}.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EAFBFB;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding:28px 24px 20px;background-color:#FFFFFF;">
              <a href="${escapeHtml(origin)}" style="text-decoration:none;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background-color:#0B4652;border-radius:12px;padding:8px;vertical-align:middle;">
                      <img src="${escapeHtml(logoUrl)}" width="28" height="28" alt="Clinic Genie" style="display:block;border:0;width:28px;height:28px;" />
                    </td>
                    <td style="padding-left:10px;vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#062D36;letter-spacing:-0.02em;">
                      Clinic Genie
                    </td>
                  </tr>
                </table>
              </a>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td bgcolor="#0B4652" style="background-color:#0B4652;background-image:linear-gradient(135deg,#062D36 0%,#0B4652 45%,#0E5F6B 100%);padding:40px 28px 36px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 18px;">
                <tr>
                  <td align="center" valign="middle" width="64" height="64" style="width:64px;height:64px;border-radius:999px;background-color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:30px;line-height:64px;color:#18C4D9;font-weight:700;">
                    ✓
                  </td>
                </tr>
              </table>
              <h1 style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:32px;line-height:1.2;font-weight:700;color:#FFFFFF;">
                Wish received
              </h1>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#EAFBFB;">
                A new enquiry from the Clinic Genie contact form.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px 8px;background-color:#FFFFFF;">
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#062D36;">
                Hello team,
              </p>
              <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#395D66;">
                <strong style="color:#0B4652;">${escapeHtml(record.name)}</strong> from
                <strong style="color:#0B4652;">${escapeHtml(record.clinic)}</strong>
                submitted a contact enquiry. Reply directly to this email to reach them.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F7FCFC;border:1px solid #E6EEF1;border-radius:12px;">
                <tr>
                  <td style="padding:8px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${detailRows}
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#7A9399;">
                Submission ID: ${escapeHtml(record.id)}
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:8px 28px 32px;background-color:#FFFFFF;">
              <a href="mailto:${escapeHtml(record.email)}" style="display:inline-block;background-color:#18C4D9;color:#062D36;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:999px;">
                Reply to ${escapeHtml(record.name)}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 28px 28px;background-color:#F7FCFC;border-top:1px solid #E6EEF1;text-align:center;">
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#395D66;">
                <a href="${escapeHtml(origin)}" style="color:#0B4652;text-decoration:none;font-weight:700;">clinic-genie.com</a>
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#7A9399;">
                Clinic Genie © ${year}. Magic you can measure.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(record: ContactSubmissionRecord): string {
  return [
    "Wish received",
    "A new enquiry from the Clinic Genie contact form.",
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
    "",
    "Reply directly to this email to reach the sender.",
  ].join("\n");
}

export async function sendContactNotification(
  record: ContactSubmissionRecord
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL ?? "hello@clinic-genie.com";
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Clinic Genie <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error("Resend API key is not configured.");
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send(
    {
      from,
      to,
      replyTo: record.email,
      subject: `New contact enquiry from ${record.name} (${record.clinic})`,
      html: buildEmailHtml(record),
      text: buildEmailText(record),
    },
    { idempotencyKey: `contact-enquiry/${record.id}` }
  );

  if (error) {
    console.error("Failed to send contact notification:", error.message);
    throw new Error("Unable to send notification email.");
  }
}
