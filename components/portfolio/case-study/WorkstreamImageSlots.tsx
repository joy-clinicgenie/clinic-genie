"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { CaseStudyWorkImage, CaseStudyWorkImages } from "@/lib/data/portfolio";
import type { WorkstreamImageSlotKey } from "./utils";

const SLOTS: { key: WorkstreamImageSlotKey; label: string }[] = [
  { key: "brand", label: "Brand" },
  { key: "structure", label: "Structure" },
  { key: "patientJourney", label: "Patient journey" },
];

function SlotWell({
  image,
  label,
  tone,
  sizes,
  active,
}: {
  image?: CaseStudyWorkImage;
  label: string;
  tone: "light" | "dark";
  sizes: string;
  active?: boolean;
}) {
  const onDark = tone === "dark";

  return (
    <>
      {image ? (
        <Image
          src={image.src}
          alt={active === false ? "" : image.alt}
          fill
          className="object-cover"
          sizes={sizes}
        />
      ) : (
        <div
          className="absolute inset-0"
          role="img"
          aria-hidden={active === false}
          aria-label={active === false ? undefined : `${label} image not yet available`}
        />
      )}
    </>
  );
}

export function WorkstreamImageSlots({
  images,
  tone = "light",
  className,
}: {
  images?: CaseStudyWorkImages;
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <ul
      className={cn(
        "grid list-none grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-5",
        className
      )}
    >
      {SLOTS.map((slot) => {
        const image = images?.[slot.key];

        return (
          <li key={slot.key}>
            <figure className="flex flex-col gap-2">
              <div
                className={cn(
                  "relative aspect-[16/10] overflow-hidden rounded-2xl",
                  onDark
                    ? "border border-hairline-dark bg-night-800"
                    : "border border-hairline-light bg-cg-mist"
                )}
              >
                <SlotWell
                  image={image}
                  label={slot.label}
                  tone={tone}
                  sizes="(min-width: 1024px) 28vw, 33vw"
                />
              </div>
              <figcaption
                className={cn(
                  "font-sans text-xs uppercase tracking-widest",
                  onDark ? "text-onDark-muted" : "text-ink-700"
                )}
              >
                {slot.label}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}

export function WorkstreamActiveImage({
  images,
  activeKey,
  tone = "light",
}: {
  images?: CaseStudyWorkImages;
  activeKey: WorkstreamImageSlotKey;
  tone?: "light" | "dark";
}) {
  const reduceMotion = useReducedMotion();
  const onDark = tone === "dark";
  const activeSlot = SLOTS.find((slot) => slot.key === activeKey) ?? SLOTS[0];

  return (
    <figure className="flex w-full flex-col gap-2">
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-2xl",
          onDark
            ? "border border-hairline-dark bg-night-800"
            : "border border-hairline-light bg-cg-mist"
        )}
      >
        {SLOTS.map((slot) => {
          const isActive = slot.key === activeKey;

          return (
            <motion.div
              key={slot.key}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: "easeOut" }
              }
              aria-hidden={!isActive}
              style={{ pointerEvents: isActive ? "auto" : "none" }}
            >
              <SlotWell
                image={images?.[slot.key]}
                label={slot.label}
                tone={tone}
                sizes="(min-width: 1024px) 60vw, 100vw"
                active={isActive}
              />
            </motion.div>
          );
        })}
      </div>
      <figcaption
        className={cn(
          "font-sans text-xs uppercase tracking-widest",
          onDark ? "text-onDark-muted" : "text-ink-700"
        )}
      >
        {activeSlot.label}
      </figcaption>
    </figure>
  );
}
