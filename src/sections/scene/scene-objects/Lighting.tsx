import React, { useEffect } from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { useCabinetStore } from '@/store';
import { useFrame } from '@react-three/fiber';
import { CameraHelper } from 'three';

export function SceneLighting() {
  const { cabinetSize } = useCabinetStore();
  const directionalLightRef = React.useRef<THREE.DirectionalLight>(null);
  const secondaryLightRef = React.useRef<THREE.DirectionalLight>(null);
  
  // Uncomment during development to see light positions
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);
  useHelper(secondaryLightRef, THREE.DirectionalLightHelper, 0.5);
  
  const scene = useFrame(({ scene }) => {
    if (directionalLightRef.current) {
      const helper = new CameraHelper(directionalLightRef.current.shadow.camera);
      scene.add(helper);
      return () => {
        scene.remove(helper);
      };
    }
  }, []);
  
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.3} /> {/* Reduced intensity for more contrast */}
      
      {/* Main directional light for primary shadows */}
      <directionalLight
        ref={directionalLightRef}
        position={[cabinetSize.totalWidth * 0.7, cabinetSize.totalHeight * 1.2, cabinetSize.totalDepth * 1.5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={30}
        shadow-camera-near={0.1}
        shadow-camera-left={-cabinetSize.totalWidth * 1.2}
        shadow-camera-right={cabinetSize.totalWidth * 1.2}
        shadow-camera-top={cabinetSize.totalHeight * 1.5}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0005}
        shadow-radius={3} 
        shadow-blurSamples={8}
      />
      
      {/* Secondary light from opposite angle to illuminate inner cells */}
      <directionalLight
        ref={secondaryLightRef}
        position={[-cabinetSize.totalWidth * 0.5, cabinetSize.totalHeight * 0.8, -cabinetSize.totalDepth * 0.5]}
        intensity={0.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
        shadow-camera-left={-cabinetSize.totalWidth}
        shadow-camera-right={cabinetSize.totalWidth}
        shadow-camera-top={cabinetSize.totalHeight + 2}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0003}
        shadow-radius={2}
        shadow-blurSamples={6}
      />
      
      {/* Fill light to reduce harsh shadows */}
      <directionalLight 
        position={[0, cabinetSize.totalHeight * 1.5, 0]} 
        intensity={0.2} 
      />
    </>
  );
}