import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { LightHero } from "@/components/ui/LightHero";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import type { CaseStudy } from "@/lib/data/portfolio";
import { CASE_STUDIES } from "@/lib/data/portfolio";

function SnapshotItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <dt>
        <Kicker>{label}</Kicker>
      </dt>
      <dd className="text-base text-ink-700">{value}</dd>
    </div>
  );
}

export function ProjectCaseStudy({
  study,
  backLink = { href: "/portfolio", label: "Our works" },
  showRelatedWorks = true,
}: {
  study: CaseStudy;
  backLink?: { href: string; label: string };
  showRelatedWorks?: boolean;
}) {
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <>
      <LightHero
        leading={<BackLink href={backLink.href} label={backLink.label} />}
        kicker={study.specialty}
        title={study.heroTitle}
        highlight={study.heroHighlight ?? "clearer clinic enquiry journey"}
        subtitle={study.heroSubtitle}
        showOrb={false}
        showWishForm={false}
      >
        <p className="max-w-2xl text-lead text-ink-700">{study.heroBody}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-lg font-semibold text-ink-900">{study.name}</span>
          {study.tagline && (
            <span className="font-display text-base text-genie-700">&ldquo;{study.tagline}&rdquo;</span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="glass-light inline-flex items-center rounded-pill border border-[#E6EEF1] bg-white px-4 py-2 text-sm font-medium text-ink-900 shadow-card"
            >
              {tag}
            </span>
          ))}
          <span className="inline-flex items-center rounded-pill border border-genie-200 bg-genie-50 px-4 py-2 text-sm font-medium text-genie-800">
            {study.result}
          </span>
        </div>
      </LightHero>

      <Section tone="light">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            kicker="Project snapshot"
            title="The brief at a glance"
            highlight="glance"
            tone="light"
          />
          <Reveal variant="up">
            <dl className="grid gap-8 sm:grid-cols-2">
              <SnapshotItem label="Clinic type" value={study.snapshot.clinicType} />
              <SnapshotItem label="Project focus" value={study.snapshot.projectFocus} />
              <SnapshotItem label="Main challenge" value={study.snapshot.mainChallenge} />
              <SnapshotItem label="Clinic Genie role" value={study.snapshot.role} />
            </dl>
          </Reveal>
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Before the work"
            title="What stood in the way"
            highlight="way"
            subtitle={
              study.beforeIntro ??
              "The starting point was familiar: patients could find the clinic online, but the path from discovery to enquiry needed clearer structure."
            }
          />
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {study.before.map((item) => (
              <RevealItem key={item.title} className="h-full">
                <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                  <h3 className="font-display text-h4 text-onDark">{item.title}</h3>
                  <p className="text-base text-onDark-muted">{item.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Clinic Genie diagnosis"
            title="Four lenses. One clearer picture"
            highlight="clearer picture"
            tone="light"
            subtitle={study.diagnosisIntro}
          />
          <Reveal variant="up">
            <p className="max-w-3xl text-lead text-ink-700">{study.diagnosisBody}</p>
          </Reveal>
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {study.diagnosisLenses.map((lens) => (
              <RevealItem key={lens.title} className="h-full">
                <GlassCard tone="light" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                  <h3 className="font-display text-h4 text-ink-900">{lens.title}</h3>
                  <p className="text-base text-ink-700">{lens.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="What we worked on"
            title="The work behind the clearer journey"
            highlight="clearer journey"
            subtitle={
              study.workedOnIntro ??
              "Each workstream supported the same goal: help patients move from search to understanding to enquiry with less friction."
            }
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {study.workedOn.map((item, i) => (
              <RevealItem key={item.title} className="h-full">
                <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold text-night-900"
                      style={{ background: study.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-h4 text-onDark">{item.title}</h3>
                  </div>
                  <p className="text-base text-onDark-muted">{item.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Strategy system"
            title="One connected patient discovery system."
            highlight="discovery system"
            tone="light"
            subtitle={study.strategyIntro}
          />
          {study.strategyBody ? (
            <Reveal variant="up">
              <p className="max-w-3xl text-lead text-ink-700">{study.strategyBody}</p>
            </Reveal>
          ) : null}
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {study.strategyShifts.map((shift) => (
              <RevealItem key={shift.before} className="h-full">
                <GlassCard tone="light" radius="xl" className="flex h-full flex-col gap-5 p-7">
                  <div className="flex flex-col gap-2">
                    <Kicker>Before</Kicker>
                    <p className="text-base text-ink-700">{shift.before}</p>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-[#E6EEF1] pt-5">
                    <Kicker>After</Kicker>
                    <p className="text-base font-medium text-ink-900">{shift.after}</p>
                  </div>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Patient journey map"
            title="From search to enquiry, mapped with intent."
            highlight="mapped with intent"
            subtitle={
              study.journeyIntro ??
              "The project reframed the clinic website as a guided patient journey, not a collection of disconnected pages."
            }
          />

          <Reveal variant="up">
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-h4 text-onDark">Patient journey flow</h3>
              <ol className="flex flex-wrap items-center gap-3" aria-label="Patient journey stages">
                {study.journey.flow.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-pill border border-[#E6EEF1] bg-white px-4 py-2 text-sm font-medium text-ink-900 shadow-card">
                      {step}
                    </span>
                    {i < study.journey.flow.length - 1 && (
                      <span aria-hidden="true" className="text-onDark-muted">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <RevealGroup className="grid gap-5 lg:grid-cols-2">
            <RevealItem className="h-full">
              <GlassCard tone="dark" radius="xl" className="flex h-full flex-col gap-5 p-7">
                <h3 className="font-display text-h4 text-onDark">Before / after website map</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Kicker>Old</Kicker>
                    <p className="text-base text-onDark-muted">
                      {Array.isArray(study.journey.websiteMap.old)
                        ? study.journey.websiteMap.old.join(" → ")
                        : study.journey.websiteMap.old}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-white/15 pt-4">
                    <Kicker>New</Kicker>
                    {Array.isArray(study.journey.websiteMap.new) ? (
                      <ol className="flex flex-col gap-2">
                        {study.journey.websiteMap.new.map((step) => (
                          <li key={step} className="text-base text-onDark">
                            {step}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-base text-onDark">{study.journey.websiteMap.new}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </RevealItem>
            <RevealItem className="h-full">
              <GlassCard tone="dark" radius="xl" className="flex h-full flex-col gap-5 p-7">
                <h3 className="font-display text-h4 text-onDark">Growth system</h3>
                <ul className="flex flex-wrap gap-2.5" aria-label="Growth system components">
                  {study.journey.growthSystem.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center rounded-pill border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-medium text-onDark"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Key deliverables"
            title={study.deliverablesTitle ?? "What the clinic received."}
            highlight={study.deliverablesHighlight ?? "received"}
            tone="light"
            subtitle={
              study.deliverablesIntro ??
              "Practical assets and systems designed to support clearer discovery, stronger trust, and better enquiry flow."
            }
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {study.deliverables.map((item) => (
              <RevealItem key={item} className="h-full">
                <GlassCard tone="light" radius="xl" className="flex h-full items-start gap-3 p-6">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: study.accent }}
                  />
                  <p className="text-base font-medium text-ink-900">{item}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="What changed"
            title={study.changesTitle ?? "Outcomes the clinic could measure"}
            highlight={study.changesHighlight ?? "measure"}
            tone="light"
            align="center"
            subtitle={
              study.changesIntro ??
              "Magic you can measure. Every figure sits within responsible healthcare marketing practice."
            }
          />
          <RevealGroup
            className={
              study.changes.length === 4
                ? "grid gap-5 sm:grid-cols-2"
                : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {study.changes.map((change) => (
              <RevealItem key={change.title} className="h-full">
                <GlassCard
                  tone="light"
                  radius="2xl"
                  hover
                  className="relative flex h-full flex-col justify-center overflow-hidden p-8 text-center"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
                    style={{ background: `${study.accent}33` }}
                  />
                  <span className="relative font-display text-h3 leading-tight text-ink-900">
                    {change.title}
                  </span>
                  {change.body ? (
                    <p className="relative mt-3 text-body leading-relaxed text-ink-700">
                      {change.body}
                    </p>
                  ) : null}
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {showRelatedWorks ? (
        <Section tone="dark">
          <Container className="flex flex-col gap-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                kicker="More works"
                title="Other clinic projects."
                highlight="projects"
              />
              <MagneticButton href="/portfolio" variant="ghost" tone="dark">
                See all works →
              </MagneticButton>
            </div>
            <RevealGroup className="grid gap-5 md:grid-cols-3">
              {others.map((o) => (
                <RevealItem key={o.slug} className="h-full">
                  <Link
                    href={`/portfolio/${o.slug}`}
                    className="group block h-full"
                    aria-label={`Read the ${o.name} project page`}
                  >
                    <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                      <span
                        aria-hidden="true"
                        className="h-1 w-10 rounded-full"
                        style={{ background: o.accent }}
                      />
                      <Kicker>{o.specialty}</Kicker>
                      <h3 className="font-display text-h3 text-onDark">{o.name}</h3>
                      <p className="text-sm text-onDark-muted">{o.line}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-genie-300 transition-colors group-hover:text-white">
                        View project
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </GlassCard>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Built for responsible healthcare marketing"
            title="Clarity without overclaiming"
            highlight="overclaiming"
            subtitle={
              study.complianceIntro ??
              "The work was designed to help patients understand the clinic while protecting the doctor's reputation and staying within healthcare advertising rules."
            }
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {study.compliancePoints.map((point) => (
              <RevealItem key={point.title} className="h-full">
                <GlassCard tone="dark" radius="xl" hover className="flex h-full flex-col gap-4 p-7">
                  <h3 className="font-display text-h4 text-onDark">{point.title}</h3>
                  <p className="text-base text-onDark-muted">{point.body}</p>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <PageFinale backdropClassName="bg-night-800">
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Want a clearer patient journey for your clinic?"
          highlight="clearer patient journey"
          body="Book a strategy call. We will map how patients find, understand, and enquire with your clinic, then show where Clinic Genie can help."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          secondaryCta={{ href: "/portfolio", label: "See Our Work" }}
          footnote="No obligation. No jargon. Just a clear next step."
        />
      </PageFinale>
    </>
  );
}
