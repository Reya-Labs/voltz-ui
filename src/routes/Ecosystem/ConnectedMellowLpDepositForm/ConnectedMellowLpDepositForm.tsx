import React, { useEffect, useState } from 'react';

import { MellowLpDepositForm } from '../MellowLpDepositForm/MellowLpDepositForm';
import { MellowProduct } from '../types';
import { DepositStates, getSubmissionState } from './mappers';

export type ConnectedMellowLpDepositFormProps = {
  vault: MellowProduct;
  onCancel: () => void;
};

export const ConnectedMellowLpDepositForm: React.FunctionComponent<ConnectedMellowLpDepositFormProps> =
  ({ vault, onCancel }) => {
    const [selectedDeposit, setSelectedDeposit] = useState<number>(0);

    const [depositState, setDepositState] = useState<DepositStates>(DepositStates.INITIALISING);
    const [error, setError] = useState<string>('');

    const sufficientFunds = (vault.vault.userWalletBalance ?? 0) >= selectedDeposit;

    const deposit = () => {
      if (selectedDeposit > 0) {
        setDepositState(DepositStates.DEPOSITING);
        void vault.vault.deposit(selectedDeposit).then(
          () => {
            setDepositState(DepositStates.DEPOSIT_DONE);
          },
          (err: Error) => {
            setError(`Deposit failed. ${err.message ?? ''}`);
            setDepositState(DepositStates.DEPOSIT_FAILED);
          },
        );
      } else {
        setError('Please input amount');
        setDepositState(DepositStates.DEPOSIT_FAILED);
      }
    };

    const approve = () => {
      setDepositState(DepositStates.APPROVING);
      void vault.vault.approveToken().then(
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
      void vault.vault.isTokenApproved().then(
        (resp) => {
          if (resp) {
            setDepositState(DepositStates.APPROVED);
          } else {
            setDepositState(DepositStates.APPROVE_REQUIRED);
          }
        },
        (err: Error) => {
          setError(`Error occured while retrieving information. ${err.message ?? ''}`);
          setDepositState(DepositStates.PROVIDER_ERROR);
        },
      );
    }, [vault, selectedDeposit]);

    const submissionState = getSubmissionState({
      depositState,
      deposit,
      approve,
      selectedDeposit,
      sufficientFunds,
      error,
      tokenName: vault.metadata.token,
    });

    const onChangeDeposit = (value: number | undefined): void => {
      setSelectedDeposit(value ?? 0);
    };

    return (
      <MellowLpDepositForm
        disabled={!sufficientFunds || submissionState.disabled}
        hintText={submissionState.hintText}
        lpVault={vault}
        submitText={submissionState.submitText}
        onCancel={onCancel}
        onChangeDeposit={onChangeDeposit}
        onSubmit={submissionState.action}
      />
    );
  };
