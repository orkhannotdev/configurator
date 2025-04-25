import { useCabinetStore } from '@/store';
import { IPlateInformation } from '@/store/types';
import { ECabinetFinishes, EOcclusionImages, PLATE_THICKNESS } from '@/utils/utilities';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export const Plate = React.memo(function Plate({ position, scale, plateInfo }: { position: THREE.Vector3; scale: { width: number; depth: number }; plateInfo: IPlateInformation }) {
  const { horizontal, back } = plateInfo;

  const { cabinetBackplate } = useCabinetStore();

  const [isVisible, setVisible] = useState(true);

  const { rotation, occlusion } = useMemo(() => {
    let rotation: [number, number, number];
    let occlusion;
    if (horizontal) {
      rotation = [0, 0, 0];
      occlusion = EOcclusionImages.HORIZONTAL;
    } else {
      if (back) {
        rotation = [Math.PI / 2, 0, 0];
        occlusion = EOcclusionImages.BACK;
      } else {
        rotation = [0, 0, Math.PI / 2];
        occlusion = EOcclusionImages.VERTICAL;
      }
    }

    return {
      rotation,
      occlusion,
    };
  }, [horizontal, back]);

  useEffect(() => {
    if (back) setVisible(cabinetBackplate);
  }, [cabinetBackplate]);

  return (
    <Suspense fallback={null}>
      <mesh castShadow receiveShadow position={[position.x, position.y, position.z]} rotation={rotation}>
        <boxGeometry args={[scale.width, PLATE_THICKNESS, scale.depth]} />
        <PlateMaterial isVisible={isVisible} occlusion={occlusion} />
      </mesh>
    </Suspense>
  );
});

export const PlateMaterial = React.memo(function PlateMaterial({ isVisible }: { isVisible: boolean; occlusion?: EOcclusionImages }) {
  const material = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const materialTopRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const materialBottomRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  const { cabinetFinish, colorMap, roughnessMap, aoMap, normalMap } = useCabinetStore();

  return (
    <>
      {cabinetFinish === ECabinetFinishes.VENEER && (
        <meshPhysicalMaterial
          map={colorMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(1.5, 1.5)}
          ref={material}
          color={0xffffff}
          side={THREE.DoubleSide}
          metalness={0.1}
          roughness={0.6}
          visible={isVisible}
          reflectivity={0.3}
          clearcoat={0.2}
          clearcoatRoughness={0.3}
          emissiveIntensity={0.01}
          emissive={0xffffff}
        />
      )}
      {cabinetFinish === ECabinetFinishes.PLYWOOD && (
        <>
          {/* right side */}
          <meshPhysicalMaterial attach="material-0" metalness={0.1} roughness={0.7} visible={isVisible} reflectivity={0.2} color={0xfcf2e1} />
          {/* left side */}
          <meshPhysicalMaterial attach="material-1" metalness={0.1} roughness={0.7} visible={isVisible} reflectivity={0.2} color={0xfcf2e1} />
          {/* top side */}
          <meshPhysicalMaterial
            map={colorMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(1.5, 1.5)}
            ref={materialTopRef}
            attach="material-2"
            color={0xffffff}
            metalness={0.1}
            roughness={0.6}
            visible={isVisible}
            reflectivity={0.3}
            clearcoat={0.2}
            clearcoatRoughness={0.3}
            emissiveIntensity={0.05}
            emissive={0xffffff}
            needsUpdate
          />
          {/* bottom side */}
          <meshPhysicalMaterial
            map={colorMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(1.5, 1.5)}
            ref={materialBottomRef}
            attach="material-3"
            color={0xffffff}
            metalness={0.1}
            roughness={0.6}
            visible={isVisible}
            reflectivity={0.3}
            clearcoat={0.2}
            clearcoatRoughness={0.3}
            emissiveIntensity={0.05}
            emissive={0xffffff}
            needsUpdate
          />
          {/* front side */}
          <meshPhysicalMaterial attach="material-4" metalness={0.1} roughness={0.7} visible={isVisible} reflectivity={0.2} color={0xfcf2e1} />
          {/* back side */}
          <meshPhysicalMaterial attach="material-5" metalness={0.1} roughness={0.7} visible={isVisible} reflectivity={0.2} color={0xfcf2e1} />
        </>
      )}
    </>
  );
});
