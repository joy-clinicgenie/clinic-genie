import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { LandingKicker } from "@/components/home/landing/LandingLayout";
import styles from "./ClinicGenieGap.module.css";

const ROWS = [
  {
    title: "Built for specialists",
    body: "Marketing shaped around your specialty, never generic.",
    graphic: "specialists" as const,
  },
  {
    title: "Found everywhere patients look",
    body: "Clear visibility across Google, AI search, and reviews.",
    graphic: "visibility" as const,
  },
  {
    title: "Magic with mechanics",
    body: "Creative spark, backed by real search data.",
    graphic: "mechanics" as const,
  },
];

function RowGraphic({ type }: { type: (typeof ROWS)[number]["graphic"] }) {
  const stroke = "#062D36";
  const muted = "#B8C5CA";

  if (type === "specialists") {
    return (
      <svg viewBox="0 0 96 96" fill="none" aria-hidden="true">
        <rect x="18" y="22" width="60" height="52" rx="8" stroke={stroke} strokeWidth="1.5" />
        <circle cx="48" cy="40" r="10" stroke={stroke} strokeWidth="1.5" />
        <path d="M34 62c4-8 24-8 28 0" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 34h8M58 34h8" stroke={muted} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "visibility") {
    return (
      <svg viewBox="0 0 96 96" fill="none" aria-hidden="true">
        <circle cx="48" cy="48" r="24" stroke={muted} strokeWidth="1.5" />
        <circle cx="48" cy="48" r="8" fill={stroke} />
        <path
          d="M48 24v8M48 64v8M24 48h8M64 48h8M30 30l6 6M60 60l6 6M66 30l-6 6M36 60l-6 6"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="22" y="54" width="10" height="18" rx="2" stroke={muted} strokeWidth="1.5" />
      <rect x="38" y="44" width="10" height="28" rx="2" stroke={stroke} strokeWidth="1.5" />
      <rect x="54" y="36" width="10" height="36" rx="2" stroke={stroke} strokeWidth="1.5" />
      <rect x="70" y="48" width="10" height="24" rx="2" stroke={muted} strokeWidth="1.5" />
      <path
        d="M28 28l8-8 8 4 10-10 6 6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="28" r="3" fill={stroke} />
    </svg>
  );
}

export function ClinicGenieGap() {
  return (
    <section id="gap" data-nav-theme="light" className={styles.section}>
      <div className="mx-auto w-full max-w-wide px-[var(--page-pad)]">
        <Reveal>
          <header className={styles.header}>
            <LandingKicker align="left">Meet your Clinic Genie</LandingKicker>
            <h2 className={styles.title}>
              A Singapore clinic marketing agency
              <br />
              <span className={styles.titleMuted}>built for specialists.</span>
            </h2>
          </header>
        </Reveal>

        <ul className={styles.list}>
          {ROWS.map((row, index) => (
            <Reveal key={row.title} as="li" className={styles.row} delay={index * 0.05}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.copy}>
                <h3 className={styles.rowTitle}>{row.title}</h3>
                <p className={styles.rowBody}>{row.body}</p>
              </div>
              <div className={styles.graphic}>
                <RowGraphic type={row.graphic} />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.08}>
          <div className={styles.footer}>
            <MagneticButton href="/meet-us" size="lg" withMiniOrb>
              Meet the Genies Behind the Magic
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
