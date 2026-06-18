"use client";

import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, forwardRef, type CSSProperties, type KeyboardEvent, type RefObject } from "react";
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
import { SparkleCluster } from "@/components/ui/SparkleCluster";
import { SparkleRing } from "@/components/ui/SparkleRing";
import { LandingBody, LandingHeading } from "@/components/home/landing/LandingLayout";
import { PORTFOLIO_WORKS, type PortfolioWorkSlide } from "@/lib/data/portfolio-works";
import { cn } from "@/lib/cn";
import styles from "./PortfolioWorksCarousel.module.css";

const CARD_GAP = -24;
const CARD_WIDTH_MOBILE = 220;
const CARD_WIDTH_DESKTOP = 280;
const ANGLE_PER_SLOT = 24;
const LOOP_COPIES = 3;
const FLICK_VELOCITY = 380;
const FLICK_VELOCITY_STRONG = 900;
const DRAG_COMMIT_RATIO = 0.18;

const SPARKLE_COLORS = ["#78E2DD", "#7DAFE3", "#CCF4F6"] as const;

function worksSparkleRng(seed: number) {
  const x = Math.sin(seed * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

const WORKS_SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  x: `${(worksSparkleRng(i + 1) * 92 + 4).toFixed(2)}%`,
  y: `${(worksSparkleRng(i + 7.3) * 88 + 6).toFixed(2)}%`,
  size: 10 + Math.floor(worksSparkleRng(i + 3.1) * 7),
  delay: `${(worksSparkleRng(i + 5.7) * 5).toFixed(2)}s`,
  dur: `${(3.2 + worksSparkleRng(i + 2.2) * 2.8).toFixed(2)}s`,
  color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
}));

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

