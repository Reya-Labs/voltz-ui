import React from 'react';

import { selectIsSupportedChain } from '../../../app/features/network';
import { useAppSelector } from '../../../app/hooks';
import { ConnectSupportedNetwork } from '../ConnectSupportedNetwork';
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
            heading="⚠️ RESTRICTED"
            subheading="Your wallet needs to be connected to a supported network."
          />
        }
      />
    );
  }

  return <>{children}</>;
};
