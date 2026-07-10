"use client";

/* eslint-disable react/no-unknown-property */
/**
 * WishOrbGlass — lens orb from clinic-genie-orb-concept.html.
 * FBO buffer scene → flat bg render → custom lens shader composited on top.
 */
import * as THREE from "three";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type RefObject,
} from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { Preload, useFBO } from "@react-three/drei";
import { easing } from "maath";
import { HERO_WISHES, type HeroWishEntry } from "@/lib/data/hero-wishes";
import { HeroSparkleScene, HERO_SPARKLE_COLORS } from "@/components/home/HeroSparkleBackground";
import styles from "./WishOrbGlass.module.css";

const COLORS = {
  bg: HERO_SPARKLE_COLORS.bg,
  aquaDeep: "#18C4D9",
  aquaSoft: "#78E2DD",
  skyLight: "#7DAFE3",
  wishInk: "#093540",
} as const;

const IDLE_POLL_MS = 250;
const WISH_PLANE_SCALE = 40;
const WISH_PLANE_Z = 0.3;
const ORB_Z = 15;

const ndcScratch = new THREE.Vector3();
const rayScratch = new THREE.Vector3();
const dirScratch = new THREE.Vector3();

/** Map a world point to the buffer-scene depth that shares the same screen projection. */
function worldAtDepthMatchingScreen(
  source: THREE.Vector3,
  depthZ: number,
  camera: THREE.Camera,
  target: THREE.Vector3
): THREE.Vector3 {
  ndcScratch.copy(source).project(camera);
  rayScratch.set(ndcScratch.x, ndcScratch.y, 0.5).unproject(camera);
  dirScratch.copy(rayScratch).sub(camera.position).normalize();
  const distance = (depthZ - camera.position.z) / dirScratch.z;
  return target.copy(camera.position).addScaledVector(dirScratch, distance);
}

const ORB_VERT = `
  varying vec3 vN;
  void main(){
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`;

const ORB_FRAG = `
  uniform sampler2D uScene;
  uniform vec2 uRes;
  uniform vec2 uCenter;
  uniform float uRadius;
  varying vec3 vN;
  void main(){
    vec3 N = normalize(vN);
    vec2 uv = gl_FragCoord.xy / uRes;
    float facing = clamp(N.z, 0.0, 1.0);
    float edge = 1.0 - facing;

    vec2 cUV = uCenter / uRes;
    vec2 zoomUV = cUV + (uv - cUV) * (1.0 - 0.38 * facing * facing);
    vec2 bend = N.xy * (uRadius / uRes) * (0.10 + 0.85 * edge * edge);
    vec2 ruv = zoomUV - bend;

    vec2 ca = N.xy * (0.0008 + 0.0045 * edge * edge);
    vec3 col;
    col.r = texture2D(uScene, ruv + ca).r;
    col.g = texture2D(uScene, ruv).g;
    col.b = texture2D(uScene, ruv - ca).b;

    col = mix(col, vec3(0.55, 0.90, 0.93), 0.05 + 0.22 * edge * edge);

    float rim = pow(edge, 3.0);
    col += vec3(0.55, 0.95, 1.0) * rim * 0.42;

    vec3 L1 = normalize(vec3(-0.5, 0.65, 0.55));
    vec3 L2 = normalize(vec3(0.6, -0.5, 0.4));
    col += vec3(1.0) * pow(max(dot(N, L1), 0.0), 70.0) * 0.85;
    col += vec3(1.0) * pow(max(dot(N, L2), 0.0), 110.0) * 0.35;

    gl_FragColor = vec4(col, 1.0);
  }`;

export interface OrbMetrics {
  worldRadius: number;
  pxRadius: number;
}

interface WishOrbGlassProps {
  wishes?: readonly HeroWishEntry[];
  reducedMotion?: boolean;
  anchorRef?: RefObject<HTMLElement | null>;
}

function computeOrbPxRadius(width: number, height: number): number {
  return Math.min(200, Math.min(width, height) * 0.22);
}

