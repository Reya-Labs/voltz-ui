import React, { useState, useEffect, useCallback } from 'react';
import { AMM } from '@voltz/v1-sdk';

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
        const variableApyResult = await amm.variableApy();

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

  const value = {
    loadVariableApy: handleLoadVariableApy,
    variableApy,
    variableApyLoading,
    variableApyError,
  };

  return <AMMContext.Provider value={value}>{children}</AMMContext.Provider>;
};

export default AMMProvider;
