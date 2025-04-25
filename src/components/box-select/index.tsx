'use client';
import { getActiveImagePath } from '@/utils/helpers';
import Image from 'next/image';
import React, { useEffect } from 'react';
import boxSelectStyles from './box-select.module.css';
import { BoxSelectItem, BoxSelectProps } from './types';

function BoxSelect({ options, small, onChange }: BoxSelectProps) {
  // State to keep track of the selected option
  const [selectedOption, setSelectedOption] = React.useState<BoxSelectItem>(options[0]);

  // Function to handle the click event on the option
  const onClickOption = (option: BoxSelectItem) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    onChange(selectedOption.value);
  }, [selectedOption]);

  // Function to set the active class name based on the selected option
  const largeActiveClassName = (option: BoxSelectItem) => (selectedOption.value === option.value ? `${boxSelectStyles.boxItem} ${boxSelectStyles.active}` : boxSelectStyles.boxItem);

  // Function to set the active class name based on the selected option
  const smallActiveClassName = (option: BoxSelectItem) => (selectedOption.value === option.value ? `${boxSelectStyles.boxItemSmall} ${boxSelectStyles.active}` : boxSelectStyles.boxItemSmall);

  const largeItem = (option: BoxSelectItem) => (
    <div key={option.value} className={largeActiveClassName(option)} onClick={() => onClickOption(option)}>
      <Image width={32} height={32} src={selectedOption.value === option.value ? getActiveImagePath(option.src) : option.src} alt={option.label} />
      <div className={boxSelectStyles.boxItemTitle}>{option.label}</div>
    </div>
  );

  // Function to render the popup
  const popup = (option: BoxSelectItem) => (
    <div className={boxSelectStyles.popup}>
      <div
        className={boxSelectStyles.popupImage}
        style={{
          backgroundImage: `url(${option.value})`,
        }}
      />
      <div className={boxSelectStyles.popupLabel}>{option.label}</div>
    </div>
  );

  // Function to render the small item
  const smallItem = (option: BoxSelectItem) => (
    <div
      key={option.value}
      className={smallActiveClassName(option)}
      onClick={() => onClickOption(option)}
      style={{
        backgroundImage: `url(${option.value})`,
      }}
    >
      {popup(option)}
    </div>
  );

  // Render the box select component
  return <div className={boxSelectStyles.body}>{options.map((option) => (small ? smallItem(option) : largeItem(option)))}</div>;
}

export default BoxSelect;
