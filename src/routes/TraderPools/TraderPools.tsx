import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { AMM, Position } from '@voltz-protocol/v1-sdk';

import { findCurrentPosition, setPageTitle } from '../../utilities';
import { Agents, AMMProvider, PositionProvider, SwapFormProvider } from '../../contexts';
import { PageTitleDesc } from '@components/composite';
import { useAgent, usePositions, useWallet } from '../../hooks';
import { Page, SwapFormModes } from '@components/interface';
import { ConnectedSwapForm } from '../../components/containers/ConnectedSwapForm/ConnectedSwapForm';
import { AMMTable } from '../../components/interface/AMMTable/AMMTable';

export const TraderPools: React.FunctionComponent = () => {
  const [formMode, setFormMode] = useState<SwapFormModes>();
  const [amm, setAMM] = useState<AMM>();
  const [position, setPosition] = useState<Position>();

  const { onChangeAgent } = useAgent();
  const { key } = useLocation();
  const { positions } = usePositions();
  const { account } = useWallet();

  const renderMode = formMode ? 'form' : 'pools';

  useEffect(() => {
    setFormMode(undefined);
    setAMM(undefined);
    onChangeAgent(Agents.FIXED_TRADER);
  }, [setFormMode, setAMM, onChangeAgent]);

  useEffect(() => {
    handleReset();
  }, [key]);

  useEffect(() => {
    switch (renderMode) {
      case 'pools': {
        setPageTitle('Trader Pools', account);
        break;
      }
      case 'form': {
        setPageTitle(`${position ? 'Edit' : 'New'} Trader Position`, account);
        break;
      }
    }
  }, [setPageTitle, renderMode, position]);

  const handleSelectAmm = (selectedAMM: AMM) => {
    setFormMode(SwapFormModes.NEW_POSITION);
    setAMM(selectedAMM);
    setPosition(findCurrentPosition(positions || [], selectedAMM, [1, 2]));
  };
  const handleReset = () => {
    setFormMode(undefined);
    setAMM(undefined);
    setPosition(undefined);
  };

  return (
    <Page>
      {renderMode === 'pools' && (
        <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <Box sx={{ marginBottom: (theme) => theme.spacing(12) }}>
            <PageTitleDesc
              title="Trade Fixed or Variable Rates"
              desc="Choose a pool and decide whether to trade fixed or variable rates."
            />
          </Box>
          <AMMTable onSelectItem={handleSelectAmm} />
        </Box>
      )}

      {renderMode === 'form' && amm && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
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
        </Box>
      )}
    </Page>
  );
};
