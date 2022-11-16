import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { findCurrentAmm, findCurrentPosition, setPageTitle } from '@utilities';
import {
  Agents,
  AMMProvider,
  MintBurnFormModes,
  MintBurnFormProvider,
  PositionProvider,
  PortfolioProvider,
} from '@contexts';
import { useAgent, useAMMs, usePositions, useWallet } from '@hooks';

import { Page } from '@components/interface';
import { PageTitleDesc } from '@components/composite';
import ConnectedAMMTable from '../../components/containers/ConnectedAMMTable/ConnectedAMMTable';
import ConnectedMintBurnForm from '../../components/containers/ConnectedMintBurnForm/ConnectedMintBurnForm';
import ConnectedPositionTable from '../../components/containers/ConnectedPositionTable/ConnectedPositionTable';
import { getRenderMode } from './services';
import { Button } from '@mui/material';
import { routes } from '@routes';

const LiquidityProvider: React.FunctionComponent = () => {
  const [amm, setAMM] = useState<AMM>();
  const [formMode, setFormMode] = useState<MintBurnFormModes>();
  const [position, setPosition] = useState<Position>();
  const [settling, setSettling] = useState<boolean>(false);

  const { amms } = useAMMs();
  const { onChangeAgent, agent } = useAgent();
  const { pathname, key } = useLocation();
  const { positions, positionsByAgentGroup } = usePositions();
  const { account } = useWallet();

  const pathnameWithoutPrefix = pathname.slice(1);
  const renderMode = getRenderMode(formMode, pathnameWithoutPrefix);

  useEffect(() => {
    setFormMode(undefined);
    setAMM(undefined);
    setPosition(undefined);
    onChangeAgent(Agents.LIQUIDITY_PROVIDER);
  }, [setFormMode, setAMM, pathnameWithoutPrefix, onChangeAgent]);

  useEffect(() => {
    handleReset();
  }, [key]);

  useEffect(() => {
    switch (renderMode) {
      case 'pools': {
        setPageTitle('Liquidity Provider Pools', account);
        break;
      }
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

  const handleSelectAmm = (selectedAMM: AMM) => {
    setFormMode(MintBurnFormModes.NEW_POSITION);
    setAMM(selectedAMM);
    setPosition(findCurrentPosition(positions || [], selectedAMM, [3]));
  };

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
      {renderMode === 'pools' && (
        <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <Box sx={{ marginBottom: (theme) => theme.spacing(12) }}>
            <PageTitleDesc
              title="Provide Liquidity"
              desc="Choose a pool and provide liquidity within your chosen ranges."
            />
            {process.env.REACT_APP_ECOSYSTEM && process.env.REACT_APP_ECOSYSTEM !== `UNPROVIDED` ? (
              <Button
                component={Link}
                to={`/${routes.PRODUCTS}`}
                sx={{
                  color: 'primary.base',
                  marginTop: (theme) => theme.spacing(2),
                  padding: (theme) => theme.spacing(0.5, 1),
                  fontSize: '18px',
                  lineHeight: '14px',
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
              >
                LP OPTIMISER VAULT
              </Button>
            ) : null}
          </Box>
          <ConnectedAMMTable onSelectItem={handleSelectAmm} />
        </Box>
      )}

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

export default LiquidityProvider;
