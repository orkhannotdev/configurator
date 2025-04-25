import { useCabinetStore } from '@/store';
import { IPlateInformation } from '@/store/types';
import { getLayoutOptionsOfColumn } from '@/utils/columnLayoutOptions';
import { CELL_SIZE, PLATE_THICKNESS, getBottomHeight, getIndividualColumn } from '@/utils/utilities';
import { useTexture } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { UserDragConfig, useDrag } from '@use-gesture/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DRAGGER_THRESHOLD, PLANE_INTERSECT_POINT, PLANE_VECTOR, getPositionOnXAxis } from './plate-helpers';

let INITIAL_MOUSE_POSITION_FOR_DRAGGER: THREE.Vector3 | null = null; // Store the initial position

export const MovablePlate = React.memo(function MovablePlate({ position, plateInfo }: { position: THREE.Vector3; plateInfo: IPlateInformation }) {
  const delta = 0.01;

  const { horizontal, middle, columnIndex } = plateInfo;

  const { 
    setIsDragging, 
    isDragging,
    selectedColumnIndex, 
    cabinetSize, 
    cabinetLegs, 
    cabinetColumns, 
    setCabinetColumns,
    setVerticalDragging,
    isVerticalDragging
  } = useCabinetStore();

  const { totalWidth, totalDepth, totalHeight } = cabinetSize;

  const legHeight = getBottomHeight(cabinetLegs);

  const [ishovered, setIsHovered] = useState(false);
  
  // Use a ref to track if we're currently processing a drag operation
  const isProcessingDragRef = useRef(false);

  const startPosY = legHeight + PLATE_THICKNESS;

  // Store initial column widths when drag starts
  const initialWidthsRef = useRef<{left: number, right: number} | null>(null);

  const onResetPos = useCallback(() => {
    if (setIsDragging) {
      const current = [...cabinetColumns];
      
      // Add validation to ensure targetIndex is valid and columns exist
      if (!current || !current.length || columnIndex < 0 || columnIndex >= current.length - 1) {
        setIsDragging(false);
        return;
      }
      
      const disL = current[columnIndex].width + delta;
      const disR = current[columnIndex + 1].width - delta;
      
      const minWidth = 0.2; // Minimum column width
      const maxWidth = 1.0; // Maximum column width
      
      if (disL >= minWidth && disR >= minWidth && disL <= maxWidth && disR <= maxWidth) {
        // Ensure both columns exist before modifying them
        if (current[columnIndex] && current[columnIndex + 1]) {
          current[columnIndex].width = disL;
          current[columnIndex + 1].width = disR;
          
          const Lpos = getIndividualColumn({ targetIndex: columnIndex, columns: current, totalWidth, totalDepth, legHeight }).position;
          const Rpos = getIndividualColumn({ targetIndex: columnIndex + 1, columns: current, totalWidth, totalDepth, legHeight }).position;
          
          current[columnIndex].posX = Lpos.x;
          current[columnIndex + 1].posX = Rpos.x;
          
          current[columnIndex].doors = current[columnIndex].doors.map(door => ({
            ...door,
            size: { ...door.size, width: disL },
            pos: { ...door.pos, x: Lpos.x }
          }));
          
          current[columnIndex].drawers = current[columnIndex].drawers.map(drawer => ({
            ...drawer,
            size: { ...drawer.size, width: disL },
            pos: { ...drawer.pos, x: Lpos.x }
          }));
          
          current[columnIndex + 1].doors = current[columnIndex + 1].doors.map(door => ({
            ...door,
            size: { ...door.size, width: disR },
            pos: { ...door.pos, x: Rpos.x }
          }));
          
          current[columnIndex + 1].drawers = current[columnIndex + 1].drawers.map(drawer => ({
            ...drawer,
            size: { ...drawer.size, width: disR },
            pos: { ...drawer.pos, x: Rpos.x }
          }));
          
          if (current[columnIndex].isDivide) {
            current[columnIndex].dividers = [
              {
                size: {
                  width: current[columnIndex].rows[0].height,
                  depth: totalDepth - 2 * PLATE_THICKNESS,
                },
                pos: {
                  x: Lpos.x,
                  y: startPosY + current[columnIndex].rows[0].height / 2,
                },
              },
            ];
          } else {
            current[columnIndex].dividers = [];
          }
          
          setCabinetColumns(current);
        }
      }
      
      setIsDragging(false);
    }
  }, [setIsDragging, cabinetColumns, columnIndex, delta, setCabinetColumns, totalWidth, totalDepth, legHeight]);

  // Direct column position update based on mouse position
  const updateColumnPositionsDirect = useCallback((currentMouseX: number, initialMouseX: number) => {
    if (isProcessingDragRef.current) return;
    
    isProcessingDragRef.current = true;
    
    try {
      // Get a fresh copy of the columns
      const current = [...cabinetColumns];
      
      // Store initial widths when starting a new drag
      if (!initialWidthsRef.current) {
        initialWidthsRef.current = {
          left: current[columnIndex].width,
          right: current[columnIndex + 1].width
        };
      }
      
      // Calculate the movement delta
      const moveDelta = currentMouseX - initialMouseX;
      
      // Scale factor to make movement more responsive
      const scaleFactor = 1.0;
      const delta = moveDelta * scaleFactor;
      
      // Calculate new widths based on the initial widths and the delta
      let newLeftWidth = initialWidthsRef.current.left + delta;
      let newRightWidth = initialWidthsRef.current.right - delta;
      
      // Apply constraints to ensure minimum and maximum widths
      const minWidth = 0.2; // Minimum column width
      const maxWidth = 1.0; // Maximum column width
      
      // Ensure widths stay within bounds
      if (newLeftWidth < minWidth) {
        newLeftWidth = minWidth;
        newRightWidth = initialWidthsRef.current.left + initialWidthsRef.current.right - minWidth;
      } else if (newRightWidth < minWidth) {
        newRightWidth = minWidth;
        newLeftWidth = initialWidthsRef.current.left + initialWidthsRef.current.right - minWidth;
      }
      
      if (newLeftWidth > maxWidth) {
        newLeftWidth = maxWidth;
        newRightWidth = initialWidthsRef.current.left + initialWidthsRef.current.right - maxWidth;
      } else if (newRightWidth > maxWidth) {
        newRightWidth = maxWidth;
        newLeftWidth = initialWidthsRef.current.left + initialWidthsRef.current.right - maxWidth;
      }
      
      // Update column widths
      current[columnIndex].width = newLeftWidth;
      current[columnIndex + 1].width = newRightWidth;
      
      // Calculate new positions
      const legHeight = getBottomHeight(cabinetLegs);
      const startPosY = legHeight + PLATE_THICKNESS;
      
      const Lpos = getIndividualColumn({ 
        targetIndex: columnIndex, 
        columns: current, 
        totalWidth, 
        totalDepth, 
        legHeight 
      }).position;
      
      const Rpos = getIndividualColumn({ 
        targetIndex: columnIndex + 1, 
        columns: current, 
        totalWidth, 
        totalDepth, 
        legHeight 
      }).position;
      
      // Update column positions
      current[columnIndex].posX = Lpos.x;
      current[columnIndex + 1].posX = Rpos.x;
      
      // IMPORTANT: Update ALL properties of doors and drawers to ensure consistent dimensions
      
      // Update left column doors
      current[columnIndex].doors = current[columnIndex].doors.map(door => ({
        ...door,
        size: { 
          width: newLeftWidth, 
          height: door.size.height 
        },
        pos: { 
          x: Lpos.x, 
          y: door.pos.y 
        }
      }));
      
      // Update left column drawers
      current[columnIndex].drawers = current[columnIndex].drawers.map(drawer => ({
        ...drawer,
        size: { 
          width: newLeftWidth, 
          height: drawer.size.height 
        },
        pos: { 
          x: Lpos.x, 
          y: drawer.pos.y 
        }
      }));
      
      // Update right column doors
      current[columnIndex + 1].doors = current[columnIndex + 1].doors.map(door => ({
        ...door,
        size: { 
          width: newRightWidth, 
          height: door.size.height 
        },
        pos: { 
          x: Rpos.x, 
          y: door.pos.y 
        }
      }));
      
      // Update right column drawers
      current[columnIndex + 1].drawers = current[columnIndex + 1].drawers.map(drawer => ({
        ...drawer,
        size: { 
          width: newRightWidth, 
          height: drawer.size.height 
        },
        pos: { 
          x: Rpos.x, 
          y: drawer.pos.y 
        }
      }));
      
      // Update dividers if present
      if (current[columnIndex].isDivide) {
        current[columnIndex].dividers = [
          {
            size: {
              width: current[columnIndex].rows[0].height,
              depth: totalDepth - 2 * PLATE_THICKNESS,
            },
            pos: {
              x: Lpos.x,
              y: startPosY + current[columnIndex].rows[0].height / 2,
            },
          },
        ];
      }
      
      if (current[columnIndex + 1].isDivide) {
        current[columnIndex + 1].dividers = [
          {
            size: {
              width: current[columnIndex + 1].rows[0].height,
              depth: totalDepth - 2 * PLATE_THICKNESS,
            },
            pos: {
              x: Rpos.x,
              y: startPosY + current[columnIndex + 1].rows[0].height / 2,
            },
          },
        ];
      }
      
      // Apply all updates at once
      setCabinetColumns(current);
    } finally {
      // Always reset the processing flag when done
      isProcessingDragRef.current = false;
    }
  }, [cabinetColumns, columnIndex, setCabinetColumns, cabinetLegs, totalWidth, totalDepth]);

  const bindDragger = useDrag<ThreeEvent<PointerEvent>, UserDragConfig>(({ active, timeStamp, event }) => {
    event.stopPropagation();

    setIsDragging(active);
    
    // Set vertical dragging state if this is a vertical dragger
    if (!horizontal && middle) {
      setVerticalDragging(active);
    }

    if (!horizontal && middle) {
      const { ray } = event;
      ray.intersectPlane(PLANE_VECTOR, PLANE_INTERSECT_POINT);

      const x = PLANE_INTERSECT_POINT.x;
      const z = PLANE_INTERSECT_POINT.z;

      if (active) {
        // On initial click, store the mouse position
        if (!INITIAL_MOUSE_POSITION_FOR_DRAGGER) {
          INITIAL_MOUSE_POSITION_FOR_DRAGGER = new THREE.Vector3(x, PLANE_INTERSECT_POINT.y, z);
          // Reset initial widths when starting a new drag
          initialWidthsRef.current = null;
        }

        // Update column positions directly based on mouse position
        updateColumnPositionsDirect(x, INITIAL_MOUSE_POSITION_FOR_DRAGGER.x);
      } else {
        // Reset the initial mouse position when dragging ends
        INITIAL_MOUSE_POSITION_FOR_DRAGGER = null;
        initialWidthsRef.current = null;
        // Only call onResetPos when dragging ends
        onResetPos();
      }
    }

    return timeStamp;
  });

  const handlePointerOver = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = 'grab';
    setIsHovered(true);
  }, []);

  const handlePointerOut = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  }, []);

  const frontMaterialRef = React.useRef<THREE.MeshBasicMaterial>(null);

  const draggerTexture = useTexture('/assets/images/dragger.jpg');
  const draggerActiveTexture = useTexture('/assets/images/dragger_active.jpg');

  draggerTexture.repeat.set(0.75, 0.75);
  draggerTexture.center.set(0.5, 0.75);
  draggerActiveTexture.repeat.set(0.75, 0.75);
  draggerActiveTexture.center.set(0.5, 0.75);

  const shouldShowDragger = selectedColumnIndex === columnIndex || selectedColumnIndex - 1 === columnIndex;

  useEffect(() => {
    if (frontMaterialRef.current) {
      frontMaterialRef.current.map = ishovered ? draggerActiveTexture : draggerTexture;
    }
  }, [ishovered]);

  return (
    <mesh
      position={[position.x, position.y, position.z + totalDepth / 2 + delta]}
      {...(bindDragger() as unknown as { onPointerDown: (e: ThreeEvent<PointerEvent>) => void })}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[0.05, 0.2, 0.01]} />

      {/* sol  */}
      <meshBasicMaterial attach="material-1" color={0xe9eff5} visible={shouldShowDragger} />
      {/* üst  */}
      <meshBasicMaterial attach="material-2" color={0xe9eff5} visible={shouldShowDragger} />
      <meshBasicMaterial attach="material-3" color={0xe9eff5} visible={shouldShowDragger} />
      {/* ön */}

      {/* arka */}
      <meshBasicMaterial attach="material-5" color={0xe9eff5} visible={shouldShowDragger} />
      {/* sağ */}
      <meshBasicMaterial attach="material-0" color={0xe9eff5} visible={shouldShowDragger} />
      <meshBasicMaterial ref={frontMaterialRef} attach="material-4" map={draggerTexture} visible={shouldShowDragger} />
    </mesh>
  );
});
