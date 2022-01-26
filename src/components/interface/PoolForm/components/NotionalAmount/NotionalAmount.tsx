import React from 'react';
import Box from '@mui/material/Box';

import { IntegerField } from '@components/composite';

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
  return <IntegerField label="Notional amount" value={notional} sx={{ width: '100%' }} disabled />;
};

export default NotionalAmount;
