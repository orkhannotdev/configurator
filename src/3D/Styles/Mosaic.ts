import { LEG_HEIGHT, PLATE_THICKNESS } from '@/utils/utilities';
import { Box, BOX_TYPE, StandStyle } from './Style';
import { round } from '../Helpers/round';

/**
 *   _______________________
 *  |     |  |     |     |  |
 *  |     |  |     |     |  |
 *  |__A__|B_|__C__|__D__|E_|
 *
 *  Mosaic is working like steps. A C D will resize by total with, but B E will be static 17 sm
 */
class Mosaic implements StandStyle {
  private sample: Array<Array<{ type: BOX_TYPE; ration: number }>> = [
    [
      { type: BOX_TYPE.OPEN, ration: 2 },
      { type: BOX_TYPE.OPEN, ration: 1 },
    ],
    [
      { type: BOX_TYPE.DRAWER, ration: 1 },
      { type: BOX_TYPE.DRAWER, ration: 1 },
      { type: BOX_TYPE.DRAWER, ration: 1 },
    ],
    [
      { type: BOX_TYPE.OPEN, ration: 2 },
      { type: BOX_TYPE.OPEN, ration: 1 },
      { type: BOX_TYPE.OPEN, ration: 1 },
      { type: BOX_TYPE.OPEN, ration: 1 },
      { type: BOX_TYPE.OPEN, ration: 2 },
    ],
    [
      { type: BOX_TYPE.DRAWER, ration: 1 },
      { type: BOX_TYPE.DRAWER, ration: 1 },
      { type: BOX_TYPE.OPEN, ration: 2 },
      { type: BOX_TYPE.OPEN, ration: 2 },
    ],
    [
      { type: BOX_TYPE.OPEN, ration: 1 },
      { type: BOX_TYPE.OPEN, ration: 2 },
    ],
    [
      { type: BOX_TYPE.OPEN, ration: 1 },
      { type: BOX_TYPE.OPEN, ration: 1 },
      { type: BOX_TYPE.OPEN, ration: 1 },
    ],
  ];
  // first is columnd index, second is row
  //private modifiedCell: Array<Array<Box>> = [];
  private order: Array<'static' | 'dynamic'> = [];
  dimension: { width: number; height: number; depth: number } = { width: 0, height: 0, depth: 0 };
  boxes: Array<Box> = [];

  resize(dimension: { width: number; height: number; depth: number }) {
    this.dimension.width = dimension.width;
    this.dimension.height = dimension.height;
    this.dimension.depth = dimension.depth;

    this.resizeWidth();
    this.resizeHeight();
    this.reposition();
  }

  private resizeWidth() {
    let parts = 0;

    {
      let i = 0;
      let max = 100;
      let sum = PLATE_THICKNESS;
      const maxW = 0.545;

      while (i < max) {
        const lastTwo = this.dimension.width - sum;

        if (lastTwo <= Number.EPSILON) {
          parts = i;
          break;
        }

        const toSum = this.isIndexStatic(i) ? 0.17 : maxW;

        if (lastTwo > 0 && lastTwo < toSum - PLATE_THICKNESS) {
          parts = i + 1;
          break;
        }

        sum += toSum + PLATE_THICKNESS;

        i++;
      }
    }

    parts = parts ? parts : 1;

    this.order = this.generateOrder(parts);
    this.boxes.push(this.createBox());
    const lastBox = this.boxes[this.boxes.length - 1];
    lastBox.dimension.width = this.dimension.width;

    const staticParts = this.getStaticAmount(parts);
    const staticAmount = staticParts * 0.17;
    const dynamicParts = parts - staticParts;

    let leftWidth = this.dimension.width - (parts + 1) * PLATE_THICKNESS - staticAmount;
    let i = 0;
    const ration = leftWidth / dynamicParts;

    while (i < parts) {
      const newB: Box = this.createBox();
      lastBox.children.push(newB);

      const isStatic = this.order[i] === 'static';
      let currentWidth = isStatic ? 0.17 : ration;

      newB.dimension.width = round(currentWidth - 0.001);
      leftWidth -= currentWidth;

      i++;
    }
  }

  private resizeHeight() {
    const maxHeight = 0.78;
    const minHeight = 0.18;
    const { dimension } = this;
    const bodyHeight = dimension.height - LEG_HEIGHT;

    this.boxes[0].children.forEach((column, columndIndex) => {
      const sampleRows = this.sample[columndIndex];

      let availableRows: Array<{ type: BOX_TYPE; ration: number }> = [sampleRows[0]];
      const rationSum = sampleRows.reduce((sum, b) => sum + b.ration, 0);

      sampleRows.forEach((sRow, index) => {
        if (index === 0) return;

        const rowHeight = (sRow.ration * bodyHeight) / rationSum;

        if (rowHeight < minHeight || rowHeight > maxHeight) {
          return;
        }

        availableRows.push(sRow);
      });

      let i = 0;
      const newRationSum = availableRows.reduce((sum, b) => sum + b.ration, 0);
      while (i < availableRows.length) {
        const box = this.createBox();
        box.dimension.width = column.dimension.width;

        const aRow = availableRows[i];

        const rowHeight = (aRow.ration * bodyHeight) / newRationSum;

        box.dimension.height = round(rowHeight);
        box.type = aRow.type;

        column.children.push(box);

        i++;
      }
    });
  }

  private reposition() {
    const {width, height} = this.dimension;
    let leftOffset = -width/2 + PLATE_THICKNESS;

    this.boxes[0].children.forEach((column) => {
      column.position.x = leftOffset + column.dimension.width/2
      column.position.y = height/2 + 0.02; 

      leftOffset += column.dimension.width + PLATE_THICKNESS
      
      let bottomOffset = 0;

      column.children.forEach(row => {
        row.position.x = 0;
        row.position.y = bottomOffset + row.dimension.height/2;
        bottomOffset += row.dimension.height;
      })
    });
  }

  /**
     c -> columns, s -> static columns (which is 17 sm);
     10 columns -> 3 static
     9 c -> 3 s
     8 c -> 2 s
     7 c -> 2 s
     6 c -> 2 s
     5 c -> 2 s
     4 c -> 1 s
     3 c -> 1 s
     2 c -> 1 s
     1 c -> 0 s
    */
  generateOrder(columns: number): Array<'static' | 'dynamic'> {
    // (n * (n + 1)) / 2
    const staticColumns = Math.floor((-3 + Math.sqrt(9 + 8 + 8 * columns)) / 2);
    const ret: Array<'static' | 'dynamic'> = [];

    ret.push('dynamic');

    let i = 0;
    outer: while (i < staticColumns) {
      ret.push('static');
      if (ret.length === columns) {
        break outer;
      }

      let j = 0;
      while (j < i + 2) {
        ret.push('dynamic');

        if (ret.length === columns) {
          break outer;
        }

        j++;
      }

      i++;
    }

    if (ret.length === 2) {
      ret.reverse();
    }

    return ret;
  }

  getStaticAmount(columns: number): number {
    if (!columns) return 0;
    const res = Math.floor((-3 + Math.sqrt(9 + 8 * columns)) / 2);
    return res;
  }

  isIndexStatic(index: number): boolean {
    if (!index) return false;
    const res = (-3 + Math.sqrt(9 + 8 + 8 * index)) / 2;

    return !(res % 1);
  }

  private createBox(): Box {
    const box: Box = {
      type: BOX_TYPE.COLUMN,
      dimension: { width: 1, height: 1, depth: 1 },
      position: { x: 0, y: 0, z: 0 },
      children: [],
    };

    return box;
  }
}

export { Mosaic };
