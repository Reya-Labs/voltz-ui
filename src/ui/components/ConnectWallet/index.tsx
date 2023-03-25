import { Typography } from 'brokoli-ui';
import React from 'react';

import { useWallet } from '../../../hooks/useWallet';
import { ContainerBox } from './ConnectWallet.styled';

type ConnectWalletProps = {
  heading: string;
  subheading: string;
};
export const ConnectWallet: React.FunctionComponent<ConnectWalletProps> = React.memo(
  ({ heading, subheading }) => {
    const { setRequired } = useWallet();
    return (
      <ContainerBox onClick={() => setRequired(true)}>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Bold">
          {heading}
        </Typography>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyMediumRegular">
          {subheading}
        </Typography>
      </ContainerBox>
    );
  },
);
