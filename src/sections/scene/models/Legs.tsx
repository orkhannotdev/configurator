import { useCabinetStore } from '@/store';
import { ECabinetLegs, legsModelPath, noLegsModelPath } from '@/utils/utilities';
import { useGLTF } from '@react-three/drei';
import React from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type NoLeg_GLTFResult = GLTF & {
  nodes: {
    pCube13: THREE.Mesh;
    pCylinder3: THREE.Mesh;
  };
  materials: {
    standardSurface1: THREE.MeshStandardMaterial;
    aiStandardSurface1: THREE.MeshStandardMaterial;
  };
};
type BoxLeg_GLTFResult = GLTF & {
  nodes: {
    polySurface1: THREE.Mesh;
  };
  materials: {
    standardSurface1: THREE.MeshStandardMaterial;
  };
};

export const NoLeg = React.memo(function NoLeg({ position }: { position: THREE.Vector3 }) {
  const { cabinetLegs } = useCabinetStore();

  const { nodes, materials } = useGLTF(noLegsModelPath) as NoLeg_GLTFResult;
  return (
    <group dispose={null} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCube13.geometry}
        material={materials.standardSurface1}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
        visible={cabinetLegs === ECabinetLegs.NO_LEG}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder3.geometry}
        material={materials.aiStandardSurface1}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
        visible={cabinetLegs === ECabinetLegs.NO_LEG}
      />
    </group>
  );
});

export const BoxLeg = React.memo(function BoxLeg({ position, rotation }: { position: THREE.Vector3; rotation: THREE.Euler }) {
  const { cabinetLegs } = useCabinetStore();

  const { nodes, materials } = useGLTF(legsModelPath) as BoxLeg_GLTFResult;

  return (
    <group dispose={null} position={position} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface1.geometry}
        material={materials.standardSurface1}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
        visible={cabinetLegs === ECabinetLegs.LEGS}
      />
    </group>
  );
});