function pxRadiusToWorld(pxRadius: number, canvasWidth: number, viewportWidth: number): number {
  return (pxRadius / canvasWidth) * viewportWidth;
}

function anchorCenterToWorld(
  anchor: HTMLElement,
  canvas: HTMLCanvasElement,
  viewportWidth: number,
  viewportHeight: number
): { x: number; y: number } {
  const canvasRect = canvas.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  const pxX = anchorRect.left + anchorRect.width / 2 - canvasRect.left;
  const pxY = anchorRect.top + anchorRect.height / 2 - canvasRect.top;
  const ndcX = (pxX / canvasRect.width) * 2 - 1;
  const ndcY = -((pxY / canvasRect.height) * 2 - 1);
  return {
    x: (ndcX * viewportWidth) / 2,
    y: (ndcY * viewportHeight) / 2,
  };
}

function setHeroOrbCursor(mode: "" | "grab" | "grabbing") {
  if (mode) {
    document.body.dataset.heroOrbCursor = mode;
    delete document.body.dataset.customCursor;
  } else {
    delete document.body.dataset.heroOrbCursor;
    if (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.body.dataset.customCursor = "on";
    }
  }
}

function updateOrbiters(
  orbitersEl: HTMLElement | null,
  wrapEl: HTMLElement | null,
  sx: number,
  sy: number,
  orbPx: number
) {
  if (!orbitersEl || !wrapEl) return;
  const rect = wrapEl.getBoundingClientRect();
  orbitersEl.style.left = `${sx - rect.left}px`;
  orbitersEl.style.top = `${sy - rect.top}px`;
  const stars = orbitersEl.children;
  const orbitR = orbPx + 26;
  for (let i = 0; i < stars.length; i++) {
    const a = (i / stars.length) * Math.PI * 2;
    const star = stars[i] as HTMLElement;
    star.style.left = `${Math.cos(a) * orbitR}px`;
    star.style.top = `${Math.sin(a) * orbitR}px`;
    star.style.fontSize = `${12 + i * 3}px`;
  }
}

export default function WishOrbGlass({
  wishes = HERO_WISHES,
  reducedMotion = false,
  anchorRef,
}: WishOrbGlassProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orbitersRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<OrbMetrics>({ worldRadius: 0.85, pxRadius: 200 });
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && !document.hidden);
    });
    io.observe(el);

    const onVis = () => {
      if (document.hidden) setActive(false);
      else if (wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect();
        setActive(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      delete document.body.dataset.heroOrbCursor;
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.root} aria-hidden="true">
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ antialias: true, alpha: true, autoClear: false }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Orb
          wishes={wishes}
          reducedMotion={reducedMotion}
          wrapRef={wrapRef}
          orbitersRef={orbitersRef}
          metricsRef={metricsRef}
          anchorRef={anchorRef}
        />
        <Preload all />
      </Canvas>
      <div ref={orbitersRef} className={styles.orbiters}>
        <b aria-hidden>✦</b>
        <b aria-hidden>✦</b>
        <b aria-hidden>✦</b>
      </div>
    </div>
  );
}

interface OrbProps {
  wishes: readonly HeroWishEntry[];
  reducedMotion: boolean;
  wrapRef: RefObject<HTMLDivElement | null>;
  orbitersRef: RefObject<HTMLDivElement | null>;
  metricsRef: MutableRefObject<OrbMetrics>;
  anchorRef?: RefObject<HTMLElement | null>;
}

