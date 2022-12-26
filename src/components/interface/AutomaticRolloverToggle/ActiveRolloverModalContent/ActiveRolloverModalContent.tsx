import React from 'react';

import { Ellipsis } from '../../../atomic/Ellipsis/Ellipsis';
import {
  ButtonBox,
  CancelButton,
  ContentBox,
  DescriptionTypography,
  ErrorTransactionStatusTextTypography,
  GasCostBox,
  GasCostTypography,
  GasIcon,
  IdleTransactionStatusTextTypography,
  PendingTransactionStatusTextTypography,
  ProceedButton,
  SuccessTransactionStatusTextTypography,
  TitleTypography,
} from './ActiveRolloverModalContent.styled';

type Props = {
  onProceed: () => void;
  onCancel: () => void;
  transactionStatusText: string;
  transactionStatus: 'idle' | 'pending' | 'error' | 'success';
};

const TransactionStatusTypographyMap: Record<Props['transactionStatus'], React.FunctionComponent> =
  {
    idle: IdleTransactionStatusTextTypography,
    pending: PendingTransactionStatusTextTypography,
    error: ErrorTransactionStatusTextTypography,
    success: SuccessTransactionStatusTextTypography,
  };

export const ActiveRolloverModalContent: React.FunctionComponent<Props> = ({
  onCancel,
  onProceed,
  transactionStatus,
  transactionStatusText,
}) => {
  const TransactionStatusTypography = TransactionStatusTypographyMap[transactionStatus];
  const loading = transactionStatus === 'pending';
  return (
    <ContentBox>
      <TitleTypography>AUTOMATIC ROLLOVER</TitleTypography>
      <DescriptionTypography>
        Your choice will be saved on chain, so there will be an additional one-time, small gas fee.
        This configuration will be applied to all your funds in this Optimiser when you confirm the
        new deposit.
      </DescriptionTypography>
      <GasCostBox>
        <GasIcon />
        <GasCostTypography>TODO: GET COST FROM SDK</GasCostTypography>
      </GasCostBox>
      <ButtonBox>
        <ProceedButton disabled={loading} onClick={onProceed}>
          PROCEED
        </ProceedButton>
        <CancelButton disabled={loading} onClick={onCancel}>
          CANCEL
        </CancelButton>
      </ButtonBox>
      {TransactionStatusTypography && (
        <TransactionStatusTypography>
          {transactionStatusText}
          {loading && <Ellipsis />}
        </TransactionStatusTypography>
      )}
    </ContentBox>
  );
};
