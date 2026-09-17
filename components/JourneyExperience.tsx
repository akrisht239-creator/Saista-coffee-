'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { Component, type ErrorInfo, type ReactNode, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const stages = [
  { name: 'Nature', title: 'It begins with the plant.', copy: 'Every exceptional cup starts with the quality of what grows at its origin.' },
  { name: 'Cherry', title: 'Beauty before the bean.', copy: 'Coffee begins as a fruit — vivid, seasonal and alive.' },
  { name: 'Bean', title: 'Inside every cherry.', copy: 'The seed at the heart of the fruit is the beginning of your cup.' },
  { name: 'Process', title: 'Crafted with care.', copy: 'Select. Process. Dry. Rest. Each stage shapes the final character.' },
  { name: 'Roast', title: 'Where character develops.', copy: 'Heat brings sweetness, balance and aroma into focus.' },
  { name: 'Grind', title: 'Aroma comes alive.', copy: 'Roasted beans become the texture that carries the ritual.' },
  { name: 'Brew', title: 'Crafted for the moment.', copy: 'Water meets coffee in a slow, considered transformation.' },
  { name: 'Cup', title: 'The journey ends here.', copy: 'Your next cup begins with where the coffee came from.' },
];

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('SAISTA 3D scene failed; using the cinematic fallback.', error, info);
  }

  render() {
    return this.state.failed ? <div className="scene-fallback" role="img" aria-label="Cinematic coffee plantation fallback" /> : this.props.children;
  }
}

function JourneyObjects({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y += ((pointer.x * 0.12 + progress * 0.25) - group.current.rotation.y) * 0.025;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.04;
  });
  const stage = Math.min(7, Math.floor(progress * 8));
  const showPlant = stage <= 1;
  const showCherry = stage === 1 || stage === 2;
  const showBeans = stage >= 2 && stage <= 5;
  const showDrum = stage === 4;
  const showGrinder = stage === 5;
  const showCup = stage >= 6;

  return <group ref={group} scale={1.1}>
    {showPlant && <><mesh position={[0, -1.15, 0]}><cylinderGeometry args={[.09, .15, 2.3, 12]} /><meshStandardMaterial color="#4b2d1f" roughness={1} /></mesh>{Array.from({ length: 18 }, (_, i) => { const a = i / 18 * Math.PI * 2; return <mesh key={i} position={[Math.cos(a) * .55, -.45 + i % 5 * .38, Math.sin(a) * .55]} rotation={[.3, a, a]} scale={.8 + i % 3 * .1}><sphereGeometry args={[.48, 12, 8]} /><meshStandardMaterial color={i % 3 === 0 ? '#365c3c' : '#284b35'} roughness={.8} /></mesh>; })}</>}
    {showCherry && Array.from({ length: 7 }, (_, i) => <mesh key={`c${i}`} position={[(i - 3) * .25, -.45 + i % 3 * .35, .15 + (i % 2) * .2]}><sphereGeometry args={[.13, 18, 18]} /><meshStandardMaterial color="#a93624" roughness={.5} /></mesh>)}
    {showBeans && Array.from({ length: 13 }, (_, i) => <mesh key={`b${i}`} position={[(i % 5 - 2) * .28, (Math.floor(i / 5) - 1) * .27, (i % 3 - 1) * .16]} rotation={[0, i, .3]} scale={[.8, 1, .45]}><sphereGeometry args={[.22, 18, 12]} /><meshStandardMaterial color={stage >= 4 ? '#5b2d1b' : '#b18b57'} roughness={.65} /></mesh>)}
    {showDrum && <mesh position={[0, -.15, -.2]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.9, .9, 1.2, 32]} /><meshStandardMaterial color="#754326" metalness={.5} roughness={.35} /></mesh>}
    {showGrinder && <><mesh position={[0, -.4, 0]}><cylinderGeometry args={[.7, .7, 1.2, 32]} /><meshStandardMaterial color="#26221d" metalness={.7} roughness={.25} /></mesh><mesh position={[0, .45, 0]}><cylinderGeometry args={[.42, .5, .35, 32]} /><meshStandardMaterial color="#9a7652" metalness={.35} roughness={.35} /></mesh></>}
    {showCup && <><mesh position={[0, -.55, 0]}><cylinderGeometry args={[.75, .55, .85, 32]} /><meshStandardMaterial color="#e6dccd" roughness={.3} /></mesh><mesh position={[0, -.1, 0]}><cylinderGeometry args={[.6, .6, .045, 32]} /><meshStandardMaterial color="#3c1e13" roughness={.45} /></mesh><mesh position={[.78, -.35, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.3, .08, 12, 24, Math.PI * 1.5]} /><meshStandardMaterial color="#e6dccd" roughness={.3} /></mesh></>}
  </group>;
}

function ExperienceScene({ progress }: { progress: number }) {
  return <><ambientLight intensity={.75} color="#d5b68b" /><directionalLight position={[-4, 7, 3]} intensity={3} color="#ffd9a0" /><pointLight position={[2, 1, 2]} intensity={1.2} color="#a55f32" /><Float speed={.45} rotationIntensity={.08} floatIntensity={.12}><JourneyObjects progress={progress} /></Float><Sparkles count={50} scale={[9, 5, 5]} size={1.4} speed={.18} color="#e9cfa7" /></>;
}

function WebGLExperience({ progress }: { progress: number }) {
  return <Canvas camera={{ position: [0, .3, 5.5], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} fallback={<div className="scene-fallback" role="img" aria-label="Cinematic coffee plantation fallback" />}><ExperienceScene progress={progress} /></Canvas>;
}

export default function JourneyExperience() {
  const [progress, setProgress] = useState(0);
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const available = Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    setWebGLAvailable(available);
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const stageIndex = Math.min(7, Math.floor(progress * 8));
  const stage = stages[stageIndex];

  return <div className="journey-experience">
    <SceneErrorBoundary>{webGLAvailable ? <WebGLExperience progress={progress} /> : <div className="scene-fallback" role="img" aria-label="Cinematic coffee plantation fallback" />}</SceneErrorBoundary>
    {progress > .06 && <div className="journey-overlay"><p>{stage.name} · 0{stageIndex + 1}</p></div>}
  </div>;
}
