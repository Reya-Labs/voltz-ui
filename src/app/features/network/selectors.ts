import { RootState } from '../../store';

export const selectChainId = (state: RootState) => state.network.chainId;
export const selectIsSupportedNetwork = (state: RootState) => state.network.isSupportedNetwork;
export const selectNetworkChangeState = (state: RootState) => state.network.networkChangeState;
