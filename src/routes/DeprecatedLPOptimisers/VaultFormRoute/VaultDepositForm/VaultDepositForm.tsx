import { MellowProduct } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useState } from 'react';

import { AutomaticRolloverToggleProps } from '../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { useWallet } from '../../../../hooks/useWallet';
import { pushEvent } from '../../../../utilities/googleAnalytics';
import { DepositForm, FormProps } from '../Form/DepositForm/DepositForm';
import { DepositStates, getSubmissionState } from './mappers';

export type VaultDepositFormProps = {
  vault: MellowProduct;
  onGoBack: () => void;
  loading: boolean;
};

export const VaultDepositForm: React.FunctionComponent<VaultDepositFormProps> = ({
  loading,
  vault,
  onGoBack,
}) => {
  const { account } = useWallet();
  const automaticWeights: FormProps['weights'] = vault.metadata.vaults.map((v) => ({
    distribution: v.weight,
    maturityTimestamp: v.maturityTimestampMS,
    pools: v.pools,
    vaultDisabled: v.weight === 0,
  }));
  const [depositGasCost, setDepositGasCost] = useState(-1);
  const [depositTransactionId, setDepositTransactionId] = useState('');
  const [depositFeeUSD, setDepositFeeUSD] = useState(-1);
  const [depositFeeUnderlying, setDepositFeeUnderlying] = useState(-1);
  const [selectedDeposit, setSelectedDeposit] = useState<number>(0);
  const [distribution, setDistribution] = useState<'automatic' | 'manual'>('automatic');
  const [automaticRolloverState, setAutomaticRolloverState] = useState<
    AutomaticRolloverToggleProps['automaticRolloverState']
  >(Boolean(vault.isRegisteredForAutoRollover) ? 'active' : 'inactive');
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

  const deposit = () => {
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
      void vault
        .deposit(
          selectedDeposit,
          weights.map((w) => w.distribution),
          hasUserOptedInOutAutoRollover ? automaticRolloverState === 'active' : undefined,
        )
        .then(
          (receipt) => {
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
            setDepositTransactionId(receipt.transactionHash);
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
    setDepositState(DepositStates.APPROVING);
    void vault.approveToken().then(
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
    if (vault.userInitialized) {
      setAutomaticRolloverState(vault.isRegisteredForAutoRollover ? 'active' : 'inactive');
    }
  }, [vault.userInitialized]);

  useEffect(() => {
    if (loading || !vault?.id) {
      return;
    }

    void vault.isTokenApproved().then(
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
  }, [vault.id, loading, selectedDeposit]);

  const openDepositModal = () => {
    setDepositState(DepositStates.DEPOSIT_MODAL);
    vault
      .getDepositGasCost(
        selectedDeposit,
        weights.map((w) => w.distribution),
        hasUserOptedInOutAutoRollover ? automaticRolloverState === 'active' : undefined,
      )
      .then((result) => {
        setDepositGasCost(result);
      })
      .catch((err) => {
        setDepositGasCost(-1);
      });

    vault
      .getDepositFeeUsd()
      .then((result) => {
        setDepositFeeUSD(result);
      })
      .catch((err) => {
        setDepositFeeUSD(-1);
      });

    vault
      .getDepositFeeUnderlying()
      .then((result) => {
        setDepositFeeUnderlying(result);
      })
      .catch((err) => {
        setDepositFeeUnderlying(-1);
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
    tokenName: vault.metadata.token,
    loading,
  });

  return (
    <DepositForm
      automaticRolloverChangePromise={(value) => {
        return new Promise((resolve) => {
          setAutomaticRolloverState(value);
          const registrationValue = value === 'active';
          setHasUserOptedInOutAutoRollover(
            registrationValue !== Boolean(vault.isRegisteredForAutoRollover),
          );
          resolve();
        });
      }}
      automaticRolloverGasCost={vault.autoRolloverRegistrationGasFeeUSD}
      automaticRolloverState={automaticRolloverState}
      combinedWeightValue={combinedWeightValue}
      depositFeeUnderlying={depositFeeUnderlying}
      depositFeeUSD={depositFeeUSD}
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
