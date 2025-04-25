export enum EMenuTitles {
  STYLE = 'Style',
  WIDTH = 'Width',
  HEIGHT = 'Height',
  DEPTH = 'Depth',
  CABINET_LAYOUT = 'Cabinet Layout',
  LEGS = 'Legs',
  HANDLE = 'Handle',
  BACK_PANELS = 'Back Panels',
  FINISH = 'Finish',
  COLOR = 'Color',
}

export interface IMenuItem {
  title: EMenuTitles;
  component: React.ReactNode;
}
