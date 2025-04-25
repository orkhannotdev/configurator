import { ICabinetSize, IColumn, IColumnLastRow, IPartition } from '@/store/types';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { getLayoutOptionsOfColumn } from './columnLayoutOptions';

//--- CONSTANTS
// Dimensions
export const PLATE_THICKNESS = 0.02;
export const CELL_SIZE = {
  maxWidth: 0.60,
  minWidth: 0.25,
  maxHeight: 0.35,
  minHeight: 0.15,
};
export const LEG_HEIGHT = 0.18;
export const LEG_WIDTH = 0.05;
export const LEG_DEPTH = 0.05;
export const EDGE_GAP = 0.006;

// Colors
export const wallColor = '#e7e7e7';
export const floorColor = '#b7b7b7';
export const ambientLightColor = '#f0f0f0';
export const directionalLightColor = '#f0f0f0';

// Texture paths
const texturesRootPath = '/assets/textures/';
export const environmentPath = texturesRootPath + 'environment.hdr';
const plywoodRootPath = texturesRootPath + 'plywood_1k/textures/';
const plywoodAoMapPath = plywoodRootPath + 'plywood_ao_1k.jpg';
const plywoodNormalMapPath = plywoodRootPath + 'plywood_nor_gl_1k.jpg';
const plywoodRoughnessMapPath = plywoodRootPath + 'plywood_rough_1k.jpg';

export const plywoodTextures = {
  aoMap: plywoodAoMapPath,
  normalMap: plywoodNormalMapPath,
  roughnessMap: plywoodRoughnessMapPath,
};

// Base Textures Veener
const woodRootPath = texturesRootPath + 'wood_27/';
const veneerAoMapPath = woodRootPath + 'ambient-occlusion.jpg';
const veneerNormalMapPath = woodRootPath + 'normal.jpg';
const veneerRoughnessMapPath = woodRootPath + 'roughness.jpg';

export const veneerTextures = {
  aoMap: veneerAoMapPath,
  normalMap: veneerNormalMapPath,
  roughnessMap: veneerRoughnessMapPath,
};

// Veneer Textures
export enum EVeneerTextures {
  BEIGE_GREY_LORENZO_OAK = texturesRootPath + 'veneer-oak-wood/beige_grey_lorenzo_oak.jpg',
  // BEIGE_TEXTILE = texturesRootPath + 'veneer-oak-wood/beige_textile.jpg',
  BROWN_ABANO_ASH = texturesRootPath + 'veneer-oak-wood/brown_abano_ash.jpg',
  BROWN_HALIFAX_OAK = texturesRootPath + 'veneer-oak-wood/brown_halifax_oak.jpg',
  BROWN_TONNSBERG_OAK = texturesRootPath + 'veneer-oak-wood/brown_tonnsberg_oak.jpg',
  BROWN_WARMIA_WALLNUT = texturesRootPath + 'veneer-oak-wood/brown_warmia_wallnut.jpg',
  LIGHT_BARONIA_OAK = texturesRootPath + 'veneer-oak-wood/light_baronia_oak.jpg',
  LIGHT_NATURAL_DAVENPORT_OAK = texturesRootPath + 'veneer-oak-wood/Light_Natural_Davenport_oak.jpg',
  NATURAL_CASELLA_OAK = texturesRootPath + 'veneer-oak-wood/natural_casella_oak.jpg',
  PARONA_WALLNUT = texturesRootPath + 'veneer-oak-wood/parona_wallnut.jpg',
  SEVILLA_ASH = texturesRootPath + 'veneer-oak-wood/sevilla_ash.jpg',
  VICENZA_OAK = texturesRootPath + 'veneer-oak-wood/vicenza_oak.jpg',
  VICENZA_OAK_2 = texturesRootPath + 'veneer-oak-wood/vicenza_oak2.jpg',
}

