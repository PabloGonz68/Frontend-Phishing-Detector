import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import type { Group, Mesh } from "three";
import * as THREE from "three";

/* ---------- Constants ---------- */
const CYBER_GREEN = "#00ff41";
const CYBER_CYAN = "#00d4ff";
const ALERT_RED = "#ff0040";
const FOG_COLOR = "#020617"; // Ocean deep blue
const BUBBLE_COUNT = 40;

/* ---------- Rising Bubbles ---------- */
function Bubbles() {
  const groupRef = useRef<Group>(null);

  const bubblesData = useMemo(() => {
    return Array.from({ length: BUBBLE_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * 4, // Reduced spread to prevent clipping at edges
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 4,
      scale: Math.random() * 0.05 + 0.01,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((bubble, i) => {
        bubble.position.y += bubblesData[i].speed;
        // Wrap around smoothly within view
        if (bubble.position.y > 3) {
          bubble.position.y = -3;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {bubblesData.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]}>
          <sphereGeometry args={[b.scale, 8, 8]} />
          <meshBasicMaterial color={CYBER_CYAN} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Hook and Bait ---------- */
function HookAndBait() {
  const groupRef = useRef<Group>(null);
  const baitRef = useRef<Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!groupRef.current || !baitRef.current) return;
    const t = clock.getElapsedTime();

    // Subtle floating/swaying
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;

    // Mouse interactive tilt
    groupRef.current.rotation.x += (pointer.y * 0.2 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (pointer.x * 0.2 - groupRef.current.rotation.y) * 0.05;

    // Pulsing bait
    const pulse = 1 + Math.sin(t * 3) * 0.1;
    baitRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* The Hook Shaft */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2, 16]} />
        <meshStandardMaterial color="#8892b0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* The Hook Curve */}
      <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.5, 0.04, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#8892b0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* The Barb */}
      <mesh position={[1, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.1, 0.3, 16]} />
        <meshStandardMaterial color="#8892b0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* The Eye (Ring at top) */}
      <mesh position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.04, 16, 32]} />
        <meshStandardMaterial color="#8892b0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* The Glowing Bait */}
      <mesh ref={baitRef} position={[1, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={ALERT_RED}
          emissive={ALERT_RED}
          emissiveIntensity={1.5}
          transparent
          opacity={0.9}
        />
        {/* Internal point light to make it glow */}
        <pointLight color={ALERT_RED} intensity={2} distance={3} />
      </mesh>
    </group>
  );
}

/* ---------- Sonar Scanner ---------- */
function SonarScanner() {
  const scannerRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!scannerRef.current || !ringRef.current) return;
    const t = clock.getElapsedTime();
    
    // Rotate scanner
    scannerRef.current.rotation.y = t * 1.5;
    
    // Move ring up and down
    ringRef.current.position.y = Math.sin(t * 1.2) * 1.5 + 0.5;
  });

  return (
    <group>
      {/* Scanning cone/plane */}
      <group ref={scannerRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <circleGeometry args={[2.5, 32, 0, Math.PI / 4]} />
          <meshBasicMaterial color={CYBER_CYAN} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>
      
      {/* Scanning Ring (Wireframe) */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.3, 2.5, 32]} />
        <meshBasicMaterial color={CYBER_GREEN} transparent opacity={0.5} />
      </mesh>
      
    </group>
  );
}

/* ---------- Scene ---------- */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[-5, 5, 5]} color={CYBER_CYAN} intensity={1} />
      <pointLight position={[5, -5, -5]} color={CYBER_GREEN} intensity={0.5} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <HookAndBait />
      </Float>
      
      <SonarScanner />
      <Bubbles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}

/* ---------- Public component ---------- */
interface CyberShield3DProps {
  className?: string;
}

// Keeping the name CyberShield3D so we don't break HeroSection imports,
// but internally it acts as the new Cyber Hook/Sonar visual.
export default function CyberShield3D({ className }: CyberShield3DProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full w-full text-cyber-cyan/60 font-mono text-sm">
          Calibrating Sonar…
        </div>
      }
    >
      <Canvas
        camera={{ position: [0, 1, 8.5], fov: 45 }}
        style={{ background: "transparent" }}
        className={className}
      >
        <Scene />
      </Canvas>
    </Suspense>
  );
}
