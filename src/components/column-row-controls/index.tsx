import React, { useEffect, useState } from 'react';
import { useCabinetStore } from '@/store';
import { CELL_SIZE, PLATE_THICKNESS, getBottomHeight, getCalculatedColumns, applyRandomLayoutsToColumns } from '@/utils/utilities';
import styles from './styles.module.css';
import { TVStand } from '@/3D/TVStand';

const ColumnRowControls = () => {
  const { 
    cabinetSize, 
    cabinetColumns, 
    cabinetStyle, 
    cabinetLegs, 
    setCabinetColumns,
  } = useCabinetStore();
  
  const tvStand = new TVStand();

  const { totalWidth, totalHeight } = cabinetSize;
  const legHeight = getBottomHeight(cabinetLegs);
  
  const [minColumns, setMinColumns] = useState(1);
  const [maxColumns, setMaxColumns] = useState(10);
  const [currentColumns, setCurrentColumns] = useState(cabinetColumns.length || 1);
  
  const [minRows, setMinRows] = useState(1);
  const [maxRows, setMaxRows] = useState(5);
  const [currentRows, setCurrentRows] = useState(1);

  
  useEffect(() => {
    //tvStand.resize({width: totalWidth});
  }, [totalWidth]);
  
  useEffect(() => {
  }, [totalHeight, legHeight]);
  
  useEffect(() => {
  }, [cabinetColumns.length]);
  
  useEffect(() => {
  }, [cabinetColumns]);
  
  useEffect(() => {
  }, [cabinetColumns.length]);
  
  const updateColumnCount = (count: number) => {
  };
  
  const updateRowCount = (count: number) => {
  };
  
  const adjustColumns = (delta: number) => {
  };
  
  const adjustRows = (delta: number) => {
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