//Plywood Textures
export enum EPlywoodTextures {
  BRONZE_BRUSHED_METAL = texturesRootPath + 'plywood-colors/bronze_brushed_metal.jpg',
  ALMOND_BEIGE = texturesRootPath + 'plywood-colors/almond_beige.jpg',
  CARAT_BEIGE = texturesRootPath + 'plywood-colors/carat_beige.jpg',
  CASHMERE_GREY = texturesRootPath + 'plywood-colors/cashmere_grey.jpg',
  CORA_BRONZE = texturesRootPath + 'plywood-colors/cobra_bronze.jpg',
  CUBANITE_GREY = texturesRootPath + 'plywood-colors/cubanite_grey.jpg',
  FIR_GREEN = texturesRootPath + 'plywood-colors/fir_green.jpg',
  FJORD_GREEN = texturesRootPath + 'plywood-colors/fjord_green.jpg',
  GRAPHITE_GREY = texturesRootPath + 'plywood-colors/graphite_grey.jpg',
  INDIGO_BLUE = texturesRootPath + 'plywood-colors/indigo_blue.jpg',
  REED_GREEN = texturesRootPath + 'plywood-colors/reed_green.jpg',
  SAGE_GREEN = texturesRootPath + 'plywood-colors/sage_green.jpg',
  STONE_GREEN = texturesRootPath + 'plywood-colors/stone_green.jpg',
  TAUPE_GREY = texturesRootPath + 'plywood-colors/taupe_grey.jpg',
  TRUFFLE_BROWN = texturesRootPath + 'plywood-colors/truffle_brown.jpg',
  U999_PM_BLACK = texturesRootPath + 'plywood-colors/U999_PM_Black.jpg',
}

// Occlusion Textures
export const horizontalOcclusionTexturePath = texturesRootPath + 'horizontal-panel.jpg';
export const verticalOcclusionTexturePath = texturesRootPath + 'vertical-panel.jpg';
export const backOcclusionTexturePath = texturesRootPath + 'back-panel.jpg';

export enum EOcclusionImages {
  HORIZONTAL = horizontalOcclusionTexturePath,
  BACK = verticalOcclusionTexturePath,
  VERTICAL = backOcclusionTexturePath,
}

// Layout Icons
const layoutIconRootPath = '/assets/icons/on-model-editor/';

export const iconifyIcons = {
  layoutIcons: {
    undoIcon: 'solar:undo-left-round-outline',
    dimensionsIcon: 'solar:ruler-linear',
    doorsIcon: 'fluent:door-20-regular',
    alignColumnsIcon: 'flowbite:grid-plus-outline',
    showDecorationsIcon: 'hugeicons:paint-brush-02',
    assemblyIcon: 'carbon:3d-cursor',
  },
  menuIcons: {
    arrowUp: 'iwwa:arrow-up',
    arrowDown: 'iwwa:arrow-down',
    infoQuestion: 'ph:question-bold',
  },
  sceneIcons: {
    editLayout: 'ic-outline-create',
  },
};

export const menuIconPaths: {
  legs: { [key: string]: string };
  handles: { [key: string]: string };
  styles: { [key: string]: string };
} = {
  legs: {
    no_leg: '/assets/icons/menu-icons/legs/no_leg.svg',
    legs: '/assets/icons/menu-icons/legs/legs.svg',
    floating: '/assets/icons/menu-icons/legs/floating.svg',
  },
  handles: {
    handle_a: '/assets/icons/menu-icons/handles/handle_A.svg',
    handle_b: '/assets/icons/menu-icons/handles/handle_B.svg',
    push: '/assets/icons/menu-icons/handles/push.svg',
  },
  styles: {
    frame: '/assets/icons/menu-icons/styles/frame.svg',
    gradient: '/assets/icons/menu-icons/styles/gradient.svg',
    grid: '/assets/icons/menu-icons/styles/grid.svg',
    mosaic: '/assets/icons/menu-icons/styles/mosaic.svg',
    pixel: '/assets/icons/menu-icons/styles/pixel.svg',
    slant: '/assets/icons/menu-icons/styles/slant.svg',
  },
};

