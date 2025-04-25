import { environmentPath } from '@/utils/utilities';
import { Environment } from '@react-three/drei';

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <Environment files={environmentPath} environmentIntensity={0.8} environmentRotation={[0, Math.PI * -0.5, 0]} />
    </>
  );
}
