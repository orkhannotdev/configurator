import { useCabinetTextures } from '@/hooks/useCabinetTextures';
import { useCabinetStore } from '@/store';
import React, { useEffect } from 'react';
import ExteriorPlates from './ExteriorPlates';
import { InteriorPlates } from './InteriorPlates';
import { useFrame, useThree } from '@react-three/fiber';

const Cabinet = React.memo(function Cabinet() {
  const { cabinetSize } = useCabinetStore();
  const { gl } = useThree();
  useCabinetTextures();

  // More efficient shadow map updates
  useEffect(() => {
    // Force shadow map update when cabinet size changes
    gl.shadowMap.needsUpdate = true;
  }, [cabinetSize, gl.shadowMap]);

  // Only update shadows periodically during animation
  useFrame(({ gl }) => {
    gl.shadowMap.needsUpdate = true;
  });

  return (
    <group position={[0, 0, cabinetSize.totalDepth / 2]}>
      <InteriorPlates />
      <ExteriorPlates />
    </group>
  );
});

export default Cabinet;
