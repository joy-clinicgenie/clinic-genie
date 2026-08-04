import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";

/** Shared bottom CTA + footer unit for pages without a custom finale. */
export function DefaultPageFinale({
  backdropClassName,
}: {
  backdropClassName?: string;
}) {
  return (
    <PageFinale backdropClassName={backdropClassName}>
      <PageFinaleCTA
        kicker="Make your first wish"
        title="What is your clinic's growth wish?"
        highlight="wish"
        body="Tell us about your clinic, your specialty, and the enquiries you want to attract."
        primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        secondaryCta={{ href: "/contact", label: "Send Your Wish to the Genie" }}
        footnote="No vague wishes. No confusing jargon. Just a clearer path to responsible clinic marketing."
      />
    </PageFinale>
  );
}
