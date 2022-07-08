import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Position } from '@voltz-protocol/v1-sdk';

import { AugmentedAMM, setPageTitle } from '@utilities';
import { Agents, AMMProvider, MintBurnFormModes, MintBurnFormProvider } from '@contexts';
import { useAgent } from '@hooks';

import { Page } from '@components/interface';
import { Panel } from '@components/atomic';
import { PageTitleDesc } from '@components/composite';
import ConnectedAMMTable from '../../components/containers/ConnectedAMMTable/ConnectedAMMTable';
import ConnectedMintBurnForm from '../../components/containers/ConnectedMintBurnForm/ConnectedMintBurnForm';
import ConnectedPositionTable from '../../components/containers/ConnectedPositionTable/ConnectedPositionTable';
import { getRenderMode } from './services';

const LiquidityProvider: React.FunctionComponent = () => {
  const [amm, setAMM] = useState<AugmentedAMM>();
  const [formMode, setFormMode] = useState<MintBurnFormModes>();
  const [position, setPosition] = useState<Position>();

  const { onChangeAgent } = useAgent();
  const { pathname, key } = useLocation();

  const pathnameWithoutPrefix = pathname.slice(1);
  const effectiveAmm = position?.amm as AugmentedAMM || amm;
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
    switch(renderMode) {
      case 'pools': {
        setPageTitle('Liquidity Provider Pools');
        break;
      }
      case 'portfolio': {
        setPageTitle('Liquidity Provider Portfolio');
        break;
      }
      case 'form': {
        setPageTitle(`${position ? 'Edit' : 'New'} Liquidity Provider Position`);
        break;
      }
    }
  }, [setPageTitle, renderMode, position])

  const handleSelectAmm = (selected: AugmentedAMM) => {
    setFormMode(MintBurnFormModes.NEW_POSITION);
    setAMM(selected);
    setPosition(undefined);
  };

  const handleSelectPosition = (selected: Position, mode: 'margin' | 'liquidity') => {
    setFormMode(mode === 'margin' ? MintBurnFormModes.EDIT_MARGIN : MintBurnFormModes.EDIT_LIQUIDITY);
    setAMM(undefined);
    setPosition(selected);
  };

  const handleReset = () => {
    setFormMode(undefined);
    setAMM(undefined);
    setPosition(undefined);
  };

  return (
    <Page backgroundView={formMode ? 'form' : 'table'}>
      {renderMode === 'pools' && (
        <Box sx={{ width: '100%', maxWidth: '870px', margin: '0 auto' }}>
          <Box sx={{ marginBottom: (theme) => theme.spacing(12) }}>
            <PageTitleDesc 
              title='Provide Liquidity' 
              desc='Choose a pool and provide liquidity within your chosen ranges.' 
            />
          </Box>
          <ConnectedAMMTable onSelectItem={handleSelectAmm} />
        </Box>
      )}

      {renderMode === 'portfolio' && (
        <Panel variant='dark' sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <ConnectedPositionTable 
            amm={effectiveAmm}
            onSelectItem={handleSelectPosition}
            agent={Agents.LIQUIDITY_PROVIDER}
          />
        </Panel>
      )}

      {renderMode === 'form' && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          <AMMProvider amm={effectiveAmm}>
            <MintBurnFormProvider amm={effectiveAmm} mode={formMode as MintBurnFormModes} position={position}>
              <ConnectedMintBurnForm onReset={handleReset} />
            </MintBurnFormProvider>
          </AMMProvider>
        </Box>
      )}
    </Page>
  );
};

export default LiquidityProvider;
