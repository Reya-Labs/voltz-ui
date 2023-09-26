import { SimulateSwapMarginAccountResult } from '@voltz-protocol/sdk-v2';
import { Position } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { V2Pool } from '../../../aMMs';
import { PortfolioMarginAccount } from '../../../portfolio';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

type SubmitButtonState = 'swap' | 'connect-wallet' | 'paused';

export type SliceState = {
  submitButton: {
    state: SubmitButtonState;
    disabled: boolean;
    message: {
      text: string | null;
      type: 'error' | 'warning' | 'info';
    };
  };
  pool: V2Pool | null;
  signer: providers.JsonRpcSigner | null;
  marginAccount: PortfolioMarginAccount | null;
  position: {
    value: Position | null;
    status: ThunkStatus;
  };
  maxNotionalAvailable: {
    value: number;
    status: ThunkStatus;
  };
  walletTokenAllowance: {
    value: number;
    status: ThunkStatus;
  };
  userInput: {
    // Side chosen by user in the UI
    mode: 'fixed' | 'variable';
    // User-inputted notional amount
    notionalAmount: {
      value: number;
      editMode: 'add' | 'remove';
      error: string | null;
    };
  };
  // State of prospective swap
  prospectiveSwap: {
    swapSimulation: {
      value: SimulateSwapMarginAccountResult;
      status: ThunkStatus;
    };
  };
  swapConfirmationFlow: {
    step: 'swapConfirmation' | 'waitingForSwapConfirmation' | 'swapCompleted' | null;
    error: string | null;
    txHash: string | null;
  };
};

export const initialState: SliceState = {
  submitButton: {
    state: 'connect-wallet',
    disabled: true,
    message: {
      text: null,
      type: 'info',
    },
  },
  pool: null,
  signer: null,
  marginAccount: null,
  position: {
    value: null,
    status: 'idle',
  },
  maxNotionalAvailable: {
    value: 0,
    status: 'idle',
  },
  walletTokenAllowance: {
    value: 0,
    status: 'idle',
  },
  userInput: {
    mode: 'fixed',
    notionalAmount: {
      value: 0,
      editMode: 'add',
      error: null,
    },
  },
  prospectiveSwap: {
    swapSimulation: {
      value: {
        marginRequirement: 0,
        maxMarginWithdrawable: 0,
        averageFixedRate: 0,
        variableTokenDeltaBalance: 0,
        fee: 0,
        gasFee: {
          value: 0,
          token: 'ETH',
        },
      },
      status: 'idle',
    },
  },
  swapConfirmationFlow: {
    step: null,
    error: null,
    txHash: null,
  },
};
