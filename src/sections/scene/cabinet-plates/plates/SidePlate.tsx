import * as THREE from 'three';

export function SidePlate({ position, scale, rotation }: { position: THREE.Vector3; scale: THREE.Vector3; rotation: THREE.Euler }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={position} rotation={rotation}>
        <boxGeometry args={[scale.x, scale.y, scale.z]} />
        <meshStandardMaterial transparent color={'#6A6B6C'} />
      </mesh>
    </group>
  );
}
