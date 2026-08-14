"use client";

import { useState, useId } from "react";
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

const FIELD_LABEL = "font-display text-sm font-normal text-ink-700";

export function ContactForm() {
  const baseId = useId();
  const router = useRouter();

  const [focused, setFocused] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
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

    if (!consent) {
      setError("Please confirm that Clinic Genie may contact you.");
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
        <form onSubmit={handleSubmit} className={styles.formBody} noValidate={false}>
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
                placeholder="Your Name"
                className={cn(FIELD_BASE, focused === "name" ? FIELD_FOCUS : FIELD_REST)}
              />
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
                placeholder="Your Clinic"
                className={cn(FIELD_BASE, focused === "clinic" ? FIELD_FOCUS : FIELD_REST)}
              />
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
                placeholder="yourname@email.com"
                className={cn(FIELD_BASE, focused === "email" ? FIELD_FOCUS : FIELD_REST)}
              />
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
                placeholder="+65 1234 5678"
                className={cn(FIELD_BASE, focused === "phone" ? FIELD_FOCUS : FIELD_REST)}
              />
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
                className={cn(
                  FIELD_BASE,
                  "appearance-none pr-10",
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
                "resize-y leading-relaxed",
                focused === "message" ? FIELD_FOCUS : FIELD_REST
              )}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id={fid("consent")}
              name="consent"
              type="checkbox"
              checked={consent}
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

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-feedback-error/25 bg-feedback-error/10 px-4 py-3 text-sm text-feedback-error"
            >
              {error}
            </p>
          )}

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
