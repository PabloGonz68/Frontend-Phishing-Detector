import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FISH_COUNT = 150;
const BUBBLE_COUNT = 60;

/* ---------- Instanced Fish School ---------- */
function FishSchool() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Store individual fish parameters
  const fishData = useMemo(() => {
    return Array.from({ length: FISH_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 15 - 5,
      speed: Math.random() * 0.02 + 0.02,
      phase: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.2 + 0.1,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    fishData.forEach((fish, i) => {
      // Move fish horizontally
      fish.x -= fish.speed;
      
      // Wrap around when swimming too far left
      if (fish.x < -20) {
        fish.x = 20;
        fish.y = (Math.random() - 0.5) * 20;
        fish.z = (Math.random() - 0.5) * 15 - 5;
      }

      // Sine wave motion for swimming effect
      const yOffset = Math.sin(t * 2 + fish.phase) * 0.5;
      
      dummy.position.set(fish.x, fish.y + yOffset, fish.z);
      
      // Wiggle rotation (swimming motion)
      dummy.rotation.y = Math.sin(t * 5 + fish.phase) * 0.15;
      dummy.rotation.z = Math.sin(t * 3 + fish.phase) * 0.05;
      
      // Scale to create a flat, elongated fish shape from a sphere
      dummy.scale.set(fish.scale * 2, fish.scale * 0.7, fish.scale * 0.2);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, FISH_COUNT]}>
      {/* Smooth elongated shape instead of a sharp cone/bird */}
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#00d4ff" roughness={0.2} metalness={0.6} />
    </instancedMesh>
  );
}

/* ---------- Rising Bubbles ---------- */
function AmbientBubbles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const bubblesData = useMemo(() => {
    return Array.from({ length: BUBBLE_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 15,
      speed: Math.random() * 0.01 + 0.01,
      scale: Math.random() * 0.05 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    bubblesData.forEach((bubble, i) => {
      bubble.y += bubble.speed;
      if (bubble.y > 10) bubble.y = -10;

      const xOffset = Math.sin(t + bubble.phase) * 0.2;

      dummy.position.set(bubble.x + xOffset, bubble.y, bubble.z);
      dummy.scale.setScalar(bubble.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BUBBLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
    </instancedMesh>
  );
}

/* ---------- Main Component ---------- */
export default function BackgroundOcean3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ background: "transparent" }}>
        <fog attach="fog" args={["#020617", 5, 25]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#0077ff" intensity={1} />
        
        <FishSchool />
        <AmbientBubbles />
      </Canvas>
    </div>
  );
}
