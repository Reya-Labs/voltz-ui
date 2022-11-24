import { useMemo, useCallback } from 'react';
import isNull from 'lodash/isNull';
import { providers } from 'ethers';

import { Amm_OrderBy, useGetAmMsQuery } from '../graphql';
import useWallet from './useWallet';
import JSBI from 'jsbi';
import { useLocation } from 'react-router-dom';

import { Token, RateOracle, AMM } from '@voltz-protocol/v1-sdk';

export type UseAMMsResult = {
  amms?: AMM[];
  loading: boolean;
  error: boolean;
};

const useAMMs = (): UseAMMsResult => {
  const { signer } = useWallet();
  const { pathname } = useLocation();
  const isSignerAvailable = !isNull(signer);
  const { data, loading, error, refetch } = useGetAmMsQuery({
    variables: { orderBy: Amm_OrderBy.Id },
  });
  const handleRefetch = useCallback(async () => {
    await refetch();
  }, [refetch]);

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
          pathname !== '/trader-pools' &&
          pathname !== '/portfolio' &&
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
  }, [loading, error, isSignerAvailable, handleRefetch]);

  return { amms, loading, error: !!error };
};

export default useAMMs;
