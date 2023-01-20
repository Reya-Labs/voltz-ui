import React from 'react';

import { IconLabel } from '../../../../../components/composite/IconLabel/IconLabel';
import { GasCostTokenTypography } from '../../../../../components/interface/AutomaticRolloverToggle/ActiveRolloverModalContent/ActiveRolloverModalContent.styled';
import { formatCurrency } from '../../../../../utilities/number';
import { FormActionButton } from '../FormActionButton/FormActionButton';
import { HintText } from '../HintText/HintText';
import {
  BatchFeeContentBox,
  BatchFeeCurrencyTypography,
  BatchFeeTextTypography,
  BatchFeeValueTypography,
  ButtonBox,
  CancelButton,
  ContentBox,
  DescriptionTypography,
  GasCostBox,
  GasCostInputLabel,
  GasCostTypography,
  GasIcon,
  TitleTypography,
} from './ConfirmDepositModalContent.styled';

type Props = {
  onProceed: () => void;
  onCancel: () => void;
  hintText: {
    text: string;
    suffixText?: string;
    textColor?: string;
  };
  submitText: string;
  disabled: boolean;
  loading: boolean;
  success: boolean;
  gasCost: number;
  batchFee: number;
};

export const ConfirmDepositModalContent: React.FunctionComponent<Props> = ({
  onCancel,
  onProceed,
  loading,
  success,
  hintText,
  submitText,
  disabled,
  gasCost,
  batchFee,
}) => (
  <ContentBox>
    <TitleTypography>Deposit</TitleTypography>
    <DescriptionTypography>
      When depositing funds in the Optimiser, users pay a contribution to the batch budget fund.
      Batches are done to reduce the gas cost of depositing in pools by splitting the costs between
      those depositing funds.
    </DescriptionTypography>
    <BatchFeeContentBox>
      <BatchFeeTextTypography>
        BATCH FEE&nbsp;
        {batchFee === -1 ? (
          <BatchFeeCurrencyTypography>---</BatchFeeCurrencyTypography>
        ) : (
          <>
            $
            <BatchFeeCurrencyTypography>
              $<BatchFeeValueTypography>{formatCurrency(batchFee)} USD</BatchFeeValueTypography>
            </BatchFeeCurrencyTypography>
          </>
        )}
      </BatchFeeTextTypography>
    </BatchFeeContentBox>
    <GasCostBox>
      <GasIcon />
      <GasCostTokenTypography dataTestId="ConfirmDepositModalContent-GasCostTypography">
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
        dataTestId="ConfirmDepositModalContent-DepositButton"
        disabled={disabled}
        loading={loading}
        success={success}
        variant="blue"
        onClick={onProceed}
      >
        {submitText}
      </FormActionButton>
      <CancelButton
        data-testid="ConfirmDepositModalContent-CancelButton"
        disabled={loading}
        onClick={onCancel}
      >
        CANCEL
      </CancelButton>
    </ButtonBox>
    <HintText {...hintText} loading={loading} />
  </ContentBox>
);
