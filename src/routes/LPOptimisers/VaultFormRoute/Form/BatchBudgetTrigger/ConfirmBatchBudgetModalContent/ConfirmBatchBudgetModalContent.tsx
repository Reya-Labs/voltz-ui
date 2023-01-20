import React from 'react';

import { IconLabel } from '../../../../../../components/composite/IconLabel/IconLabel';
import { formatCurrency } from '../../../../../../utilities/number';
import { FormActionButton } from '../../FormActionButton/FormActionButton';
import {
  BatchBudgetTextTypography,
  BatchBudgetValueTypography,
  BatchFeeContentBox,
  ButtonBox,
  CancelButton,
  ContentBox,
  DescriptionTypography,
  GasCostBox,
  GasCostInputLabel,
  GasCostTokenTypography,
  GasCostTypography,
  GasIcon,
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
}) => (
  <ContentBox>
    <TitleTypography>Batch deposits</TitleTypography>
    <DescriptionTypography>
      When depositing funds in the Optimiser, users pay a contribution to the batch budget fund.
      These funds can be claimed by anyone by triggering the Optimiser batch.
    </DescriptionTypography>
    <BatchFeeContentBox>
      <BatchBudgetTextTypography>
        BATCH BUDGET&nbsp;
        {batchBudgetUSD === -1 ? (
          <BatchBudgetValueTypography>---</BatchBudgetValueTypography>
        ) : (
          <>
            $
            <BatchBudgetValueTypography>
              {formatCurrency(batchBudgetUSD)} USD
            </BatchBudgetValueTypography>
          </>
        )}
      </BatchBudgetTextTypography>
    </BatchFeeContentBox>
    <GasCostBox>
      <GasIcon />
      <GasCostTokenTypography>
        {gasCost === -1 ? (
          <GasCostTypography>---</GasCostTypography>
        ) : (
          <>
            $<GasCostTypography>{formatCurrency(gasCost)}</GasCostTypography>
          </>
        )}
      </GasCostTokenTypography>
      <GasCostInputLabel shrink>
        <IconLabel
          icon="information-circle"
          info="This gas calculation is only an estimation, and the final gas cost will be defined when the transaction is executed. You can change configurations on gas prices in your wallet provider."
          label=""
        />
      </GasCostInputLabel>
    </GasCostBox>
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
