import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { LightHero } from "@/components/ui/LightHero";
import { PageFinale } from "@/components/ui/PageFinale";
import {
  LandingKicker,
  LandingHeading,
} from "@/components/home/landing/LandingLayout";

const HELPFUL_PATHS = [
  {
    title: "Explore Our Services",
    body: "Healthcare SEO, medical SEM, clinic website design, content, AI search, and compliance-aware marketing.",
    href: "/services",
    cta: "Services overview",
  },
  {
    title: "View Specialist Clinic Marketing",
    body: "Explore growth systems built for endocrinology, dermatology, dental, cardiology, paediatrics, neurology, and rehabilitation clinics.",
    href: "/specialty-hub",
    cta: "Specialty hubs",
  },
  {
    title: "Read Genie Insights",
    body: "Practical thinking on clinic growth, healthcare SEO, AI search, website strategy, and patient decision journeys.",
    href: "/genie-tips",
    cta: "Blog hub",
  },
  {
    title: "See Selected Work",
    body: "View healthcare growth work and selected brand projects shaped around visibility, trust, and clearer digital journeys.",
    href: "/portfolio",
    cta: "Selected work",
  },
  {
    title: "Learn About Compliance",
    body: "Understand how Clinic Genie approaches responsible healthcare marketing in Singapore.",
    href: "/services#compliance",
    cta: "Compliance guide",
  },
  {
    title: "Contact Clinic Genie",
    body: "Start a focused conversation about your clinic, your goals, and the enquiries you want to attract.",
    href: "/contact",
    cta: "Contact and booking",
  },
];

export default function NotFound() {
  return (
    <>
      <LightHero
        contentOrder="childrenFirst"
        title="This wish slipped through the lamp."
        subtitle="The page you were looking for has vanished, moved, or never quite existed. Even a genie can't conjure a page from thin air. But we can point you back to firmer ground."
        primaryCta={{ href: "/", label: "Back to Home" }}
        secondaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        showWishForm={false}
        align="center"
        minHeight="min-h-[72vh]"
      >
        <p className="font-display text-[clamp(4rem,16vw,9rem)] font-bold leading-none text-balance">
          <span className="genie-text">404</span>
        </p>
      </LightHero>

      <PageFinale>
        <section className="pb-24 pt-16">
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <LandingKicker light>Helpful paths</LandingKicker>
              <LandingHeading highlight="specific" light>
                Lost something specific?
              </LandingHeading>
            </div>
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HELPFUL_PATHS.map((path) => (
                <RevealItem key={path.href} className="h-full">
                  <Link href={path.href} className="group block h-full" aria-label={path.title}>
                    <GlassCard tone="dark" radius="2xl" hover className="flex h-full flex-col gap-4 p-7">
                      <h3 className="font-display text-h3 text-onDark transition-colors group-hover:text-white">
                        {path.title}
                      </h3>
                      <p className="flex-1 text-pretty text-sm text-onDark-muted">{path.body}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-genie-200 transition-colors group-hover:text-white">
                        {path.cta}
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
        </section>
      </PageFinale>
    </>
  );
}
