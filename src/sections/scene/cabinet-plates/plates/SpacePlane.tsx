import { useCabinetStore } from '@/store';
import { ThreeEvent } from '@react-three/fiber';
import React, { useCallback, useRef, useState } from 'react';
import * as THREE from 'three';

export const SpacePlane = React.memo(function SpacePlane({
  position,
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
  const spaceRef = useRef<THREE.Mesh>(null);
  const delta = 0.01;
  const { isDragging, selectedColumnIndex, setHoveredColumnIndex, setSelectedColumnIndex, setShowDimensions, setVisibleTools } = useCabinetStore();

  const [isHovered, setIsHovered] = useState(false);

  const handleOver = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setHoveredColumnIndex(columnIndex);
      setIsHovered(true);
      document.body.style.cursor = 'pointer';
    },
    [setIsHovered, setHoveredColumnIndex, setShowDimensions]
  );

  const handleOut = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setIsHovered(false);
      setHoveredColumnIndex(-1);
      document.body.style.cursor = 'default';
    },
    [setIsHovered]
  );

  const handleClick = useCallback(() => {
    if (selectedColumnIndex === columnIndex) return;
    setSelectedColumnIndex(columnIndex);
    setVisibleTools(true);
  }, [setSelectedColumnIndex, setVisibleTools]);

  return (
    <mesh
      ref={spaceRef}
      position={[position.x, position.y, position.z + delta]}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
      userData={{
        name: 'availableSpace',
        col: columnIndex,
      }}
    >
      <planeGeometry args={[scale.width, scale.depth]} />
      <meshStandardMaterial transparent color={'#1b72b5'} opacity={0.5} visible={!isDragging && isHovered} />
    </mesh>
  );
});
