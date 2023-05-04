import { RainbowLoader, Typography } from 'brokoli-ui';
import React from 'react';

import {
  RainbowLoaderBox,
  WaitingForRolloverConfirmationStepBox,
} from './WaitingForRolloverConfirmationStep.styled';

export const WaitingForRolloverConfirmationStep: React.FunctionComponent = () => {
  return (
    <WaitingForRolloverConfirmationStepBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Waiting for confirmation
      </Typography>
      <RainbowLoaderBox>
        <RainbowLoader height={2} text="Rolling over..." />
      </RainbowLoaderBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Confirm this transaction in your wallet
      </Typography>
    </WaitingForRolloverConfirmationStepBox>
  );
};
