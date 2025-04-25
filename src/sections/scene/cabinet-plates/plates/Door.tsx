import { useCabinetStore } from '@/store';
import { EDGE_GAP, PLATE_THICKNESS } from '@/utils/utilities';
import { useFrame } from '@react-three/fiber';

import React, { Suspense, useMemo, useRef, useEffect } from 'react';

import { IColumnDoor } from '@/store/types';
import * as THREE from 'three';
import { HandleA, HandleB } from '../../models/Handles';
import { PlateMaterial } from './Plate';

export const Door = React.memo(function Door({ door, columnIndex }: { door: IColumnDoor; columnIndex: number }) {
  const { size, pos, opening } = door;

  const doorRef = useRef<THREE.Group | null>(null);

  const { cabinetSize, openDoors, hoveredColumnIndex, isDragging, isVerticalDragging } = useCabinetStore();

  const { totalDepth } = cabinetSize;

  const posZ = (totalDepth - PLATE_THICKNESS) / 2;
  const radius = size.width / 2 + PLATE_THICKNESS / 2;

  // Force doors to close when vertical dragging starts
  useEffect(() => {
    if (isVerticalDragging && doorRef.current) {
      doorRef.current.rotation.set(0, 0, 0);
    }
  }, [isVerticalDragging]);

  const { handlePos, handleRotation } = useMemo(() => {
    const posForOpeningLeft = size.width - EDGE_GAP + PLATE_THICKNESS - 0.19;

    const posForOpeningRight = -size.width + EDGE_GAP - PLATE_THICKNESS;

    const adjustedOpening = opening === 1 ? posForOpeningRight : posForOpeningLeft;

    const currentHandlePos = {
      x: adjustedOpening,
      y: size.height / 2 - EDGE_GAP / 2,
      z: 0.005,
    };
    const handleRotation = {
      x: 0,
      y: 0,
      z: 0,
    };

    if (pos.y > 1.2) {
      handleRotation.z = Math.PI / 2;
      currentHandlePos.y = -size.height / 2 + EDGE_GAP / 2;
      currentHandlePos.x = -opening * (size.width + EDGE_GAP);
    }

    return {
      handlePos: currentHandlePos,
      handleRotation: handleRotation,
    };
  }, [pos, size]);

  useFrame(() => {
    if (doorRef.current) {
      // Skip animation if vertical dragging is active
      if (isVerticalDragging) {
        // Force doors to close during vertical dragging
        doorRef.current.rotation.set(0, 0, 0);
        return;
      }
      
      const startRotation = new THREE.Vector3(doorRef.current.rotation.x, doorRef.current.rotation.y, doorRef.current.rotation.z);
      if (!isDragging && (openDoors || hoveredColumnIndex === columnIndex)) {
        const current = startRotation.lerp(new THREE.Vector3(0, (opening * Math.PI) / 3, 0), 0.2);
        doorRef.current.rotation.set(current.x, current.y, current.z);
      } else {
        const current = startRotation.lerp(new THREE.Vector3(0, 0, 0), 0.2);
        doorRef.current.rotation.set(current.x, current.y, current.z);
      }
    }
  });

  return (
    <group ref={doorRef} position={[pos.x + opening * radius, pos.y, posZ]} rotation={[0, 0, 0]}>
      <Suspense>
        <mesh castShadow receiveShadow position={[-opening * radius, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[size.width - EDGE_GAP, PLATE_THICKNESS, size.height - EDGE_GAP]} />
          <PlateMaterial isVisible={true} />
        </mesh>
        <HandleA position={handlePos} rotation={handleRotation} />
        <HandleB position={new THREE.Vector3(handlePos.x, handlePos.y - 0.013, handlePos.z)} rotation={handleRotation} />
      </Suspense>
    </group>
  );
});
