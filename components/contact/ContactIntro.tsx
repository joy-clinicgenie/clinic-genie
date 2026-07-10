import { SparkleCluster } from "@/components/ui/SparkleCluster";
import { CONTACT_BUILT_FOR } from "@/lib/data/contact";
import { BuiltForIcon } from "@/components/contact/BuiltForIcon";
import { ShieldCheck } from "lucide-react";
import styles from "./ContactSection.module.css";

export function ContactIntro() {
  return (
    <div className={styles.intro}>
      <div className={styles.introCopy}>
        <h2 className="font-display text-h2 text-ink-900">
          <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
            No vague wishes.
            <SparkleCluster size="md" glow className="inline-block" />
          </span>
        </h2>
        <p className="font-display text-h5 text-genie-600">Tell us where your clinic wants to grow.</p>
        <p className="max-w-xl text-pretty text-body text-ink-700">
          Clinic Genie helps specialist clinics understand where patients aren&apos;t finding them clearly enough,
          then turns that into practical search, website, content, and AI visibility work.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-display text-sm font-semibold text-genie-600">Built for:</p>
        <ul className={styles.builtForList}>
          {CONTACT_BUILT_FOR.map((item) => (
            <li key={item.label}>
              <span className={styles.builtForPill}>
                <BuiltForIcon name={item.icon} />
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="flex items-start gap-2 text-sm text-ink-700">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-genie-500" />
        <span>
          <span className="font-semibold text-ink-900">Compliance-aware.</span> No obligation.
        </span>
      </p>
    </div>
  );
}
