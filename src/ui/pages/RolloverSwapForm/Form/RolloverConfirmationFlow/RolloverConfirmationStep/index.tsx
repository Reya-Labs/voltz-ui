import { Button, CloseButton, HorizontalLine, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../../app';
import {
  closeRolloverConfirmationFlowAction,
  confirmSwapRolloverThunk,
  selectRolloverSwapFormAMM,
  selectSwapConfirmationFlowError,
} from '../../../../../../app/features/forms/trader/rollover-swap';
import { MarketTokenInformationProps } from '../../../../../components/MarketTokenInformation';
import { MarketTokenInformationCompact } from '../../../../../components/MarketTokenInformationCompact';
import { TransactionDetails } from '../../TransactionDetails';
import { RolloverDetails } from '../RolloverDetails';
import {
  RolloverConfirmationStepBox,
  RolloverDetailsBox,
  RolloverFeeDetailsBox,
  TitleBox,
} from './RolloverConfirmationStep.styled';

export const RolloverConfirmationStep: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectRolloverSwapFormAMM);
  const dispatch = useAppDispatch();
  const handleConfirmRollover = useCallback(() => {
    void dispatch(confirmSwapRolloverThunk());
  }, [dispatch]);
  const error = useAppSelector(selectSwapConfirmationFlowError);
  const handleCloseButtonClick = useCallback(() => {
    dispatch(closeRolloverConfirmationFlowAction());
  }, [dispatch]);
  if (!aMM) {
    return null;
  }

  return (
    <RolloverConfirmationStepBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Confirm Rollover
        </Typography>
        <CloseButton onClick={handleCloseButtonClick} />
      </TitleBox>
      <RolloverDetailsBox>
        <MarketTokenInformationCompact
          market={aMM.market.name as MarketTokenInformationProps['market']}
          token={aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token']}
        />
        <RolloverDetails />
      </RolloverDetailsBox>
      <HorizontalLine />
      <RolloverFeeDetailsBox>
        <TransactionDetails />
      </RolloverFeeDetailsBox>
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        variant="primary"
        onClick={handleConfirmRollover}
      >
        Confirm Rollover
      </Button>
    </RolloverConfirmationStepBox>
  );
};
