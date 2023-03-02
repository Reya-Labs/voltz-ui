import React from 'react';

import { ChainSelector } from './ChainSelector';
import { Nav } from './Nav';
import { PanelBox, RightContent } from './TopPanel.styled';
import { WalletConnectModal } from './WalletConnectModal';

export const TopPanel: React.FunctionComponent = React.memo(() => (
  <PanelBox data-testid="TopPanel-PanelBox">
    <Nav />
    <RightContent data-testid="TopPanel-TopSectionRightContent">
      <ChainSelector />
      <WalletConnectModal />
    </RightContent>
  </PanelBox>
));
