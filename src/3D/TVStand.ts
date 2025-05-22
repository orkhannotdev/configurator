import { ECabinetStyle } from '@/utils/utilities';
import { Grid } from './Styles/Grid';
import { StandStyle } from './Styles/Style';
import { Gradient } from './Styles/Gradient';

class TVStand {
  // user change initial size, and if user remove box and restore it we can get value from here;
  modifiedBoxes: { [key in string]: { width: number; height: number; depth: number } } = {};

  dimension: { width: number; height: number; depth: number } = { width: 1, height: 1, depth: 1 };
  style: StandStyle = new Grid();

  resize(dimension: Partial<TVStand['dimension']>) {
    this.dimension.width = dimension.width ?? this.dimension.width;
    this.dimension.height = dimension.height ?? this.dimension.height;
    this.dimension.depth = dimension.depth ?? this.dimension.depth;
    this.style.resize(this.dimension);
  }

  setFromString(style: ECabinetStyle) {
    switch(style) {
      case "grid":
        this.style = new Grid()
        break;
      case "gradient":
        this.style = new Gradient();
        break;
    }
  }

  changeStyle(style: StandStyle) {
    this.style = style;
  }

  modifyBox(boxIndex: number, dimension: {width: number, height: number, depth: number}) {
    this.modifiedBoxes[boxIndex] = {...dimension}; 
  }
}

export { TVStand };
