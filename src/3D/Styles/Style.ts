export enum BoxType {
  COLUMN,
  ROW,
}

interface Box {
  dimension: { width: number; height: number; depth: number };
  position: { x: number, y: number, z: number }
  type: BoxType;
  children: Array<Box>;
}

interface StandStyle {
  boxes: Box[]; // we can change colums count. that is why every style should generate different boxes
  resize: (dimension: { width: number; height: number; depth: number }) => void;
}

export type { StandStyle, Box };
