import { Typography } from 'brokoli-ui';
import React from 'react';

import { VoltzAppLink } from '../VoltzAppLink';
import { ContainerBox } from './NoMarginAccountFound.styled';

export const NoMarginAccountFound: React.FunctionComponent<{
  to: string;
}> = React.memo(({ to }) => (
  <ContainerBox>
    <Typography
      colorToken="white100"
      data-testid="NoMarginAccountFound-Title"
      typographyToken="primaryHeader1Black"
    >
      Margin account not found
    </Typography>
    <Typography
      colorToken="white300"
      data-testid="NoMarginAccountFound-Subtitle"
      typographyToken="primaryBodyMediumRegular"
    >
      Unfortunately we couldn't fetch any existing margin account matching this criteria. We
      encourage you to{' '}
      <VoltzAppLink
        colorToken="primary"
        data-testid="NoMarginAccountFound-AppLink"
        to={to}
        typographyToken="primaryBodyMediumRegular"
      >
        visit our pool page
      </VoltzAppLink>
    </Typography>
  </ContainerBox>
));
