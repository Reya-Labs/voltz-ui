import { Typography } from 'brokoli-ui';
import React from 'react';

import { useWallet } from '../../../hooks/useWallet';
import { ContainerBox } from './ConnectSupportedNetwork.styled';

type ConnectSupportedNetworkProps = {
  heading: string;
  subheading: string;
};
export const ConnectSupportedNetwork: React.FunctionComponent<ConnectSupportedNetworkProps> =
  React.memo(({ heading, subheading }) => {
    const { setRequired } = useWallet();
    return (
      <ContainerBox onClick={() => setRequired(true)}>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Bold">
          {heading}
        </Typography>
        <Typography colorToken="skyBlueCrayola" typographyToken="primaryBodyMediumRegular">
          {subheading}
        </Typography>
      </ContainerBox>
    );
  });