function resolveSnapIndex(
  currentX: number,
  cardWidth: number,
  viewportWidth: number,
  offsetX: number,
  velocityX: number,
  maxIndex: number
) {
  const step = getCardStep(cardWidth);
  const virtual = getVirtualIndex(currentX, cardWidth, viewportWidth);
  let target = Math.round(virtual);

  const absVelocity = Math.abs(velocityX);
  if (absVelocity > FLICK_VELOCITY_STRONG) {
    target += velocityX > 0 ? -2 : 2;
  } else if (absVelocity > FLICK_VELOCITY) {
    target += velocityX > 0 ? -1 : 1;
  } else if (Math.abs(offsetX) > step * DRAG_COMMIT_RATIO) {
    target += offsetX > 0 ? -1 : 1;
  } else {
    target = Math.round(virtual);
  }

  return Math.max(0, Math.min(maxIndex, target));
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
  isFocused = false,
  onFocus,
}: {
  slide: PortfolioWorkSlide;
  style?: CSSProperties;
  tabIndex?: number;
  isFocused?: boolean;
  onFocus?: () => void;
}) {
  const content = (
    <>
      {isFocused && (
        <div className={styles.sparkleBadge} aria-hidden="true">
          <SparkleRing
            size="lg"
            ambient
            groupIntensify
            intensifyOnHover={false}
            coreClassName={styles.sparkleBadgeCore}
          >
            <span className={styles.sparkleBadgeDot} />
          </SparkleRing>
        </div>
      )}
      <div className={styles.cardInner} style={{ background: slide.gradient }}>
        {slide.image ? (
          <Image
            src={slide.image}
            alt={slide.title}
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
        className={cn(styles.card, isFocused && "group")}
        style={style}
        tabIndex={tabIndex}
        onFocus={onFocus}
        draggable={false}
        aria-label={`${slide.title}, ${slide.category}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={cn(styles.card, isFocused && "group")}
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
        isFocused={index === focusedIndex}
        tabIndex={index === focusedIndex ? 0 : -1}
        onFocus={() => onFocusSlide(index)}
      />
    </motion.div>
  );
}

function getWheelDelta(event: WheelEvent) {
  return Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
}

function useCarouselWheelOnHover(
  regionRef: RefObject<HTMLElement | null>,
  onWheelDelta: (delta: number) => void,
  onWheelEnd: () => void,
) {
  const onWheelDeltaRef = useRef(onWheelDelta);
  const onWheelEndRef = useRef(onWheelEnd);

  useEffect(() => {
    onWheelDeltaRef.current = onWheelDelta;
    onWheelEndRef.current = onWheelEnd;
  });

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;

    let hovered = false;
    let snapTimer: number | undefined;

    const scheduleSnap = () => {
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(() => {
        onWheelEndRef.current();
      }, 140);
    };

    const onEnter = () => {
      hovered = true;
      el.setAttribute("data-lenis-prevent-wheel", "");
    };

    const onLeave = () => {
      hovered = false;
      el.removeAttribute("data-lenis-prevent-wheel");
      window.clearTimeout(snapTimer);
    };

    const onWheel = (event: WheelEvent) => {
      if (!hovered) return;

      const delta = getWheelDelta(event);
      if (delta === 0) return;

      event.preventDefault();
      event.stopPropagation();
      onWheelDeltaRef.current(delta);
      scheduleSnap();
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("wheel", onWheel, { passive: false, capture: true });

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("wheel", onWheel, { capture: true });
      el.removeAttribute("data-lenis-prevent-wheel");
      window.clearTimeout(snapTimer);
    };
  }, [regionRef]);
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
  const draggingRef = useRef(false);
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
    if (draggingRef.current) return;

    const target = getTargetX(focusedIndex, layout.cardWidth, layout.viewportWidth);
    const controls = animate(x, target, {
      type: "spring",
      stiffness: 280,
      damping: 32,
      mass: 0.85,
      onComplete: () => {
        const currentIndex = getIndexFromX(x.get(), layout.cardWidth, layout.viewportWidth);
        recenterIfNeeded(currentIndex);
      },
    });

    return () => controls.stop();
  }, [focusedIndex, layout.cardWidth, layout.viewportWidth, recenterIfNeeded, x]);

  useMotionValueEvent(x, "change", (currentX) => {
    if (!draggingRef.current) return;
    setFocusedIndex(getIndexFromX(currentX, layout.cardWidth, layout.viewportWidth));
  });

  const goToIndex = useCallback(
    (index: number, options?: { fromDrag?: boolean; velocity?: number }) => {
      const clamped = Math.max(0, Math.min(loopedSlides.length - 1, index));

      if (options?.fromDrag) {
        skipAnimateRef.current = true;
        setFocusedIndex(clamped);

        animate(x, getTargetX(clamped, layout.cardWidth, layout.viewportWidth), {
          type: "spring",
          stiffness: 300 + Math.min(120, Math.abs(options.velocity ?? 0) * 0.05),
          damping: 32 + Math.min(12, Math.abs(options.velocity ?? 0) * 0.004),
          mass: 0.8,
          velocity: options.velocity ?? 0,
          onComplete: () => {
            const currentIndex = getIndexFromX(x.get(), layout.cardWidth, layout.viewportWidth);
            recenterIfNeeded(currentIndex);
          },
        });
        return;
      }

      setFocusedIndex(clamped);
    },
    [layout.cardWidth, layout.viewportWidth, loopedSlides.length, recenterIfNeeded, x]
  );

  useImperativeHandle(ref, () => ({
    prev: () => setFocusedIndex((index) => index - 1),
    next: () => setFocusedIndex((index) => index + 1),
  }));

  const onDragStart = useCallback(() => {
    draggingRef.current = true;
    setDragging(true);
    x.stop();
  }, [x]);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      draggingRef.current = false;
      setDragging(false);

      const target = resolveSnapIndex(
        x.get(),
        layout.cardWidth,
        layout.viewportWidth,
        info.offset.x,
        info.velocity.x,
        loopedSlides.length - 1
      );

      goToIndex(target, { fromDrag: true, velocity: info.velocity.x });
    },
    [goToIndex, layout.cardWidth, layout.viewportWidth, loopedSlides.length, x]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToIndex(focusedIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToIndex(focusedIndex + 1);
      }
    },
    [focusedIndex, goToIndex]
  );

  const onWheelDelta = useCallback(
    (delta: number) => {
      x.stop();
      draggingRef.current = true;

      const minX = getTargetX(loopedSlides.length - 1, layout.cardWidth, layout.viewportWidth);
      const maxX = getTargetX(0, layout.cardWidth, layout.viewportWidth);
      const nextX = Math.max(minX, Math.min(maxX, x.get() - delta));

      x.set(nextX);
      setFocusedIndex(getIndexFromX(nextX, layout.cardWidth, layout.viewportWidth));
    },
    [layout.cardWidth, layout.viewportWidth, loopedSlides.length, x]
  );

  const onWheelEnd = useCallback(() => {
    draggingRef.current = false;

    const target = getIndexFromX(x.get(), layout.cardWidth, layout.viewportWidth);
    goToIndex(target, { fromDrag: true, velocity: 0 });
  }, [goToIndex, layout.cardWidth, layout.viewportWidth, x]);

  useCarouselWheelOnHover(regionRef, onWheelDelta, onWheelEnd);

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
          dragElastic={0.04}
          dragMomentum={false}
          dragTransition={{ power: 0.2, timeConstant: 200 }}
          onDragStart={onDragStart}
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
              onFocusSlide={goToIndex}
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
  const regionRef = useRef<HTMLDivElement>(null);
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

  const onWheelDelta = useCallback(
    (delta: number) => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollLeft += delta;
      recenterScroll();
    },
    [recenterScroll]
  );

  const onWheelEnd = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getScrollStep();
    if (!step) return;
    const nearest = Math.round(el.scrollLeft / step) * step;
    el.scrollTo({ left: nearest, behavior: "smooth" });
    recenterScroll();
  }, [getScrollStep, recenterScroll]);

  useCarouselWheelOnHover(regionRef, onWheelDelta, onWheelEnd);

  return (
    <div
      ref={regionRef}
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
        <div className={styles.bandBackdrop} aria-hidden="true">
          <div className={styles.bandStars} />
          {WORKS_SPARKLES.map((spark, index) => (
            <span
              key={index}
              className={styles.bandSparkle}
              style={
                {
                  left: spark.x,
                  top: spark.y,
                  width: spark.size,
                  height: spark.size,
                  color: spark.color,
                  animationDelay: spark.delay,
                  animationDuration: spark.dur,
                } as CSSProperties
              }
            >
              <SparkleCluster glow className="h-full w-full" />
            </span>
          ))}
        </div>
        <div className={styles.intro}>
          <LandingHeading as="h3" highlight="magic">
            Magic beyond the clinic.
          </LandingHeading>
          <LandingBody>
            The same magic, beyond healthcare. From cafés to consultancies, built to help brands grow.
          </LandingBody>
        </div>

        <div className={styles.carouselShell}>
          <div className={styles.carouselReflection} aria-hidden="true">
            <div className={styles.carouselReflectionFill} />
          </div>
          {reducedMotion ? (
            <ScrollCarousel ref={carouselRef} slides={slides} />
          ) : (
            <DragCarousel ref={carouselRef} slides={slides} />
          )}
        </div>

        <div className={styles.controlsBlock}>
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
    </div>
  );
}
