import { MellowProduct } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import { formatCurrency, toUSFormat } from '../../../../../utilities/number';
import { AboutYourFunds } from '../AboutYourFunds/AboutYourFunds';
import { BackButton, ButtonBox, FormBox, FullButtonBox } from '../CommonForm.styled';
import { DepositAmountInput } from '../DepositAmountInput/DepositAmountInput';
import { DepositInfo } from '../DepositInfo/DepositInfo';
import { FormActionButton } from '../FormActionButton/FormActionButton';
import { HintText } from '../HintText/HintText';
import {
  MaturityDistribution,
  MaturityDistributionProps,
} from '../MaturityDistribution/MaturityDistribution';

export type FormProps = {
  lpVault: MellowProduct;
  onChangeDeposit: (value: number | undefined) => void;
  submitText: string;
  hintText: {
    text: string;
    suffixText?: string;
    textColor?: string;
  };
  onSubmit: () => void;
  disabled: boolean;
  loading: boolean;
  success: boolean;
  onGoBack: () => void;
  combinedWeightValue: number;
  weights: MaturityDistributionProps['weights'];
  distribution: MaturityDistributionProps['distribution'];
  onDistributionToggle: MaturityDistributionProps['onDistributionToggle'];
  onManualDistributionsUpdate: MaturityDistributionProps['onManualDistributionsUpdate'];
};

export const WithdrawRolloverForm: React.FunctionComponent<FormProps> = ({
  lpVault,
  onChangeDeposit,
  submitText,
  hintText,
  disabled,
  onSubmit,
  onGoBack,
  loading,
  success,
  weights,
  distribution,
  onDistributionToggle,
  onManualDistributionsUpdate,
  combinedWeightValue,
}: FormProps) => {
  const subtext = `WALLET BALANCE: ${
    isUndefined(lpVault.userWalletBalance)
      ? '---'
      : `${formatCurrency(lpVault.userWalletBalance, true)} ${lpVault.metadata.token}`
  }`;

  const handleChange = (newValue: string | undefined) => {
    const usFormatted = toUSFormat(newValue);
    onChangeDeposit(!isUndefined(usFormatted) ? parseFloat(usFormatted) : undefined);
  };

  return (
    <FormBox>
      <DepositInfo mellowProduct={lpVault} weights={weights.map((w) => w.distribution)} />
      <MaturityDistribution
        combinedWeightValue={combinedWeightValue}
        disabledToggle={loading}
        distribution={distribution}
        weights={weights}
        onDistributionToggle={onDistributionToggle}
        onManualDistributionsUpdate={onManualDistributionsUpdate}
      />
      <DepositAmountInput
        disabled={true}
        subtext={subtext}
        token={lpVault.metadata.token}
        onChange={handleChange}
      />
      <FullButtonBox>
        <ButtonBox>
          <FormActionButton
            dataTestId="WithdrawAllButton"
            disabled={disabled}
            loading={loading}
            success={success}
            variant="dark-blue"
            onClick={onSubmit}
          >
            {submitText}
          </FormActionButton>
          <FormActionButton
            dataTestId="RolloverAllButton"
            disabled={disabled}
            loading={loading}
            success={success}
            variant="blue"
            onClick={onSubmit}
          >
            {submitText}
          </FormActionButton>
        </ButtonBox>
        <HintText {...hintText} loading={loading} />
        <BackButton onClick={onGoBack}>BACK</BackButton>
      </FullButtonBox>
      <AboutYourFunds depositsText="Rollover deposits" />
    </FormBox>
  );
};
