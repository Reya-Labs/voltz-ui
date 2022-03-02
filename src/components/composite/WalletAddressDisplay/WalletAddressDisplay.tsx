import React from 'react';

import { Typography } from '@components/atomic';

export type WalletAddressDisplayProps = {
  address: string | null;
};

const WalletAddressDisplay: React.FunctionComponent<WalletAddressDisplayProps> = ({ address }) => {
  if (!address) {
    return null;
  }

  return (
    <Typography
      variant="body1"
      sx={{ marginLeft: (theme) => theme.spacing(4), fontWeight: 'bold' }}
    >
      {address}
    </Typography>
  );
};

export default WalletAddressDisplay;
