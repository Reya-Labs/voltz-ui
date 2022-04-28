import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import RateOptionsInput from './RateOptionInput';

export type RateOptionsProps = {
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  fixedLow?: number;
  fixedHigh?: number;
  onChangeFixedLow: (value: number, increment: boolean | null) => void;
  onChangeFixedHigh: (value: number, increment: boolean | null) => void;
};

const RateOptions: React.FunctionComponent<RateOptionsProps> = ({
  defaultFixedLow,
  defaultFixedHigh,
  fixedLow,
  fixedHigh,
  onChangeFixedLow,
  onChangeFixedHigh,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        '& > *:not(:last-child)': { marginRight: (theme) => theme.spacing(10) },
        flexDirection: 'row',
      }}
    >
      <RateOptionsInput
        defaultValue={defaultFixedLow}
        hint="The lower rate of the fixed rate range within which to deposit liquidity"
        label="fixed low"
        onChange={onChangeFixedLow}
        value={fixedLow}
      />
      <RateOptionsInput
        defaultValue={defaultFixedHigh}
        hint="The upper rate of the fixed rate range within which to deposit liquidity"
        label="fixed high"
        onChange={onChangeFixedHigh}
        value={fixedHigh}
      />
    </Box>
  );
};

export default RateOptions;
