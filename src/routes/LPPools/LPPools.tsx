import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { findCurrentPosition, setPageTitle } from '../../utilities';
import {
  Agents,
  AMMProvider,
  MintBurnFormModes,
  MintBurnFormProvider,
  PositionProvider,
} from '../../contexts';
import { useAgent, useAMMs, usePositions, useWallet } from '../../hooks';

import { Page } from '@components/interface';
import { PageTitleDesc } from '@components/composite';
import { ConnectedMintBurnForm } from '../../components/containers/ConnectedMintBurnForm/ConnectedMintBurnForm';
import Button from '@mui/material/Button';
import { routes } from '../../routes';
import { AMMTable } from '../../components/interface/AMMTable/AMMTable';

export const LPPools: React.FunctionComponent = () => {
  const { amms = [], loading, error } = useAMMs();

  const [amm, setAMM] = useState<AMM>();
  const [formMode, setFormMode] = useState<MintBurnFormModes>();
  const [position, setPosition] = useState<Position>();

  const { onChangeAgent } = useAgent();
  const { key } = useLocation();
  const { positions } = usePositions();
  const { account } = useWallet();

  const renderMode = formMode ? 'form' : 'pools';

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
      case 'pools': {
        setPageTitle('Liquidity Provider Pools', account);
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
                to={`/${routes.LP_OPTIMISERS}`}
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
          <AMMTable amms={amms} loading={loading} error={error} onSelectItem={handleSelectAmm} />
        </Box>
      )}

      {renderMode === 'form' && amm && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          <AMMProvider amm={amm}>
            <PositionProvider position={position}>
              <MintBurnFormProvider mode={formMode as MintBurnFormModes}>
                <ConnectedMintBurnForm onReset={handleReset} />
              </MintBurnFormProvider>
            </PositionProvider>
          </AMMProvider>
        </Box>
      )}
    </Page>
  );
};
