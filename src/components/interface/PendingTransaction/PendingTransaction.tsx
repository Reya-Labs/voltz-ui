import React from 'react';
import Box from '@mui/material/Box';

import { calculateNotionalAmount } from '@utilities';
import { Panel } from '@components/atomic';
import { ProtocolInformation } from '@components/composite';

export type PendingTransactionProps = {
  protocol?: string;
  fixedApr?: number;
  leverage?: number;
  margin?: number;
};

const PendingTransaction: React.FunctionComponent<PendingTransactionProps> = ({
  protocol,
  fixedApr,
  leverage,
  margin,
}) => {
  return (
    <Panel
      variant="darker"
      sx={{
        marginTop: 12,
        padding: 6,
        width: (theme) => theme.spacing(80),
        boxShadow: '0px 0px 60px rgba(255, 89, 156, 0.2)',
      }}
    >
      <Panel variant="main">
        <ProtocolInformation protocol={protocol} fixedApr={fixedApr} />
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(4),
          }}
        >
          MarginAmount: {margin}
        </Box>
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(4),
          }}
        >
          NotionalAmount: {calculateNotionalAmount(margin, leverage)}
        </Box>
      </Panel>
    </Panel>
  );
};

export default PendingTransaction;
