import { StandStyle } from './Style';

class GridStyle implements StandStyle {
  resize(dimension: { width: number; height: number; depth: number }) {
    console.log('==');
  }
}

export { GridStyle };
