import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
import { cn } from "@/lib/cn";
import {
  SPECIALTY_CATEGORIES,
  getSpecialtyCategoryItemHref,
  getSpecialtyCategoryItems,
} from "@/lib/data/specialty-hubs";
import styles from "./SpecialistClinicsOrb.module.css";

/** Soft journey-map wash for specialist clinic sections. */
export function SpecialistClinicsBackdrop() {
  return (
    <ParallaxBackground
      src={{
        mobile: "/specialties/healthcare-journey-map-mobile.png",
        desktop: "/specialties/healthcare-journey-map.png",
      }}
      opacity={0.2}
    />
  );
}

export function SpecialistClinicsOrb() {
  return (
    <div className={styles.wrap}>
      <div className={styles.contentBand}>
        <div className={styles.categoryGrid} aria-label="Specialist clinic categories">
          {SPECIALTY_CATEGORIES.map((category) => {
            const items = getSpecialtyCategoryItems(category);

            return (
              <section key={category.id} className={styles.categoryBlock}>
                <h3 className={styles.categoryTitle}>{category.name}</h3>
                {items.length > 0 ? (
                  <ul className={styles.specialistList}>
                    {items.map((item) => {
                      const href = getSpecialtyCategoryItemHref(item);
                      const content = (
                        <>
                          <span className={styles.specialistName}>{item.name}</span>
                          {href ? (
                            <span className={styles.specialistArrow} aria-hidden="true">
                              →
                            </span>
                          ) : null}
                        </>
                      );

                      return (
                        <li key={`${category.id}-${item.name}`}>
                          {href ? (
                            <Link href={href} className={styles.specialistBox}>
                              {content}
                            </Link>
                          ) : (
                            <span
                              className={cn(styles.specialistBox, styles.specialistBoxStatic)}
                            >
                              {content}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className={styles.categoryEmpty}>Coming soon</p>
                )}
              </section>
            );
          })}
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
    </div>
  );
}
