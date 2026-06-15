"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LandingBody, LandingHeading } from "@/components/home/landing/LandingLayout";
import { PORTFOLIO_WORKS, type PortfolioWorkSlide } from "@/lib/data/portfolio-works";
import { cn } from "@/lib/cn";
import styles from "./PortfolioWorksCarousel.module.css";

const CARD_GAP = 6;
const CARD_WIDTH_MOBILE = 220;
const CARD_WIDTH_DESKTOP = 280;
const ANGLE_PER_SLOT = 36;

function clampIndex(index: number, count: number) {
  return Math.max(0, Math.min(count - 1, index));
}

function getCardWidth(viewportWidth: number) {
  return viewportWidth >= 768 ? CARD_WIDTH_DESKTOP : CARD_WIDTH_MOBILE;
}

function getTargetX(index: number, cardWidth: number, viewportWidth: number) {
  const step = cardWidth + CARD_GAP;
  return viewportWidth / 2 - (index * step + cardWidth / 2);
}

function getIndexFromX(x: number, cardWidth: number, viewportWidth: number, count: number) {
  const step = cardWidth + CARD_GAP;
  const raw = (viewportWidth / 2 - x - cardWidth / 2) / step;
  return clampIndex(Math.round(raw), count);
}

function getVirtualIndex(x: number, cardWidth: number, viewportWidth: number) {
  const step = cardWidth + CARD_GAP;
  return (viewportWidth / 2 - x - cardWidth / 2) / step;
}

/** Smooth inward-cylinder curve from continuous offset (not snapped to integers). */
function cylinderTransform(offset: number) {
  const abs = Math.abs(offset);
  const depth = 1 - Math.cos(Math.min(abs, 2.8) * (ANGLE_PER_SLOT * (Math.PI / 180)));

  return {
    rotateY: offset * -ANGLE_PER_SLOT,
    scale: 0.73 + depth * 0.34,
    translateZ: depth * 130 - 145,
    translateX: offset * -4,
    opacity: 0.62 + Math.min(abs * 0.11, 0.34),
    zIndex: Math.round(depth * 130 - 145 + 520),
  };
}

