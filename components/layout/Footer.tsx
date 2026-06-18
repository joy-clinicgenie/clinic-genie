import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NAV_ITEMS, PRIMARY_CTA, SITE } from "@/lib/data/nav";

const exploreLinks = [{ label: "Home", href: "/" }, ...NAV_ITEMS, { label: "Contact Us", href: "/contact" }];

const whatWeDoLinks = [
  { label: "Service Pillars", href: "/services/core-pillars" },
  { label: "What's your wish", href: "/services" },
];

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/90 transition-colors hover:bg-white/20 hover:text-white"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0C323D] to-[#062D36] pb-10 pt-16 text-onDark">
      <div aria-hidden="true" className="hairline-glow absolute inset-x-0 top-0 h-px opacity-70" />
      <Container size="wide" className="flex flex-col gap-14">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_0.8fr_0.9fr_1.2fr]">
          {/* Col 1 — Brand */}
          <div className="flex flex-col items-start gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clinic-genie-logo.png"
              alt="Clinic Genie"
              width={235}
              height={50}
              className="h-8 w-auto self-start object-contain object-left brightness-0 invert"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/85">
              Strategies for specialist growth. Research. Data. Results.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-[#7FB5C2]">{SITE.description}</p>
          </div>

          {/* Col 2 — Explore */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-kicker uppercase tracking-[0.22em] text-[#9FDCE8]">Explore</h3>
            <ul className="flex flex-col gap-2.5">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-sm text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — What we do */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-kicker uppercase tracking-[0.22em] text-[#9FDCE8]">What we do</h3>
            <ul className="flex flex-col gap-2.5">
              {whatWeDoLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="link-underline text-sm text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Get in touch */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-kicker uppercase tracking-[0.22em] text-[#9FDCE8]">Get in touch</h3>
            <address className="flex flex-col gap-2 text-sm not-italic text-white/80">
              <span>{SITE.address}</span>
              <a href={`mailto:${SITE.email}`} className="link-underline w-fit text-[#9FDCE8] hover:text-white">
                {SITE.email}
              </a>
            </address>
            <div className="flex gap-3">
              <SocialIcon href={SITE.socials.facebook} label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-7h2.5l.5-3h-3V9.1c0-.9.3-1.6 1.7-1.6H16.6V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4V11H7.5v3h2.7v7h3.3z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={SITE.socials.instagram} label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
              <SocialIcon href={SITE.socials.linkedin} label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.5 8.8H3.6V20h2.9V8.8zM5 7.4a1.7 1.7 0 100-3.4 1.7 1.7 0 000 3.4zM20.4 13.9c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3.1 1.7V8.8H10.4V20h2.9v-5.8c0-1.5.7-2.4 2-2.4s1.9.9 1.9 2.4V20h3.2v-6.1z" />
                </svg>
              </SocialIcon>
            </div>
            <MagneticButton href={PRIMARY_CTA.href} size="sm" withMiniOrb className="w-fit">
              {PRIMARY_CTA.label}
            </MagneticButton>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>© 2026 Clinic Genie. All rights reserved</span>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
          </p>
          <p className="max-w-md sm:text-right">
            We build healthcare marketing with advertising-compliance in mind, aligned to Singapore&apos;s PHMC/HCSA
            advertising guidelines.
          </p>
        </div>
      </Container>
    </footer>
  );
}
