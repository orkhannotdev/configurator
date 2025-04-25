import { useEffect, useState } from 'react';
import styles from './switch.module.css';
import { SwitchProps } from './types';

// Switch component with or without step markers
function Switch({ value, options, onChange }: SwitchProps) {
  // State to keep track of the selected
  const [selectedIndex, setSelectedIndex] = useState(value ?? 0);

  // Add this useEffect to update internal state when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedIndex(value);
    }
  }, [value]);

  // Function to handle the click event on the options
  const handleClick = (index: number) => {
    // Update the selected state based on the clicked option
    setSelectedIndex(index);
  };

  useEffect(() => {
    // Call the onChange function with the selected option
    onChange(selectedIndex);
  }, [selectedIndex]);

  return (
    <div className={styles.switchContainer}>
      <div
        className={styles.selectionBackground}
        style={{
          left: `${selectedIndex * 50}%`,
          transform: `translateX(${selectedIndex === 0 ? '4px' : '0px'})`, // Adjust based on selection
        }}
      />
      {options.map((option, index) => (
        <div key={option} className={`${styles.option} ${selectedIndex === index ? styles.selected : ''}`} onClick={() => handleClick(index)}>
          {option}
        </div>
      ))}
    </div>
  );
}

export default Switch;