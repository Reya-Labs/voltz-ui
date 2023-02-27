import { Typography } from 'brokoli-ui';
import React from 'react';

import { CraftedByBox, PanelBox, VoltzLogo } from './LeftPanel.styled';

export const LeftPanel: React.FunctionComponent = React.memo(() => (
  <PanelBox data-testid="LeftPanel-PanelBox">
    <VoltzLogo
      data-testid="LeftPanel-VoltzLogo"
      onClick={() => {
        window.open('https://voltz.xyz', '_blank');
      }}
    />
    <CraftedByBox data-testid="LeftPanel-CraftedByBox">
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodyXSmallRegular">
        Voltz
      </Typography>
      <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
        {process.env.APP_VERSION}
      </Typography>
    </CraftedByBox>
  </PanelBox>
));
