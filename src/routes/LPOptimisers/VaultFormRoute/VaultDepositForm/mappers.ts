import { isCostReductionFlowEnabled } from '../../../../utilities/is-cost-reduction-flow-enabled';

export enum DepositStates {
  INITIALISING = 'INITIALISING',
  PROVIDER_ERROR = 'PROVIDER_ERROR',
  APPROVE_REQUIRED = 'APPROVE_REQUIRED',
  APPROVING = 'APPROVING',
  APPROVE_FAILED = 'APPROVE_FAILED',
  APPROVED = 'APPROVED',
  DEPOSIT_MODAL = 'DEPOSIT_MODAL',
  DEPOSITING = 'DEPOSITING',
  DEPOSIT_FAILED = 'DEPOSIT_FAILED',
  DEPOSIT_DONE = 'DEPOSIT_DONE',
  BATCH_FLOW = 'BATCH_FLOW',
}

type SubmissionState = {
  submitText: string;
  hintText: {
    prefixText?: string;
    text: string;
    suffixText?: string;
    success: boolean;
    error: boolean;
  };
  action: () => void;
  disabled: boolean;
  loading: boolean;
  success: boolean;
  confirmDepositModalOpen: boolean;
  successDepositModalOpen: boolean;
  batchFlowOpen: boolean;
};

export const getSubmissionState = ({
  depositState,
  deposit,
  openDepositModal,
  approve,
  selectedDeposit,
  sufficientFunds,
  error,
  tokenName,
  loading,
}: {
  depositState: DepositStates;
  deposit: () => void;
  approve: () => void;
  openDepositModal: () => void;
  selectedDeposit: number;
  sufficientFunds: boolean;
  error: string;
  tokenName: string;
  loading: boolean;
}): SubmissionState => {
  if (!sufficientFunds) {
    return {
      submitText: 'Deposit',
      action: () => {},
      hintText: {
        text: 'Insufficient Funds',
        error: true,
        success: false,
      },
      loading: false,
      disabled: true,
      success: false,
      confirmDepositModalOpen: false,
      successDepositModalOpen: false,
      batchFlowOpen: false,
    };
  }
  const initialisingState: SubmissionState = {
    submitText: 'Initialising',
    action: () => {},
    hintText: {
      text: 'Initialising, please wait',
      error: false,
      success: false,
    },
    loading: true,
    disabled: true,
    success: false,
    confirmDepositModalOpen: false,
    successDepositModalOpen: false,
    batchFlowOpen: false,
  };
  if (loading) {
    return initialisingState;
  }

  switch (depositState) {
    case DepositStates.INITIALISING: {
      return initialisingState;
    }
    case DepositStates.PROVIDER_ERROR: {
      return {
        submitText: 'Provider Error',
        action: () => {},
        hintText: {
          text: error,
          error: true,
          success: false,
        },
        loading: false,
        disabled: true,
        success: false,
        confirmDepositModalOpen: false,
        successDepositModalOpen: false,
        batchFlowOpen: false,
      };
    }
    case DepositStates.APPROVE_FAILED: {
      return {
        submitText: 'Approve',
        action: approve,
        hintText: {
          text: error,
          error: true,
          success: false,
        },
        loading: false,
        disabled: false,
        success: false,
        confirmDepositModalOpen: false,
        successDepositModalOpen: false,
        batchFlowOpen: false,
      };
    }
    case DepositStates.DEPOSIT_FAILED: {
      return {
        submitText: 'Deposit',
        action: deposit,
        hintText: {
          text: error,
          error: true,
          success: false,
        },
        loading: false,
        disabled: false,
        success: false,
        confirmDepositModalOpen: isCostReductionFlowEnabled(),
        successDepositModalOpen: false,
        batchFlowOpen: false,
      };
    }
    case DepositStates.APPROVE_REQUIRED: {
      return {
        submitText: 'Approve',
        action: approve,
        hintText: {
          text: `Please approve ${tokenName === 'ETH' ? 'WETH' : tokenName}`,
          error: false,
          success: false,
        },
        loading: false,
        disabled: false,
        success: false,
        confirmDepositModalOpen: false,
        successDepositModalOpen: false,
        batchFlowOpen: false,
      };
    }
    case DepositStates.APPROVING: {
      return {
        submitText: 'Pending',
        action: () => {},
        hintText: {
          text: 'Waiting for confirmation',
          error: false,
          success: false,
        },
        loading: true,
        disabled: true,
        success: false,
        confirmDepositModalOpen: false,
        successDepositModalOpen: false,
        batchFlowOpen: false,
      };
    }
    case DepositStates.APPROVED: {
      return {
        submitText: 'Deposit',
        action: isCostReductionFlowEnabled() ? openDepositModal : deposit,
        hintText:
          selectedDeposit > 0
            ? {
                text: tokenName === 'ETH' ? '' : 'Tokens approved.',
                suffixText: "Let's deposit.",
                error: false,
                success: true,
              }
            : {
                text: 'Please input amount',
                error: false,
                success: false,
              },
        loading: false,
        disabled: !(selectedDeposit > 0),
        success: false,
        confirmDepositModalOpen: false,
        successDepositModalOpen: false,
        batchFlowOpen: false,
      };
    }
    case DepositStates.DEPOSIT_MODAL: {
      return {
        submitText: 'Deposit',
        action: deposit,
        hintText: {
          text: tokenName === 'ETH' ? '' : 'Tokens approved.',
          error: false,
          success: true,
          suffixText: "Let's deposit.",
        },
        loading: false,
        disabled: !(selectedDeposit > 0),
        success: false,
        confirmDepositModalOpen: isCostReductionFlowEnabled(),
        successDepositModalOpen: false,
        batchFlowOpen: false,
      };
    }
    case DepositStates.DEPOSITING: {
      return {
        submitText: 'Depositing',
        action: () => {},
        hintText: {
          prefixText: 'Depositing',
          text: `${selectedDeposit} ${tokenName}`,
          error: false,
          success: true,
        },
        loading: true,
        disabled: true,
        success: false,
        confirmDepositModalOpen: isCostReductionFlowEnabled(),
        successDepositModalOpen: false,
        batchFlowOpen: false,
      };
    }
    case DepositStates.DEPOSIT_DONE: {
      return {
        submitText: 'Deposited',
        action: deposit,
        hintText: {
          prefixText: 'Deposited',
          text: `${selectedDeposit} ${tokenName}`,
          suffixText: 'successfully',
          error: false,
          success: true,
        },
        loading: false,
        disabled: false,
        success: true,
        confirmDepositModalOpen: false,
        successDepositModalOpen: isCostReductionFlowEnabled(),
        batchFlowOpen: false,
      };
    }
    case DepositStates.BATCH_FLOW: {
      return {
        submitText: 'Deposited',
        action: deposit,
        hintText: {
          prefixText: 'Deposited',
          text: `${selectedDeposit} ${tokenName}`,
          suffixText: 'successfully',
          error: false,
          success: true,
        },
        loading: false,
        disabled: false,
        success: true,
        confirmDepositModalOpen: false,
        successDepositModalOpen: isCostReductionFlowEnabled(),
        batchFlowOpen: isCostReductionFlowEnabled(),
      };
    }
  }
};
