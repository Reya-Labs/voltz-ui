import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';

const fetchPortfolioMarginAccounts = async (chainIds: SupportedChainId[], ownerAddress: string) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return [
    {
      id: '1',
      chainId: SupportedChainId.mainnet,
      name: 'A Wild Broccoli 🥦',
      balance: 123456,
      positionsCount: 1,
      marginRatioPercentage: 15,
    },
    {
      id: '2',
      chainId: SupportedChainId.avalanche,
      name: 'Moonwalking Astronaut 🚀',
      balance: 98765,
      positionsCount: 2,
      marginRatioPercentage: 30,
    },
    {
      id: '3',
      chainId: SupportedChainId.arbitrum,
      name: 'Disco Panda 🐼🕺',
      balance: 65432,
      positionsCount: 3,
      marginRatioPercentage: 45,
    },
    {
      id: '4',
      chainId: SupportedChainId.avalanche,
      name: 'Pizza Lover 🍕❤️',
      balance: 54321,
      positionsCount: 4,
      marginRatioPercentage: 60,
    },
    {
      id: '5',
      chainId: SupportedChainId.avalanche,
      name: 'Crypto Surfer 🏄‍♂️',
      balance: 87654,
      positionsCount: 5,
      marginRatioPercentage: 75,
    },
    {
      id: '6',
      chainId: SupportedChainId.mainnet,
      name: 'Captain Doughnut 🍩⚓️',
      balance: 23456,
      positionsCount: 6,
      marginRatioPercentage: 90,
    },
    {
      id: '7',
      chainId: SupportedChainId.arbitrum,
      name: 'Zombie Unicorn 🦄🧟',
      balance: 34567,
      positionsCount: 7,
      marginRatioPercentage: 20,
    },
    {
      id: '8',
      chainId: SupportedChainId.arbitrum,
      name: 'Fluffy Cactus 🌵🌈',
      balance: 45678,
      positionsCount: 8,
      marginRatioPercentage: 35,
    },
    {
      id: '9',
      chainId: SupportedChainId.mainnet,
      name: 'Robot DJ 🤖🎧',
      balance: 56789,
      positionsCount: 9,
      marginRatioPercentage: 50,
    },
    {
      id: '10',
      chainId: SupportedChainId.mainnet,
      name: 'Pancake Master 🥞👑',
      balance: 78901,
      positionsCount: 10,
      marginRatioPercentage: 65,
    },
    {
      id: '11',
      chainId: SupportedChainId.mainnet,
      name: 'Ninja Turtle 🐢🥷',
      balance: 34567,
      positionsCount: 11,
      marginRatioPercentage: 80,
    },
    {
      id: '12',
      chainId: SupportedChainId.mainnet,
      name: 'Mermaid Diva 🧜‍♀️🎤',
      balance: 23456,
      positionsCount: 12,
      marginRatioPercentage: 10,
    },
    {
      id: '13',
      chainId: SupportedChainId.mainnet,
      name: 'Sushi Addict 🍣🍱',
      balance: 87654,
      positionsCount: 13,
      marginRatioPercentage: 25,
    },
    {
      id: '14',
      chainId: SupportedChainId.mainnet,
      name: 'Pixel Wizard 🧙‍♂️🎮',
      balance: 76543,
      positionsCount: 14,
      marginRatioPercentage: 40,
    },
    {
      id: '15',
      chainId: SupportedChainId.mainnet,
      name: 'Space Penguin 🐧🪐',
      balance: 65432,
      positionsCount: 15,
      marginRatioPercentage: 55,
    },
  ];
};

export type PortfolioMarginAccount = Awaited<ReturnType<typeof fetchPortfolioMarginAccounts>>[0];

// Define a cache object to store promises
const positionsCache = new Map<
  string,
  Promise<PortfolioMarginAccount[] | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchPortfolioMarginAccountsThunk = createAsyncThunk<
  Awaited<PortfolioMarginAccount[] | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
  }
>('portfolio/fetchPortfolioMarginAccounts', async ({ account }, thunkAPI) => {
  if (!account) {
    return [];
  }
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  // Check if the promise is already cached
  const cacheId = `${account.toLowerCase()}-${chainIds.join(',')}`;
  const cachedPromise = positionsCache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {
      return await fetchPortfolioMarginAccounts(chainIds, account.toLowerCase());
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  positionsCache.set(cacheId, promise);

  return await promise;
});
