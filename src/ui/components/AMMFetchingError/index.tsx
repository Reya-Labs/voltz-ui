import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { ContainerBox } from './AMMFetchingError.styled';

export const AMMFetchingError: React.FunctionComponent<{
  to: string;
}> = React.memo(({ to }) => (
  <ContainerBox>
    <Typography
      colorToken="wildStrawberry"
      data-testid="AMMFetchingError-Title"
      typographyToken="primaryHeader1Black"
    >
      Oops... Something went wrong!
    </Typography>
    <Typography
      colorToken="lavenderWeb2"
      data-testid="AMMFetchingError-Subtitle"
      typographyToken="primaryBodyMediumRegular"
    >
      Unfortunately we couldn't process your request. We encourage you to report this to our support
      team, and in the meantime please{' '}
      <AppLink
        colorToken="skyBlueCrayola"
        data-testid="AMMFetchingError-AppLink"
        to={to}
        typographyToken="primaryBodyMediumRegular"
      >
        visit our pool page.
      </AppLink>
    </Typography>
  </ContainerBox>
));
