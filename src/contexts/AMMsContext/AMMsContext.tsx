import React, { useMemo, useRef } from 'react';
import { useAMM, useAsyncFunction, UseAsyncFunctionResult, useWallet } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { createContext, useContext } from 'react'
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk/dist/types/entities';
import { useGetWalletQuery, Wallet } from '@graphql';

export type AMMsProviderProps = {
};

export type AMMsContext = {
    variableApy: (amm:AugmentedAMM) => UseAsyncFunctionResult<AugmentedAMM, number | void>;
    fixedApr: (amm:AugmentedAMM) => UseAsyncFunctionResult<AugmentedAMM, number | void>;
    positionsInfo: Record<string,PositionInfo|undefined>;
    cachePositionInfo: (info: PositionInfo, position: Position) => void;
    isPositionFeched: (wallet: Wallet, previousWallet: Wallet, position?: Position) => boolean;
}

const AMMsCtx = createContext<AMMsContext>({} as unknown as AMMsContext);
AMMsCtx.displayName = 'AMMContext';

export const AMMsProvider: React.FunctionComponent<AMMsProviderProps> = ({ children }) => {

  const variableApys = useRef<Record<string,number>>({});
  const fixedAprs = useRef<Record<string,number>>({});

  const positionsInfo = useRef<Record<string,PositionInfo | undefined>>({});

  const cachePositionInfo = (info: PositionInfo, position: Position) => {
    positionsInfo.current[position.id] = info;
  }

  const isPositionFeched = (wallet: Wallet, previousWallet: Wallet, position?: Position) => {
    if (position) {
      positionsInfo.current[position.id] = undefined;
    }
    if (!position) {
      if ( wallet.positions && wallet.positions.length > previousWallet.positions.length) {
        return true; 
      }
    } else {
      let newPosition: Position | undefined = undefined;
      if (position && wallet.positions) {
        const poss = wallet.positions.filter((pos) => pos.id === position.id) as unknown as  Position[];
        newPosition = poss[0];
      }
      if (position && wallet && newPosition){
        if (newPosition.swaps.length > position.swaps.length ||
          newPosition.burns.length > position.burns.length || 
          newPosition.mints.length > position.mints.length ||
          newPosition.marginUpdates.length > position.marginUpdates.length || 
          newPosition.settlements.length > position.settlements.length) {
            return true;
        }
      }
    }
    return false;

  }

  // const fetchSubgraphPosition = useAsyncFunction(
  //   async (position?: Position) => {
  //     if (position) {
  //       positionsInfo.current[position.id] = undefined;
  //     }
  //     const { data, loading, error, stopPolling } = useGetWalletQuery({
  //       variables: { id: wallet?.id || '' }
  //     });
  //     while (loading) {
  //       const delay = new Promise(() => setTimeout(() => {}, 100));
  //       await delay;
  //     }
  //     if (!position) {
  //       if (data && data.wallet && wallet && data.wallet.positions.length > wallet.positions.length) {
  //         return true; 
  //       }
  //     }else {
  //       let newPosition: Position | undefined = undefined;
  //       if (position && data && data.wallet && data.wallet.positions) {
  //         const poss = data.wallet.positions.filter((pos) => pos.id === position.id) as unknown as  Position[];
  //         newPosition = poss[0];
  //       }
  //       if (position && data && data.wallet && newPosition){
  //         if (newPosition.swaps.length > position.swaps.length ||
  //           newPosition.burns.length > position.burns.length || 
  //           newPosition.mints.length > position.mints.length ||
  //           newPosition.marginUpdates.length > position.marginUpdates.length || 
  //           newPosition.settlements.length > position.settlements.length) {
  //             return true;
  //         }
  //       }
  //     }
  //     return false;
  //   },
  //   useMemo(() => undefined, []),
  // );

  const useVariableApy = (amm: AugmentedAMM) => (useAsyncFunction(
    async () => {
      if(variableApys.current[amm.id]) {
        return variableApys.current[amm.id];
      }
      if (amm) {
        const apy = await amm?.getInstantApy();
        variableApys.current[amm.id] = apy;
        return apy;
      }
      return 0;
    },
    useMemo(() => undefined, []),
  ));

  const useFixedApr = (amm: AugmentedAMM) => (useAsyncFunction(
    async () => {
      if(fixedAprs.current[amm.id]) {
        return fixedAprs.current[amm.id];
      }
      if (amm) {
        const apy = await amm?.getFixedApr();
        fixedAprs.current[amm.id] = apy;
        return apy;
      }
      return 0;
    },
    useMemo(() => undefined, []),
  ));

  const value = {
    variableApy: useVariableApy,
    fixedApr: useFixedApr,
    positionsInfo: positionsInfo.current,
    cachePositionInfo,
    isPositionFeched
  };

  return <AMMsCtx.Provider value={value}>{children}</AMMsCtx.Provider>;
};

export const useAMMsContext = (): AMMsContext => {
  return useContext(AMMsCtx);
};

export default AMMsProvider;