"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Distribute N points evenly on a sphere (Fibonacci lattice). */
function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (1 + Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = golden * i;
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

type LayerProps = {
  count: number;
  radius: number;
  size: number;
  opacity: number;
  color: string;
  speed: number;
};

function Layer({ count, radius, size, opacity, color, speed }: LayerProps) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => fibonacciSphere(count, radius), [count, radius]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;
    const t = state.clock.elapsedTime;

    // constant drift
    points.rotation.y += delta * speed;

    // gentle mouse parallax (eased toward pointer)
    const targetX = state.pointer.y * 0.25 + Math.sin(t * 0.12) * 0.12;
    const targetY = points.rotation.y + state.pointer.x * 0.0018;
    points.rotation.x += (targetX - points.rotation.x) * 0.04;
    points.rotation.y += (targetY - points.rotation.y) * 0.02;

    // subtle breathing scale
    const s = 1 + Math.sin(t * 0.6) * 0.015;
    points.scale.setScalar(s);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Two nested point-cloud spheres in ink — a calm, tactile 3D object that
 * fits a minimal palette. Rotates slowly and follows the cursor.
 */
export default function ParticleSphere() {
  return (
    <group rotation={[0.35, 0, 0.1]}>
      <Layer
        count={2800}
        radius={2.25}
        size={0.02}
        opacity={0.9}
        color="#141310"
        speed={0.045}
      />
      <Layer
        count={900}
        radius={1.5}
        size={0.03}
        opacity={0.35}
        color="#c2410c"
        speed={-0.07}
      />
    </group>
  );
}
