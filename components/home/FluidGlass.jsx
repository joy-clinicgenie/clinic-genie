"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { Suspense, memo, useEffect, useRef, useState } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Preload, Text, useFBO, useGLTF } from "@react-three/drei";
import { easing } from "maath";
import styles from "./FluidGlass.module.css";

const HERO_KEYWORDS = [
  "Healthcare SEO",
  "Medical SEM",
  "Clinic websites",
  "AI search readiness",
  "Specialist clinic marketing",
  "GEO",
  "Healthcare content strategy",
  "Compliance aware growth",
  "Search visibility",
];

export default function FluidGlass({
  mode = "lens",
  lensProps = {},
  barProps = {},
  cubeProps = {},
  eventSource = null,
  content = null,
}) {
  const Wrapper = mode === "bar" ? Bar : mode === "cube" ? Cube : Lens;
  const rawOverrides = mode === "bar" ? barProps : mode === "cube" ? cubeProps : lensProps;
  const { navItems = [], ...modeProps } = rawOverrides;

  return (
    <div className={styles.root}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        eventSource={eventSource ?? undefined}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Wrapper modeProps={modeProps} content={content} />
          <Preload />
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * Renders inside the FBO portal — the scene the lens refracts.
 * Matches the hero visually so the glass looks transparent over the copy.
 */
function LensScene({ content }) {
  const { viewport } = useThree();
  const keywordRows = [
    HERO_KEYWORDS.slice(0, 3).join("  ·  "),
    HERO_KEYWORDS.slice(3, 6).join("  ·  "),
    HERO_KEYWORDS.slice(6, 9).join("  ·  "),
  ];

  return (
    <>
      {/* Hero background */}
      <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
        <planeGeometry />
        <meshBasicMaterial color="#f4fcfd" />
      </mesh>

      {/* Soft brand accent circle */}
      <mesh position={[0, 0, 0.05]} scale={[viewport.width * 0.55, viewport.height * 0.55, 1]}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial color="#b8e9f0" transparent opacity={0.35} />
      </mesh>

      {content?.heading && (
        <Text
          position={[0, 0.42, 0.1]}
          fontSize={0.22}
          maxWidth={6.8}
          textAlign="center"
          lineHeight={1.06}
          letterSpacing={-0.015}
          color="#062d36"
          anchorX="center"
          anchorY="middle"
        >
          {content.heading}
        </Text>
      )}

      {content?.tagline && (
        <Text
          position={[0, 0.06, 0.1]}
          fontSize={0.1}
          maxWidth={5.2}
          textAlign="center"
          color="#18c4d9"
          anchorX="center"
          anchorY="middle"
        >
          {content.tagline}
        </Text>
      )}

      {content?.body && (
        <Text
          position={[0, -0.42, 0.1]}
          fontSize={0.075}
          maxWidth={6}
          textAlign="center"
          lineHeight={1.35}
          color="#44636b"
          anchorX="center"
          anchorY="middle"
        >
          {content.body}
        </Text>
      )}

      {/* Keyword rows — faint, visible through glass */}
      {keywordRows.map((row, i) => (
        <Text
          key={row}
          position={[0, 0.95 - i * 0.26, 0.08]}
          fontSize={0.055}
          maxWidth={7.4}
          textAlign="center"
          color="#18c4d9"
          fillOpacity={0.22}
          anchorX="center"
          anchorY="middle"
        >
          {row}
        </Text>
      ))}
    </>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  content = null,
  ...props
}) {
  const ref = useRef();
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const geoWidthRef = useRef(1);
  const [scene] = useState(() => new THREE.Scene());

  useEffect(() => {
    const geo = nodes[geometryKey]?.geometry;
    if (!geo) return;
    geo.computeBoundingBox();
    geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.setClearColor(0xf4fcfd, 1);
    gl.clear(true, true, true);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(<LensScene content={content} />, scene)}
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={nodes[geometryKey]?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          transmission={1}
          roughness={0}
          attenuationDistance={15}
          attenuationColor="#ffffff"
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, content, ...props }) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      content={content}
      {...props}
    />
  );
}

function Cube({ modeProps, content, ...props }) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
      content={content}
      {...props}
    />
  );
}

function Bar({ modeProps = {}, content, ...props }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 15,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      content={content}
      {...props}
    />
  );
}

useGLTF.preload("/assets/3d/lens.glb");
useGLTF.preload("/assets/3d/bar.glb");
useGLTF.preload("/assets/3d/cube.glb");
