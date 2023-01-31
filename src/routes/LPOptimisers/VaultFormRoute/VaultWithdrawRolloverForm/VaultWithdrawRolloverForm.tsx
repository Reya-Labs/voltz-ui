import { rollover as executeRollover, withdraw as executeWithdraw } from '@voltz-protocol/v1-sdk';
import React, { useState } from 'react';

import { OptimiserInfo, updateOptimiserState } from '../../../../app/features/stateless-optimisers';
import { useAppDispatch } from '../../../../app/hooks';
import { useWallet } from '../../../../hooks/useWallet';
import { getSpareWeights } from '../../Helpers/getSpareWeights';
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
  const appDispatch = useAppDispatch();

  const subvault = vault.vaults[vaultIndex];

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

  const spareWeights = getSpareWeights(vault.vaults, weights);

  const withdraw = () => {
    if (!signer) {
      return;
    }

    if (!subvault.withdrawable) {
      return;
    }

    setWithdrawOrRolloverState(WithdrawStates.WITHDRAW_PENDING);
    void executeWithdraw({
      optimiserId: vault.optimiserId,
      vaultId: subvault.vaultId,
      signer,
    }).then(
      ({ newOptimiserState }) => {
        if (newOptimiserState) {
          void appDispatch(
            updateOptimiserState({
              optimiserId: vault.optimiserId,
              newOptimiserState,
            }),
          );
        }

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

    if (!subvault.rolloverable) {
      return;
    }

    setWithdrawOrRolloverState(RolloverStates.ROLLOVER_PENDING);
    void executeRollover({
      optimiserId: vault.optimiserId,
      vaultId: subvault.vaultId,
      spareWeights,
      signer,
    }).then(
      ({ newOptimiserState }) => {
        if (newOptimiserState) {
          void appDispatch(
            updateOptimiserState({
              optimiserId: vault.optimiserId,
              newOptimiserState,
            }),
          );
        }

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
      depositValue={subvault.userVaultCommittedDeposit}
      distribution={distribution}
      hintText={submissionState.hintText}
      lpVault={vault}
      rolloverDisabled={
        submissionState.disabled || loading || combinedWeightValue !== 100 || !subvault.rolloverable
      }
      rolloverLoading={submissionState.rollover.loading}
      rolloverSubmitText={submissionState.rollover.submitText}
      rolloverSuccess={submissionState.rollover.success}
      weights={weights}
      withdrawDisabled={submissionState.disabled || loading || !subvault.withdrawable}
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
