import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';

const slice = createSlice({
  name: 'redirects',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const redirectsReducer = slice.reducer;
