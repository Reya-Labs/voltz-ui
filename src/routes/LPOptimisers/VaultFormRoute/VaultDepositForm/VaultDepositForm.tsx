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

  const [selectedDeposit, setSelectedDeposit] = useState<number>(0);
  const [distribution, setDistribution] = useState<'automatic' | 'manual'>('automatic');
  // todo: read the value from SDK
  const [automaticRolloverState, setAutomaticRolloverState] =
    useState<AutomaticRolloverToggleProps['automaticRolloverState']>('inactive');
  const [manualWeights, setManualWeights] = useState<FormProps['weights']>(
    automaticWeights.map((a) => ({ ...a })),
  );
  const [depositState, setDepositState] = useState<DepositStates>(DepositStates.INITIALISING);
  const [error, setError] = useState<string>('');

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
        )
        .then(
          () => {
            pushEvent(account ?? '', {
              event: 'successful_tx',
              eventValue: {
                action: 'deposit',
                amount: selectedDeposit,
                distribution: distribution,
              },
            });
            setDepositState(DepositStates.DEPOSIT_DONE);
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

  const submissionState = getSubmissionState({
    depositState,
    deposit,
    approve,
    selectedDeposit,
    sufficientFunds,
    error,
    tokenName: vault.metadata.token,
    loading,
  });

  const automaticRolloverChangePromise = async (
    value: AutomaticRolloverToggleProps['automaticRolloverState'],
  ) => {
    try {
      // todo: SDK integration here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAutomaticRolloverState(value);
    } catch (err) {
      throw new Error('Error');
    }
  };

  return (
    <DepositForm
      automaticRolloverChangePromise={automaticRolloverChangePromise}
      automaticRolloverState={automaticRolloverState}
      combinedWeightValue={combinedWeightValue}
      depositValue={selectedDeposit}
      disabled={
        !sufficientFunds || submissionState.disabled || loading || combinedWeightValue !== 100
      }
      distribution={distribution}
      hintText={submissionState.hintText}
      loading={submissionState.loading}
      lpVault={vault}
      submitText={submissionState.submitText}
      success={submissionState.success}
      weights={weights}
      onChangeDeposit={setSelectedDeposit}
      onDistributionToggle={setDistribution}
      onGoBack={onGoBack}
      onManualDistributionsUpdate={setManualWeights}
      onSubmit={submissionState.action}
    />
  );
};
