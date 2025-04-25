'use client';
import React from 'react';
import { EMenuTitles } from '../shared/types';
import Tabs from '@/components/tabs';
import menuStyles from './menu-mobile.module.css';

import OrderSummary from '../shared/OrderSummary';
import useMenuItems from '@/hooks/useMenuItems';

function MenuMobile() {
  const { menuItems } = useMenuItems();

  // State to keep track of the active tab
  const [activeTab, setActiveTab] = React.useState<string>(menuItems[0].title);

  // Get all the tabs from the menuItems
  const tabs: EMenuTitles[] = Object.values(EMenuTitles);

  // Function to handle the tab change
  const handleTabChange = (tab: string) => {
    // Set the active tab
    setActiveTab(tab);
  };

  // Get the active menu item
  const activeMenuItem = menuItems.find((item) => item.title === activeTab);

  return (
    <div className={menuStyles.body}>
      <Tabs activeTab={activeTab} tabs={tabs} onChange={handleTabChange} />
      <div className={menuStyles.optionContainer}>
        {activeMenuItem?.component}
        <div className={menuStyles.divider} />
        <OrderSummary />
      </div>
    </div>
  );
}

export default MenuMobile;
