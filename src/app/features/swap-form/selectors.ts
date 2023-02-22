import { RootState } from '../../store';

export const selectNotionalAmount = (state: RootState) => state.swapForm.notionalAmount;
