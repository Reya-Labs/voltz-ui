import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { ContainerBox } from './NoAMMFound.styled';

export const NoAMMFound: React.FunctionComponent<{
  to: string;
}> = React.memo(({ to }) => (
  <ContainerBox>
    <Typography
      colorToken="lavenderWeb"
      data-testid="NoAMMFound-Title"
      typographyToken="primaryHeader1Black"
    >
      Gas is cheap but... Pool not found
    </Typography>
    <Typography
      colorToken="lavenderWeb2"
      data-testid="NoAMMFound-Subtitle"
      typographyToken="primaryBodyMediumRegular"
    >
      Unfortunately we couldn't fetch any existing pool matching this criteria. However we have
      several other markets currently operating,{' '}
      <AppLink
        colorToken="skyBlueCrayola"
        data-testid="NoAMMFound-AppLink"
        to={to}
        typographyToken="primaryBodyMediumRegular"
      >
        visit our pool page
      </AppLink>{' '}
      to discover those.
    </Typography>
  </ContainerBox>
));
