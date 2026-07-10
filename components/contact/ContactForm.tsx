"use client";

import { useState, useId, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ChevronDown,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import { CONTACT_SPECIALTIES } from "@/lib/data/contact";
import styles from "./ContactSection.module.css";

const FIELD_BASE =
  "w-full rounded-xl border bg-white py-3 pr-4 text-[0.9375rem] text-ink-900 placeholder:text-ink-500/55 transition-[box-shadow,border-color] duration-ui ease-out-soft focus:outline-none";
const FIELD_REST = "border-hairline-light hover:border-genie-300/70";
const FIELD_FOCUS =
  "border-genie-400 shadow-[0_0_0_3px_rgba(24,196,217,0.18),0_0_18px_rgba(24,196,217,0.12)]";

const FIELD_LABEL = "font-display text-sm font-normal text-ink-700";
const SECTION_LABEL =
  "font-display text-kicker font-semibold uppercase tracking-[0.18em] text-ink-500";

function FormSectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className={styles.sectionLabel}>
      <span className={styles.sectionLabelDot} aria-hidden="true" />
      <span className={SECTION_LABEL}>{children}</span>
      <span className={styles.sectionLabelLine} aria-hidden="true" />
    </div>
  );
}

function Field({
  id,
  label,
  optional,
  active,
  onFocus,
  onBlur,
  icon,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
  icon: ReactNode;
  children: (cls: string) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2" onFocusCapture={onFocus} onBlurCapture={onBlur}>
      <label htmlFor={id} className={FIELD_LABEL}>
        {label}
        {optional && <span className="font-normal normal-case tracking-normal text-ink-500"> (optional)</span>}
      </label>
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-genie-500"
        >
          {icon}
        </span>
        {children(cn(FIELD_BASE, "pl-10", active ? FIELD_FOCUS : FIELD_REST))}
      </div>
    </div>
  );
}

export function ContactForm() {
  const baseId = useId();
  const router = useRouter();

  const [focused, setFocused] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFocus = (name: string) => {
    setFocused(name);
  };

  const handleBlur = () => {
    setFocused(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          clinic: formData.get("clinic"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          specialty: formData.get("specialty"),
          message: formData.get("message"),
          consent: true,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "We could not send your enquiry right now.");
      }

      router.push("/thank-you");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not send your enquiry right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fid = (name: string) => `${baseId}-${name}`;

  return (
    <div className={styles.formCard}>
      <div className="p-7 sm:p-8">
        <div className={styles.formHeader}>
          <span className={styles.formHeaderIcon} aria-hidden="true">
            <Building2 className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-h5 text-ink-900">Start with your clinic details</h3>
            <p className="text-sm text-ink-700">
              Share the basics. We will review the request before replying.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.formBody} noValidate={false}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id={fid("name")}
              label="Name"
              active={focused === "name"}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
              icon={<User className="h-4 w-4" strokeWidth={1.75} />}
            >
              {(cls) => (
                <input
                  id={fid("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Dr Tan Wei Ming"
                  className={cls}
                />
              )}
            </Field>

            <Field
              id={fid("clinic")}
              label="Clinic name"
              active={focused === "clinic"}
              onFocus={() => handleFocus("clinic")}
              onBlur={handleBlur}
              icon={<Building2 className="h-4 w-4" strokeWidth={1.75} />}
            >
              {(cls) => (
                <input
                  id={fid("clinic")}
                  name="clinic"
                  type="text"
                  autoComplete="organization"
                  required
                  placeholder="Orchard Aesthetics"
                  className={cls}
                />
              )}
            </Field>

            <Field
              id={fid("email")}
              label="Email"
              active={focused === "email"}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              icon={<Mail className="h-4 w-4" strokeWidth={1.75} />}
            >
              {(cls) => (
                <input
                  id={fid("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@clinic.com.sg"
                  className={cls}
                />
              )}
            </Field>

            <Field
              id={fid("phone")}
              label="Phone"
              optional
              active={focused === "phone"}
              onFocus={() => handleFocus("phone")}
              onBlur={handleBlur}
              icon={<Phone className="h-4 w-4" strokeWidth={1.75} />}
            >
              {(cls) => (
                <input
                  id={fid("phone")}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+65 ____ ____"
                  className={cls}
                />
              )}
            </Field>
          </div>

          <FormSectionLabel>Clinic focus</FormSectionLabel>

          <div className="flex flex-col gap-2" onFocusCapture={() => handleFocus("specialty")} onBlurCapture={handleBlur}>
            <label htmlFor={fid("specialty")} className={FIELD_LABEL}>
              Specialty
            </label>
            <div className="relative">
              <select
                id={fid("specialty")}
                name="specialty"
                required
                defaultValue=""
                className={cn(
                  FIELD_BASE,
                  "appearance-none px-4 pr-10",
                  focused === "specialty" ? FIELD_FOCUS : FIELD_REST
                )}
              >
                <option value="" disabled>
                  Select your specialty
                </option>
                {CONTACT_SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-genie-500"
                strokeWidth={1.75}
              />
            </div>
          </div>

          <FormSectionLabel>Growth request</FormSectionLabel>

          <div
            className="flex flex-col gap-2"
            onFocusCapture={() => handleFocus("message")}
            onBlurCapture={handleBlur}
          >
            <label htmlFor={fid("message")} className={FIELD_LABEL}>
              What would you like to grow?
            </label>
            <textarea
              id={fid("message")}
              name="message"
              rows={4}
              required
              placeholder="Tell us about your clinic, your goals, and where you feel patients aren't finding you yet."
              className={cn(
                FIELD_BASE,
                "resize-none px-4 leading-relaxed",
                focused === "message" ? FIELD_FOCUS : FIELD_REST
              )}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-feedback-error/25 bg-feedback-error/10 px-4 py-3 text-sm text-feedback-error"
            >
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <MagneticButton type="submit" size="lg" withMiniOrb disabled={submitting}>
              {submitting ? "Sending your wish..." : "Send my wish"}
            </MagneticButton>
            <p className="text-sm text-ink-500">No obligation. We reply within one business day.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
