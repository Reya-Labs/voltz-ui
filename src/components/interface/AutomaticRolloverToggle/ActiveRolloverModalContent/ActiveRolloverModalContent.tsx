import React, { useEffect, useState } from 'react';

import { getSentryTracker } from '../../../../utilities/sentry';
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
  triggersOnChainTransaction: boolean;
  gasCostPromise: (registration: boolean) => Promise<number>;
  nextRolloverState: 'active' | 'inactive';
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
  triggersOnChainTransaction,
  gasCostPromise,
  nextRolloverState,
}) => {
  const TransactionStatusTypography = !triggersOnChainTransaction
    ? null
    : TransactionStatusTypographyMap[transactionStatus];
  const loading = transactionStatus === 'pending';
  const [gasCost, setGasCost] = useState<number | undefined>(undefined);
  useEffect(() => {
    gasCostPromise(nextRolloverState === 'active')
      .then(setGasCost)
      .catch((error) => {
        getSentryTracker().captureException(error);
      });
  }, [gasCostPromise]);
  return (
    <ContentBox>
      <TitleTypography>AUTOMATIC ROLLOVER</TitleTypography>
      <DescriptionTypography>
        {triggersOnChainTransaction
          ? `This configuration will be applied to all your funds in this Optimiser when you confirm the new deposit.
Your choice will be saved on chain, so there will be an additional one-time, small gas fee.`
          : 'This transaction will save your choice on chain, so there will be a small gas fee.'}
      </DescriptionTypography>
      <GasCostBox>
        <GasIcon />
        <GasCostTypography>
          {gasCost === undefined ? (
            <>
              Calculating
              <Ellipsis />
            </>
          ) : (
            gasCost
          )}
        </GasCostTypography>
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
