import React, { useState } from 'react';
import MuiToggleButtonGroup, {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';

import { AgentProps } from '@theme';
import { withLabel } from '../../utilities';
import { ToggleButton } from '../../atomic';

export type ToggleButtonGroupProps = MuiToggleButtonGroupProps &
  AgentProps & {
    options: string[];
    option?: string;
    defaultOption?: string;
    onChangeOption: (option: string) => void;
  };

const ToggleButtonGroup: React.FunctionComponent<ToggleButtonGroupProps> = ({
  agent,
  options,
  option,
  defaultOption,
  onChangeOption,
}) => {
  const [activeOption, setOption] = useState(option || defaultOption || options[0]);
  const handleChange = (_event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
    setOption(value);
    onChangeOption(value);
  };

  return (
    <MuiToggleButtonGroup value={option || activeOption} exclusive onChange={handleChange}>
      {options.map((optionItem: string) => (
        <ToggleButton key={optionItem} value={optionItem} agent={agent}>
          {optionItem}
        </ToggleButton>
      ))}
    </MuiToggleButtonGroup>
  );
};

export default withLabel<ToggleButtonGroupProps>(ToggleButtonGroup);
