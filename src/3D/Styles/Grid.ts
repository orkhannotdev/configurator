import { CELL_SIZE } from '@/utils/utilities';
import { Box, BoxType, StandStyle } from './Style';

/**
 *   __________________
 *  |     |     |     |
 *  |     |     |     |
 *  |__A__|__B__|__C__|
 *
 *  Grid is when all columns adjust by resize
 */
class GridStyle implements StandStyle {
  dimension: { width: number; height: number; depth: number };
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
    const retBox = structuredClone(this.box);

    const extraWidthPerBox = (this.dimension.width - dimension.width) / this.box.children.length;

    let isThereAnyColumnBiggerThanMax = false;
    this.box.children.forEach((childColumn) => {
      if (isThereAnyColumnBiggerThanMax) return;

      if (childColumn.dimension.width + extraWidthPerBox > CELL_SIZE.maxWidth) {
        isThereAnyColumnBiggerThanMax = true;
      }
    });

    if (isThereAnyColumnBiggerThanMax) {
      

    } else {
      retBox.children.forEach((childColumn) => {
        childColumn.dimension.width += extraWidthPerBox;
      });
    }

    return retBox;
  }
}

export { GridStyle };
