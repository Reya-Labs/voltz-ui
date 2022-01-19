import React, { useState } from 'react';
import { styled } from '@mui/system';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { colors } from '@theme';

export type OptionButtonGroupProps = {
  options: string[];
  onChange: (option: string) => void;
};

const OptionButtonGroup: React.FunctionComponent<OptionButtonGroupProps> = ({
  options,
  onChange,
}) => {
  const [activeOption, setOption] = useState(options[0]);
  const handleChange = (_event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
    setOption(value);
    onChange(value);
  };

  return (
    <ToggleButtonGroup value={activeOption} exclusive onChange={handleChange}>
      {options.map((option: string) => (
        <ToggleButton key={option} value={option}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default styled(OptionButtonGroup)(({ theme }) => ({
  color: colors.apeBlueGreenLight,
}));
