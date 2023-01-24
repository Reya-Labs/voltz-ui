import React from 'react';

import { formatCurrency } from '../../../../../../utilities/number';
import { FormActionButton } from '../../FormActionButton/FormActionButton';
import { GasCost } from '../../GasCost/GasCost';
import {
  BatchBudgetTextTypography,
  BatchBudgetUnderlyingTypography,
  BatchBudgetUSDCurrencyTypography,
  BatchBudgetValueBox,
  BatchFeeContentBox,
  ButtonBox,
  CancelButton,
  ContentBox,
  DescriptionTypography,
  TitleTypography,
} from './ConfirmBatchBudgetModalContent.styled';
import { HintText } from './HintText/HintText';

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
  <ContentBox>
    <TitleTypography>Batch deposits</TitleTypography>
    <DescriptionTypography>
      When depositing funds in the Optimiser, users pay a contribution to the batch budget fund.
      These funds can be claimed by anyone by triggering the Optimiser batch.
    </DescriptionTypography>
    <GasCost gasCost={gasCost} />
    <BatchFeeContentBox>
      <BatchBudgetTextTypography>BATCH BUDGET&nbsp;</BatchBudgetTextTypography>
      {batchBudgetUSD === -1 ? (
        <BatchBudgetValueBox>
          <BatchBudgetTextTypography>---</BatchBudgetTextTypography>
        </BatchBudgetValueBox>
      ) : (
        <BatchBudgetValueBox>
          <BatchBudgetUnderlyingTypography>
            {formatCurrency(batchBudgetUnderlying)}&nbsp;
            {token.toUpperCase()}
          </BatchBudgetUnderlyingTypography>
          <BatchBudgetTextTypography>
            <BatchBudgetUSDCurrencyTypography>$</BatchBudgetUSDCurrencyTypography>
            {formatCurrency(batchBudgetUSD)} USD
          </BatchBudgetTextTypography>
        </BatchBudgetValueBox>
      )}
    </BatchFeeContentBox>
    <ButtonBox>
      <FormActionButton
        dataTestId="ConfirmBatchBudgetModalContent-BatchButton"
        disabled={disabled}
        loading={loading}
        success={success}
        variant="blue"
        onClick={onProceed}
      >
        {submitText}
      </FormActionButton>
      <CancelButton disabled={loading} onClick={onCancel}>
        {success ? 'BACK' : 'CANCEL'}
      </CancelButton>
    </ButtonBox>
    <HintText error={error} loading={loading} success={success} text={hintText} />
  </ContentBox>
);
