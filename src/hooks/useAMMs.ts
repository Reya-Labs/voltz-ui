import { useMemo } from 'react';
import isNull from 'lodash/isNull';
import { AMM, Token, RateOracle } from '@voltz/v1-sdk';

import { useWallet } from '@hooks';
import { useGetAmMsQuery, Amm_OrderBy } from '@graphql';
import { providers } from 'ethers';

export type UseAMMsArgs = {};

export type UseAMMsResult = {
  amms?: AMM[];
  loading: boolean;
  error: boolean;
};

const useAMMs = (): UseAMMsResult => {
  const { signer } = useWallet();
  const isSignerAvailable = !isNull(signer);
  const { data, loading, error } = useGetAmMsQuery({ variables: { orderBy: Amm_OrderBy.Id } });
  const provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');

  const amms = useMemo(() => {
    if (data && !loading && !error) {
      return data.amms.map(
        ({
          rateOracle: {
            id: rateOracleAddress,
            protocolId,
            token: { id: tokenAddress, name: tokenName },
          },
          ...rest
        }) =>
          new AMM({
            signer,
            provider,
            rateOracle: new RateOracle({ id: rateOracleAddress, protocolId: protocolId as number }),
            underlyingToken: new Token({ id: tokenAddress, name: tokenName }),
            ...rest,
          }),
      );
    }
  }, [loading, error, isSignerAvailable]);

  return { amms, loading, error: !!error };
};

export default useAMMs;
