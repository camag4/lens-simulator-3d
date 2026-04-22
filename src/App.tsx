import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/scene/Scene';
import { CameraController } from './components/scene/CameraController';
import { PostProcessing } from './components/scene/PostProcessing';

import { Overlay } from './components/ui/Overlay';

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
      
      {/* UI Overlay Layer */}
      <Overlay />
    </div>
  );
}

export default App;
