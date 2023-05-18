import { AppLink, ExternalLink, Typography } from 'brokoli-ui';
import React from 'react';

import { ContainerBox } from './GenericError.styled';

export const GenericError: React.FunctionComponent<{
  to: string;
}> = React.memo(({ to }) => (
  <ContainerBox>
    <Typography
      colorToken="wildStrawberry"
      data-testid="GenericError-Title"
      typographyToken="primaryHeader1Black"
    >
      Oops... Something went wrong!
    </Typography>
    <Typography
      colorToken="lavenderWeb2"
      data-testid="GenericError-Subtitle"
      typographyToken="primaryBodyMediumRegular"
    >
      Unfortunately we couldn't process your request. We encourage you to&nbsp;
      <ExternalLink
        colorToken="skyBlueCrayola"
        href="https://discord.com/channels/896685581487210577/1005057396160336004"
        typographyToken="primaryBodyMediumRegular"
      >
        report
      </ExternalLink>
      &nbsp; this to our support team, and in the meantime please{' '}
      <AppLink
        colorToken="skyBlueCrayola"
        data-testid="GenericError-AppLink"
        to={to}
        typographyToken="primaryBodyMediumRegular"
      >
        visit our pool page.
      </AppLink>
    </Typography>
  </ContainerBox>
));
