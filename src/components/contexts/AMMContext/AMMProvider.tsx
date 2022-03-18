import React, { useState, useEffect, useCallback } from 'react';
import { AMM } from '@voltz/v1-sdk';

import AMMContext from './AMMContext';

export type AMMProviderProps = {
  amm: AMM;
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
  margin?: number;
};

const AMMProvider: React.FunctionComponent<AMMProviderProps> = ({ amm, children, fixedLow, fixedHigh, notional, margin }) => {
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
  const [minimumMarginAmountShouldLoad, setMinimumMarginAmountShouldLoad] = useState(false);
  const [minimumMarginAmountLoading, setMinimumMarginAmountLoading] = useState(false);
  const [minimumMarginAmountError, setMinimumMarginAmountError] = useState(false);
  const handleLoadMinimumMarginAmount = useCallback(() => {
    setMinimumMarginAmountLoading(false);
    setMinimumMarginAmountError(false);
    setMinimumMarginAmountShouldLoad(true);
  }, [minimumMarginAmountLoading, minimumMarginAmountError, minimumMarginAmountShouldLoad]);

  useEffect(() => {
    const load = async () => {
      setMinimumMarginAmountLoading(true);

      try {
        const recipient = await amm.signer?.getAddress();
        if (!recipient) throw "no account connected";
        if (!fixedLow) throw "no low fixed rate";
        if (!fixedHigh) throw "no high fixed rate";
        if (!notional) throw "no notional";
        if (!margin) throw "no margin";
        
        const result = await amm.getMinimumMarginRequirementPostMint({
          recipient: recipient,
          fixedLow: fixedLow,
          fixedHigh: fixedHigh,
          notional: notional,
          margin: margin
        });
        setMinimumMarginAmount(result || null);
      } catch (error) {
        setMinimumMarginAmountError(true);
        setMinimumMarginAmount(null);
      }

      setMinimumMarginAmountLoading(false);
      setMinimumMarginAmountShouldLoad(false);
    };

    if (minimumMarginAmountShouldLoad && !minimumMarginAmountLoading) {
      load();
    }
  }, [minimumMarginAmountShouldLoad, !!amm.signer]);

  const value = {
    loadVariableApy: handleLoadVariableApy,
    variableApy: variableApy,
    variableApyLoading: variableApyLoading,
    variableApyError: variableApyError,

    loadMinimumMarginAmount: handleLoadMinimumMarginAmount,
    minimumMarginAmount: minimumMarginAmount,
    minimumMarginAmountLoading: minimumMarginAmountLoading,
    minimumMarginAmountError: minimumMarginAmountError
  };

  return <AMMContext.Provider value={value}>{children}</AMMContext.Provider>;
};

export default AMMProvider;
