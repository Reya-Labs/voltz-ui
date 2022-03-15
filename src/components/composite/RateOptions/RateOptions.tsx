import React from 'react';
import isUndefined from 'lodash/isUndefined';
import Box from '@mui/material/Box';

import IntegerField from '../IntegerField/IntegerField';

export type RateOptionsProps = {
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  fixedLow?: number;
  fixedHigh?: number;
  onChangeFixedLow: (value: number) => void;
  onChangeFixedHigh: (value: number) => void;
};

const RateOptions: React.FunctionComponent<RateOptionsProps> = ({
  defaultFixedLow,
  defaultFixedHigh,
  fixedLow,
  fixedHigh,
  onChangeFixedLow,
  onChangeFixedHigh,
}) => {
  const fixedLowValue = isUndefined(fixedLow) ? defaultFixedLow : fixedLow;
  const fixedHighValue = isUndefined(fixedHigh) ? defaultFixedHigh : fixedHigh;

  const handleChangeFixedLow = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFixedLow(parseInt(event.target.value));
  };
  const handleChangeFixedHigh = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFixedHigh(parseInt(event.target.value));
  };

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
      <IntegerField
        size="small"
        label="Fixed low"
        value={fixedLowValue}
        onChange={handleChangeFixedLow}
      />
      <IntegerField
        size="small"
        label="Fixed high"
        value={fixedHighValue}
        onChange={handleChangeFixedHigh}
      />
    </Box>
  );
};

export default RateOptions;
