"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleSphere from "./ParticleSphere";

/**
 * The WebGL canvas for the hero. Transparent background so the paper shows
 * through. Kept intentionally lightweight for a fast first paint.
 */
export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ParticleSphere />
      </Suspense>
    </Canvas>
  );
}
