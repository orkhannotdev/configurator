import BoxSelect from '@/components/box-select';
import Slider from '@/components/slider';
import Switch from '@/components/switch';
import ColumnRowControls from '@/components/column-row-controls';
import { EMenuTitles, IMenuItem } from '@/sections/menu/shared/types';
import { useCabinetStore } from '@/store';
import { ECabinetFinishes, ECabinetHandles, ECabinetLegs, ECabinetStyle, EPlywoodTextures, EVeneerTextures, menuIconPaths } from '@/utils/utilities';
import { useEffect } from 'react';

// Move helper functions before they are used
const getStyleOptions = () => {
  const styleValues = Object.values(ECabinetStyle);
  const styleKeys = Object.keys(ECabinetStyle);

  const styleOptions = styleValues.map((style, index) => {
    const iconKey = style.toLowerCase();

    return {
      label: styleKeys[index].replace(/_/g, ' ').toLowerCase(),
      value: style,
      src: menuIconPaths.styles[iconKey],
    };
  });
  return styleOptions;
};

const getHandleOptions = () => {
  const handleValues = Object.values(ECabinetHandles);
  const handleKeys = Object.keys(ECabinetHandles);

  const handleOptions = handleValues.map((handle, index) => {
    const iconKey = handle.toLowerCase();

    return {
      label: handleKeys[index].replace(/_/g, ' ').toLowerCase(),
      value: handle,
      src: menuIconPaths.handles[iconKey],
    };
  });
  return handleOptions;
};

const getLegOptions = () => {
  const legValues = Object.values(ECabinetLegs);
  const legKeys = Object.keys(ECabinetLegs);

  const legOptions = legValues.map((leg, index) => {
    const iconKey = leg.toLowerCase();

    return {
      label: legKeys[index].replace(/_/g, ' ').toLowerCase(),
      value: leg,
      src: menuIconPaths.legs[iconKey],
    };
  });
  return legOptions;
};

const getColorOptions = (finish: ECabinetFinishes) => {
  const plywoodValues = Object.values(EPlywoodTextures);
  const plywoodKeys = plywoodValues.filter((_value, index) => index % 2 === 1); // Filter texture names
  const plywoodFilePaths = plywoodValues.filter((_value, index) => index % 2 === 0); // Filter file paths

  const veneerValues = Object.values(EVeneerTextures);
  const veneerKeys = veneerValues.filter((_value, index) => index % 2 === 1); // Filter texture names
  const veneerFilePaths = veneerValues.filter((_value, index) => index % 2 === 0); // Filter file paths

  // Now we can map these to create options
  const veneerOptions = veneerKeys.map((key, index) => ({
    label: key.replace(/_/g, ' '),
    value: veneerFilePaths[index],
    src: '',
  }));

  // Now we can map these to create options
  const plywoodOptions = plywoodKeys.map((key, index) => ({
    label: key.replace(/_/g, ' '),
    value: plywoodFilePaths[index],
    src: '',
  }));

  const isPlywood = finish === ECabinetFinishes.PLYWOOD;

  return isPlywood ? plywoodOptions : veneerOptions;
};

