import React from 'react';
import Box from '@mui/material/Box';
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

const RateOptions: React.FunctionComponent<RateOptionsProps> = ({
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
        onChange={onChangeFixedLow}
        value={fixedLow}
      />
      <RateOptionsInput
        defaultValue={defaultFixedHigh}
        disabled={fixedHighDisabled}
        error={fixedHighError}
        hint="The upper rate of the fixed rate range within which to deposit liquidity"
        label="Fixed rate high"
        onChange={onChangeFixedHigh}
        value={fixedHigh}
      />
    </Box>
  );
};

export default RateOptions;
