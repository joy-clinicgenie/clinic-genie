import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleCluster } from "@/components/ui/SparkleCluster";
import { Reveal } from "@/components/ui/Reveal";
import { LandingHeading, LandingKicker } from "@/components/home/landing/LandingLayout";
import { cn } from "@/lib/cn";
import styles from "./ClinicGenieGap.module.css";

const ROWS = [
  {
    title: "Built for specialists",
    highlight: "specialists",
    body: "Marketing shaped around your specialty, never generic.",
    image: "/about/specialist.svg",
  },
  {
    title: "Found everywhere patients look",
    highlight: "patients look",
    body: "Clear visibility across Google, AI search, and reviews.",
    image: "/about/found-everywhere.svg",
  },
  {
    title: "Magic with mechanics",
    highlight: "mechanics",
    body: "Creative spark, backed by real search data.",
    image: "/about/statistic.svg",
  },
] as const;

const CARD_TILT = [styles.cardTiltLeft, styles.cardTiltCenter, styles.cardTiltRight] as const;

function cardSparkleRng(seed: number) {
  const x = Math.sin(seed * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

function shuffleSeeded<T>(items: T[], seed: number) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(cardSparkleRng(seed + i * 1.7) * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildCardSparkles(cardIndex: number) {
  const count = 4 + Math.floor(cardSparkleRng(cardIndex + 11.3) * 4);
  const sparkles = Array.from({ length: count }, (_, i) => {
    const angle = cardSparkleRng(cardIndex * 17 + i * 4.1) * Math.PI * 2;
    const radius = 44 + cardSparkleRng(cardIndex * 9 + i * 2.9) * 16;
    const xPct = 50 + Math.cos(angle) * radius;
    const yPct = 50 + Math.sin(angle) * radius;

    return {
      id: `${cardIndex}-${i}`,
      x: `${xPct.toFixed(2)}%`,
      y: `${yPct.toFixed(2)}%`,
      size: `${(9 + Math.floor(cardSparkleRng(cardIndex + i * 1.3) * 4)).toFixed(0)}px`,
      delay: `${(cardSparkleRng(cardIndex * 23 + i * 3.1) * 3.6).toFixed(2)}s`,
      duration: `${(2.6 + cardSparkleRng(cardIndex + i * 5.7) * 1.8).toFixed(2)}s`,
    };
  });

  return shuffleSeeded(sparkles, cardIndex * 31.7);
}

const CARD_SPARKLE_SETS = ROWS.map((_, index) => buildCardSparkles(index));

function CardTitle({ title, highlight }: { title: string; highlight: string }) {
  if (!title.includes(highlight)) {
    return title;
  }

  const [before, ...rest] = title.split(highlight);
  const after = rest.join(highlight);

  return (
    <>
      {before}
      <span className="genie-text">{highlight}</span>
      {after}
    </>
  );
}

export function ClinicGenieGap() {
  return (
    <section id="gap" data-nav-theme="light" className={styles.section}>
      <div className="mx-auto w-full max-w-wide px-[var(--page-pad)]">
        <Reveal>
          <header className={styles.header}>
            <LandingKicker>Meet your Clinic Genie</LandingKicker>
            <LandingHeading highlight="specialists" className="text-center">
              A Singapore clinic marketing agency built for specialists.
            </LandingHeading>
          </header>
        </Reveal>

        <ul className={styles.cardGrid}>
          {ROWS.map((row, index) => (
            <Reveal key={row.title} as="li" className={styles.cardItem} delay={index * 0.05}>
              <article className={cn("group", styles.card, CARD_TILT[index])}>
                <h3 className={styles.cardTitle}>
                  <CardTitle title={row.title} highlight={row.highlight} />
                </h3>
                <div className={styles.cardFooter}>
                  <p className={styles.cardBody}>{row.body}</p>
                  <div className={styles.cardGraphic}>
                    <div className={styles.cardGraphicCore}>
                      <Image
                        src={row.image}
                        alt=""
                        width={48}
                        height={48}
                        className={styles.cardIcon}
                      />
                    </div>
                    <div className={styles.cardSparkles} aria-hidden="true">
                      {CARD_SPARKLE_SETS[index].map((spark) => (
                        <span
                          key={spark.id}
                          className={styles.cardSparkle}
                          style={{
                            left: spark.x,
                            top: spark.y,
                            width: spark.size,
                            height: spark.size,
                            animationDelay: spark.delay,
                            animationDuration: spark.duration,
                          }}
                        >
                          <SparkleCluster glow className="h-full w-full" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
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
