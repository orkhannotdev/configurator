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
    </Suspense>
  );
}

export default SceneObjects;
