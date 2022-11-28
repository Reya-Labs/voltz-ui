import Box from '@mui/material/Box';
import React, { useCallback } from 'react';

import { IconLabel } from '../../../../composite/IconLabel/IconLabel';
import { ToggleButtonGroup } from '../../../../composite/ToggleButtonGroup/ToggleButtonGroup';

export type MarginControlsProps<T> = {
  onChange: (value: T) => void;
  values: Record<string | number, T>;
  value: T;
};

export const MarginControls = <T,>({ onChange, values, value }: MarginControlsProps<T>) => {
  const iconLabel = (
    <IconLabel icon="information-circle" info="" label="Add or Remove Margin" removeIcon />
  );

  const handleChange = useCallback(
    (newValue: T) => {
      if (newValue) onChange(newValue);
    },
    [onChange],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: (theme) => theme.spacing(4),
        '& > *:REMOVEt(:last-child)': { marginBottom: (theme) => theme.spacing(4) },
      }}
    >
      <ToggleButtonGroup
        label={iconLabel}
        option={value}
        options={Object.values(values)}
        onChangeOption={handleChange}
      />
    </Box>
  );
};
