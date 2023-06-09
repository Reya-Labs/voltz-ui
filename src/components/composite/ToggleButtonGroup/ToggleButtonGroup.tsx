import MuiToggleButtonGroup, {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';
import React, { useState } from 'react';

import { withLabel, WithLabelProps } from '../../hoc/withLabel/withLabel';
import { ToggleButton } from './ToggleButton/ToggleButton';

export type ToggleButtonGroupProps<T> = MuiToggleButtonGroupProps & {
  options: Array<T>;
  option?: T;
  defaultOption?: T;
  disabled?: boolean;
  onChangeOption: (option: T) => void;
};

const ToggleButtonGroupComponent = <T,>({
  options,
  option,
  defaultOption,
  disabled = false,
  onChangeOption,
}: ToggleButtonGroupProps<T>) => {
  const [activeOption, setOption] = useState(option || defaultOption || options[0]);
  const handleChange = (_event: React.MouseEvent<HTMLElement, MouseEvent>, value: T) => {
    setOption(value);
    onChangeOption(value);
  };

  return (
    <MuiToggleButtonGroup
      disabled={disabled}
      value={option || activeOption}
      exclusive
      onChange={handleChange}
    >
      {options.map((optionItem: T) => (
        <ToggleButton key={optionItem as unknown as string} value={optionItem}>
          {optionItem}
        </ToggleButton>
      ))}
    </MuiToggleButtonGroup>
  );
};

export const ToggleButtonGroup = <T,>(props: ToggleButtonGroupProps<T> & WithLabelProps) =>
  withLabel<ToggleButtonGroupProps<T>>(ToggleButtonGroupComponent)(props);
