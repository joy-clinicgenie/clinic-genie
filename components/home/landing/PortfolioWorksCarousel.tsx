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
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  LandingBody,
  LandingHeading,
  LandingKicker,
} from "@/components/home/landing/LandingLayout";
import { PORTFOLIO_WORKS, type PortfolioWorkSlide } from "@/lib/data/portfolio-works";
import { cn } from "@/lib/cn";
import styles from "./PortfolioWorksCarousel.module.css";

export type CarouselVariant = "cinematic" | "showcase";
type MotionMode = "editorial" | "coverflow";

export type PortfolioWorksCarouselProps = {
  kicker?: string;
  title?: string;
  highlight?: string;
  body?: string;
  cta?: { label: string; href: string };
  slides?: PortfolioWorkSlide[];
  /** `showcase` is the compact mobile clinic treatment on service sub-pages. */
  variant?: CarouselVariant;
};

const GRANTED_HEADING = "Clinics whose wishes we have granted.";
const CARD_GAP_DESKTOP = -28;
const CARD_GAP_TABLET = -16;
const CARD_GAP_SHOWCASE = -40;
const CARD_WIDTH_TABLET = 288;
const CARD_WIDTH_DESKTOP = 320;
const CARD_WIDTH_DESKTOP_XL = 336;
const CARD_WIDTH_SHOWCASE_MIN = 180;
const CARD_WIDTH_SHOWCASE_MAX = 210;
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;
const XL_BREAKPOINT = 1440;
const LOOP_COPIES = 3;
const FLICK_VELOCITY = 380;
const FLICK_VELOCITY_STRONG = 900;
const DRAG_COMMIT_RATIO = 0.18;

const SNAP_SPRING = {
  type: "spring" as const,
  stiffness: 210,
  damping: 30,
  mass: 0.92,
};

type CarouselLayout = {
  cardWidth: number;
  viewportWidth: number;
  gap: number;
  mode: MotionMode;
  intensity: number;
};

type SlidePose = {
  rotateY: number;
  rotateZ: number;
  scale: number;
  translateZ: number;
  translateX: number;
  translateY: number;
  opacity: number;
  zIndex: number;
};

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

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function getShowcaseCardWidth(viewportWidth: number) {
  return Math.round(
    Math.min(CARD_WIDTH_SHOWCASE_MAX, Math.max(CARD_WIDTH_SHOWCASE_MIN, viewportWidth * 0.52))
  );
}

function getCinematicMobileWidth(viewportWidth: number) {
  return Math.round(Math.min(280, Math.max(228, viewportWidth * 0.72)));
}

function getMotionMode(variant: CarouselVariant, viewportWidth: number): MotionMode {
  if (viewportWidth < MD_BREAKPOINT) return "coverflow";
  if (variant === "showcase" && viewportWidth < LG_BREAKPOINT) return "coverflow";
  return "editorial";
}

function getCardWidth(viewportWidth: number, variant: CarouselVariant = "cinematic") {
  if (getMotionMode(variant, viewportWidth) === "coverflow") {
    return variant === "showcase"
      ? getShowcaseCardWidth(viewportWidth)
      : getCinematicMobileWidth(viewportWidth);
  }
  if (viewportWidth < LG_BREAKPOINT) return CARD_WIDTH_TABLET;
  if (viewportWidth < XL_BREAKPOINT) return CARD_WIDTH_DESKTOP;
  return CARD_WIDTH_DESKTOP_XL;
}

function getCardGap(mode: MotionMode, viewportWidth: number) {
  if (mode === "coverflow") return CARD_GAP_SHOWCASE;
  if (viewportWidth < LG_BREAKPOINT) return CARD_GAP_TABLET;
  return CARD_GAP_DESKTOP;
}

function getMotionIntensity(viewportWidth: number) {
  if (viewportWidth < LG_BREAKPOINT) return 0.62;
  return 1;
}

