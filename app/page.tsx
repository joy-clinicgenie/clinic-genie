import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatTrio } from "@/components/ui/StatTrio";
import { PillarCard } from "@/components/ui/PillarCard";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { PartnerStrip } from "@/components/ui/PartnerStrip";
import { Kicker } from "@/components/ui/Kicker";
import { PostCard } from "@/components/blog/PostCard";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { PILLARS, PROCESS_STEPS } from "@/lib/data/services";
import { PARTNERS } from "@/lib/data/partners";
import { POSTS } from "@/lib/data/posts";

const CLIENTS = [
  "The Acne Clinic",
  "The Aesthetics Clinic",
  "Stellaris Fertility",
  "Lumière Dental",
  "Orchard Orthopaedics",
];

const HOME_STATS = [
  { value: "3.4×", label: "average increase in qualified clinic enquiries" },
  { value: "Page 1", label: "Google rankings for high-intent treatment searches" },
  { value: "100%", label: "healthcare-only — we market clinics, nothing else" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 2 — Trust bar / social proof */}
      <Section tone="light">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <p className="text-center font-mono text-kicker uppercase text-genie-700">Clinics we&apos;ve helped grow</p>
          </Reveal>
          <RevealGroup className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {CLIENTS.map((c) => (
              <RevealItem key={c}>
                <span className="font-display text-lg font-semibold text-ink-700/70">{c}</span>
              </RevealItem>
            ))}
          </RevealGroup>
          <StatTrio stats={HOME_STATS} tone="light" />
        </Container>
      </Section>

      {/* 3 — The problem (empathy) */}
      <Section tone="dark">
        <OrbAnchor id="problem" mood="curious" scale={0.85} className="absolute right-[10%] top-1/2 hidden h-px w-px lg:block" />
        <Container className="max-w-prose">
          <SectionHeading
            kicker="The gap"
            title="Great medicine deserves to be found."
            highlight="found"
            as="h2"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lead text-onDark-muted">
              You trained for years to treat patients well. But online, the clinic that ranks first, loads fast, and reads
              as trustworthy often wins the booking — not always the best doctor. We close that gap. Clinic Genie turns
              your expertise into a digital presence patients can find, believe, and book — without crossing a single
              advertising-compliance line.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 4 — Three service pillars */}
      <Section tone="dark">
        <OrbAnchor id="pillars" mood="focus" scale={0.8} intensity={0.9} className="absolute left-1/2 top-24 h-px w-px -translate-x-1/2" />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="The three wishes we grant"
            title="Three kinds of magic, one growth engine."
            highlight="magic"
            subtitle="Strategy, growth and brand — woven together, never sold in isolation."
            align="center"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {PILLARS.map((p) => (
              <RevealItem key={p.id} className="h-full">
                <PillarCard number={p.number} title={p.title} blurb={p.blurb} href={p.href} accent={p.accent} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="flex justify-center">
            <MagneticButton href="/services" variant="secondary">
              Explore all services
            </MagneticButton>
          </Reveal>
        </Container>
      </Section>

      {/* 5 — 3-step process */}
      <Section tone="light">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            kicker="How the magic works"
            title="How we conjure growth — in three moves."
            highlight="conjure"
            tone="light"
            align="center"
          />
          <ProcessSteps steps={PROCESS_STEPS} tone="light" />
          <Reveal className="text-center">
            <p className="font-mono text-kicker uppercase text-genie-700">Research. Data. Results.</p>
          </Reveal>
        </Container>
      </Section>

      {/* 6 — Featured case study */}
      <Section tone="dark">
        <Container size="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <Kicker>Proof, not promises</Kicker>
              <h2 className="text-h2 font-display text-onDark">
                How The Acne Clinic <span className="genie-text">doubled</span> its qualified enquiries in 6 months.
              </h2>
              <p className="text-lead text-onDark-muted">
                A new aesthetics brand (&ldquo;Face it. Fix it.&rdquo;) needed to own competitive acne and scarring
                searches in Singapore. We rebuilt the site, published compliance-aware treatment content, and ran tightly
                targeted medical SEM.
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href="/portfolio/the-acne-clinic">Read the case study</MagneticButton>
                <MagneticButton href="/portfolio" variant="ghost">
                  See all works →
                </MagneticButton>
              </div>
            </div>
            <div className="relative">
              <OrbAnchor id="case" mood="celebrate" scale={0.7} className="absolute -right-6 -top-10 hidden h-px w-px lg:block" />
              <RevealGroup className="grid gap-4 sm:grid-cols-2">
                {["+118% organic traffic", "Page 1 for “acne scar treatment Singapore”", "2.1× consult bookings", "38% lower cost-per-enquiry"].map(
                  (chip) => (
                    <RevealItem key={chip}>
                      <GlassCard tone="dark" radius="lg" className="flex h-full items-center p-5">
                        <span className="text-base font-semibold text-onDark">{chip}</span>
                      </GlassCard>
                    </RevealItem>
                  )
                )}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7 — Compliance */}
      <Section tone="light">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            kicker="Compliance, handled"
            title="Marketing that respects the rules medicine runs on."
            highlight="respects"
            tone="light"
            subtitle="Healthcare advertising in Singapore has real limits — and a generalist agency can put your licence at risk. Because we work only with clinics, compliance-awareness is built into everything we write and ship, aligned with PHMC/HCSA advertising guidelines. Ambitious growth, responsibly delivered."
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Specialty-specific", "Compliance-aware copy", "Transparent reporting", "Singapore-based team"].map((item) => (
              <RevealItem key={item}>
                <div className="glass-light flex items-center gap-3 rounded-xl p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-genie-100 text-genie-700">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink-900">{item}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 8 — Partners */}
      <Section tone="dark">
        <OrbAnchor id="partners" mood="focus" scale={0.85} className="absolute left-1/2 top-20 h-px w-px -translate-x-1/2" />
        <Container className="flex flex-col gap-10">
          <SectionHeading
            kicker="Allies in the lamp"
            title="A genie with the right friends."
            highlight="friends"
            subtitle="When your wish needs a specialist, we bring the best in the room."
            align="center"
          />
          <PartnerStrip partners={PARTNERS} layout="satellite" />
        </Container>
      </Section>

      {/* 9 — Genie Tips preview */}
      <Section tone="light">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              kicker="Genie Tips"
              title="Clinic growth, demystified."
              highlight="demystified"
              tone="light"
              subtitle="Practical, no-fluff advice for clinic owners. Free wishes, basically."
            />
            <MagneticButton href="/genie-tips" variant="ghost" className="text-genie-700 hover:text-genie-900">
              Read Genie Tips →
            </MagneticButton>
          </div>
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {POSTS.slice(0, 3).map((post) => (
              <RevealItem key={post.slug} className="h-full">
                <PostCard post={post} tone="light" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 10 — Final CTA */}
      <Section tone="dark" className="overflow-hidden">
        <OrbAnchor id="cta" mood="celebrate" scale={1.1} intensity={1} className="absolute left-1/2 top-10 h-px w-px -translate-x-1/2" />
        <Container className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            kicker="Make your first wish"
            title="Ready to grant your clinic some growth?"
            highlight="growth"
            align="center"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-xl text-lead text-onDark-muted">
              Book a free 30-minute strategy call. We&apos;ll map where the right patients are searching — and exactly how
              to make your clinic the one they trust.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticButton href="/contact" size="lg" withMiniOrb>
              Book a strategy call
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-sm text-onDark-faint">No obligation. No jargon. Just a clear next step.</p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
