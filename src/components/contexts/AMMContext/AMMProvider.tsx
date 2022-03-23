import React, { useState, useEffect, useCallback } from 'react';
import { AMM } from '@voltz/v1-sdk';

import { MinimumMarginAmountPayload } from './types';
import AMMContext from './AMMContext';

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

  const [minimumMarginAmount, setMinimumMarginAmount] = useState<number | null>(null);
  const [minimumMarginAmountPayload, setMinimumMarginAmountPayload] =
    useState<MinimumMarginAmountPayload | null>(null);
  const [minimumMarginAmountShouldLoad, setMinimumMarginAmountShouldLoad] = useState(false);
  const [minimumMarginAmountLoading, setMinimumMarginAmountLoading] = useState(false);
  const [minimumMarginAmountError, setMinimumMarginAmountError] = useState(false);
  const handleLoadMinimumMarginAmount = useCallback(
    ({ fixedLow, fixedHigh, notional }: MinimumMarginAmountPayload) => {
      setMinimumMarginAmountLoading(false);
      setMinimumMarginAmountError(false);
      setMinimumMarginAmountShouldLoad(true);
      setMinimumMarginAmountPayload({ fixedLow, fixedHigh, notional });
    },
    [
      setMinimumMarginAmountLoading,
      setMinimumMarginAmountError,
      setMinimumMarginAmountShouldLoad,
      setMinimumMarginAmountPayload,
    ],
  );

  useEffect(() => {
    const load = async () => {
      setMinimumMarginAmountLoading(true);

      try {
        const recipient = await amm.signer?.getAddress();

        if (!recipient || !minimumMarginAmountPayload) {
          return;
        }

        const { fixedLow, fixedHigh, notional } = minimumMarginAmountPayload;

        const result = await amm.getMinimumMarginRequirementPostMint({
          recipient,
          fixedLow,
          fixedHigh,
          notional,
          margin: 0,
        });
        setMinimumMarginAmount(result || null);
      } catch (error) {
        setMinimumMarginAmountError(true);
        setMinimumMarginAmount(null);
      }

      setMinimumMarginAmountLoading(false);
      setMinimumMarginAmountShouldLoad(false);
      setMinimumMarginAmountPayload(null);
    };

    if (
      minimumMarginAmountShouldLoad &&
      minimumMarginAmountPayload &&
      !minimumMarginAmountLoading
    ) {
      load();
    }
  }, [minimumMarginAmountShouldLoad, minimumMarginAmountPayload, !!amm.signer]);

  const value = {
    loadVariableApy: handleLoadVariableApy,
    variableApy,
    variableApyLoading,
    variableApyError,
    loadMinimumMarginAmount: handleLoadMinimumMarginAmount,
    minimumMarginAmount,
    minimumMarginAmountLoading,
    minimumMarginAmountError,
  };

  return <AMMContext.Provider value={value}>{children}</AMMContext.Provider>;
};

export default AMMProvider;
