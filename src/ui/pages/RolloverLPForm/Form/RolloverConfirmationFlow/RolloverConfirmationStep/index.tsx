import { Button, CloseButton, HorizontalLine, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../../app';
import {
  closeRolloverConfirmationFlowAction,
  confirmLpRolloverThunk,
  selectRolloverConfirmationFlowError,
  selectRolloverLpFormAMM,
} from '../../../../../../app/features/forms/lps/rollover-lp';
import { MarketTokenInformationProps } from '../../../../../components/MarketTokenInformation';
import { MarketTokenInformationCompact } from '../../../../../components/MarketTokenInformationCompact';
import { TransactionDetails } from '../../TransactionDetails';
import { RolloverDetails } from '../RolloverDetails';
import {
  LpDetailsBox,
  LpFeeDetailsBox,
  RolloverConfirmationStepBox,
  TitleBox,
} from './RolloverConfirmationStep.styled';

export const RolloverConfirmationStep: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectRolloverLpFormAMM);
  const dispatch = useAppDispatch();
  const handleConfirmLp = useCallback(() => {
    void dispatch(confirmLpRolloverThunk());
  }, [dispatch]);
  const error = useAppSelector(selectRolloverConfirmationFlowError);
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
          Confirm
        </Typography>
        <CloseButton onClick={handleCloseButtonClick} />
      </TitleBox>
      <LpDetailsBox>
        <MarketTokenInformationCompact
          market={aMM.market.name as MarketTokenInformationProps['market']}
          token={aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token']}
        />
        <RolloverDetails />
      </LpDetailsBox>
      <HorizontalLine />
      <LpFeeDetailsBox>
        <TransactionDetails />
      </LpFeeDetailsBox>
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        variant="primary"
        onClick={handleConfirmLp}
      >
        Confirm
      </Button>
    </RolloverConfirmationStepBox>
  );
};
