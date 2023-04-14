import { Button, CloseButton, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  closeMarginUpdateConfirmationFlowAction,
  confirmMarginUpdateThunk,
  selectLpFormAMM,
  selectMarginUpdateConfirmationFlowError,
} from '../../../../../../app/features/lp-form';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
  MarketTokenInformation,
  MarketTokenInformationProps,
} from '../../../../../components/MarketTokenInformation';
import { TransactionDetails } from '../../TransactionDetails';
import { MarginUpdateDetails } from '../MarginUpdateDetails';
import {
  HorizontalLine,
  MarginUpdateConfirmationStepBox,
  MarginUpdateDetailsBox,
  MarginUpdateFeeDetailsBox,
  TitleBox,
} from './MarginUpdateConfirmationStep.styled';

export const MarginUpdateConfirmationStep: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectLpFormAMM);
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
        <MarketTokenInformation
          colorToken="lavenderWeb"
          iconSize={30}
          isAaveV3={aMM.market.tags.isAaveV3}
          isBorrowing={aMM.market.tags.isBorrowing}
          isV2={aMM.market.tags.isV2}
          market={aMM.market.name as MarketTokenInformationProps['market']}
          pillVariant="regular"
          token={aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token']}
          typographyToken="primaryHeader2Black"
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
