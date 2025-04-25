import { useCabinetStore } from '@/store';
import { ICabinetSize, IColumn } from '@/store/types';
import { ECabinetLegs, ECabinetStyle, getBottomHeight, getCalculatedColumns, getPartitonPlates, applyRandomLayoutsToColumns, PLATE_THICKNESS } from '@/utils/utilities';
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

// Function to apply gradient style to columns
const applyGradientStyle = (
  columns: IColumn[], 
  cabinetSize: ICabinetSize, 
  cabinetLegs: ECabinetLegs
): IColumn[] => {
  const legHeight = getBottomHeight(cabinetLegs);
  const { totalHeight } = cabinetSize;
  
  // Create a copy of columns to modify
  const gradientColumns = [...columns];
  
  gradientColumns.forEach((column) => {
    column.lastRow = 'drawer';
    column.doors = [];
    
    // Calculate available height for drawers
    const availableHeight = totalHeight - legHeight - (column.rows.length + 1) * PLATE_THICKNESS;
    const baseDrawerHeight = availableHeight / column.rows.length;
    
    const startPosY = legHeight + PLATE_THICKNESS;
    
    // Create gradient drawers using the available height
    const drawers = column.rows.map((_, index) => {
      const gradientFactor = 1 + (index / column.rows.length) * 0.5;
      const height = baseDrawerHeight * gradientFactor;
      
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
  
  // Reference to track initial load
  const isInitialLoadRef = useRef(true);
  // Reference to track previous style to detect style changes
  const prevStyleRef = useRef(cabinetStyle);
  // Reference to track previous column count
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

  // Handle initial load and style changes - apply random layouts
  useEffect(() => {
    // Only run this effect on initial load or when style changes
    if (isInitialLoadRef.current || prevStyleRef.current !== cabinetStyle) {
      let current: IColumn[] = [];
      
      // If we have existing columns and only the style changed, preserve column structure
      if (cabinetColumns.length > 0 && !isInitialLoadRef.current) {
        current = [...cabinetColumns];
      }
      
      const newColumns = getColumns(current, cabinetSize, cabinetStyle, cabinetLegs);
      const legHeight = getBottomHeight(cabinetLegs);
      
      // Apply random layouts - ONLY on initial load or style change
      const randomizedColumns = applyRandomLayoutsToColumns(newColumns, cabinetSize.totalHeight, legHeight);
      setCabinetColumns(randomizedColumns);
      
      // Update refs
      isInitialLoadRef.current = false;
      prevStyleRef.current = cabinetStyle;
      prevColumnCountRef.current = randomizedColumns.length;
    }
  }, [cabinetStyle, cabinetSize.totalHeight]);

  // Handle resize operations - preserve layouts
  useEffect(() => {
    // Skip on initial load or style changes (that's handled by the other effect)
    if (!isInitialLoadRef.current && prevStyleRef.current === cabinetStyle && cabinetColumns.length > 0) {
      // Preserve existing column structure but update dimensions
      const current = [...cabinetColumns];
      const newColumns = getColumns(current, cabinetSize, cabinetStyle, cabinetLegs);
      
      // Check if we have more columns than before (width increased)
      if (newColumns.length > prevColumnCountRef.current) {
        const legHeight = getBottomHeight(cabinetLegs);
        
        // Get the existing columns with updated dimensions
        const existingColumns = newColumns.slice(0, prevColumnCountRef.current);
        
        // Get only the new columns
        const newColumnsToAdd = newColumns.slice(prevColumnCountRef.current);
        
        // Apply random layouts ONLY to the new columns
        const randomizedNewColumns = applyRandomLayoutsToColumns(
          newColumnsToAdd, 
          cabinetSize.totalHeight, 
          legHeight
        );
        
        // Combine existing columns with randomized new columns
        const finalColumns = [...existingColumns, ...randomizedNewColumns];
        
        // Update state and reference
        setCabinetColumns(finalColumns);
        prevColumnCountRef.current = finalColumns.length;
      } else {
        // When no new columns added, just use the standard resize logic
        setCabinetColumns(newColumns);
        prevColumnCountRef.current = newColumns.length;
      }
    }
  }, [cabinetSize, cabinetLegs]);

  // Apply style changes when style is selected
  useEffect(() => {
    if (cabinetStyle === 'gradient') {
      // Apply gradient style to columns
      const gradientColumns = applyGradientStyle(cabinetColumns, cabinetSize, cabinetLegs);
      setCabinetColumns(gradientColumns);
    }
  }, [cabinetStyle, cabinetColumns.length, cabinetSize, cabinetLegs, setCabinetColumns]);
  
  // Existing useEffect for cabinet size changes
  useEffect(() => {
    // Skip on initial load or style changes (that's handled by the other effect)
    if (!isInitialLoadRef.current && prevStyleRef.current === cabinetStyle && cabinetColumns.length > 0) {
      // Preserve existing column structure but update dimensions
      const current = [...cabinetColumns];
      const newColumns = getColumns(current, cabinetSize, cabinetStyle, cabinetLegs);
      
      // If gradient style is selected, reapply it after size changes
      if (cabinetStyle === 'gradient') {
        const gradientColumns = applyGradientStyle(newColumns, cabinetSize, cabinetLegs);
        setCabinetColumns(gradientColumns);
        prevColumnCountRef.current = gradientColumns.length;
        return;
      }
      
      // Check if we have more columns than before (width increased)
      if (newColumns.length > prevColumnCountRef.current) {
        const legHeight = getBottomHeight(cabinetLegs);
        
        // Get the existing columns with updated dimensions
        const existingColumns = newColumns.slice(0, prevColumnCountRef.current);
        
        // Get only the new columns
        const newColumnsToAdd = newColumns.slice(prevColumnCountRef.current);
        
        // Apply random layouts ONLY to the new columns
        const randomizedNewColumns = applyRandomLayoutsToColumns(
          newColumnsToAdd, 
          cabinetSize.totalHeight, 
          legHeight
        );
        
        // Combine existing columns with randomized new columns
        const finalColumns = [...existingColumns, ...randomizedNewColumns];
        
        // Update state and reference
        setCabinetColumns(finalColumns);
        prevColumnCountRef.current = finalColumns.length;
      } else {
        // When no new columns added, just use the standard resize logic
        setCabinetColumns(newColumns);
        prevColumnCountRef.current = newColumns.length;
      }
    }
  }, [cabinetSize, cabinetLegs, cabinetStyle]);

  // Add this effect to set maximum columns and shelves on initial load
  useEffect(() => {
    if (isInitialLoadRef.current) {
      // Set maximum columns (9) and maximum shelves (6) on initial load
      const legHeight = getBottomHeight(cabinetLegs);
      
      // Generate columns with maximum count (9)
      const maxColumns = getCalculatedColumns({
        current: [],
        cabinetStyle,
        cabinetSize,
        legHeight,
        columnCount: 9 // Set to maximum 9 columns
      });
      
      // For each column, ensure it has maximum shelves (6)
      const columnsWithMaxShelves = maxColumns.map(column => {
        // Calculate cabinet height (excluding legs and plate thickness)
        const cabinetHeight = cabinetSize.totalHeight - legHeight - 2 * PLATE_THICKNESS;
        
        // Generate 6 rows (maximum shelves)
        const newRows = [];
        for (let i = 0; i < 6; i++) {
          newRows.push({
            index: i,
            height: cabinetHeight / 6 - (PLATE_THICKNESS * 5 / 6) // Account for plate thickness
          });
        }
        
        return {
          ...column,
          rows: newRows,
          lastRow: column.lastRow || 'door'
        };
      });
      
      // Apply random layouts to the columns with max shelves
      const randomizedColumns = applyRandomLayoutsToColumns(
        columnsWithMaxShelves, 
        cabinetSize.totalHeight, 
        legHeight
      );
      
      setCabinetColumns(randomizedColumns);
    }
  }, []);

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
