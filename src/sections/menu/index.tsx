'use client';
import React from 'react';
import MenuMobile from './mobile/MenuMobile';
import MenuDesktop from './desktop/MenuDesktop';
import useMediaQuery from '@/hooks/useMediaQuery';

function Menu() {
  // Get the screen size
  const { smallScreen } = useMediaQuery();

  // Show the mobile menu if the screen is small
  const menu = smallScreen ? <MenuMobile /> : <MenuDesktop />;

  // Return the menu
  return menu;
}

export default Menu;
