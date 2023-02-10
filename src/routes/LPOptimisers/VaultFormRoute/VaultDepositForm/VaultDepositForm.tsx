import { approveToken, depositAndRegisterV1, isTokenApprovedV1 } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import { selectChainId } from '../../../../app/features/network';
import { OptimiserInfo, updateOptimiserState } from '../../../../app/features/stateless-optimisers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AutomaticRolloverToggleProps } from '../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { useWallet } from '../../../../hooks/useWallet';
import { pushEvent } from '../../../../utilities/googleAnalytics';
import { getAlchemyKeyForChain } from '../../../../utilities/network/get-alchemy-key-for-chain';
import { getSpareWeights } from '../../Helpers/getSpareWeights';
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
  const dispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);

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

  const spareWeights = getSpareWeights(vault.vaults, weights);

  const deposit = () => {
    if (!signer || !chainId) {
      return;
    }

    if (selectedDeposit > 0) {
      pushEvent(account ?? '', {
        event: 'tx_submitted',
        eventValue: {
          action: 'deposit',
          amount: selectedDeposit + vault.feePerDeposit,
          distribution: distribution,
        },
      });
      setDepositState(DepositStates.DEPOSITING);
      void depositAndRegisterV1({
        optimiserId: vault.optimiserId,
        amount: selectedDeposit + vault.feePerDeposit,
        spareWeights,
        registration: hasUserOptedInOutAutoRollover
          ? automaticRolloverState === 'active'
          : undefined,
        signer,
        chainId,
        alchemyApiKey: getAlchemyKeyForChain(chainId),
      }).then(
        ({ receipt, newOptimiserState }) => {
          pushEvent(account ?? '', {
            event: 'successful_tx',
            eventValue: {
              action: 'deposit',
              amount: selectedDeposit + vault.feePerDeposit,
              distribution: distribution,
            },
          });
          setDepositState(DepositStates.DEPOSIT_DONE);
          setHasUserOptedInOutAutoRollover(false);
          setDepositTransactionId((receipt as ethers.ContractReceipt).transactionHash);

          if (newOptimiserState) {
            void dispatch(
              updateOptimiserState({
                optimiserId: vault.optimiserId,
                newOptimiserState,
                chainId,
              }),
            );
          }
        },
        (err: Error) => {
          setError(`Deposit failed. ${err.message ?? ''}`);
          setDepositState(DepositStates.DEPOSIT_FAILED);
          pushEvent(account ?? '', {
            event: 'failed_tx',
            eventValue: {
              action: 'deposit',
              amount: selectedDeposit + vault.feePerDeposit,
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
    if (!account || !chainId) {
      return;
    }

    if (loading || !vault?.optimiserId) {
      return;
    }

    void isTokenApprovedV1({
      tokenId: vault.tokenId,
      to: vault.optimiserId,
      threshold: selectedDeposit + vault.feePerDeposit,
      userAddress: account,
      chainId,
      alchemyApiKey: getAlchemyKeyForChain(chainId),
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
  }, [vault.optimiserId, vault.tokenId, loading, selectedDeposit, account, vault.feePerDeposit]);

  const openDepositModal = () => {
    if (!signer || !chainId) {
      return;
    }

    setDepositState(DepositStates.DEPOSIT_MODAL);
    void depositAndRegisterV1({
      onlyGasEstimate: true,
      optimiserId: vault.optimiserId,
      amount: selectedDeposit + vault.feePerDeposit,
      spareWeights,
      registration: hasUserOptedInOutAutoRollover ? automaticRolloverState === 'active' : undefined,
      signer,
      chainId,
      alchemyApiKey: getAlchemyKeyForChain(chainId),
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
      hintText={submissionState.hintText.text}
      hintTextError={submissionState.hintText.error}
      hintTextPrefixText={submissionState.hintText.prefixText}
      hintTextSuccess={submissionState.hintText.success}
      hintTextSuffixText={submissionState.hintText.suffixText}
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
