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
  box: Box;
  modifiedBoxes: {[key in string]: {width: number, height: number, depth: number}}
  resize: (dimension: { width: number; height: number; depth: number }) => void;
}

export type { StandStyle, Box };
