import React, { useState } from 'react';
import { styled } from '@mui/system';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { colors } from '@theme';

export type OptionButtonGroupProps = {
  options: string[];
  option?: string;
  defaultOption?: string;
  onChange: (option: string) => void;
};

const OptionButtonGroup: React.FunctionComponent<OptionButtonGroupProps> = ({
  options,
  option,
  defaultOption,
  onChange,
}) => {
  const [activeOption, setOption] = useState(option || defaultOption || options[0]);
  const handleChange = (_event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
    setOption(value);
    onChange(value);
  };

  return (
    <ToggleButtonGroup value={option || activeOption} exclusive onChange={handleChange}>
      {options.map((optionItem: string) => (
        <ToggleButton key={optionItem} value={optionItem}>
          {optionItem}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default styled(OptionButtonGroup)(({ theme }) => ({
  color: colors.vzBlueGreenLight,
}));
