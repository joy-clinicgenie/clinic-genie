import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";
import { GlassCard } from "@/components/ui/GlassCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SparkleField } from "@/components/ui/SparkleField";
import { MagicOrb } from "@/components/orb/MagicOrb";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_FAQS } from "@/lib/data/faqs";
import { SITE } from "@/lib/data/nav";

export const metadata: Metadata = {
  title: "Contact — Book a Strategy Call",
  description:
    "Rub the lamp and let's grow your clinic. Book a free 30-minute strategy call, or send us a note — we reply within one business day. Singapore's clinic-only marketing genie.",
  alternates: { canonical: "/contact" },
};

const SOCIALS = [
  { label: "Facebook", href: SITE.socials.facebook },
  { label: "Instagram", href: SITE.socials.instagram },
  { label: "LinkedIn", href: SITE.socials.linkedin },
];

const MAP_EMBED =
  "https://www.google.com/maps?q=164+Bukit+Merah+Central+Singapore+150164&output=embed";

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-genie-300">{label}</span>
      <div className="text-base text-onDark">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-aurora-hero pb-20 pt-36">
        <SparkleField density={38} parallax />
        <OrbAnchor
          id="contact-hero"
          variant="contact"
          mood="curious"
          scale={1}
          intensity={0.9}
          className="absolute left-1/2 top-[14%] h-px w-px -translate-x-1/2 lg:left-auto lg:right-[12%] lg:top-1/2 lg:translate-x-0"
        />
        <Container size="wide" className="relative z-10">
          <div className="flex max-w-3xl flex-col gap-6 pt-16 lg:pt-0">
            <Reveal variant="up">
              <Kicker>Let&apos;s talk</Kicker>
            </Reveal>
            <SectionHeading
              as="h1"
              title="Rub the lamp. Let's grow your clinic."
              highlight="grow"
              className="gap-5"
            />
            <Reveal variant="up" delay={0.12}>
              <p className="max-w-xl text-lead text-onDark-muted">
                Book a free 30-minute strategy call, or send us a note. We&apos;ll map where the right patients are
                searching — and how to make your clinic the one they trust.
              </p>
            </Reveal>
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
        />
      </section>

      {/* 2 — Form + contact details */}
      <Section tone="dark">
        <OrbAnchor
          id="contact-form"
          mood="thinking"
          scale={0.95}
          intensity={0.9}
          className="absolute left-1/2 top-16 hidden h-px w-px -translate-x-1/2 lg:block"
        />
        <Container size="wide">
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left — the form */}
            <Reveal variant="up" className="order-2 lg:order-1">
              <ContactForm />
            </Reveal>

            {/* Right — contact details + ambient orb */}
            <Reveal variant="up" delay={0.1} className="order-1 lg:order-2">
              <GlassCard tone="tint" radius="2xl" className="flex flex-col gap-7 p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <MagicOrb variant="contact" className="h-14 w-14 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-mono text-kicker uppercase text-genie-300">Find the genie</span>
                    <span className="font-display text-h4 text-onDark">{SITE.name}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <DetailRow label="Visit us">
                    <address className="not-italic leading-relaxed text-onDark-muted">{SITE.address}</address>
                  </DetailRow>

                  <DetailRow label="Email us">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="link-underline font-medium text-genie-200 hover:text-white"
                    >
                      {SITE.email}
                    </a>
                  </DetailRow>

                  <DetailRow label="Follow us">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      {SOCIALS.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-onDark-muted hover:text-white"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </DetailRow>

                  <DetailRow label="Response time">
                    <p className="text-onDark-muted">
                      We reply <span className="text-onDark">within one business day</span>.
                    </p>
                  </DetailRow>
                </div>

                {/* Map — Bukit Merah Central HQ */}
                <div className="overflow-hidden rounded-xl border border-white/10 shadow-glass-dark">
                  <iframe
                    title="Map to Clinic Genie at 164 Bukit Merah Central, Singapore"
                    src={MAP_EMBED}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-48 w-full grayscale-[0.2] contrast-110"
                  />
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3 — Mini FAQ */}
      <Section tone="dark">
        <OrbAnchor
          id="contact-faq"
          mood="curious"
          scale={0.85}
          intensity={0.8}
          className="absolute right-[8%] top-1/3 hidden h-px w-px lg:block"
        />
        <Container className="flex flex-col gap-10">
          <SectionHeading
            kicker="Before you wish"
            title="The questions clinic owners ask first."
            highlight="questions"
            align="center"
            subtitle="A few quick answers. Anything else, just ask — that's what the strategy call is for."
          />
          <div className="mx-auto w-full max-w-prose">
            <FaqAccordion items={CONTACT_FAQS} />
          </div>
        </Container>
      </Section>

      {/* 4 — Closing line */}
      <Section tone="dark" className="overflow-hidden">
        <OrbAnchor
          id="contact-close"
          mood="celebrate"
          scale={1.08}
          intensity={1}
          className="absolute left-1/2 top-12 h-px w-px -translate-x-1/2"
        />
        <Container className="flex flex-col items-center gap-4 text-center">
          <Reveal variant="up">
            <p className="font-mono text-kicker uppercase text-genie-300">A last word from the genie</p>
          </Reveal>
          <Reveal variant="up" delay={0.08}>
            <p className="mx-auto max-w-2xl text-balance font-display text-h3 text-onDark">
              Great medicine deserves to be found. Let&apos;s make sure <span className="genie-text">yours</span> is.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
