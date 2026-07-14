"use client";

/* eslint-disable react/no-unknown-property */
/**
 * WishOrbGlass — SiriOrb fill behind a transparent glass lens; wish text + smoke in FBO.
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
import { HERO_WISHES, type HeroWishEntry } from "@/lib/data/hero-wishes";
import { OrbSmokeField, SMOKE_LEAD_MS } from "@/components/home/OrbSmokeField";
import { SiriOrb } from "@/components/home/SiriOrb";
import styles from "./WishOrbGlass.module.css";

const COLORS = {
  aquaDeep: "#18C4D9",
  aquaSoft: "#78E2DD",
  skyLight: "#7DAFE3",
  /** Light body copy against the dark SiriOrb fill. */
  wishInk: "#F0FAFB",
} as const;

const IDLE_POLL_MS = 270;
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

/** Glass overlay: FBO text/smoke on top, transparent centre so DOM SiriOrb shows through. */
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
    vec2 zoomUV = cUV + (uv - cUV) * (1.0 - 0.32 * facing * facing);
    vec2 bend = N.xy * (uRadius / uRes) * (0.08 + 0.32 * edge * edge);
    vec2 ruv = zoomUV - bend;

    // Single sample keeps wish text sharp (no chromatic fringe / false stroke).
    vec4 scene = texture2D(uScene, ruv);
    float content = scene.a;
    vec3 sceneCol = scene.rgb;

    float rim = pow(edge, 3.0);
    vec3 glass = vec3(0.33, 0.88, 0.90) * (0.04 + 0.22 * rim);

    vec3 L1 = normalize(vec3(-0.5, 0.65, 0.55));
    vec3 L2 = normalize(vec3(0.6, -0.5, 0.4));
    float spec =
      pow(max(dot(N, L1), 0.0), 90.0) * 0.28 +
      pow(max(dot(N, L2), 0.0), 140.0) * 0.1;

    vec3 col = glass * (1.0 - content) + sceneCol * content;
    col += vec3(1.0) * spec * (1.0 - content);
    col += vec3(0.55, 0.95, 1.0) * rim * 0.12 * (1.0 - content);

    float alpha = max(content, rim * 0.38 + 0.1 + spec * 0.55 * (1.0 - content));
    gl_FragColor = vec4(col, alpha);
  }`;

export interface OrbMetrics {
  worldRadius: number;
  pxRadius: number;
}

export interface OrbScreenMetrics {
  centerX: number;
  centerY: number;
  pxRadius: number;
}

interface WishOrbGlassProps {
  wishes?: readonly HeroWishEntry[];
  reducedMotion?: boolean;
  anchorRef?: RefObject<HTMLElement | null>;
  onScreenMetrics?: (metrics: OrbScreenMetrics) => void;
}

function computeOrbPxRadius(width: number, height: number): number {
  return Math.min(200, Math.min(width, height) * 0.2);
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

export default function WishOrbGlass({
  wishes = HERO_WISHES,
  reducedMotion = false,
  anchorRef,
  onScreenMetrics,
}: WishOrbGlassProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const siriFillRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<OrbMetrics>({ worldRadius: 0.9, pxRadius: 200 });
  const [active, setActive] = useState(true);
  const [siriSize, setSiriSize] = useState(400);
  const lastSiriSize = useRef(400);
  const onScreenMetricsRef = useRef(onScreenMetrics);
  onScreenMetricsRef.current = onScreenMetrics;

  const reportScreenMetrics = (metrics: OrbScreenMetrics) => {
    const fill = siriFillRef.current;
    if (fill) {
      const diameter = metrics.pxRadius * 2;
      fill.style.left = `${metrics.centerX}px`;
      fill.style.top = `${metrics.centerY}px`;
      fill.style.width = `${diameter}px`;
      fill.style.height = `${diameter}px`;
      if (Math.abs(diameter - lastSiriSize.current) >= 2) {
        lastSiriSize.current = diameter;
        setSiriSize(diameter);
      }
    }
    onScreenMetricsRef.current?.(metrics);
  };

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
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.root} aria-hidden="true">
      <div ref={siriFillRef} className={styles.siriFill}>
        <SiriOrb size={siriSize} reducedMotion={reducedMotion} />
      </div>
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
          metricsRef={metricsRef}
          anchorRef={anchorRef}
          onScreenMetrics={reportScreenMetrics}
        />
        <Preload all />
      </Canvas>
    </div>
  );
}

interface OrbProps {
  wishes: readonly HeroWishEntry[];
  reducedMotion: boolean;
  metricsRef: MutableRefObject<OrbMetrics>;
  anchorRef?: RefObject<HTMLElement | null>;
  onScreenMetrics?: (metrics: OrbScreenMetrics) => void;
}

function Orb({
  wishes,
  reducedMotion,
  metricsRef,
  anchorRef,
  onScreenMetrics,
}: OrbProps) {
  const orbRef = useRef<THREE.Group | null>(null);
  const wishRigRef = useRef<THREE.Group>(null);
  const orbMeshRef = useRef<THREE.Mesh | null>(null);
  const buffer = useFBO(undefined, undefined, {
    samples: 4,
    format: THREE.RGBAFormat,
  });
  const [bufferScene] = useState(() => new THREE.Scene());
  const [orbScene] = useState(() => new THREE.Scene());
  const { gl, size } = useThree();
  const projectVec = useRef(new THREE.Vector3());
  const wishWorld = useRef(new THREE.Vector3());
  const onScreenMetricsRef = useRef(onScreenMetrics);
  onScreenMetricsRef.current = onScreenMetrics;

  const phrasePaused = useRef(false);
  const smokeEmit = useRef(0);
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
      transparent: true,
      depthWrite: false,
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

  useFrame((state) => {
    const { gl: renderer } = state;
    const cam = state.camera;
    const v = state.viewport.getCurrentViewport(cam, [0, 0, ORB_Z]);

    const dpr = renderer.getPixelRatio();
    const pxRadius = computeOrbPxRadius(size.width, size.height);
    const worldRadius = pxRadiusToWorld(pxRadius, size.width, v.width);

    metricsRef.current = { worldRadius, pxRadius };
    phrasePaused.current = false;

    if (anchorRef?.current) {
      home.current = anchorCenterToWorld(anchorRef.current, gl.domElement, v.width, v.height);
    }

    if (!orbRef.current) return;

    orbRef.current.position.set(home.current.x, home.current.y, ORB_Z);

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

    onScreenMetricsRef.current?.({
      centerX: sx,
      centerY: sy,
      pxRadius,
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setRenderTarget(buffer);
    renderer.clear(true, true, true);
    renderer.render(bufferScene, cam);
    renderer.setRenderTarget(null);
    renderer.setClearColor(0x000000, 0);
    renderer.clear(true, true, true);
    renderer.autoClear = false;
    renderer.render(orbScene, cam);
    renderer.autoClear = true;
  }, 1);

  return createPortal(
    <WishColumn
      ref={wishRigRef}
      wishes={wishes}
      phrasePaused={phrasePaused}
      smokeEmit={smokeEmit}
      reducedMotion={reducedMotion}
      metricsRef={metricsRef}
    />,
    bufferScene
  );
}

interface WishColumnProps {
  wishes: readonly HeroWishEntry[];
  phrasePaused: MutableRefObject<boolean>;
  smokeEmit: MutableRefObject<number>;
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
  return `600 18px ${family}`;
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
  const SLOT = 500;
  const TW = 500;
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
    const lines = wrapWishText(ctx, wish.text, 240);
    const lh = 26;
    lines.forEach((l, li) =>
      drawWishLine(ctx, l, TW / 2, cy0 - ((lines.length - 1) * lh) / 2 + li * lh + 5)
    );
  });
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

const WishColumn = forwardRef<THREE.Group, WishColumnProps>(function WishColumn(
  { wishes, phrasePaused, smokeEmit, reducedMotion, metricsRef },
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
  const smokeGroupRef = useRef<THREE.Group>(null);
  const fadingIn = useRef(false);
  const scheduleNextRef = useRef<() => void>(() => {});
  const uScrollUniform = useRef({ value: initialScroll });
  const uOpacityUniform = useRef({ value: 1 });
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
      uOpacity: uOpacityUniform.current,
    }),
    [texture, wishes.length]
  );

  useLayoutEffect(() => {
    uScrollUniform.current.value = initialScroll;
    uOpacityUniform.current.value = 1;
    target.current = initialScroll;
    step.current = initialStep;
    fadingIn.current = false;
    if (materialRef.current?.uniforms?.uScroll) {
      materialRef.current.uniforms.uScroll.value = initialScroll;
    }
    if (materialRef.current?.uniforms?.uOpacity) {
      materialRef.current.uniforms.uOpacity.value = 1;
    }
  }, [initialScroll, initialStep]);

  useEffect(() => {
    if (reducedMotion) {
      smokeEmit.current = 0;
      uOpacityUniform.current.value = 1;
      return;
    }

    let timeoutId = 0;
    let cancelled = false;

    const scheduleForCurrentPhrase = () => {
      if (cancelled) return;
      smokeEmit.current = 0;
      fadingIn.current = false;
      const slot = displayedWishSlot(step.current, wishes.length);
      const dwell = wishes[slot].dwellMs;
      const quietMs = Math.max(0, dwell - SMOKE_LEAD_MS);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(startSmoke, quietMs);
    };

    const startSmoke = () => {
      if (cancelled) return;

      if (phrasePaused.current) {
        timeoutId = window.setTimeout(startSmoke, IDLE_POLL_MS);
        return;
      }

      smokeEmit.current = 1;
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(advancePhrase, SMOKE_LEAD_MS);
    };

    const advancePhrase = () => {
      if (cancelled) return;

      if (phrasePaused.current) {
        timeoutId = window.setTimeout(advancePhrase, IDLE_POLL_MS);
        return;
      }

      smokeEmit.current = 0;
      step.current += 1;
      const nextScroll = scrollForWishStep(step.current, wishes.length);
      target.current = nextScroll;
      uScrollUniform.current.value = nextScroll;
      if (materialRef.current?.uniforms?.uScroll) {
        materialRef.current.uniforms.uScroll.value = nextScroll;
      }
      uOpacityUniform.current.value = 0;
      if (materialRef.current?.uniforms?.uOpacity) {
        materialRef.current.uniforms.uOpacity.value = 0;
      }
      fadingIn.current = true;
    };

    scheduleNextRef.current = scheduleForCurrentPhrase;
    scheduleForCurrentPhrase();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      smokeEmit.current = 0;
      fadingIn.current = false;
      uOpacityUniform.current.value = 1;
    };
  }, [wishes, reducedMotion, phrasePaused, smokeEmit]);

  useFrame((_, delta) => {
    const orbDist = Math.abs(camera.position.z - ORB_Z);
    const wishDist = Math.abs(camera.position.z - WISH_PLANE_Z);
    const depthScale = orbDist / wishDist;
    const planeSize = metricsRef.current.worldRadius * WISH_PLANE_SCALE * depthScale;
    if (planeRef.current) {
      planeRef.current.scale.set(planeSize, planeSize, 1);
    }
    if (smokeGroupRef.current) {
      const smokeScale = planeSize * 0.72;
      smokeGroupRef.current.scale.setScalar(smokeScale);
    }

    const uniforms = materialRef.current?.uniforms ?? wishUniforms;
    const uScroll = uniforms.uScroll;
    const uOpacity = uniforms.uOpacity;
    if (!uScroll || !uOpacity) return;

    uScroll.value = target.current;

    if (reducedMotion) {
      uOpacity.value = 1;
      return;
    }

    const fadingOut = smokeEmit.current > 0.5 && !fadingIn.current;
    const targetOpacity = fadingOut ? 0 : 1;
    const opacitySpeed = fadingOut ? 3.8 : 2.8;
    uOpacity.value += (targetOpacity - uOpacity.value) * Math.min(1, delta * opacitySpeed);

    if (fadingIn.current && uOpacity.value > 0.98) {
      uOpacity.value = 1;
      fadingIn.current = false;
      scheduleNextRef.current();
    }
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
            uniform float uOpacity;
            varying vec2 vUv;
            void main(){
              vec4 t = texture2D(uText, vec2(vUv.x, vUv.y / uSlots + uScroll));
              float d = distance(vUv, vec2(0.5));
              float m = smoothstep(0.28, 0.20, d);
              gl_FragColor = vec4(t.rgb, t.a * m * uOpacity);
            }`}
        />
      </mesh>
      <group ref={smokeGroupRef} renderOrder={3}>
        <OrbSmokeField emitRef={smokeEmit} reducedMotion={reducedMotion} />
      </group>
    </group>
  );
});
