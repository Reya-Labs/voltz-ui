import { RainbowLoader, Typography } from 'brokoli-ui';
import React from 'react';

import {
  RainbowLoaderBox,
  WaitingForSwapConfirmationStepBox,
} from './WaitingForSwapConfirmationStep.styled';

export const WaitingForSwapConfirmationStep: React.FunctionComponent = () => {
  return (
    <WaitingForSwapConfirmationStepBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Waiting for confirmation
      </Typography>
      <RainbowLoaderBox>
        <RainbowLoader height={2} text="Swapping Rates..." />
      </RainbowLoaderBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Confirm this transaction in your wallet
      </Typography>
    </WaitingForSwapConfirmationStepBox>
  );
};
