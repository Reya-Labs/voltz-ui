import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { ContentBox, MainContentBox } from './NoVaultsFound.styled';

export const NoVaultsFound: React.FunctionComponent<{
  title: string;
  description: string;
  navigateTo?: string;
  navigateToText?: string;
}> = ({ title, description, navigateTo, navigateToText }) => (
  <MainContentBox>
    <ContentBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Black">
        {title}
      </Typography>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
        {description}
      </Typography>
      {navigateTo && navigateToText ? (
        <AppLink
          colorToken="skyBlueCrayola"
          data-testid="NoPositionsOrVaultsFound-NavigateButton"
          to={navigateTo}
          typographyToken="primaryBodyMediumRegular"
        >
          {navigateToText}
        </AppLink>
      ) : null}
    </ContentBox>
  </MainContentBox>
);
