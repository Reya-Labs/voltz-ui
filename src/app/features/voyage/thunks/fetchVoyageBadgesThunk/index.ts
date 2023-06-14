import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId, Voyage } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const fetchVoyageBadgesThunk = createAsyncThunk<
  Awaited<Voyage[] | ReturnType<typeof rejectThunkWithError>>,
  {
    chainId: SupportedChainId;
    account: string;
  }
>('voyage/fetchBadges', async ({ account, chainId }, thunkAPI) => {
  try {
    return await getVoyages({ chainId, account });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

async function getVoyages(info: { chainId: number; account: string }): Promise<Voyage[]> {
  if (info.account === '0x2fa11ef008c4b585ccf0a76861794ac7ae5a3a67') {
    return Promise.resolve([
      {
        id: 1,
        status: 'achieved',
        timestamp: 1686758231,
      },
      {
        id: 2,
        status: 'achieved',
        timestamp: 1686758231,
      },
      {
        id: 3,
        status: 'achieved',
        timestamp: 1686758231,
      },
      {
        id: 4,
        status: 'achieved',
        timestamp: 1686758231,
      },
    ]);
  } else if (info.account === '0x45556408e543158f74403e882e3c8c23ecd9f732') {
    return Promise.resolve([
      {
        id: 1,
        status: 'achieved',
        timestamp: 1686758231,
      },
    ]);
  } else if (info.account === '0xf8f6b70a36f4398f0853a311dc6699aba8333cc1') {
    return Promise.resolve([
      {
        id: 1,
        status: 'achieved',
        timestamp: 1686758231,
      },
      {
        id: 2,
        status: 'achieved',
        timestamp: 1686758231,
      },
      {
        id: 3,
        status: 'achieved',
        timestamp: 1686758231,
      },
    ]);
  } else if (info.account === '0x5173cc04a12d1fc7c83293ed71fbfa6bc0f87739') {
    return Promise.resolve([
      {
        id: 1,
        status: 'achieved',
        timestamp: 1686758231,
      },
      {
        id: 2,
        status: 'achieved',
        timestamp: 1686758231,
      },
    ]);
  }
  return [];
}
