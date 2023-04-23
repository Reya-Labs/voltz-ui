import { extractError } from '../extract-error';

export const rejectThunkWithError = (
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  },
  err: unknown,
) => {
  return thunkAPI.rejectWithValue(extractError(err));
};
