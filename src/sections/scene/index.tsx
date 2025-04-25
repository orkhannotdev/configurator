'use client';
import { useCabinetStore } from '@/store';
import { Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import SceneObjects from './scene-objects';

import Cabinet from './cabinet-plates';

function CanvasContainer() {
  // Get the cabinet size from the store
  const { isDragging, cabinetSize, setSelectedColumnIndex } = useCabinetStore();
  
  // Calculate camera distance using the same logic as in Controls.tsx
  const maxDimension = Math.max(cabinetSize.totalWidth, cabinetSize.totalHeight);
  const cameraDistance = maxDimension * 1.5;
  
  const onPointerDownCanvas = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (isDragging) return;
    setSelectedColumnIndex(-1);
  };

  return (
    <Canvas
      shadows={{ 
        enabled: true, 
        type: THREE.PCFSoftShadowMap, 
        autoUpdate: true 
      }}
      dpr={[1, 2]} // Limit pixel ratio for better performance
      gl={{
        localClippingEnabled: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
        outputEncoding: THREE.sRGBEncoding,
        antialias: true,
        powerPreference: "high-performance",
        shadowMap: { 
          enabled: true, 
          type: THREE.PCFSoftShadowMap, 
          autoUpdate: true, 
          needsUpdate: true
        },
      }}
      camera={{
        // Updated to match the calculation in Controls.tsx
        position: [0, cabinetSize.totalHeight / 2 + cabinetSize.totalHeight * 0.8, cameraDistance],
        fov: 40,
        near: 0.1,
        far: 100,
      }}
      performance={{ min: 0.5 }}
      onPointerMissed={(e) => e.stopPropagation()}
      onPointerDown={onPointerDownCanvas}
    >
      <SceneObjects />
      <Cabinet />
      <Preload all />
    </Canvas>
  );
}

export default CanvasContainer;
