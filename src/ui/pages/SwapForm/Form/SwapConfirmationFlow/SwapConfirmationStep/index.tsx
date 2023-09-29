import { Button, CloseButton, HorizontalLine, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../../app';
import {
  closeSwapConfirmationFlowAction,
  selectSwapConfirmationFlowError,
  selectSwapFormPool,
  swapThunk,
} from '../../../../../../app/features/forms/trader/swap';
import { MarketTokenInformationProps } from '../../../../../components/MarketTokenInformation';
import { MarketTokenInformationCompact } from '../../../../../components/MarketTokenInformationCompact';
import { TransactionDetails } from '../../TransactionDetails';
import { SwapDetails } from '../SwapDetails';
import {
  SwapConfirmationStepBox,
  SwapDetailsBox,
  SwapFeeDetailsBox,
  TitleBox,
} from './SwapConfirmationStep.styled';

export const SwapConfirmationStep: React.FunctionComponent = () => {
  const pool = useAppSelector(selectSwapFormPool);
  const dispatch = useAppDispatch();
  const handleConfirmSwap = useCallback(() => {
    void dispatch(swapThunk());
  }, [dispatch]);
  const error = useAppSelector(selectSwapConfirmationFlowError);
  const handleCloseButtonClick = useCallback(() => {
    dispatch(closeSwapConfirmationFlowAction());
  }, [dispatch]);
  if (!pool) {
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
        <MarketTokenInformationCompact
          market={pool.market as MarketTokenInformationProps['market']}
          token={pool.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token']}
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
