import Image from "next/image";
import { COMPLIANCE_CARDS } from "@/lib/data/compliance-cards";
import { cn } from "@/lib/cn";

export function ComplianceCards({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
      {COMPLIANCE_CARDS.map((card) => (
        <div
          key={card.title}
          className={cn(
            "flex h-full flex-col overflow-hidden rounded-2xl",
            isDark ? "glass" : "glass-light"
          )}
        >
          <div
            aria-hidden="true"
            className={cn(
              "relative flex h-56 items-center justify-center",
              isDark
                ? "bg-gradient-to-br from-[#0F3A44] via-[#062D36] to-[#1A4F5D]"
                : "bg-gradient-to-br from-[#F7FAFB] via-white to-[#EAFBFB]"
            )}
          >
            <Image
              src={card.image}
              alt=""
              width={80}
              height={80}
              className="h-[6.4rem] w-[6.4rem] object-contain sm:h-[7.2rem] sm:w-[7.2rem]"
            />
          </div>
          <div className="flex flex-col gap-2 px-8 pb-8 pt-2 text-center">
            <h3
              className={cn(
                "font-display text-base font-semibold",
                isDark ? "text-white" : "text-ink-900"
              )}
            >
              {card.title}
            </h3>
            <p
              className={cn(
                "text-sm leading-relaxed text-pretty",
                isDark ? "text-[#C9E4EA]" : "text-[#7E8C92]"
              )}
            >
              {card.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
