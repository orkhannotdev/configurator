import React, { useEffect } from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { useCabinetStore } from '@/store';
import { useThree } from '@react-three/fiber';

export function SceneLighting() {
  const { cabinetSize } = useCabinetStore();
  const { scene } = useThree();
  
  const directionalLightRef = React.useRef<THREE.DirectionalLight>(null);
  const secondaryLightRef = React.useRef<THREE.DirectionalLight>(null);
  
  // Fix helper type errors by conditionally using the helper
  if (process.env.NODE_ENV === 'development') {
    // Only use helpers in development mode
    useHelper(directionalLightRef as React.MutableRefObject<THREE.Object3D>, THREE.DirectionalLightHelper, 1);
    useHelper(secondaryLightRef as React.MutableRefObject<THREE.Object3D>, THREE.DirectionalLightHelper, 0.5);
  }
  
  // Add shadow camera helpers for debugging
  useEffect(() => {
    if (directionalLightRef.current && process.env.NODE_ENV === 'development') {
      const helper = new THREE.CameraHelper(directionalLightRef.current.shadow.camera);
      scene.add(helper);
      return () => {
        scene.remove(helper);
      };
    }
  }, [scene]);
  
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Main directional light */}
      <directionalLight
        ref={directionalLightRef}
        position={[cabinetSize.totalWidth * 0.5, cabinetSize.totalHeight * 1.5, cabinetSize.totalDepth * 0.8]}
        intensity={1.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={30}
        shadow-camera-near={0.1}
        shadow-camera-left={-cabinetSize.totalWidth * 1.2}
        shadow-camera-right={cabinetSize.totalWidth * 1.2}
        shadow-camera-top={cabinetSize.totalHeight * 1.5}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0001}
        shadow-radius={5}
        shadow-blurSamples={10}
      />
      
      {/* Secondary light */}
      <directionalLight
        ref={secondaryLightRef}
        position={[-cabinetSize.totalWidth * 0.3, cabinetSize.totalHeight * 0.5, cabinetSize.totalDepth * 0.7]}
        intensity={0.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
        shadow-camera-left={-cabinetSize.totalWidth}
        shadow-camera-right={cabinetSize.totalWidth}
        shadow-camera-top={cabinetSize.totalHeight + 2}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0001}
        shadow-radius={3}
        shadow-blurSamples={8}
      />
      
      {/* Spot light for inner areas */}
      <spotLight
        position={[0, cabinetSize.totalHeight * 1.2, cabinetSize.totalDepth * 1.5]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
    </>
  );
}