import { useMemo, useCallback } from 'react';
import isNull from 'lodash/isNull';
import { providers } from 'ethers';

import { Amm_OrderBy, useGetAmMsQuery } from '../graphql';
import useWallet from './useWallet';
import JSBI from 'jsbi';
import { DateTime } from 'luxon';

import { Token, RateOracle, BorrowAMM, AMM } from '@voltz-protocol/v1-sdk';
import { isBorrowing } from '../utilities';

export type UseBorrowAMMsResult = {
  borrowAmms?: BorrowAMM[];
  loading: boolean;
  error: boolean;
};

const useBorrowAMMs = (): UseBorrowAMMsResult => {
  const { signer } = useWallet();
  const isSignerAvailable = !isNull(signer);
  const { data, loading, error, refetch } = useGetAmMsQuery({
    variables: { orderBy: Amm_OrderBy.Id },
  });
  const handleRefetch = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const borrowAmms = useMemo(() => {
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
        const borrowMarkets = ammsData.filter((amm) => isBorrowing(amm.rateOracle.protocolId));
        const liveBorrowMarkets = borrowMarkets.filter((amm) => DateTime.now() < amm.endDateTime);
        return liveBorrowMarkets.map((amm) => new BorrowAMM({ id: amm.id, amm: amm }));
      } else {
        if (process.env.REACT_APP_WHITELIST) {
          const whitelist = process.env.REACT_APP_WHITELIST.split(',').map((s) => s.trim());
          ammsData = ammsData?.filter((amm) => whitelist.includes(amm.id));
          const borrowMarkets = ammsData.filter((amm) => isBorrowing(amm.rateOracle.protocolId));
          const liveBorrowMarkets = borrowMarkets.filter((amm) => DateTime.now() < amm.endDateTime);
          return liveBorrowMarkets.map((amm) => new BorrowAMM({ id: amm.id, amm: amm }));
        }
      }
    }
  }, [loading, error, isSignerAvailable, handleRefetch]);

  return { borrowAmms, loading, error: !!error };
};

export default useBorrowAMMs;
