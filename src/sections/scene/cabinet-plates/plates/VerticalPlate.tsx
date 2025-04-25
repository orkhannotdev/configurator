import React from 'react';
import * as THREE from 'three';
import { MovablePlate } from './MovablePlate';
import { Plate } from './Plate';

export const VerticalPlate = React.memo(function VerticalPlate({
  position,
  rowIndex,
  columnIndex,
  scale,
}: {
  position: THREE.Vector3;
  rowIndex: number;
  columnIndex: number;
  scale: {
    width: number;
    depth: number;
  };
}) {
  const plateInfo = {
    horizontal: false,
    middle: true,
    back: false,
    rowIndex,
    columnIndex,
  };

  return (
    <group dispose={null}>
      <Plate position={position} scale={{ width: scale.width, depth: scale.depth }} plateInfo={plateInfo} />
      <MovablePlate position={position} plateInfo={plateInfo} />
    </group>
  );
});
