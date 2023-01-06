import Box from '@mui/material/Box';
import { AMM, Position } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ConnectedSwapForm } from '../../components/containers/ConnectedSwapForm/ConnectedSwapForm';
import { SwapFormModes } from '../../components/interface/SwapForm/types';
import { Agents } from '../../contexts/AgentContext/types';
import { AMMProvider } from '../../contexts/AMMContext/AMMContext';
import { PortfolioProvider } from '../../contexts/PortfolioContext/PortfolioContext';
import { PositionProvider } from '../../contexts/PositionContext/PositionContext';
import { SwapFormProvider } from '../../contexts/SwapFormContext/SwapFormContext';
import { useAgent } from '../../hooks/useAgent';
import { useAMMs } from '../../hooks/useAMMs';
import { usePositions } from '../../hooks/usePositions/usePositions';
import { useWallet } from '../../hooks/useWallet';
import { findCurrentAmm } from '../../utilities/amm';
import { setPageTitle } from '../../utilities/page';
import { ConnectedPositionTable } from './ConnectedPositionTable/ConnectedPositionTable';

export const TraderPortfolio: React.FunctionComponent = () => {
  const [formMode, setFormMode] = useState<SwapFormModes>();
  const [amm, setAMM] = useState<AMM>();
  const [position, setPosition] = useState<Position>();
  const [settling, setSettling] = useState<boolean>(false);

  const { traderAMMs } = useAMMs();
  const { onChangeAgent } = useAgent();
  const { key } = useLocation();
  const {
    positionsByAgentGroup,
    loading: loadingPositions,
    error: errorPositions,
  } = usePositions();
  const { agent } = useAgent();
  const { account } = useWallet();

  const renderMode = formMode ? 'form' : 'portfolio';

  useEffect(() => {
    setFormMode(undefined);
    setAMM(undefined);
    onChangeAgent(Agents.FIXED_TRADER);
  }, [setFormMode, setAMM, onChangeAgent]);

  useEffect(() => {
    handleReset();
  }, [key]);

  const handleCompletedSettling = () => {
    setSettling(!settling);
  };

  useEffect(() => {
    switch (renderMode) {
      case 'portfolio': {
        setPageTitle('Trader Portfolio', account);
        break;
      }
      case 'form': {
        setPageTitle(`${position ? 'Edit' : 'New'} Trader Position`, account);
        break;
      }
    }
  }, [setPageTitle, renderMode, position]);

  const handleSelectPosition = (
    selectedPosition: Position,
    mode: 'margin' | 'liquidity' | 'rollover' | 'notional',
  ) => {
    // Please note that you will never get 'liquidity' mode here as that is only for LP positions.
    let newMode = SwapFormModes.EDIT_MARGIN;
    if (mode === 'rollover') newMode = SwapFormModes.ROLLOVER;
    if (mode === 'notional') newMode = SwapFormModes.EDIT_NOTIONAL;

    setFormMode(newMode);
    setAMM(
      mode === 'rollover' ? findCurrentAmm(traderAMMs, selectedPosition) : selectedPosition.amm,
    );
    setPosition(selectedPosition);
  };
  const handleReset = () => {
    setFormMode(undefined);
    setAMM(undefined);
    setPosition(undefined);
  };

  return (
    <>
      {renderMode === 'portfolio' && (
        <PortfolioProvider
          positions={agent !== Agents.LIQUIDITY_PROVIDER ? positionsByAgentGroup : undefined}
        >
          <ConnectedPositionTable
            agent={Agents.FIXED_TRADER}
            errorPositions={errorPositions}
            handleCompletedSettling={handleCompletedSettling}
            loadingPositions={loadingPositions}
            positions={positionsByAgentGroup}
            onSelectItem={handleSelectPosition}
          />
        </PortfolioProvider>
      )}

      {renderMode === 'form' && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          {amm && (
            <AMMProvider amm={amm}>
              <PositionProvider position={position}>
                <SwapFormProvider
                  defaultValues={{
                    notional: formMode === SwapFormModes.EDIT_NOTIONAL ? 0 : undefined,
                  }}
                  mode={formMode}
                >
                  <ConnectedSwapForm onReset={handleReset} />
                </SwapFormProvider>
              </PositionProvider>
            </AMMProvider>
          )}
        </Box>
      )}
    </>
  );
};
