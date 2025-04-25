import { Suspense } from 'react';
import { Controls } from './Controls';
import { Lights } from './Lights';
import { ManShadow } from './ManShadow';
import { SceneLighting } from './Lighting';
import { Room } from './Room';

function SceneObjects() {
  return (
    <Suspense fallback={null}>
      <Room />
      <Lights />
      <Controls />
      <ManShadow />
      <mesh 
        receiveShadow 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.1, 0]}
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </Suspense>
  );
}

export default SceneObjects;
