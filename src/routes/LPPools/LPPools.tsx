import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AMM, Position } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { PageTitleDesc } from '../../components/composite/PageTitleDesc/PageTitleDesc';
import { ConnectedMintBurnForm } from '../../components/containers/ConnectedMintBurnForm/ConnectedMintBurnForm';
import { AMMTable } from '../../components/interface/AMMTable/AMMTable';
import { Agents } from '../../contexts/AgentContext/types';
import { AMMProvider } from '../../contexts/AMMContext/AMMContext';
import {
  MintBurnFormModes,
  MintBurnFormProvider,
} from '../../contexts/MintBurnFormContext/MintBurnFormContext';
import { PositionProvider } from '../../contexts/PositionContext/PositionContext';
import { useAgent } from '../../hooks/useAgent';
import { useAMMs } from '../../hooks/useAMMs';
import { usePositions } from '../../hooks/usePositions/usePositions';
import { useWallet } from '../../hooks/useWallet';
import { findCurrentPosition } from '../../utilities/amm';
import { setPageTitle } from '../../utilities/page';
import { routes } from '../paths';

export const LPPools: React.FunctionComponent = () => {
  const { aMMs, loading, error } = useAMMs();

  const [amm, setAMM] = useState<AMM>();
  const [formMode, setFormMode] = useState<MintBurnFormModes>();
  const [position, setPosition] = useState<Position>();

  const { onChangeAgent } = useAgent();
  const { key } = useLocation();
  const { positionsByAgentGroup } = usePositions(Agents.LIQUIDITY_PROVIDER);
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
    setPosition(findCurrentPosition(positionsByAgentGroup || [], selectedAMM.id));
  };

  const handleReset = () => {
    setFormMode(undefined);
    setAMM(undefined);
    setPosition(undefined);
  };

  return (
    <>
      {renderMode === 'pools' && (
        <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <Box sx={{ marginBottom: (theme) => theme.spacing(12) }}>
            <PageTitleDesc
              desc="Choose a pool and provide liquidity within your chosen ranges."
              title="Provide Liquidity"
            />
            <Button
              component={Link}
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
              to={`/${routes.LP_OPTIMISERS}`}
            >
              LP OPTIMISER VAULT
            </Button>
          </Box>
          <AMMTable amms={aMMs} error={error} loading={loading} onSelectItem={handleSelectAmm} />
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
    </>
  );
};