function Orb({
  wishes,
  reducedMotion,
  wrapRef,
  orbitersRef,
  metricsRef,
  anchorRef,
}: OrbProps) {
  const orbRef = useRef<THREE.Group | null>(null);
  const wishRigRef = useRef<THREE.Group>(null);
  const orbMeshRef = useRef<THREE.Mesh | null>(null);
  const buffer = useFBO(undefined, undefined, { samples: 4 });
  const [bufferScene] = useState(() => new THREE.Scene());
  const [orbScene] = useState(() => new THREE.Scene());
  const { viewport, gl, size, camera } = useThree();
  const lastMove = useRef(0);
  const prevPointer = useRef(new THREE.Vector2(99, 99));
  const cursorActive = useRef(false);
  const projectVec = useRef(new THREE.Vector3());
  const wishWorld = useRef(new THREE.Vector3());

  const vAtOrbDepth = useRef({ width: viewport.width, height: viewport.height });
  const dragging = useRef(false);
  const returning = useRef(false);
  const phrasePaused = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const home = useRef({ x: 0, y: 0 });

  const orbUniforms = useMemo(
    () => ({
      uScene: { value: buffer.texture },
      uRes: { value: new THREE.Vector2(size.width, size.height) },
      uCenter: { value: new THREE.Vector2(0, 0) },
      uRadius: { value: 100 },
    }),
    [buffer.texture, size.width, size.height]
  );

  useLayoutEffect(() => {
    orbUniforms.uScene.value = buffer.texture;
  }, [buffer.texture, orbUniforms]);

  useLayoutEffect(() => {
    const geometry = new THREE.SphereGeometry(1, 96, 96);
    const material = new THREE.ShaderMaterial({
      uniforms: orbUniforms,
      vertexShader: ORB_VERT,
      fragmentShader: ORB_FRAG,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    orbMeshRef.current = mesh;
    const group = new THREE.Group();
    group.add(mesh);
    orbRef.current = group;
    orbScene.add(group);
    group.position.set(0, 0, ORB_Z);

    return () => {
      orbScene.remove(group);
      geometry.dispose();
      material.dispose();
    };
  }, [orbScene, orbUniforms]);

  useEffect(() => {
    if (reducedMotion) return;

    const dom = gl.domElement;
    dom.style.touchAction = "none";

    const toWorld = (e: PointerEvent) => {
      const rect = dom.getBoundingClientRect();
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const { width, height } = vAtOrbDepth.current;
      return { x: (ndcX * width) / 2, y: (ndcY * height) / 2 };
    };

    const overOrb = (p: { x: number; y: number }) => {
      const o = orbRef.current;
      if (!o) return false;
      return Math.hypot(p.x - o.position.x, p.y - o.position.y) <= metricsRef.current.worldRadius * 1.1;
    };

    const onDown = (e: PointerEvent) => {
      const p = toWorld(e);
      if (!overOrb(p)) return;
      dragging.current = true;
      returning.current = false;
      vel.current.x = 0;
      vel.current.y = 0;
      if (orbRef.current) {
        dragOffset.current.x = orbRef.current.position.x - p.x;
        dragOffset.current.y = orbRef.current.position.y - p.y;
      }
      dom.setPointerCapture(e.pointerId);
      setHeroOrbCursor("grabbing");
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      const p = toWorld(e);
      if (dragging.current && orbRef.current) {
        orbRef.current.position.x = p.x + dragOffset.current.x;
        orbRef.current.position.y = p.y + dragOffset.current.y;
        setHeroOrbCursor("grabbing");
      } else {
        setHeroOrbCursor(overOrb(p) ? "grab" : "");
      }
    };

    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      returning.current = true;
      setHeroOrbCursor("");
    };

    dom.addEventListener("pointerdown", onDown);
    dom.addEventListener("pointermove", onMove);
    dom.addEventListener("pointerup", onUp);
    dom.addEventListener("pointercancel", onUp);

    return () => {
      dom.removeEventListener("pointerdown", onDown);
      dom.removeEventListener("pointermove", onMove);
      dom.removeEventListener("pointerup", onUp);
      dom.removeEventListener("pointercancel", onUp);
      setHeroOrbCursor("");
    };
  }, [gl, reducedMotion, metricsRef]);

  useFrame((state, delta) => {
    const { gl: renderer, pointer, clock } = state;
    const t = clock.elapsedTime;
    const cam = state.camera;
    const v = state.viewport.getCurrentViewport(cam, [0, 0, ORB_Z]);
    vAtOrbDepth.current.width = v.width;
    vAtOrbDepth.current.height = v.height;

    const dpr = renderer.getPixelRatio();
    const pxRadius = computeOrbPxRadius(size.width, size.height);
    const worldRadius = pxRadiusToWorld(pxRadius, size.width, v.width);
    const safeMargin = worldRadius * 0.12;

    metricsRef.current = { worldRadius, pxRadius };

    if (!reducedMotion && !pointer.equals(prevPointer.current)) {
      lastMove.current = t;
      prevPointer.current.copy(pointer);
    }
    cursorActive.current = !reducedMotion && t - lastMove.current < 2;
    phrasePaused.current = dragging.current || returning.current;

    const halfW = v.width / 2;
    const limX = halfW - worldRadius - 0.05;
    const limY = Math.max(0, v.height / 2 - worldRadius - 0.05);
    const safeMinX = -halfW + worldRadius + safeMargin;

    if (anchorRef?.current) {
      home.current = anchorCenterToWorld(anchorRef.current, gl.domElement, v.width, v.height);
    }

    const homeX = home.current.x;
    const homeY = home.current.y;

    if (!orbRef.current) return;

    if (reducedMotion) {
      orbRef.current.position.set(homeX, homeY, ORB_Z);
    } else if (dragging.current) {
      const margin = worldRadius + 0.08;
      orbRef.current.position.x = THREE.MathUtils.clamp(orbRef.current.position.x, -halfW + margin, halfW - margin);
      orbRef.current.position.y = THREE.MathUtils.clamp(
        orbRef.current.position.y,
        -v.height / 2 + margin,
        v.height / 2 - margin
      );
      orbRef.current.position.z = ORB_Z;
    } else if (returning.current) {
      const dx = orbRef.current.position.x - homeX;
      const dy = orbRef.current.position.y - homeY;
      const ax = -220 * dx - 20 * vel.current.x;
      const ay = -220 * dy - 20 * vel.current.y;
      vel.current.x += ax * delta;
      vel.current.y += ay * delta;
      orbRef.current.position.x += vel.current.x * delta;
      orbRef.current.position.y += vel.current.y * delta;
      orbRef.current.position.z = ORB_Z;
      if (Math.hypot(dx, dy) < 0.02 && Math.hypot(vel.current.x, vel.current.y) < 0.05) {
        returning.current = false;
        orbRef.current.position.set(homeX, homeY, ORB_Z);
        vel.current.x = 0;
        vel.current.y = 0;
      }
    } else {
      const wanderX = cursorActive.current
        ? pointer.x * v.width * 0.13
        : Math.sin(t * 0.19) * v.width * 0.11;
      const destX = homeX + wanderX;
      const destY = cursorActive.current
        ? (pointer.y * v.height) / 2
        : homeY + Math.cos(t * 0.23) * limY * 0.75;
      const bob = Math.sin(t * 0.9) * 0.04;
      const x = THREE.MathUtils.clamp(destX, safeMinX, limX);
      const y = THREE.MathUtils.clamp(destY, homeY - limY, homeY + limY) + bob;
      easing.damp3(orbRef.current.position, [x, y, ORB_Z], 0.25, delta);
    }

    if (wishRigRef.current) {
      worldAtDepthMatchingScreen(orbRef.current.position, WISH_PLANE_Z, cam, wishWorld.current);
      wishRigRef.current.position.copy(wishWorld.current);
    }

    if (orbMeshRef.current) {
      orbMeshRef.current.scale.setScalar(worldRadius);
    }

    projectVec.current.copy(orbRef.current.position);
    projectVec.current.project(cam);
    const sx = (projectVec.current.x * 0.5 + 0.5) * size.width;
    const sy = (1 - (projectVec.current.y * 0.5 + 0.5)) * size.height;

    orbUniforms.uRes.value.set(size.width * dpr, size.height * dpr);
    orbUniforms.uCenter.value.set(sx * dpr, sy * dpr);
    orbUniforms.uRadius.value = pxRadius * dpr;

    updateOrbiters(orbitersRef.current, wrapRef.current, sx, sy, pxRadius);

    renderer.setClearColor(COLORS.bg, 1);
    renderer.setRenderTarget(buffer);
    renderer.render(bufferScene, cam);
    renderer.setRenderTarget(null);
    renderer.setClearColor(0x000000, 0);
    renderer.clear(true, true, true);
    renderer.autoClear = false;
    renderer.render(orbScene, cam);
    renderer.autoClear = true;
  }, 1);

  return createPortal(
    <>
      <HeroSparkleScene reducedMotion={reducedMotion} />
      <WishColumn
        ref={wishRigRef}
        wishes={wishes}
        phrasePaused={phrasePaused}
        reducedMotion={reducedMotion}
        metricsRef={metricsRef}
      />
    </>,
    bufferScene
  );
}

interface WishColumnProps {
  wishes: readonly HeroWishEntry[];
  phrasePaused: MutableRefObject<boolean>;
  reducedMotion: boolean;
  metricsRef: MutableRefObject<OrbMetrics>;
}

function scrollForWishStep(stepIndex: number, wishCount: number): number {
  return -(stepIndex + 1) / wishCount;
}

function displayedWishSlot(stepIndex: number, wishCount: number): number {
  const slot = Math.floor(-scrollForWishStep(stepIndex, wishCount) * wishCount + 0.5) % wishCount;
  return ((slot % wishCount) + wishCount) % wishCount;
}

function randomWishStep(wishCount: number): number {
  const slot = Math.floor(Math.random() * wishCount);
  return slot === 0 ? wishCount - 1 : slot - 1;
}

function resolveSoraFontFamily(): string {
  if (typeof document === "undefined") return "Sora, sans-serif";
  const fromVar = getComputedStyle(document.documentElement).getPropertyValue("--font-sora").trim();
  return fromVar || "Sora, sans-serif";
}

function wishFontSpec(family = resolveSoraFontFamily()): string {
  return `600 20px ${family}`;
}

const WISH_PREFIX = "I wish";

function wrapWishText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  text.split(" ").forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  lines.push(line);
  return lines;
}

