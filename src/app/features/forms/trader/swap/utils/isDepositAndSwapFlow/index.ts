import { SliceState } from '../../state';

export const isDepositAndSwapFlow = (state: SliceState) => {
  if (!state.marginAccount) {
    return false;
  }
  return state.marginAccount.initialMarginPreTrade > state.marginAccount.balance;
};
