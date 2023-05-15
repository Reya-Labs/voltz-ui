import { Button, CloseButton, HorizontalLine, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  closeRolloverConfirmationFlowAction,
  confirmLpRolloverThunk,
  selectRolloverConfirmationFlowError,
  selectRolloverLpFormAMM,
} from '../../../../../../app/features/forms/rollover-lp-form';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
  MarketTokenInformation,
  MarketTokenInformationProps,
} from '../../../../../components/MarketTokenInformation';
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
