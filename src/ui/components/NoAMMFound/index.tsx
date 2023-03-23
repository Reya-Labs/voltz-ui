import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { routes } from '../../../routes/paths';
import { ContainerBox } from './NoAMMFound.styled';

export const NoAMMFound: React.FunctionComponent = React.memo(() => (
  <ContainerBox>
    <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Black">
      Gas is cheap but... Pool not found
    </Typography>
    <Typography colorToken="lavenderWeb2" typographyToken="primaryBodyMediumRegular">
      Unfortunately we couldn't fetch any existing pool matching this criteria. However we have
      several other markets currently operating,{' '}
      <AppLink
        colorToken="skyBlueCrayola"
        to={`/${routes.TRADER_POOLS}`}
        typographyToken="primaryBodyMediumRegular"
      >
        visit our pool page
      </AppLink>{' '}
      to discover those.
    </Typography>
  </ContainerBox>
));
