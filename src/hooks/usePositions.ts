import JSBI from 'jsbi';
import { useMemo, useEffect } from 'react';
import isNull from 'lodash/isNull';
import { Position, Token, RateOracle } from '@voltz/v1-sdk';
import { providers } from 'ethers';

import { AugmentedAMM } from '@utilities';
import { actions, selectors } from '@store';
import { useAgent, useWallet, useSelector, useDispatch } from '@hooks';
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
  const positionCount = wallet?.positions.length;

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
  }, [positionCount, loading, error, isSignerAvailable]);
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
  const activeTransactions = useSelector(selectors.transactionsSelector);
  const shouldTryToCloseTransactions =
    activeTransactions.length > 0 && positions && positions.length > 0;
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldTryToCloseTransactions) {
      activeTransactions.forEach((activeTransaction) => {
        const matchingPosition = positions.find(
          ({
            amm: { id: ammId },
            fixedRateLower,
            fixedRateUpper,
            effectiveFixedTokenBalance,
            isLiquidityProvider,
          }) => {
            if (ammId !== activeTransaction.ammId) {
              return false;
            }

            if (isLiquidityProvider && activeTransaction.agent !== Agents.LIQUIDITY_PROVIDER) {
              return false;
            }

            if (effectiveFixedTokenBalance > 0 && activeTransaction.agent !== Agents.FIXED_TRADER) {
              return false;
            }

            if (fixedRateLower.toNumber() !== activeTransaction.fixedLow) {
              return false;
            }

            if (fixedRateUpper.toNumber() !== activeTransaction.fixedHigh) {
              return false;
            }

            return true;
          },
        );

        if (matchingPosition) {
          dispatch(actions.closeTransaction(activeTransaction.id));
        }
      });
    }
  }, [shouldTryToCloseTransactions, positions, dispatch]);

  return { positions, positionsByAgent, loading, error };
};

export default usePositions;
