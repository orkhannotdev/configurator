import React from 'react';
import styles from './styles.module.css';

interface RangeInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export const RangeInput: React.FC<RangeInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={styles.rangeInputContainer}>
      <div className={styles.rangeLabel}>
        {label}: {value}{unit}
      </div>
      <div className={styles.rangeControl}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={styles.rangeSlider}
        />
      </div>
    </div>
  );
}; 