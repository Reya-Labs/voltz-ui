import { RootState } from '../../store';

export const selectAdmitPassError = (state: RootState) => state.admitPassFlow.error;
export const selectAdmitPassStatus = (state: RootState) => state.admitPassFlow.status;
export const selectAdmitPassStep = (state: RootState) => state.admitPassFlow.step;
