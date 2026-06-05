import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/data/nav";

export const metadata: Metadata = {
  title: "Terms of Use | Clinic Genie",
  description:
    "The terms and conditions governing your use of the Clinic Genie website, including intellectual property, acceptable use, liability and governing law.",
};

const LAST_UPDATED = "5 June 2026";

export default function TermsPage() {
  return (
    <Section tone="light" className="pt-36">
      <Container size="prose" className="flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <h1 className="text-h1 font-display text-ink-900">Terms of Use</h1>
          <p className="text-sm text-ink-700">Last updated: {LAST_UPDATED}</p>
        </header>

        <p className="text-lead text-ink-700">
          These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of the {SITE.name}{" "}
          website at {SITE.url} (the &ldquo;Site&rdquo;). By accessing or using the Site, you agree to
          be bound by these Terms. If you do not agree with them, please do not use the Site.
        </p>

        <div className="prose-reading flex flex-col gap-8 text-ink-700">
          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">1. About these Terms</h2>
            <p>
              The Site is operated by {SITE.name}, a Singapore-based creative and marketing agency with
              its address at {SITE.address}. References to &ldquo;we&rdquo;, &ldquo;us&rdquo; and
              &ldquo;our&rdquo; are to {SITE.name}. We may update these Terms from time to time, and
              your continued use of the Site after any change constitutes acceptance of the revised
              Terms.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">2. Use of the Site</h2>
            <p>
              You may use the Site for lawful purposes only. You agree not to:
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-6">
              <li>Use the Site in any way that breaches any applicable law or regulation;</li>
              <li>
                Attempt to gain unauthorised access to the Site, the server on which it is stored, or
                any connected server, computer or database;
              </li>
              <li>
                Introduce viruses, malware or any other material that is malicious or technologically
                harmful;
              </li>
              <li>
                Copy, scrape, reproduce, republish or redistribute any part of the Site except as
                expressly permitted by these Terms; or
              </li>
              <li>Use the Site in any manner that could damage, disable, overburden or impair it.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">3. Intellectual property</h2>
            <p>
              All content on the Site — including text, graphics, logos, the {SITE.name} name and
              brand, imagery, page layouts, code and design — is owned by or licensed to us and is
              protected by copyright, trademark and other intellectual property laws. You may view and
              download content for your own personal, non-commercial reference, but you may not
              reproduce, distribute, modify or create derivative works from it without our prior
              written consent.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">4. No professional advice</h2>
            <p>
              The information on the Site, including articles and guidance, is provided for general
              information only. It does not constitute legal, regulatory, medical or professional
              advice, and should not be relied upon as such. Any healthcare marketing should be
              reviewed against the applicable Singapore advertising guidelines for your specialty. You
              should obtain professional advice before acting on any information found on the Site.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">5. Links to other sites</h2>
            <p>
              The Site may contain links to third-party websites and resources. These links are
              provided for your convenience only. We have no control over the content of those sites
              and accept no responsibility for them or for any loss or damage that may arise from your
              use of them.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">6. Limitation of liability</h2>
            <p>
              The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To
              the fullest extent permitted by law, we exclude all warranties, express or implied,
              regarding the Site and its content. We will not be liable for any indirect, incidental,
              special or consequential loss, or for any loss of profits, revenue, data or goodwill,
              arising out of or in connection with your use of, or inability to use, the Site. Nothing
              in these Terms excludes or limits liability that cannot be excluded or limited under
              applicable law.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">7. Indemnity</h2>
            <p>
              You agree to indemnify and hold us harmless from any claims, losses, liabilities,
              damages, costs and expenses (including reasonable legal fees) arising from your breach of
              these Terms or your misuse of the Site.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">8. Governing law and jurisdiction</h2>
            <p>
              These Terms, and any dispute or claim arising out of or in connection with them or your
              use of the Site, are governed by and construed in accordance with the laws of Singapore.
              You agree to submit to the exclusive jurisdiction of the courts of Singapore.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-ink-900">9. Contact us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
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
