"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Orb from "@/components/Orb";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleCluster } from "@/components/ui/SparkleCluster";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { SpecialistIcon } from "@/components/home/landing/SpecialistIcons";
import { SPECIALTY_HUBS, getSpecialtyHubHref } from "@/lib/data/specialty-hubs";
import styles from "./SpecialistClinicsOrb.module.css";

export interface SpecialistSpot {
  id: string;
  name: string;
  highlight: string;
  href: string;
  /** Position inside orb, 0–100% */
  x: number;
  y: number;
}

const GOLDEN_RAD = (137.508 * Math.PI) / 180;

/** Loose golden spiral — ordered flow without a rigid grid */
function specialistPosition(index: number, total: number): { x: number; y: number } {
  const angle = index * GOLDEN_RAD - Math.PI / 2 + 0.45;
  const radius = 25 + (index / total) * 13 + (index % 3) * 1.6;
  const jx = ((index * 11 + 7) % 9) - 4;
  const jy = ((index * 13 + 5) % 9) - 4;
  return {
    x: Math.round((50 + Math.cos(angle) * radius + jx * 0.34) * 10) / 10,
    y: Math.round((50 + Math.sin(angle) * radius * 0.93 + jy * 0.34) * 10) / 10,
  };
}

const SPECIALIST_DATA: Omit<SpecialistSpot, "x" | "y">[] = SPECIALTY_HUBS.map((hub) => ({
  id: hub.id,
  name: hub.name,
  highlight: hub.highlight,
  href: getSpecialtyHubHref(hub),
}));

const SPECIALISTS: SpecialistSpot[] = SPECIALIST_DATA.map((specialist, index) => ({
  ...specialist,
  ...specialistPosition(index, SPECIALIST_DATA.length),
}));

/** Seeded ambient sparkles — dimmer, non-interactive, drift inside inner orb */
const AMBIENT_SPARKLES = Array.from({ length: 28 }, (_, i) => {
  const startAngle = (i * 137.508) % 360;
  const radiusPct = 9 + (((i * 17) % 13) / 13) * 27;
  return {
    id: `spark-${i}`,
    orbitRadius: `${radiusPct}%`,
    startAngle: `${startAngle}deg`,
    duration: `${14 + (i % 8) * 2.1}s`,
    delay: `${-((i * 0.63) % 12)}s`,
    reverse: i % 3 === 0,
    size: 6 + (i % 4),
    twinkleDelay: `${(i % 7) * 0.35}s`,
  };
});

function getHighlightPlacement(x: number, y: number) {
  if (y < 44) return styles.highlightBelow;
  if (y > 56) return styles.highlightAbove;
  if (x < 44) return styles.highlightRight;
  if (x > 56) return styles.highlightLeft;
  return styles.highlightBelow;
}

export function SpecialistClinicsOrb() {
  const [orbActiveId, setOrbActiveId] = useState<string | null>(null);

  return (
    <div className={styles.wrap}>
      <div className={styles.orbCenter}>
        <div className={styles.orbShell}>
          <div className={cn(styles.orbVisual, "motion-safe:animate-orb-bob")} aria-hidden="true">
            <Orb
              hue={0}
              hoverIntensity={0}
              rotateOnHover={false}
              forceHoverState={false}
              backgroundColor="transparent"
            />
            <div className={styles.sparkLayer}>
              {AMBIENT_SPARKLES.map((spark) => (
                <span
                  key={spark.id}
                  className={cn(styles.sparkOrbit, spark.reverse && styles.sparkOrbitReverse)}
                  style={{
                    ["--orbit-start" as string]: spark.startAngle,
                    ["--orbit-r" as string]: spark.orbitRadius,
                    animationDuration: spark.duration,
                    animationDelay: spark.delay,
                  }}
                >
                  <span
                    className={styles.sparkDim}
                    style={{
                      width: spark.size,
                      height: spark.size,
                      animationDelay: spark.twinkleDelay,
                    }}
                  >
                    <SparkleCluster glow className="h-full w-full text-[#78e2dd]" />
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div
            className={styles.hotspots}
            role="presentation"
            onMouseLeave={() => setOrbActiveId(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setOrbActiveId(null);
              }
            }}
          >
            {SPECIALISTS.map((specialist) => {
              const isActive = orbActiveId === specialist.id;
              return (
                <div
                  key={specialist.id}
                  className={styles.hotspotWrap}
                  style={{ left: `${specialist.x}%`, top: `${specialist.y}%` }}
                >
                  <button
                    type="button"
                    className={cn(styles.hotspot, isActive && styles.hotspotActive)}
                    aria-pressed={isActive}
                    onMouseEnter={() => setOrbActiveId(specialist.id)}
                    onFocus={() => setOrbActiveId(specialist.id)}
                  >
                    {isActive ? (
                      <span className={styles.hotspotIcon}>
                        <SpecialistIcon id={specialist.id} className="h-5 w-5" />
                      </span>
                    ) : (
                      <span className={styles.hotspotSparkle}>
                        <SparkleCluster glow className="h-full w-full" />
                      </span>
                    )}
                    <span className={styles.hotspotGlow} aria-hidden="true" />
                    <span className="sr-only">
                      {specialist.name}. {specialist.highlight}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        key="highlight"
                        className={cn(
                          styles.hotspotHighlightWrap,
                          getHighlightPlacement(specialist.x, specialist.y),
                        )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.18, ease: ease.outSoft } }}
                        transition={{ duration: 0.2, ease: ease.glide }}
                      >
                        <span className={styles.hotspotHighlight}>{specialist.highlight}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.specialistGrid} aria-label="Specialist clinic categories">
        {SPECIALISTS.map((specialist) => (
          <Link
            key={specialist.id}
            href={specialist.href}
            className={cn(
              styles.specialistBox,
              orbActiveId === specialist.id && styles.specialistBoxActive,
            )}
          >
            <span className={styles.specialistIconWell} aria-hidden="true">
              <SpecialistIcon id={specialist.id} />
            </span>
            <span className={styles.specialistName}>{specialist.name}</span>
          </Link>
        ))}
      </div>

      <div className={styles.ctaBlock}>
        <p className={styles.ctaNote}>
          Your specialty not listed? The magic still works.
          <br />
          If patients search for it, we can help them find you.
        </p>
        <MagneticButton href="/portfolio" size="lg" withMiniOrb className={styles.cta}>
          See Our Granted Wishes
        </MagneticButton>
      </div>
    </div>
  );
}