const generateLayoutIcons = (layoutHeight: number, iconCount: number) => {
  const layoutRootPath = `${layoutIconRootPath}${layoutHeight}/`;
  return Array.from({ length: iconCount }, (_, i) => `${layoutRootPath}${i + 1}.svg`);
};

// Generating icon paths for each layout
const layout53Icons = generateLayoutIcons(53, 3);
const layout63Icons = generateLayoutIcons(63, 6);
const layout73Icons = generateLayoutIcons(73, 7);
const layout93Icons = generateLayoutIcons(93, 8);
const layout103Icons = generateLayoutIcons(103, 8);
const layout123Icons = generateLayoutIcons(123, 8);
const layout133Icons = generateLayoutIcons(133, 6); // Adjusted for 6 icons only
const layout143Icons = generateLayoutIcons(143, 6);

// Model Paths
const modelsRootPath = '/assets/models/';

export const shadowManModelPath = modelsRootPath + 'shadow_man.glb';
export const handleAModelPath = modelsRootPath + 'handle_A.glb';
export const handleBModelPath = modelsRootPath + 'handle_B.glb';
export const legsModelPath = modelsRootPath + 'legs.glb';
export const noLegsModelPath = modelsRootPath + 'no_legs.glb';
export const tvModelPath = modelsRootPath + 'tv.glb';

// Enums
export enum ECabinetStyle {
  GRID = 'grid',
  GRADIENT = 'gradient',
  MOSAIC = 'mosaic',
  FRAME = 'frame',
  SLANT = 'slant',
  PIXEL = 'pixel',
}

export enum ECabinetLegs {
  LEGS = 'LEGS',
  NO_LEG = 'NO_LEG',
  FLOATING = 'FLOATING',
}

export enum ECabinetHandles {
  HANDLE_A = 'HANDLE_A',
  HANDLE_B = 'HANDLE_B',
  PUSH = 'PUSH',
}

export enum ECabinetFinishes {
  PLYWOOD = 'Plywood',
  VENEER = 'Veneer',
}

// Functions

// Get the array of remaining columns widths
export const getWidthArray = (style: ECabinetStyle, totalWidth: number) => {
  let widthArray: number[] = [];
  const unit = 100;
  switch (style) {
    case ECabinetStyle.GRID:
      if (totalWidth < CELL_SIZE.maxWidth * unit) {
        widthArray = [totalWidth - 2 * PLATE_THICKNESS * unit];
      } else if (totalWidth < 112) {
        widthArray = getRemainingColumns(totalWidth - 3 * PLATE_THICKNESS * unit);
      } else if (totalWidth < 154) {
        widthArray = [44];
      } else if (totalWidth < 197) {
        widthArray = [44, 38];
      } else if (totalWidth < 243) {
        widthArray = [44, 38, 44];
      } else if (totalWidth < 282) {
        widthArray = [44, 38, 44, 37];
      } else if (totalWidth < 327) {
        widthArray = [44, 38, 44, 37, 43];
      } else if (totalWidth < 372) {
        widthArray = [44, 38, 44, 37, 43, 43];
      } else if (totalWidth < 412) {
        widthArray = [44, 38, 44, 37, 43, 43, 38];
      } else {
        widthArray = [44, 38, 44, 37, 43, 43, 38, 44];
      }
      break;
    default:
      break;
  }
  return widthArray;
};

// Get the vertical layout of a column for a given cabinet height
export const getColumnVerticalLayout = ({ cabinetHeight }: { cabinetHeight: number }) => {
  const currentlayout = [];
  const numberOfRows = getRowCount({ cabinetHeight });
  for (let i = 0; i < numberOfRows; i++) {
    currentlayout.push({
      index: i,
      height: getCellHeight(numberOfRows, cabinetHeight),
    });
  }
  return currentlayout;
};

// Get the distance between two Vector3s
export function getDistance(p1: Vector3, p2: Vector3) {
  // return the square root of the sum of the squares of the differences of the x and z coordinates
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.z - p1.z) ** 2);
}

