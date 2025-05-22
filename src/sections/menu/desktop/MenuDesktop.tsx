'use client';
import menuStyles from './menu-desktop.module.css';

import useMenuItems from '@/hooks/useMenuItems';
import { useCabinetStore } from '@/store';
import { LayoutOptions } from '../shared/LayoutOptions';
import OrderSummary from '../shared/OrderSummary';

function MenuDesktop() {
  const { menuItems } = useMenuItems();
  const { selectedColumnIndex } = useCabinetStore();
  return (
    <div className={menuStyles.body}>
      <div className={menuStyles.title}>Cotton Beige Sideboard with</div>
      <div className={menuStyles.divider} />
      <div className={menuStyles.sections}>
        {menuItems.map((option, index) => (
          <div key={index} className={menuStyles.section}>
            <div className={menuStyles.subtitle}>{option.title} ===</div>
            {option.component}
          </div>
        ))}
      </div>
      <div className={menuStyles.divider} />
      <OrderSummary />
      {selectedColumnIndex !== -1 && <LayoutOptions />}
    </div>
  );
}

export default MenuDesktop;
