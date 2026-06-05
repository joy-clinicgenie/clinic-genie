import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleField } from "@/components/ui/SparkleField";
import { MagicOrb } from "@/components/orb/MagicOrb";
import { OrbAnchor } from "@/components/orb/OrbAnchor";

export const metadata: Metadata = {
  title: "Wish Received | Clinic Genie",
  description:
    "Thank you for reaching out to Clinic Genie. We've received your enquiry and will be in touch within one business day.",
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  "We read every enquiry ourselves — no auto-responder triage.",
  "A strategist will reply within one business day to set up your call.",
  "The 30-minute call is free, with no obligation and no hard sell.",
];

export default function ThankYouPage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-aurora-hero pt-32 pb-20 text-onDark">
      <SparkleField density={44} parallax />
      <OrbAnchor
        id="thank-you"
        variant="contact"
        mood="celebrate"
        scale={1.05}
        intensity={1}
        className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2"
      />

      <Container size="content" className="relative z-10 flex flex-col items-center gap-8 text-center">
        <Reveal variant="scale">
          <MagicOrb variant="contact" className="w-44 mx-auto" />
        </Reveal>

        <Reveal variant="up" delay={0.05}>
          <Kicker>Your wish is on its way</Kicker>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <h1 className="text-h1 font-display text-balance text-onDark">
            Wish <span className="genie-text">received</span>.
          </h1>
        </Reveal>

        <Reveal variant="up" delay={0.15}>
          <p className="mx-auto max-w-xl text-lead text-onDark-muted">
            We&apos;ll be in touch within one business day. Thank you for trusting Clinic Genie with your
            clinic&apos;s growth — we&apos;ll come back with a clear, considered next step.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.25} className="w-full">
          <ul className="mx-auto flex max-w-lg flex-col gap-3 text-left">
            {NEXT_STEPS.map((step) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-genie-200">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8.5l3 3 7-7.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-base text-onDark-muted">{step}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="up" delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="/portfolio" size="lg" withMiniOrb>
              See our works
            </MagneticButton>
            <MagneticButton href="/genie-tips" size="lg" variant="secondary">
              Read Genie Tips
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.45}>
          <p className="text-sm text-onDark-faint">
            Need us sooner? Email hello@clinic-genie.com and we&apos;ll prioritise your note.
          </p>
        </Reveal>
      </Container>

      {/* fade into footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
      />
    </section>
  );
}
