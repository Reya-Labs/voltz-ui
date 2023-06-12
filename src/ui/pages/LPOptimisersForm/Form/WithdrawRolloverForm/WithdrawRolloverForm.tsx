import { Button } from 'brokoli-ui';
import React from 'react';

import { OptimiserInfo } from '../../../../../app/features/lp-optimisers';
import { AboutYourFunds } from '../AboutYourFunds/AboutYourFunds';
import { ButtonBox, FormBox, FullButtonBox } from '../CommonForm.styled';
import { DepositAmountInput } from '../DepositAmountInput/DepositAmountInput';
import { DepositInfo } from '../DepositInfo/DepositInfo';
import { HintText } from '../HintText/HintText';
import {
  MaturityDistribution,
  MaturityDistributionProps,
} from '../MaturityDistribution/MaturityDistribution';

type WithdrawRolloverFormProps = {
  lpVault: OptimiserInfo;
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
  onGoBack: () => void;
  combinedWeightValue: number;
  weights: MaturityDistributionProps['weights'];
  distribution: MaturityDistributionProps['distribution'];
  onDistributionToggle: MaturityDistributionProps['onDistributionToggle'];
  onManualDistributionsUpdate: MaturityDistributionProps['onManualDistributionsUpdate'];
};

export const WithdrawRolloverForm: React.FunctionComponent<WithdrawRolloverFormProps> = ({
  lpVault,
  rolloverDisabled,
  rolloverLoading,
  rolloverSubmitText,
  onRolloverClick,
  onWithdrawClick,
  withdrawDisabled,
  withdrawLoading,
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
        canRegisterUnregister={lpVault.canRegisterUnregister}
        combinedWeightValue={combinedWeightValue}
        disabledToggle={loading}
        distribution={distribution}
        isVaultRegisteredForAutoRollover={lpVault.isUserRegisteredForAutoRollover}
        weights={weights}
        onDistributionToggle={onDistributionToggle}
        onManualDistributionsUpdate={onManualDistributionsUpdate}
      />
      <DepositAmountInput disabled={true} token={lpVault.tokenName} value={depositValue} />
      <FullButtonBox>
        <ButtonBox>
          <Button
            data-testid="WithdrawRolloverForm-WithdrawAllButton"
            disabled={withdrawDisabled}
            loading={withdrawLoading}
            variant="primary"
            onClick={onWithdrawClick}
          >
            {withdrawSubmitText}
          </Button>
          <Button
            data-testid="WithdrawRolloverForm-RolloverAllButton"
            disabled={rolloverDisabled}
            loading={rolloverLoading}
            variant="secondary"
            onClick={onRolloverClick}
          >
            {rolloverSubmitText}
          </Button>
        </ButtonBox>
        <HintText {...hintText} loading={loading} />
        <Button
          data-testid="WithdrawRolloverForm-BackButton"
          variant="secondary"
          onClick={onGoBack}
        >
          Back
        </Button>
      </FullButtonBox>
      <AboutYourFunds depositsText="Rollover deposits" />
    </FormBox>
  );
};
