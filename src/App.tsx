import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/scene/Scene';
import { CameraController } from './components/scene/CameraController';
import { PostProcessing } from './components/scene/PostProcessing';

function App() {
  return (
    <div className="w-full h-full bg-black overflow-hidden relative">
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]} // Cap DPR for mobile performance
        >
          <CameraController />
          <Scene />
          <PostProcessing />
        </Canvas>
      </div>
      
      {/* UI Overlay Placeholder (Phase 4) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <p className="text-white/30 tracking-widest text-sm uppercase">UI Overlay pending</p>
      </div>
    </div>
  );
}

export default App;
