import React, { useState, useEffect, useCallback } from 'react';
import { AMM } from '@voltz/v1-sdk';

import { MinimumMarginAmountMintBurnPayload, MinimumMarginAmountSwapPayload } from './types';
import AMMContext from './AMMContext';
import { InfoPostSwap } from '@voltz/v1-sdk/dist/types/entities/amm';

export type AMMProviderProps = {
  amm: AMM;
};

const AMMProvider: React.FunctionComponent<AMMProviderProps> = ({ amm, children }) => {
  const [variableApy, setVariableApy] = useState<number | null>(null);
  const [variableApyShouldLoad, setVariableApyShouldLoad] = useState(false);
  const [variableApyLoading, setVariableApyLoading] = useState(false);
  const [variableApyError, setVariableApyError] = useState(false);
  const handleLoadVariableApy = useCallback(() => {
    setVariableApyLoading(false);
    setVariableApyError(false);
    setVariableApyShouldLoad(true);
  }, [setVariableApyLoading, setVariableApyError, setVariableApyShouldLoad]);

  useEffect(() => {
    const load = async () => {
      setVariableApyLoading(true);

      try {
        const variableApyResult = await amm.getVariableApy();

        setVariableApy(variableApyResult || null);
      } catch (error) {
        setVariableApyError(true);
        setVariableApy(null);
      }

      setVariableApyLoading(false);
      setVariableApyShouldLoad(false);
    };

    if (variableApyShouldLoad && !variableApyLoading) {
      load();
    }
  }, [variableApyShouldLoad, !!amm.signer]);

  const [minimumMarginAmountMintBurn, setMinimumMarginAmountMintBurn] = useState<number | null>(null);
  const [minimumMarginAmountMintBurnPayload, setMinimumMarginAmountMintBurnPayload] =
    useState<MinimumMarginAmountMintBurnPayload | null>(null);
  const [minimumMarginAmountMintBurnShouldLoad, setMinimumMarginAmountMintBurnShouldLoad] = useState(false);
  const [minimumMarginAmountMintBurnLoading, setMinimumMarginAmountMintBurnLoading] = useState(false);
  const [minimumMarginAmountMintBurnError, setMinimumMarginAmountMintBurnError] = useState(false);
  const handleLoadMinimumMarginAmountMintBurn = useCallback(
    ({ fixedLow, fixedHigh, notional }: MinimumMarginAmountMintBurnPayload) => {
      setMinimumMarginAmountMintBurnLoading(false);
      setMinimumMarginAmountMintBurnError(false);
      setMinimumMarginAmountMintBurnShouldLoad(true);
      setMinimumMarginAmountMintBurnPayload({ fixedLow, fixedHigh, notional });
    },
    [
      setMinimumMarginAmountMintBurnLoading,
      setMinimumMarginAmountMintBurnError,
      setMinimumMarginAmountMintBurnShouldLoad,
      setMinimumMarginAmountMintBurnPayload,
    ],
  );

  useEffect(() => {
    const load = async () => {
      setMinimumMarginAmountMintBurnLoading(true);

      try {
        const recipient = await amm.signer?.getAddress();

        if (!recipient || !minimumMarginAmountMintBurnPayload) {
          return;
        }

        const { fixedLow, fixedHigh, notional } = minimumMarginAmountMintBurnPayload;

       const result = await amm.getMinimumMarginRequirementPostMint({
            recipient,
            fixedLow,
            fixedHigh,
            notional,
            margin: 0,
          });
        setMinimumMarginAmountMintBurn(result || null);
      } catch (error) {
        setMinimumMarginAmountMintBurnError(true);
        setMinimumMarginAmountMintBurn(null);
      }

      setMinimumMarginAmountMintBurnLoading(false);
      setMinimumMarginAmountMintBurnShouldLoad(false);
      setMinimumMarginAmountMintBurnPayload(null);
    };

    if (
      minimumMarginAmountMintBurnShouldLoad &&
      minimumMarginAmountMintBurnPayload &&
      !minimumMarginAmountMintBurnLoading
    ) {
      load();
    }
  }, [minimumMarginAmountMintBurnShouldLoad, minimumMarginAmountMintBurnPayload, !!amm.signer]);

  const [minimumMarginAmountSwap, setMinimumMarginAmountSwap] = useState<number | null>(null);
  const [minimumMarginAmountSwapPayload, setMinimumMarginAmountSwapPayload] =
    useState<MinimumMarginAmountSwapPayload | null>(null);
  const [minimumMarginAmountSwapShouldLoad, setMinimumMarginAmountSwapShouldLoad] = useState(false);
  const [minimumMarginAmountSwapLoading, setMinimumMarginAmountSwapLoading] = useState(false);
  const [minimumMarginAmountSwapError, setMinimumMarginAmountSwapError] = useState(false);
  const handleLoadMinimumMarginAmountSwap = useCallback(
    ({ fixedLow, fixedHigh, notional, isFT }: MinimumMarginAmountSwapPayload) => {
      setMinimumMarginAmountSwapLoading(false);
      setMinimumMarginAmountSwapError(false);
      setMinimumMarginAmountSwapShouldLoad(true);
      setMinimumMarginAmountSwapPayload({ fixedLow, fixedHigh, notional, isFT });
    },
    [
      setMinimumMarginAmountSwapLoading,
      setMinimumMarginAmountSwapError,
      setMinimumMarginAmountSwapShouldLoad,
      setMinimumMarginAmountSwapPayload,
    ],
  );

  useEffect(() => {
    const load = async () => {
      setMinimumMarginAmountSwapLoading(true);

      try {
        const recipient = await amm.signer?.getAddress();

        if (!recipient || !minimumMarginAmountSwapPayload) {
          return;
        }

        const { fixedLow, fixedHigh, notional, isFT } = minimumMarginAmountSwapPayload;

       const result = (await amm.getInfoPostSwap({
            recipient,
            isFT: isFT,
            fixedLow,
            fixedHigh,
            notional,
          })) as InfoPostSwap;
        setMinimumMarginAmountSwap(result.marginRequirement || null);
      } catch (error) {
        setMinimumMarginAmountSwapError(true);
        setMinimumMarginAmountSwap(null);
      }

      setMinimumMarginAmountSwapLoading(false);
      setMinimumMarginAmountSwapShouldLoad(false);
      setMinimumMarginAmountSwapPayload(null);
    };

    let x = 0;
    if (x==0) {x+=1;}

    if (
      minimumMarginAmountSwapShouldLoad &&
      minimumMarginAmountSwapPayload &&
      !minimumMarginAmountSwapLoading
    ) {
      load();
    }
  }, [minimumMarginAmountSwapShouldLoad, minimumMarginAmountSwapPayload, !!amm.signer]);

  const value = {
    loadVariableApy: handleLoadVariableApy,
    variableApy,
    variableApyLoading,
    variableApyError,

    loadMinimumMarginAmountMintBurn: handleLoadMinimumMarginAmountMintBurn,
    minimumMarginAmountMintBurn,
    minimumMarginAmountMintBurnLoading,
    minimumMarginAmountMintBurnError,

    loadMinimumMarginAmountSwap: handleLoadMinimumMarginAmountSwap,
    minimumMarginAmountSwap,
    minimumMarginAmountSwapLoading,
    minimumMarginAmountSwapError,
  };

  return <AMMContext.Provider value={value}>{children}</AMMContext.Provider>;
};

export default AMMProvider;
