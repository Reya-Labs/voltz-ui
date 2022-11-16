import { routes } from '@routes';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { DepositStates, getSubmissionState } from './mappers';
import MellowLpDepositForm from '../MellowLpDepositForm/MellowLpDepositForm';
import { Panel } from '../../../components/atomic';

import { MellowLpVault } from '@voltz-protocol/v1-sdk';

export type ConnectedMellowLpDepositFormProps = {
  vault: MellowLpVault;
  onReset: () => void;
};

const ConnectedMellowLpDepositForm: React.FunctionComponent<ConnectedMellowLpDepositFormProps> = ({
  vault,
  onReset,
}) => {
  const navigate = useNavigate();

  const [selectedDeposit, setSelectedDeposit] = useState<number>(0);

  const [depositState, setDepositState] = useState<DepositStates>(DepositStates.INITIALISING);
  const [error, setError] = useState<string>('');

  const sufficientFunds = (vault.userWalletBalance ?? 0) >= selectedDeposit;

  const deposit = () => {
    if (selectedDeposit > 0) {
      setDepositState(DepositStates.DEPOSITING);
      void vault.deposit(selectedDeposit).then(
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
    void vault.isTokenApproved().then(
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
    tokenName: vault.tokenName,
  });

  const handleGoBack = () => {
    onReset();
    navigate(`/${routes.PRODUCTS}`);
  };

  const onChangeDeposit = (value: number | undefined): void => {
    setSelectedDeposit(value ?? 0);
  };

  return (
    <Panel
      variant="dark"
      sx={{
        padding: 0,
        width: '100%',
        maxWidth: '748px',
        margin: '0 auto',
        background: 'transparent',
      }}
    >
      <MellowLpDepositForm
        lpVault={vault}
        onChangeDeposit={onChangeDeposit}
        submitText={submissionState.submitText}
        hintText={submissionState.hintText}
        disabled={!sufficientFunds || submissionState.disabled}
        onSubmit={submissionState.action}
        onCancel={handleGoBack}
      />
    </Panel>
  );
};

export default ConnectedMellowLpDepositForm;
