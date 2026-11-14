import "server-only";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { Pool } from "pg";
import type { ContactSubmissionInput, ContactSubmissionRecord } from "@/lib/contact/schema";

const LOCAL_HOSTS = new Set(["127.0.0.1", "localhost", "::1"]);
const LIVE_ENQUIRY_DATABASE = "clinic_genie_enquiry_staging";
const LIVE_INTAKE_ROLE = "cg_enquiry_intake";

const globalForEnquiry = globalThis as unknown as {
  enquiryPool?: Pool;
  enquiryPoolKey?: string;
};

function enquiryUrl(): string | null {
  const url = process.env.ENQUIRY_DATABASE_URL?.trim();
  return url || null;
}

export function hasEnquiryDatabase(): boolean {
  return Boolean(enquiryUrl());
}

function enquiryWriteTarget(url: string): { live: boolean } {
  let target: URL;
  try {
    target = new URL(url);
  } catch {
    throw new Error("Unable to save your enquiry right now.");
  }

  const database = decodeURIComponent(target.pathname.replace(/^\//, ""));
  if (
    target.protocol !== "postgresql:" &&
    target.protocol !== "postgres:"
  ) {
    throw new Error("Unable to save your enquiry right now.");
  }
  if (target.port === "54329" || database === "neondb" || database === "clinic_genie" || database === "postgres") {
    throw new Error("Unable to save your enquiry right now.");
  }
  if (database === LIVE_ENQUIRY_DATABASE) {
    const user = decodeURIComponent(target.username);
    if (LOCAL_HOSTS.has(target.hostname) || user !== LIVE_INTAKE_ROLE) {
      throw new Error("Unable to save your enquiry right now.");
    }
    return { live: true };
  }

  const local =
    LOCAL_HOSTS.has(target.hostname) &&
    database.includes("enquiry") &&
    database.includes("test");
  if (!local) throw new Error("Unable to save your enquiry right now.");
  return { live: false };
}

function configuredKey(name: string, fallback: string): string {
  const value = process.env[name]?.trim() || fallback;
  if (!/^[a-z0-9-]{1,64}$/.test(value)) {
    throw new Error("Unable to save your enquiry right now.");
  }
  return value;
}

function enquiryPool(): Pool {
  const url = enquiryUrl();
  if (!url) {
    throw new Error("Unable to save your enquiry right now.");
  }
  enquiryWriteTarget(url);
  if (globalForEnquiry.enquiryPool && globalForEnquiry.enquiryPoolKey === url) {
    return globalForEnquiry.enquiryPool;
  }
  void globalForEnquiry.enquiryPool?.end().catch(() => undefined);
  const pool = new Pool({
    connectionString: url,
    max: 2,
    connectionTimeoutMillis: 2000,
  });
  globalForEnquiry.enquiryPool = pool;
  globalForEnquiry.enquiryPoolKey = url;
  return pool;
}

function errorCode(error: unknown): string {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "string" ? code : "unknown";
  }
  return "unknown";
}

export async function saveEnquirySubmission(
  submission: ContactSubmissionInput,
): Promise<ContactSubmissionRecord> {
  const clinicId = configuredKey("ENQUIRY_CLINIC_ID", "clinic-genie");
  const websiteKey = configuredKey("ENQUIRY_WEBSITE_KEY", "clinic-genie");
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const digest = createHash("sha256")
    .update(
      JSON.stringify({
        name: submission.name,
        clinic: submission.clinic,
        email: submission.email,
        phone: submission.phone ?? "",
        specialty: submission.specialty,
        message: submission.message,
      }),
    )
    .digest("hex");
  const message = [`Clinic: ${submission.clinic}`, `Specialty: ${submission.specialty}`, "", submission.message].join(
    "\n",
  );

  const live = enquiryWriteTarget(enquiryUrl() ?? "").live;
  const client = await enquiryPool().connect();
  try {
    await client.query("begin");
    await client.query(
      `insert into clinics (id, display_name, is_synthetic)
       values ($1, 'Clinic Genie', $2)
       on conflict (id) do nothing`,
      [clinicId, !live],
    );
    await client.query(
      `insert into enquiries (
         id, public_reference, clinic_id, website_key, form_key, form_version,
         idempotency_key, payload_digest, name, contact_number, email, message,
         page_path, reason, attribution_source, notice_version,
         consent_acknowledged_at, status, is_synthetic, created_at
       ) values (
         $1, $2, $3, $4, 'contact', 1,
         $5, $6, $7, $8, $9, $10,
         '/contact', $11, 'direct', 'clinic-genie-contact-v1',
         $12, 'new', $13, $12
       )`,
      [
        id,
        `CG-${randomBytes(5).toString("hex").toUpperCase()}`,
        clinicId,
        websiteKey,
        id,
        digest,
        submission.name,
        submission.phone || "Not provided",
        submission.email,
        message,
        submission.specialty,
        createdAt,
        !live,
      ],
    );
    await client.query(
      `insert into notification_outbox (
         id, enquiry_id, clinic_id, event_type, recipient_ref, status,
         attempts, created_at, updated_at
       ) values (
         $1, $2, $3, 'clinic_notification', 'contact-notification', 'pending',
         0, $4, $4
       )`,
      [randomUUID(), id, clinicId, createdAt],
    );
    await client.query("commit");
  } catch (error) {
    await client.query("rollback").catch(() => undefined);
    console.error("Failed to save enquiry:", errorCode(error));
    throw new Error("Unable to save your enquiry right now.");
  } finally {
    client.release();
  }

  return {
    ...submission,
    id,
    created_at: createdAt,
  };
}

export async function markEnquiryNotification(id: string, sent: boolean): Promise<void> {
  if (!/^[0-9a-f-]{36}$/.test(id) || !hasEnquiryDatabase()) return;
  try {
    await enquiryPool().query(
      `update notification_outbox
       set status = $2,
           attempts = attempts + 1,
           provider = 'resend',
           last_attempt_at = now(),
           sent_at = case when $2 = 'sent' then now() else sent_at end,
           updated_at = now(),
           last_error_code = case when $2 = 'failed' then 'email_failed' else null end
       where enquiry_id = $1 and event_type = 'clinic_notification'`,
      [id, sent ? "sent" : "failed"],
    );
  } catch (error) {
    console.error("Failed to update enquiry notification:", errorCode(error));
  }
}
