import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { selectChainId, selectIsSupportedChain } from '../../../app/features/network';
import { useAppSelector } from '../../../app/hooks';
import { ConnectSupportedNetwork } from '../../composite/ConnectSupportedNetwork/ConnectSupportedNetwork';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Page } from '../Page/Page';

export const NetworkProtectedPage: React.FunctionComponent<{
  notRenderedForNetworks?: SupportedChainId[];
}> = ({ notRenderedForNetworks = [], children }) => {
  const isSupportedChain = useAppSelector(selectIsSupportedChain);
  const chainId = useAppSelector(selectChainId);
  const shouldRender =
    chainId && notRenderedForNetworks?.length
      ? !notRenderedForNetworks.find((c) => c === chainId)
      : true;
  if (!shouldRender) {
    return <NotFoundPage />;
  }
  if (!isSupportedChain) {
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
