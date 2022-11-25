import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { findCurrentAmm, setPageTitle } from '../../utilities';
import {
  Agents,
  AMMProvider,
  MintBurnFormModes,
  MintBurnFormProvider,
  PositionProvider,
  PortfolioProvider,
} from '../../contexts';
import { useAgent, useAMMs, usePositions, useWallet } from '../../hooks';

import { Page } from '@components/interface';
import { ConnectedMintBurnForm } from '../../components/containers/ConnectedMintBurnForm/ConnectedMintBurnForm';
import { ConnectedPositionTable } from '../../components/containers/ConnectedPositionTable/ConnectedPositionTable';

export const LPPortfolio: React.FunctionComponent = () => {
  const [amm, setAMM] = useState<AMM>();
  const [formMode, setFormMode] = useState<MintBurnFormModes>();
  const [position, setPosition] = useState<Position>();
  const [settling, setSettling] = useState<boolean>(false);

  const { amms } = useAMMs();
  const { onChangeAgent, agent } = useAgent();
  const { key } = useLocation();
  const { positionsByAgentGroup } = usePositions();
  const { account } = useWallet();

  const renderMode = formMode ? 'form' : 'portfolio';

  useEffect(() => {
    setFormMode(undefined);
    setAMM(undefined);
    setPosition(undefined);
    onChangeAgent(Agents.LIQUIDITY_PROVIDER);
  }, [setFormMode, setAMM, onChangeAgent]);

  useEffect(() => {
    handleReset();
  }, [key]);

  useEffect(() => {
    switch (renderMode) {
      case 'portfolio': {
        setPageTitle('Liquidity Provider Portfolio', account);
        break;
      }
      case 'form': {
        setPageTitle(`${position ? 'Edit' : 'New'} Liquidity Provider Position`, account);
        break;
      }
    }
  }, [setPageTitle, renderMode, position]);

  const handleSelectPosition = (
    selectedPosition: Position,
    mode: 'margin' | 'liquidity' | 'rollover' | 'notional',
  ) => {
    let newMode: MintBurnFormModes | undefined = undefined;
    if (mode === 'margin') newMode = MintBurnFormModes.EDIT_MARGIN;
    if (mode === 'liquidity') newMode = MintBurnFormModes.EDIT_LIQUIDITY;
    if (mode === 'rollover') newMode = MintBurnFormModes.ROLLOVER;

    setFormMode(newMode);
    setAMM(
      mode === 'rollover' ? findCurrentAmm(amms || [], selectedPosition) : selectedPosition.amm,
    );
    setPosition(selectedPosition);
  };

  const handleCompletedSettling = () => {
    setSettling(!settling);
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
          positions={agent === Agents.LIQUIDITY_PROVIDER ? positionsByAgentGroup : undefined}
        >
          <ConnectedPositionTable
            amm={amm}
            onSelectItem={handleSelectPosition}
            agent={Agents.LIQUIDITY_PROVIDER}
            handleCompletedSettling={handleCompletedSettling}
          />
        </PortfolioProvider>
      )}

      {!settling && renderMode === 'portfolio' && (
        <PortfolioProvider
          positions={agent === Agents.LIQUIDITY_PROVIDER ? positionsByAgentGroup : undefined}
        >
          <ConnectedPositionTable
            amm={amm}
            onSelectItem={handleSelectPosition}
            agent={Agents.LIQUIDITY_PROVIDER}
            handleCompletedSettling={handleCompletedSettling}
          />
        </PortfolioProvider>
      )}

      {renderMode === 'form' && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          {amm && (
            <AMMProvider amm={amm}>
              <PositionProvider position={position}>
                <MintBurnFormProvider mode={formMode as MintBurnFormModes}>
                  <ConnectedMintBurnForm onReset={handleReset} />
                </MintBurnFormProvider>
              </PositionProvider>
            </AMMProvider>
          )}
        </Box>
      )}
    </Page>
  );
};
