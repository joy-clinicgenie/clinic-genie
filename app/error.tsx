"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Section } from "@/components/ui/Section";

const HELPFUL_PATHS = [
  { label: "Explore Services", href: "/services" },
  { label: "See Our Works", href: "/portfolio" },
  { label: "Read Clinic Marketing Insights", href: "/genie-tips" },
  { label: "Start a Conversation", href: "/contact" },
] as const;

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="light" className="min-h-[56vh] bg-none py-16 md:py-24">
      <Container size="wide" className="flex flex-col items-center gap-7 text-center">
        <p className="font-mono text-kicker uppercase text-genie-600">Something went wrong</p>
        <h1 className="max-w-3xl font-display text-h2 font-semibold text-balance text-ink-900">
          This page could not load
        </h1>
        <p className="max-w-xl text-body text-ink-700">
          We could not show this page just now. Try again, or go back to a page that is still
          working.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton type="button" size="lg" withMiniOrb onClick={() => reset()}>
            Try again
          </MagneticButton>
          <MagneticButton href="/" size="lg" variant="ghost" tone="light">
            Back to Home
          </MagneticButton>
        </div>
        <nav aria-label="Helpful paths">
          <ul className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-y-2">
            {HELPFUL_PATHS.map((path, index) => (
              <li key={path.href} className="flex items-center">
                {index > 0 ? (
                  <span aria-hidden="true" className="mx-3 hidden text-ink-400 sm:inline">
                    ·
                  </span>
                ) : null}
                <Link
                  href={path.href}
                  className="inline-flex min-h-11 items-center text-center font-sans text-sm font-semibold text-ink-700 transition-colors hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-400 focus-visible:ring-offset-2"
                >
                  {path.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
