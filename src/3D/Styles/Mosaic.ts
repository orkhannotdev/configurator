import { Box, BoxType, StandStyle } from './Style';

class Mosaic implements StandStyle {
  dimension: { width: number; height: number; depth: number };
  box: Box;

  constructor() {
    this.dimension = { width: 0, height: 0, depth: 0 };

    this.box = {
      modified: false,
      dimension: { width: 0, height: 0, depth: 0 },
      children: [],
      type: BoxType.COLUMN,
    };
  }

  resize() {
    console.log('not implemented')
  }
}

export { Mosaic };
