import { useMemo, useEffect, useState } from 'react';
import isNull from 'lodash/isNull';
import { ethers, providers } from 'ethers';

import { Amm_OrderBy, useGetAmMsLazyQuery } from '../graphql';
import useWallet from './useWallet';
import JSBI from 'jsbi';
import { useLocation } from 'react-router-dom';

import { Token, RateOracle, AMM } from '@voltz-protocol/v1-sdk';
import { Protocol, AMM as AMMSDKV2 } from '@voltz-protocol/v2-sdk';
import { routes } from '../routes';

export type UseAMMsResult = {
  amms?: (AMM | AMMSDKV2)[];
  loading: boolean;
  error: boolean;
};

// todo: move it to some utility
const sdkV2AmmEntity = new Protocol({
  factoryAddress: process.env.REACT_APP_FACTORY_ADDRESS || '',
  provider: new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK || '',
  ),
  lpWhitelistedAmms: (process.env.REACT_APP_LP_ONLY_WHITELIST || '')
    .split(',')
    .map((s) => s.trim().toLowerCase()),
  traderWhitelistedAmms: (process.env.REACT_APP_WHITELIST || '')
    .split(',')
    .map((s) => s.trim().toLowerCase()),
  graphEndpoint: process.env.REACT_APP_SUBGRAPH_URL || '',
  coingeckoApiKey: process.env.REACT_APP_COINGECKO_API_KEY || '',
});

const useAMMs = (
  shouldUseSDKV2: boolean = false,
  filterBy: 'TRADER' | 'LP' | 'BORROW' = 'TRADER',
): UseAMMsResult => {
  const { signer } = useWallet();
  const { pathname } = useLocation();
  const isSignerAvailable = !isNull(signer);
  const [dataSDKV2, setDataSDKV2] = useState<AMMSDKV2[]>();
  const [errorSDKV2, setErrorSDKV2] = useState<boolean>();
  const [loadingSDKV2, setLoadingSDKV2] = useState<boolean>();
  const [query, { data, loading, error }] = useGetAmMsLazyQuery();

  useEffect(() => {
    if (!shouldUseSDKV2) {
      void query({
        variables: { orderBy: Amm_OrderBy.Id },
      });
      return;
    }

    setLoadingSDKV2(true);
    sdkV2AmmEntity
      .onLand()
      .then(() => {
        const amms = sdkV2AmmEntity.getAMMs({
          filterBy,
          active: true,
        });
        setDataSDKV2(amms);
        setLoadingSDKV2(false);
      })
      .catch((err) => {
        setErrorSDKV2(true);
        setLoadingSDKV2(false);
      });
  }, [shouldUseSDKV2]);

  const amms = useMemo(() => {
    if (data && !loading && !error) {
      let ammsData = data.amms.map(
        ({
          id: ammId,
          fcm: { id: fcmAddress },
          marginEngine: { id: marginEngineAddress },
          rateOracle: {
            id: rateOracleAddress,
            protocolId,
            token: { id: tokenAddress, name: tokenName, decimals },
          },
          tickSpacing,
          termStartTimestamp,
          termEndTimestamp,
          updatedTimestamp: ammUpdatedTimestamp,
          tick,
          txCount,
          totalNotionalTraded,
          totalLiquidity,
        }) =>
          new AMM({
            id: ammId,
            signer,
            provider: providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK),
            environment: process.env.REACT_APP_DECODING_TAG || 'NO_ENV',
            rateOracle: new RateOracle({
              id: rateOracleAddress,
              protocolId: parseInt(protocolId as string, 10),
            }),
            underlyingToken: new Token({
              id: tokenAddress,
              name: tokenName,
              decimals: decimals as number,
            }),
            factoryAddress: process.env.REACT_APP_FACTORY_ADDRESS || '0x',
            marginEngineAddress,
            fcmAddress,
            updatedTimestamp: ammUpdatedTimestamp as JSBI,
            termStartTimestamp: termStartTimestamp as JSBI,
            termEndTimestamp: termEndTimestamp as JSBI,
            tick: parseInt(tick as string, 10),
            tickSpacing: parseInt(tickSpacing as string, 10),
            txCount: parseInt(txCount as string, 10),
            totalNotionalTraded: totalNotionalTraded as JSBI,
            totalLiquidity: totalLiquidity as JSBI,
          }),
      );
      if (!process.env.REACT_APP_WHITELIST || process.env.REACT_APP_WHITELIST === `UNPROVIDED`) {
        return ammsData;
      } else {
        if (
          pathname !== `/${routes.TRADER_POOLS}` &&
          pathname !== `/${routes.PORTFOLIO}` &&
          process.env.REACT_APP_LP_ONLY_WHITELIST
        ) {
          const whitelist = process.env.REACT_APP_LP_ONLY_WHITELIST.split(',').map((s) =>
            s.trim().toLowerCase(),
          );
          ammsData = ammsData?.filter((amm) => whitelist.includes(amm.id.toLowerCase()));
          return ammsData;
        }
        if (process.env.REACT_APP_WHITELIST) {
          const whitelist = process.env.REACT_APP_WHITELIST.split(',').map((s) =>
            s.trim().toLowerCase(),
          );
          ammsData = ammsData?.filter((amm) => whitelist.includes(amm.id.toLowerCase()));
          return ammsData;
        }
      }
    }
  }, [loading, error, isSignerAvailable]);

  return { amms, loading, error: !!error };
};

export default useAMMs;
