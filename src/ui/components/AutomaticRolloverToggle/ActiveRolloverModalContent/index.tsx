import { Button, ColorTokens, Ellipsis, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../app/features/forms/common';
import { Icon } from '../../Icon/Icon';
import { ButtonBox, ContentBox, GasCostBox } from './ActiveRolloverModalContent.styled';

type Props = {
  onProceed: () => void;
  onCancel: () => void;
  gasCost: number;
  transactionStatusText: string;
  transactionStatus: 'idle' | 'pending' | 'error' | 'success';
  triggersOnChainTransaction: boolean;
};

const TransactionStatusColorMap: Record<Props['transactionStatus'], ColorTokens> = {
  idle: 'white300',
  pending: 'white300',
  error: 'error100',
  success: 'primary100',
};

export const ActiveRolloverModalContent: React.FunctionComponent<Props> = ({
  onCancel,
  onProceed,
  transactionStatus,
  transactionStatusText,
  gasCost,
  triggersOnChainTransaction,
}) => {
  const loading = transactionStatus === 'pending';
  return (
    <ContentBox>
      <Typography colorToken="white100" typographyToken="primaryHeader3Bold">
        Automatic Rollover
      </Typography>
      <Typography colorToken="white100" typographyToken="primaryBodyMediumRegular">
        {!triggersOnChainTransaction
          ? `This configuration will be applied to all your funds in this Optimiser when you confirm the new deposit.
Your choice will be saved on chain, so there will be an additional one-time, small gas fee.`
          : 'This transaction will save your choice on chain, so there will be a small gas fee.'}
      </Typography>
      <GasCostBox>
        <Icon name="gasIcon" />
        <TokenTypography
          colorToken="white"
          prefixToken="$"
          token=""
          typographyToken="primaryBodySmallRegular"
          value={formFormatNumber(gasCost)}
        />
      </GasCostBox>
      <ButtonBox>
        <Button disabled={loading} variant="primary" onClick={onProceed}>
          Proceed
        </Button>
        <Button disabled={loading} variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </ButtonBox>
      {!triggersOnChainTransaction ? null : (
        <Typography
          colorToken={TransactionStatusColorMap[transactionStatus]}
          typographyToken="primaryBodySmallBold"
        >
          {transactionStatusText}
          {loading && <Ellipsis />}
        </Typography>
      )}
    </ContentBox>
  );
};