// Get the count of rows for a given cabinet height
export function getRowCount({ cabinetHeight }: { cabinetHeight: number }) {
  // Get the maximum height of a cell
  const maxHeight = CELL_SIZE.maxHeight;

  // Return the number of rows
  return Math.floor((cabinetHeight - PLATE_THICKNESS) / (maxHeight + PLATE_THICKNESS)) + 1;
}

// Get the number of columns and the width of a cell for a given total width
export function getColumnCount({ totalWidth }: { totalWidth: number }) {
  // Get the maximum width of a cell
  const maxWidth = CELL_SIZE.maxWidth;

  // Get the number of columns according to the total width
  const numberOfColumns = Math.floor((totalWidth - PLATE_THICKNESS) / (maxWidth + PLATE_THICKNESS)) + 1;

  // Get the total width of cells without
  const sum = totalWidth - (numberOfColumns + 1) * PLATE_THICKNESS;

  // Round to 2 decimal places
  const widthOfCell = Math.round((sum / numberOfColumns) * 100) / 100;

  return {
    numberOfColumns,
    widthOfCell,
  };
}

// Get the height of a cell for a given number of rows and a cabinet height
export function getCellHeight(rowCount: number, cabinetHeight: number) {
  // Get the height of a cell
  const cellHeight = (cabinetHeight - (rowCount - 1) * PLATE_THICKNESS) / rowCount;
  return cellHeight;
}

// Get the width of a cell for a given number of columns and a total width
export function getCellWidth(columnCount: number, totalWidth: number) {
  // Get the width of a cell
  const cellWidth = (totalWidth - (columnCount + 1) * PLATE_THICKNESS) / columnCount;
  return cellWidth;
}

export function getBottomHeight(legs: ECabinetLegs) {
  return legs === ECabinetLegs.NO_LEG ? 0.02 : LEG_HEIGHT;
}

export function getPartitonPlates({ columns, totalHeight, totalWidth, totalDepth, legHeight }: { columns: IColumn[]; totalHeight: number; totalWidth: number; totalDepth: number; legHeight: number }) {
  const verticals: IPartition[] = [];
  const horizontals: IPartition[] = [];
  const availableSpaces: IPartition[] = [];
  const backsides: IPartition[] = [];

  const spaceHeight = totalHeight - 2 * PLATE_THICKNESS - legHeight;

  const posY = (totalHeight + legHeight) / 2;

  const startPosX = -(totalWidth - PLATE_THICKNESS) / 2;
  const bottomPosY = legHeight + PLATE_THICKNESS / 2;

  verticals.push({
    row: 0,
    col: -1,
    position: {
      x: startPosX,
      y: posY,
      z: 0,
    },
    scale: {
      width: spaceHeight,
      depth: totalDepth,
    },
  });
  for (let col = 0; col < columns.length; col++) {
    const column = columns[col];
    const rows = column.rows;
    let sum = 0;
    for (let i = 0; i < col + 1; i++) {
      sum += columns[i].width;
    }
    const posX = startPosX + sum + (col + 1) * PLATE_THICKNESS;
    const spacePosX = posX - PLATE_THICKNESS / 2 - column.width / 2;

    verticals.push({
      row: 0,
      col,
      position: {
        x: posX,
        y: posY,
        z: 0,
      },
      scale: {
        width: spaceHeight,
        depth: totalDepth,
      },
    });

    availableSpaces.push({
      row: 0,
      col,
      position: {
        x: spacePosX,
        y: posY,
        z: totalDepth / 2,
      },
      scale: {
        width: column.width,
        depth: spaceHeight,
      },
    });

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      let verticalSum = 0;
      for (let p = 0; p < rowIndex + 1; p++) {
        verticalSum += rows[rowIndex].height;
      }

      const middlePosY = bottomPosY + verticalSum + (rowIndex + 1) * PLATE_THICKNESS;

      const backPosY = middlePosY - PLATE_THICKNESS / 2 - rows[rowIndex].height / 2;
      const backPosZ = -(totalDepth - PLATE_THICKNESS) / 2;
      if (rowIndex < rows.length - 1) {
        horizontals.push({
          row: rowIndex,
          col,
          position: {
            x: spacePosX,
            y: middlePosY,
            z: 0,
          },
          scale: {
            width: column.width,
            depth: totalDepth - EDGE_GAP,
          },
        });
      }

      backsides.push({
        row: rowIndex,
        col,
        position: {
          x: spacePosX,
          y: backPosY,
          z: backPosZ,
        },
        scale: {
          width: column.width,
          depth: rows[rowIndex].height,
        },
      });
    }
  }

  return {
    verticals,
    availableSpaces,
    horizontals,
    backsides,
  };
}