function measureLayout(viewportWidth: number, variant: CarouselVariant): CarouselLayout {
  const mode = getMotionMode(variant, viewportWidth);
  return {
    cardWidth: getCardWidth(viewportWidth, variant),
    viewportWidth,
    gap: getCardGap(mode, viewportWidth),
    mode,
    intensity: getMotionIntensity(viewportWidth),
  };
}

function getCardStep(cardWidth: number, gap: number) {
  return cardWidth + gap;
}

function getTargetX(index: number, cardWidth: number, viewportWidth: number, gap: number) {
  const step = getCardStep(cardWidth, gap);
  return viewportWidth / 2 - (index * step + cardWidth / 2);
}

function getIndexFromX(x: number, cardWidth: number, viewportWidth: number, gap: number) {
  const step = getCardStep(cardWidth, gap);
  const raw = (viewportWidth / 2 - x - cardWidth / 2) / step;
  return Math.round(raw);
}

function getVirtualIndex(x: number, cardWidth: number, viewportWidth: number, gap: number) {
  const step = getCardStep(cardWidth, gap);
  return (viewportWidth / 2 - x - cardWidth / 2) / step;
}

function displaySlideIndex(focusedIndex: number, count: number) {
  if (count <= 0) return 0;
  return ((focusedIndex % count) + count) % count;
}

