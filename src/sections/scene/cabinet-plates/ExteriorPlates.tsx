import { useCabinetStore } from '@/store';
import { PLATE_THICKNESS, getBottomHeight } from '@/utils/utilities';
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { BoxLeg, NoLeg } from '../models/Legs';
import { Plate } from './plates/Plate';

function HorizontalPlates() {
  const { cabinetLegs, cabinetSize } = useCabinetStore();

  const { totalHeight, totalWidth, totalDepth } = cabinetSize;

  const legHeight = useMemo(() => {
    return getBottomHeight(cabinetLegs);
  }, [cabinetLegs]);

  const plateInfo = {
    horizontal: true,
    middle: false,
    back: false,
  };

  return (
    <group dispose={null}>
      <Plate position={{ x: 0, y: legHeight + PLATE_THICKNESS / 2, z: 0 } as THREE.Vector3} scale={{ width: totalWidth, depth: totalDepth }} plateInfo={plateInfo} />
      <Plate position={{ x: 0, y: totalHeight - PLATE_THICKNESS / 2, z: 0 } as THREE.Vector3} scale={{ width: totalWidth, depth: totalDepth }} plateInfo={plateInfo} />
    </group>
  );
}

function SidePlates() {
  const { cabinetLegs, cabinetSize } = useCabinetStore();

  const { totalHeight, totalWidth, totalDepth } = cabinetSize;

  const legHeight = useMemo(() => {
    return getBottomHeight(cabinetLegs);
  }, [cabinetLegs]);

  const plateHeight = useMemo(() => {
    return totalHeight - 2 * PLATE_THICKNESS - legHeight;
  }, [totalHeight, legHeight]);

  const plateInfo = {
    horizontal: false,
    middle: false,
    back: false,
    row: 0,
    col: 0,
  };

  return (
    <group dispose={null}>
      <Plate position={{ x: -(totalWidth - PLATE_THICKNESS) / 2, y: (totalHeight + legHeight) / 2, z: 0 } as THREE.Vector3} scale={{ width: plateHeight, depth: totalDepth }} plateInfo={plateInfo} />
      <Plate position={{ x: (totalWidth - PLATE_THICKNESS) / 2, y: (totalHeight + legHeight) / 2, z: 0 } as THREE.Vector3} scale={{ width: plateHeight, depth: totalDepth }} plateInfo={plateInfo} />
    </group>
  );
}

const ExteriorPlates = React.memo(function ExteriorPlates() {
  const { cabinetSize } = useCabinetStore();
  const { totalWidth, totalDepth } = cabinetSize;
  const deltaX = 0.14;
  const deltaZ = 0.14;

  const maxDis = 1.3;

  const legRotation = new THREE.Euler(0, Math.PI * 0.5, 0);
  const legRotationReverse = new THREE.Euler(0, -Math.PI * 0.5, 0);

  const wallSideLegsPosZ = -totalDepth / 2 + deltaZ;
  const outerLegsPosZ = totalDepth / 2 - deltaX;

  const legsPos = useMemo(() => {
    const initialLegs = [
      {
        pos: new THREE.Vector3(-totalWidth / 2 + deltaX, 0, outerLegsPosZ),
        rotation: legRotation,
      },
      {
        pos: new THREE.Vector3(-totalWidth / 2 + deltaX, 0, wallSideLegsPosZ),
        rotation: legRotationReverse,
      },
      {
        pos: new THREE.Vector3(totalWidth / 2 - deltaX, 0, outerLegsPosZ),
        rotation: legRotation,
      },
      {
        pos: new THREE.Vector3(totalWidth / 2 - deltaX, 0, wallSideLegsPosZ),
        rotation: legRotationReverse,
      },
    ];

    if (totalWidth - 2 * deltaX > 1.3) {
      const numCols = Math.floor((totalWidth - 2 * deltaX) / maxDis);
      const colDis = (totalWidth - 2 * deltaX) / (numCols + 1);
      for (let index = 0; index < numCols; index++) {
        const newLegsPosX = -totalWidth / 2 + deltaX + (index + 1) * colDis;
        initialLegs.push({
          pos: new THREE.Vector3(newLegsPosX, 0, wallSideLegsPosZ),
          rotation: legRotationReverse,
        });
        initialLegs.push({
          pos: new THREE.Vector3(newLegsPosX, 0, outerLegsPosZ),
          rotation: legRotation,
        });
      }
    } else if (totalWidth < 0.53) {
      const newLegsPosX = -totalWidth / 2 + deltaX + (totalWidth - 2 * deltaX) / 2;
      // Remove the last two legs
      initialLegs.splice(-2);
      initialLegs.forEach((leg) => {
        leg.pos.setX(newLegsPosX);
      });
    }

    // Filter to include only legs with outerLegsPosZ if totalDepth > 36
    return initialLegs;
  }, [totalWidth, totalDepth]);

  return (
    <group dispose={null}>
      <HorizontalPlates />
      <SidePlates />
      {legsPos.map((leg, index) => (
        <group key={index}>
          <BoxLeg position={leg.pos} rotation={leg.rotation} />
          <NoLeg position={leg.pos} />
        </group>
      ))}
    </group>
  );
});

export default ExteriorPlates;
