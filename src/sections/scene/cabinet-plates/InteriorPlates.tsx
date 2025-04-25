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
) => {
  const { totalWidth, totalHeight } = cabinetSize;
  const legHeight = getBottomHeight(cabinetLegs);
  const cabinetHeight = totalHeight - legHeight - 2 * PLATE_THICKNESS;
  const startPosY = legHeight + PLATE_THICKNESS;
  
  // Create a copy of columns to modify
  const gradientColumns = [...columns];
  
  // Min and max width constraints
  const minWidth = 0.2;
  const maxWidth = 1.0;
  
  // Total available width to distribute
  const totalAvailableWidth = totalWidth;
  
  // Number of columns
  const columnCount = gradientColumns.length;
  
  // Generate varied widths for gradient effect
  // We'll create a gradient from narrower to wider columns
  let remainingWidth = totalAvailableWidth;
  
  for (let i = 0; i < columnCount; i++) {
    // Calculate a width that gradually increases
    // First columns narrower, last columns wider
    const gradientFactor = 0.7 + (i / (columnCount - 1)) * 0.6; // Range from 0.7 to 1.3
    
    // Base width if all columns were equal
    const baseWidth = totalAvailableWidth / columnCount;
    
    // Apply gradient factor to create variation
    let columnWidth = baseWidth * gradientFactor;
    
    // Ensure width is within constraints
    columnWidth = Math.max(minWidth, Math.min(maxWidth, columnWidth));
    
    // Adjust for last column to ensure total width is maintained
    if (i === columnCount - 1) {
      columnWidth = remainingWidth;
    }
    
    // Update column width
    gradientColumns[i].width = columnWidth;
    
    // Reduce remaining width
    remainingWidth -= columnWidth;
  }
  
  // Recalculate positions based on new widths
  let currentX = -totalWidth / 2;
  
  for (let i = 0; i < columnCount; i++) {
    const column = gradientColumns[i];
    const halfWidth = column.width / 2;
    
    // Update column position
    column.posX = currentX + halfWidth;
    
    // Apply varied layouts based on position in the gradient
    // This creates a pattern of different layouts across columns
    
    // Clear existing layouts
    column.doors = [];
    column.drawers = [];
    column.dividers = [];
    column.isDivide = false;
    
    // Determine layout type based on position in gradient
    // 0: open cell, 1: door, 2: drawer, 3: divided with drawer
    const layoutType = i % 4;
    
    switch (layoutType) {
      case 0: // Open cell
        // Nothing to add - just an empty column
        column.lastRow = 'open';
        break;
        
      case 1: // Full door
        column.doors = [{
          index: 0,
          size: {
            width: column.width,
            height: cabinetHeight,
          },
          pos: {
            x: column.posX,
            y: startPosY + cabinetHeight / 2,
          },
          opening: 1, // Default opening direction
        }];
        column.lastRow = 'door';
        break;
        
      case 2: // Full drawer
        column.drawers = [{
          index: 0,
          size: {
            width: column.width,
            height: cabinetHeight,
          },
          pos: {
            x: column.posX,
            y: startPosY + cabinetHeight / 2,
          },
        }];
        column.lastRow = 'drawer';
        break;
        
      case 3: // Divided with drawer on bottom
        column.isDivide = true;
        
        // Create a divider at 1/3 height
        const dividerHeight = cabinetHeight / 3;
        column.rows = [
          { height: dividerHeight },
          { height: cabinetHeight - dividerHeight }
        ];
        
        // Add divider
        column.dividers = [{
          size: {
            width: column.rows[0].height,
            depth: cabinetSize.totalDepth - 2 * PLATE_THICKNESS,
          },
          pos: {
            x: column.posX,
            y: startPosY + column.rows[0].height / 2,
          },
        }];
        
        // Add drawer in bottom section
        column.drawers = [{
          index: 0,
          size: {
            width: column.width,
            height: cabinetHeight - dividerHeight,
          },
          pos: {
            x: column.posX,
            y: startPosY + dividerHeight + (cabinetHeight - dividerHeight) / 2,
          },
        }];
        column.lastRow = 'drawer';
        break;
    }
    
    // Move to next column position
    currentX += column.width;
  }
  
  return gradientColumns;
};

export const InteriorPlates = React.memo(function InteriorPlates() {
  const {
    cabinetSize,
    cabinetLegs,
    cabinetColumns,
    cabinetStyle,
    setCabinetColumns,
    selectedStyle,
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
    if (selectedStyle === 'gradient') {
      // Apply gradient style to columns
      const gradientColumns = applyGradientStyle(cabinetColumns, cabinetSize, cabinetLegs);
      setCabinetColumns(gradientColumns);
    }
  }, [selectedStyle, cabinetColumns.length, cabinetSize, cabinetLegs, setCabinetColumns]);
  
  // Existing useEffect for cabinet size changes
  useEffect(() => {
    // Skip on initial load or style changes (that's handled by the other effect)
    if (!isInitialLoadRef.current && prevStyleRef.current === cabinetStyle && cabinetColumns.length > 0) {
      // Preserve existing column structure but update dimensions
      const current = [...cabinetColumns];
      const newColumns = getColumns(current, cabinetSize, cabinetStyle, cabinetLegs);
      
      // If gradient style is selected, reapply it after size changes
      if (selectedStyle === 'gradient') {
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
  }, [cabinetSize, cabinetLegs, selectedStyle]);

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
