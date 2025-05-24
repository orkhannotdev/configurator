import { CELL_SIZE, PLATE_THICKNESS } from '@/utils/utilities';
import { Box, BOX_TYPE, StandStyle } from './Style';
import { round } from '../Helpers/round';

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
  boxes: Array<Box> = [];

  constructor() {
    this.dimension = { width: 0, height: 0, depth: 0 };
  }

  resize(dimension: { width: number; height: number; depth: number }) {
    this.dimension.width = dimension.width;
    this.dimension.height = dimension.height;
    this.dimension.depth = dimension.depth;

    this.resizeWidht();
    this.resizeHeight();
  }

  private resizeWidht() {
    const { maxWidth} = CELL_SIZE;
    const {dimension} = this;
    let { columnAmount, perColumn } = this.getColumns(dimension);


    let needOptions = true,
      max = 100,
      i = 0;
    while (needOptions && i < max) {
      this.boxes.push(this.createBox());

      const lastBox = this.boxes[this.boxes.length - 1];
      lastBox.dimension.width = dimension.width

      let j = 0;
      while (j < columnAmount) {
        const newB: Box = this.createBox();
        newB.dimension.width = perColumn;
        lastBox.children.push(newB);
        j++;
      }

      const newPerColumnAmount = this.getWidthByColumns(dimension, columnAmount - 1);

      if(newPerColumnAmount > maxWidth) {
        needOptions = false;
      } else {
        columnAmount--;
        perColumn = newPerColumnAmount
      }

      i++;
    }
  }
  private resizeHeight() {}

  private createBox(): Box {
    const box: Box = {
      type: BOX_TYPE.DOOR,
      dimension: { width: 1, height: 1, depth: 1 },
      position: { x: 0, y: 0, z: 0},
      children: [],
    };

    return box;
  }

  private getColumns(dimension: { width: number; height: number; depth: number }) {
    const { minWidth } = CELL_SIZE;
    const edgeOffset = PLATE_THICKNESS * 2;
    const fullWidth = dimension.width - edgeOffset;
    let columnAmount = Math.floor(fullWidth / (minWidth + PLATE_THICKNESS));
    columnAmount = Math.max(1, columnAmount)

    let perColumn = this.getWidthByColumns(dimension, columnAmount) 

    return { columnAmount, perColumn };
  }

  private getWidthByColumns(dimension: { width: number; height: number; depth: number }, n: number) {
    const edgeOffset = PLATE_THICKNESS * 2;
    const fullWidth = dimension.width - edgeOffset;

    return round((fullWidth - (n - 1) * PLATE_THICKNESS) / n, 2); 
  }
}

export { Grid };
