import { Button, Dialog } from 'brokoli-ui';
import React from 'react';

import { OptimiserInfo } from '../../../../../app/features/lp-optimisers';
import { AutomaticRolloverToggleProps } from '../../../../components/AutomaticRolloverToggle';
import { AboutYourFunds } from '../AboutYourFunds/AboutYourFunds';
import { ButtonBox, FormBox, FullButtonBox } from '../CommonForm.styled';
import { ConfirmDepositModalContent } from '../ConfirmDepositModalContent/ConfirmDepositModalContent';
import { DepositAmountInput } from '../DepositAmountInput/DepositAmountInput';
import { DepositInfo } from '../DepositInfo/DepositInfo';
import { DepositSuccessModalContent } from '../DepositSuccessModalContent/DepositSuccessModalContent';
import {
  MaturityDistribution,
  MaturityDistributionProps,
} from '../MaturityDistribution/MaturityDistribution';

export type FormProps = {
  lpVault: OptimiserInfo;
  onChangeDeposit: (value: number) => void;
  depositValue: number;
  submitText: string;
  hintText: string;
  hintTextSuccess: boolean;
  hintTextError: boolean;
  hintTextPrefixText?: string;
  hintTextSuffixText?: string;
  onSubmit: () => void;
  disabled: boolean;
  loading: boolean;
  success: boolean;
  onGoBack: () => void;
  combinedWeightValue: number;
  isConfirmDepositModalOpen: boolean;
  isSuccessDepositModalOpen: boolean;
  isBatchFlowOpen: boolean;
  onConfirmDepositModalClose: () => void;
  onSuccessDepositModalClose: () => void;
  onBatchBudgetModalOpen: () => void;
  automaticRolloverGasCost: MaturityDistributionProps['automaticRolloverGasCost'];
  weights: MaturityDistributionProps['weights'];
  distribution: MaturityDistributionProps['distribution'];
  onDistributionToggle: MaturityDistributionProps['onDistributionToggle'];
  onManualDistributionsUpdate: MaturityDistributionProps['onManualDistributionsUpdate'];
  automaticRolloverState: AutomaticRolloverToggleProps['automaticRolloverState'];
  automaticRolloverChangePromise: AutomaticRolloverToggleProps['onChangePromise'];
  depositGasCost: number;
  depositFeeUSD: number;
  depositFeeUnderlying: number;
  depositTransactionId: string;
};

export const DepositForm: React.FunctionComponent<FormProps> = ({
  lpVault,
  onChangeDeposit,
  submitText,
  hintText,
  hintTextSuccess,
  hintTextError,
  hintTextPrefixText,
  hintTextSuffixText,
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
  isBatchFlowOpen,
  depositValue,
  automaticRolloverState,
  automaticRolloverChangePromise,
  isConfirmDepositModalOpen,
  onConfirmDepositModalClose,
  isSuccessDepositModalOpen,
  onSuccessDepositModalClose,
  onBatchBudgetModalOpen,
  automaticRolloverGasCost,
  depositGasCost,
  depositFeeUSD,
  depositFeeUnderlying,
  depositTransactionId,
}: FormProps) => {
  return (
    <>
      <FormBox>
        <DepositInfo mellowProduct={lpVault} weights={weights.map((w) => w.distribution)} />
        <MaturityDistribution
          automaticRolloverChangePromise={automaticRolloverChangePromise}
          automaticRolloverGasCost={automaticRolloverGasCost}
          automaticRolloverState={automaticRolloverState}
          canRegisterUnregister={lpVault.canRegisterUnregister}
          combinedWeightValue={combinedWeightValue}
          disabledToggle={loading}
          distribution={distribution}
          isVaultRegisteredForAutoRollover={lpVault.isUserRegisteredForAutoRollover}
          weights={weights}
          onDistributionToggle={onDistributionToggle}
          onManualDistributionsUpdate={onManualDistributionsUpdate}
        />
        <DepositAmountInput
          disabled={false}
          token={lpVault.tokenName}
          tokenName={lpVault.tokenName}
          value={depositValue}
          walletBalance={lpVault.userWalletBalance}
          onChange={onChangeDeposit}
        />
        <FullButtonBox>
          <ButtonBox>
            <Button
              data-testid="DepositButton"
              disabled={disabled}
              loading={loading}
              variant="primary"
              onClick={onSubmit}
            >
              {submitText}
            </Button>
            <Button variant="secondary" onClick={onGoBack}>
              Back
            </Button>
          </ButtonBox>
        </FullButtonBox>

        <AboutYourFunds depositsText="Deposits" />
      </FormBox>
      <>
        <Dialog open={isConfirmDepositModalOpen}>
          <ConfirmDepositModalContent
            depositFeeUnderlying={depositFeeUnderlying}
            depositFeeUSD={depositFeeUSD}
            disabled={disabled}
            gasCost={depositGasCost}
            hintText={hintText}
            hintTextError={hintTextError}
            hintTextPrefixText={hintTextPrefixText}
            hintTextSuccess={hintTextSuccess}
            hintTextSuffixText={hintTextSuffixText}
            loading={loading}
            submitText={submitText}
            success={success}
            token={lpVault.tokenName}
            onCancel={onConfirmDepositModalClose}
            onProceed={onSubmit}
          />
        </Dialog>
        <Dialog open={isSuccessDepositModalOpen}>
          <DepositSuccessModalContent
            depositTransactionId={depositTransactionId}
            isBatchFlowOpen={isBatchFlowOpen}
            lpVault={lpVault}
            onBatchBudgetModalClose={onSuccessDepositModalClose}
            onBatchBudgetModalOpen={onBatchBudgetModalOpen}
          />
        </Dialog>
      </>
    </>
  );
};
