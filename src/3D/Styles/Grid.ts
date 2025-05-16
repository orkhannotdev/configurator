import { CELL_SIZE, PLATE_THICKNESS } from '@/utils/utilities';
import { Box, BoxType, StandStyle } from './Style';
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

    this.dimension.width = dimension.width;
    this.dimension.height = dimension.height;
    this.dimension.depth = dimension.depth;
    this.box.dimension = { ...this.dimension };

    let { column, width } = this.getColumns(dimension);

  console.log('cp;i,md', column, width)
    if (width < minWidth && column !== 1) {
      column--;
      width = this.getWidthByColumns(dimension, column);
    } else if (width > maxWidth) {
      column++;
      width = this.getWidthByColumns(dimension, column);
    }

    let i = 0;
    while (i < column) {
      const newB: Box = this.createBox();
      newB.dimension.width = width;
      this.box.children.push(newB);
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

  private getColumns(dimension: { width: number; height: number; depth: number }) {
    const { maxWidth, minWidth } = CELL_SIZE;
    const middleWidth = minWidth + (maxWidth - minWidth) / 2;
    const edgeOffset = PLATE_THICKNESS * 2;
    const fullWidth = dimension.width - edgeOffset;
    let columnAmount = Math.floor(fullWidth / middleWidth);


    let leftAmount = fullWidth % middleWidth;
    let perColumn = (fullWidth - leftAmount )/ columnAmount;

    console.log('=======', leftAmount, perColumn)

    if (leftAmount) {
      perColumn += (leftAmount / columnAmount);
      perColumn = round(perColumn, 2);
    }


    if (!columnAmount) {
      perColumn = fullWidth;
      columnAmount = 1;
      leftAmount = 0;
    }

    return { column: columnAmount, width: perColumn, left: leftAmount };
  }

  private getWidthByColumns(dimension: { width: number; height: number; depth: number }, n: number) {
    const edgeOffset = PLATE_THICKNESS * 2;
    const fullWidth = dimension.width - edgeOffset;


    return round(fullWidth / n);
  }
}

export { Grid };
