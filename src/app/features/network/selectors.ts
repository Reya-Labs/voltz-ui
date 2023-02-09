import { RootState } from '../../store';

export const selectNetwork = (state: RootState) => state.network.network;
