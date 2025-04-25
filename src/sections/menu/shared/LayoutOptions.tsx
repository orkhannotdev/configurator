import Switch from '@/components/switch';
import { useCabinetStore } from '@/store';
import { getLayoutOptionsOfColumn } from '@/utils/columnLayoutOptions';
import { PLATE_THICKNESS, getBottomHeight, getIndividualColumn, getLayoutImages } from '@/utils/utilities';
import { useState } from 'react';

export function LayoutOptions() {
  const { cabinetLegs, cabinetSize, cabinetColumns, selectedColumnIndex, setSelectedColumnIndex, setCabinetColumns, setVisibleTools } = useCabinetStore();

  const { totalWidth, totalDepth, totalHeight } = cabinetSize;

  const legHeight = getBottomHeight(cabinetLegs);

  const startPosY = legHeight + PLATE_THICKNESS;

  const imagesArray = getLayoutImages({ totalHeight });

  const [doorOpening, setDoorOpening] = useState<number>(cabinetColumns[selectedColumnIndex]?.doors[0]?.opening ?? 1);

  const [isAddDivider, setAddDivider] = useState<boolean>(cabinetColumns[selectedColumnIndex]?.isDivide ?? false);

  const currentColumn = cabinetColumns[selectedColumnIndex];

  const currentColumnLayoutIndex = currentColumn?.layoutIndex ?? 0;

  const currentColumnDoorLength = currentColumn?.doors?.length ?? 0;

  const currentColumnDrawerLength = currentColumn?.drawers?.length ?? 0;

  const cabinetRowLength = currentColumn?.rows?.length ?? 0;

  const isAllDrawers = currentColumnDrawerLength === cabinetRowLength;

  const updateColumn = (columnIndex: number, layoutIndex: number, doorOpening: number) => {
    setSelectedColumnIndex(columnIndex);
    const currentColumns = [...cabinetColumns];
    const columnProps = getIndividualColumn({ targetIndex: columnIndex, columns: cabinetColumns, totalWidth, totalDepth, legHeight });
    const { position } = columnProps;
    const columnWidth = currentColumns[columnIndex].width;
    console.log(currentColumns[columnIndex].dividers);
    const newColumnLayout = getLayoutOptionsOfColumn({ totalHeight, legHeight, columnWidth, posX: position.x, startPosY, doorDir: doorOpening })[layoutIndex];
    currentColumns[columnIndex].layoutIndex = layoutIndex;
    currentColumns[columnIndex].rows = newColumnLayout.rows;
    currentColumns[columnIndex].doors = newColumnLayout.doors;
    currentColumns[columnIndex].drawers = newColumnLayout.drawers;
    currentColumns[columnIndex].lastRow = newColumnLayout.lastRow;
    setCabinetColumns(currentColumns);
  };

  const onUpdateDoorOpening = (index: number) => {
    let opening = index === 0 ? -1 : 1;
    setDoorOpening(opening);
    updateColumn(selectedColumnIndex, currentColumnLayoutIndex, opening);
  };

  const onHandleDivider = (index: number) => {
    const isAdd = index === 1;

    setAddDivider(isAdd);
    const current = [...cabinetColumns];
    const columnProps = getIndividualColumn({ targetIndex: selectedColumnIndex, columns: cabinetColumns, totalWidth, totalDepth, legHeight });
    const { position } = columnProps;

    const drawerCount = current[selectedColumnIndex].drawers.length;
    const doorCount = current[selectedColumnIndex].doors.length;

    const hasDrawer = drawerCount > 0;
    const hasDoor = doorCount > 0;
    const rowsCount = current[selectedColumnIndex].rows.length;

    const hasAllDoor = doorCount === rowsCount;
    const hasOneDoor = hasDoor && !hasDrawer && rowsCount > 1 && !hasAllDoor;
    const hasOnlyDrawer = hasDrawer && !hasDoor && drawerCount !== rowsCount;
    const hasAllDrawers = rowsCount === drawerCount;

    const shouldBeAbove = hasOnlyDrawer || hasOneDoor;

    if (isAdd && !hasAllDrawers) {
      const dividerMultiplier = shouldBeAbove ? 1.5 : 0.5;

      const additionalThickness = dividerMultiplier > 1 ? PLATE_THICKNESS : 0;

      const newDivider = {
        size: {
          width: current[selectedColumnIndex].rows[0].height,
          depth: totalDepth - 2 * PLATE_THICKNESS,
        },
        pos: {
          x: position.x,
          y: startPosY + current[selectedColumnIndex].rows[0].height * dividerMultiplier + additionalThickness,
        },
      };

      current[selectedColumnIndex].dividers.push(newDivider);

      current[selectedColumnIndex].isDivide = isAdd;
    } else {
      current[selectedColumnIndex].dividers = [];
    }
    setCabinetColumns(current);
  };

  const switchValueForOpening = doorOpening === 1 ? 1 : 0;
  const switchValueForDivider = isAddDivider ? 1 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        bottom: '5px',
        left: 'calc((100vw - 457px)/2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #000000',
          background: '#FFFFFF',
          borderRadius: '2px',
          color: '#000000',
          alignContent: 'center',
          transform: 'translate(-50%)',
          padding: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '8px',
            background: '#FFFFFF',
            color: '#000000',
            alignContent: 'center',
            gap: '8px',
          }}
        >
          {imagesArray.map((img, index) => (
            <button
              key={index}
              style={{
                background: '#FFFFFF',
                color: '#000000',
                width: '60px',
                alignItems: 'center',
                alignContent: 'center',
                border: currentColumnLayoutIndex === index ? '2px solid #FF0000' : '1px solid #808080',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setVisibleTools(true);
                updateColumn(selectedColumnIndex, index, doorOpening);
              }}
            >
              <img src={img} alt="" style={{ width: '100%' }} />
            </button>
          ))}
        </div>
        {currentColumnDoorLength !== 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
            }}
          >
            Door Opening:
            <Switch value={switchValueForOpening} onChange={onUpdateDoorOpening} options={['Left', 'Right']} />
          </div>
        )}
        {!isAllDrawers && cabinetColumns[selectedColumnIndex].width > 0.39 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
            }}
          >
            Vertical Divider:
            <Switch value={switchValueForDivider} onChange={onHandleDivider} options={['Off', 'On']} />
          </div>
        )}
      </div>
    </div>
  );
}
