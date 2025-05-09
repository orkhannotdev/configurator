import { Grid } from './Styles/Grid';
import { StandStyle } from './Styles/Style';

class TVStand {
  // user change initial size, and if user remove box and restore it we can get value from here;
  modifiedBoxes: { [key in string]: { width: number; height: number; depth: number } } = {};

  dimension: { width: number; height: number; depth: number } = { width: 1, height: 1, depth: 1 };
  style: StandStyle = new Grid();

  constructor() {}

  resize(dimension: Partial<TVStand['dimension']>) {
    this.dimension.width = dimension.width ?? this.dimension.width;
    this.dimension.height = dimension.height ?? this.dimension.height;
    this.dimension.depth = dimension.depth ?? this.dimension.depth;
    this.style.modifiedBoxes = this.modifiedBoxes;
    this.style.resize(this.dimension);
  }

  changeStyle(style: StandStyle) {
    this.style = style;
  }

  modifyBox(boxIndex: number, dimension: {width: number, height: number, depth: number}) {
    this.modifiedBoxes[boxIndex] = {...dimension}; 
  }
}

export { TVStand };
