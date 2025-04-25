import { useCabinetStore } from '@/store';
import { shadowManModelPath } from '@/utils/utilities';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';

type GLTFResult = GLTF & {
  nodes: {
    Ludek02: THREE.Mesh;
  };
  materials: { [key: string]: THREE.Material };
};

export function ManShadow() {
  // Load the shadow model
  const { nodes } = useGLTF(shadowManModelPath) as GLTFResult;

  // Get the cabinet size from the store
  const { cabinetSize } = useCabinetStore();

  // Set the delta for the shadow
  const delta = 0.7;

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow={false}
        geometry={nodes.Ludek02.geometry}
        material={nodes.Ludek02.material}
        position={[-cabinetSize.totalWidth / 2 - delta, 0, 0.02]}
        rotation={[Math.PI / 2, 0, 0.01]}
        scale={0.01}
      >
        <meshStandardMaterial 
          color={'#ffffff'} 
          transparent 
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
