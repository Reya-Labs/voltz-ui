import { createAsyncThunk } from '@reduxjs/toolkit';
import { rearm, SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getAlchemyKeyForNetwork } from '../../../utilities/get-alchemy-key-for-network';

const rejectThunkWithError = (
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  },
  err: unknown,
) => {
  if (typeof err === 'string') {
    return thunkAPI.rejectWithValue(err);
  }
  return thunkAPI.rejectWithValue((err as Error)?.message);
};

export const setNetworkThunk = createAsyncThunk<
  Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    network: SupportedNetworksEnum;
    isSupportedNetwork: boolean;
  }
>('network/setNetwork', async ({ network, isSupportedNetwork }, thunkAPI) => {
  if (isSupportedNetwork) {
    rearm({
      network,
      alchemyApiKey: getAlchemyKeyForNetwork(network),
    });
  } else {
    return rejectThunkWithError(thunkAPI, 'Unsupported network');
  }
});
