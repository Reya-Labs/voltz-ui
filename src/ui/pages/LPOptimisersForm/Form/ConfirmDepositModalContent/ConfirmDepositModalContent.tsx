import { Button, CloseButton, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../app/features/forms/common';
import { GasCost } from '../GasCost/GasCost';
import { HintText } from '../HintText/HintText';
import {
  ButtonBox,
  ContentBox,
  DepositBudgetValueBox,
  DepositFeeContentBox,
  TitleBox,
} from './ConfirmDepositModalContent.styled';

type Props = {
  onProceed: () => void;
  onCancel: () => void;
  hintText: string;
  hintTextSuccess: boolean;
  hintTextError: boolean;
  hintTextPrefixText?: string;
  hintTextSuffixText?: string;
  submitText: string;
  disabled: boolean;
  loading: boolean;
  success: boolean;
  gasCost: number;
  depositFeeUSD: number;
  depositFeeUnderlying: number;
  token: string;
};

export const ConfirmDepositModalContent: React.FunctionComponent<Props> = ({
  onCancel,
  onProceed,
  loading,
  success,
  submitText,
  disabled,
  gasCost,
  depositFeeUSD,
  depositFeeUnderlying,
  token,
  hintText,
  hintTextSuccess,
  hintTextError,
  hintTextPrefixText,
  hintTextSuffixText,
}) => (
  <ContentBox data-testid="ConfirmDepositModalContent-ContentBox">
    <TitleBox>
      <Typography
        colorToken="white100"
        data-testid="ConfirmDepositModalContent-TitleTypography"
        typographyToken="primaryHeader3Bold"
      >
        Deposit
      </Typography>
      <CloseButton onClick={onCancel} />
    </TitleBox>
    <Typography
      colorToken="white400"
      data-testid="ConfirmDepositModalContent-DescriptionTypography"
      typographyToken="primaryBodyMediumRegular"
    >
      When depositing funds in the Optimiser, users pay a contribution to the batch budget fund.
      Batches are done to reduce the gas cost of depositing in pools by splitting the costs between
      those depositing funds.
    </Typography>
    <GasCost gasCost={gasCost} />
    <DepositFeeContentBox>
      <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
        Batch Fee&nbsp;{' '}
      </Typography>
      {depositFeeUSD === -1 || depositFeeUnderlying === -1 ? (
        <DepositBudgetValueBox>
          <Typography
            colorToken="white400"
            data-testid="ConfirmDepositModalContent-DepositFeeLoading"
            typographyToken="primaryBodySmallRegular"
          >
            ---
          </Typography>
        </DepositBudgetValueBox>
      ) : (
        <DepositBudgetValueBox>
          <TokenTypography
            colorToken="primary"
            data-testid="ConfirmDepositModalContent-DepositBudgetUnderlyingTypography"
            token={` ${token.toUpperCase()}`}
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(depositFeeUnderlying)}
          />
          <TokenTypography
            colorToken="white"
            data-testid="ConfirmDepositModalContent-DepositBudgetTextTypography"
            prefixToken="$"
            token=" USD"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(depositFeeUSD)}
          />
        </DepositBudgetValueBox>
      )}
    </DepositFeeContentBox>
    <ButtonBox>
      <Button
        data-testid="ConfirmDepositModalContent-DepositButton"
        disabled={disabled}
        loading={loading}
        variant="primary"
        onClick={onProceed}
      >
        {submitText}
      </Button>
      <Button
        data-testid="ConfirmDepositModalContent-CancelButton"
        disabled={loading}
        variant="secondary"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </ButtonBox>
    <HintText
      error={hintTextError}
      loading={loading}
      prefixText={hintTextPrefixText}
      success={hintTextSuccess}
      suffixText={hintTextSuffixText}
      text={hintText}
    />
  </ContentBox>
);
