import React from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { useCabinetStore } from '@/store';

export function SceneLighting() {
  const { cabinetSize } = useCabinetStore();
  const directionalLightRef = React.useRef<THREE.DirectionalLight>(null);
  
  // Uncomment this line during development to see the light's shadow camera
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);
  
  return (
    <>
      {/* Ambient light for general scene brightness */}
      <ambientLight intensity={0.5} />
      
      {/* Main directional light casting shadows */}
      <directionalLight
        ref={directionalLightRef}
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
        shadow-camera-left={-cabinetSize.totalWidth}
        shadow-camera-right={cabinetSize.totalWidth}
        shadow-camera-top={cabinetSize.totalHeight + 2}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0005}
      />
      
      {/* Secondary light for fill */}
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />
    </>
  );
}