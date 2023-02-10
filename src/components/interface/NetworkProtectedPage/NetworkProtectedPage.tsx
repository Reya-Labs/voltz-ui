import React from 'react';

import { selectIsSupportedNetwork } from '../../../app/features/network';
import { useAppSelector } from '../../../app/hooks';
import { ConnectSupportedNetwork } from '../../composite/ConnectSupportedNetwork/ConnectSupportedNetwork';
import { Page } from '../Page/Page';

export const NetworkProtectedPage: React.FunctionComponent = ({ children }) => {
  const isSupportedNetwork = useAppSelector(selectIsSupportedNetwork);
  if (!isSupportedNetwork) {
    return (
      <Page>
        <ConnectSupportedNetwork
          connectSupportedNetworkText="CONNECT WITH A SUPPORTED NETWORK"
          heading="⚠️ RESTRICTED"
          subheading="Your wallet needs to be connected to a supported network."
        />
      </Page>
    );
  }

  return <Page>{children}</Page>;
};
