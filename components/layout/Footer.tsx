import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/data/nav";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Clinic Specialties", href: "/clinic-specialties" },
  { label: "Our Works", href: "/portfolio" },
  { label: "Genie Tips", href: "/genie-tips" },
  { label: "Contact", href: "/contact" },
] as const;

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-onDark/85 transition-colors hover:border-genie-400/50 hover:bg-white/10 hover:text-onDark"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden surface-footer pb-10 pt-14 text-onDark lg:pb-12 lg:pt-16">
      <Container size="wide" className="flex flex-col gap-10 lg:gap-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clinic-genie-logo.png"
              alt="Clinic Genie"
              width={235}
              height={50}
              className="h-8 w-auto self-start object-contain object-left brightness-0 invert"
            />
            <p className="max-w-sm font-sans text-base leading-relaxed text-onDark/90">
              Strategies for specialist growth.
              <br />
              Research. Data. Results.
            </p>
            <p className="font-display text-sm font-medium text-genie-300">
              Magic you can measure.
            </p>
            <Link
              href="/contact"
              className="mt-1 w-fit font-sans text-sm font-semibold text-onDark underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-genie-400"
            >
              Start a conversation
            </Link>
          </div>

          {/* Explore */}
          <nav aria-label="Company" className="lg:col-span-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-onDark/50">
              Explore
            </h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-base text-onDark/85 transition-colors hover:text-onDark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + social */}
          <div className="flex flex-col gap-8 lg:col-span-4">
            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-onDark/50">
                Contact
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-sans text-base text-onDark/85 transition-colors hover:text-onDark"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <address className="max-w-xs font-sans text-sm not-italic leading-relaxed text-onDark/70">
                    {SITE.address}
                  </address>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-onDark/50">
                Follow
              </h3>
              <div className="mt-4 flex items-center gap-2" aria-label="Social media">
                <SocialIcon href={SITE.socials.facebook} label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 21v-7h2.5l.5-3h-3V9.1c0-.9.3-1.6 1.7-1.6H16.6V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4V11H7.5v3h2.7v7h3.3z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href={SITE.socials.instagram} label="Instagram">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
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
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-sm text-onDark/65">
              <Link href="/terms" className="transition-colors hover:text-onDark">
                Terms &amp; Conditions
              </Link>
              <span className="text-onDark/25" aria-hidden="true">
                ·
              </span>
              <Link href="/terms" className="transition-colors hover:text-onDark">
                Privacy Policy
              </Link>
            </p>
            <span className="hidden text-onDark/25 sm:inline" aria-hidden="true">
              ·
            </span>
            <p className="font-sans text-xs leading-relaxed text-onDark/45 sm:max-w-md">
              Built with PHMC and HCSA advertising guidelines in mind.
            </p>
          </div>
          <p className="shrink-0 font-sans text-xs text-onDark/45 lg:text-right">
            © {new Date().getFullYear()} Clinic Genie
          </p>
        </div>
      </Container>
    </footer>
  );
}
