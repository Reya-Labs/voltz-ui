import React from 'react';

import { VoltzLogoBox, VoltzLogoIcon } from './VoltzLogo.styled';

export const VoltzLogo: React.FunctionComponent = React.memo(() => (
  <VoltzLogoBox>
    <VoltzLogoIcon
      data-testid="LeftPanel-VoltzLogo"
      onClick={() => {
        window.open('https://voltz.xyz', '_blank');
      }}
    />
  </VoltzLogoBox>
));
