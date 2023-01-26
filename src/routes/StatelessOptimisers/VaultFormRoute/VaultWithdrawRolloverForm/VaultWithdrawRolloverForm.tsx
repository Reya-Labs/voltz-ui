import React, { useState } from 'react';

import { OptimiserInfo, rolloverOptimisersThunk, withdrawOptimisersThunk } from '../../../../app/features/stateless-optimisers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useWallet } from '../../../../hooks/useWallet';
import { FormProps } from '../Form/DepositForm/DepositForm';
import { WithdrawRolloverForm } from '../Form/WithdrawRolloverForm/WithdrawRolloverForm';

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
  const dispatch = useAppDispatch();

  const weights = distribution === 'automatic' ? automaticWeights : manualWeights;
  const combinedWeightValue = weights.reduce((total, weight) => total + weight.distribution, 0);

  const withdraw = () => {
    if (!vault.vaults[vaultIndex].withdrawable) {
      return;
    }

    void dispatch(withdrawOptimisersThunk({
      optimiserId: vault.optimiserId,
      vaultId: vault.vaults[vaultIndex].vaultId,
      signer,
    }));
  };

  const rollover = () => {
    if (!vault.vaults[vaultIndex].rolloverable) {
      return;
    }
    
    void dispatch(rolloverOptimisersThunk({
      optimiserId: vault.optimiserId,
      vaultId: vault.vaults[vaultIndex].vaultId,
      spareWeights: weights.map((w, index) => [vault.vaults[index].vaultId, w.distribution]),
      signer,
    }));
  };

  const withdrawLoadedState = useAppSelector((state) => state.statelessOptimisers.withdrawLoadedState);
  const rolloverLoadedState = useAppSelector((state) => state.statelessOptimisers.rolloverLoadedState);

  const actionDisabled = loading || !(withdrawLoadedState === 'idle' && rolloverLoadedState === 'idle');

  const rolloverSubmitText = (loading) ? 'Initialising' : (rolloverLoadedState === 'pending' ? 'PENDING' : (rolloverLoadedState === 'succeeded' ? 'ROLLOVER DONE' : 'ROLLOVER'));
  const withdrawSubmitText = (loading) ? 'Initialising' : (withdrawLoadedState === 'pending' ? 'PENDING' : (withdrawLoadedState === 'succeeded' ? 'WITHDRAWN' : 'WITHDRAW ALL'));

  return (
    <WithdrawRolloverForm
      combinedWeightValue={combinedWeightValue}
      depositValue={vault.vaults[vaultIndex].userVaultCommittedDeposit || 0}
      distribution={distribution}
      hintText={{
        text: 'Initialising, please wait',
      }}
      lpVault={vault}
      rolloverDisabled={
        actionDisabled ||
        combinedWeightValue !== 100 ||
        !vault.vaults[vaultIndex].rolloverable
      }
      rolloverLoading={rolloverLoadedState === 'pending'}
      rolloverSubmitText={rolloverSubmitText}
      rolloverSuccess={rolloverLoadedState === 'succeeded'}
      weights={weights}
      withdrawDisabled={actionDisabled || !vault.vaults[vaultIndex].withdrawable}
      withdrawLoading={withdrawLoadedState === 'pending'}
      withdrawSubmitText={withdrawSubmitText}
      withdrawSuccess={withdrawLoadedState === 'succeeded'}
      onDistributionToggle={setDistribution}
      onGoBack={onGoBack}
      onManualDistributionsUpdate={setManualWeights}
      onRolloverClick={rollover}
      onWithdrawClick={withdraw}
    />
  );
};
