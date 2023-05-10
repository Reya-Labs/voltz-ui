import { RainbowLoader, Typography } from 'brokoli-ui';
import React from 'react';

import {
  RainbowLoaderBox,
  WaitingForConfirmationStepBox,
} from './WaitingForConfirmationStep.styled';

export const WaitingForConfirmationStep: React.FunctionComponent = () => (
  <WaitingForConfirmationStepBox>
    <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
      Waiting for confirmation
    </Typography>
    <RainbowLoaderBox>
      <RainbowLoader height={2} text="Settling..." />
    </RainbowLoaderBox>
    <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
      Confirm this transaction in your wallet
    </Typography>
  </WaitingForConfirmationStepBox>
);