function resolveSnapIndex(
  currentX: number,
  cardWidth: number,
  viewportWidth: number,
  gap: number,
  offsetX: number,
  velocityX: number,
  maxIndex: number,
  singleStep: boolean
) {
  const step = getCardStep(cardWidth, gap);
  const virtual = getVirtualIndex(currentX, cardWidth, viewportWidth, gap);
  let target = Math.round(virtual);

  const absVelocity = Math.abs(velocityX);
  if (!singleStep && absVelocity > FLICK_VELOCITY_STRONG) {
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

/** Desktop editorial cover-flow: Peripheral → Supporting → Active → Supporting → Peripheral */
function editorialTransform(offset: number, intensity = 1): SlidePose {
  const abs = Math.abs(offset);
  const sign = offset === 0 ? 0 : Math.sign(offset);
  const t1 = clamp01(abs);
  const t2 = clamp01(abs - 1);
  const t3 = clamp01(abs - 2);

  return {
    rotateY: sign * lerp(0, lerp(5, 9, t2), t1) * intensity,
    rotateZ: sign * lerp(0, lerp(3, 5.5, t2), t1) * intensity,
    scale: lerp(1, lerp(0.93, lerp(0.84, 0.8, t3), t2), t1),
    translateZ: lerp(16, lerp(0, -12, t2), t1) * intensity,
    translateX: 0,
    translateY: lerp(-7, lerp(2, 10, t2), t1),
    opacity: lerp(1, lerp(0.9, lerp(0.7, 0.58, t3), t2), t1),
    zIndex: Math.round(lerp(48, lerp(24, lerp(10, 4, t3), t2), t1)),
  };
}

/** Mobile: one dominant active card with readable neighbour peeks. */
function coverflowTransform(offset: number): SlidePose {
  const abs = Math.abs(offset);
  const t = Math.min(abs, 1);
  const t2 = clamp01(abs - 1);

  return {
    rotateY: 0,
    rotateZ: 0,
    scale: 1 - t * 0.12 - t2 * 0.06,
    translateZ: 0,
    translateX: 0,
    translateY: lerp(-4, 0, t),
    opacity: 1 - t * 0.12 - t2 * 0.2,
    zIndex: Math.round((1 - abs) * 40 + 10),
  };
}

function slideTransform(offset: number, mode: MotionMode, intensity: number): SlidePose {
  return mode === "coverflow" ? coverflowTransform(offset) : editorialTransform(offset, intensity);
}

function WorkCard({
  slide,
  style,
  tabIndex,
  onFocus,
  isActive = false,
}: {
  slide: PortfolioWorkSlide;
  style?: CSSProperties;
  tabIndex?: number;
  onFocus?: () => void;
  isActive?: boolean;
}) {
  const content = (
    <>
      <div className={styles.cardInner} style={{ backgroundColor: slide.cardColor }}>
        {slide.image ? (
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className={styles.cardImage}
            sizes="(max-width: 767px) 72vw, (max-width: 1023px) 288px, (max-width: 1439px) 320px, 336px"
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
        {isActive && slide.href ? (
          <span className={styles.cardView} aria-hidden="true">
            View Project
            <span className={styles.cardViewArrow}>↗</span>
          </span>
        ) : null}
      </div>
    </>
  );

  const cardClass = cn(styles.card, isActive && styles.cardActive);

  if (slide.href) {
    return (
      <Link
        href={slide.href}
        className={cardClass}
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
      className={cardClass}
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
  gap,
  mode,
  intensity,
  focusedIndex,
  onFocusSlide,
}: {
  index: number;
  slide: PortfolioWorkSlide;
  x: MotionValue<number>;
  cardWidth: number;
  viewportWidth: number;
  gap: number;
  mode: MotionMode;
  intensity: number;
  focusedIndex: number;
  onFocusSlide: (index: number) => void;
}) {
  const layoutRef = useRef({ cardWidth, viewportWidth, gap, mode, intensity });
  layoutRef.current = { cardWidth, viewportWidth, gap, mode, intensity };

  const offset = useTransform(x, (currentX) => {
    const l = layoutRef.current;
    return index - getVirtualIndex(currentX, l.cardWidth, l.viewportWidth, l.gap);
  });
  const rotateY = useTransform(offset, (o) => slideTransform(o, layoutRef.current.mode, layoutRef.current.intensity).rotateY);
  const rotateZ = useTransform(offset, (o) => slideTransform(o, layoutRef.current.mode, layoutRef.current.intensity).rotateZ);
  const scale = useTransform(offset, (o) => slideTransform(o, layoutRef.current.mode, layoutRef.current.intensity).scale);
  const translateZ = useTransform(offset, (o) => slideTransform(o, layoutRef.current.mode, layoutRef.current.intensity).translateZ);
  const translateX = useTransform(offset, (o) => slideTransform(o, layoutRef.current.mode, layoutRef.current.intensity).translateX);
  const translateY = useTransform(offset, (o) => slideTransform(o, layoutRef.current.mode, layoutRef.current.intensity).translateY);
  const opacity = useTransform(offset, (o) => slideTransform(o, layoutRef.current.mode, layoutRef.current.intensity).opacity);
  const zIndex = useTransform(offset, (o) => slideTransform(o, layoutRef.current.mode, layoutRef.current.intensity).zIndex);

  return (
    <motion.div
      className={styles.slide}
      style={{
        rotateY,
        rotateZ,
        scale,
        translateZ,
        translateX,
        y: translateY,
        opacity,
        zIndex,
      }}
    >
      <WorkCard
        slide={slide}
        isActive={index === focusedIndex}
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
    <div className={styles.navCluster} role="group" aria-label="Carousel navigation">
      <button type="button" className={styles.navArrow} aria-label="Previous project" onClick={onPrev}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className={styles.navArrow} aria-label="Next project" onClick={onNext}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function padIndex(value: number) {
  return String(value).padStart(2, "0");
}

function CarouselProgress({ index, total }: { index: number; total: number }) {
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;

  return (
    <p className={styles.progress} aria-hidden="true">
      <span className={styles.progressIndex}>{padIndex(index + 1)}</span>
      <span className={styles.progressTrack}>
        <span className={styles.progressFill} style={{ width: `${progress}%` }} />
      </span>
      <span className={styles.progressIndex}>{padIndex(total)}</span>
    </p>
  );
}

function CarouselPager({
  index,
  total,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;

  return (
    <div className={styles.pager} role="group" aria-label="Carousel navigation">
      <div className={styles.pagerRow}>
        <button type="button" className={styles.pagerButton} aria-label="Previous clinic" onClick={onPrev}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className={styles.pagerIndex} aria-hidden="true">
          {padIndex(index + 1)} / {padIndex(total)}
        </span>
        <button type="button" className={styles.pagerButton} aria-label="Next clinic" onClick={onNext}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={styles.pagerTrack} aria-hidden="true">
        <span className={styles.pagerFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

const DragCarousel = forwardRef<
  CarouselControlsHandle,
  {
    slides: PortfolioWorkSlide[];
    variant: CarouselVariant;
    onActiveIndexChange?: (index: number) => void;
  }
>(function DragCarousel({ slides, variant, onActiveIndexChange }, ref) {
  const loopedSlides = useMemo(() => buildLoopedSlides(slides), [slides]);
  const regionRef = useRef<HTMLDivElement>(null);
  const skipAnimateRef = useRef(false);
  const draggingRef = useRef(false);
  const [focusedIndex, setFocusedIndex] = useState(slides.length);
  const [dragging, setDragging] = useState(false);
  const [layout, setLayout] = useState<CarouselLayout>(() =>
    measureLayout(1280, variant)
  );
  const x = useMotionValue(
    getTargetX(slides.length, CARD_WIDTH_DESKTOP, 1280, CARD_GAP_DESKTOP)
  );

  useEffect(() => {
    const updateLayout = () => {
      const viewportWidth = regionRef.current?.clientWidth ?? window.innerWidth;
      setLayout(measureLayout(viewportWidth, variant));
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [variant]);

  const { cardWidth, viewportWidth, gap, mode, intensity } = layout;
  const coverflow = mode === "coverflow";

  const recenterIfNeeded = useCallback(
    (index: number) => {
      const normalized = normalizeLoopIndex(index, slides.length);
      if (normalized === index) return;
      skipAnimateRef.current = true;
      x.set(getTargetX(normalized, cardWidth, viewportWidth, gap));
      setFocusedIndex(normalized);
    },
    [cardWidth, gap, slides.length, viewportWidth, x]
  );

  useEffect(() => {
    onActiveIndexChange?.(displaySlideIndex(focusedIndex, slides.length));
  }, [focusedIndex, onActiveIndexChange, slides.length]);

  useEffect(() => {
    if (skipAnimateRef.current) {
      skipAnimateRef.current = false;
      return;
    }
    if (draggingRef.current) return;

    const target = getTargetX(focusedIndex, cardWidth, viewportWidth, gap);
    const controls = animate(x, target, {
      ...SNAP_SPRING,
      stiffness: coverflow ? 240 : SNAP_SPRING.stiffness,
      damping: coverflow ? 40 : SNAP_SPRING.damping,
      onComplete: () => {
        const currentIndex = getIndexFromX(x.get(), cardWidth, viewportWidth, gap);
        recenterIfNeeded(currentIndex);
      },
    });

    return () => controls.stop();
  }, [cardWidth, coverflow, focusedIndex, gap, recenterIfNeeded, viewportWidth, x]);

  useMotionValueEvent(x, "change", (currentX) => {
    if (!draggingRef.current) return;
    setFocusedIndex(getIndexFromX(currentX, cardWidth, viewportWidth, gap));
  });

  const goToIndex = useCallback(
    (index: number, options?: { fromDrag?: boolean; velocity?: number }) => {
      const clamped = Math.max(0, Math.min(loopedSlides.length - 1, index));

      if (options?.fromDrag) {
        skipAnimateRef.current = true;
        setFocusedIndex(clamped);

        animate(x, getTargetX(clamped, cardWidth, viewportWidth, gap), {
          ...SNAP_SPRING,
          stiffness: coverflow
            ? 240
            : SNAP_SPRING.stiffness + Math.min(80, Math.abs(options.velocity ?? 0) * 0.04),
          damping: coverflow
            ? 40
            : SNAP_SPRING.damping + Math.min(8, Math.abs(options.velocity ?? 0) * 0.003),
          mass: coverflow ? 0.9 : SNAP_SPRING.mass,
          velocity: coverflow ? 0 : options.velocity ?? 0,
          onComplete: () => {
            const currentIndex = getIndexFromX(x.get(), cardWidth, viewportWidth, gap);
            recenterIfNeeded(currentIndex);
          },
        });
        return;
      }

      setFocusedIndex(clamped);
    },
    [cardWidth, coverflow, gap, loopedSlides.length, recenterIfNeeded, viewportWidth, x]
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
        cardWidth,
        viewportWidth,
        gap,
        info.offset.x,
        info.velocity.x,
        loopedSlides.length - 1,
        coverflow
      );

      goToIndex(target, { fromDrag: true, velocity: info.velocity.x });
    },
    [cardWidth, coverflow, gap, goToIndex, loopedSlides.length, viewportWidth, x]
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

      const minX = getTargetX(loopedSlides.length - 1, cardWidth, viewportWidth, gap);
      const maxX = getTargetX(0, cardWidth, viewportWidth, gap);
      const nextX = Math.max(minX, Math.min(maxX, x.get() - delta));

      x.set(nextX);
      setFocusedIndex(getIndexFromX(nextX, cardWidth, viewportWidth, gap));
    },
    [cardWidth, gap, loopedSlides.length, viewportWidth, x]
  );

  const onWheelEnd = useCallback(() => {
    draggingRef.current = false;

    const target = getIndexFromX(x.get(), cardWidth, viewportWidth, gap);
    goToIndex(target, { fromDrag: true, velocity: 0 });
  }, [cardWidth, gap, goToIndex, viewportWidth, x]);

  useCarouselWheelOnHover(regionRef, onWheelDelta, onWheelEnd);

  const activeSlide = slides[displaySlideIndex(focusedIndex, slides.length)];

  return (
    <div
      ref={regionRef}
      className={styles.viewport}
      role="region"
      aria-label="Portfolio works"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      style={{
        ["--carousel-card-width" as string]: `${cardWidth}px`,
        ["--carousel-gap" as string]: `${gap}px`,
      }}
    >
      <div className={styles.stage}>
        <motion.div
          className={cn(styles.track, dragging && styles.trackDragging)}
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: getTargetX(loopedSlides.length - 1, cardWidth, viewportWidth, gap),
            right: getTargetX(0, cardWidth, viewportWidth, gap),
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
              gap={gap}
              mode={mode}
              intensity={intensity}
              focusedIndex={focusedIndex}
              onFocusSlide={goToIndex}
            />
          ))}
        </motion.div>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {activeSlide?.title}, slide {displaySlideIndex(focusedIndex, slides.length) + 1} of{" "}
        {slides.length}
      </p>
    </div>
  );
});

const ScrollCarousel = forwardRef<
  CarouselControlsHandle,
  {
    slides: PortfolioWorkSlide[];
    onActiveIndexChange?: (index: number) => void;
  }
>(function ScrollCarousel({ slides, onActiveIndexChange }, ref) {
  const regionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loopedSlides = useMemo(() => buildLoopedSlides(slides), [slides]);
  const recenteringRef = useRef(false);

  const getScrollStep = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;
    const first = el.querySelector<HTMLElement>(`.${styles.scrollSlide}`);
    if (!first) return 0;
    const cssGap = Number.parseFloat(getComputedStyle(el).gap) || 0;
    const marginRight = Number.parseFloat(getComputedStyle(first).marginRight) || CARD_GAP_DESKTOP;
    return first.offsetWidth + marginRight + cssGap;
  }, []);

  const reportIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !onActiveIndexChange) return;
    const step = getScrollStep();
    if (!step) return;
    const raw = Math.round(el.scrollLeft / step);
    onActiveIndexChange(displaySlideIndex(raw, slides.length));
  }, [getScrollStep, onActiveIndexChange, slides.length]);

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
    reportIndex();
  }, [getScrollStep, reportIndex, slides.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getScrollStep();
    if (step) el.scrollLeft = slides.length * step;
    reportIndex();
  }, [getScrollStep, reportIndex, slides.length]);

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

export function PortfolioWorksCarousel({
  kicker = "Our Work",
  title = GRANTED_HEADING,
  highlight,
  body = "Specialist clinics across Singapore trust Clinic Genie with their paid search.",
  cta = { label: "See Our Granted Wishes", href: "/portfolio" },
  slides = PORTFOLIO_WORKS,
  variant = "cinematic",
}: PortfolioWorksCarouselProps = {}) {
  const reducedMotion = useReducedMotion();
  const carouselRef = useRef<CarouselControlsHandle>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const showcase = variant === "showcase";
  const grantedHeading = title === GRANTED_HEADING;
  const resolvedHighlight = highlight ?? undefined;
  const headingLevel = showcase ? "h3" : "h2";

  const onActiveIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const heading = grantedHeading ? (
    <LandingHeading as={headingLevel} className={styles.introHeading}>
      <span className={styles.headingMobile}>{GRANTED_HEADING}</span>
      <span className={styles.headingDesktop}>
        Clinics whose wishes
        <br />
        we have granted.
      </span>
    </LandingHeading>
  ) : (
    <LandingHeading
      as={headingLevel}
      highlight={resolvedHighlight}
      className={cn(styles.introHeading, showcase && "max-lg:max-w-xs")}
    >
      {title}
    </LandingHeading>
  );

  const nav = (
    <div className={styles.navBlock}>
      <CarouselControls
        onPrev={() => carouselRef.current?.prev()}
        onNext={() => carouselRef.current?.next()}
      />
      <CarouselProgress index={activeIndex} total={slides.length} />
    </div>
  );

  return (
    <div className="flex w-full flex-col">
      <div className={cn(styles.band, showcase && styles.bandShowcase)}>
        <div className={styles.bandBackdrop} aria-hidden="true">
          <div className={styles.bandStars} />
        </div>
        <div className={styles.intro}>
          {kicker &&
            (showcase ? (
              <SectionEyebrow align="center" className={styles.introKicker}>
                {kicker}
              </SectionEyebrow>
            ) : (
              <LandingKicker className={styles.introKicker}>{kicker}</LandingKicker>
            ))}
          {heading}
          <LandingBody className={cn(styles.introBody, showcase && "max-lg:max-w-sm")}>
            {body}
          </LandingBody>
        </div>

        <div className={styles.carouselShell}>
          <div className={styles.carouselGlow} aria-hidden="true" />
          {reducedMotion ? (
            <ScrollCarousel
              ref={carouselRef}
              slides={slides}
              onActiveIndexChange={onActiveIndexChange}
            />
          ) : (
            <DragCarousel
              ref={carouselRef}
              slides={slides}
              variant={variant}
              onActiveIndexChange={onActiveIndexChange}
            />
          )}
        </div>

        <div className={styles.controlsBlock}>
          {showcase ? (
            <>
              <div className={styles.pagerMobile}>
                <CarouselPager
                  index={activeIndex}
                  total={slides.length}
                  onPrev={() => carouselRef.current?.prev()}
                  onNext={() => carouselRef.current?.next()}
                />
              </div>
              <div className={styles.pagerDesktop}>{nav}</div>
            </>
          ) : (
            nav
          )}

          <div className={styles.ctaBlock}>
            <MagneticButton
              href={cta.href}
              size="md"
              withMiniOrb
              className={showcase ? styles.showcaseCta : styles.worksCta}
            >
              {cta.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
