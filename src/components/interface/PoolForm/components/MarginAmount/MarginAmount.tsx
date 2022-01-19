import React from 'react';
import Box from '@mui/material/Box';

export type MarginAmountProps = {
  protocol?: string;
  defaultMargin?: number;
  maxMargin?: number;
  margin?: number;
  onChangeMargin: (value: number) => void;
};

const MarginAmount: React.FunctionComponent<MarginAmountProps> = ({
  protocol,
  defaultMargin,
  maxMargin,
  margin,
  onChangeMargin,
}) => {
  return null;
};

export default MarginAmount;
