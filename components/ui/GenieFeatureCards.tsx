import { MagneticButton } from "@/components/ui/MagneticButton";
import { FeatureInfoCard } from "@/components/ui/FeatureInfoCard";
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
  className?: string;
  headerClassName?: string;
  subtitleClassName?: string;
}

export function GenieFeatureCards({
  id,
  kicker,
  title,
  highlight,
  subtitle,
  cards,
  cta,
  className,
  headerClassName,
  subtitleClassName,
}: GenieFeatureCardsProps) {
  return (
    <section id={id} data-nav-theme="light" data-debug-section="feature-cards" className={cn(styles.section, className)}>
      <div className="mx-auto w-full max-w-wide px-[var(--page-pad)]">
        <Reveal>
          <header className={cn(styles.header, "max-w-2xl", headerClassName)}>
            <LandingKicker>{kicker}</LandingKicker>
            <LandingHeading highlight={highlight} className="text-center">
              {title}
            </LandingHeading>
            {subtitle ? (
              <LandingBody className={subtitleClassName}>{subtitle}</LandingBody>
            ) : null}
          </header>
        </Reveal>

        <ul className={styles.cardGrid}>
          {cards.map((card, index) => (
            <Reveal key={card.title} as="li" className={styles.cardItem} delay={index * 0.05}>
              <FeatureInfoCard
                title={card.title}
                highlight={card.highlight}
                body={card.body}
                image={card.image}
                alt=""
                href={card.href}
                showSparkles
                sparkleIndex={index}
                className="h-full"
              />
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
