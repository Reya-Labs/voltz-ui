import { Button, CloseButton, HorizontalLine, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  closeSwapConfirmationFlowAction,
  confirmSwapThunk,
  selectSwapConfirmationFlowError,
  selectSwapFormAMM,
} from '../../../../../../app/features/forms/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
  MarketTokenInformation,
  MarketTokenInformationProps,
} from '../../../../../components/MarketTokenInformation';
import { TransactionDetails } from '../../TransactionDetails';
import { SwapDetails } from '../SwapDetails';
import {
  SwapConfirmationStepBox,
  SwapDetailsBox,
  SwapFeeDetailsBox,
  TitleBox,
} from './SwapConfirmationStep.styled';

export const SwapConfirmationStep: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectSwapFormAMM);
  const dispatch = useAppDispatch();
  const handleConfirmSwap = useCallback(() => {
    void dispatch(confirmSwapThunk());
  }, [dispatch]);
  const error = useAppSelector(selectSwapConfirmationFlowError);
  const handleCloseButtonClick = useCallback(() => {
    dispatch(closeSwapConfirmationFlowAction());
  }, [dispatch]);
  if (!aMM) {
    return null;
  }

  return (
    <SwapConfirmationStepBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Confirm Swap
        </Typography>
        <CloseButton onClick={handleCloseButtonClick} />
      </TitleBox>
      <SwapDetailsBox>
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
        <SwapDetails />
      </SwapDetailsBox>
      <HorizontalLine />
      <SwapFeeDetailsBox>
        <TransactionDetails />
      </SwapFeeDetailsBox>
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        variant="primary"
        onClick={handleConfirmSwap}
      >
        Confirm Swap
      </Button>
    </SwapConfirmationStepBox>
  );
};
