import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Position } from '@voltz-protocol/v1-sdk';

import { AugmentedAMM, findCurrentAmm, findCurrentPosition, setPageTitle } from '@utilities';
import { Agents, AMMProvider, PositionProvider, SwapFormProvider } from '@contexts';
import { PageTitleDesc } from '@components/composite';
import { useAgent, useAMMs, usePositions } from '@hooks';
import { Page, SwapFormModes } from '@components/interface';
import ConnectedAMMTable from '../../components/containers/ConnectedAMMTable/ConnectedAMMTable';
import ConnectedPositionTable from '../../components/containers/ConnectedPositionTable/ConnectedPositionTable';
import ConnectedSwapForm from '../../components/containers/ConnectedSwapForm/ConnectedSwapForm';
import { getRenderMode } from './services';

const Trader: React.FunctionComponent = () => {
  const [formMode, setFormMode] = useState<SwapFormModes>();
  const [amm, setAMM] = useState<AugmentedAMM>();
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
    onChangeAgent(Agents.FIXED_TRADER);
  }, [setFormMode, setAMM, pathnameWithoutPrefix, onChangeAgent]);

  useEffect(() => {
    handleReset();
  }, [key]);

  useEffect(() => {
    switch(renderMode) {
      case 'pools': {
        setPageTitle('Trader Pools');
        break;
      }
      case 'portfolio': {
        setPageTitle('Trader Portfolio');
        break;
      }
      case 'form': {
        setPageTitle(`${position ? 'Edit' : 'New'} Trader Position`);
        break;
      }
    }
  }, [setPageTitle, renderMode, position])

  const handleSelectAmm = (selectedAMM: AugmentedAMM) => {
    setFormMode(SwapFormModes.NEW_POSITION);
    setAMM(selectedAMM);
    setPosition(findCurrentPosition(positions || [], selectedAMM, [1,2]));
  };
  const handleSelectPosition = (selectedPosition: Position, mode: 'margin' | 'liquidity' | 'rollover') => {
    // Please note that you will never get 'liquidity' mode here as that is only for LP positions.
    let newMode = SwapFormModes.EDIT_MARGIN;
    if(mode === 'rollover') newMode = SwapFormModes.ROLLOVER;

    setFormMode(newMode);
    setAMM(mode === 'rollover' ? findCurrentAmm(amms || [], selectedPosition) : selectedPosition.amm as AugmentedAMM);
    setPosition(selectedPosition);
  };
  const handleReset = () => {
    setFormMode(undefined)
    setAMM(undefined);
    setPosition(undefined);
  };

  return (
    <Page>

      {renderMode === 'pools' && (
        <Box sx={{ width: '100%', maxWidth: '768px', margin: '0 auto' }}>
          <Box sx={{ marginBottom: (theme) => theme.spacing(12) }}>
            <PageTitleDesc 
              title='Trade Fixed or Variable Rates' 
              desc='Choose a pool and decide whether to trade fixed or variable rates.' 
            />
          </Box>
          <ConnectedAMMTable onSelectItem={handleSelectAmm} />
        </Box>
      )}

      {renderMode === 'portfolio' && (
        <ConnectedPositionTable 
          onSelectItem={handleSelectPosition} 
          agent={Agents.FIXED_TRADER}
        />
      )}

      {renderMode === 'form' && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          {amm && (
            <AMMProvider amm={amm}>
              <PositionProvider position={position}>
                <SwapFormProvider mode={formMode}>
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

export default Trader;
