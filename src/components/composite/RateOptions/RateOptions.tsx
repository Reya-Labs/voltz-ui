import Box from '@mui/material/Box';
import React from 'react';

import RateOptionsInput, { RateOptionsInputProps } from './RateOptionInput';

export type RateOptionsProps = {
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  fixedLow?: number;
  fixedLowDisabled?: boolean;
  fixedLowError?: string;
  fixedHigh?: number;
  fixedHighDisabled?: boolean;
  fixedHighError?: string;
  onChangeFixedLow: RateOptionsInputProps['onChange'];
  onChangeFixedHigh: RateOptionsInputProps['onChange'];
};

export const RateOptions: React.FunctionComponent<RateOptionsProps> = ({
  defaultFixedLow,
  defaultFixedHigh,
  fixedLow,
  fixedLowDisabled,
  fixedLowError,
  fixedHigh,
  fixedHighDisabled,
  fixedHighError,
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
        disabled={fixedLowDisabled}
        error={fixedLowError}
        hint="The lower rate of the fixed rate range within which to deposit liquidity"
        label="Fixed rate low"
        value={fixedLow}
        onChange={onChangeFixedLow}
      />
      <RateOptionsInput
        defaultValue={defaultFixedHigh}
        disabled={fixedHighDisabled}
        error={fixedHighError}
        hint="The upper rate of the fixed rate range within which to deposit liquidity"
        label="Fixed rate high"
        value={fixedHigh}
        onChange={onChangeFixedHigh}
      />
    </Box>
  );
};
