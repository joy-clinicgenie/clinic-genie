"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { useEffect } from "react";
import { OrbBody } from "./OrbBody";
import { ORB_VARIANTS } from "./variants";
import { pointer, startPointerTracking } from "@/lib/hooks/usePointer";
import type { OrbVariant } from "./store";

/**
 * The WebGL orb. Loaded only on the client via next/dynamic (ssr:false).
 * Demand frameloop — OrbBody calls invalidate() while it animates.
 */
export function OrbCanvas({ variant = "home" }: { variant?: OrbVariant }) {
  const cfg = ORB_VARIANTS[variant];

  useEffect(() => {
    startPointerTracking();
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ powerPreference: "high-performance", antialias: false, alpha: true, stencil: false }}
      performance={{ min: 0.5 }}
      style={{ pointerEvents: "none", touchAction: "none" }}
    >
      <ambientLight intensity={0.55} />
      <OrbBody variant={variant} pointerX={() => pointer.mx.get()} pointerY={() => -pointer.my.get()} />
      {/* Locally-generated environment for refraction — no CDN HDR fetch. */}
      <Environment resolution={64} background={false}>
        <Lightformer form="ring"   intensity={2.4} color="#78E2DD" position={[2.5, 2, 3]}   scale={3} />
        <Lightformer form="circle" intensity={1.8} color="#18C4D9" position={[-3, -1.5, 2]} scale={3} />
        <Lightformer form="rect"   intensity={1.1} color="#7DAFE3" position={[0, 3, -2.5]}  scale={4} />
        <Lightformer form="circle" intensity={1.2} color="#CCF4F6" position={[3, -2, -1]}   scale={2.5} />
      </Environment>
      {cfg.bloom && (
        <EffectComposer enableNormalPass={false}>
          <Bloom
            mipmapBlur
            intensity={0.9}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.3}
            kernelSize={KernelSize.LARGE}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
