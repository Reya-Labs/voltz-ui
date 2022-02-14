import React, { useState } from 'react';
import MuiToggleButtonGroup, {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';

import { AgentProps } from '@components/contexts';
import { useAgentWithOverride } from '@hooks';
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
  agent: agentOverride,
  options,
  option,
  defaultOption,
  onChangeOption,
}) => {
  useAgentWithOverride(agentOverride);
  const [activeOption, setOption] = useState(option || defaultOption || options[0]);
  const handleChange = (_event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
    setOption(value);
    onChangeOption(value);
  };

  return (
    <MuiToggleButtonGroup value={option || activeOption} exclusive onChange={handleChange}>
      {options.map((optionItem: string) => (
        <ToggleButton key={optionItem} value={optionItem}>
          {optionItem}
        </ToggleButton>
      ))}
    </MuiToggleButtonGroup>
  );
};

export default withLabel<ToggleButtonGroupProps>(ToggleButtonGroup);
