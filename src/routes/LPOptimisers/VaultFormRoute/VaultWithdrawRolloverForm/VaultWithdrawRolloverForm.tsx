import { MellowLpRouter, MellowProduct } from '@voltz-protocol/v1-sdk';
import React, { useState } from 'react';

import { FormProps } from '../Form/DepositForm/DepositForm';
import { WithdrawRolloverForm } from '../Form/WithdrawRolloverForm/WithdrawRolloverForm';
import { getSubmissionState, RolloverStates, WithdrawStates } from './mappers';

export type VaultWithdrawRolloverFormProps = {
  vault: MellowProduct;
  onGoBack: () => void;
  loading: boolean;
  vaultIndex: number;
};

export const VaultWithdrawRolloverForm: React.FunctionComponent<VaultWithdrawRolloverFormProps> = ({
  loading,
  vault,
  vaultIndex,
  onGoBack,
}) => {
  const automaticWeights: FormProps['weights'] = vault.metadata.vaults.map((v) => ({
    distribution: v.weight,
    maturityTimestamp: v.maturityTimestampMS,
    pools: v.pools,
    vaultDisabled: v.weight === 0,
  }));

  const [distribution, setDistribution] = useState<'automatic' | 'manual'>('automatic');
  const [manualWeights, setManualWeights] = useState<FormProps['weights']>(
    automaticWeights.map((a) => ({ ...a })),
  );
  const [withdrawOrRolloverState, setWithdrawOrRolloverState] = useState<
    WithdrawStates | RolloverStates
  >(WithdrawStates.READY);
  const [error, setError] = useState<string>('');

  const weights = distribution === 'automatic' ? automaticWeights : manualWeights;
  const combinedWeightValue = weights.reduce((total, weight) => total + weight.distribution, 0);

  const withdraw = () => {
    if (!vault.withdrawable(vaultIndex)) {
      return;
    }
    setWithdrawOrRolloverState(WithdrawStates.WITHDRAW_PENDING);
    void vault.withdraw(vaultIndex).then(
      () => {
        setWithdrawOrRolloverState(WithdrawStates.WITHDRAW_DONE);
      },
      (err: Error) => {
        setError(`Withdraw failed. ${err.message ?? ''}`);
        setWithdrawOrRolloverState(WithdrawStates.WITHDRAW_FAILED);
      },
    );
  };

  const rollover = () => {
    if (!vault.rolloverable(vaultIndex)) {
      return;
    }
    setWithdrawOrRolloverState(RolloverStates.ROLLOVER_PENDING);
    void (vault as MellowLpRouter)
      .rollover(
        vaultIndex,
        weights.map((w) => w.distribution),
      )
      .then(
        () => {
          setWithdrawOrRolloverState(RolloverStates.ROLLOVER_DONE);
        },
        (err: Error) => {
          setError(`Rollover failed. ${err.message ?? ''}`);
          setWithdrawOrRolloverState(RolloverStates.ROLLOVER_FAILED);
        },
      );
  };

  const submissionState = getSubmissionState({
    rollover,
    withdraw,
    withdrawOrRolloverState,
    error,
    tokenName: vault.metadata.token,
    loading,
  });

  return (
    <WithdrawRolloverForm
      combinedWeightValue={combinedWeightValue}
      depositValue={vault.userIndividualCommittedDeposits[vaultIndex].toString()}
      distribution={distribution}
      hintText={submissionState.hintText}
      lpVault={vault}
      rolloverDisabled={submissionState.disabled || loading || combinedWeightValue !== 100}
      rolloverHidden={!vault.rolloverable(vaultIndex)}
      rolloverLoading={submissionState.rollover.loading}
      rolloverSubmitText={submissionState.rollover.submitText}
      rolloverSuccess={submissionState.withdraw.success}
      weights={weights}
      withdrawDisabled={submissionState.disabled || loading}
      withdrawHidden={!vault.withdrawable}
      withdrawLoading={submissionState.withdraw.loading}
      withdrawSubmitText={submissionState.withdraw.submitText}
      withdrawSuccess={submissionState.rollover.success}
      onDistributionToggle={setDistribution}
      onGoBack={onGoBack}
      onManualDistributionsUpdate={setManualWeights}
      onRolloverClick={submissionState.rollover.action}
      onWithdrawClick={submissionState.withdraw.action}
    />
  );
};
