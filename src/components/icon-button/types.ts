export type TIconButton = {
  info: {
    icon: string;
    label: string;
  };
  isActive: boolean;
  onClick: (() => void) | null;
};
