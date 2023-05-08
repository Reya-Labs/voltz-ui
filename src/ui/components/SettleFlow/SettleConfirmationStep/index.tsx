import { Button, CloseButton, HorizontalLine, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  closeSettleFlowAction,
  confirmSettleThunk,
  selectSettleAMM,
  selectSettleError,
} from '../../../../app/features/settle-flow';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { MarketTokenInformation, MarketTokenInformationProps } from '../../MarketTokenInformation';
import { SettleDetails } from '../SettleDetails';
import { TransactionDetails } from '../TransactionDetails';
import {
  ConfirmationStepBox,
  DetailsBox,
  FeeDetailsBox,
  TitleBox,
} from './SettleConfirmationStep.styled';

export const SettleConfirmationStep: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectSettleAMM);
  const dispatch = useAppDispatch();
  const handleConfirm = useCallback(() => {
    void dispatch(confirmSettleThunk());
  }, [dispatch]);
  const error = useAppSelector(selectSettleError);
  const handleCloseButtonClick = useCallback(() => {
    dispatch(closeSettleFlowAction());
  }, [dispatch]);
  if (!aMM) {
    return null;
  }

  return (
    <ConfirmationStepBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Settling Position
        </Typography>
        <CloseButton onClick={handleCloseButtonClick} />
      </TitleBox>
      <DetailsBox>
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
