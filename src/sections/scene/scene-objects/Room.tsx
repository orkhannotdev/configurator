import { floorColor, wallColor } from '@/utils/utilities';

export function Room() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={floorColor} transparent roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 50, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} metalness={0.05} transparent />
      </mesh>

      <mesh castShadow receiveShadow position={[-500, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} metalness={0.05} transparent />
      </mesh>
      <mesh castShadow receiveShadow position={[500, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} metalness={0.05} transparent />
      </mesh>
    </group>
  );
}
