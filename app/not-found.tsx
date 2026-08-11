import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
import { LightHero } from "@/components/ui/LightHero";
import { DefaultPageFinale } from "@/components/ui/DefaultPageFinale";

const HELPFUL_PATHS = [
  {
    title: "Explore Our Services",
    body: "Healthcare SEO, medical SEM, clinic website design, content, AI search, and compliance-aware marketing.",
    href: "/services",
  },
  {
    title: "View Specialist Clinic Marketing",
    body: "Explore growth systems built for endocrinology, dermatology, dental, cardiology, paediatrics, neurology, and rehabilitation clinics.",
    href: "/clinic-specialties",
  },
  {
    title: "Read Genie Insights",
    body: "Practical thinking on clinic growth, healthcare SEO, AI search, website strategy, and patient decision journeys.",
    href: "/genie-tips",
  },
  {
    title: "See Selected Work",
    body: "View healthcare growth work and selected brand projects shaped around visibility, trust, and clearer digital journeys.",
    href: "/portfolio",
  },
  {
    title: "Learn About Compliance",
    body: "Understand how Clinic Genie approaches responsible healthcare marketing in Singapore.",
    href: "/services#compliance",
  },
  {
    title: "Contact Clinic Genie",
    body: "Start a focused conversation about your clinic, your goals, and the enquiries you want to attract.",
    href: "/contact",
  },
];

export default function NotFound() {
  return (
    <>
      <LightHero
        contentOrder="childrenFirst"
        title="This wish slipped through the lamp"
        subtitle="The page you were looking for has vanished, moved, or never quite existed. Even a genie can't conjure a page from thin air. But we can point you back to firmer ground."
        primaryCta={{ href: "/", label: "Back to Home" }}
        secondaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        showOrb={false}
        showWishForm={false}
        align="center"
        minHeight="min-h-[72vh]"
        copyClassName="max-w-4xl [&_p]:max-w-none"
      >
        <p className="font-display text-[clamp(4rem,16vw,9rem)] font-bold leading-none text-balance">
          <span className="genie-text">404</span>
        </p>
      </LightHero>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            kicker="Helpful paths"
            title="Lost something specific?"
            highlight="specific"
            tone="light"
            align="center"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HELPFUL_PATHS.map((path) => (
              <RevealItem key={path.href} className="h-full">
                <FeatureInfoCard
                  title={path.title}
                  body={path.body}
                  href={path.href}
                  ariaLabel={path.title}
                  className="h-full"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <DefaultPageFinale backdropClassName="surface-light" />
    </>
  );
}
