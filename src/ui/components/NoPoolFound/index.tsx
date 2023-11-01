import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { ContainerBox } from './NoPoolFound.styled';

export const NoPoolFound: React.FunctionComponent<{
  to: string;
}> = React.memo(({ to }) => (
  <ContainerBox>
    <Typography
      colorToken="white100"
      data-testid="NoPoolFound-Title"
      typographyToken="primaryHeader1Black"
    >
      Gas is cheap but... Pool not found
    </Typography>
    <Typography
      colorToken="white300"
      data-testid="NoPoolFound-Subtitle"
      typographyToken="primaryBodyMediumRegular"
    >
      Unfortunately we couldn't fetch any existing pool matching this criteria. However we have
      several other markets currently operating,{' '}
      <AppLink
        colorToken="primary"
        data-testid="NoPoolFound-AppLink"
        to={to}
        typographyToken="primaryBodyMediumRegular"
      >
        visit our pool page
      </AppLink>{' '}
      to discover those.
    </Typography>
  </ContainerBox>
));
