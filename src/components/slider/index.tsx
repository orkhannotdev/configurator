'use client';
import { iconifyIcons } from '@/utils/utilities';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import sliderStyles from './slider.module.css';
import { IInputProps, SliderProps } from './types';

// Slider component with or without step markers
function Slider({ min, max, onChange, defaultValue }: SliderProps) {
  // State to keep track of the current value and whether the thumb is being dragged
  const [value, setValue] = useState<number>(defaultValue ?? min);

  useEffect(() => {
    onChange(value ?? min);
  }, [value]);

  return (
    <div className={sliderStyles.body}>
      <SliderContainer min={min} max={max} value={value} setValue={setValue} />
      <InputContainer min={min} max={max} value={value} setValue={setValue} />
    </div>
  );
}

export default Slider;

function SliderContainer({ min, max, value, setValue }: IInputProps) {
  // Refs to the slider and thumb elements
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  // Calculate the position of the thumb based on the value
  const percentage = ((value - min) / (max - min)) * 100;

  // Function to handle the mouse down event on the thumb
  const handleMouseDown = () => {
    // Set the dragging state to true
    setIsDragging(true);

    // Function to move the thumb based on the mouse position
    const moveThumb = (event: MouseEvent) => {
      // If the slider ref exists, calculate the new value based on the mouse position
      if (sliderRef.current) {
        // Get the slider's bounding rect and calculate the new left position and value
        const sliderRect = sliderRef.current.getBoundingClientRect();

        // Calculate the new left position and value based on the mouse position
        const newLeft = Math.min(Math.max(event.clientX - sliderRect.left, 0), sliderRect.width);

        // Calculate the new value based on the left position and slider width
        const newValue = min + (newLeft / sliderRect.width) * (max - min);

        // Calculate the target value based on the min and max values
        const targetValue = Math.trunc(Math.min(Math.max(newValue, min), max));

        // Update the value state
        setValue(targetValue);
      }
    };

    // Function to stop the thumb movement
    const stopThumbMovement = () => {
      // Set the dragging state to false
      setIsDragging(false);

      // Remove the event listeners
      window.removeEventListener('mousemove', moveThumb);
      window.removeEventListener('mouseup', stopThumbMovement);
    };

    // Add event listeners to move the thumb and stop the movement
    window.addEventListener('mousemove', moveThumb);
    window.addEventListener('mouseup', stopThumbMovement);
  };
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div className={sliderStyles.sliderContainer}>
      <div className={sliderStyles.slider} ref={sliderRef}>
        <div className={sliderStyles.trackFilled} style={{ width: `${percentage}%` }} />
        <div className={sliderStyles.track} />
        <div ref={thumbRef} className={sliderStyles.thumb} style={{ left: `calc(${percentage}% - 8px)` }} onMouseDown={handleMouseDown}>
          {isDragging && <div className={sliderStyles.label}>{Math.round(value).toFixed(0)}cm</div>}
        </div>
      </div>
      <div className={sliderStyles.sliderLimits}>
        <div>{min}cm</div>
        <div>{max}cm</div>
      </div>
    </div>
  );
}

// InputContainer component as a sub-component of Slider
function InputContainer({ min, max, value, setValue }: IInputProps) {
  // State to keep track of the dummy value and the debounce timer
  const [dummyValue, setDummyValue] = useState(value);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Update dummyValue when the value prop changes
  useEffect(() => {
    setDummyValue(value);
  }, [value]);

  // Handle immediate input changes with validation
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Parse the input value as an integer or NaN
    const inputValue = event.target.value === '' ? NaN : parseInt(event.target.value, 10);

    // Update dummyValue immediately
    setDummyValue(isNaN(inputValue) ? NaN : inputValue);

    // Clear previous debounce timer on each input change
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Start a new debounce timer for final validation and setValue
    const newTimeoutId = setTimeout(() => {
      // If input is cleared or invalid
      if (isNaN(inputValue)) {
        // Reset to min
        setValue(min);

        // Sync dummyValue
        setDummyValue(min);

        // If input is less than min
      } else if (inputValue < min) {
        // Clamp to min
        setValue(min);

        // Sync dummyValue
        setDummyValue(min);

        // If input is greater than max
      } else if (inputValue > max) {
        // Clamp to max
        setValue(max);

        // Sync dummyValue
        setDummyValue(max);

        // Else, valid input
      } else {
        // Set the value
        setValue(inputValue);

        // Sync dummyValue
        setDummyValue(inputValue);
      }
    }, 700);

    setTimeoutId(newTimeoutId);
  };

  // Function to increase the value by one
  const increaseValueByButton = () => {
    // Check if the value is less than the max limit
    if (value < max) {
      setValue(value + 1);
      setDummyValue(value + 1); // Sync dummyValue
    }
  };

  // Function to decrease the value by one
  const decreaseValueByButton = () => {
    // Check if the value is greater than the min limit
    if (value > min) {
      setValue(value - 1);
      setDummyValue(value - 1); // Sync dummyValue
    }
  };

  return (
    <div className={sliderStyles.inputContainer}>
      <div className={sliderStyles.input}>
        <div className={sliderStyles.inputContent}>
          <input
            type="number"
            className={sliderStyles.inputValue}
            value={isNaN(dummyValue) ? '' : dummyValue} // Show empty string if NaN
            onChange={handleInputChange}
            min={min}
            max={max}
          />
          <div className={sliderStyles.inputUnit}>cm</div>
        </div>
        <div className={sliderStyles.inputButtons}>
          <Icon icon={iconifyIcons.menuIcons.arrowUp} onClick={increaseValueByButton} />
          <Icon icon={iconifyIcons.menuIcons.arrowDown} onClick={decreaseValueByButton} />
        </div>
      </div>
      <Icon icon={iconifyIcons.menuIcons.infoQuestion} />
    </div>
  );
}
