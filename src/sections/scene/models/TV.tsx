import { useCabinetStore } from '@/store';
import { tvModelPath } from '@/utils/utilities';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    TV_nb_55_inch: THREE.Mesh;
    bake_TV_nb_55_inch: THREE.Mesh;
  };
  materials: {
    ['live-lcd']: THREE.MeshBasicMaterial;
    ['Default OBJ.007']: THREE.MeshBasicMaterial;
  };
};

export function TV() {
  const { nodes, materials } = useGLTF(tvModelPath) as GLTFResult;

  const { cabinetSize } = useCabinetStore();

  const { totalWidth } = cabinetSize;

  return (
    <group position={[0, cabinetSize.totalHeight, 0]} scale={0.001} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.TV_nb_55_inch.geometry} material={materials['live-lcd']} visible={totalWidth > 1.3} />
      <mesh castShadow receiveShadow geometry={nodes.bake_TV_nb_55_inch.geometry} material={materials['Default OBJ.007']} visible={totalWidth > 1.3} />
    </group>
  );
}
