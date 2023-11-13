import { AppLink, ExternalLink, Typography } from 'brokoli-ui';
import React from 'react';

import { routes } from '../../../../app';
import { ContainerBox } from './NoVaultFound.styled';

export const NoVaultFound: React.FunctionComponent = React.memo(() => (
  <ContainerBox>
    <Typography
      colorToken="error100"
      data-testid="NoVaultFound-Title"
      typographyToken="primaryHeader1Black"
    >
      Oops... Something went wrong!
    </Typography>
    <Typography
      colorToken="white300"
      data-testid="NoVaultFound-Subtitle"
      typographyToken="primaryBodyMediumRegular"
    >
      Double check the page link. Perhaps there is a typo or the vault is not longer supported. We
      encourage you to&nbsp;
      <ExternalLink
        colorToken="primary"
        href="https://discord.com/channels/896685581487210577/1005057396160336004"
        typographyToken="primaryBodyMediumRegular"
      >
        report
      </ExternalLink>
      &nbsp; this to our support team, and in the meantime please{' '}
      <AppLink
        colorToken="primary"
        data-testid="GenericError-AppLink"
        to={`/${routes.LP_OPTIMISERS}`}
        typographyToken="primaryBodyMediumRegular"
      >
        visit the vaults page.
      </AppLink>
    </Typography>
  </ContainerBox>
));
