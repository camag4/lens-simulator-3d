import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import { useLensStore } from '../../store/useLensStore';
import { useEffect } from 'react';

export function CameraController() {
  const { camera } = useThree();
  const fovDegrees = useLensStore((state) => state.optics.fovDegrees);

  // Initial setup
  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      camera.fov = fovDegrees;
      camera.updateProjectionMatrix();
    }
  }, []);

  // Update loop
  useFrame(() => {
    if (camera instanceof PerspectiveCamera) {
      // Smoothly interpolate FOV for cinematic effect when focal length changes
      camera.fov += (fovDegrees - camera.fov) * 0.1;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
