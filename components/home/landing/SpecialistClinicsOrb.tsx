"use client";

import { useId, useState } from "react";
import Orb from "@/components/Orb";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import styles from "./SpecialistClinicsOrb.module.css";

export interface SpecialistSpot {
  id: string;
  name: string;
  description: string;
  /** Position inside orb, 0–100% */
  x: number;
  y: number;
}

interface ClientTestimonial {
  quote: string;
  author: string;
  clinic: string;
}

const CLIENT_TESTIMONIALS: Record<string, ClientTestimonial> = {
  endocrinology: {
    quote:
      "Patients searching for thyroid and diabetes care now find us first. The strategy felt clinical, not salesy.",
    author: "Medical Director",
    clinic: "Cedar Endocrine Clinic",
  },
  cardiology: {
    quote:
      "Our cardiac clinic finally shows up where anxious patients are comparing specialists. Enquiries are warmer and better qualified.",
    author: "Clinic Manager",
    clinic: "Sunrise Heart Clinic",
  },
  dermatology: {
    quote: "Our website finally feels as considered as our care. Patients notice.",
    author: "Medical Director",
    clinic: "The Aesthetics Clinic",
  },
  dental: {
    quote: "For the first time, I know exactly what every marketing dollar brings back.",
    author: "Principal Dentist",
    clinic: "Lumière Dental",
  },
  ophthalmology: {
    quote:
      "LASIK and retina patients compare clinics closely online. Clinic Genie helped us look trustworthy before the first consult.",
    author: "Founder",
    clinic: "Straits Eye Centre",
  },
  paediatrics: {
    quote:
      "Parents need reassurance fast. Our content and search presence now answer their questions before they call.",
    author: "Practice Lead",
    clinic: "Clementi Family & Aesthetic Clinic",
  },
  acne: {
    quote:
      "Clinic Genie made us look like we'd been around for years — in months. The bookings speak for themselves.",
    author: "Founder",
    clinic: "The Acne Clinic",
  },
  neurology: {
    quote:
      "Patients arrive already informed and confident. That changes the whole consultation.",
    author: "Consultant Surgeon",
    clinic: "Orchard Orthopaedics",
  },
  "aquatic-physio": {
    quote:
      "A niche rehab specialty needs clear positioning. We now rank for the searches that actually convert.",
    author: "Clinical Director",
    clinic: "Aquatic Physiotherapy Centre",
  },
};

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

const SPECIALIST_DATA: Omit<SpecialistSpot, "x" | "y">[] = [
  {
    id: "endocrinology",
    name: "Endocrinology",
    description: "For diabetes, thyroid, hormonal, and metabolic care clinics.",
  },
  {
    id: "cardiology",
    name: "Cardiology",
    description: "For heart specialists and cardiac clinics.",
  },
  {
    id: "dermatology",
    name: "Aesthetic and Dermatology",
    description: "For skin, aesthetic, laser, and procedure-led clinics.",
  },
  {
    id: "dental",
    name: "Dental and Orthodontics",
    description: "For dental, implant, oral surgery, and orthodontic practices.",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    description: "For eye care, LASIK, and retina clinics where patients compare specialists closely.",
  },
  {
    id: "paediatrics",
    name: "Paediatrics",
    description: "For children's clinics and parent-focused care.",
  },
  {
    id: "acne",
    name: "Acne Specialist",
    description: "For acne-focused clinics and skin confidence journeys.",
  },
  {
    id: "neurology",
    name: "Neurology and Neurosurgery",
    description: "For brain, spine, nerve, and pain-related specialist care.",
  },
  {
    id: "aquatic-physio",
    name: "Aquatic Physiotherapy",
    description: "For aquatic physiotherapy and rehabilitation clinics.",
  },
];

const SPECIALISTS: SpecialistSpot[] = SPECIALIST_DATA.map((specialist, index) => ({
  ...specialist,
  ...specialistPosition(index, SPECIALIST_DATA.length),
}));

function SparkleCluster({ className }: { className?: string }) {
  return <span className={cn(styles.sparkleCluster, className)} aria-hidden="true" />;
}

