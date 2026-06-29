"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useOrbStore } from "@/components/orb/store";
import { cn } from "@/lib/cn";
import { SPECIALTIES } from "@/lib/data/faqs";

const FIELD_BASE =
  "w-full rounded-md border bg-white/5 px-4 py-3 text-[0.9375rem] text-onDark placeholder:text-onDark-faint transition-[box-shadow,border-color,background-color] duration-ui ease-out-soft focus:outline-none";
const FIELD_REST = "border-white/12 hover:border-white/25";
const FIELD_FOCUS =
  "border-genie-400 bg-genie-500/10 shadow-[0_0_0_3px_rgba(108,186,217,0.25),0_0_22px_rgba(108,186,217,0.35)]";

const LABEL =
  "flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-onDark-muted";

function Field({
  id,
  label,
  optional,
  active,
  onFocus,
  onBlur,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
  children: (cls: string) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2" onFocusCapture={onFocus} onBlurCapture={onBlur}>
      <label htmlFor={id} className={LABEL}>
        {label}
        {optional && <span className="text-onDark-faint normal-case tracking-normal">(optional)</span>}
        <span
          aria-hidden="true"
          className={cn(
            "ml-1 h-1.5 w-1.5 rounded-full bg-genie-300 transition-opacity duration-ui",
            active ? "opacity-100 shadow-[0_0_8px_2px_rgba(108,186,217,0.7)]" : "opacity-0"
          )}
        />
      </label>
      {children(cn(FIELD_BASE, active ? FIELD_FOCUS : FIELD_REST))}
    </div>
  );
}

export function ContactForm() {
  const baseId = useId();
  const router = useRouter();
  const setScene = useOrbStore((s) => s.setScene);
  const burst = useOrbStore((s) => s.burst);

  const [focused, setFocused] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFocus = (name: string) => {
    setFocused(name);
    // orb leans in and brightens while a field is being completed
    setScene({ mood: "thinking", intensity: 0.95 });
  };

  const handleBlur = () => {
    setFocused(null);
    setScene({ mood: "curious", intensity: 0.85 });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);
    setScene({ mood: "thinking", scale: 0.9, intensity: 1 });

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
          consent: formData.get("consent") === "on",
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "We could not send your enquiry right now.");
      }

      burst();
      setScene({ mood: "celebrate", scale: 1.08, intensity: 1 });
      router.push("/thank-you");
    } catch (submitError) {
      setScene({ mood: "curious", scale: 1, intensity: 0.85 });
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
    <GlassWrap>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate={false}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={fid("name")} label="Name" active={focused === "name"} onFocus={() => handleFocus("name")} onBlur={handleBlur}>
            {(cls) => (
              <input id={fid("name")} name="name" type="text" autoComplete="name" required placeholder="Dr Tan Wei Ming" className={cls} />
            )}
          </Field>

          <Field id={fid("clinic")} label="Clinic name" active={focused === "clinic"} onFocus={() => handleFocus("clinic")} onBlur={handleBlur}>
            {(cls) => (
              <input id={fid("clinic")} name="clinic" type="text" autoComplete="organization" required placeholder="Orchard Aesthetics" className={cls} />
            )}
          </Field>

          <Field id={fid("email")} label="Email" active={focused === "email"} onFocus={() => handleFocus("email")} onBlur={handleBlur}>
            {(cls) => (
              <input id={fid("email")} name="email" type="email" autoComplete="email" required placeholder="you@clinic.com.sg" className={cls} />
            )}
          </Field>

          <Field id={fid("phone")} label="Phone" optional active={focused === "phone"} onFocus={() => handleFocus("phone")} onBlur={handleBlur}>
            {(cls) => (
              <input id={fid("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+65 ____ ____" className={cls} />
            )}
          </Field>
        </div>

        <Field id={fid("specialty")} label="Specialty" active={focused === "specialty"} onFocus={() => handleFocus("specialty")} onBlur={handleBlur}>
          {(cls) => (
            <div className="relative">
              <select id={fid("specialty")} name="specialty" required defaultValue="" className={cn(cls, "appearance-none pr-10")}>
                <option value="" disabled>
                  Select your specialty
                </option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s} className="bg-night-800 text-onDark">
                    {s}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-genie-300"
              >
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </Field>

        <Field id={fid("message")} label="What would you like to grow?" active={focused === "message"} onFocus={() => handleFocus("message")} onBlur={handleBlur}>
          {(cls) => (
            <textarea
              id={fid("message")}
              name="message"
              rows={4}
              required
              placeholder="Tell us about your clinic, your goals, and where you feel patients aren't finding you yet."
              className={cn(cls, "resize-none leading-relaxed")}
            />
          )}
        </Field>

        <label htmlFor={fid("consent")} className="flex cursor-pointer items-start gap-3 text-sm text-onDark-muted">
          <input
            id={fid("consent")}
            name="consent"
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/25 bg-white/5 text-genie-500 accent-genie-500 focus:outline-none focus-visible:shadow-focus"
          />
          <span>I&apos;d like Clinic Genie to contact me about my enquiry.</span>
        </label>

        {error && (
          <p role="alert" className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <MagneticButton type="submit" size="lg" withMiniOrb disabled={submitting}>
            {submitting ? "Sending your wish..." : "Send my wish"}
          </MagneticButton>
          <p className="text-sm text-onDark-faint">No obligation. We reply within one business day.</p>
        </div>
      </form>
    </GlassWrap>
  );
}

function GlassWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-7 sm:p-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orb-bloom opacity-60 blur-2xl"
      />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-h3 text-onDark">No vague wishes.</h2>
          <p className="text-sm text-onDark-muted">
            Just tell us where your clinic wants to grow.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
