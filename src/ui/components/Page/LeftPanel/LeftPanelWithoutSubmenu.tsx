import { Typography } from 'brokoli-ui';
import React from 'react';

import { VoltzLogo } from '../VoltzLogo';
import { CraftedByBoxWithoutSubmenu, PanelBox, VoltzLogoBox } from './LeftPanel.styled';

export const LeftPanelWithoutSubmenu: React.FunctionComponent = React.memo(() => (
  <PanelBox data-testid="LeftPanel-PanelBox">
    <VoltzLogoBox>
      <VoltzLogo />
    </VoltzLogoBox>
    <CraftedByBoxWithoutSubmenu data-testid="LeftPanel-CraftedByBox">
      <Typography colorToken="white100" typographyToken="primaryBodyXSmallRegular">
        Voltz
      </Typography>
      <Typography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
        {process.env.APP_VERSION}
      </Typography>
    </CraftedByBoxWithoutSubmenu>
  </PanelBox>
));
