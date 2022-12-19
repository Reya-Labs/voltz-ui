import React from 'react';

import {
  ContentBox,
  DescriptionTypography,
  MainContentBox,
  NavigateButton,
  TitleTypography,
} from './NoPositionsOrVaultsFound.styled';

export const NoPositionsOrVaultsFound: React.FunctionComponent<{
  title: string;
  description: string;
  navigateTo?: string;
  navigateToText?: string;
}> = ({ title, description, navigateTo, navigateToText }) => (
  <MainContentBox>
    <ContentBox>
      <TitleTypography>{title}</TitleTypography>
      <DescriptionTypography>{description}</DescriptionTypography>
      {navigateTo && navigateToText ? (
        <NavigateButton data-testid="NoPositionsOrVaultsFound-NavigateButton" to={navigateTo}>
          {navigateToText}
        </NavigateButton>
      ) : null}
    </ContentBox>
  </MainContentBox>
);
