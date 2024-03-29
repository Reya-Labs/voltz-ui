import React from 'react';

import { useAppSelector } from '../../../app';
import { selectIsSupportedChain } from '../../../app/features/network';
import { ConnectSupportedNetwork } from '../ConnectSupportedNetwork';
import { NotFoundPageContent } from '../NotFoundPageContent';
import { Page } from '../Page';

type Props = React.PropsWithChildren<{
  hidden?: boolean;
}>;

export const NetworkProtectedPage: React.FunctionComponent<Props> = ({
  hidden = false,
  children,
}) => {
  const isSupportedChain = useAppSelector(selectIsSupportedChain);
  if (hidden) {
    return <Page mainSlot={<NotFoundPageContent />} />;
  }
  if (!isSupportedChain) {
    return (
      <Page
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
