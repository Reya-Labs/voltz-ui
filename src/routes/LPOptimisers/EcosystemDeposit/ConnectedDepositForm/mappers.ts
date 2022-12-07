import { colors } from '../../../../theme';

export enum DepositStates {
  INITIALISING = 'INITIALISING',
  PROVIDER_ERROR = 'PROVIDER_ERROR',
  APPROVE_REQUIRED = 'APPROVE_REQUIRED',
  APPROVING = 'APPROVING',
  APPROVE_FAILED = 'APPROVE_FAILED',
  APPROVED = 'APPROVED',
  DEPOSITING = 'DEPOSITING',
  DEPOSIT_FAILED = 'DEPOSIT_FAILED',
  DEPOSIT_DONE = 'DEPOSIT_DONE',
}

type SubmissionState = {
  submitText: string;
  hintText: {
    prefixText?: string;
    text: string;
    suffixText?: string;
    textColor?: string;
  };
  action: () => void;
  disabled: boolean;
  loading: boolean;
  success: boolean;
};

export const getSubmissionState = ({
  depositState,
  deposit,
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
        textColor: colors.vzCustomRed1.base,
      },
      loading: false,
      disabled: true,
      success: false,
    };
  }
  const initialisingState: SubmissionState = {
    submitText: 'Initialising',
    action: () => {},
    hintText: {
      text: 'Initialising, please wait',
    },
    loading: true,
    disabled: true,
    success: false,
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
          textColor: colors.vzCustomRed1.base,
        },
        loading: false,
        disabled: true,
        success: false,
      };
    }
    case DepositStates.APPROVE_FAILED: {
      return {
        submitText: 'Approve',
        action: approve,
        hintText: {
          text: error,
          textColor: colors.vzCustomRed1.base,
        },
        loading: false,
        disabled: false,
        success: false,
      };
    }
    case DepositStates.DEPOSIT_FAILED: {
      return {
        submitText: 'Deposit',
        action: deposit,
        hintText: {
          text: error,
          textColor: colors.vzCustomRed1.base,
        },
        loading: false,
        disabled: false,
        success: false,
      };
    }
    case DepositStates.APPROVE_REQUIRED: {
      return {
        submitText: 'Approve',
        action: approve,
        hintText: {
          text: `Please approve ${tokenName}`,
        },
        loading: false,
        disabled: false,
        success: false,
      };
    }
    case DepositStates.APPROVING: {
      return {
        submitText: 'Pending',
        action: () => {},
        hintText: {
          text: 'Waiting for confirmation',
        },
        loading: true,
        disabled: true,
        success: false,
      };
    }
    case DepositStates.APPROVED: {
      return {
        submitText: 'Deposit',
        action: deposit,
        hintText:
          selectedDeposit > 0
            ? {
                text: tokenName === 'ETH' ? '' : 'Tokens approved.',
                textColor: colors.vzCustomGreen1.base,
                suffixText: "Let's deposit.",
              }
            : {
                text: 'Please input amount',
              },
        loading: false,
        disabled: !(selectedDeposit > 0),
        success: false,
      };
    }
    case DepositStates.DEPOSITING: {
      return {
        submitText: 'Pending',
        action: () => {},
        hintText: {
          prefixText: 'Depositing',
          text: `${selectedDeposit} ${tokenName}`,
          textColor: colors.skyBlueCrayola.base,
        },
        loading: true,
        disabled: true,
        success: false,
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
          textColor: colors.skyBlueCrayola.base,
        },
        loading: false,
        disabled: false,
        success: true,
      };
    }
  }
};
