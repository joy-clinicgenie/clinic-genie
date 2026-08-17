"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import { CONTACT_SPECIALTIES } from "@/lib/data/contact";
import styles from "./ContactSection.module.css";

const FIELD_BASE =
  "w-full rounded-xl border bg-white px-4 py-3 text-[0.9375rem] text-ink-900 placeholder:text-ink-500/55 transition-[box-shadow,border-color] duration-ui ease-out-soft focus:outline-none";
const FIELD_REST = "border-hairline-light hover:border-genie-300/70";
const FIELD_FOCUS =
  "border-genie-400 shadow-[0_0_0_3px_rgba(24,196,217,0.18),0_0_18px_rgba(24,196,217,0.12)]";
const FIELD_INVALID = "border-feedback-error/60 hover:border-feedback-error";

const FIELD_LABEL = "font-display text-sm font-normal text-ink-700";

type FieldName = "name" | "clinic" | "email" | "phone" | "specialty" | "message" | "consent";

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="text-sm text-feedback-error">
      {message}
    </p>
  );
}

export function ContactForm() {
  const baseId = useId();
  const router = useRouter();
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [focused, setFocused] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<FieldName | null>(null);

  const fid = (name: FieldName) => `${baseId}-${name}`;
  const fieldErrorId = (name: FieldName) => `${baseId}-${name}-error`;
  const formErrorId = `${baseId}-form-error`;

  const describedBy = (name: FieldName) =>
    errorField === name ? fieldErrorId(name) : undefined;
  const invalid = (name: FieldName) => (errorField === name ? true : undefined);

  useEffect(() => {
    if (!error) return;
    if (errorField) {
      document.getElementById(`${baseId}-${errorField}`)?.focus();
      return;
    }
    errorRef.current?.focus();
  }, [error, errorField, baseId]);

  const fieldClass = (name: FieldName) =>
    cn(
      FIELD_BASE,
      focused === name ? FIELD_FOCUS : errorField === name ? FIELD_INVALID : FIELD_REST
    );

  const handleFocus = (name: string) => {
    setFocused(name);
  };

  const handleBlur = () => {
    setFocused(null);
  };

  const showError = (message: string, field: FieldName | null) => {
    setError(message);
    setErrorField(field);
  };

  const handleInvalid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const name = target.name as FieldName;
    if (!name) return;
    if (name === "consent") {
      showError("Please confirm that Clinic Genie may contact you.", "consent");
      return;
    }
    showError(target.validationMessage || "Please complete this field.", name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setErrorField(null);

    if (!consent) {
      showError("Please confirm that Clinic Genie may contact you.", "consent");
      return;
    }

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
          consent,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "We could not send your enquiry right now.");
      }

      router.push("/thank-you");
    } catch (submitError) {
      showError(
        submitError instanceof Error
          ? submitError.message
          : "We could not send your enquiry right now. Please try again.",
        null
      );
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className={styles.formCard}>
      <div className="p-7 sm:p-8">
        <form onSubmit={handleSubmit} onInvalid={handleInvalid} className={styles.formBody}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div
              className="flex flex-col gap-2"
              onFocusCapture={() => handleFocus("name")}
              onBlurCapture={handleBlur}
            >
              <label htmlFor={fid("name")} className={FIELD_LABEL}>
                Name
              </label>
              <input
                id={fid("name")}
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={invalid("name")}
                aria-describedby={describedBy("name")}
                placeholder="Your Name"
                className={fieldClass("name")}
              />
              {errorField === "name" && error ? (
                <FieldError id={fieldErrorId("name")} message={error} />
              ) : null}
            </div>

            <div
              className="flex flex-col gap-2"
              onFocusCapture={() => handleFocus("clinic")}
              onBlurCapture={handleBlur}
            >
              <label htmlFor={fid("clinic")} className={FIELD_LABEL}>
                Clinic name
              </label>
              <input
                id={fid("clinic")}
                name="clinic"
                type="text"
                autoComplete="organization"
                required
                aria-invalid={invalid("clinic")}
                aria-describedby={describedBy("clinic")}
                placeholder="Your Clinic"
                className={fieldClass("clinic")}
              />
              {errorField === "clinic" && error ? (
                <FieldError id={fieldErrorId("clinic")} message={error} />
              ) : null}
            </div>

            <div
              className="flex flex-col gap-2"
              onFocusCapture={() => handleFocus("email")}
              onBlurCapture={handleBlur}
            >
              <label htmlFor={fid("email")} className={FIELD_LABEL}>
                Email
              </label>
              <input
                id={fid("email")}
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={invalid("email")}
                aria-describedby={describedBy("email")}
                placeholder="yourname@email.com"
                className={fieldClass("email")}
              />
              {errorField === "email" && error ? (
                <FieldError id={fieldErrorId("email")} message={error} />
              ) : null}
            </div>

            <div
              className="flex flex-col gap-2"
              onFocusCapture={() => handleFocus("phone")}
              onBlurCapture={handleBlur}
            >
              <label htmlFor={fid("phone")} className={FIELD_LABEL}>
                Phone <span className="font-normal text-ink-500">(optional)</span>
              </label>
              <input
                id={fid("phone")}
                name="phone"
                type="tel"
                autoComplete="tel"
                aria-invalid={invalid("phone")}
                aria-describedby={describedBy("phone")}
                placeholder="+65 1234 5678"
                className={fieldClass("phone")}
              />
              {errorField === "phone" && error ? (
                <FieldError id={fieldErrorId("phone")} message={error} />
              ) : null}
            </div>
          </div>

          <div
            className="flex flex-col gap-2"
            onFocusCapture={() => handleFocus("specialty")}
            onBlurCapture={handleBlur}
          >
            <label htmlFor={fid("specialty")} className={FIELD_LABEL}>
              Specialty
            </label>
            <div className="relative">
              <select
                id={fid("specialty")}
                name="specialty"
                required
                defaultValue=""
                aria-invalid={invalid("specialty")}
                aria-describedby={describedBy("specialty")}
                className={cn(fieldClass("specialty"), "appearance-none pr-10")}
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
            {errorField === "specialty" && error ? (
              <FieldError id={fieldErrorId("specialty")} message={error} />
            ) : null}
          </div>

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
              aria-invalid={invalid("message")}
              aria-describedby={describedBy("message")}
              placeholder="Tell us about your clinic, your goals, and where you feel patients aren't finding you yet."
              className={cn(fieldClass("message"), "resize-y leading-relaxed")}
            />
            {errorField === "message" && error ? (
              <FieldError id={fieldErrorId("message")} message={error} />
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <input
                id={fid("consent")}
                name="consent"
                type="checkbox"
                checked={consent}
                required
                aria-invalid={invalid("consent")}
                aria-describedby={describedBy("consent")}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-hairline-light text-genie-500 accent-genie-500 focus:outline-none focus-visible:shadow-[0_0_0_3px_rgba(24,196,217,0.35)]"
              />
              <label htmlFor={fid("consent")} className="text-sm leading-relaxed text-ink-700">
                You agree that Clinic Genie may contact you about this enquiry, in line with our{" "}
                <Link
                  href="/terms-privacy"
                  className="font-medium text-genie-600 underline-offset-2 hover:underline"
                >
                  terms and privacy
                </Link>
                .
              </label>
            </div>
            {errorField === "consent" && error ? (
              <FieldError id={fieldErrorId("consent")} message={error} />
            ) : null}
          </div>

          {error && !errorField ? (
            <p
              ref={errorRef}
              id={formErrorId}
              role="alert"
              tabIndex={-1}
              className="rounded-xl border border-feedback-error/25 bg-feedback-error/10 px-4 py-3 text-sm text-feedback-error focus:outline-none focus-visible:shadow-[0_0_0_3px_rgba(24,196,217,0.35)]"
            >
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 pt-1">
            <MagneticButton
              type="submit"
              size="lg"
              withMiniOrb
              disabled={submitting}
              className="w-full"
              magnetic={false}
            >
              {submitting ? "Sending your wish..." : "Send my wish"}
            </MagneticButton>
            <p className="text-center text-sm text-ink-500">
              No obligation. We reply within one business day.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