export const getCalculatedColumns = ({ 
  current, 
  cabinetStyle, 
  cabinetSize, 
  legHeight, 
  columnCount 
}: TGetCalculatedColumnsProps): IColumn[] => {
  const { totalWidth, totalHeight, totalDepth } = cabinetSize;
  
  // Calculate available width (total width minus side plates)
  const availableWidth = totalWidth - 2 * PLATE_THICKNESS;
  
  // Determine how many columns can fit
  let numColumns;
  if (columnCount) {
    numColumns = columnCount;
  } else {
    // Calculate based on minimum column width
    numColumns = Math.floor(availableWidth / (CELL_SIZE.minWidth + PLATE_THICKNESS));
    // Ensure at least one column
    numColumns = Math.max(1, numColumns);
  }
  
  // Calculate column width
  const columnWidth = (availableWidth - (numColumns - 1) * PLATE_THICKNESS) / numColumns;
  
  // Create columns array
  const columns: IColumn[] = [];
  
  // Generate each column
  for (let i = 0; i < numColumns; i++) {
    // Calculate position
    const posX = -totalWidth / 2 + PLATE_THICKNESS + i * (columnWidth + PLATE_THICKNESS) + columnWidth / 2;
    
    // Create column with appropriate layout
    const column = createColumnWithLayout(columnWidth, posX, totalHeight, legHeight, cabinetStyle);
    
    columns.push(column);
  }
  
  return columns;
}

export function getRemainingColumns(remainingWidth: number) {
  const b = remainingWidth % 2 === 0 ? remainingWidth / 2 : (remainingWidth + 1) / 2;
  const c = remainingWidth - b;

  return [b, c];
}

export function getIndividualColumn({
  targetIndex,
  columns,
  totalWidth,
  totalDepth,
  legHeight,
}: {
  targetIndex: number;
  columns: IColumn[];
  totalWidth: number;
  totalDepth: number;
  legHeight: number;
}) {
  const column = columns[targetIndex];

  const startPosX = -(totalWidth - PLATE_THICKNESS) / 2;
  const bottomPosY = legHeight + PLATE_THICKNESS / 2;
  const rowsPos = [];
  const delta = 0.02;
  const rows = column.rows;

  let sum = 0;
  for (let i = 0; i < targetIndex + 1; i++) {
    sum += columns[i].width;
  }
  const posX = startPosX + sum + (targetIndex + 1) * PLATE_THICKNESS;
  const spacePosX = posX - PLATE_THICKNESS / 2 - column.width / 2;

  for (let i = 0; i < rows.length; i++) {
    let verticalSum = 0;
    for (let p = 0; p < i + 1; p++) {
      verticalSum += rows[p].height;
    }
    const middlePosY = bottomPosY + verticalSum + (i + 1) * PLATE_THICKNESS;
    const backPosY = middlePosY - PLATE_THICKNESS / 2 - rows[i].height / 2;
    rowsPos.push({
      x: spacePosX - column.width / 2,
      y: backPosY,
      z: totalDepth / 2 + delta,
      height: rows[i].height,
    });
  }

  return {
    position: new THREE.Vector3(spacePosX, legHeight + PLATE_THICKNESS + delta, totalDepth / 2 + delta),
    rows: rowsPos,
  };
}

