import { useMemo } from 'react';
import isNull from 'lodash/isNull';
import { AMM, Token, RateOracle } from '@voltz/v1-sdk';

import { useWallet } from '@hooks';
import { useGetAmMsQuery, Amm_OrderBy } from '@graphql';

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
            rateOracle: new RateOracle({ id: rateOracleAddress, protocolId }),
            underlyingToken: new Token({ id: tokenAddress, name: tokenName }),
            ...rest,
          }),
      );
    }
  }, [loading, error, isSignerAvailable]);

  return { amms, loading, error: !!error };
};

export default useAMMs;
