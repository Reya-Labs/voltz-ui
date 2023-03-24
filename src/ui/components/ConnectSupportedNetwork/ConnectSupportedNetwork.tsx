import { Typography } from 'brokoli-ui';
import React from 'react';

import { useWallet } from '../../../hooks/useWallet';
import { ContainerBox } from './ConnectSupportedNetwork.styled';

type ConnectSupportedNetworkProps = {
  heading: string;
  subheading: string;
  connectSupportedNetworkText: string;
};
export const ConnectSupportedNetwork: React.FunctionComponent<ConnectSupportedNetworkProps> =
  React.memo(({ heading, subheading, connectSupportedNetworkText }) => {
    const { setRequired } = useWallet();
    return (
      <ContainerBox onClick={() => setRequired(true)}>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Bold">
          {heading}
        </Typography>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyMediumRegular">
          {subheading}
        </Typography>
        <Typography colorToken="lavenderWeb2" typographyToken="primaryBodyMediumRegular">
          {connectSupportedNetworkText}
        </Typography>
      </ContainerBox>
    );
  });
