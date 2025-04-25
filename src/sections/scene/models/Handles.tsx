import { ECabinetHandles, handleAModelPath, handleBModelPath } from '@/utils/utilities';
import { useGLTF } from '@react-three/drei';
import React from 'react';
import { getModelSize } from './model-helpers';
import { useCabinetStore } from '@/store';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

interface IHandleProps {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

type GLTFResultOfHandles = GLTF & {
  nodes: {
    polySurface8: THREE.Mesh;
  };
  materials: {
    standardSurface1: THREE.MeshStandardMaterial;
  };
};

export const HandleB = React.memo(function HandleB({ position, rotation }: IHandleProps) {
  const { scene, nodes, materials } = useGLTF(handleBModelPath) as GLTFResultOfHandles;

  const { width } = getModelSize({ model: scene });

  const { cabinetHandle } = useCabinetStore();

  return (
    <group
      dispose={null}
      position={rotation.z === 0 ? [position.x + width / 2, position.y, position.z] : [position.x, position.y + width / 2, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface8.geometry}
        material={materials.standardSurface1}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
        visible={cabinetHandle === ECabinetHandles.HANDLE_B}
      />
    </group>
  );
});

export const HandleA = React.memo(function HandleA({ position, rotation }: IHandleProps) {
  const { scene, nodes, materials } = useGLTF(handleAModelPath) as GLTFResultOfHandles;
  const { width } = getModelSize({ model: scene });
  const { cabinetHandle } = useCabinetStore();

  return (
    <group
      dispose={null}
      position={rotation.z === 0 ? [position.x + width / 2, position.y, position.z] : [position.x, position.y + width / 2, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface8.geometry}
        material={materials.standardSurface1}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
        visible={cabinetHandle === ECabinetHandles.HANDLE_A}
      />
    </group>
  );
});
