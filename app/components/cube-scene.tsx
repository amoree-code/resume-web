'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import type { Mesh } from 'three';

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function AbstractShape() {
  const ref = useRef<Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!ref.current || REDUCED_MOTION) return;
    ref.current.rotation.y += delta * 0.25;
    // lerp tilt toward pointer position for a subtle parallax feel
    ref.current.rotation.x += (-pointer.y * 0.4 - ref.current.rotation.x) * 0.05;
    ref.current.rotation.z += (pointer.x * 0.2 - ref.current.rotation.z) * 0.05;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.1, 4]} />
      <MeshDistortMaterial
        color="#d97757"
        distort={0.35}
        speed={REDUCED_MOTION ? 0 : 1.8}
        roughness={0.15}
        metalness={0.4}
      />
    </mesh>
  );
}

export default function CubeScene() {
  const floatProps = useMemo(
    () =>
      REDUCED_MOTION
        ? { floatIntensity: 0, rotationIntensity: 0, speed: 0 }
        : { floatIntensity: 0.6, rotationIntensity: 0.3 },
    [],
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      gl={{ alpha: true }}
      dpr={[1, 2]}
      resize={{ scroll: false }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 4]} intensity={1.2} />
      <pointLight position={[-3, -2, -2]} intensity={0.4} color="#d97757" />
      <Float {...floatProps}>
        <AbstractShape />
      </Float>
    </Canvas>
  );
}
