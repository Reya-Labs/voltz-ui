import React from 'react';

import { selectIsSupportedChain } from '../../../app/features/network';
import { useAppSelector } from '../../../app/hooks';
import { ConnectSupportedNetwork } from '../ConnectSupportedNetwork/ConnectSupportedNetwork';
import { NotFoundPageContent } from '../NotFoundPageContent';
import { VoltzPage } from '../VoltzPage';

export const NetworkProtectedVoltzPage: React.FunctionComponent<{
  hidden?: boolean;
}> = ({ hidden = false, children }) => {
  const isSupportedChain = useAppSelector(selectIsSupportedChain);
  if (hidden) {
    return <VoltzPage mainSlot={<NotFoundPageContent />} />;
  }
  if (!isSupportedChain) {
    return (
      <VoltzPage
        mainSlot={
          <ConnectSupportedNetwork
            connectSupportedNetworkText="CONNECT WITH A SUPPORTED NETWORK"
            heading="⚠️ RESTRICTED"
            subheading="Your wallet needs to be connected to a supported network."
          />
        }
      />
    );
  }

  return <>{children}</>;
};
