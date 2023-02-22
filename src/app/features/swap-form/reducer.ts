import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  notionalAmount: string;
};

const initialState: SliceState = {
  notionalAmount: '0',
};

export const slice = createSlice({
  name: 'swapForm',
  initialState,
  reducers: {
    setNotionalAmountAction: (
      state,
      {
        payload: { value },
      }: PayloadAction<{
        value: string;
      }>,
    ) => {
      state.notionalAmount = value;
    },
  },
});
export const { setNotionalAmountAction } = slice.actions;
export const swapFormReducer = slice.reducer;