function getTestimonialAnchor(x: number, y: number) {
  const dx = x - 50;
  const dy = y - 50;
  const length = Math.hypot(dx, dy) || 1;
  const nx = dx / length;
  const ny = dy / length;
  return {
    left: `${x}%`,
    top: `${y}%`,
    ["--offset-x" as string]: `${nx * 6.5}rem`,
    ["--offset-y" as string]: `${ny * 6.5}rem`,
  };
}

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

export function SpecialistClinicsOrb() {
  const [activeId, setActiveId] = useState<string>(SPECIALISTS[0].id);
  const [orbHovered, setOrbHovered] = useState(false);
  const testimonialId = useId();
  const activeSpecialist = SPECIALISTS.find((specialist) => specialist.id === activeId) ?? SPECIALISTS[0];
  const activeTestimonial = CLIENT_TESTIMONIALS[activeId];
  const testimonialAnchor = getTestimonialAnchor(activeSpecialist.x, activeSpecialist.y);

  return (
    <div className={styles.wrap}>
      <div className={styles.orbRow}>
        <div
          className={styles.orbShell}
          onMouseEnter={() => setOrbHovered(true)}
          onMouseLeave={() => setOrbHovered(false)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setOrbHovered(false);
            }
          }}
        >
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
                  className={cn(styles.sparkDim, styles.sparkleCluster)}
                  style={{
                    width: spark.size,
                    height: spark.size,
                    animationDelay: spark.twinkleDelay,
                  }}
                />
              </span>
            ))}
          </div>
        </div>

        <div className={styles.hotspots} role="presentation">
          {SPECIALISTS.map((specialist) => {
            const isActive = activeId === specialist.id;
            return (
              <div
                key={specialist.id}
                className={styles.hotspotWrap}
                style={{ left: `${specialist.x}%`, top: `${specialist.y}%` }}
              >
                <button
                  type="button"
                  className={cn(styles.hotspot, isActive && styles.hotspotActive)}
                  aria-expanded={isActive}
                  aria-describedby={orbHovered ? testimonialId : undefined}
                  onMouseEnter={() => setActiveId(specialist.id)}
                  onFocus={() => {
                    setOrbHovered(true);
                    setActiveId(specialist.id);
                  }}
                >
                  <span className={styles.hotspotSparkle}>
                    <SparkleCluster />
                  </span>
                  <span className={styles.hotspotGlow} aria-hidden="true" />
                  <span className="sr-only">{specialist.name}</span>
                </button>
              </div>
            );
          })}
        </div>

        {orbHovered && (
          <aside
            id={testimonialId}
            className={cn(styles.testimonialPanel, styles.testimonialPanelOpen)}
            style={testimonialAnchor}
            aria-live="polite"
            aria-atomic="true"
          >
            <blockquote className={styles.testimonialQuote}>
              <p>&ldquo;{activeTestimonial.quote}&rdquo;</p>
            </blockquote>
            <footer className={styles.testimonialMeta}>
              <cite className={styles.testimonialAuthor}>{activeTestimonial.author}</cite>
              <span className={styles.testimonialClinic}>{activeTestimonial.clinic}</span>
            </footer>
          </aside>
        )}
      </div>

      <aside className={cn(styles.specialistPanel, styles.specialistPanelRevealed)} aria-label="Specialist clinic categories">
        <ul className={styles.specialistList}>
          {SPECIALISTS.map((specialist) => {
            const isActive = activeId === specialist.id;
            return (
              <li key={specialist.id}>
                <button
                  type="button"
                  className={cn(styles.specialistItem, isActive && styles.specialistItemActive)}
                  onMouseEnter={() => setActiveId(specialist.id)}
                  onFocus={() => setActiveId(specialist.id)}
                >
                  <span className={styles.specialistSparkle}>
                    <SparkleCluster />
                  </span>
                  <span className={styles.specialistCopy}>
                    <span className={styles.specialistName}>{specialist.name}</span>
                    <span className={styles.specialistDesc}>{specialist.description}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
      </div>

      <div className={styles.ctaBlock}>
        <p className={styles.ctaNote}>
          Your specialty not listed? The magic still works. If patients search for it, we can help them find you.
        </p>
        <MagneticButton href="/portfolio" size="lg" withMiniOrb className={styles.cta}>
          See Our Granted Wishes
        </MagneticButton>
      </div>
    </div>
  );
}
