import React from 'react';
import * as THREE from 'three';
import { Plate } from './Plate';

export const BackPanel = React.memo(function BackPanel({
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
    middle: false,
    back: true,
    rowIndex,
    columnIndex,
  };

  return <Plate position={position} scale={{ width: scale.width, depth: scale.depth }} plateInfo={plateInfo} />;
});
