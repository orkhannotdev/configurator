import { ECabinetHandles, ECabinetLegs, ECabinetStyle, EPlywoodTextures, EVeneerTextures } from '@/utils/utilities';

export interface BoxSelectItem {
  label: string;
  value: ECabinetHandles | ECabinetLegs | ECabinetStyle | EVeneerTextures | EPlywoodTextures;
  src: string;
}

export interface BoxSelectProps {
  options: BoxSelectItem[];
  onChange: (value: any) => void;
  small?: boolean;
}
