import React, { useState, useEffect } from 'react';
import { RangeInput } from '../range-input';
import { CABINET_SIZE_CONSTRAINTS } from '../../utils/utilities';
import { useCabinetStore } from '@/store';
import styles from './styles.module.css';

const SizeControls = () => {
  const { cabinetSize, setCabinetSize } = useCabinetStore();
  
  const [width, setWidth] = useState(cabinetSize.totalWidth * 100);
  const [height, setHeight] = useState(cabinetSize.totalHeight * 100);
  const [depth, setDepth] = useState(cabinetSize.totalDepth * 100);
  
  useEffect(() => {
    setWidth(cabinetSize.totalWidth * 100);
    setHeight(cabinetSize.totalHeight * 100);
    setDepth(cabinetSize.totalDepth * 100);
  }, [cabinetSize]);
  
  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    setCabinetSize({
      ...cabinetSize,
      totalWidth: newWidth / 100, 
    });
  };
  
  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    setCabinetSize({
      ...cabinetSize,
      totalHeight: newHeight / 100, 
    });
  };
  
  const handleDepthChange = (newDepth: number) => {
    setDepth(newDepth);
    setCabinetSize({
      ...cabinetSize,
      totalDepth: newDepth / 100
    });
  };
  
  return (
    <div className={styles.sizeControlsContainer}>
      <RangeInput
        label="Width"
        value={width}
        onChange={handleWidthChange}
        min={CABINET_SIZE_CONSTRAINTS.minWidth * 100}
        max={CABINET_SIZE_CONSTRAINTS.maxWidth * 100} 
        step={1}
        unit="cm"
      />
      
      <RangeInput
        label="Height"
        value={height}
        onChange={handleHeightChange}
        min={CABINET_SIZE_CONSTRAINTS.minHeight * 100} 
        max={CABINET_SIZE_CONSTRAINTS.maxHeight * 100} 
        step={1}
        unit="cm"
      />
      
      <RangeInput
        label="Depth"
        value={depth}
        onChange={handleDepthChange}
        min={CABINET_SIZE_CONSTRAINTS.minDepth * 100} 
        max={CABINET_SIZE_CONSTRAINTS.maxDepth * 100} 
        step={1}
        unit="cm"
      />
    </div>
  );
};

export default SizeControls;