import Box from '@mui/material/Box';
import React, { useCallback } from 'react';

import { MintBurnFormLiquidityAction } from '../../../../contexts/MintBurnFormContext/MintBurnFormContext';
import { IconLabel } from '../../../composite/IconLabel/IconLabel';
import { ToggleButtonGroup } from '../../../composite/ToggleButtonGroup/ToggleButtonGroup';

export type LiquidityControlsProps = {
  onChange: (value: MintBurnFormLiquidityAction) => void;
  value: MintBurnFormLiquidityAction;
};

export const LiquidityControls = ({ onChange, value }: LiquidityControlsProps) => {
  const iconLabel = (
    <IconLabel icon="information-circle" info="" label="Add or Burn Liquidity" removeIcon />
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
        option={value}
        options={Object.values(MintBurnFormLiquidityAction)}
        onChangeOption={handleChange}
      />
    </Box>
  );
};
