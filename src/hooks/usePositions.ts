import JSBI from 'jsbi';
import { useMemo } from 'react';
import isNull from 'lodash/isNull';
import { Position, Token, RateOracle } from '@voltz/v1-sdk';
import { providers } from 'ethers';

import { AugmentedAMM } from '@utilities';
import { useAgent, useWallet } from '@hooks';
import { Agents } from '@components/contexts';

export type usePositionsResult = {
  positions?: Position[];
  positionsByAgent?: Position[];
  loading: boolean;
  error: boolean;
};

const usePositions = (): usePositionsResult => {
  const { agent } = useAgent();
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
              token: { id: tokenAddress, name: tokenName, decimals },
            },
            ...restOfAmm
          },
          tickLower: { value: tickLowerValue },
          tickUpper: { value: tickUpperValue },
          owner: { id: ownerAddress },
          ...restOfPosition
        }) =>
          new Position({
            amm: new AugmentedAMM({
              signer,
              provider: providers.getDefaultProvider(
                process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK,
              ),
              rateOracle: new RateOracle({
                id: rateOracleAddress,
                protocolId: protocolId as number,
              }),
              underlyingToken: new Token({
                id: tokenAddress,
                name: tokenName,
                decimals: decimals as number,
              }),
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
  const positionsByAgent = useMemo(() => {
    return positions?.filter(({ isLiquidityProvider, effectiveFixedTokenBalance }) => {
      switch (agent) {
        case Agents.LIQUIDITY_PROVIDER:
          return isLiquidityProvider;

        case Agents.FIXED_TRADER:
          return effectiveFixedTokenBalance > 0;

        case Agents.VARIABLE_TRADER:
          return effectiveFixedTokenBalance < 0;
      }
    });
  }, [positions, agent]);

  return { positions, positionsByAgent, loading, error };
};

export default usePositions;
