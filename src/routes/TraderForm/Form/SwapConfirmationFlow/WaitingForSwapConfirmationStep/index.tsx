import { RainbowLoader, Typography } from 'brokoli-ui';
import React from 'react';

import { WaitingForSwapConfirmationStepBox } from './WaitingForSwapConfirmationStep.styled';

export const WaitingForSwapConfirmationStep: React.FunctionComponent = () => {
  return (
    <WaitingForSwapConfirmationStepBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Waiting for confirmation
      </Typography>
      <RainbowLoader height={3} text="Swapping Rates..." width={335} />
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Confirm this transaction in your wallet
      </Typography>
    </WaitingForSwapConfirmationStepBox>
  );
};
