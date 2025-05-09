import { CELL_SIZE, PLATE_THICKNESS } from '@/utils/utilities';
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
  modifiedBoxes: { [key in string]: { width: number; height: number; depth: number } } = {}; // indexes of prev modified boxes;
  predefinedWidthOnIndexes = [0.43, 0.38, 0.42, 0.27, 0.55, 0.43, 0.38, 0.44, 0.48, 0.48];

  constructor() {
    this.box = {
      type: BoxType.COLUMN,
      dimension: { width: 0, height: 0, depth: 0 },
      children: [],
    };
  }

  resize(dimension: { width: number; height: number; depth: number }) {
    const { maxWidth } = CELL_SIZE;

    const edgeOffset = PLATE_THICKNESS * 2;

    this.dimension.width = dimension.width;
    this.dimension.height = dimension.height;
    this.dimension.depth = dimension.depth;
    this.box.dimension = { ...this.dimension };

    const parts = Math.floor(dimension.width / maxWidth);

    let leftWidth = dimension.width - edgeOffset;
    const defaultWidth = 0.44;
    const max = parts + 1;
    let i = 0;

    while (i < max) {
      const newB: Box = this.createBox();
      this.box.children.push(newB);

      let currentWidth = 0;

      const leftSpaceOnlyForLastTwo = max > 1 && i + 2 === max;

      if (leftWidth - maxWidth < 0) {
        const finalTail = leftWidth;
        newB.dimension.width = round(finalTail);
        break;
      }

      if (leftSpaceOnlyForLastTwo) {
        currentWidth = leftWidth * 0.51;
      } else {
        currentWidth = this.modifiedBoxes[i] ? this.modifiedBoxes[i].width : (this.predefinedWidthOnIndexes[i] ?? defaultWidth);
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
