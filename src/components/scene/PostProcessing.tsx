import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { useLensStore } from '../../store/useLensStore';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DepthOfFieldEffect } from 'postprocessing';

export function PostProcessing() {
  const dofRef = useRef<DepthOfFieldEffect>(null);

  useFrame((state) => {
    if (!dofRef.current) return;
    
    // Read transient state without triggering React re-renders
    const { distance, optics } = useLensStore.getState();
    const { coc, equivalentFocalLengthMm } = optics as any; // We'll map values
    
    // 1. FOCUS DISTANCE: Smoothly interpolate for cinematic autofocus feel
    // Assuming camera near is 0.1 and far is 1000 (R3F defaults usually map to this range or we can just use 100 as far)
    // To be safe with R3F standard cameras, camera.far is often 1000.
    const cameraFar = state.camera.far || 1000;
    // We adjust the curve so it feels non-linear like a real autofocus motor
    const targetFocus = distance / cameraFar;
    dofRef.current.focusDistance += (targetFocus - dofRef.current.focusDistance) * 0.08;
    
    // 2. BOKEH SCALE (Blur Intensity)
    const fStop = useLensStore.getState().fStop;
    const focalLength = useLensStore.getState().focalLength;
    
    // Physical aperture diameter: A = f / N
    const apertureDiameter = focalLength / fStop;
    
    // Dramatic mapping: We multiply by a factor to make wide apertures (f/1.4) extremely blurry 
    // and closed apertures (f/22) very sharp.
    const visualBokeh = Math.min(apertureDiameter * 0.8, 40); // Cap at 40 max blur
    dofRef.current.bokehScale += (visualBokeh - dofRef.current.bokehScale) * 0.1;
    
    // 3. FOCAL LENGTH (DoF spread in the shader)
    // The shader expects a value usually between 0.0 and 1.0. 
    // A larger value means the blur starts immediately outside the focal plane (telephoto feel).
    // We map our 14mm-200mm to roughly 0.02 - 0.4
    const targetShaderFocalLength = focalLength / 500;
    dofRef.current.focalLength += (targetShaderFocalLength - dofRef.current.focalLength) * 0.1;
  });

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <DepthOfField
        ref={dofRef}
        focusDistance={0.02} // Will be driven by useFrame
        focalLength={0.05} // Will be driven by useFrame
        bokehScale={2} // Will be driven by useFrame
        height={480} // Resolution scale for performance
      />
    </EffectComposer>
  );
}
