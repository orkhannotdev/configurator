import React from 'react';
import Tab from './Tab';
import tabStyles from './tab.module.css';

function Tabs({ activeTab, tabs, onChange }: { activeTab: string; tabs: string[]; onChange: (tab: string) => void }) {
  return (
    <div className={tabStyles.body}>
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab} isActive={tab === activeTab} onChange={onChange} />
      ))}
    </div>
  );
}

export default Tabs;
