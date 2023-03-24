import { Typography } from 'brokoli-ui';
import React from 'react';

import { ContainerBox } from './NotFoundPageContent.styled';

export const NotFoundPageContent: React.FunctionComponent = React.memo(() => (
  <ContainerBox>
    <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Bold">
      404 ERROR: A WILD BROKOOLI 🥦 HAS APPEARED
    </Typography>
    <Typography colorToken="lavenderWeb2" typographyToken="primaryBodyMediumRegular">
      Oh where could it be, the page we seek
      <br />
      Lost like a broccoli in the kitchen, so unique
      <br />
      We search and search, but it's nowhere to be found
      <br />
      Leaving us with just a blank screen, without a sound 😢
    </Typography>
  </ContainerBox>
));
