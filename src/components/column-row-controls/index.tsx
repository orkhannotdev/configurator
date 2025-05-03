import React, { useEffect, useState } from 'react';
import { useCabinetStore } from '@/store';
import { CELL_SIZE, PLATE_THICKNESS, getBottomHeight, getCalculatedColumns, applyRandomLayoutsToColumns } from '@/utils/utilities';
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
  
  const [minColumns, setMinColumns] = useState(1);
  const [maxColumns, setMaxColumns] = useState(10);
  const [currentColumns, setCurrentColumns] = useState(cabinetColumns.length || 1);
  
  const [minRows, setMinRows] = useState(1);
  const [maxRows, setMaxRows] = useState(5);
  const [currentRows, setCurrentRows] = useState(1);
  
  useEffect(() => {
    const usableWidth = totalWidth - 2 * PLATE_THICKNESS;
    
    const cellWidthMin = CELL_SIZE.minWidth;
    const cellWidthMax = CELL_SIZE.maxWidth;
    
    const calculatedMinColumns = Math.ceil(usableWidth / (cellWidthMax + PLATE_THICKNESS));
    const calculatedMaxColumns = Math.floor(usableWidth / (cellWidthMin + PLATE_THICKNESS));
    
    const validMinColumns = Math.max(1, calculatedMinColumns);
    const validMaxColumns = Math.max(validMinColumns, calculatedMaxColumns);
    
    setMinColumns(validMinColumns);
    setMaxColumns(validMaxColumns);
    
    if (currentColumns < validMinColumns) {
      setCurrentColumns(validMinColumns);
      updateColumnCount(validMinColumns);
    } else if (currentColumns > validMaxColumns) {
      setCurrentColumns(validMaxColumns);
      updateColumnCount(validMaxColumns);
    }
  }, [totalWidth]);
  
  useEffect(() => {
    const cabinetHeight = totalHeight - legHeight - 2 * PLATE_THICKNESS;
    const usableHeight = cabinetHeight;
    
    const cellHeightMin = CELL_SIZE.minHeight;
    const cellHeightMax = CELL_SIZE.maxHeight;
    
    const calculatedMinRows = Math.ceil(usableHeight / (cellHeightMax + PLATE_THICKNESS));
    const calculatedMaxRows = Math.floor(usableHeight / (cellHeightMin + PLATE_THICKNESS));
    
    const validMinRows = Math.max(1, calculatedMinRows);
    const validMaxRows = Math.max(validMinRows, calculatedMaxRows);
    
    setMinRows(validMinRows);
    setMaxRows(validMaxRows);
    
    if (currentRows < validMinRows) {
      setCurrentRows(validMinRows);
      updateRowCount(validMinRows);
    } else if (currentRows > validMaxRows) {
      setCurrentRows(validMaxRows);
      updateRowCount(validMaxRows);
    }
  }, [totalHeight, legHeight]);
  
  useEffect(() => {
    setCurrentColumns(cabinetColumns.length);
  }, [cabinetColumns.length]);
  
  useEffect(() => {
    if (cabinetColumns.length > 0) {
      setCurrentRows(cabinetColumns[0].rows.length);
    }
  }, [cabinetColumns]);
  
  useEffect(() => {
    if (cabinetColumns.length > 0 && currentRows < 6) {
      setCurrentRows(6);
      updateRowCount(6);
    }
  }, [cabinetColumns.length]);
  
  const updateColumnCount = (count: number) => {
    const legHeight = getBottomHeight(cabinetLegs);
    
    const newColumns = getCalculatedColumns({
      current: [],
      cabinetStyle,
      cabinetSize,
      legHeight,
      columnCount: count
    });
    
    setCabinetColumns(newColumns);
    
    const randomizedColumns = applyRandomLayoutsToColumns(newColumns, cabinetSize.totalHeight, legHeight);
    setCabinetColumns(randomizedColumns);
  };
  
  const updateRowCount = (count: number) => {
    const newCabinetColumns = [...cabinetColumns];
    
    const cabinetHeight = totalHeight - legHeight - 2 * PLATE_THICKNESS;
    
    const newRows = [];
    for (let i = 0; i < count; i++) {
      newRows.push({
        index: i,
        height: cabinetHeight / count - (count > 1 ? PLATE_THICKNESS * (count - 1) / count : 0)
      });
    }
    
    for (let i = 0; i < newCabinetColumns.length; i++) {
      const oldLayoutIndex = newCabinetColumns[i].layoutIndex;
      const oldIsDivide = newCabinetColumns[i].isDivide;
      const oldWidth = newCabinetColumns[i].width;
      const oldPosX = newCabinetColumns[i].posX;
      
      const startPosY = legHeight + PLATE_THICKNESS;
      
      newCabinetColumns[i].rows = JSON.parse(JSON.stringify(newRows));
      
      newCabinetColumns[i].layoutIndex = oldLayoutIndex;
      newCabinetColumns[i].isDivide = oldIsDivide;
      newCabinetColumns[i].width = oldWidth;
      newCabinetColumns[i].posX = oldPosX;
      
      const lastRow = newCabinetColumns[i].lastRow || 'door';
      
      if (lastRow === 'door') {
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
    
    setCabinetColumns(newCabinetColumns);
  };
  
  const adjustColumns = (delta: number) => {
    const newCount = currentColumns + delta;
    if (newCount >= minColumns && newCount <= maxColumns) {
      setCurrentColumns(newCount);
      updateColumnCount(newCount);
    }
  };
  
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