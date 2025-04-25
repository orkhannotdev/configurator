import React from 'react';
import { Plate } from './Plate';
import * as THREE from 'three';

export const MiddlePlate = React.memo(function MiddlePlate({
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
    horizontal: true,
    middle: true,
    back: false,
    rowIndex,
    columnIndex,
  };

  return <Plate position={position} scale={{ width: scale.width, depth: scale.depth }} plateInfo={plateInfo} />;
});
