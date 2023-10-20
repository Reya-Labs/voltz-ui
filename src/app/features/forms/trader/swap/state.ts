import { SliceState } from './types';

export const initialState: SliceState = {
  submitButton: {
    state: 'connect-wallet',
    disabled: true,
    text: 'Connect Wallet',
    message: {
      text: null,
      type: 'info',
    },
  },
  pool: null,
  signer: null,
  marginAccount: null,
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
      error: null,
    },
  },
  prospectiveSwap: {
    swapSimulation: {
      value: {
        accountInitialMarginPostTrade: 0,
        // TODO: FB evaluate before launch
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
  depositAndSwapConfirmationFlow: {
    step: null,
    error: null,
    txHash: null,
    availableAmounts: [],
    availableAmountsLoadedState: 'idle',
    userInput: {
      amount: 0,
      maxAmount: 0,
      maxAmountUSD: 0,
      token: undefined,
    },
    walletTokenAllowance: {
      value: 0,
      status: 'idle',
    },
  },
};
