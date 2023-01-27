import React from 'react';

import { formatCurrency } from '../../../../utilities/number';
import { Ellipsis } from '../../../atomic/Ellipsis/Ellipsis';
import {
  ButtonBox,
  CancelButton,
  ContentBox,
  DescriptionTypography,
  ErrorTransactionStatusTextTypography,
  GasCostBox,
  GasCostTokenTypography,
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
  gasCost: number;
  transactionStatusText: string;
  transactionStatus: 'idle' | 'pending' | 'error' | 'success';
  triggersOnChainTransaction: boolean;
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
  gasCost,
  triggersOnChainTransaction,
}) => {
  const TransactionStatusTypography = !triggersOnChainTransaction
    ? null
    : TransactionStatusTypographyMap[transactionStatus];
  const loading = transactionStatus === 'pending';
  return (
    <ContentBox>
      <TitleTypography>AUTOMATIC ROLLOVER</TitleTypography>
      <DescriptionTypography>
        {!triggersOnChainTransaction
          ? `This configuration will be applied to all your funds in this Optimiser when you confirm the new deposit.
Your choice will be saved on chain, so there will be an additional one-time, small gas fee.`
          : 'This transaction will save your choice on chain, so there will be a small gas fee.'}
      </DescriptionTypography>
      <GasCostBox>
        <GasIcon />
        <GasCostTokenTypography>
          $<GasCostTypography>{formatCurrency(gasCost)}</GasCostTypography>
        </GasCostTokenTypography>
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
