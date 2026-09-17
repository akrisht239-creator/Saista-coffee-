'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Leaf({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = rotation[2] + Math.sin(clock.elapsedTime * 0.7 + position[0]) * 0.035;
  });
  return <mesh ref={ref} position={position} rotation={rotation} scale={scale}><sphereGeometry args={[0.48, 12, 8]} /><meshStandardMaterial color="#284b35" roughness={0.8} /></mesh>;
}

function Plant() {
  const leaves = Array.from({ length: 17 }, (_, index) => {
    const angle = (index / 17) * Math.PI * 2;
    const height = -0.4 + (index % 5) * 0.38;
    return <Leaf key={index} position={[Math.cos(angle) * (0.45 + (index % 3) * 0.1), height, Math.sin(angle) * (0.45 + (index % 3) * 0.1)]} rotation={[0.3 * Math.sin(angle), angle, angle + 0.3]} scale={0.7 + (index % 3) * 0.12} />;
  });
  return <group position={[0, -0.1, 0]}><mesh position={[0, -1.15, 0]}><cylinderGeometry args={[0.08, 0.14, 2.3, 10]} /><meshStandardMaterial color="#4b2d1f" roughness={1} /></mesh>{leaves}<group>{[[-0.5, -0.15, 0.3], [0.52, 0.25, 0.12], [-0.32, 0.7, 0.1], [0.28, 0.88, -0.15]].map((p, i) => <mesh key={i} position={p as [number, number, number]}><sphereGeometry args={[0.12, 16, 16]} /><meshStandardMaterial color="#9c2f20" roughness={0.55} /></mesh>)}</group></group>;
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (group.current) { group.current.rotation.y = pointer.x * 0.1 + Math.sin(clock.elapsedTime * 0.12) * 0.04; group.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.04; }
  });
  return <><ambientLight intensity={0.8} color="#d5b68b" /><directionalLight position={[-4, 7, 3]} intensity={3} color="#ffd9a0" castShadow /><pointLight position={[2, 1, 2]} intensity={1.2} color="#a55f32" /><group ref={group}><Float speed={0.45} rotationIntensity={0.08} floatIntensity={0.12}><Plant /></Float></group><Sparkles count={55} scale={[9, 5, 5]} size={1.5} speed={0.18} color="#e9cfa7" /><Environment preset="forest" /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.15} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.7} /></>;
}

export default function CoffeeJourney() {
  return <Canvas camera={{ position: [0, 0.5, 5.6], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}><Scene /></Canvas>;
}
