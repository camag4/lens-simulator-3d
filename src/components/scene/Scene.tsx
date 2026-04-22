import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Environment, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';

export function Scene() {
  const foregroundRef = useRef<THREE.Mesh>(null);
  const midgroundRef = useRef<THREE.Mesh>(null);
  const backgroundRef = useRef<THREE.Mesh>(null);

  // Subtle floating animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (foregroundRef.current) foregroundRef.current.position.y = Math.sin(t * 2) * 0.1;
    if (midgroundRef.current) midgroundRef.current.position.y = Math.sin(t * 1.5 + 1) * 0.1;
    if (backgroundRef.current) backgroundRef.current.position.y = Math.sin(t + 2) * 0.1;
  });

  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#facc15" />
      
      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Foreground Object: 1 meter away */}
      <Sphere ref={foregroundRef} args={[0.3, 32, 32]} position={[-1, 0, -1]}>
        <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.8} />
      </Sphere>

      {/* Midground Object: Focus target, 3 meters away */}
      <Box ref={midgroundRef} args={[0.6, 0.6, 0.6]} position={[0, 0, -3]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.5} />
      </Box>

      {/* Background Object: 10 meters away */}
      <Cylinder ref={backgroundRef} args={[0.5, 0.5, 2, 32]} position={[2, 0, -10]}>
        <meshStandardMaterial color="#10b981" roughness={0.5} metalness={0.2} />
      </Cylinder>
      
      {/* Very Far Background: 30 meters away to show deep bokeh */}
      <Sphere args={[2, 32, 32]} position={[-5, 2, -30]}>
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[1.5, 32, 32]} position={[6, -1, -25]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
      </Sphere>

      {/* Floor Grid for perspective */}
      <Grid 
        position={[0, -0.6, 0]} 
        args={[50, 50]} 
        cellSize={1} 
        cellThickness={0.5} 
        cellColor="#333" 
        sectionSize={5} 
        sectionThickness={1} 
        sectionColor="#555" 
        fadeDistance={40}
      />
      <ContactShadows position={[0, -0.59, 0]} opacity={0.4} scale={50} blur={2} far={10} />
    </>
  );
}
