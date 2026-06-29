import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  SPECIALTY_CATEGORIES,
  getSpecialtyCategoryItems,
  getSpecialtyHubHref,
} from "@/lib/data/specialty-hubs";
import styles from "./SpecialistClinicsOrb.module.css";

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
                    {items.map((hub) => (
                      <li key={hub.id}>
                        <Link href={getSpecialtyHubHref(hub)} className={styles.specialistBox}>
                          <span className={styles.specialistName}>{hub.name}</span>
                          <span className={styles.specialistArrow} aria-hidden="true">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
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
