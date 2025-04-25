export interface SliderProps {
  min: number;
  max: number;
  onChange: (value: number) => void;
  defaultValue?: number;
}

export interface IInputProps {
  min: number;
  max: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
