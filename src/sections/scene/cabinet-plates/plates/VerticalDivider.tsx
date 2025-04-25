import { IColumnDivider } from '@/store/types';
import { PLATE_THICKNESS } from '@/utils/utilities';
import React, { Suspense } from 'react';
import { PlateMaterial } from './Plate';

export const VerticalDivider = React.memo(function VerticalDivider({ divider }: { divider: IColumnDivider }) {
  const { size, pos } = divider;

  return (
    <Suspense fallback={null}>
      <mesh castShadow receiveShadow position={[pos.x, pos.y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[size.width, PLATE_THICKNESS, size.depth]} />
        <PlateMaterial isVisible={true} />
      </mesh>
    </Suspense>
  );
});
