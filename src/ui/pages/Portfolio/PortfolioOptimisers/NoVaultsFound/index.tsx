import { Typography } from 'brokoli-ui';
import React from 'react';

import { routes } from '../../../../../app';
import { VoltzAppLink } from '../../../../components/VoltzAppLink';
import { ContentBox } from './NoVaultsFound.styled';

export const NoVaultsFound: React.FunctionComponent<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <ContentBox>
    <Typography colorToken="white100" typographyToken="primaryHeader1Black">
      {title}
    </Typography>
    <Typography colorToken="white100" typographyToken="primaryBodyMediumRegular">
      {description}&nbsp;
      <VoltzAppLink
        colorToken="primary"
        data-testid="NoPositionsOrVaultsFound-NavigateButton"
        to={`/${routes.LP_OPTIMISERS}`}
        typographyToken="primaryBodyMediumRegular"
      >
        LP Optimisers
      </VoltzAppLink>
    </Typography>
  </ContentBox>
);
