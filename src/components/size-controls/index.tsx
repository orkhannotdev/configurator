import { RangeInput } from '@/components/range-input';
import { CABINET_SIZE_CONSTRAINTS } from '../../utils/utilities';

// Inside the size controls component
<RangeInput
  label="Width"
  value={width}
  onChange={handleWidthChange}
  min={CABINET_SIZE_CONSTRAINTS.minWidth * 100} // Convert to cm
  max={CABINET_SIZE_CONSTRAINTS.maxWidth * 100} // Now 250cm
  step={1}
  unit="cm"
/>