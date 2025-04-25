export interface SwitchProps {
  options: string[];
  onChange: (value: number) => void;
  value?: number;
}
