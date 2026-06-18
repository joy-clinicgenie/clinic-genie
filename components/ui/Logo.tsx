import Link from "next/link";
import { cn } from "@/lib/cn";

export function Brandmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 63.66 63.66" className={className} aria-hidden="true">
      <g fill="currentColor">
        <polygon points="46.28 27.21 36.45 27.21 36.45 17.38 27.21 17.38 27.21 27.21 17.38 27.21 17.38 36.45 27.21 36.45 27.21 46.28 36.45 46.28 36.45 36.45 46.28 36.45 46.28 27.21" />
        <path d="M46.28,27.28h7.55s.02,4.14.02,4.14c0,12.21-9.99,22.53-22.2,22.43-12.02-.1-21.75-9.82-21.85-21.85-.1-12.21,10.22-22.2,22.43-22.2h21.59c10.17,0,9.83-9.81,9.83-9.81h-31.4C14.93,0,.18,14.17,0,31.49c-.19,17.85,14.32,32.36,32.17,32.17,17.32-.18,31.49-14.93,31.49-32.25v-14.03s-17.38,0-17.38,0v9.9Z" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  showWordmark?: boolean;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="Clinic Genie — home"
      className={cn("group inline-flex items-center", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/clinic-genie-logo.png"
        alt="Clinic Genie"
        width={235}
        height={50}
        className={cn(
          "h-9 w-auto object-contain transition-[opacity,filter] duration-ui group-hover:opacity-80",
          tone === "dark" && "brightness-0 invert"
        )}
        style={{ background: "transparent" }}
        fetchPriority="high"
      />
    </Link>
  );
}
