import { Button, CloseButton, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../app/features/forms/common';
import { TitleBox } from '../../../../../components/SettleFlow/SettleConfirmationStep/SettleConfirmationStep.styled';
import { GasCost } from '../../GasCost/GasCost';
import { HintText } from '../../HintText/HintText';
import {
  BatchBudgetValueBox,
  BatchFeeContentBox,
  ButtonBox,
  ContentBox,
} from './ConfirmBatchBudgetModalContent.styled';

type Props = {
  onProceed: () => void;
  onCancel: () => void;
  hintText: string;
  error: boolean;
  submitText: string;
  disabled: boolean;
  loading: boolean;
  success: boolean;
  gasCost: number;
  batchBudgetUSD: number;
  batchBudgetUnderlying: number;
  token: string;
};

export const ConfirmBatchBudgetModalContent: React.FunctionComponent<Props> = ({
  onCancel,
  onProceed,
  loading,
  success,
  hintText,
  submitText,
  disabled,
  error,
  gasCost,
  batchBudgetUSD,
  batchBudgetUnderlying,
  token,
}) => (
  <ContentBox data-testid="ConfirmBatchBudgetModalContent-ContentBox">
    <TitleBox>
      <Typography
        colorToken="white100"
        data-testid="ConfirmBatchBudgetModalContent-TitleTypography"
        typographyToken="primaryHeader3Bold"
      >
        Batch deposits
      </Typography>
      <CloseButton onClick={onCancel} />
    </TitleBox>
    <Typography
      colorToken="white400"
      data-testid="ConfirmBatchBudgetModalContent-DescriptionTypography"
      typographyToken="primaryBodyMediumRegular"
    >
      When depositing funds in the Optimiser, users pay a contribution to the batch budget fund.
      These funds can be claimed by anyone by triggering the Optimiser batch.
    </Typography>
    <GasCost gasCost={gasCost} />
    <BatchFeeContentBox>
      <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
        Batch Budget&nbsp;
      </Typography>
      {batchBudgetUSD === -1 ? (
        <BatchBudgetValueBox>
          <Typography
            colorToken="white400"
            data-testid="ConfirmBatchBudgetModalContent-BatchBudgetLoading"
            typographyToken="primaryBodySmallRegular"
          >
            ---
          </Typography>
        </BatchBudgetValueBox>
      ) : (
        <BatchBudgetValueBox>
          <TokenTypography
            colorToken="primary"
            data-testid="ConfirmBatchBudgetModalContent-BatchBudgetUnderlyingTypography"
            token={` ${token.toUpperCase()}`}
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(batchBudgetUnderlying)}
          />
          <TokenTypography
            colorToken="white"
            data-testid="ConfirmBatchBudgetModalContent-BatchBudgetTextTypography"
            prefixToken="$"
            token=" USD"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(batchBudgetUSD)}
          />
        </BatchBudgetValueBox>
      )}
    </BatchFeeContentBox>
    <ButtonBox>
      <Button
        data-testid="ConfirmBatchBudgetModalContent-BatchButton"
        disabled={disabled}
        loading={loading}
        variant="primary"
        onClick={onProceed}
      >
        {submitText}
      </Button>
      <Button
        data-testid="ConfirmBatchBudgetModalContent-CancelButton"
        disabled={loading}
        variant="secondary"
        onClick={onCancel}
      >
        {success ? 'Back' : 'Cancel'}
      </Button>
    </ButtonBox>
    <HintText error={error} loading={loading} success={success} text={hintText} />
  </ContentBox>
);
