import { Button, CloseButton, HorizontalLine, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  closeMarginUpdateConfirmationFlowAction,
  confirmMarginUpdateThunk,
  selectMarginUpdateConfirmationFlowError,
  selectSwapFormAMM,
} from '../../../../../../app/features/forms/trader/swap';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { MarketTokenInformationProps } from '../../../../../components/MarketTokenInformation';
import { MarketTokenInformationCompact } from '../../../../../components/MarketTokenInformationCompact';
import { TransactionDetails } from '../../TransactionDetails';
import { MarginUpdateDetails } from '../MarginUpdateDetails';
import {
  MarginUpdateConfirmationStepBox,
  MarginUpdateDetailsBox,
  MarginUpdateFeeDetailsBox,
  TitleBox,
} from './MarginUpdateConfirmationStep.styled';

export const MarginUpdateConfirmationStep: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectSwapFormAMM);
  const dispatch = useAppDispatch();
  const handleConfirmMarginUpdate = useCallback(() => {
    void dispatch(confirmMarginUpdateThunk());
  }, [dispatch]);
  const error = useAppSelector(selectMarginUpdateConfirmationFlowError);
  const handleCloseButtonClick = useCallback(() => {
    dispatch(closeMarginUpdateConfirmationFlowAction());
  }, [dispatch]);

  if (!aMM) {
    return null;
  }

  return (
    <MarginUpdateConfirmationStepBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Confirm Margin Update
        </Typography>
        <CloseButton onClick={handleCloseButtonClick} />
      </TitleBox>
      <MarginUpdateDetailsBox>
        <MarketTokenInformationCompact
          market={aMM.market.name as MarketTokenInformationProps['market']}
          token={aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token']}
        />
        <MarginUpdateDetails />
      </MarginUpdateDetailsBox>
      <HorizontalLine />
      <MarginUpdateFeeDetailsBox>
        <TransactionDetails />
      </MarginUpdateFeeDetailsBox>
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        variant="primary"
        onClick={handleConfirmMarginUpdate}
      >
        Confirm Margin Update
      </Button>
    </MarginUpdateConfirmationStepBox>
  );
};
