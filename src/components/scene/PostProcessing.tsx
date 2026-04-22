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
    
    // In threejs postprocessing, focusDistance is normalized between camera near/far
    // Assuming camera near is 0.1 and far is 1000
    const cameraFar = state.camera.far;
    const normalizedFocus = distance / cameraFar;
    
    // Smoothly interpolate for cinematic feel
    dofRef.current.focusDistance += (normalizedFocus - dofRef.current.focusDistance) * 0.1;
    
    // Map CoC to bokeh scale (visual blur intensity)
    // CoC in mm is usually very small (e.g., 0.029). Multiply to make it visible.
    const targetBokeh = Math.max(1, (1 / optics.dofFarLimitM || 0.1) * 20); // Simplified visual mapping
    // We actually calculated CoC in the python script but not in TS! 
    // Wait, let's use fStop and focalLength directly to drive bokehScale
    const fStop = useLensStore.getState().fStop;
    const focalLength = useLensStore.getState().focalLength;
    
    // Bokeh scale is proportional to physical aperture diameter (focalLength / fStop)
    const apertureDiameter = focalLength / fStop;
    const visualBokeh = Math.min(apertureDiameter * 0.2, 20); // Cap it
    
    // The focal length in the shader controls how quickly it blurs out
    // Shader focalLength is typically 0.0 to 1.0. We map our mm (14-200) to (0.01-0.1)
    const shaderFocalLength = focalLength / 1000;
    
    dofRef.current.bokehScale += (visualBokeh - dofRef.current.bokehScale) * 0.1;
    dofRef.current.focalLength = shaderFocalLength;
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
