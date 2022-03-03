import { DeepPartial } from 'utility-types';
import { AMM } from '@voltz/v1-sdk';

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
      id = 'id',
      createdTimestamp,
      updatedTimestamp,
      fcmAddress,
      rateOracle,
      termStartTimestamp,
      termEndTimestamp,
      tickSpacing,
      sqrtPriceX96,
      liquidity,
      tick,
      txCount,
    }: Partial<Amm>) =>
      new AMM({
        id,
      }),
  );

  return { amms, loading, error: !!error };
};

export default useAMMs;
