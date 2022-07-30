import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Position } from '@voltz-protocol/v1-sdk';

import { AugmentedAMM, findCurrentAmm, findCurrentPosition, setPageTitle } from '@utilities';
import { Agents, AMMProvider, MintBurnFormModes, MintBurnFormProvider, PositionProvider } from '@contexts';
import { useAgent, useAMMs, usePositions } from '@hooks';

import { Page } from '@components/interface';
import { PageTitleDesc } from '@components/composite';
import ConnectedAMMTable from '../../components/containers/ConnectedAMMTable/ConnectedAMMTable';
import ConnectedMintBurnForm from '../../components/containers/ConnectedMintBurnForm/ConnectedMintBurnForm';
import ConnectedPositionTable from '../../components/containers/ConnectedPositionTable/ConnectedPositionTable';
import { getRenderMode } from './services';

const LiquidityProvider: React.FunctionComponent = () => {
  const [amm, setAMM] = useState<AugmentedAMM>();
  const [formMode, setFormMode] = useState<MintBurnFormModes>();
  const [position, setPosition] = useState<Position>();

  const { amms } = useAMMs();
  const { onChangeAgent } = useAgent();
  const { pathname, key } = useLocation();
  const { positions } = usePositions();

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

  const handleSelectAmm = (selectedAMM: AugmentedAMM) => {
    setFormMode(MintBurnFormModes.NEW_POSITION);
    setAMM(selectedAMM);
    setPosition(findCurrentPosition(positions || [], selectedAMM, [3]));
  };

  const handleSelectPosition = (selectedPosition: Position, mode: 'margin' | 'liquidity' | 'rollover') => {
    let newMode:MintBurnFormModes | undefined = undefined;
    if(mode === 'margin') newMode = MintBurnFormModes.EDIT_MARGIN;
    if(mode === 'liquidity') newMode = MintBurnFormModes.EDIT_LIQUIDITY;
    if(mode === 'rollover') newMode = MintBurnFormModes.ROLLOVER;

    setFormMode(newMode);
    setAMM(mode === 'rollover' ? findCurrentAmm(amms || [], selectedPosition) : selectedPosition.amm as AugmentedAMM);
    setPosition(selectedPosition);
  };

  const handleReset = () => {
    setFormMode(undefined);
    setAMM(undefined);
    setPosition(undefined);
  };

  return (
    <Page>
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
        <ConnectedPositionTable 
          amm={amm}
          onSelectItem={handleSelectPosition}
          agent={Agents.LIQUIDITY_PROVIDER}
        />
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
