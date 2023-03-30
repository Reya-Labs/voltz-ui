import { RainbowLoader, Typography } from 'brokoli-ui';
import React from 'react';

import { selectUserInputNotionalAmountEditMode } from '../../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../../app/hooks';
import {
  RainbowLoaderBox,
  WaitingForConfirmationStepBox,
} from './WaitingForLPConfirmationStep.styled';

export const WaitingForLPConfirmationStep: React.FunctionComponent = () => {
  const mode = useAppSelector(selectUserInputNotionalAmountEditMode);
  return (
    <WaitingForConfirmationStepBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
        Waiting for confirmation
      </Typography>
      <RainbowLoaderBox>
        <RainbowLoader
          height={2}
          text={mode === 'add' ? 'Adding Liquidity' : 'Removing Liquidity'}
        />
      </RainbowLoaderBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Confirm this transaction in your wallet
      </Typography>
    </WaitingForConfirmationStepBox>
  );
};
