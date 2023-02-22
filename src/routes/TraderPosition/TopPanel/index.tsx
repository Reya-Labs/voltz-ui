import React from 'react';

import { WalletConnectModal } from '../../../components/interface/WalletConnectModal/WalletConnectModal';
import { ChainSelector } from '../ChainSelector';
import { Nav } from '../Nav';
import { PanelBox, RightContent } from './TopPanel.styled';

export const TopPanel: React.FunctionComponent = React.memo(() => (
  <PanelBox data-testid="TopPanel-PanelBox">
    <Nav />
    <RightContent data-testid="TopPanel-TopSectionRightContent">
      <ChainSelector />
      <WalletConnectModal useNewUI={true} />
    </RightContent>
  </PanelBox>
));
