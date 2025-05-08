import { GridStyle } from './Styles/Grid';


import { StandStyle } from './Styles/Style';

class TVStand {
  dimension: { width: number; height: number; depth: number } = { width: 1, height: 1, depth: 1 };
  style: StandStyle = new GridStyle();

  constructor() {}

  resize(dimension: Partial<TVStand['dimension']>) {
    this.dimension.width = dimension.width ?? this.dimension.width;
    this.dimension.height = dimension.height ?? this.dimension.height;
    this.dimension.depth = dimension.depth ?? this.dimension.depth

    this.style.resize(this.dimension);
  }

  changeStyle(style: StandStyle) {
    this.style = style;
  }
}

export { TVStand };
