import { ECabinetFinishes, ECabinetHandles, ECabinetLegs, ECabinetStyle, EPlywoodTextures, EVeneerTextures } from '@/utils/utilities';
import * as THREE from 'three';

export interface ICabinetSize {
  totalWidth: number;
  totalHeight: number;
  totalDepth: number;
}

export type TTextureURL = EPlywoodTextures | EVeneerTextures;

export interface IColumnRow {
  index: number;
  height: number;
}

export interface IColumnDoor {
  index: number;
  size: {
    width: number;
    height: number;
  };
  pos: {
    x: number;
    y: number;
  };
  opening: number;
}

export interface IColumnDrawer {
  index: number;
  size: {
    width: number;
    height: number;
  };
  pos: {
    x: number;
    y: number;
  };
}

export interface IColumnDivider {
  size: {
    width: number;
    depth: number;
  };
  pos: {
    x: number;
    y: number;
  };
}


export interface IColumn {
  id: string;
  index: number;
  width: number;
  posX: number;
  layoutIndex: number;
  isDivide: boolean;
  rows: IColumnRow[];
  doors: IColumnDoor[];
  drawers: IColumnDrawer[];
  dividers: IColumnDivider[];
}

export interface IPlateInformation {
  horizontal: boolean;
  middle: boolean;
  back: boolean;
  rowIndex?: number;
  columnIndex?: number;
}

export interface IPartition {
  row: number;
  col: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  scale: {
    width: number;
    depth: number;
  };
}

export interface ICabinetStore {
  cabinetStyle: ECabinetStyle;
  setCabinetStyle: (cabinetStyle: ECabinetStyle) => void;
  cabinetSize: ICabinetSize;
  setCabinetSize: (cabinetSize: ICabinetSize) => void;
  cabinetHandle: ECabinetHandles;
  setCabinetHandle: (cabinetHandle: ECabinetHandles) => void;
  cabinetFinish: ECabinetFinishes;
  setCabinetFinish: (cabinetFinish: ECabinetFinishes) => void;
  cabinetLegs: ECabinetLegs;
  setCabinetLegs: (cabinetLegs: ECabinetLegs) => void;
  cabinetBackplate: boolean;
  setCabinetBackplate: (cabinetBackplate: boolean) => void;
  cabinetDoors: boolean;
  setCabinetDoors: (cabinetDoors: boolean) => void;
  hoveredColumnIndex: number;
  setHoveredColumnIndex: (hoveredColumnIndex: number) => void;
  cabinetDrawers: boolean;
  setCabinetDrawers: (cabinetDrawers: boolean) => void;
  cabinetTextureURL: TTextureURL;
  setCabinetTextureURL: (color: EVeneerTextures | EPlywoodTextures) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  cabinetColumns: IColumn[];
  setCabinetColumns: (columns: IColumn[]) => void;
  showDimensions: boolean;
  setShowDimensions: (showDimensions: boolean) => void;
  isCameraLerp: boolean;
  setLerpCamera: (isCameraLerp: boolean) => void;
  isVisibleTools: boolean;
  setVisibleTools: (isVisibleTools: boolean) => void;
  openDoors: boolean;
  setOpenDoors: (openDoors: boolean) => void;
  selectedColumnIndex: number;
  setSelectedColumnIndex: (selectedColumnIndex: number) => void;
  colorMap: THREE.Texture | null;
  setColorMap: (colorMap: THREE.Texture | null) => void;
  roughnessMap: THREE.Texture | null;
  setRoughnessMap: (roughnessMap: THREE.Texture | null) => void;
  aoMap: THREE.Texture | null;
  setAoMap: (aoMap: THREE.Texture | null) => void;
  normalMap: THREE.Texture | null;
  setNormalMap: (normalMap: THREE.Texture | null) => void;
  isVerticalDragging: boolean;
  setVerticalDragging: (isVerticalDragging: boolean) => void;
  shadowQuality: 'low' | 'medium' | 'high';
  setShadowQuality: (quality: 'low' | 'medium' | 'high') => void;
}

export interface TGetCalculatedColumnsProps {
  current: IColumn[];
  cabinetStyle: ECabinetStyle;
  cabinetSize: ICabinetSize;
  legHeight: number;
  columnCount?: number;
}
