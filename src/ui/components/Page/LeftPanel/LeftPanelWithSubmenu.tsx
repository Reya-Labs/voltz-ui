import { Typography } from 'brokoli-ui';
import React from 'react';

import { CraftedByBox, SubmenuBox } from './LeftPanel.styled';

type LeftPanelWithSubmenuProps = {
  submenu?: React.ReactNode;
};
export const LeftPanelWithSubmenu: React.FunctionComponent<LeftPanelWithSubmenuProps> = ({
  submenu,
}) => (
  <SubmenuBox data-testid="LeftPanel-PanelBox">
    {submenu}
    <CraftedByBox data-testid="LeftPanel-CraftedByBox">
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodyXSmallRegular">
        Voltz
      </Typography>
      <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
        {process.env.APP_VERSION}
      </Typography>
    </CraftedByBox>
  </SubmenuBox>
);
