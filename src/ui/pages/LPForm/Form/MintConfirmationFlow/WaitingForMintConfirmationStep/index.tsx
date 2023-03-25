import { RainbowLoader, Typography } from 'brokoli-ui';
import React from 'react';

import {
  RainbowLoaderBox,
  WaitingForMintConfirmationStepBox,
} from './WaitingForMintConfirmationStep.styled';

// todo: consider making Adding or Removing Liquidity dynamic similar to submit button labels? 
export const WaitingForMintConfirmationStep: React.FunctionComponent = () => {
  return (
    <WaitingForMintConfirmationStepBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Waiting for confirmation
      </Typography>
      <RainbowLoaderBox>
        <RainbowLoader height={2} text="Adding or Removing Liquidity" />
      </RainbowLoaderBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Confirm this transaction in your wallet
      </Typography>
    </WaitingForMintConfirmationStepBox>
  );
};
