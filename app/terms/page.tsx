import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/data/nav";
import {
  TERMS_PRIVACY_DATES,
  TERMS_PRIVACY_SECTIONS,
  type LegalBlock,
} from "@/lib/data/terms-privacy";

export const metadata: Metadata = {
  title: "Terms & Privacy | Clinic Genie",
  description:
    "The terms and privacy provisions that apply when you use the Clinic Genie website, including how we collect, use, protect, and manage information shared with us.",
};

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.type === "h3") {
    return <h3 className="font-display text-lg text-ink-900">{block.text}</h3>;
  }
  if (block.type === "ul") {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-6">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.text.startsWith("Email:")) {
    return (
      <p>
        Email:{" "}
        <a className="text-genie-700 underline-offset-4 hover:underline" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
      </p>
    );
  }
  return <p>{block.text}</p>;
}

export default function TermsPage() {
  return (
    <Section tone="light" className="pt-36">
      <Container size="prose" className="flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <h1 className="text-h1 font-display text-ink-900">Terms &amp; Privacy</h1>
          <p className="text-sm text-ink-700">
            Effective date: {TERMS_PRIVACY_DATES.effective}
            <br />
            Last updated: {TERMS_PRIVACY_DATES.lastUpdated}
          </p>
        </header>

        <p className="text-lead text-ink-700">
          Welcome to Clinic Genie. This Terms &amp; Privacy page explains the terms that apply when you
          use our website, and how we collect, use, protect, and manage information shared with us.
        </p>
        <p className="text-ink-700">
          By accessing or using the Clinic Genie website, you agree to the terms set out on this page. If
          you do not agree with any part of these terms, please do not use this website.
        </p>

        <div className="prose-reading flex flex-col gap-8 text-ink-700">
          {TERMS_PRIVACY_SECTIONS.map((section) => (
            <section key={section.number} className="flex flex-col gap-3">
              <h2 className="text-h3 font-display text-ink-900">
                {section.number}. {section.title}
              </h2>
              {section.blocks.map((block, i) => (
                <LegalBlockView key={`${section.number}-${i}`} block={block} />
              ))}
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
