import { Typography } from 'brokoli-ui';
import React from 'react';

import { ContainerBox, NoAMMFoundBox, PillBox, Subheading } from './NoAMMFound.styled';

export const NoAMMFound: React.FunctionComponent = React.memo(() => (
  <ContainerBox>
    <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Bold">
      🧐 OOPS!
    </Typography>
    <Subheading colorToken="lavenderWeb2" typographyToken="primaryBodyMediumRegular">
      It seems we cannot find the pool you are after!
    </Subheading>
    <NoAMMFoundBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodyMediumRegular">
        <PillBox text="¯\_(ツ)_/¯" variant="wildStrawberry" />
        Double check the page link. Perhaps there is a typo or the vault is not longer supported.
      </Typography>
    </NoAMMFoundBox>
  </ContainerBox>
));
