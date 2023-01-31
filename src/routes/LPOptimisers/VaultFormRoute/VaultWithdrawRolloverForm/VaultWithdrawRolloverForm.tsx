import { rollover as executeRollover, withdraw as executeWithdraw } from '@voltz-protocol/v1-sdk';
import React, { useState } from 'react';

import { OptimiserInfo } from '../../../../app/features/stateless-optimisers';
import { useWallet } from '../../../../hooks/useWallet';
import { FormProps } from '../Form/DepositForm/DepositForm';
import { WithdrawRolloverForm } from '../Form/WithdrawRolloverForm/WithdrawRolloverForm';
import { getSubmissionState, RolloverStates, WithdrawStates } from './mappers';

export type VaultWithdrawRolloverFormProps = {
  vault: OptimiserInfo;
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
  const { signer } = useWallet();

  const automaticWeights: FormProps['weights'] = vault.vaults.map((v) => ({
    distribution: v.defaultWeight,
    maturityTimestamp: v.maturityTimestampMS,
    pools: v.pools,
    vaultDisabled: v.defaultWeight === 0,
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

  const spareWeights = weights
    .map((w, index): [string, number] => [vault.vaults[index].vaultId, w.distribution])
    .filter((w) => w[1] > 0);

  const withdraw = () => {
    if (!signer) {
      return;
    }

    if (!vault.vaults[vaultIndex].withdrawable) {
      return;
    }

    setWithdrawOrRolloverState(WithdrawStates.WITHDRAW_PENDING);
    void executeWithdraw({
      optimiserId: vault.optimiserId,
      vaultId: vault.vaults[vaultIndex].vaultId,
      signer,
    }).then(
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
    if (!signer) {
      return;
    }

    if (!vault.vaults[vaultIndex].rolloverable) {
      return;
    }

    setWithdrawOrRolloverState(RolloverStates.ROLLOVER_PENDING);
    void executeRollover({
      optimiserId: vault.optimiserId,
      vaultId: vault.vaults[vaultIndex].vaultId,
      spareWeights,
      signer,
    }).then(
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
    tokenName: vault.tokenName,
    loading,
  });

  return (
    <WithdrawRolloverForm
      combinedWeightValue={combinedWeightValue}
      depositValue={vault.vaults[vaultIndex].userVaultCommittedDeposit}
      distribution={distribution}
      hintText={submissionState.hintText}
      lpVault={vault}
      rolloverDisabled={
        submissionState.disabled ||
        loading ||
        combinedWeightValue !== 100 ||
        !vault.vaults[vaultIndex].rolloverable
      }
      rolloverLoading={submissionState.rollover.loading}
      rolloverSubmitText={submissionState.rollover.submitText}
      rolloverSuccess={submissionState.rollover.success}
      weights={weights}
      withdrawDisabled={
        submissionState.disabled || loading || !vault.vaults[vaultIndex].withdrawable
      }
      withdrawLoading={submissionState.withdraw.loading}
      withdrawSubmitText={submissionState.withdraw.submitText}
      withdrawSuccess={submissionState.withdraw.success}
      onDistributionToggle={setDistribution}
      onGoBack={onGoBack}
      onManualDistributionsUpdate={setManualWeights}
      onRolloverClick={submissionState.rollover.action}
      onWithdrawClick={submissionState.withdraw.action}
    />
  );
};
