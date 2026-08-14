import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LightHero } from "@/components/ui/LightHero";
import { Footer } from "@/components/layout/Footer";

const HELPFUL_PATHS = [
  { label: "Explore Healthcare SEO and Services", href: "/services" },
  { label: "View Specialist Clinic Marketing", href: "/clinic-specialties" },
  { label: "See Selected Work", href: "/portfolio" },
  { label: "Read Clinic Marketing Insights", href: "/genie-tips" },
  { label: "Start a Conversation", href: "/contact" },
] as const;

export const metadata: Metadata = pageMetadata({
  title: "Page not found",
  description:
    "This page could not be found. Explore Clinic Genie services, selected work, and clinic marketing insights, or start a conversation.",
  index: false,
  follow: true,
});

export default function NotFound() {
  return (
    <>
      <LightHero
        contentOrder="childrenFirst"
        title="This page has vanished"
        subtitle="The page you were looking for has moved or never existed. We can point you back to firmer ground."
        primaryCta={{ href: "/", label: "Back to Home" }}
        secondaryCta={{ href: "/services", label: "Explore Services" }}
        showOrb={false}
        showWishForm={false}
        showSparkles={false}
        align="center"
        minHeight="min-h-[56vh]"
      >
        <p className="font-display text-[clamp(3rem,10vw,6rem)] font-bold leading-none text-balance">
          <span className="genie-text">404</span>
        </p>
      </LightHero>

      <Section tone="dark" className="bg-cg-teal-20 bg-none py-10 md:py-14">
        <Container>
          <nav aria-label="Helpful paths">
            <ul className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-y-2">
              {HELPFUL_PATHS.map((path, index) => (
                <li key={path.href} className="flex items-center">
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="mx-3 hidden text-onDark/40 sm:inline"
                    >
                      ·
                    </span>
                  ) : null}
                  <Link
                    href={path.href}
                    className="inline-flex min-h-11 items-center text-center font-sans text-sm font-semibold text-onDark transition-colors hover:text-cg-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-onDark/70 focus-visible:ring-offset-2 focus-visible:ring-offset-cg-teal-20"
                  >
                    {path.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <div className="bg-cg-teal-20">
        <div data-nav-theme="dark" className="finale-shell text-onDark">
          <div className="overflow-hidden rounded-[inherit]">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
