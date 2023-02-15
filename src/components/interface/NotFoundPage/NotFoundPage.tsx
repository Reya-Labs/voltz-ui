import React from 'react';

import { Page } from '../Page/Page';
import { ContainerBox, Heading, Subheading } from './NotFoundPage.styled';

export const NotFoundPage: React.FunctionComponent = React.memo(() => (
  <Page>
    <ContainerBox>
      <Heading variant="h1">404 ERROR: A WILD BROKOOLI 🥦 HAS APPEARED</Heading>
      <Subheading variant="body2">
        Oh where could it be, the page we seek
        <br />
        Lost like a broccoli in the kitchen, so unique
        <br />
        We search and search, but it's nowhere to be found
        <br />
        Leaving us with just a blank screen, without a sound 😢
      </Subheading>
    </ContainerBox>
  </Page>
));
