import { colors } from '../../../../theme';

export enum WithdrawStates {
  INITIALISING = 'INITIALISING',
  WITHDRAW_PENDING = 'WITHDRAW_PENDING',
  WITHDRAW_FAILED = 'WITHDRAW_FAILED',
  WITHDRAW_DONE = 'WITHDRAW_DONE',
}

export enum RolloverStates {
  INITIALISING = 'INITIALISING',
  ROLLOVER_PENDING = 'ROLLOVER_PENDING',
  ROLLOVER_FAILED = 'ROLLOVER_FAILED',
  ROLLOVER_DONE = 'ROLLOVER_DONE',
}

type SubmissionState = {
  hintText: {
    prefixText?: string;
    text: string;
    suffixText?: string;
    textColor?: string;
  };
  disabled: boolean;
  withdraw: {
    submitText: string;
    action: () => void;
    success: boolean;
    loading: boolean;
  };
  rollover: {
    submitText: string;
    action: () => void;
    success: boolean;
    loading: boolean;
  };
};

export const getSubmissionState = ({
  withdrawOrRolloverState,
  withdraw,
  rollover,
  error,
  loading,
}: {
  withdrawOrRolloverState: WithdrawStates | RolloverStates;
  withdraw: () => void;
  rollover: () => void;
  error: string;
  tokenName: string;
  loading: boolean;
}): SubmissionState => {
  const initialisingState: SubmissionState = {
    hintText: {
      text: 'Initialising, please wait',
    },
    disabled: true,
    withdraw: {
      submitText: 'Initialising',
      action: () => {},
      success: false,
      loading: true,
    },
    rollover: {
      submitText: 'Initialising',
      action: () => {},
      success: false,
      loading: true,
    },
  };

  if (
    loading ||
    withdrawOrRolloverState === WithdrawStates.INITIALISING ||
    withdrawOrRolloverState === RolloverStates.INITIALISING
  ) {
    return initialisingState;
  }
  const errorState = {
    hintText: {
      text: error,
      textColor: colors.vzCustomRed1.base,
    },
    disabled: false,
    withdraw: {
      submitText: 'WITHDRAW ALL',
      action: withdraw,
      success: false,
      loading: false,
    },
    rollover: {
      submitText: 'ROLLOVER ALL',
      action: rollover,
      success: false,
      loading: false,
    },
  };

  switch (withdrawOrRolloverState) {
    case WithdrawStates.WITHDRAW_FAILED:
    case RolloverStates.ROLLOVER_FAILED:
      return errorState;
    case WithdrawStates.WITHDRAW_PENDING: {
      return {
        hintText: {
          prefixText: 'Withdraw in progress',
          text: '',
          textColor: colors.skyBlueCrayola.base,
        },
        disabled: true,
        withdraw: {
          submitText: 'Pending',
          action: withdraw,
          success: false,
          loading: true,
        },
        rollover: {
          submitText: 'ROLLOVER ALL',
          action: rollover,
          success: false,
          loading: false,
        },
      };
    }
    case WithdrawStates.WITHDRAW_DONE: {
      return {
        hintText: {
          text: 'Withdrawn successful',
          textColor: colors.skyBlueCrayola.base,
        },
        disabled: true,
        withdraw: {
          submitText: 'WITHDRAWN',
          action: withdraw,
          success: true,
          loading: false,
        },
        rollover: {
          submitText: 'ROLLOVER ALL',
          action: rollover,
          success: false,
          loading: false,
        },
      };
    }
    case RolloverStates.ROLLOVER_PENDING: {
      return {
        hintText: {
          prefixText: 'Rollover in progress',
          text: '',
          textColor: colors.skyBlueCrayola.base,
        },
        disabled: true,
        withdraw: {
          submitText: 'WITHDRAW ALL',
          action: withdraw,
          success: false,
          loading: false,
        },
        rollover: {
          submitText: 'Pending',
          action: rollover,
          success: false,
          loading: true,
        },
      };
    }
    case RolloverStates.ROLLOVER_DONE: {
      return {
        hintText: {
          text: 'Rollover successful',
          textColor: colors.skyBlueCrayola.base,
        },
        disabled: true,
        withdraw: {
          submitText: 'WITHDRAW ALL',
          action: withdraw,
          success: false,
          loading: false,
        },
        rollover: {
          submitText: 'ROLLOVER DONE',
          action: rollover,
          success: true,
          loading: false,
        },
      };
    }
  }
};
