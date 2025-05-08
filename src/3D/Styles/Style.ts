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
  resize: (dimension: { width: number; height: number; depth: number }) => void;
}

export type { StandStyle, Box };
