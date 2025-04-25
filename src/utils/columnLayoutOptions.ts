import { IColumnLastRow } from '@/store/types';
import { PLATE_THICKNESS, getCellHeight } from './utilities';

type TColumnProps = {
  cabinetHeight: number;
  columnWidth: number;
  posX: number;
  startPosY: number;
  doorDir: number;
};

const getLayoutOptions53 = (columnProps: TColumnProps) => {
  const { cabinetHeight, columnWidth, posX, startPosY, doorDir } = columnProps;
  return [
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(1, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(1, cabinetHeight),
        },
      ],
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(1, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(1, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(1, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(1, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(1, cabinetHeight) / 2,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
  ];
};

const getLayoutOptions63 = (columnProps: TColumnProps) => {
  const { cabinetHeight, columnWidth, posX, startPosY, doorDir } = columnProps;
  return [
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(1, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(1, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(1, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(1, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(1, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(1, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(1, cabinetHeight) / 2,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
        },
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(2, cabinetHeight) + PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
  ];
};

const getLayoutOptions73 = (columnProps: TColumnProps) => {
  const { cabinetHeight, columnWidth, posX, startPosY, doorDir } = columnProps;
  return [
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(1, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(1, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(1, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(2, cabinetHeight) + PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
        },
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(2, cabinetHeight) + PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
  ];
};

const getLayoutOptions93 = (columnProps: TColumnProps) => {
  const { cabinetHeight, columnWidth, posX, startPosY, doorDir } = columnProps;
  return [
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(1, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(1, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(1, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(2, cabinetHeight) + PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
        },
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(2, cabinetHeight) + PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(3, cabinetHeight) / 2,
          },
        },
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
        },
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
  ];
};

const getLayoutOptions103 = (columnProps: TColumnProps) => {
  const { cabinetHeight, columnWidth, posX, startPosY, doorDir } = columnProps;
  return [
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(1, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(1, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(1, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(2, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(2, cabinetHeight),
        },
      ],
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(2, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(2, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(2, cabinetHeight) + PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(3, cabinetHeight) / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
        },
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(4, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(4, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(4, cabinetHeight),
        },
        {
          index: 3,
          height: getCellHeight(4, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(4, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(4, cabinetHeight) / 2,
          },
        },
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(4, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(4, cabinetHeight) + PLATE_THICKNESS,
          },
        },
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(4, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(4, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
        },
        {
          index: 3,
          size: {
            width: columnWidth,
            height: getCellHeight(4, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 3.5 * getCellHeight(4, cabinetHeight) + 3 * PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
  ];
};

const getLayoutOptions123 = (columnProps: TColumnProps) => {
  const { cabinetHeight, columnWidth, posX, startPosY, doorDir } = columnProps;

  return [
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
      ],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: 2 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(3, cabinetHeight) + PLATE_THICKNESS / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
          opening: doorDir,
        },
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
          opening: doorDir,
        },
      ],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
          opening: doorDir,
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: 2 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(3, cabinetHeight) + PLATE_THICKNESS / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
          opening: doorDir,
        },
      ],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
          opening: doorDir,
        },
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
          opening: doorDir,
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
  ];
};

const getLayoutOptions133 = (columnProps: TColumnProps) => {
  const { cabinetHeight, columnWidth, posX, startPosY, doorDir } = columnProps;
  return [
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
          opening: doorDir,
        },
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
          opening: doorDir,
        },
      ],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: 2 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(3, cabinetHeight) + PLATE_THICKNESS / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
  ];
};

const getLayoutOptionsMost = (columnProps: TColumnProps) => {
  const { cabinetHeight, columnWidth, posX, startPosY, doorDir } = columnProps;
  return [
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [],
      dividers: [],
      lastRow: '' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: 2 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
          pos: {
            x: posX,
            y: startPosY + getCellHeight(3, cabinetHeight) + PLATE_THICKNESS / 2,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
          opening: doorDir,
        },
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
          opening: doorDir,
        },
      ],
      drawers: [],
      dividers: [],
      lastRow: 'door' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [
        {
          index: 2,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 2.5 * getCellHeight(3, cabinetHeight) + 2 * PLATE_THICKNESS,
          },
          opening: doorDir,
        },
      ],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
    {
      rows: [
        {
          index: 0,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 1,
          height: getCellHeight(3, cabinetHeight),
        },
        {
          index: 2,
          height: getCellHeight(3, cabinetHeight),
        },
      ],
      numRows: 2,
      doors: [],
      drawers: [
        {
          index: 0,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 0.5 * getCellHeight(3, cabinetHeight),
          },
        },
        {
          index: 1,
          size: {
            width: columnWidth,
            height: getCellHeight(3, cabinetHeight),
          },
          pos: {
            x: posX,
            y: startPosY + 1.5 * getCellHeight(3, cabinetHeight) + PLATE_THICKNESS,
          },
        },
      ],
      dividers: [],
      lastRow: 'drawer' as IColumnLastRow,
    },
  ];
};

export const getLayoutOptionsOfColumn = ({
  totalHeight,
  legHeight,
  columnWidth,
  posX,
  startPosY,
  doorDir,
}: {
  totalHeight: number;
  legHeight: number;
  columnWidth: number;
  posX: number;
  startPosY: number;
  doorDir: number;
}) => {
  const layouts = [];
  const cabinetHeight = totalHeight - 2 * PLATE_THICKNESS - legHeight;

  const columnProps = { cabinetHeight, columnWidth, posX, startPosY, doorDir };

  const layoutOptions53 = getLayoutOptions53(columnProps);
  const layoutOptions63 = getLayoutOptions63(columnProps);
  const layoutOptions73 = getLayoutOptions73(columnProps);
  const layoutOptions93 = getLayoutOptions93(columnProps);
  const layoutOptions103 = getLayoutOptions103(columnProps);
  const layoutOptions123 = getLayoutOptions123(columnProps);
  const layoutOptions133 = getLayoutOptions133(columnProps);
  const layoutOptionsMost = getLayoutOptionsMost(columnProps);

  if (totalHeight < 0.53) {
    layouts.push(...layoutOptions53);
  } else if (totalHeight < 0.63) {
    layouts.push(...layoutOptions63);
  } else if (totalHeight < 0.73) {
    layouts.push(...layoutOptions73);
  } else if (totalHeight < 0.93) {
    layouts.push(...layoutOptions93);
  } else if (totalHeight < 1.03) {
    layouts.push(...layoutOptions103);
  } else if (totalHeight < 1.23) {
    layouts.push(...layoutOptions123);
  } else if (totalHeight < 1.33) {
    layouts.push(...layoutOptions133);
  } else {
    layouts.push(...layoutOptionsMost);
  }
  return layouts;
};
