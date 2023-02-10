import React from 'react';

import { useWallet } from '../../../hooks/useWallet';
import {
  ConnectSupportedNetworkBox,
  ConnectSupportedNetworkTypography,
  ContainerBox,
  Heading,
  PillBox,
  Subheading,
} from './ConnectSupportedNetwork.styled';

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
        <Heading variant="h1">{heading}</Heading>
        <Subheading variant="body2">{subheading}</Subheading>
        <ConnectSupportedNetworkBox>
          <ConnectSupportedNetworkTypography variant="body2">
            <PillBox text="¯\_(ツ)_/¯" variant="orangeYellow" />
            {connectSupportedNetworkText}
          </ConnectSupportedNetworkTypography>
        </ConnectSupportedNetworkBox>
      </ContainerBox>
    );
  });
