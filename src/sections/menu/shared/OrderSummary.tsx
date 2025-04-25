import React from 'react';

import menuStylesDesktop from '../desktop/menu-desktop.module.css';
import menuStylesMobile from '../mobile/menu-mobile.module.css';

import useMediaQuery from '@/hooks/useMediaQuery';
import { Icon } from '@iconify/react';

function OrderSummary() {
  // Get the screen size
  const { smallScreen } = useMediaQuery();

  // Set the menu styles based on the screen size
  const menuStyles = smallScreen ? menuStylesMobile : menuStylesDesktop;

  // Set the classes for the buttons
  const saveButtonClasses = `${menuStyles.summaryButton} ${menuStyles.saveButton}`;
  const submitButtonClasses = `${menuStyles.summaryButton} ${menuStyles.submitButton}`;

  return (
    <div className={menuStyles.summaryBody}>
      <div className={menuStyles.summaryPriceAndDelivery}>
        <div className={menuStyles.summaryPrice}>
          <div className={menuStyles.summaryPriceRow}>
            <div className={menuStyles.discountedFee}>$847</div>
            <div className={menuStyles.additionalFee}>$157</div>
          </div>
          <div className={menuStyles.summaryPriceRow}>
            <div className={menuStyles.regularFee}>$1264</div>
            <div className={menuStyles.discountAmount}>(-33% off)</div>
          </div>
        </div>
        <div className={menuStyles.summaryAdditionalInfo}>
          <div className={menuStyles.summaryInfoText}>
            <Icon icon="mingcute:check-fill" color="#4d9a00" /> Taxes included
          </div>
          <div className={menuStyles.summaryInfoText}>
            <Icon icon="mingcute:check-fill" color="#4d9a00" /> Ships in 9-10 weeks
          </div>
        </div>
      </div>
      <div className={menuStyles.summaryButtons}>
        <div className={saveButtonClasses}>SAVE TO DESIGN</div>
        <div className={submitButtonClasses}>ADD TO CHART</div>
      </div>
    </div>
  );
}

export default OrderSummary;
