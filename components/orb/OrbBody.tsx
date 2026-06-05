"use client";

import { useRef } from "react";
import { useFrame, invalidate } from "@react-three/fiber";
import { MeshTransmissionMaterial, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { ORB_VARIANTS, ORB_BLUE, ORB_TINT, type OrbVariantConfig } from "./variants";
import { useOrbStore, type OrbMood, type OrbVariant } from "./store";

interface MoodParams {
  distMul: number;
  pulseSpeed: number;
  coreBright: number;
  rotSpeed: number;
  rimMix: number;
}

function moodParams(mood: OrbMood): MoodParams {
  switch (mood) {
    case "curious":
      return { distMul: 1.15, pulseSpeed: 1.8, coreBright: 1.5, rotSpeed: 0.5, rimMix: 0.6 };
    case "thinking":
      return { distMul: 1.7, pulseSpeed: 3.2, coreBright: 1.1, rotSpeed: 0.9, rimMix: 0.8 };
    case "focus":
      return { distMul: 0.7, pulseSpeed: 1.2, coreBright: 1.45, rotSpeed: 0.3, rimMix: 0.4 };
    case "celebrate":
      return { distMul: 1.3, pulseSpeed: 2.6, coreBright: 1.9, rotSpeed: 0.7, rimMix: 0.7 };
    default:
      return { distMul: 1, pulseSpeed: 1.5, coreBright: 1.4, rotSpeed: 0.35, rimMix: 0.5 };
  }
}

const damp = THREE.MathUtils.damp;

export function OrbBody({
  variant,
  pointerX,
  pointerY,
}: {
  variant: OrbVariant;
  pointerX: () => number;
  pointerY: () => number;
}) {
  const cfg: OrbVariantConfig = ORB_VARIANTS[variant];
  const group = useRef<THREE.Group>(null!);
  const light = useRef<THREE.PointLight>(null!);
  const mat = useRef<any>(null!);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null!);
  const rimMat = useRef<THREE.MeshBasicMaterial>(null!);
  const tintColor = useRef(new THREE.Color(ORB_TINT));

  // smoothed runtime state
  const cur = useRef({ dist: cfg.distortion, bright: 1.4, scale: 1, rim: 0.25, burstK: 0 });
  const lastBurst = useRef(0);
  const lastPulse = useRef(0);
  const burstTimer = useRef(0);
  const pulseTimer = useRef(0);
  const coreColor = useRef(new THREE.Color(ORB_BLUE));
  const tmpVec = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const s = useOrbStore.getState();
    const m = moodParams(s.mood);
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // one-shot tokens
    if (s.burstToken !== lastBurst.current) {
      lastBurst.current = s.burstToken;
      burstTimer.current = 1;
    }
    if (s.pulseToken !== lastPulse.current) {
      lastPulse.current = s.pulseToken;
      pulseTimer.current = 1;
    }
    burstTimer.current = Math.max(0, burstTimer.current - dt * 1.6);
    pulseTimer.current = Math.max(0, pulseTimer.current - dt * 2.4);

    // targets
    const targetDist = cfg.distortion * m.distMul;
    const targetBright = m.coreBright * (0.85 + s.intensity * 0.5) + burstTimer.current * 0.9;
    const targetScale = s.scale * (1 + burstTimer.current * 0.12 + pulseTimer.current * 0.06);
    const targetRim = 0.18 + m.rimMix * 0.35 + s.intensity * 0.15;

    cur.current.dist = damp(cur.current.dist, targetDist, 4, dt);
    cur.current.bright = damp(cur.current.bright, targetBright, 5, dt);
    cur.current.scale = damp(cur.current.scale, targetScale, 6, dt);
    cur.current.rim = damp(cur.current.rim, targetRim, 4, dt);

    // breathing core
    const breathe = cur.current.bright + Math.sin(t * m.pulseSpeed) * 0.32;
    if (coreMat.current) {
      coreColor.current.set(ORB_BLUE).lerp(tintColor.current, 0.15 + burstTimer.current * 0.5);
      coreMat.current.color.copy(coreColor.current).multiplyScalar(Math.max(0.6, breathe));
    }
    if (rimMat.current) rimMat.current.opacity = cur.current.rim;
    if (mat.current) {
      mat.current.distortion = cur.current.dist;
      mat.current.temporalDistortion = 0.1 + (s.mood === "thinking" ? 0.18 : 0.05);
      mat.current.chromaticAberration = 0.05 + burstTimer.current * 0.08;
    }

    // pointer lean + light follow (global pointer; canvas is pointer-events:none)
    const px = pointerX();
    const py = pointerY();
    group.current.rotation.y = damp(group.current.rotation.y, px * 0.45, 3, dt);
    group.current.rotation.x = damp(group.current.rotation.x, -py * 0.32, 3, dt);
    group.current.rotation.z += dt * 0.05 * m.rotSpeed;
    group.current.scale.setScalar(cur.current.scale);

    if (light.current) {
      tmpVec.current.set(px * 3.2, py * 3.2, 3);
      light.current.position.lerp(tmpVec.current, 0.08);
      light.current.intensity = 5 + cur.current.bright * 2 + burstTimer.current * 4;
    }

    // keep demand-mode alive while visible/animating
    invalidate();
  });

  const sparkleCount = cfg.sparkles;

  return (
    <Float speed={cfg.floatSpeed} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={group}>
        <pointLight ref={light} color={ORB_BLUE} intensity={6} distance={9} />
        {/* refractive crystal shell */}
        <mesh>
          <icosahedronGeometry args={[1, 12]} />
          <MeshTransmissionMaterial
            ref={mat}
            transmission={1}
            thickness={1.2}
            roughness={0.08}
            ior={1.45}
            chromaticAberration={0.06}
            anisotropicBlur={0.4}
            distortion={cfg.distortion}
            distortionScale={0.4}
            temporalDistortion={0.12}
            samples={cfg.samples}
            resolution={cfg.resolution}
            color={ORB_TINT}
            attenuationColor={ORB_BLUE}
            attenuationDistance={1.4}
            backside={false}
          />
        </mesh>
        {/* inner plasma core */}
        <mesh scale={0.55}>
          <icosahedronGeometry args={[1, 6]} />
          <meshBasicMaterial ref={coreMat} color={ORB_BLUE} toneMapped={false} />
        </mesh>
        {/* fresnel-ish rim glow (additive, slightly larger backside shell) */}
        <mesh scale={1.04}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial
            ref={rimMat}
            color={ORB_TINT}
            transparent
            opacity={0.25}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
        <Sparkles count={sparkleCount} scale={2.6} size={3} speed={0.4} noise={1.5} color={ORB_TINT} />
      </group>
    </Float>
  );
}
