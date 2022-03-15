import JSBI from 'jsbi';
import { useMemo } from 'react';
import isNull from 'lodash/isNull';
import { Position, AMM, Token, RateOracle } from '@voltz/v1-sdk';

import { useWallet } from '@hooks';

export type usePositionsArgs = {};

export type usePositionsResult = {
  positions?: Position[];
  loading: boolean;
  error: boolean;
};

const usePositions = (): usePositionsResult => {
  const { signer, wallet, loading, error } = useWallet();
  const isSignerAvailable = !isNull(signer);

  const positions = useMemo(() => {
    if (wallet && wallet.positions && !loading && !error) {
      return wallet.positions.map(
        ({
          amm: {
            rateOracle: {
              id: rateOracleAddress,
              protocolId,
              token: { id: tokenAddress, name: tokenName },
            },
            ...restOfAmm
          },
          tickLower: { value: tickLowerValue },
          tickUpper: { value: tickUpperValue },
          owner: { id: ownerAddress },
          ...restOfPosition
        }) =>
          new Position({
            amm: new AMM({
              signer,
              rateOracle: new RateOracle({
                id: rateOracleAddress,
                protocolId: protocolId as number,
              }),
              underlyingToken: new Token({ id: tokenAddress, name: tokenName }),
              ...restOfAmm,
            }),
            tickLower: JSBI.toNumber(JSBI.BigInt(tickLowerValue as string)),
            tickUpper: JSBI.toNumber(JSBI.BigInt(tickUpperValue as string)),
            owner: ownerAddress,
            ...restOfPosition,
          }),
      );
    }
  }, [loading, error, isSignerAvailable]);

  return { positions, loading, error };
};

export default usePositions;
