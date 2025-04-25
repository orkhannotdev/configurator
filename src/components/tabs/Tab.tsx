import React from 'react';
import tabStyles from './tab.module.css';

const Tab = ({ label, isActive, onChange }: { label: string; isActive: boolean; onChange: (tab: string) => void }) => {
  // Set the class name based on the active state
  const tabClassName = isActive ? `${tabStyles.tab} ${tabStyles.active}` : tabStyles.tab;

  // Function to handle the click event on the tab
  const onClickTab = () => {
    // Call the onChange function with the label
    onChange(label);
  };

  return (
    <div className={tabClassName} onClick={onClickTab}>
      {label}
    </div>
  );
};

export default Tab;
