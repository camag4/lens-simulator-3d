import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Environment, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { useLensStore } from '../../store/useLensStore';

// Focus Feedback Component
function FocusFeedback({ position }: { position: THREE.Vector3 | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (position) {
      // Trigger animation reset
      setScale(0.5);
      setOpacity(1);
    }
  }, [position]);

  useFrame((state, delta) => {
    if (groupRef.current && opacity > 0) {
      // Rotate for a subtle mechanical feel
      groupRef.current.rotation.z += delta * 2;

      // Animate scale to simulate a focus ring locking in
      setScale((s) => THREE.MathUtils.damp(s, 1.2, 8, delta));
      setOpacity((o) => Math.max(o - delta * 1.5, 0)); // Fade out smoothly

      groupRef.current.scale.set(scale, scale, scale);

      // Make the feedback always face the camera directly
      groupRef.current.quaternion.copy(state.camera.quaternion);

      // Update opacity on all children materials
      groupRef.current.children.forEach((child) => {
        if ((child as THREE.Mesh).material) {
          ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = opacity;
        }
      });
    }
  });

  if (!position) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* Outer focus ring */}
      <mesh>
        <ringGeometry args={[0.15, 0.18, 32]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0} depthTest={false} />
      </mesh>
      {/* Center focus dot */}
      <mesh>
        <circleGeometry args={[0.03, 16]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0} depthTest={false} />
      </mesh>
    </group>
  );
}

export function Scene() {
  const foregroundRef = useRef<THREE.Mesh>(null);
  const midgroundRef = useRef<THREE.Mesh>(null);
  const backgroundRef = useRef<THREE.Mesh>(null);
  
  const setDistance = useLensStore((state) => state.setDistance);
  const [hovered, setHovered] = useState(false);
  const [clickPosition, setClickPosition] = useState<THREE.Vector3 | null>(null);

  // Subtle floating animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (foregroundRef.current) foregroundRef.current.position.y = Math.sin(t * 2) * 0.1;
    if (midgroundRef.current) midgroundRef.current.position.y = Math.sin(t * 1.5 + 1) * 0.1;
    if (backgroundRef.current) backgroundRef.current.position.y = Math.sin(t + 2) * 0.1;
  });
  
  // Handler for tap-to-focus raycasting
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    // Cap the distance at our slider max (50m) to avoid breaking UI state bounds
    const newDist = Math.min(Math.max(e.distance, 0.5), 50);
    setDistance(newDist);
    // Set exact click point for feedback
    setClickPosition(e.point);
  };

  // Update cursor state when hovered changes
  if (typeof document !== 'undefined') {
    document.body.style.cursor = hovered ? 'crosshair' : 'default';
  }

  return (
    <group 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <color attach="background" args={['#0a0a0a']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#facc15" />
      
      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Foreground Object: ~6 meters away from camera[0,0,5] */}
      <Sphere 
        ref={foregroundRef} args={[0.3, 32, 32]} position={[-1, 0, -1]} 
        onPointerDown={handlePointerDown}
      >
        <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.8} />
      </Sphere>

      {/* Midground Object: Focus target, ~8 meters away */}
      <Box 
        ref={midgroundRef} args={[0.6, 0.6, 0.6]} position={[0, 0, -3]}
        onPointerDown={handlePointerDown}
      >
        <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.5} />
      </Box>

      {/* Background Object: ~15 meters away */}
      <Cylinder 
        ref={backgroundRef} args={[0.5, 0.5, 2, 32]} position={[2, 0, -10]}
        onPointerDown={handlePointerDown}
      >
        <meshStandardMaterial color="#10b981" roughness={0.5} metalness={0.2} />
      </Cylinder>
      
      {/* Very Far Background: ~35 meters away to show deep bokeh */}
      <Sphere args={[2, 32, 32]} position={[-5, 2, -30]} onPointerDown={handlePointerDown}>
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[1.5, 32, 32]} position={[6, -1, -25]} onPointerDown={handlePointerDown}>
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
        onPointerDown={handlePointerDown}
      />
      <ContactShadows position={[0, -0.59, 0]} opacity={0.4} scale={50} blur={2} far={10} />

      {/* Autofocus Feedback */}
      <FocusFeedback position={clickPosition} />
    </group>
  );
}
