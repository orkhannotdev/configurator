import { ECabinetFinishes, ECabinetHandles, ECabinetLegs, ECabinetStyle, EPlywoodTextures, EVeneerTextures } from '@/utils/utilities';
import { create } from 'zustand';
import { ICabinetStore, IColumn } from './types';

export const useCabinetStore = create<ICabinetStore>()((set) => ({
  selectedStyle: '',
  cabinetStyle: ECabinetStyle.MODERN,
  setCabinetStyle: (cabinetStyle) => {
    set({ cabinetStyle });
  },

  cabinetSize: { totalWidth: 2.5, totalHeight: 1.08, totalDepth: 0.48 },
  setCabinetSize: (cabinetSize) => {
    set({ cabinetSize });
  },

  cabinetHandle: ECabinetHandles.HANDLE_B,
  setCabinetHandle: (cabinetHandle) => {
    set({ cabinetHandle });
  },

  cabinetFinish: ECabinetFinishes.VENEER,
  setCabinetFinish: (cabinetFinish) => {
    set({ cabinetFinish });
  },

  cabinetLegs: ECabinetLegs.NO_LEG,
  setCabinetLegs: (cabinetLegs) => {
    set({ cabinetLegs });
  },

  cabinetBackplate: true,
  setCabinetBackplate: (cabinetBackplate) => {
    set({ cabinetBackplate });
  },

  cabinetDoors: false,
  setCabinetDoors: (cabinetDoors) => {
    set({ cabinetDoors });
  },

  hoveredColumnIndex: -1,
  setHoveredColumnIndex: (hoveredColumnIndex) => {
    set({ hoveredColumnIndex });
  },

  cabinetDrawers: false,
  setCabinetDrawers: (cabinetDrawers) => {
    set({ cabinetDrawers });
  },

  cabinetTextureURL: EVeneerTextures.BEIGE_GREY_LORENZO_OAK,
  setCabinetTextureURL: (cabinetTextureURL: EPlywoodTextures | EVeneerTextures) => {
    set({
      cabinetTextureURL,
    });
  },

  isDragging: false,
  setIsDragging: (v) => {
    set({ isDragging: v });
  },

  cabinetColumns: [],
  setCabinetColumns: (columns: IColumn[]) => set({ cabinetColumns: columns }),

  showDimensions: false,
  setShowDimensions: (showDimensions) => {
    set({ showDimensions });
  },

  isCameraLerp: true,
  setLerpCamera: (isCameraLerp) => {
    set({ isCameraLerp });
  },

  isVisibleTools: true,
  setVisibleTools: (isVisibleTools) => {
    set({ isVisibleTools });
  },

  openDoors: false,
  setOpenDoors: (openDoors) => {
    set({ openDoors });
  },

  selectedColumnIndex: -1,
  setSelectedColumnIndex: (selectedColumnIndex) => {
    set({ selectedColumnIndex });
  },
  colorMap: null,
  setColorMap: (colorMap) => {
    set({ colorMap });
  },
  roughnessMap: null,
  setRoughnessMap: (roughnessMap) => {
    set({ roughnessMap });
  },
  aoMap: null,
  setAoMap: (aoMap) => {
    set({ aoMap });
  },
  normalMap: null,
  setNormalMap: (normalMap) => {
    set({ normalMap });
  },

  isVerticalDragging: false,
  setVerticalDragging: (isVerticalDragging) => {
    set({ isVerticalDragging });
  },

  shadowQuality: 'medium',
  setShadowQuality: (quality: 'low' | 'medium' | 'high') => set({ shadowQuality: quality }),
}));
