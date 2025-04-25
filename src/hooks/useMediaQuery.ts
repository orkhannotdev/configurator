import React, { useEffect } from 'react';

// This hook will return a boolean value that will be true if the screen is smaller than 1024px.
const useMediaQuery = () => {
  // The state will be updated when the screen is resized.
  const [smallScreen, setSmallScreen] = React.useState(false);

  useEffect(() => {
    // This function will check the screen width and update
    const checkWidth = () => {
      // If the screen is smaller than 1024px, the state will be updated to true.
      setSmallScreen(window.innerWidth < 1024);
    };
    // This will call the function to check the width when the component is mounted.
    checkWidth();

    // This will add an event listener to check the width when the screen is resized.
    window.addEventListener('resize', checkWidth);

    // This will remove the event listener when the component is unmounted.
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // This will return the state.
  return { smallScreen };
};

export default useMediaQuery;
