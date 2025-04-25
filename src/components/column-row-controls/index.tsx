import React, { useEffect, useState } from 'react';
import { useCabinetStore } from '@/store';
import { CELL_SIZE, PLATE_THICKNESS, getBottomHeight, getCalculatedColumns, getColumnVerticalLayout, applyRandomLayoutsToColumns } from '@/utils/utilities';
import styles from './styles.module.css';

const ColumnRowControls = () => {
  const { 
    cabinetSize, 
    cabinetColumns, 
    cabinetStyle, 
    cabinetLegs, 
    setCabinetColumns
  } = useCabinetStore();
  
  const { totalWidth, totalHeight } = cabinetSize;
  const legHeight = getBottomHeight(cabinetLegs);
  
  // Column state
  const [minColumns, setMinColumns] = useState(1);
  const [maxColumns, setMaxColumns] = useState(10);
  const [currentColumns, setCurrentColumns] = useState(cabinetColumns.length || 1);
  
  // Row (shelves) state
  const [minRows, setMinRows] = useState(1);
  const [maxRows, setMaxRows] = useState(5);
  const [currentRows, setCurrentRows] = useState(1);
  
  // Calculate column constraints based on width
  useEffect(() => {
    const usableWidth = totalWidth - 2 * PLATE_THICKNESS;
    
    // Min/max column width constraints (in meters)
    const cellWidthMin = CELL_SIZE.minWidth;
    const cellWidthMax = CELL_SIZE.maxWidth;
    
    // Calculate min/max number of columns that can fit
    const calculatedMinColumns = Math.ceil(usableWidth / (cellWidthMax + PLATE_THICKNESS));
    const calculatedMaxColumns = Math.floor(usableWidth / (cellWidthMin + PLATE_THICKNESS));
    
    // Ensure at least 1 column and valid range
    const validMinColumns = Math.max(1, calculatedMinColumns);
    const validMaxColumns = Math.max(validMinColumns, calculatedMaxColumns);
    
    setMinColumns(validMinColumns);
    setMaxColumns(validMaxColumns);
    
    // Adjust current columns if outside new range
    if (currentColumns < validMinColumns) {
      setCurrentColumns(validMinColumns);
      updateColumnCount(validMinColumns);
    } else if (currentColumns > validMaxColumns) {
      setCurrentColumns(validMaxColumns);
      updateColumnCount(validMaxColumns);
    }
  }, [totalWidth]);
  
  // Calculate row constraints based on height
  useEffect(() => {
    // Calculate usable height (total height minus legs and top/bottom plates)
    const cabinetHeight = totalHeight - legHeight - 2 * PLATE_THICKNESS;
    const usableHeight = cabinetHeight;
    
    // Min/max row height constraints (in meters)
    const cellHeightMin = CELL_SIZE.minHeight;
    const cellHeightMax = CELL_SIZE.maxHeight;
    
    // Calculate min/max number of rows that can fit
    const calculatedMinRows = Math.ceil(usableHeight / (cellHeightMax + PLATE_THICKNESS));
    const calculatedMaxRows = Math.floor(usableHeight / (cellHeightMin + PLATE_THICKNESS));
    
    // Ensure at least 1 row and valid range
    const validMinRows = Math.max(1, calculatedMinRows);
    const validMaxRows = Math.max(validMinRows, calculatedMaxRows);
    
    setMinRows(validMinRows);
    setMaxRows(validMaxRows);
    
    // Adjust current rows if outside new range
    if (currentRows < validMinRows) {
      setCurrentRows(validMinRows);
      updateRowCount(validMinRows);
    } else if (currentRows > validMaxRows) {
      setCurrentRows(validMaxRows);
      updateRowCount(validMaxRows);
    }
  }, [totalHeight, legHeight]);
  
  // Update column count when component mounts
  useEffect(() => {
    setCurrentColumns(cabinetColumns.length);
  }, [cabinetColumns.length]);
  
  // Update row count when cabinet columns change
  useEffect(() => {
    if (cabinetColumns.length > 0) {
      // Get the row count from the first column (assuming all columns have the same number of rows)
      setCurrentRows(cabinetColumns[0].rows.length);
    }
  }, [cabinetColumns]);
  
  // Function to update column count
  const updateColumnCount = (count: number) => {
    const legHeight = getBottomHeight(cabinetLegs);
    
    // Use getCalculatedColumns to generate the array of columns
    const newColumns = getCalculatedColumns({
      current: [],
      cabinetStyle,
      cabinetSize,
      legHeight,
      columnCount: count
    });
    
    // Update the cabinet columns with the array
    setCabinetColumns(newColumns);
    
    // After creating new columns
    const randomizedColumns = applyRandomLayoutsToColumns(newColumns, cabinetSize.totalHeight, legHeight);
    setCabinetColumns(randomizedColumns);
  };
  
  // Function to update row count for all columns
  const updateRowCount = (count: number) => {
    const newCabinetColumns = [...cabinetColumns];
    
    // Get the cabinet height (excluding legs and plate thickness)
    const cabinetHeight = totalHeight - legHeight - 2 * PLATE_THICKNESS;
    
    // Generate new rows based on count
    const newRows = [];
    for (let i = 0; i < count; i++) {
      newRows.push({
        index: i,
        height: cabinetHeight / count - (count > 1 ? PLATE_THICKNESS * (count - 1) / count : 0)
      });
    }
    
    // Update all columns with new rows
    for (let i = 0; i < newCabinetColumns.length; i++) {
      // Store old layout index to preserve style
      const oldLayoutIndex = newCabinetColumns[i].layoutIndex;
      const oldIsDivide = newCabinetColumns[i].isDivide;
      const oldWidth = newCabinetColumns[i].width;
      const oldPosX = newCabinetColumns[i].posX;
      
      // Calculate the starting Y position
      const startPosY = legHeight + PLATE_THICKNESS;
      
      // Update the column with new rows
      newCabinetColumns[i].rows = JSON.parse(JSON.stringify(newRows));
      
      // Preserve important properties
      newCabinetColumns[i].layoutIndex = oldLayoutIndex;
      newCabinetColumns[i].isDivide = oldIsDivide;
      newCabinetColumns[i].width = oldWidth;
      newCabinetColumns[i].posX = oldPosX;
      
      // Rather than using random layouts, manually update doors or drawers based on row count
      // while maintaining the existing layout style (door vs drawer)
      const lastRow = newCabinetColumns[i].lastRow;
      
      if (lastRow === 'door') {
        // Update door to match the new height
        newCabinetColumns[i].doors = [{
          index: 0,
          size: {
            width: oldWidth,
            height: cabinetHeight,
          },
          pos: {
            x: oldPosX,
            y: startPosY + cabinetHeight / 2,
          },
          opening: newCabinetColumns[i].doors[0]?.opening || 1,
        }];
        newCabinetColumns[i].drawers = [];
      } 
      else if (lastRow === 'drawer') {
        // Create drawers for each row while preserving the layout style
        const drawers = newRows.map((row, index) => ({
          index,
          size: {
            width: oldWidth,
            height: row.height,
          },
          pos: {
            x: oldPosX,
            y: startPosY + (index + 0.5) * row.height + index * PLATE_THICKNESS,
          },
        }));
        newCabinetColumns[i].drawers = drawers;
        newCabinetColumns[i].doors = [];
      }
    }
    
    // Update cabinet columns WITHOUT applying random layouts
    setCabinetColumns(newCabinetColumns);
  };
  
  // Adjust column count
  const adjustColumns = (delta: number) => {
    const newCount = currentColumns + delta;
    if (newCount >= minColumns && newCount <= maxColumns) {
      setCurrentColumns(newCount);
      updateColumnCount(newCount);
    }
  };
  
  // Adjust row count
  const adjustRows = (delta: number) => {
    const newCount = currentRows + delta;
    if (newCount >= minRows && newCount <= maxRows) {
      setCurrentRows(newCount);
      updateRowCount(newCount);
    }
  };

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Columns</div>
        <div className={styles.controlButtons}>
          <button 
            className={styles.controlButton}
            onClick={() => adjustColumns(-1)}
            disabled={currentColumns <= minColumns}
          >
            −
          </button>
          <span className={styles.countDisplay}>{currentColumns}</span>
          <button 
            className={styles.controlButton}
            onClick={() => adjustColumns(1)}
            disabled={currentColumns >= maxColumns}
          >
            +
          </button>
        </div>
      </div>
      
      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Shelves</div>
        <div className={styles.controlButtons}>
          <button 
            className={styles.controlButton}
            onClick={() => adjustRows(-1)}
            disabled={currentRows <= minRows}
          >
            −
          </button>
          <span className={styles.countDisplay}>{currentRows}</span>
          <button 
            className={styles.controlButton}
            onClick={() => adjustRows(1)}
            disabled={currentRows >= maxRows}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnRowControls; 