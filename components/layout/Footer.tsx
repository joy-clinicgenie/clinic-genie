import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MagicOrb } from "@/components/orb/MagicOrb";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PartnerStrip } from "@/components/ui/PartnerStrip";
import { NAV_ITEMS, PRIMARY_CTA, SITE } from "@/lib/data/nav";
import { FOOTER_SERVICES } from "@/lib/data/services";
import { PARTNERS } from "@/lib/data/partners";

const exploreLinks = [{ label: "Home", href: "/" }, ...NAV_ITEMS, { label: "Contact", href: "/contact" }];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/5 bg-night-950 pb-10 pt-16">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px hairline-glow opacity-70" />
      <Container size="wide" className="flex flex-col gap-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <MagicOrb variant="home" className="w-12 shrink-0" />
              <span className="font-display text-xl font-bold text-onDark">
                Clinic <span className="genie-text">Genie</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-onDark-muted">
              Strategies for specialist growth. Research. Data. Results.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-onDark-faint">{SITE.description}</p>
          </div>

          {/* Col 2 — Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-kicker uppercase text-genie-400">Explore</h3>
            <ul className="flex flex-col gap-2.5">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-sm text-onDark-muted hover:text-onDark">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — What we do */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-kicker uppercase text-genie-400">What we do</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_SERVICES.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="link-underline text-sm text-onDark-muted hover:text-onDark">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Get in touch */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-kicker uppercase text-genie-400">Get in touch</h3>
            <address className="flex flex-col gap-2 not-italic text-sm text-onDark-muted">
              <span>{SITE.address}</span>
              <a href={`mailto:${SITE.email}`} className="link-underline text-genie-300 hover:text-onDark">
                {SITE.email}
              </a>
              <span className="flex gap-3 pt-1">
                <a href={SITE.socials.facebook} className="hover:text-onDark" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                <a href={SITE.socials.instagram} className="hover:text-onDark" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href={SITE.socials.linkedin} className="hover:text-onDark" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </span>
            </address>
            <MagneticButton href={PRIMARY_CTA.href} size="sm" withMiniOrb>
              {PRIMARY_CTA.label}
            </MagneticButton>
          </div>
        </div>

        {/* Partner strip */}
        <div className="border-t border-white/5 pt-12">
          <PartnerStrip
            intro="In good company. We work alongside trusted specialists:"
            partners={PARTNERS}
          />
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-onDark-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Clinic Genie. All rights reserved. ·{" "}
            <Link href="/privacy" className="hover:text-onDark">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-onDark">
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
