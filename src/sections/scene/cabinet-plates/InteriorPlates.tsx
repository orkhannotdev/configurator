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


const applyGradientStyle = (
  columns: IColumn[], 
  cabinetSize: ICabinetSize, 
  cabinetLegs: ECabinetLegs
): IColumn[] => {
  const legHeight = getBottomHeight(cabinetLegs);
  const { totalHeight } = cabinetSize;
  
  const gradientColumns = [...columns];
  
  gradientColumns.forEach((column) => {
    column.lastRow = 'drawer';
    column.doors = [];
    
    const availableHeight = totalHeight - legHeight - (column.rows.length + 1) * PLATE_THICKNESS;
    const baseDrawerHeight = availableHeight / column.rows.length;
    
    const startPosY = legHeight + PLATE_THICKNESS;
    
    const drawers = column.rows.map((_, index) => {
      const height = baseDrawerHeight;
      
      return {
        index,
        size: {
          width: column.width,
          height,
        },
        pos: {
          x: column.posX,
          y: startPosY + (index + 0.5) * height + index * PLATE_THICKNESS,
        },
      };
    });
    
    column.drawers = drawers;
  });
  
  return gradientColumns;
};

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
    if (cabinetStyle === 'gradient') {
      const tvStand = new TVStand();
      tvStand.setFromString(cabinetStyle);
      tvStand.resize({width: cabinetSize.totalWidth});

      let cabinetColumns: Array<IColumn> = [];
      const { totalHeight} = cabinetSize;

      let posX = -cabinetSize.totalWidth / 2 + PLATE_THICKNESS; 
      const legHeight = getBottomHeight(cabinetLegs);

      tvStand.style.boxes[0].children.forEach((child) => {
        const columnWidth = child.dimension.width; 
        posX += columnWidth/2;
        cabinetColumns.push(createColumnWithLayout(child.dimension.width, posX, totalHeight, legHeight, cabinetStyle )) 
        posX += columnWidth/2 + PLATE_THICKNESS;
      })

      const gradientColumns = applyGradientStyle(cabinetColumns, cabinetSize, cabinetLegs);
      setCabinetColumns(gradientColumns);
    }
  }, [cabinetStyle, cabinetColumns.length, cabinetSize, cabinetLegs, setCabinetColumns]);
  
  //useEffect(() => {
    //if (!isInitialLoadRef.current && prevStyleRef.current === cabinetStyle && cabinetColumns.length > 0) {
      //const current = [...cabinetColumns];
      //const newColumns = getColumns(current, cabinetSize, cabinetStyle, cabinetLegs);
      //
      //if (cabinetStyle === 'gradient') {
        //const gradientColumns = applyGradientStyle(newColumns, cabinetSize, cabinetLegs);
        //setCabinetColumns(gradientColumns);
        //prevColumnCountRef.current = gradientColumns.length;
        //return;
      //}
      //
      //if (newColumns.length > prevColumnCountRef.current) {
        //const legHeight = getBottomHeight(cabinetLegs);
        //
        //const existingColumns = newColumns.slice(0, prevColumnCountRef.current);
        //const newColumnsToAdd = newColumns.slice(prevColumnCountRef.current);
        //const randomizedNewColumns = applyRandomLayoutsToColumns(
          //newColumnsToAdd, 
          //cabinetSize.totalHeight, 
          //legHeight
        //);
        //
        //const finalColumns = [...existingColumns, ...randomizedNewColumns];
        //
        //setCabinetColumns(finalColumns);
        //prevColumnCountRef.current = finalColumns.length;
      //} else {
        //setCabinetColumns(newColumns);
        //prevColumnCountRef.current = newColumns.length;
      //}
    //}
  //}, [cabinetSize, cabinetLegs, cabinetStyle]);


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
