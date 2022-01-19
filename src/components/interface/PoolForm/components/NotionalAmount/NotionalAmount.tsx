import React from 'react';
import Box from '@mui/material/Box';

export type NotionalAmountProps = {
  notional: number;
  maxNotional: number;
  onMaxNotional: () => void;
};

const NotionalAmount: React.FunctionComponent<NotionalAmountProps> = ({
  notional,
  maxNotional,
  onMaxNotional,
}) => {
  return null;
};

export default NotionalAmount;
