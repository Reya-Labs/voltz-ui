import React from 'react';
import Box from '@mui/material/Box';

export type RateOptionsProps = {
  mode: 'liquidity-provider' | 'fixed-trader' | 'variable-trader';
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  defaultLeverage?: number;
  fixedLow?: number;
  fixedHigh?: number;
  leverage?: number;
  onChangeFixedLow: (value: number) => void;
  onChangeFixedHigh: (value: number) => void;
  onChangeLeverage: (value: number) => void;
};

const RateOptions: React.FunctionComponent<RateOptionsProps> = ({
  mode,
  defaultFixedLow,
  defaultFixedHigh,
  defaultLeverage,
  fixedLow,
  fixedHigh,
  leverage,
  onChangeFixedLow,
  onChangeFixedHigh,
  onChangeLeverage,
}) => {
  return null;
};

export default RateOptions;
