import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import { IconLabel, ToggleButtonGroup } from '@components/composite';
import { MintBurnFormMarginAction } from '@hooks';

export type MarginControlsProps = {
  onChange: (value: MintBurnFormMarginAction) => void;
  value: MintBurnFormMarginAction;
};

const MarginControls = ({ onChange, value }: MarginControlsProps) => {
  const iconLabel = <IconLabel label="Add or Remove Margin" icon="information-circle" info="" removeIcon />

  const handleChange = useCallback((newValue: string) => {
    if(newValue) onChange(newValue as MintBurnFormMarginAction);
  }, [onChange]);

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
        options={Object.values(MintBurnFormMarginAction)}
        option={value}
        onChangeOption={handleChange}
      />
    </Box>
  );
};

export default MarginControls;