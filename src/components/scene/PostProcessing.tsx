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
    const { distance, optics, fStop, focalLength } = useLensStore.getState();
    
    // 1. FOCUS DISTANCE: Smoothly interpolate for cinematic autofocus feel
    const cameraFar = state.camera.far || 1000;
    // Normalized distance from 0 to 1 based on camera.far
    const targetFocus = distance / cameraFar;
    dofRef.current.cocMaterial.focusDistance += (targetFocus - dofRef.current.cocMaterial.focusDistance) * 0.08;
    
    // 2. BOKEH SCALE (Blur Intensity)
    // Map the aperture diameter (focalLength / fStop) to a blur scale.
    // Wide apertures (low fStop) like f/1.4 have larger diameters = more blur.
    const apertureDiameter = focalLength / fStop;
    // Base scale on physical size, tuning it visually so max blur is noticeable but not broken
    const visualBokeh = Math.min((apertureDiameter / 50) * 15, 30);
    dofRef.current.bokehScale += (visualBokeh - dofRef.current.bokehScale) * 0.1;
    
    // 3. FOCUS RANGE (DoF spread in the shader)
    // The shader `focusRange` expects normalized values [0..1] denoting the spread
    // around focusDistance. We map the mathematical `totalDofM` to this normalized range.
    // If totalDoF is Infinity, we give it a large range so everything past focus is sharp.
    let targetFocusRange = 0;
    if (optics.totalDofM === "Infinity") {
      targetFocusRange = 1.0;
    } else {
      // optics.totalDofM is in meters. We normalize it using the same cameraFar scaling.
      targetFocusRange = (optics.totalDofM / 2) / cameraFar;
    }
    dofRef.current.cocMaterial.focusRange += (targetFocusRange - dofRef.current.cocMaterial.focusRange) * 0.1;
  });

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
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
