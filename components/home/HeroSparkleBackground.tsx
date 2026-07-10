"use client";

/* eslint-disable react/no-unknown-property */
/**
 * Galaxy sparkles for the orb FBO only. Hero visible background uses CSS (Hero.module.css).
 */
import * as THREE from "three";
import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const HERO_SPARKLE_COLORS = {
  bg: "#F0FAFB",
  bgLight: "#FAFEFE",
  bgDeep: "#E6FAFB",
} as const;

export const GALAXY_PROPS = {
  starSpeed: 0.75,
  density: 0.52,
  speed: 0.45,
  glowIntensity: 0.26,
  twinkleIntensity: 0.4,
  rotationSpeed: 0.018,
  autoCenterRepulsion: 0,
} as const;

const GALAXY_VERT = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`;

const GALAXY_FRAG = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uResolution;
  uniform vec2 uFocal;
  uniform vec2 uRotation;
  uniform float uStarSpeed;
  uniform float uDensity;
  uniform float uSpeed;
  uniform vec2 uMouse;
  uniform float uGlowIntensity;
  uniform bool uMouseRepulsion;
  uniform float uTwinkleIntensity;
  uniform float uRotationSpeed;
  uniform float uRepulsionStrength;
  uniform float uMouseActiveFactor;
  uniform float uAutoCenterRepulsion;
  varying vec2 vUv;
  #define NUM_LAYER 4.0
  #define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
  #define PERIOD 3.0
  float Hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float tri(float x){ return abs(fract(x) * 2.0 - 1.0); }
  float tris(float x){ float t = fract(x); return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0)); }
  float trisn(float x){ float t = fract(x); return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0; }
  float Star(vec2 uv, float flare){
    float d = length(uv);
    float m = (0.05 * uGlowIntensity) / d;
    float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * flare * uGlowIntensity;
    uv *= MAT45;
    rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * 0.3 * flare * uGlowIntensity;
    m *= smoothstep(1.0, 0.2, d);
    return m;
  }
  vec3 StarLayer(vec2 uv){
    vec3 col = vec3(0.0);
    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    for (int y = -1; y <= 1; y++){
      for (int x = -1; x <= 1; x++){
        vec2 si = id + vec2(float(x), float(y));
        float seed = Hash21(si);
        float size = fract(seed * 345.32);
        float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
        float flareSize = smoothstep(0.97, 1.0, size) * glossLocal;
        float brightness = 0.72 + 0.28 * seed;
        vec3 base = vec3(brightness);
        vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
        float star = Star(gv - vec2(float(x), float(y)) - pad, flareSize);
        float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
        twinkle = mix(1.0, twinkle, uTwinkleIntensity);
        star *= twinkle;
        col += star * size * base * 0.55;
      }
    }
    return col;
  }
  void main(){
    vec2 focalPx = uFocal * uResolution.xy;
    vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
    vec2 mouseNorm = uMouse - vec2(0.5);
    if (uAutoCenterRepulsion > 0.0){
      float centerDist = length(uv);
      uv += normalize(uv) * (uAutoCenterRepulsion / (centerDist + 0.1)) * 0.05;
    } else if (uMouseRepulsion){
      vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
      float mouseDist = length(uv - mousePosUV);
      vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
      uv += repulsion * 0.05 * uMouseActiveFactor;
    } else {
      uv += mouseNorm * 0.1 * uMouseActiveFactor;
    }
    float autoRotAngle = uTime * uRotationSpeed;
    mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
    uv = autoRot * uv;
    uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
    vec3 col = vec3(0.0);
    for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER){
      float depth = fract(i + uStarSpeed * uSpeed);
      float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
      float fade = depth * smoothstep(1.0, 0.9, depth);
      col += StarLayer(uv * scale + i * 453.32) * fade;
    }
    float lum = length(col);
    col *= smoothstep(0.01, 0.045, lum);
    gl_FragColor = vec4(col, 1.0);
  }`;

function GalaxyField({ reducedMotion }: { reducedMotion: boolean }) {
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector3(viewport.width, viewport.height, viewport.width / viewport.height) },
      uFocal: { value: new THREE.Vector2(0.5, 0.5) },
      uRotation: { value: new THREE.Vector2(1.0, 0.0) },
      uStarSpeed: { value: 0 },
      uDensity: { value: GALAXY_PROPS.density },
      uSpeed: { value: GALAXY_PROPS.speed },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uGlowIntensity: { value: GALAXY_PROPS.glowIntensity },
      uMouseRepulsion: { value: false },
      uTwinkleIntensity: { value: GALAXY_PROPS.twinkleIntensity },
      uRotationSpeed: { value: reducedMotion ? 0 : GALAXY_PROPS.rotationSpeed },
      uRepulsionStrength: { value: 0 },
      uMouseActiveFactor: { value: 0 },
      uAutoCenterRepulsion: { value: GALAXY_PROPS.autoCenterRepulsion },
    }),
    [viewport.width, viewport.height, reducedMotion]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    uniforms.uResolution.value.set(
      state.viewport.width,
      state.viewport.height,
      state.viewport.width / state.viewport.height
    );

    if (reducedMotion) {
      uniforms.uTime.value = 0;
      uniforms.uStarSpeed.value = 0;
      return;
    }

    uniforms.uTime.value = t;
    uniforms.uStarSpeed.value = (t * GALAXY_PROPS.starSpeed) / 10.0;
  });

  return (
    <mesh position={[0, 0, -0.5]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={GALAXY_VERT}
        fragmentShader={GALAXY_FRAG}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/** Gradient + sparkles rendered into the orb FBO (not the visible hero background). */
export function HeroSparkleScene({ reducedMotion }: { reducedMotion: boolean }) {
  const { viewport } = useThree();

  const bgTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1;
    c.height = 512;
    const ctx = c.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(c);
    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, HERO_SPARKLE_COLORS.bgLight);
    g.addColorStop(0.5, HERO_SPARKLE_COLORS.bg);
    g.addColorStop(1, HERO_SPARKLE_COLORS.bgDeep);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1, 512);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  return (
    <group>
      <mesh position={[0, 0, -1]} scale={[viewport.width * 1.2, viewport.height * 1.2, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={bgTexture} />
      </mesh>
      <GalaxyField reducedMotion={reducedMotion} />
    </group>
  );
}
