import { useAppSelector } from '../../../../app/hooks';
import { colors } from '../../../../theme';

export enum WithdrawStates {
  READY = 'READY',
  WITHDRAW_PENDING = 'WITHDRAW_PENDING',
  WITHDRAW_FAILED = 'WITHDRAW_FAILED',
  WITHDRAW_DONE = 'WITHDRAW_DONE',
}

export enum RolloverStates {
  READY = 'READY',
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
  withdraw,
  rollover,
  tokenName,
  loading,
}: {
  withdraw: () => void;
  rollover: () => void;
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

  if (loading) {
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
    case WithdrawStates.READY:
    case RolloverStates.READY:
      return {
        hintText: {
          text: 'Rollover deposit will be completed at 7PM UTC',
          textColor: colors.lavenderWeb.darken010,
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
          text: 'Withdrawn successfully',
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
          text: 'Rolled over successfully',
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
