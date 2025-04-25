import { IColumn } from '@/store/types';
import { PLATE_THICKNESS } from '@/utils/utilities';
import * as THREE from 'three';

export const DRAGGER_THRESHOLD = 0.01;

export const PLANE_INTERSECT_POINT = new THREE.Vector3();
export const PLANE_VECTOR = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

export function addTexturesToMaterial({
  material,
  colorMap,
  roughMap,
}: {
  material: React.MutableRefObject<THREE.MeshPhysicalMaterial | null>;
  colorMap: THREE.Texture | undefined;
  roughMap: THREE.Texture | undefined;
}) {
  if (colorMap && roughMap && material.current) {
    material.current.map = colorMap;

    if (roughMap) material.current.roughnessMap = roughMap;
    else material.current.roughnessMap = null;

    material.current.envMap = null;

    material.current.needsUpdate = true;
  }
}

export function getPositionOnXAxis({ totalWidth, columns, index }: { totalWidth: number; columns: IColumn[]; index: number }) {
  const startPosX = -(totalWidth - PLATE_THICKNESS) / 2;
  let sum = 0;
  for (let i = 0; i < index + 1; i++) {
    sum += columns[i].width;
  }

  return startPosX + sum + (index + 1) * PLATE_THICKNESS;
}
