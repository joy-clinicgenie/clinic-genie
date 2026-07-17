import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/data/nav";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Specialty Hub", href: "/specialty-hub" },
  { label: "Our Works", href: "/portfolio" },
  { label: "Genie Tips", href: "/genie-tips", disabled: true },
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
      className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-onDark/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-onDark"
    >
      {children}
    </a>
  );
}

function SupportIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center text-onDark/60"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden surface-footer pb-10 pt-16 text-onDark lg:pb-12 lg:pt-20">
      <Container size="wide" className="flex flex-col gap-12 lg:gap-14">
        {/* Top — brand left | support + company right */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-24">
          <div className="flex max-w-md flex-col gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clinic-genie-logo.png"
              alt="Clinic Genie"
              width={235}
              height={50}
              className="h-8 w-auto self-start object-contain object-left brightness-0 invert"
            />
            <p className="font-sans text-sm leading-relaxed text-onDark/85">
              Strategies for specialist growth. Research. Data. Results.
            </p>
            <p className="font-sans text-sm leading-relaxed text-[#7FB5C2]">{SITE.description}</p>
          </div>

          <div className="grid w-full grid-cols-1 gap-12 sm:w-auto sm:grid-cols-2 sm:gap-16 lg:gap-20 xl:gap-24">
            <div className="flex w-full flex-col gap-5 sm:w-56">
              <h3 className="font-sans text-sm font-semibold text-onDark/55">Support</h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-start gap-3 font-sans text-sm text-onDark/80 transition-colors hover:text-onDark"
                  >
                    <SupportIcon>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                    </SupportIcon>
                    <span>{SITE.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 font-sans text-sm text-onDark/80">
                  <SupportIcon>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </SupportIcon>
                  <address className="not-italic">{SITE.address}</address>
                </li>
              </ul>
            </div>

            <nav aria-label="Company" className="flex w-full flex-col gap-5 sm:w-56">
              <h3 className="font-sans text-sm font-semibold text-onDark/55">Company</h3>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    {"disabled" in link && link.disabled ? (
                      <span
                        aria-disabled="true"
                        title="Coming soon"
                        className="cursor-default font-sans text-sm text-onDark/40"
                      >
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-onDark/80 transition-colors hover:text-onDark"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom — legal + compliance | follow us */}
        <div className="flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex max-w-xl flex-col gap-3">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-sm text-onDark/70">
              <Link href="/terms" className="transition-colors hover:text-onDark">
                Terms &amp; Conditions
              </Link>
              <span className="text-onDark/30" aria-hidden="true">
                |
              </span>
              <Link href="/terms" className="transition-colors hover:text-onDark">
                Privacy Policy
              </Link>
            </p>
            <p className="font-sans text-xs leading-relaxed text-onDark/50">
              We build healthcare marketing with advertising-compliance in mind, aligned to
              Singapore&apos;s PHMC/HCSA advertising guidelines.
            </p>
            <p className="font-sans text-xs text-onDark/40">
              © {new Date().getFullYear()} Clinic Genie. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-sans text-sm text-onDark/70">Follow us on</p>
              <div className="flex items-center gap-2" aria-label="Social media">
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
      </Container>
    </footer>
  );
}
