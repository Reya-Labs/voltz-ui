import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import { ToggleButtonGroup } from '../../../../composite/ToggleButtonGroup/ToggleButtonGroup';
import { IconLabel } from '../../../../composite/IconLabel/IconLabel';
import { MintBurnFormLiquidityAction } from '../../../../../contexts/MintBurnFormContext/MintBurnFormContext';

export type LiquidityControlsProps = {
  onChange: (value: MintBurnFormLiquidityAction) => void;
  value: MintBurnFormLiquidityAction;
};

export const LiquidityControls = ({ onChange, value }: LiquidityControlsProps) => {
  const iconLabel = (
    <IconLabel label="Add or Burn Liquidity" icon="information-circle" info="" removeIcon />
  );

  const handleChange = useCallback(
    (newValue: string) => {
      if (newValue) onChange(newValue as MintBurnFormLiquidityAction);
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
        options={Object.values(MintBurnFormLiquidityAction)}
        option={value}
        onChangeOption={handleChange}
      />
    </Box>
  );
};
