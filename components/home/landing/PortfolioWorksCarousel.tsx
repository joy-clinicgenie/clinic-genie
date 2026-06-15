"use client";

import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, forwardRef, type CSSProperties, type KeyboardEvent } from "react";
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

const CARD_GAP = -24;
const CARD_WIDTH_MOBILE = 220;
const CARD_WIDTH_DESKTOP = 280;
const ANGLE_PER_SLOT = 24;
const LOOP_COPIES = 3;

export type CarouselControlsHandle = {
  prev: () => void;
  next: () => void;
};

function buildLoopedSlides(slides: PortfolioWorkSlide[]) {
  return Array.from({ length: LOOP_COPIES }, () => slides).flat();
}

function normalizeLoopIndex(index: number, originalCount: number) {
  if (index >= originalCount && index < originalCount * 2) return index;
  const mod = ((index % originalCount) + originalCount) % originalCount;
  return originalCount + mod;
}

function getCardWidth(viewportWidth: number) {
  return viewportWidth >= 768 ? CARD_WIDTH_DESKTOP : CARD_WIDTH_MOBILE;
}

function getCardStep(cardWidth: number) {
  return cardWidth + CARD_GAP;
}

function getTargetX(index: number, cardWidth: number, viewportWidth: number) {
  const step = getCardStep(cardWidth);
  return viewportWidth / 2 - (index * step + cardWidth / 2);
}

function getIndexFromX(x: number, cardWidth: number, viewportWidth: number) {
  const step = getCardStep(cardWidth);
  const raw = (viewportWidth / 2 - x - cardWidth / 2) / step;
  return Math.round(raw);
}

function getVirtualIndex(x: number, cardWidth: number, viewportWidth: number) {
  const step = getCardStep(cardWidth);
  return (viewportWidth / 2 - x - cardWidth / 2) / step;
}

