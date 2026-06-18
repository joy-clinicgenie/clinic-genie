import Image from "next/image";
import { COMPLIANCE_CARDS } from "@/lib/data/compliance-cards";
import { cn } from "@/lib/cn";

export function ComplianceCards({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3">
      {COMPLIANCE_CARDS.map((card) => (
        <div
          key={card.title}
          className={cn(
            "flex h-full min-w-0 flex-col items-center rounded-xl px-2 py-4 text-center sm:rounded-2xl sm:px-3 sm:py-5",
            isDark ? "glass" : "glass-light"
          )}
        >
          <Image
            src={card.image}
            alt={card.alt}
            width={48}
            height={48}
            className="mb-2 h-8 w-8 shrink-0 object-contain sm:mb-3 sm:h-10 sm:w-10"
          />
          <h3
            className={cn(
              "font-display text-[0.6875rem] font-semibold leading-snug sm:text-xs",
              isDark ? "text-white" : "text-ink-900"
            )}
          >
            {card.title}
          </h3>
          <p
            className={cn(
              "mt-1.5 text-[0.625rem] leading-snug text-pretty sm:mt-2 sm:text-[0.6875rem] sm:leading-relaxed",
              isDark ? "text-[#C9E4EA]" : "text-[#7E8C92]"
            )}
          >
            {card.body}
          </p>
        </div>
      ))}
    </div>
  );
}
