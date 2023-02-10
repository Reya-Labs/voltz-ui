import { RootState } from '../../store';

export const selectNetwork = (state: RootState) => state.network.network;
export const selectIsSupportedNetwork = (state: RootState) => state.network.isSupportedNetwork;
