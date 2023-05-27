import { AMM, InfoPostLp, Position } from '@voltz-protocol/v1-sdk';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  submitButton: {
    state:
      | 'lp'
      | 'margin-update'
      | 'not-enough-balance'
      | 'connect-wallet'
      | 'fixed-range-error'
      | 'approve'
      | 'approving';
    disabled: boolean;
    message: {
      text: string | null;
      isError: boolean;
    };
  };
  amm: AMM | null;
  positions: {
    value: Position[] | null;
    status: ThunkStatus;
  };
  // position from the list of positions above that matches the fixed rate range selected by user
  selectedPosition: Position | null;
  walletBalance: {
    value: number;
    status: ThunkStatus;
  };
  walletTokenAllowance: {
    value: number;
    status: ThunkStatus;
  };
  // User-agnostic swap info about pool
  poolLpInfo: {
    maxLeverage: number;
    status: ThunkStatus;
  };
  // the lp form is a slice of the redux store and userInput is a "slice of a slice", doesn't have actions
  userInput: {
    // User-inputted notional amount of liquidity they want to provide or remove from the vamm
    notionalAmount: {
      value: number;
      // provide -> user is adding more liquidity into the vamm, remove means the user is removing liquidity from vamm
      editMode: 'add' | 'remove';
      error: string | null;
    };
    // User-inputted margin amount (same as the swap form)
    marginAmount: {
      value: number;
      editMode: 'add' | 'remove';
      error: string | null;
    };
    leverage: number | null;
    // user-inputted fixed rate range along which liquidity is provided
    fixedRange: {
      lower: number | null;
      upper: number | null;
      error: string | null;
      // counts how many times update happens for lower or upper and refreshes UI
      // in case a same value is recalculated by selectors UI won't refresh
      updateCount: number;
    };
  };
  // State of prospective liquidity provisioning or liquidity removal operation
  prospectiveLp: {
    // Leverage options
    leverage: {
      options: number[];
      maxLeverage: string;
    };
    infoPostLp: {
      value: InfoPostLp;
      status: ThunkStatus;
    };
  };
  lpConfirmationFlow: {
    step: 'lpConfirmation' | 'waitingForLpConfirmation' | 'lpCompleted' | null;
    error: string | null;
    txHash: string | null;
  };
  // note, behaviour is the same as in the swap form
  marginUpdateConfirmationFlow: {
    step:
      | 'marginUpdateConfirmation'
      | 'waitingForMarginUpdateConfirmation'
      | 'marginUpdateCompleted'
      | null;
    error: string | null;
    txHash: string | null;
  };
  showLowLeverageNotification: boolean;
};

export const initialState: SliceState = {
  submitButton: {
    state: 'connect-wallet',
    disabled: true,
    message: {
      text: null,
      isError: false,
    },
  },
  amm: null,
  selectedPosition: null,
  positions: {
    value: null,
    status: 'idle',
  },
  walletBalance: {
    value: 0,
    status: 'idle',
  },
  walletTokenAllowance: {
    value: 0,
    status: 'idle',
  },
  poolLpInfo: {
    maxLeverage: 1,
    status: 'idle',
  },
  userInput: {
    notionalAmount: {
      value: 0,
      editMode: 'add',
      error: null,
    },
    marginAmount: {
      value: 0,
      editMode: 'add',
      error: null,
    },
    leverage: null,
    fixedRange: {
      lower: null,
      upper: null,
      error: null,
      updateCount: 0,
    },
  },
  prospectiveLp: {
    leverage: {
      options: [0, 0, 0],
      maxLeverage: '--',
    },
    infoPostLp: {
      value: {
        marginRequirement: 0,
        maxMarginWithdrawable: 0,
        gasFee: {
          value: 0,
          token: 'ETH',
        },
      },
      status: 'idle',
    },
  },
  lpConfirmationFlow: {
    step: null,
    error: null,
    txHash: null,
  },
  marginUpdateConfirmationFlow: {
    step: null,
    error: null,
    txHash: null,
  },
  showLowLeverageNotification: false,
};