function WorkCard({
  slide,
  style,
  tabIndex,
  onFocus,
}: {
  slide: PortfolioWorkSlide;
  style?: CSSProperties;
  tabIndex?: number;
  onFocus?: () => void;
}) {
  const content = (
    <>
      <div className={styles.cardInner} style={{ background: slide.gradient }}>
        {slide.image && (
          <Image
            src={slide.image}
            alt=""
            fill
            className={styles.cardImage}
            sizes="(max-width: 768px) 220px, 280px"
          />
        )}
      </div>
      <div className={styles.cardOverlay}>
        <p className={styles.cardTitle}>{slide.title}</p>
        <p className={styles.cardCategory}>{slide.category}</p>
      </div>
    </>
  );

  if (slide.href) {
    return (
      <Link
        href={slide.href}
        className={styles.card}
        style={style}
        tabIndex={tabIndex}
        onFocus={onFocus}
        aria-label={`${slide.title}, ${slide.category}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={styles.card}
      style={style}
      tabIndex={tabIndex}
      onFocus={onFocus}
      aria-label={`${slide.title}, ${slide.category}`}
    >
      {content}
    </article>
  );
}

function CarouselSlide({
  index,
  slide,
  x,
  cardWidth,
  viewportWidth,
  focusedIndex,
  onFocusSlide,
}: {
  index: number;
  slide: PortfolioWorkSlide;
  x: MotionValue<number>;
  cardWidth: number;
  viewportWidth: number;
  focusedIndex: number;
  onFocusSlide: (index: number) => void;
}) {
  const offset = useTransform(x, (currentX) => index - getVirtualIndex(currentX, cardWidth, viewportWidth));
  const rotateY = useTransform(offset, (o) => cylinderTransform(o).rotateY);
  const scale = useTransform(offset, (o) => cylinderTransform(o).scale);
  const translateZ = useTransform(offset, (o) => cylinderTransform(o).translateZ);
  const translateX = useTransform(offset, (o) => cylinderTransform(o).translateX);
  const opacity = useTransform(offset, (o) => cylinderTransform(o).opacity);
  const zIndex = useTransform(offset, (o) => cylinderTransform(o).zIndex);

  return (
    <motion.div
      className={styles.slide}
      style={{
        rotateY,
        scale,
        translateZ,
        translateX,
        opacity,
        zIndex,
      }}
    >
      <WorkCard
        slide={slide}
        tabIndex={index === focusedIndex ? 0 : -1}
        onFocus={() => onFocusSlide(index)}
      />
    </motion.div>
  );
}

function DragCarousel({ slides }: { slides: PortfolioWorkSlide[] }) {
  const regionRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(Math.floor(slides.length / 2));
  const [dragging, setDragging] = useState(false);
  const [layout, setLayout] = useState({ cardWidth: CARD_WIDTH_DESKTOP, viewportWidth: 1280 });
  const x = useMotionValue(0);

  useEffect(() => {
    const updateLayout = () => {
      const viewportWidth = regionRef.current?.clientWidth ?? window.innerWidth;
      const cardWidth = getCardWidth(viewportWidth);
      setLayout({ cardWidth, viewportWidth });
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    const target = getTargetX(focusedIndex, layout.cardWidth, layout.viewportWidth);
    animate(x, target, { type: "spring", stiffness: 280, damping: 32, mass: 0.85 });
  }, [focusedIndex, layout.cardWidth, layout.viewportWidth, x]);

  useMotionValueEvent(x, "change", (currentX) => {
    if (dragging) {
      setFocusedIndex(getIndexFromX(currentX, layout.cardWidth, layout.viewportWidth, slides.length));
    }
  });

  const snapToIndex = useCallback(
    (index: number) => {
      setFocusedIndex(clampIndex(index, slides.length));
    },
    [slides.length]
  );

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setDragging(false);
      const currentX = x.get();
      const velocityBias = info.velocity.x * 0.14;
      const projected = currentX + velocityBias;
      snapToIndex(getIndexFromX(projected, layout.cardWidth, layout.viewportWidth, slides.length));
    },
    [layout.cardWidth, layout.viewportWidth, slides.length, snapToIndex, x]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        snapToIndex(focusedIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        snapToIndex(focusedIndex + 1);
      }
    },
    [focusedIndex, snapToIndex]
  );

  const { cardWidth, viewportWidth } = layout;

  return (
    <div
      ref={regionRef}
      className={styles.viewport}
      role="region"
      aria-label="Portfolio works"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className={styles.stage}>
        <motion.div
          className={cn(styles.track, dragging && styles.trackDragging)}
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: getTargetX(slides.length - 1, cardWidth, viewportWidth),
            right: getTargetX(0, cardWidth, viewportWidth),
          }}
          dragElastic={0.06}
          dragMomentum
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
        >
          {slides.map((slide, index) => (
            <CarouselSlide
              key={slide.id}
              index={index}
              slide={slide}
              x={x}
              cardWidth={cardWidth}
              viewportWidth={viewportWidth}
              focusedIndex={focusedIndex}
              onFocusSlide={snapToIndex}
            />
          ))}
        </motion.div>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {slides[focusedIndex]?.title}, slide {focusedIndex + 1} of {slides.length}
      </p>
    </div>
  );
}

function ScrollCarousel({ slides }: { slides: PortfolioWorkSlide[] }) {
  return (
    <div
      className={styles.viewport}
      role="region"
      aria-label="Portfolio works"
      aria-roledescription="carousel"
    >
      <div className={styles.scrollViewport}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.scrollSlide}>
            <WorkCard slide={slide} tabIndex={0} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioWorksCarousel() {
  const reducedMotion = useReducedMotion();
  const slides = PORTFOLIO_WORKS;

  return (
    <div className="flex w-full flex-col gap-8 pt-4">
      <div className={styles.intro}>
        <LandingHeading highlight="magic">Magic beyond the clinic.</LandingHeading>
        <LandingBody>
          The same magic, beyond healthcare. From cafés to consultancies, built to help brands grow.
        </LandingBody>
      </div>

      <div className={styles.band}>
        {reducedMotion ? <ScrollCarousel slides={slides} /> : <DragCarousel slides={slides} />}

        <div className={styles.ctaBlock}>
          <MagneticButton href="/portfolio" size="lg" withMiniOrb>
            View Our Works
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
