import { useCabinetStore } from '@/store';
import { IColumnDrawer } from '@/store/types';
import { EDGE_GAP, PLATE_THICKNESS } from '@/utils/utilities';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { HandleA, HandleB } from '../../models/Handles';
import { PlateMaterial } from './Plate';
import { SidePlate } from './SidePlate';

const Drawer = React.memo(function Drawer({ drawer, columnIndex }: { drawer: IColumnDrawer; columnIndex: number }) {
  const { size, pos } = drawer;

  const deltaZ = 0.23;
  const drawerRef = useRef<THREE.Group>(null);
  const innerDelta = 5 * PLATE_THICKNESS;

  const { width, height } = size;

  const { isDragging, cabinetSize, openDoors, hoveredColumnIndex, cabinetBackplate, isVerticalDragging } = useCabinetStore();

  const { totalDepth } = cabinetSize;

  const posZ = (totalDepth - PLATE_THICKNESS) / 2;

  useFrame(() => {
    if (drawerRef.current) {
      if (isVerticalDragging) {
        drawerRef.current.position.set(pos.x, pos.y, 0);
        return;
      }
      
      const startPos = new THREE.Vector3(drawerRef.current.position.x, drawerRef.current.position.y, drawerRef.current.position.z);
      if (!isDragging && (openDoors || hoveredColumnIndex === columnIndex)) {
        const current = startPos.lerp(new THREE.Vector3(startPos.x, startPos.y, deltaZ), 0.16);
        drawerRef.current.position.set(current.x, current.y, current.z);
      } else {
        const current = startPos.lerp(new THREE.Vector3(startPos.x, startPos.y, 0), 0.16);
        drawerRef.current.position.set(current.x, current.y, current.z);
      }
    }
  });

  const sideRotation = new THREE.Euler(0, 0, 0);
  const scaleLeftRight = new THREE.Vector3(PLATE_THICKNESS, height - innerDelta, totalDepth - 2 * PLATE_THICKNESS);
  const scaleBack = new THREE.Vector3(width - EDGE_GAP, height - innerDelta, PLATE_THICKNESS);
  const scaleBottom = new THREE.Vector3(width - EDGE_GAP, PLATE_THICKNESS, totalDepth - 2 * PLATE_THICKNESS);
  const positionLeft = new THREE.Vector3(-(width - EDGE_GAP - PLATE_THICKNESS) / 2, 0, 0);
  const positionRight = new THREE.Vector3((width - EDGE_GAP - PLATE_THICKNESS) / 2, 0, 0);
  const positionBack = cabinetBackplate ? new THREE.Vector3(0, 0, -posZ + PLATE_THICKNESS) : new THREE.Vector3(0, 0, -posZ);
  const positionBottom = new THREE.Vector3(0, -(height - innerDelta) / 2, 0);
  return (
    <group ref={drawerRef} position={[pos.x, pos.y, 0]}>
      {/* Left Panel */}
      <SidePlate position={positionLeft} rotation={sideRotation} scale={scaleLeftRight} />
      {/* Right Panel */}
      <SidePlate position={positionRight} rotation={sideRotation} scale={scaleLeftRight} />
      {/* Back Panel */}
      <SidePlate position={positionBack} rotation={sideRotation} scale={scaleBack} />
      {/* Bottom Panel */}
      <SidePlate position={positionBottom} rotation={sideRotation} scale={scaleBottom} />
      {/* Front Panel */}
      <mesh castShadow receiveShadow position={[0, 0, posZ]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[width - EDGE_GAP, PLATE_THICKNESS, height - EDGE_GAP]} />
        <PlateMaterial isVisible={true} />
      </mesh>
      <HandleB position={new THREE.Vector3(-(width - EDGE_GAP) / 2, height / 2 - 0.016, posZ + 0.005)} rotation={{ x: 0, y: 0, z: 0 }} />
      <HandleA position={new THREE.Vector3(-(width - EDGE_GAP) / 2, height / 2 - EDGE_GAP / 2, posZ + 0.005)} rotation={{ x: 0, y: 0, z: 0 }} />
    </group>
  );
});

export default Drawer;
