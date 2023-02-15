import { RootState } from '../../store';

export const selectChainId = (state: RootState) => state.network.chainId;
export const selectIsSupportedChain = (state: RootState) => state.network.isSupportedChain;
export const selectChainChangeState = (state: RootState) => state.network.chainChangeState;
