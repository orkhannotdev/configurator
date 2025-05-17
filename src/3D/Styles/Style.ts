export enum BoxType {
  COLUMN,
  ROW,
}

interface Box {
  dimension: { width: number; height: number; depth: number };
  type: BoxType;
  children: Array<Box>;
}

interface StandStyle {
  boxes: Box[]; // we can change colums count. that is why every style should generate different boxes
  modifiedBoxes: {[key in string]: {width: number, height: number, depth: number}}
  resize: (dimension: { width: number; height: number; depth: number }) => void;
}

export type { StandStyle, Box };
