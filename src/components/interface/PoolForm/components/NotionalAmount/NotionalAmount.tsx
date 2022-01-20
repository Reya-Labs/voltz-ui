import React from 'react';
import Box from '@mui/material/Box';

import { TextField } from '@components/composite';

export type NotionalAmountProps = {
  notional?: number;
  maxNotional?: number;
  onMaxNotional: () => void;
};

const NotionalAmount: React.FunctionComponent<NotionalAmountProps> = ({
  notional,
  maxNotional,
  onMaxNotional,
}) => {
  return (
    <TextField
      variant="filled"
      label="Notional amount"
      type="number"
      value={notional}
      sx={{ width: '100%' }}
      disabled
    />
  );
};

export default NotionalAmount;
