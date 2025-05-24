export enum BOX_TYPE {
  OPEN = 1, 
  DOOR, 
  DRAWER 
}

interface Box {
  dimension: { width: number; height: number; depth: number };
  position: { x: number, y: number, z: number }
  type: BOX_TYPE;
  children: Array<Box>;
}

interface StandStyle {
  boxes: Array<Box>; // we can change colums count. that is why every style should generate different boxes
  resize: (dimension: { width: number; height: number; depth: number }) => void;
}

export type { StandStyle, Box };
