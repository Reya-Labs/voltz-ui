import { MellowProduct } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import { AutomaticRolloverToggleProps } from '../../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { formatCurrency } from '../../../../../utilities/number';
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
  depositValue: number;
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
  automaticRolloverGasCost: MaturityDistributionProps['automaticRolloverGasCost'];
  weights: MaturityDistributionProps['weights'];
  distribution: MaturityDistributionProps['distribution'];
  onDistributionToggle: MaturityDistributionProps['onDistributionToggle'];
  onManualDistributionsUpdate: MaturityDistributionProps['onManualDistributionsUpdate'];
  automaticRolloverState: AutomaticRolloverToggleProps['automaticRolloverState'];
  automaticRolloverChangePromise: AutomaticRolloverToggleProps['onChangePromise'];
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
  automaticRolloverState,
  automaticRolloverChangePromise,
  automaticRolloverGasCost,
}: FormProps) => {
  const subtext = `WALLET BALANCE: ${
    isUndefined(lpVault.userWalletBalance)
      ? '---'
      : `${formatCurrency(lpVault.userWalletBalance, true)} ${lpVault.metadata.token}`
  }`;

  return (
    <FormBox>
      <DepositInfo mellowProduct={lpVault} weights={weights.map((w) => w.distribution)} />
      <MaturityDistribution
        automaticRolloverChangePromise={automaticRolloverChangePromise}
        automaticRolloverGasCost={automaticRolloverGasCost}
        automaticRolloverState={automaticRolloverState}
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
        onChange={onChangeDeposit}
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
