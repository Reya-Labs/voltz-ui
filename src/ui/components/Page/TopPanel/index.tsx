import React from 'react';

import { VoltzLogo } from '../VoltzLogo';
import { ChainSelector } from './ChainSelector';
import { Nav } from './Nav';
import { LogoAndNavBox, PanelBox, RightContent } from './TopPanel.styled';
import { WalletConnectModal } from './WalletConnectModal';

export const TopPanel: React.FunctionComponent<{
  showLogo: boolean;
}> = React.memo(({ showLogo }) => (
  <PanelBox data-testid="TopPanel-PanelBox">
    {showLogo ? (
      <LogoAndNavBox>
        <VoltzLogo />
        <Nav />
      </LogoAndNavBox>
    ) : (
      <Nav />
    )}
    <RightContent data-testid="TopPanel-TopSectionRightContent">
      <ChainSelector />
      <WalletConnectModal />
    </RightContent>
  </PanelBox>
));
