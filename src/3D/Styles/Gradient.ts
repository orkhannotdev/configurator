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
  boxes: Array<Box> = [];
  dimension = { width: 0, height: 0, depth: 0 };
  modifiedBoxes: { [key in string]: { width: number; height: number; depth: number } } = {}; // indexes of prev modified boxes;
  predefinedWidthOnIndexes = [0.44, 0.38, 0.44, 0.37, 0.43, 0.43, 0.38, 0.44];

  resize(dimension: { width: number; height: number; depth: number }) {
    const { maxWidth } = CELL_SIZE;

    this.dimension.width = dimension.width;
    this.dimension.height = dimension.height;
    this.dimension.depth = dimension.depth;

    let parts = 0;

    {
      let i = 0;
      let max = 100
      let sum = PLATE_THICKNESS;

      while(i < max) {
        const lastTwo = dimension.width - sum
        if (lastTwo < .54){
          parts = i + 1;
          break;
        } 

        sum += this.getPredefined(i) + PLATE_THICKNESS;
        
        i++;
      }
    }


    this.boxes.push(this.createBox());
    const lastBox = this.boxes[this.boxes.length - 1];
    lastBox.dimension.width = dimension.width;

    let leftWidth = dimension.width - (parts) * PLATE_THICKNESS;
    let i = 0;

    while (i < parts) {
      const newB: Box = this.createBox();
      lastBox.children.push(newB);

      const definedVal = this.getPredefined(i);

      if (leftWidth - maxWidth < 0) {
        const finalTail = leftWidth;
        newB.dimension.width = round(finalTail);
        break;
      }

      let currentWidth = 0;

      const lastTwoColumns = leftWidth < 1.09 

      if (lastTwoColumns) {
        const leftSide: number = this.modifiedBoxes[i]?.width ?? definedVal;
        const ration = leftSide / definedVal;

        currentWidth = leftWidth * .5 * ration;
        
      } else {
        currentWidth = this.modifiedBoxes[i] ? this.modifiedBoxes[i].width : definedVal;
      }

      console.log('currentWidth', currentWidth)
      newB.dimension.width = round(currentWidth);
      leftWidth -= (currentWidth);

      i++;
    }
  }

  private getPredefined(i: number): number {
    return this.predefinedWidthOnIndexes[i] ?? 0.44;
  }

  private createBox(): Box {
    const box: Box = {
      type: BoxType.COLUMN,
      dimension: { width: 1, height: 1, depth: 1 },
      position: {x: 0, y: 0, z: 0},
      children: [],
    };

    return box;
  }
}

export { Gradient };
