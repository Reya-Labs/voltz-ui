import { Button, CloseButton, HorizontalLine, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  closeRolloverConfirmationFlowAction,
  confirmSwapRolloverThunk,
  selectRolloverSwapFormAMM,
  selectSwapConfirmationFlowError,
} from '../../../../../../app/features/forms/trader/rollover-swap';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
  MarketTokenInformation,
  MarketTokenInformationProps,
} from '../../../../../components/MarketTokenInformation';
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
