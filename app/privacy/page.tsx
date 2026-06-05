import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/data/nav";

export const metadata: Metadata = {
  title: "Privacy Policy | Clinic Genie",
  description:
    "How Clinic Genie collects, uses, stores and protects the personal data you share with us, in line with Singapore's Personal Data Protection Act (PDPA).",
};

const LAST_UPDATED = "5 June 2026";

export default function PrivacyPage() {
  return (
    <Section tone="light" className="pt-36">
      <Container size="prose" className="flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <h1 className="text-h1 font-display text-ink-900">Privacy Policy</h1>
          <p className="text-sm text-ink-700">Last updated: {LAST_UPDATED}</p>
        </header>

        <p className="text-lead text-ink-700">
          This Privacy Policy explains how {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or
          &ldquo;our&rdquo;) collects, uses, discloses and protects personal data when you visit our
          website at {SITE.url} or otherwise engage with our services. We are committed to handling
          your personal data responsibly and in accordance with Singapore&apos;s Personal Data
          Protection Act 2012 (the &ldquo;PDPA&rdquo;).
        </p>

        <div className="prose-reading flex flex-col gap-8 text-ink-700">
          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">1. Who we are</h2>
            <p>
              {SITE.name} is a Singapore-based creative and marketing agency working with private and
              specialist medical clinics. Our registered address is {SITE.address}. If you have any
              questions about this policy or how we handle your data, you can contact us at{" "}
              <a className="text-genie-700 underline-offset-4 hover:underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">2. Personal data we collect</h2>
            <p>
              We collect personal data that you provide to us directly — most commonly when you submit
              our contact or enquiry form, book a strategy call, or email us. This may include:
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-6">
              <li>Your name and the name of your clinic or organisation;</li>
              <li>Your email address and, if you choose to provide it, your phone number;</li>
              <li>Your clinic&apos;s specialty and the goals or challenges you describe to us;</li>
              <li>The contents of any message, brief or correspondence you send us; and</li>
              <li>
                Technical and usage information collected automatically, such as your IP address,
                browser type, device information, referring pages and how you interact with our site.
              </li>
            </ul>
            <p>
              We do not seek to collect patient health records or other sensitive medical data through
              this website. Please do not submit identifiable patient information via our forms.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">3. How we use your data</h2>
            <p>We use the personal data we collect to:</p>
            <ul className="flex list-disc flex-col gap-2 pl-6">
              <li>Respond to your enquiries and arrange and conduct strategy calls;</li>
              <li>Provide, manage and improve our services and any engagement you enter into with us;</li>
              <li>Communicate with you about your project, our services and relevant updates;</li>
              <li>Understand how our website is used so that we can improve it; and</li>
              <li>Comply with our legal and regulatory obligations.</li>
            </ul>
            <p>
              We process your data on the basis of your consent, to take steps at your request before
              entering into a contract, to perform a contract with you, and to pursue our legitimate
              business interests in a way that does not override your rights.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">4. Cookies and analytics</h2>
            <p>
              Our website uses cookies and similar technologies to operate correctly, remember your
              preferences and measure traffic. Some cookies are essential to the functioning of the
              site; others help us understand aggregate usage through analytics tools. You can control
              or disable cookies through your browser settings, although doing so may affect how some
              parts of the site work.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">5. Disclosure to third parties</h2>
            <p>
              We do not sell your personal data. We may share it with trusted service providers who
              support our operations — for example, website hosting, email, analytics and customer
              relationship tools — and only to the extent needed to perform those services on our
              behalf. Where we engage specialist partners to deliver part of an engagement, we share
              only what is necessary and require appropriate confidentiality. We may also disclose
              data where required by law or to protect our legal rights.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">6. Data retention and security</h2>
            <p>
              We retain personal data only for as long as is necessary to fulfil the purposes set out
              in this policy, to satisfy any legal, accounting or reporting requirements, or until you
              ask us to delete it. We apply reasonable administrative, technical and organisational
              measures to protect your data against unauthorised access, loss or misuse.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">7. Your rights</h2>
            <p>
              Under the PDPA, you may request access to the personal data we hold about you and ask us
              to correct it if it is inaccurate or incomplete. You may also withdraw your consent to
              our continued use of your data at any time. To make a request, please email us at{" "}
              <a className="text-genie-700 underline-offset-4 hover:underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              . We will respond within a reasonable time.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">8. External links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices or content of those sites, and we encourage you to review their
              respective privacy policies.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">9. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices
              or legal obligations. When we do, we will revise the &ldquo;last updated&rdquo; date at
              the top of this page. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">10. Contact us</h2>
            <p>
              If you have any questions, concerns or requests regarding this Privacy Policy or your
              personal data, please contact us at{" "}
              <a className="text-genie-700 underline-offset-4 hover:underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>{" "}
              or by post at {SITE.address}.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
