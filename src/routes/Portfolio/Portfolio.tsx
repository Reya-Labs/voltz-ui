import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { findCurrentAmm, setPageTitle } from '../../utilities';
import {
  Agents,
  AMMProvider,
  PositionProvider,
  SwapFormProvider,
  PortfolioProvider,
} from '../../contexts';
import { useAgent, useAMMs, usePositions, useWallet } from '../../hooks';
import { Page, SwapFormModes } from '@components/interface';
import { ConnectedPositionTable } from '../../components/containers/ConnectedPositionTable/ConnectedPositionTable';
import { ConnectedSwapForm } from '../../components/containers/ConnectedSwapForm/ConnectedSwapForm';

const Portfolio: React.FunctionComponent = () => {
  const [formMode, setFormMode] = useState<SwapFormModes>();
  const [amm, setAMM] = useState<AMM>();
  const [position, setPosition] = useState<Position>();
  const [settling, setSettling] = useState<boolean>(false);

  const { amms } = useAMMs();
  const { onChangeAgent } = useAgent();
  const { key } = useLocation();
  const { positionsByAgentGroup } = usePositions();
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
      mode === 'rollover' ? findCurrentAmm(amms || [], selectedPosition) : selectedPosition.amm,
    );
    setPosition(selectedPosition);
  };
  const handleReset = () => {
    setFormMode(undefined);
    setAMM(undefined);
    setPosition(undefined);
  };

  return (
    <Page>
      {settling && renderMode === 'portfolio' && (
        <PortfolioProvider
          positions={agent !== Agents.LIQUIDITY_PROVIDER ? positionsByAgentGroup : undefined}
        >
          <ConnectedPositionTable
            onSelectItem={handleSelectPosition}
            agent={Agents.FIXED_TRADER}
            handleCompletedSettling={handleCompletedSettling}
          />
        </PortfolioProvider>
      )}

      {!settling && renderMode === 'portfolio' && (
        <PortfolioProvider
          positions={agent !== Agents.LIQUIDITY_PROVIDER ? positionsByAgentGroup : undefined}
        >
          <ConnectedPositionTable
            onSelectItem={handleSelectPosition}
            agent={Agents.FIXED_TRADER}
            handleCompletedSettling={handleCompletedSettling}
          />
        </PortfolioProvider>
      )}

      {renderMode === 'form' && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          {amm && (
            <AMMProvider amm={amm}>
              <PositionProvider position={position}>
                <SwapFormProvider
                  mode={formMode}
                  defaultValues={{
                    notional: formMode === SwapFormModes.EDIT_NOTIONAL ? 0 : undefined,
                  }}
                >
                  <ConnectedSwapForm onReset={handleReset} />
                </SwapFormProvider>
              </PositionProvider>
            </AMMProvider>
          )}
        </Box>
      )}
    </Page>
  );
};

export default Portfolio;
