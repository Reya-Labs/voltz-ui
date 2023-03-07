import { RainbowLoader, Typography } from 'brokoli-ui';
import React from 'react';

import {
  RainbowLoaderBox,
  WaitingForMarginUpdateConfirmationStepBox,
} from './WaitingForMarginUpdateConfirmationStep.styled';

export const WaitingForMarginUpdateConfirmationStep: React.FunctionComponent = () => {
  return (
    <WaitingForMarginUpdateConfirmationStepBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Waiting for confirmation
      </Typography>
      <RainbowLoaderBox>
        <RainbowLoader height={3} text="Updating margin..." />
      </RainbowLoaderBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Confirm this transaction in your wallet
      </Typography>
    </WaitingForMarginUpdateConfirmationStepBox>
  );
};
