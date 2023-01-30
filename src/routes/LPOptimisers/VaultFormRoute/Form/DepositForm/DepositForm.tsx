import isUndefined from 'lodash.isundefined';
import React from 'react';

import { OptimiserInfo } from '../../../../../app/features/stateless-optimisers';
import { Modal } from '../../../../../components/composite/Modal/Modal';
import { AutomaticRolloverToggleProps } from '../../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { isCostReductionFlowEnabled } from '../../../../../utilities/is-cost-reduction-flow-enabled';
import { formatCurrency } from '../../../../../utilities/number';
import { AboutYourFunds } from '../AboutYourFunds/AboutYourFunds';
import { BackButton, ButtonBox, FormBox, FullButtonBox } from '../CommonForm.styled';
import { ConfirmDepositModalContent } from '../ConfirmDepositModalContent/ConfirmDepositModalContent';
import { DepositAmountInput } from '../DepositAmountInput/DepositAmountInput';
import { DepositInfo } from '../DepositInfo/DepositInfo';
import { DepositSuccessModalContent } from '../DepositSuccessModalContent/DepositSuccessModalContent';
import { FormActionButton } from '../FormActionButton/FormActionButton';
import { HintText } from '../HintText/HintText';
import {
  MaturityDistribution,
  MaturityDistributionProps,
} from '../MaturityDistribution/MaturityDistribution';

export type FormProps = {
  lpVault: OptimiserInfo;
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
  const subtext = `WALLET BALANCE: ${
    isUndefined(lpVault.userWalletBalance)
      ? '---'
      : `${formatCurrency(lpVault.userWalletBalance, true)} ${lpVault.tokenName}`
  }`;
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
          isVaultRegisteredForAutoRollover={lpVault.isRegisteredForAutoRollover}
          weights={weights}
          onDistributionToggle={onDistributionToggle}
          onManualDistributionsUpdate={onManualDistributionsUpdate}
        />
        <DepositAmountInput
          disabled={false}
          subtext={subtext}
          token={lpVault.tokenName}
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

          {isCostReductionFlowEnabled() ? null : <HintText {...hintText} loading={loading} />}
        </FullButtonBox>

        <AboutYourFunds depositsText="Deposits" />
      </FormBox>
      {isCostReductionFlowEnabled() ? (
        <>
          <Modal open={isConfirmDepositModalOpen} onClose={onConfirmDepositModalClose}>
            <ConfirmDepositModalContent
              depositFeeUnderlying={depositFeeUnderlying}
              depositFeeUSD={depositFeeUSD}
              disabled={disabled}
              gasCost={depositGasCost}
              hintText={hintText}
              loading={loading}
              submitText={submitText}
              success={success}
              token={lpVault.tokenName}
              onCancel={onConfirmDepositModalClose}
              onProceed={onSubmit}
            />
          </Modal>
          <Modal open={isSuccessDepositModalOpen} onClose={onSuccessDepositModalClose}>
            <DepositSuccessModalContent
              depositTransactionId={depositTransactionId}
              isBatchFlowOpen={isBatchFlowOpen}
              lpVault={lpVault}
              onBatchBudgetModalClose={onSuccessDepositModalClose}
              onBatchBudgetModalOpen={onBatchBudgetModalOpen}
            />
          </Modal>
        </>
      ) : null}
    </>
  );
};