function drawWishLine(
  ctx: CanvasRenderingContext2D,
  line: string,
  cx: number,
  y: number
): void {
  ctx.textAlign = "left";
  const lineWidth = ctx.measureText(line).width;
  let x = cx - lineWidth / 2;

  if (line.startsWith(WISH_PREFIX)) {
    ctx.fillStyle = COLORS.aquaDeep;
    ctx.fillText(WISH_PREFIX, x, y);
    x += ctx.measureText(WISH_PREFIX).width;
    ctx.fillStyle = COLORS.wishInk;
    ctx.fillText(line.slice(WISH_PREFIX.length), x, y);
    return;
  }

  ctx.fillStyle = COLORS.wishInk;
  ctx.fillText(line, x, y);
}

function createWishTexture(wishes: readonly HeroWishEntry[], font: string): THREE.CanvasTexture {
  const SLOT = 512;
  const TW = 512;
  const CS = 2;
  const canvas = document.createElement("canvas");
  canvas.width = TW * CS;
  canvas.height = SLOT * wishes.length * CS;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.setTransform(CS, 0, 0, CS, 0, 0);
  wishes.forEach((wish, i) => {
    const cy0 = i * SLOT + SLOT / 2;
    ctx.font = font;
    ctx.shadowColor = "rgba(255,255,255,.95)";
    ctx.shadowBlur = 8;
    const lines = wrapWishText(ctx, wish.text, 205);
    const lh = 32;
    lines.forEach((l, li) =>
      drawWishLine(ctx, l, TW / 2, cy0 - ((lines.length - 1) * lh) / 2 + li * lh + 4)
    );
    ctx.shadowBlur = 0;
  });
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

const WishColumn = forwardRef<THREE.Group, WishColumnProps>(function WishColumn(
  { wishes, phrasePaused, reducedMotion, metricsRef },
  ref
) {
  const initialStep = useMemo(() => randomWishStep(wishes.length), [wishes.length]);
  const initialScroll = useMemo(
    () => scrollForWishStep(initialStep, wishes.length),
    [initialStep, wishes.length]
  );

  const step = useRef(initialStep);
  const target = useRef(initialScroll);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const isScrolling = useRef(false);
  const scheduleNextRef = useRef<() => void>(() => {});
  const uScrollUniform = useRef({ value: initialScroll });
  const { camera } = useThree();
  const [texture, setTexture] = useState(() => createWishTexture(wishes, wishFontSpec()));

  useEffect(() => {
    let cancelled = false;
    const font = wishFontSpec();

    const refreshTexture = () => {
      if (cancelled) return;
      const next = createWishTexture(wishes, font);
      setTexture((prev) => {
        prev.dispose();
        return next;
      });
    };

    refreshTexture();
    void document.fonts.load(font).then(refreshTexture);

    return () => {
      cancelled = true;
    };
  }, [wishes]);

  useEffect(() => () => texture.dispose(), [texture]);

  const wishUniforms = useMemo(
    () => ({
      uText: { value: texture },
      uScroll: uScrollUniform.current,
      uSlots: { value: wishes.length },
    }),
    [texture, wishes.length]
  );

  useLayoutEffect(() => {
    uScrollUniform.current.value = initialScroll;
    target.current = initialScroll;
    step.current = initialStep;
    if (materialRef.current?.uniforms?.uScroll) {
      materialRef.current.uniforms.uScroll.value = initialScroll;
    }
  }, [initialScroll, initialStep]);

  useEffect(() => {
    if (reducedMotion) return;

    let timeoutId = 0;
    let cancelled = false;

    const scheduleForCurrentPhrase = () => {
      if (cancelled) return;
      const slot = displayedWishSlot(step.current, wishes.length);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(advancePhrase, wishes[slot].dwellMs);
    };

    const advancePhrase = () => {
      if (cancelled) return;

      if (phrasePaused.current) {
        timeoutId = window.setTimeout(advancePhrase, IDLE_POLL_MS);
        return;
      }

      step.current += 1;
      target.current = scrollForWishStep(step.current, wishes.length);
      isScrolling.current = true;
    };

    scheduleNextRef.current = scheduleForCurrentPhrase;
    scheduleForCurrentPhrase();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [wishes, reducedMotion]);

  useFrame((_, delta) => {
    const orbDist = Math.abs(camera.position.z - ORB_Z);
    const wishDist = Math.abs(camera.position.z - WISH_PLANE_Z);
    const depthScale = orbDist / wishDist;
    const planeSize = metricsRef.current.worldRadius * WISH_PLANE_SCALE * depthScale;
    if (planeRef.current) {
      planeRef.current.scale.set(planeSize, planeSize, 1);
    }

    const uScroll = (materialRef.current?.uniforms ?? wishUniforms).uScroll;
    if (!uScroll) return;

    if (reducedMotion) {
      uScroll.value = initialScroll;
      return;
    }

    const diff = target.current - uScroll.value;

    if (isScrolling.current) {
      uScroll.value += diff * Math.min(1, delta * 6.5);
      if (Math.abs(diff) < 0.001) {
        uScroll.value = target.current;
        isScrolling.current = false;
        scheduleNextRef.current();
      }
      return;
    }

    uScroll.value += diff * Math.min(1, delta * 3.5);
  });

  return (
    <group ref={ref}>
      <mesh ref={planeRef} renderOrder={2}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          uniforms={wishUniforms}
          vertexShader={`
            varying vec2 vUv;
            void main(){
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`}
          fragmentShader={`
            uniform sampler2D uText;
            uniform float uScroll;
            uniform float uSlots;
            varying vec2 vUv;
            void main(){
              vec4 t = texture2D(uText, vec2(vUv.x, vUv.y / uSlots + uScroll));
              float d = distance(vUv, vec2(0.5));
              float m = smoothstep(0.32, 0.24, d);
              gl_FragColor = vec4(t.rgb, t.a * m);
            }`}
        />
      </mesh>
    </group>
  );
});
