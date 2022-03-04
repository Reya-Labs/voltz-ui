import { DeepPartial } from 'utility-types';
import { AMM, Token, RateOracle } from '@voltz/v1-sdk';

import { useGetAmMsQuery, Amm_OrderBy, Amm } from '@graphql';

export type UseAMMsArgs = {};

export type UseAMMsResult = {
  amms?: DeepPartial<Amm>[];
  loading: boolean;
  error: boolean;
};

const useAMMs = (): UseAMMsResult => {
  const { data, loading, error } = useGetAmMsQuery({ variables: { orderBy: Amm_OrderBy.Id } });

  if (!data) {
    return { loading, error: !!error };
  }

  const amms = data.amms.map(
    ({
      rateOracle: {
        id: rateOracleAddress,
        token: { id: tokenAddress, name: tokenName },
      },
      ...rest
    }) =>
      new AMM({
        rateOracle: new RateOracle({ id: rateOracleAddress }),
        protocolName: 'aUSDC',
        underlyingToken: new Token({ id: tokenAddress, name: tokenName }),
        ...rest,
      }),
  );

  return { amms, loading, error: !!error };
};

export default useAMMs;
