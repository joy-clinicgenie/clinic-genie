import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleCluster } from "@/components/ui/SparkleCluster";
import { Reveal } from "@/components/ui/Reveal";
import { LandingBody, LandingHeading, LandingKicker } from "@/components/home/landing/LandingLayout";
import { cn } from "@/lib/cn";
import styles from "./GenieFeatureCards.module.css";

export interface GenieFeatureCardItem {
  title: string;
  highlight: string;
  body: string;
  image: string;
  href?: string;
}

export interface GenieFeatureCardsProps {
  id?: string;
  kicker: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  cards: GenieFeatureCardItem[];
  cta?: {
    href: string;
    label: string;
  };
}

const CARD_BACKGROUNDS = [styles.cardBgMint, styles.cardBgGray, styles.cardBgCyan] as const;

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

function FeatureCard({
  card,
  index,
  sparkles,
}: {
  card: GenieFeatureCardItem;
  index: number;
  sparkles: ReturnType<typeof buildCardSparkles>;
}) {
  const article = (
    <article className={cn("group", styles.card, CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length])}>
      <div className={styles.cardGraphic}>
        <div className={styles.cardGraphicCore}>
          <Image src={card.image} alt="" width={48} height={48} className={styles.cardIcon} />
        </div>
        <div className={styles.cardSparkles} aria-hidden="true">
          {sparkles.map((spark) => (
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
      <h3 className={styles.cardTitle}>
        <CardTitle title={card.title} highlight={card.highlight} />
      </h3>
      <p className={styles.cardBody}>{card.body}</p>
    </article>
  );

  if (card.href) {
    return (
      <Link
        href={card.href}
        className={styles.cardLink}
        aria-label={`${card.title}: ${card.body}`}
      >
        {article}
      </Link>
    );
  }

  return article;
}

export function GenieFeatureCards({
  id,
  kicker,
  title,
  highlight,
  subtitle,
  cards,
  cta,
}: GenieFeatureCardsProps) {
  return (
    <section id={id} data-nav-theme="light" className={styles.section}>
      <div className="mx-auto w-full max-w-wide px-[var(--page-pad)]">
        <Reveal>
          <header className={styles.header}>
            <LandingKicker>{kicker}</LandingKicker>
            <LandingHeading highlight={highlight} className="text-center">
              {title}
            </LandingHeading>
            {subtitle ? <LandingBody>{subtitle}</LandingBody> : null}
          </header>
        </Reveal>

        <ul className={styles.cardGrid}>
          {cards.map((card, index) => (
            <Reveal key={card.title} as="li" className={styles.cardItem} delay={index * 0.05}>
              <FeatureCard card={card} index={index} sparkles={buildCardSparkles(index)} />
            </Reveal>
          ))}
        </ul>

        {cta ? (
          <Reveal delay={0.08}>
            <div className={styles.footer}>
              <MagneticButton href={cta.href} size="lg" withMiniOrb>
                {cta.label}
              </MagneticButton>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
