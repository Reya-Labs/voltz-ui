import React from 'react';

import { useWallet } from '../../../hooks/useWallet';
import {
  ConnectWalletBox,
  ConnectWalletTypography,
  ContainerBox,
  Heading,
  PillBox,
  Subheading,
} from './ConnectWallet.styled';

type ConnectWalletProps = {
  heading: string;
  subheading: string;
  connectWalletText: string;
};
export const ConnectWallet: React.FunctionComponent<ConnectWalletProps> = React.memo(
  ({ heading, subheading, connectWalletText }) => {
    const { setRequired } = useWallet();
    return (
      <ContainerBox onClick={() => setRequired(true)}>
        <Heading variant="h1">{heading}</Heading>
        <Subheading variant="body2">{subheading}</Subheading>
        <ConnectWalletBox>
          <ConnectWalletTypography variant="body2">
            <PillBox text="¯\_(ツ)_/¯" variant="wildStrawberry" />
            {connectWalletText}
          </ConnectWalletTypography>
        </ConnectWalletBox>
      </ContainerBox>
    );
  },
);