const useMenuItems = () => {
  
  const { 
    cabinetFinish, 
    cabinetSize, 
    cabinetTextureURL,
    setCabinetSize, 
    setCabinetHandle, 
    setCabinetFinish, 
    setCabinetLegs, 
    setCabinetTextureURL, 
    setCabinetBackplate, 
    setSelectedColumnIndex, 
    setHoveredColumnIndex 
  } = useCabinetStore();

  // Force UI update for initial state
  useEffect(() => {
    // This forces the UI to reflect the veneer option on first load
    if (cabinetFinish === ECabinetFinishes.VENEER) {
      // Re-apply the setting to trigger UI update
      setTimeout(() => {
        setCabinetFinish(ECabinetFinishes.VENEER);
      }, 0);
    }
  }, []);

  const resetSelectionIndexes = () => {
    setSelectedColumnIndex(-1);
    setHoveredColumnIndex(-1);
  };

  // CABINET STYLE
  const styleOptions = getStyleOptions();
  const onChangeStyle = () => {
    // setCabinetStyle(value);
    resetSelectionIndexes();
  };

  // CABINET SIZES
  const onChangeWidth = (value: number) => {
    setCabinetSize({ ...cabinetSize, totalWidth: value / 100 });
    resetSelectionIndexes();
  };

  const onChangeHeight = (value: number) => {
    setCabinetSize({ ...cabinetSize, totalHeight: value / 100 });
    resetSelectionIndexes();
  };

  const onChangeDepth = (value: number) => {
    setCabinetSize({ ...cabinetSize, totalDepth: value / 100 });
    resetSelectionIndexes();
  };

  // CABINET LEGS
  const legOptions = getLegOptions();

  const onChangeLegs = (value: ECabinetLegs) => {
    setCabinetLegs(value);
    resetSelectionIndexes();
  };

  // CABINET HANDLES
  const handleOptions = getHandleOptions();

  const onChangeHandles = (value: ECabinetHandles) => {
    setCabinetHandle(value);
    resetSelectionIndexes();
  };

  // BACK PANELS
  const backPanelOptions = ['On', 'Off'];

  const onChangeBackPanels = (indexValue: number) => {
    const isSelected = indexValue === 0;
    setCabinetBackplate(isSelected);
    resetSelectionIndexes();
  };

  // FINISH
  const finishOptions = Object.values(ECabinetFinishes);

  const onChangeFinish = (indexValue: number) => {
    const newFinish = finishOptions[indexValue];
    setCabinetFinish(newFinish);
    const colorOptions = getColorOptions(newFinish);
    setCabinetTextureURL(colorOptions[0].value);
  };

  // COLOR
  const colorOptions = getColorOptions(cabinetFinish);
  const selectedTextureIndex = colorOptions.findIndex(option => option.value === cabinetTextureURL);
  
  // Use the selectedTextureIndex in a useEffect to ensure it's not marked as unused
  useEffect(() => {
    // If the texture isn't found in the options, set it to the first option
    if (selectedTextureIndex === -1 && colorOptions.length > 0) {
      setCabinetTextureURL(colorOptions[0].value);
    }
  }, [selectedTextureIndex, colorOptions, setCabinetTextureURL]);

  const onChangeTexture = (value: EPlywoodTextures | EVeneerTextures) => {
    setCabinetTextureURL(value);
  };

  const menuItems: IMenuItem[] = [
    {
      title: EMenuTitles.STYLE,
      component: <BoxSelect options={styleOptions} onChange={onChangeStyle} />,
    },
    {
      title: EMenuTitles.WIDTH,
      component: <Slider min={30} max={250} onChange={onChangeWidth} defaultValue={200} />,
    },
    {
      title: EMenuTitles.HEIGHT,
      component: <Slider min={43} max={108} onChange={onChangeHeight} defaultValue={88} />,
    },
    {
      title: EMenuTitles.DEPTH,
      component: <Slider min={24} max={48} onChange={onChangeDepth} defaultValue={34} />,
    },
    {
      title: EMenuTitles.CABINET_LAYOUT,
      component: <ColumnRowControls />,
    },
    {
      title: EMenuTitles.LEGS,
      component: <BoxSelect options={legOptions} onChange={onChangeLegs} />,
    },
    {
      title: EMenuTitles.HANDLE,
      component: <BoxSelect options={handleOptions} onChange={onChangeHandles} />,
    },
    {
      title: EMenuTitles.BACK_PANELS,
      component: <Switch options={backPanelOptions} onChange={onChangeBackPanels} />,
    },
    {
      title: EMenuTitles.FINISH,
      component: <Switch 
        options={finishOptions} 
        onChange={onChangeFinish} 
        value={cabinetFinish === ECabinetFinishes.VENEER ? 1 : 0}
      />,
    },
    {
      title: EMenuTitles.COLOR,
      component: <BoxSelect 
        options={colorOptions} 
        small 
        onChange={onChangeTexture} 
      />,
    },
  ];

  return { menuItems };
};

export default useMenuItems;
