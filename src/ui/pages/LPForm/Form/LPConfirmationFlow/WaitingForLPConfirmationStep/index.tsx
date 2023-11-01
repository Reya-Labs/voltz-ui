import { RainbowLoader, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../app';
import { selectUserInputNotionalAmountEditMode } from '../../../../../../app/features/forms/lps/lp';
import {
  RainbowLoaderBox,
  WaitingForConfirmationStepBox,
} from './WaitingForLPConfirmationStep.styled';

export const WaitingForLPConfirmationStep: React.FunctionComponent = () => {
  const mode = useAppSelector(selectUserInputNotionalAmountEditMode);
  return (
    <WaitingForConfirmationStepBox>
      <Typography colorToken="white100" typographyToken="primaryHeader3Bold">
        Waiting for confirmation
      </Typography>
      <RainbowLoaderBox>
        <RainbowLoader
          height={2}
          text={mode === 'add' ? 'Adding Liquidity...' : 'Removing Liquidity...'}
        />
      </RainbowLoaderBox>
      <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
        Confirm this transaction in your wallet
      </Typography>
    </WaitingForConfirmationStepBox>
  );
};
