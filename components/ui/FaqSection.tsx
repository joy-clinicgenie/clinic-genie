import { Container } from "@/components/ui/Container";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

export function FaqSection({
  items,
  title = "Frequently asked questions",
  subtitle = "Here are some common questions about our services to help you understand better.",
  id,
  className,
  idPrefix,
}: {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
  idPrefix?: string;
}) {
  if (!items.length) return null;

  return (
    <Section tone="light" id={id} className={cn("bg-cg-teal-5", className)}>
      <Container size="content" className="flex flex-col gap-10 md:gap-14">
        <header className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="font-display text-h2 text-balance text-cg-teal-40">{title}</h2>
          {subtitle ? (
            <p className="max-w-xl text-body text-pretty text-ink-700">{subtitle}</p>
          ) : null}
        </header>

        <FaqAccordion items={items} idPrefix={idPrefix} />
      </Container>
    </Section>
  );
}
