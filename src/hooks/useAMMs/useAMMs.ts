import { useMemo, useCallback } from 'react';
import isNull from 'lodash/isNull';
import { Token, RateOracle } from '@voltz/v1-sdk';
import { providers } from 'ethers';

import { useWallet } from '@hooks';
import { useGetAmMsQuery, Amm_OrderBy } from '@graphql';
import AugmentedAMM from './augmentedAmm';

export type UseAMMsArgs = {};

export type UseAMMsResult = {
  amms?: AugmentedAMM[];
  loading: boolean;
  error: boolean;
};

const useAMMs = (): UseAMMsResult => {
  const { signer } = useWallet();
  const isSignerAvailable = !isNull(signer);
  const { data, loading, error, refetch } = useGetAmMsQuery({
    variables: { orderBy: Amm_OrderBy.Id },
  });
  const handleRefetch = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const amms = useMemo(() => {
    if (data && !loading && !error) {
      return data.amms.map(
        ({
          rateOracle: {
            id: rateOracleAddress,
            protocolId,
            token: { id: tokenAddress, name: tokenName, decimals },
          },
          ...rest
        }) =>
          new AugmentedAMM({
            refetch: handleRefetch,
            signer,
            provider: providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK),
            rateOracle: new RateOracle({ id: rateOracleAddress, protocolId: protocolId as number }),
            underlyingToken: new Token({
              id: tokenAddress,
              name: tokenName,
              decimals: decimals as number,
            }),
            ...rest,
          }),
      );
    }
  }, [loading, error, isSignerAvailable, handleRefetch]);

  return { amms, loading, error: !!error };
};

export default useAMMs;
