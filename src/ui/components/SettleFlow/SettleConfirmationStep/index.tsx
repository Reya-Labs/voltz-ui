import { Button, CloseButton, HorizontalLine, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  closeSettleFlowAction,
  confirmSettleThunk,
  selectAMMMarket,
  selectAMMToken,
  selectSettleError,
} from '../../../../app/features/settle-flow';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useWallet } from '../../../../hooks/useWallet';
import { MarketTokenInformationProps } from '../../MarketTokenInformation';
import { MarketTokenInformationCompact } from '../../MarketTokenInformationCompact';
import { SettleDetails } from '../SettleDetails';
import { TransactionDetails } from '../TransactionDetails';
import {
  ConfirmationStepBox,
  DetailsBox,
  FeeDetailsBox,
  TitleBox,
} from './SettleConfirmationStep.styled';

export const SettleConfirmationStep: React.FunctionComponent = () => {
  const market = useAppSelector(selectAMMMarket);
  const token = useAppSelector(selectAMMToken);
  const { signer } = useWallet();
  const dispatch = useAppDispatch();
  const handleConfirm = useCallback(() => {
    if (!signer) {
      return;
    }
    void dispatch(
      confirmSettleThunk({
        signer,
      }),
    );
  }, [signer, dispatch]);
  const error = useAppSelector(selectSettleError);
  const handleCloseButtonClick = useCallback(() => {
    dispatch(closeSettleFlowAction());
  }, [dispatch]);

  return (
    <ConfirmationStepBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Settling Position
        </Typography>
        <CloseButton onClick={handleCloseButtonClick} />
      </TitleBox>
      <DetailsBox>
        <MarketTokenInformationCompact
          market={market as MarketTokenInformationProps['market']}
          token={token.toLowerCase() as MarketTokenInformationProps['token']}
        />
        <SettleDetails />
      </DetailsBox>
      <HorizontalLine />
      <FeeDetailsBox>
        <TransactionDetails />
      </FeeDetailsBox>
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        variant="primary"
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </ConfirmationStepBox>
  );
};
