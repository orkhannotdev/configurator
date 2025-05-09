import { CELL_SIZE, PLATE_THICKNESS } from '@/utils/utilities';
import { Box, BoxType, StandStyle } from './Style';

/**
 *   __________________
 *  |     |     |     |
 *  |     |     |     |
 *  |__A__|__B__|__C__|
 *
 *  Grid is when all columns adjust by resize
 */
class Grid implements StandStyle {
  dimension: { width: number; height: number; depth: number };
  modifiedBoxes: { [key in string]: { width: number; height: number; depth: number } } = {};
  box: Box;

  constructor() {
    this.dimension = { width: 0, height: 0, depth: 0 };

    this.box = {
      dimension: { width: 0, height: 0, depth: 0 },
      children: [],
      type: BoxType.COLUMN,
    };
  }

  resize(dimension: { width: number; height: number; depth: number }) {
    const { maxWidth, minWidth } = CELL_SIZE;
    const middleWidth = minWidth + (maxWidth - minWidth) / 2;

    const edgeOffset = PLATE_THICKNESS * 2;
    const perColumn = dimension.width / middleWidth;

    this.dimension.width = dimension.width;
    this.dimension.height = dimension.height;
    this.dimension.depth = dimension.depth;

    this.box.dimension = { ...this.dimension };

    const parts = dimension.width / middleWidth;
    console.log('123')

    let i = 0;
    while (i <= parts) {
      const newB: Box = this.createBox();
      this.box.children.push(newB);
      //newB.dimension.width =
      i++;
    }
  }

  private createBox(): Box {
    const box: Box = {
      type: BoxType.COLUMN,
      dimension: { width: 1, height: 1, depth: 1 },
      children: [],
    };

    return box;
  }
}

export { Grid };
