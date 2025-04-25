import { useCabinetTextures } from '@/hooks/useCabinetTextures';
import { useCabinetStore } from '@/store';
import React from 'react';
import ExteriorPlates from './ExteriorPlates';
import { InteriorPlates } from './InteriorPlates';

const Cabinet = React.memo(function Cabinet() {
  const { cabinetSize } = useCabinetStore();
  useCabinetTextures();
  return (
    <group dispose={null} position={[0, 0, cabinetSize.totalDepth / 2]}>
      <InteriorPlates />
      <ExteriorPlates />
    </group>
  );
});
export default Cabinet;
