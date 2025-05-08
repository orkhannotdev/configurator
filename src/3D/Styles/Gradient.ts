import { CELL_SIZE } from '@/utils/utilities';
import { Box, BoxType, StandStyle } from './Style';
import { round } from '../Helpers/round';

/**
 *   _____________________
 *  |     |     |     |   |
 *  |     |     |     |   |
 *  |__A__|__B__|__C__|_D_|
 *
 *  Gradiend is when last two column adjust by resizing. all prev columns stay constant
 *  When resizing only C and D changes
 *  C and D change by 51/49 % ratio -> that means when we have 100 C get 51 and D 49
 */
class Gradient implements StandStyle {
  box: Box;
  dimension = { width: 0, height: 0, depth: 0 };

  constructor() {
    this.box = {
      type: BoxType.COLUMN,
      dimension: { width: 0, height: 0, depth: 0 },
      children: [],
    };
  }

  resize(dimension: { width: number; height: number; depth: number }) {
    const { maxWidth } = CELL_SIZE;

    const edgeOffset = 0.06;

    this.dimension.width = dimension.width;
    this.dimension.height = dimension.height;
    this.dimension.depth = dimension.depth;
    this.box.dimension = { ...this.dimension };

    const parts = Math.floor(dimension.width / maxWidth);

    let leftWidth = dimension.width - edgeOffset;
    const max = parts + 1;
    let i = 1;

    while (i <= max) {
      const newB: Box = this.createBox();
      this.box.children.push(newB);

      let currentWidth = 0;

      const leftSpaceOnlyForLastTwo = max > 1 && i + 1 === max;

      if (leftSpaceOnlyForLastTwo) {
        currentWidth = leftWidth * 0.51;
      } else {
        currentWidth = leftWidth - i * maxWidth;
      }

      if (currentWidth < 0) {
        const finalTail = currentWidth + i * maxWidth;
        newB.dimension.width = round(finalTail);
        break;
      }

      newB.dimension.width = round(currentWidth);
      leftWidth -= currentWidth;

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

export { Gradient };
