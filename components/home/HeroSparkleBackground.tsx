"use client";

/* eslint-disable react/no-unknown-property */
/**
 * Soft FBO backdrop for the wish orb. Hero visible background uses CSS (Hero.module.css).
 */
import * as THREE from "three";
import { useMemo } from "react";
import { useThree } from "@react-three/fiber";

export const HERO_SPARKLE_COLORS = {
  bg: "#F0FAFB",
  bgLight: "#FAFEFE",
  bgDeep: "#E6FAFB",
} as const;

/** Soft gradient rendered into the orb FBO (not the visible hero background). */
export function HeroSparkleScene() {
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
    </group>
  );
}
