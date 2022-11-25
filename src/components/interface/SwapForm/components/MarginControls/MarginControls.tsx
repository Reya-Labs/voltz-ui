import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import { IconLabel, ToggleButtonGroup } from '@components/composite';

export type MarginControlsProps<T> = {
  onChange: (value: T) => void;
  values: Record<string | number, T>;
  value: T;
};

export const MarginControls = <T,>({ onChange, values, value }: MarginControlsProps<T>) => {
  const iconLabel = (
    <IconLabel label="Add or Remove Margin" icon="information-circle" info="" removeIcon />
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
        options={Object.values(values)}
        option={value}
        onChangeOption={handleChange}
      />
    </Box>
  );
};
