import { useCabinetStore } from '@/store';
import { ICabinetSize, IColumn } from '@/store/types';
import { ECabinetLegs, ECabinetStyle, getBottomHeight, getCalculatedColumns, getPartitonPlates, applyRandomLayoutsToColumns, PLATE_THICKNESS, createColumnWithLayout } from '@/utils/utilities';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { BackPanel } from './plates/BackPanel';
import { Door } from './plates/Door';
import Drawer from './plates/Drawer';
import { MiddlePlate } from './plates/MiddlePlate';
import { SpacePlane } from './plates/SpacePlane';
import { Dimensions, EditTools } from './plates/Tools';
import { VerticalDivider } from './plates/VerticalDivider';
import { VerticalPlate } from './plates/VerticalPlate';
import { TVStand } from '@/3D/TVStand';
import { Gradient } from '@/3D/Styles/Gradient';

export const InteriorPlates = React.memo(function InteriorPlates() {
  const {
    cabinetSize,
    cabinetLegs,
    cabinetColumns,
    cabinetStyle,
    setCabinetColumns,
  } = useCabinetStore();
  
  const isInitialLoadRef = useRef(true);
  const prevStyleRef = useRef(cabinetStyle);
  const prevColumnCountRef = useRef(0);

  const { verticals, horizontals, backsides, availableSpaces } = useMemo(() => {
    const legHeight = getBottomHeight(cabinetLegs);
    const { totalHeight, totalWidth, totalDepth } = cabinetSize;
    return getPartitonPlates({ columns: cabinetColumns, totalHeight, totalWidth, totalDepth, legHeight });
  }, [cabinetColumns, cabinetSize, cabinetLegs]);

  const getColumns = (current: IColumn[], cabinetSize: ICabinetSize, cabinetStyle: ECabinetStyle, cabinetLegs: ECabinetLegs) => {
    const legHeight = getBottomHeight(cabinetLegs);
    return getCalculatedColumns({ current, cabinetStyle, cabinetSize, legHeight });
  };

  useEffect(() => {
    if (isInitialLoadRef.current || prevStyleRef.current !== cabinetStyle) {
      let current: IColumn[] = [];
      
      if (cabinetColumns.length > 0 && !isInitialLoadRef.current) {
        current = [...cabinetColumns];
      }
      
      const newColumns = getColumns(current, cabinetSize, cabinetStyle, cabinetLegs);
      const legHeight = getBottomHeight(cabinetLegs);
      
      const randomizedColumns = applyRandomLayoutsToColumns(newColumns, cabinetSize.totalHeight, legHeight);
      setCabinetColumns(randomizedColumns);
      
      isInitialLoadRef.current = false;
      prevStyleRef.current = cabinetStyle;
      prevColumnCountRef.current = randomizedColumns.length;
    }
  }, [cabinetStyle, cabinetSize.totalHeight]);


  useEffect(() => {
      const tvStand = new TVStand();
      tvStand.setFromString(cabinetStyle);
      tvStand.resize({width: cabinetSize.totalWidth});

      const gradientColumns: IColumn[] = [];

      tvStand.style.boxes[0].children.forEach((child) => {
        const column: IColumn = {
          width: child.dimension.width,
          posX: child.position.x,
          dividers: [],
          doors: [],
          drawers: [],
          id: '123',
          index: 1,
          isDivide: false,
          layoutIndex: 1,
          rows: [],
        };

        child.children.forEach((row, index) => {
          column.rows.push({
            index: index,
            size: {
              width: row.dimension.width ,
              height: row.dimension.height,
            },
            pos: {
              x: row.position.x,
              y: row.position.y,
            },
          });
        })
      })

      setCabinetColumns(gradientColumns);
  }, [cabinetStyle, cabinetColumns.length, cabinetSize, cabinetLegs, setCabinetColumns]);
  


  return (
    <group dispose={null}>
      {verticals.slice(1, verticals.length - 1).map((e, index) => (
        <VerticalPlate key={index} rowIndex={e.row} columnIndex={e.col} position={e.position as THREE.Vector3} scale={e.scale} />
      ))}
      {availableSpaces.map((e, index) => (
        <SpacePlane key={index} rowIndex={e.row} columnIndex={e.col} position={e.position as THREE.Vector3} scale={e.scale} />
      ))}
      {horizontals.map((e, index) => (
        <MiddlePlate key={index} rowIndex={e.row} columnIndex={e.col} position={e.position as THREE.Vector3} scale={e.scale} />
      ))}
      {backsides.map((e, index) => (
        <BackPanel key={index} rowIndex={e.row} columnIndex={e.col} position={e.position as THREE.Vector3} scale={e.scale} />
      ))}
      {cabinetColumns.map((column, index) => (
        <group key={index}>
          {column.doors.map((door, doorIndex) => (
            <Door key={doorIndex} door={door} columnIndex={index} />
          ))}
          {column.drawers.map((drawer, drawerIndex) => (
            <Drawer key={drawerIndex} drawer={drawer} columnIndex={index} />
          ))}
          {column.dividers.map((divider, dividerIndex) => (
            <VerticalDivider key={dividerIndex} divider={divider} />
          ))}
        </group>
      ))}
      <Dimensions />
      <EditTools />
    </group>
  );
});
