import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { routes } from '../../../../../app';
import { ContentBox } from './NoVaultsFound.styled';

export const NoVaultsFound: React.FunctionComponent<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <ContentBox>
    <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Black">
      {title}
    </Typography>
    <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
      {description}&nbsp;
      <AppLink
        colorToken="skyBlueCrayola"
        data-testid="NoPositionsOrVaultsFound-NavigateButton"
        to={`/${routes.LP_OPTIMISERS}`}
        typographyToken="primaryBodyMediumRegular"
      >
        LP Optimisers
      </AppLink>
    </Typography>
  </ContentBox>
);
