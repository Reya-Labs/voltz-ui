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
  onChangeDeposit: (value: number) => void;
  depositValue: string;
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

export const DepositForm: React.FunctionComponent<FormProps> = ({
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
  depositValue,
}: FormProps) => {
  const subtext = `WALLET BALANCE: ${
    isUndefined(lpVault.userWalletBalance)
      ? '---'
      : `${formatCurrency(lpVault.userWalletBalance, true)} ${lpVault.metadata.token}`
  }`;

  const handleChange = (newValue: string | undefined) => {
    const usFormatted = toUSFormat(newValue);
    onChangeDeposit(!isUndefined(usFormatted) ? parseFloat(usFormatted) : 0);
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
        disabled={false}
        subtext={subtext}
        token={lpVault.metadata.token}
        value={depositValue}
        onChange={handleChange}
      />
      <FullButtonBox>
        <ButtonBox>
          <FormActionButton
            dataTestId="DepositButton"
            disabled={disabled}
            loading={loading}
            success={success}
            variant="blue"
            onClick={onSubmit}
          >
            {submitText}
          </FormActionButton>
          <BackButton onClick={onGoBack}>BACK</BackButton>
        </ButtonBox>

        <HintText {...hintText} loading={loading} />
      </FullButtonBox>

      <AboutYourFunds depositsText="Deposits" />
    </FormBox>
  );
};