export const getLayoutImages = ({ totalHeight }: { totalHeight: number }) => {
  let imgsArray = [];
  if (totalHeight < 0.53) {
    imgsArray = [...layout53Icons];
  } else if (totalHeight < 0.63) {
    imgsArray = [...layout63Icons];
  } else if (totalHeight < 0.73) {
    imgsArray = [...layout73Icons];
  } else if (totalHeight < 0.93) {
    imgsArray = [...layout93Icons];
  } else if (totalHeight < 1.03) {
    imgsArray = [...layout103Icons];
  } else if (totalHeight < 1.23) {
    imgsArray = [...layout123Icons];
  } else if (totalHeight < 1.33) {
    imgsArray = [...layout133Icons];
  } else {
    imgsArray = [...layout143Icons];
  }

  return imgsArray;
};

export const getId = (item: string) => `${item}-${Math.random().toString(32).slice(-4)}`;

export const createColumnWithLayout = (columnWidth: number, posX: number, totalHeight: number, legHeight: number, cabinetStyle: ECabinetStyle): IColumn => {
  // Calculate the cabinet height (excluding legs and plate thickness)
  const cabinetHeight = totalHeight - legHeight - 2 * PLATE_THICKNESS;
  
  // Get the basic vertical layout for the column
  const rows = getColumnVerticalLayout({ cabinetHeight });
  
  // Get the starting position Y coordinate
  const startPosY = legHeight + PLATE_THICKNESS;
  
  // Default to an empty layout (will be populated based on style)
  let layoutIndex = 0;
  let doors: any[] = [];
  let drawers: any[] = [];
  
  // Based on cabinet style, choose an appropriate layout
  switch (cabinetStyle) {
    case ECabinetStyle.Modern:
      // For modern style, use all drawers
      layoutIndex = 1;
      // Create a drawer for each row
      drawers = rows.map((row, index) => ({
        index,
        size: {
          width: columnWidth,
          height: row.height,
        },
        pos: {
          x: posX,
          y: startPosY + (index + 0.5) * row.height + index * PLATE_THICKNESS,
        },
      }));
      break;
      
    case ECabinetStyle.Classic:
    default:
      // For classic style, use doors for all rows
      layoutIndex = 0;
      // Create a door for the full height
      doors = [{
        index: 0,
        size: {
          width: columnWidth,
          height: cabinetHeight,
        },
        pos: {
          x: posX,
          y: startPosY + cabinetHeight / 2,
        },
        opening: 1, // Default opening direction
      }];
      break;
  }
  
  // Create and return the column object
  return {
    index: 0, // Will be updated when all columns are created
    width: columnWidth,
    posX: posX,
    rows: rows,
    doors: doors,
    drawers: drawers,
    dividers: [],
    layoutIndex: layoutIndex,
    isDivide: false,
    lastRow: drawers.length > 0 ? 'drawer' : 'door',
  };
};

// Update the cabinet size constraints
export const CABINET_SIZE_CONSTRAINTS = {
  minWidth: 0.4, // 40cm in meters
  maxWidth: 2.5, // 250cm in meters (changed from 4.5m/450cm)
  minHeight: 0.4, // 40cm in meters
  maxHeight: 2.4, // 240cm in meters
  minDepth: 0.3, // 30cm in meters
  maxDepth: 0.8, // 80cm in meters
};

export const applyRandomLayoutsToColumns = (columns: IColumn[], totalHeight: number, legHeight: number): IColumn[] => {
  const startPosY = legHeight + PLATE_THICKNESS;
  
  return columns.map(column => {
    // Get all available layout options for this column
    const layoutOptions = getLayoutOptionsOfColumn({ 
      totalHeight, 
      legHeight, 
      columnWidth: column.width, 
      posX: column.posX, 
      startPosY,
      doorDir: 1 // Default door opening direction
    });
    
    // Select a random layout option
    const randomLayoutIndex = Math.floor(Math.random() * layoutOptions.length);
    const randomLayout = layoutOptions[randomLayoutIndex];
    
    // Apply the random layout to the column
    return {
      ...column,
      layoutIndex: randomLayoutIndex,
      rows: randomLayout.rows,
      doors: randomLayout.doors,
      drawers: randomLayout.drawers,
      lastRow: randomLayout.lastRow
    };
  });
};
