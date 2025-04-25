import { useCabinetStore } from '@/store';
import { getBottomHeight, getIndividualColumn, iconifyIcons } from '@/utils/utilities';
import { Icon } from '@iconify/react';
import { Html, Line, RoundedBox, Text } from '@react-three/drei';
import React, { useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

export function Dimensions() {
  const { showDimensions, cabinetColumns, cabinetSize, cabinetLegs } = useCabinetStore();

  const { totalWidth, totalDepth, totalHeight } = cabinetSize;

  const legHeight = getBottomHeight(cabinetLegs);
  const delta = 0.03;

  const points = useMemo(() => {
    const points = [];
    const gap = 0.2;
    points.push({
      start: new THREE.Vector3(-totalWidth / 2, totalHeight + gap, totalDepth / 2),
      end: new THREE.Vector3(totalWidth / 2, totalHeight + gap, totalDepth / 2),
    });
    points.push({
      start: new THREE.Vector3(totalWidth / 2 + gap, 0, totalDepth / 2),
      end: new THREE.Vector3(totalWidth / 2 + gap, totalHeight, totalDepth / 2),
    });

    return points;
  }, [totalWidth, totalHeight, totalDepth]);

  return (
    <group dispose={null}>
      {cabinetColumns.map((column, index) => {
        const columnProps = getIndividualColumn({ targetIndex: index, columns: cabinetColumns, totalWidth, totalDepth, legHeight });
        const { position, rows } = columnProps;

        return (
          <group dispose={null} key={index}>
            <Text maxWidth={10} anchorX="center" anchorY="bottom" position={position} rotation={[0, 0, 0]} fontSize={0.04} color="white" visible={showDimensions}>
              {Math.round(column.width * 100)}
              <RoundedBox position={[0, delta, -0.001]} scale={[0.09, 0.05, 0.001]} radius={0.1} smoothness={4} steps={1}>
                <meshBasicMaterial color={0x808080} visible={showDimensions} />
              </RoundedBox>
            </Text>
            {rows.map((row, key) => (
              <Text key={key} maxWidth={10} anchorX="left" anchorY="middle" position={[row.x, row.y, row.z]} rotation={[0, 0, 0]} fontSize={0.04} color="white" visible={showDimensions}>
                {Math.round(row.height * 100)}
                <RoundedBox position={[0.025, 0, -0.001]} scale={[0.08, 0.05, 0.001]} radius={0.1} smoothness={4} steps={1}>
                  <meshBasicMaterial color={0x808080} visible={showDimensions} />
                </RoundedBox>
              </Text>
            ))}
          </group>
        );
      })}
      {points.map((point, index) => (
        <DimensionLine key={index} startPos={point.start} endPos={point.end} />
      ))}
    </group>
  );
}

export function EditTools() {
  const { cabinetColumns, cabinetSize, isVisibleTools, cabinetLegs, setLerpCamera, selectedColumnIndex, setSelectedColumnIndex } = useCabinetStore();
  const { camera } = useThree();
  
  const { totalWidth, totalDepth, totalHeight } = cabinetSize;
  
  const legHeight = getBottomHeight(cabinetLegs);
  const delta = 0.05;
  
  const resetCurrentColumn = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
      e.stopPropagation();
      
      // Set the selected column index
      if (selectedColumnIndex === index) {
        setSelectedColumnIndex(-1);
      } else {
        setSelectedColumnIndex(index);
      }
    },
    [setSelectedColumnIndex, selectedColumnIndex]
  );

  return (
    <group dispose={null}>
      {isVisibleTools &&
        cabinetColumns.map((column, index) => {
          const columnIndex = column.index;
          const columnProps = getIndividualColumn({ targetIndex: index, columns: cabinetColumns, totalWidth, totalDepth, legHeight });
          const { position } = columnProps;
          return (
            <Html key={index} center position={[position.x, position.y - delta, position.z]} distanceFactor={1.5}>
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px',
                }}
              >
                <button
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 9999,
                    color: '#000000',
                    width: '30px',
                    height: '30px',
                    border: selectedColumnIndex === index ? '2px solid #FF0000' : '1px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                  onClick={(e) => resetCurrentColumn(e, columnIndex)}
                >
                  <Icon icon={iconifyIcons.sceneIcons.editLayout} width="20" height="20" />
                </button>
              </div>
            </Html>
          );
        })}
    </group>
  );
}

const DimensionLine = React.memo(function DimensionLine({ startPos, endPos }: { startPos: THREE.Vector3; endPos: THREE.Vector3 }) {
  const { showDimensions } = useCabinetStore();
  const minDelta = 0.05;

  const { length, center } = useMemo(() => {
    const s_p = startPos;
    const e_p = endPos;
    const length = Math.round(s_p.distanceTo(e_p) * 100);

    let dir = endPos.clone().sub(startPos);
    const len = dir.length();
    dir = dir.normalize().multiplyScalar(len * 0.5);
    const center = startPos.clone().add(dir);
    return { length, center };
  }, [startPos, endPos]);

  const mainPoints = useMemo(() => [startPos, endPos], [startPos, endPos]);
  const horizontal = startPos.x !== endPos.x;

  const startLine = useMemo(() => {
    if (horizontal) {
      return [new THREE.Vector3(startPos.x, startPos.y - minDelta, startPos.z), new THREE.Vector3(startPos.x, startPos.y + minDelta, startPos.z)];
    } else {
      return [new THREE.Vector3(startPos.x - minDelta, startPos.y, startPos.z), new THREE.Vector3(startPos.x + minDelta, startPos.y, startPos.z)];
    }
  }, [startPos, horizontal]);

  const endLine = useMemo(() => {
    if (horizontal) {
      return [new THREE.Vector3(endPos.x, endPos.y - minDelta, endPos.z), new THREE.Vector3(endPos.x, endPos.y + minDelta, endPos.z)];
    } else {
      return [new THREE.Vector3(endPos.x - minDelta, endPos.y, endPos.z), new THREE.Vector3(endPos.x + minDelta, endPos.y, endPos.z)];
    }
  }, [endPos, horizontal]);

  return (
    <group dispose={null}>
      <Line points={mainPoints} color="#000000" lineWidth={1} dashed={false} transparent visible={showDimensions} />
      <Line points={startLine} color="#000000" lineWidth={1} dashed={false} transparent visible={showDimensions} />
      <Line points={endLine} color="#000000" lineWidth={1} dashed={false} transparent visible={showDimensions} />
      <Text maxWidth={10} anchorX="center" anchorY="middle" position={[center.x, center.y, center.z + 0.01]} rotation={[0, 0, 0]} fontSize={0.043} color="white" visible={showDimensions}>
        {Math.round(length)}
        <RoundedBox position={[0, 0, -0.001]} scale={[0.09, 0.05, 0.001]} radius={0.1} smoothness={4} steps={1}>
          <meshBasicMaterial color={0x808080} visible={showDimensions} />
        </RoundedBox>
      </Text>
    </group>
  );
});
