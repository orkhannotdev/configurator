import { CELL_SIZE, PLATE_THICKNESS } from '@/utils/utilities';
import { Box, BoxType, StandStyle } from './Style';
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
  private order: Array<'static' | 'dynamic'> = [];
  dimension: { width: number; height: number; depth: number } = { width: 0, height: 0, depth: 0 };
  boxes: Array<Box> = [];

  resize(dimension: { width: number; height: number; depth: number }) {
    const {minWidth, maxWidth} = CELL_SIZE

    this.dimension.width = dimension.width;
    this.dimension.height = dimension.height;
    this.dimension.depth = dimension.depth;

    let parts = 0;

    {
      let i = 0;
      let max = 100;
      let sum = PLATE_THICKNESS;
      const maxW = .545;

      while (i < max) {
        const lastTwo = dimension.width - sum;

        if(lastTwo  <= Number.EPSILON) {
          parts = i
          break
        }

        
        const toSum = this.isIndexStatic(i) ? 0.17 : maxW 

        if (lastTwo > 0 && lastTwo <  toSum - PLATE_THICKNESS ) {
          parts = i + 1
          break;
        }

        sum += (toSum + PLATE_THICKNESS);

        i++;
      }
    }


    parts = parts ? parts : 1;

    this.order = this.generateOrder(parts);
    this.boxes.push(this.createBox());
    const lastBox = this.boxes[this.boxes.length - 1];
    lastBox.dimension.width = dimension.width;

    const staticParts = this.getStaticAmount(parts)
    const staticAmount =  staticParts * .17;
    const dynamicParts = parts - staticParts;

    let leftWidth = dimension.width - (parts + 1) * PLATE_THICKNESS - staticAmount;
    let i = 0;
   const ration = leftWidth / dynamicParts

    while (i < parts) {
      const newB: Box = this.createBox();
      lastBox.children.push(newB);

      const isStatic = this.order[i] === 'static';
      let currentWidth = isStatic ? 0.17 : ration

      newB.dimension.width = round(currentWidth - 0.001);
      leftWidth -= currentWidth;

      i++;
    }

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
    const ret: Array<'static' | 'dynamic'>= [];

    ret.push('dynamic');

    let i = 0;
    outer: while(i < staticColumns) {
      ret.push('static');
      if(ret.length === columns) {break outer}

      let j = 0;
      while(j < i + 2) {
        ret.push('dynamic')

        if(ret.length === columns) {break outer}

        j++;
      }
      
      i++;
    }

    if(ret.length === 2) {ret.reverse();}

    return ret;
  }

  getStaticAmount(columns: number): number {
    if(!columns) return 0;
    const res = Math.floor((-3 + Math.sqrt(9 + 8 * (columns))) / 2); 
    return res; 
  }

  isIndexStatic(index: number): boolean {
    if(!index) return false;
    const res = (-3 + Math.sqrt(9 + 8  + 8 * index)) / 2;

    return !(res % 1);
  }

  private createBox(): Box {
    const box: Box = {
      type: BoxType.COLUMN,
      dimension: { width: 1, height: 1, depth: 1 },
      position: { x: 0, y: 0, z: 0 },
      children: [],
    };

    return box;
  }
}

export { Mosaic };
