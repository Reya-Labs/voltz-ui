import React from 'react';

import { elideAddress } from '../../../../utilities/elideAddress';
import { Typography } from '../../../atomic/Typography/Typography';

export type WalletAddressDisplayProps = {
  address: string | null;
};

export const WalletAddressDisplay: React.FunctionComponent<WalletAddressDisplayProps> = ({
  address,
}) => {
  if (!address) {
    return null;
  }

  return (
    <Typography
      sx={{ marginLeft: (theme) => theme.spacing(4), fontWeight: 'bold' }}
      variant="body1"
    >
      {elideAddress(address)}
    </Typography>
  );
};
