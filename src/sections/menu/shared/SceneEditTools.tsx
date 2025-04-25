import IconButton from '@/components/icon-button';
import { TIconButton } from '@/components/icon-button/types';
import { useCabinetStore } from '@/store';
import { ICabinetSize, IColumn } from '@/store/types';
import { ECabinetLegs, ECabinetStyle, PLATE_THICKNESS, getBottomHeight, getCalculatedColumns, iconifyIcons } from '@/utils/utilities';

const SceneEditTools = () => {
  const { cabinetSize, openDoors, cabinetStyle, cabinetLegs, cabinetColumns, setOpenDoors, showDimensions, setShowDimensions, setCabinetColumns } = useCabinetStore();

  const getColumns = (current: IColumn[], cabinetSize: ICabinetSize, cabinetStyle: ECabinetStyle, cabinetLegs: ECabinetLegs) => {
    const legHeight = getBottomHeight(cabinetLegs);
    return getCalculatedColumns({ current, cabinetStyle, cabinetSize, legHeight });
  };

  const alignColumns = () => {
    const currentColumns = [...cabinetColumns];

    const columnCount = currentColumns.length;

    const { totalWidth } = cabinetSize;

    const avaliableWidth = totalWidth - 2 * PLATE_THICKNESS;

    currentColumns.forEach((column) => {
      column.width = (avaliableWidth - (columnCount - 2) * PLATE_THICKNESS) / columnCount;
    });

    setCabinetColumns(getColumns(currentColumns, cabinetSize, cabinetStyle, cabinetLegs));
  };

  const areTheColumnsAligned = cabinetColumns.every((column, index) => {
    if (index === 0) return true;
    return column.width.toFixed(1) === cabinetColumns[index - 1].width.toFixed(1);
  });

  const toolOptions: TIconButton[] = [
    {
      info: { icon: iconifyIcons.layoutIcons.undoIcon, label: 'Back to previous' },
      isActive: false,
      onClick: null,
    },
    {
      info: { icon: iconifyIcons.layoutIcons.dimensionsIcon, label: 'Show Dimensions' },
      isActive: showDimensions,
      onClick: () => setShowDimensions(!showDimensions),
    },
    {
      info: { icon: iconifyIcons.layoutIcons.doorsIcon, label: 'Open all doors' },
      isActive: openDoors,
      onClick: () => setOpenDoors(!openDoors),
    },
    {
      info: { icon: iconifyIcons.layoutIcons.alignColumnsIcon, label: 'Align Section' },
      isActive: areTheColumnsAligned,
      onClick: alignColumns,
    },
    {
      info: { icon: iconifyIcons.layoutIcons.showDecorationsIcon, label: 'Show decorations' },
      isActive: false,
      onClick: null,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'flex-start',
        padding: '2px',
        margin: '0px',
        position: 'fixed',
        top: '16px',
        left: '50px',
        zIndex: 100,
        background: 'transparent',
        width: 'auto',
      }}
    >
      {toolOptions.map((option, index) => (
        <IconButton key={index} info={option.info} isActive={option.isActive} onClick={option.onClick} />
      ))}
    </div>
  );
};

export default SceneEditTools;
