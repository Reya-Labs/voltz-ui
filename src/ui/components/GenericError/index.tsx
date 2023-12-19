import { Typography } from 'brokoli-ui';
import React from 'react';

import { VoltzAppLink } from '../VoltzAppLink';
import { ContainerBox } from './GenericError.styled';

export const GenericError: React.FunctionComponent<{
  to: string;
}> = React.memo(({ to }) => (
  <ContainerBox>
    <Typography
      colorToken="error100"
      data-testid="GenericError-Title"
      typographyToken="primaryHeader1Black"
    >
      Oops... Something went wrong!
    </Typography>
    <Typography
      colorToken="white300"
      data-testid="GenericError-Subtitle"
      typographyToken="primaryBodyMediumRegular"
    >
      Unfortunately we couldn't process your request. We encourage you to report this to our support
      team, and in the meantime please{' '}
      <VoltzAppLink
        colorToken="primary"
        data-testid="GenericError-AppLink"
        to={to}
        typographyToken="primaryBodyMediumRegular"
      >
        visit our pool page.
      </VoltzAppLink>
    </Typography>
  </ContainerBox>
));
