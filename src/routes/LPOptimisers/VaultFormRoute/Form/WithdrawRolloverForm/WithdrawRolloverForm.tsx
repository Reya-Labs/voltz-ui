import { MellowProduct } from '@voltz-protocol/v1-sdk';
import React from 'react';

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

type WithdrawRolloverFormProps = {
  lpVault: MellowProduct;
  rolloverSubmitText: string;
  withdrawSubmitText: string;
  hintText: {
    text: string;
    suffixText?: string;
    textColor?: string;
  };
  onRolloverClick: () => void;
  onWithdrawClick: () => void;
  depositValue: number;
  rolloverDisabled: boolean;
  withdrawDisabled: boolean;
  rolloverLoading: boolean;
  withdrawLoading: boolean;
  rolloverSuccess: boolean;
  withdrawSuccess: boolean;
  onGoBack: () => void;
  combinedWeightValue: number;
  weights: MaturityDistributionProps['weights'];
  distribution: MaturityDistributionProps['distribution'];
  onDistributionToggle: MaturityDistributionProps['onDistributionToggle'];
  onManualDistributionsUpdate: MaturityDistributionProps['onManualDistributionsUpdate'];
};

export const WithdrawRolloverForm: React.FunctionComponent<WithdrawRolloverFormProps> = ({
  lpVault,
  rolloverSuccess,
  rolloverDisabled,
  rolloverLoading,
  rolloverSubmitText,
  onRolloverClick,
  onWithdrawClick,
  withdrawDisabled,
  withdrawLoading,
  withdrawSuccess,
  withdrawSubmitText,
  hintText,
  onGoBack,
  weights,
  distribution,
  onDistributionToggle,
  depositValue,
  onManualDistributionsUpdate,
  combinedWeightValue,
}: WithdrawRolloverFormProps) => {
  const loading = rolloverLoading || withdrawLoading;
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
        token={lpVault.metadata.token}
        value={depositValue}
      />
      <FullButtonBox>
        <ButtonBox>
          <FormActionButton
            dataTestId="WithdrawAllButton"
            disabled={withdrawDisabled}
            loading={withdrawLoading}
            success={withdrawSuccess}
            variant="dark-blue"
            onClick={onWithdrawClick}
          >
            {withdrawSubmitText}
          </FormActionButton>
          <FormActionButton
            dataTestId="RolloverAllButton"
            disabled={rolloverDisabled}
            loading={rolloverLoading}
            success={rolloverSuccess}
            variant="blue"
            onClick={onRolloverClick}
          >
            {rolloverSubmitText}
          </FormActionButton>
        </ButtonBox>
        <HintText {...hintText} loading={loading} />
        <BackButton onClick={onGoBack}>BACK</BackButton>
      </FullButtonBox>
      <AboutYourFunds depositsText="Rollover deposits" />
    </FormBox>
  );
};