/** Smooth inward-cylinder curve from continuous offset (not snapped to integers). */
function cylinderTransform(offset: number) {
  const abs = Math.abs(offset);
  const depth = 1 - Math.cos(Math.min(abs, 2.8) * (ANGLE_PER_SLOT * (Math.PI / 180)));

  return {
    rotateY: offset * -ANGLE_PER_SLOT,
    scale: 0.73 + depth * 0.34,
    translateZ: depth * 110 - 120,
    translateX: offset * -3,
    opacity: 0.62 + Math.min(abs * 0.11, 0.34),
    zIndex: Math.round(depth * 110 - 120 + 520),
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
        {slide.image ? (
          <Image
            src={slide.image}
            alt=""
            fill
            className={styles.cardImage}
            sizes="(max-width: 768px) 220px, 280px"
          />
        ) : (
          <div className={styles.cardPlaceholder} aria-hidden="true">
            <span className={styles.cardPlaceholderLabel}>{slide.title}</span>
          </div>
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

function CarouselControls({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  return (
    <div className={styles.navControls} role="group" aria-label="Carousel navigation">
      <button type="button" className={styles.navButton} aria-label="Previous project" onClick={onPrev}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className={styles.navButton} aria-label="Next project" onClick={onNext}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

const DragCarousel = forwardRef<CarouselControlsHandle, { slides: PortfolioWorkSlide[] }>(function DragCarousel(
  { slides },
  ref
) {
  const loopedSlides = useMemo(() => buildLoopedSlides(slides), [slides]);
  const regionRef = useRef<HTMLDivElement>(null);
  const skipAnimateRef = useRef(false);
  const [focusedIndex, setFocusedIndex] = useState(slides.length);
  const [dragging, setDragging] = useState(false);
  const [layout, setLayout] = useState({ cardWidth: CARD_WIDTH_DESKTOP, viewportWidth: 1280 });
  const x = useMotionValue(getTargetX(slides.length, CARD_WIDTH_DESKTOP, 1280));

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

  const recenterIfNeeded = useCallback(
    (index: number) => {
      const normalized = normalizeLoopIndex(index, slides.length);
      if (normalized === index) return;
      skipAnimateRef.current = true;
      x.set(getTargetX(normalized, layout.cardWidth, layout.viewportWidth));
      setFocusedIndex(normalized);
    },
    [layout.cardWidth, layout.viewportWidth, slides.length, x]
  );

  useEffect(() => {
    if (skipAnimateRef.current) {
      skipAnimateRef.current = false;
      return;
    }
    const target = getTargetX(focusedIndex, layout.cardWidth, layout.viewportWidth);
    animate(x, target, {
      type: "spring",
      stiffness: 280,
      damping: 32,
      mass: 0.85,
      onComplete: () => {
        const currentIndex = getIndexFromX(x.get(), layout.cardWidth, layout.viewportWidth);
        recenterIfNeeded(currentIndex);
      },
    });
  }, [focusedIndex, layout.cardWidth, layout.viewportWidth, recenterIfNeeded, x]);

  useMotionValueEvent(x, "change", (currentX) => {
    if (dragging) {
      setFocusedIndex(getIndexFromX(currentX, layout.cardWidth, layout.viewportWidth));
    }
  });

  const snapToIndex = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  useImperativeHandle(ref, () => ({
    prev: () => setFocusedIndex((index) => index - 1),
    next: () => setFocusedIndex((index) => index + 1),
  }));

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setDragging(false);
      const currentX = x.get();
      const velocityBias = info.velocity.x * 0.14;
      const projected = currentX + velocityBias;
      snapToIndex(getIndexFromX(projected, layout.cardWidth, layout.viewportWidth));
    },
    [layout.cardWidth, layout.viewportWidth, snapToIndex, x]
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
  const activeSlide = slides[((focusedIndex % slides.length) + slides.length) % slides.length];

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
            left: getTargetX(loopedSlides.length - 1, cardWidth, viewportWidth),
            right: getTargetX(0, cardWidth, viewportWidth),
          }}
          dragElastic={0.06}
          dragMomentum
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
        >
          {loopedSlides.map((slide, index) => (
            <CarouselSlide
              key={`${slide.id}-${index}`}
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
        Showing {activeSlide?.title}, slide {((focusedIndex % slides.length) + slides.length) % slides.length + 1} of{" "}
        {slides.length}
      </p>
    </div>
  );
});

const ScrollCarousel = forwardRef<CarouselControlsHandle, { slides: PortfolioWorkSlide[] }>(function ScrollCarousel(
  { slides },
  ref
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const loopedSlides = useMemo(() => buildLoopedSlides(slides), [slides]);
  const recenteringRef = useRef(false);

  const getScrollStep = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;
    const first = el.querySelector<HTMLElement>(`.${styles.scrollSlide}`);
    if (!first) return 0;
    const gap = Number.parseFloat(getComputedStyle(el).gap) || 0;
    const marginRight = Number.parseFloat(getComputedStyle(first).marginRight) || CARD_GAP;
    return first.offsetWidth + marginRight + gap;
  }, []);

  const recenterScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || recenteringRef.current) return;
    const step = getScrollStep();
    if (!step) return;
    const setWidth = slides.length * step;
    if (el.scrollLeft < setWidth * 0.5) {
      recenteringRef.current = true;
      el.scrollLeft += setWidth;
      recenteringRef.current = false;
    } else if (el.scrollLeft > setWidth * 1.5) {
      recenteringRef.current = true;
      el.scrollLeft -= setWidth;
      recenteringRef.current = false;
    }
  }, [getScrollStep, slides.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getScrollStep();
    if (step) el.scrollLeft = slides.length * step;
  }, [getScrollStep, slides.length]);

  const scrollByStep = useCallback(
    (direction: -1 | 1) => {
      const el = scrollRef.current;
      if (!el) return;
      const step = getScrollStep();
      if (!step) return;
      el.scrollBy({ left: direction * step, behavior: "auto" });
    },
    [getScrollStep]
  );

  useImperativeHandle(ref, () => ({
    prev: () => scrollByStep(-1),
    next: () => scrollByStep(1),
  }));

  return (
    <div
      className={styles.viewport}
      role="region"
      aria-label="Portfolio works"
      aria-roledescription="carousel"
    >
      <div ref={scrollRef} className={styles.scrollViewport} onScroll={recenterScroll}>
        {loopedSlides.map((slide, index) => (
          <div key={`${slide.id}-${index}`} className={styles.scrollSlide}>
            <WorkCard slide={slide} tabIndex={0} />
          </div>
        ))}
      </div>
    </div>
  );
});

export function PortfolioWorksCarousel() {
  const reducedMotion = useReducedMotion();
  const slides = PORTFOLIO_WORKS;
  const carouselRef = useRef<CarouselControlsHandle>(null);

  return (
    <div className="flex w-full flex-col">
      <div className={styles.band}>
        <div className={styles.intro}>
          <LandingHeading highlight="magic">Magic beyond the clinic.</LandingHeading>
          <LandingBody>
            The same magic, beyond healthcare. From cafés to consultancies, built to help brands grow.
          </LandingBody>
        </div>

        {reducedMotion ? (
          <ScrollCarousel ref={carouselRef} slides={slides} />
        ) : (
          <DragCarousel ref={carouselRef} slides={slides} />
        )}

        <CarouselControls
          onPrev={() => carouselRef.current?.prev()}
          onNext={() => carouselRef.current?.next()}
        />

        <div className={styles.ctaBlock}>
          <MagneticButton href="/portfolio" size="lg" withMiniOrb>
            View Our Works
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
