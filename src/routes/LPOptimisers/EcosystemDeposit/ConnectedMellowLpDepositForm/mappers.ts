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

export const getSubmissionState = ({
  depositState,
  deposit,
  approve,
  selectedDeposit,
  sufficientFunds,
  error,
  tokenName,
}: {
  depositState: DepositStates;
  deposit: () => void;
  approve: () => void;
  selectedDeposit: number;
  sufficientFunds: boolean;
  error: string;
  tokenName: string;
}): {
  submitText: string;
  hintText: {
    text: string;
    suffixText?: string;
    textColor?: string;
  };
  action: () => void;
  disabled: boolean;
} => {
  if (!sufficientFunds) {
    return {
      submitText: 'Deposit',
      action: () => {},
      hintText: {
        text: 'Insufficient Funds',
        textColor: colors.vzCustomRed1.base,
      },
      disabled: true,
    };
  }
  switch (depositState) {
    case DepositStates.INITIALISING: {
      return {
        submitText: 'Initialising',
        action: () => {},
        hintText: {
          text: 'Initialising, please wait',
        },
        disabled: true,
      };
    }
    case DepositStates.PROVIDER_ERROR: {
      return {
        submitText: 'Provider Error',
        action: () => {},
        hintText: {
          text: error,
          textColor: colors.vzCustomRed1.base,
        },
        disabled: true,
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
        disabled: false,
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
        disabled: false,
      };
    }
    case DepositStates.APPROVE_REQUIRED: {
      return {
        submitText: 'Approve',
        action: approve,
        hintText: {
          text: `Please approve ${tokenName}`,
        },
        disabled: false,
      };
    }
    case DepositStates.APPROVING: {
      return {
        submitText: 'Approving...',
        action: () => {},
        hintText: {
          text: 'Waiting for confirmation',
        },
        disabled: true,
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
        disabled: !(selectedDeposit > 0),
      };
    }
    case DepositStates.DEPOSITING: {
      return {
        submitText: 'Depositing...',
        action: () => {},
        hintText: {
          text: 'Waiting for confirmation',
        },
        disabled: true,
      };
    }
    case DepositStates.DEPOSIT_DONE: {
      return {
        submitText: 'Deposit',
        action: deposit,
        hintText: {
          text: 'Deposited',
          textColor: colors.vzCustomGreen1.base,
        },
        disabled: false,
      };
    }
  }
};
