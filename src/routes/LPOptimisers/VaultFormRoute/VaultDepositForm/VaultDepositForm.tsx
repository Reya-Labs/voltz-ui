import { approveToken, depositAndRegister, isTokenApproved } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import { OptimiserInfo } from '../../../../app/features/stateless-optimisers';
import { AutomaticRolloverToggleProps } from '../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { useWallet } from '../../../../hooks/useWallet';
import { pushEvent } from '../../../../utilities/googleAnalytics';
import { DepositForm, FormProps } from '../Form/DepositForm/DepositForm';
import { DepositStates, getSubmissionState } from './mappers';

export type VaultDepositFormProps = {
  vault: OptimiserInfo;
  onGoBack: () => void;
  loading: boolean;
};

export const VaultDepositForm: React.FunctionComponent<VaultDepositFormProps> = ({
  loading,
  vault,
  onGoBack,
}) => {
  const { signer, account } = useWallet();

  const automaticWeights: FormProps['weights'] = vault.vaults.map((v) => ({
    distribution: v.defaultWeight,
    maturityTimestamp: v.maturityTimestampMS,
    pools: v.pools,
    vaultDisabled: v.defaultWeight === 0,
  }));
  const [depositGasCost, setDepositGasCost] = useState(-1);
  const [depositTransactionId, setDepositTransactionId] = useState('');
  const [selectedDeposit, setSelectedDeposit] = useState<number>(0);
  const [distribution, setDistribution] = useState<'automatic' | 'manual'>('automatic');
  const [automaticRolloverState, setAutomaticRolloverState] = useState<
    AutomaticRolloverToggleProps['automaticRolloverState']
  >(Boolean(vault.isUserRegisteredForAutoRollover) ? 'active' : 'inactive');
  const [manualWeights, setManualWeights] = useState<FormProps['weights']>(
    automaticWeights.map((a) => ({ ...a })),
  );
  const [depositState, setDepositState] = useState<DepositStates>(DepositStates.INITIALISING);
  const [error, setError] = useState<string>('');
  const [hasUserOptedInOutAutoRollover, setHasUserOptedInOutAutoRollover] =
    useState<boolean>(false);

  const sufficientFunds = (vault.userWalletBalance ?? 0) >= selectedDeposit;
  const weights = distribution === 'automatic' ? automaticWeights : manualWeights;
  const combinedWeightValue = weights.reduce((total, weight) => total + weight.distribution, 0);

  const spareWeights = weights
    .map((w, index): [string, number] => [vault.vaults[index].vaultId, w.distribution])
    .filter((w) => w[1] > 0);

  const deposit = () => {
    if (!signer) {
      return;
    }

    if (selectedDeposit > 0) {
      pushEvent(account ?? '', {
        event: 'tx_submitted',
        eventValue: {
          action: 'deposit',
          amount: selectedDeposit,
          distribution: distribution,
        },
      });
      setDepositState(DepositStates.DEPOSITING);

      void depositAndRegister({
        optimiserId: vault.optimiserId,
        amount: selectedDeposit,
        spareWeights,
        registration: hasUserOptedInOutAutoRollover
          ? automaticRolloverState === 'active'
          : undefined,
        signer,
      }).then(
        ({ receipt }) => {
          pushEvent(account ?? '', {
            event: 'successful_tx',
            eventValue: {
              action: 'deposit',
              amount: selectedDeposit,
              distribution: distribution,
            },
          });
          setDepositState(DepositStates.DEPOSIT_DONE);
          setHasUserOptedInOutAutoRollover(false);
          setDepositTransactionId((receipt as ethers.ContractReceipt).transactionHash);
        },
        (err: Error) => {
          setError(`Deposit failed. ${err.message ?? ''}`);
          setDepositState(DepositStates.DEPOSIT_FAILED);
          pushEvent(account ?? '', {
            event: 'failed_tx',
            eventValue: {
              action: 'deposit',
              amount: selectedDeposit,
              distribution: distribution,
            },
          });
        },
      );
    } else {
      setError('Please input amount');
      setDepositState(DepositStates.DEPOSIT_FAILED);
    }
  };

  const approve = () => {
    if (!signer) {
      return;
    }

    setDepositState(DepositStates.APPROVING);
    void approveToken({
      tokenId: vault.tokenId,
      to: vault.optimiserId,
      signer,
    }).then(
      () => {
        setDepositState(DepositStates.APPROVED);
      },
      (err: Error) => {
        setError(`Approval failed. ${err.message ?? ''}`);
        setDepositState(DepositStates.APPROVE_FAILED);
      },
    );
  };

  useEffect(() => {
    if (!account) {
      return;
    }

    if (loading || !vault?.optimiserId) {
      return;
    }

    void isTokenApproved({
      tokenId: vault.tokenId,
      to: vault.optimiserId,
      threshold: selectedDeposit,
      userAddress: account,
    }).then(
      (resp) => {
        if (resp) {
          setDepositState(DepositStates.APPROVED);
        } else {
          setDepositState(DepositStates.APPROVE_REQUIRED);
        }
      },
      (err: Error) => {
        setError(`Error occurred while retrieving information. ${err.message ?? ''}`);
        setDepositState(DepositStates.PROVIDER_ERROR);
      },
    );
  }, [vault.optimiserId, loading, selectedDeposit, account, vault.tokenId]);

  const openDepositModal = () => {
    if (!signer) {
      return;
    }

    setDepositState(DepositStates.DEPOSIT_MODAL);
    void depositAndRegister({
      onlyGasEstimate: true,
      optimiserId: vault.optimiserId,
      amount: selectedDeposit,
      spareWeights,
      registration: hasUserOptedInOutAutoRollover ? automaticRolloverState === 'active' : undefined,
      signer,
    })
      .then(({ gasEstimateUsd }) => {
        setDepositGasCost(gasEstimateUsd);
      })
      .catch(() => {
        setDepositGasCost(-1);
      });
  };

  const submissionState = getSubmissionState({
    depositState,
    deposit,
    approve,
    openDepositModal,
    selectedDeposit,
    sufficientFunds,
    error,
    tokenName: vault.tokenName,
    loading,
  });

  return (
    <DepositForm
      automaticRolloverChangePromise={(value) => {
        return new Promise((resolve) => {
          setAutomaticRolloverState(value);
          const registrationValue = value === 'active';
          setHasUserOptedInOutAutoRollover(
            registrationValue !== Boolean(vault.isUserRegisteredForAutoRollover),
          );
          resolve();
        });
      }}
      automaticRolloverGasCost={vault.autorolloverGasCostInUSD}
      automaticRolloverState={automaticRolloverState}
      combinedWeightValue={combinedWeightValue}
      depositFeeUnderlying={vault.feePerDeposit}
      depositFeeUSD={vault.feePerDepositUSD}
      depositGasCost={depositGasCost}
      depositTransactionId={depositTransactionId}
      depositValue={selectedDeposit}
      disabled={
        !sufficientFunds || submissionState.disabled || loading || combinedWeightValue !== 100
      }
      distribution={distribution}
      hintText={submissionState.hintText}
      isBatchFlowOpen={submissionState.batchFlowOpen}
      isConfirmDepositModalOpen={submissionState.confirmDepositModalOpen}
      isSuccessDepositModalOpen={submissionState.successDepositModalOpen}
      loading={submissionState.loading}
      lpVault={vault}
      submitText={submissionState.submitText}
      success={submissionState.success}
      weights={weights}
      onBatchBudgetModalOpen={() => setDepositState(DepositStates.BATCH_FLOW)}
      onChangeDeposit={setSelectedDeposit}
      onConfirmDepositModalClose={() => setDepositState(DepositStates.APPROVED)}
      onDistributionToggle={setDistribution}
      onGoBack={onGoBack}
      onManualDistributionsUpdate={setManualWeights}
      onSubmit={submissionState.action}
      onSuccessDepositModalClose={() => setDepositState(DepositStates.APPROVED)}
    />
  );
};
