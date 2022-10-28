import React, { useState } from 'react';
import MuiToggleButtonGroup, {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';

import { AgentProps } from '@contexts';
import { useAgentWithOverride } from '@hooks';
import { withLabel, WithLabelProps } from '../../hoc';
import { ToggleButton } from '../../atomic';

export type ToggleButtonGroupProps<T> = MuiToggleButtonGroupProps &
  AgentProps & {
    options: Array<T>;
    option?: T;
    defaultOption?: T;
    disabled?: boolean;
    onChangeOption: (option: T) => void;
  };

const ToggleButtonGroup = <T,>({
  agent: agentOverride,
  options,
  option,
  defaultOption,
  disabled = false,
  onChangeOption,
}: ToggleButtonGroupProps<T>) => {
  useAgentWithOverride(agentOverride);
  const [activeOption, setOption] = useState(option || defaultOption || options[0]);
  const handleChange = (_event: React.MouseEvent<HTMLElement, MouseEvent>, value: T) => {
    setOption(value);
    onChangeOption(value);
  };

  return (
    <MuiToggleButtonGroup
      value={option || activeOption}
      exclusive
      onChange={handleChange}
      disabled={disabled}
    >
      {options.map((optionItem: T) => (
        <ToggleButton key={optionItem as unknown as string} value={optionItem}>
          {optionItem}
        </ToggleButton>
      ))}
    </MuiToggleButtonGroup>
  );
};

export default <T,>(props: ToggleButtonGroupProps<T> & WithLabelProps) =>
  withLabel<ToggleButtonGroupProps<T>>(ToggleButtonGroup)(props);
