"use client";

/* eslint-disable react/no-unknown-property */
/**
 * Soft dark-teal smoke burst for the wish orb — emits before each phrase advances.
 */
import * as THREE from "three";
import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";

export const SMOKE_LEAD_MS = 800;

const PARTICLE_COUNT = 64;
const SMOKE_COLORS = [
  new THREE.Color("#0B2A46"),
  new THREE.Color("#093540"),
  new THREE.Color("#0E5F6B"),
  new THREE.Color("#217B8E"),
] as const;

const SMOKE_VERT = `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = color;
    vAlpha = length(color);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (180.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const SMOKE_FRAG = `
  uniform sampler2D uMap;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 tex = texture2D(uMap, gl_PointCoord);
    float a = tex.a * min(1.0, vAlpha * 1.4);
    if (a < 0.01) discard;
    vec3 base = vColor / max(vAlpha, 0.001);
    gl_FragColor = vec4(base, a * 0.9);
  }
`;

function createSmokeTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,0.55)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.22)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.06)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  colorIndex: number;
  wobble: number;
  active: boolean;
}

function spawnParticle(p: Particle, burst = false): void {
  const spread = burst ? 0.7 : 0.48;
  p.x = (Math.random() - 0.5) * spread;
  // Start across the lower half so rise paths look uneven
  p.y = -0.62 + Math.random() * 0.38;
  p.z = (Math.random() - 0.5) * 0.22;
  p.vx = (Math.random() - 0.5) * 0.32;
  // Fast enough (with life) to reach the top of the orb (~y 0.55+)
  p.vy = 0.55 + Math.random() * 0.75;
  p.maxLife = 0.95 + Math.random() * 0.85;
  p.life = p.maxLife;
  p.size = 16 + Math.random() * 36;
  p.colorIndex = Math.floor(Math.random() * SMOKE_COLORS.length);
  p.wobble = Math.random() * Math.PI * 2;
  p.active = true;
}

interface OrbSmokeFieldProps {
  emitRef: MutableRefObject<number>;
  reducedMotion: boolean;
}

export function OrbSmokeField({ emitRef, reducedMotion }: OrbSmokeFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const spawnAcc = useRef(0);

  const { geometry, material, particles, positions, colors, sizes } = useMemo(() => {
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 1,
      size: 24,
      colorIndex: 0,
      wobble: 0,
      active: false,
    }));

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: createSmokeTexture() },
      },
      vertexShader: SMOKE_VERT,
      fragmentShader: SMOKE_FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
    });

    return { geometry, material, particles, positions, colors, sizes };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const intensity = reducedMotion ? 0 : Math.max(0, Math.min(1, emitRef.current));
    const dt = Math.min(delta, 0.05);

    if (intensity > 0.05) {
      spawnAcc.current += dt * (8 + intensity * 34);
      while (spawnAcc.current >= 1) {
        spawnAcc.current -= 1;
        const idle = particles.find((p) => !p.active);
        if (idle) spawnParticle(idle, intensity > 0.7);
      }
    } else {
      spawnAcc.current = 0;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      const i3 = i * 3;

      if (!p.active) {
        positions[i3 + 1] = -10;
        sizes[i] = 0;
        colors[i3] = 0;
        colors[i3 + 1] = 0;
        colors[i3 + 2] = 0;
        continue;
      }

      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        positions[i3 + 1] = -10;
        sizes[i] = 0;
        continue;
      }

      const age = 1 - p.life / p.maxLife;
      p.wobble += dt * (1.2 + Math.random() * 0.8);
      p.x += p.vx * dt + Math.sin(p.wobble + p.y * 5) * 0.12 * dt;
      p.y += p.vy * dt;
      p.vx += Math.sin(p.y * 6 + p.x * 3 + p.wobble) * 0.14 * dt;
      p.vy *= 0.997;

      const fadeIn = Math.min(1, age * 3.2);
      const fadeOut = Math.min(1, p.life / (p.maxLife * 0.4));
      const alpha = fadeIn * fadeOut * (0.35 + intensity * 0.55);

      positions[i3] = p.x;
      positions[i3 + 1] = p.y;
      positions[i3 + 2] = p.z;

      const color = SMOKE_COLORS[p.colorIndex];
      colors[i3] = color.r * alpha;
      colors[i3 + 1] = color.g * alpha;
      colors[i3 + 2] = color.b * alpha;
      sizes[i] = p.size * (0.75 + age * 1.05) * (0.55 + intensity * 0.55);
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0.08]} renderOrder={3} frustumCulled={false}>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </points>
  );
}
