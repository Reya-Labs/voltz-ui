import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { ContainerBox } from './NoMarginAccountFound.styled';

export const NoMarginAccountFound: React.FunctionComponent<{
  to: string;
}> = React.memo(({ to }) => (
  <ContainerBox>
    <Typography
      colorToken="lavenderWeb"
      data-testid="NoMarginAccountFound-Title"
      typographyToken="primaryHeader1Black"
    >
      Margin account not found
    </Typography>
    <Typography
      colorToken="lavenderWeb2"
      data-testid="NoMarginAccountFound-Subtitle"
      typographyToken="primaryBodyMediumRegular"
    >
      Unfortunately we couldn't fetch any existing margin account matching this criteria. We
      encourage you to{' '}
      <AppLink
        colorToken="skyBlueCrayola"
        data-testid="NoMarginAccountFound-AppLink"
        to={to}
        typographyToken="primaryBodyMediumRegular"
      >
        visit our pool page
      </AppLink>
    </Typography>
  </ContainerBox>
));
