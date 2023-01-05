import Box from '@mui/material/Box';
import { AMM, Position } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PageTitleDesc } from '../../components/composite/PageTitleDesc/PageTitleDesc';
import { ConnectedSwapForm } from '../../components/containers/ConnectedSwapForm/ConnectedSwapForm';
import { AMMTable } from '../../components/interface/AMMTable/AMMTable';
import { SwapFormModes } from '../../components/interface/SwapForm/types';
import { Agents } from '../../contexts/AgentContext/types';
import { AMMProvider } from '../../contexts/AMMContext/AMMContext';
import { PositionProvider } from '../../contexts/PositionContext/PositionContext';
import { SwapFormProvider } from '../../contexts/SwapFormContext/SwapFormContext';
import { useAgent } from '../../hooks/useAgent';
import { useAMMs } from '../../hooks/useAMMs';
import { usePositions } from '../../hooks/usePositions/usePositions';
import { useWallet } from '../../hooks/useWallet';
import { findCurrentPosition } from '../../utilities/amm';
import { setPageTitle } from '../../utilities/page';

export const TraderPools: React.FunctionComponent = () => {
  const { aMMs, loading, error } = useAMMs();
  const [formMode, setFormMode] = useState<SwapFormModes>();
  const [amm, setAMM] = useState<AMM>();
  const [position, setPosition] = useState<Position>();

  const { onChangeAgent } = useAgent();
  const { key } = useLocation();
  const { positionsByAgentGroup } = usePositions();
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
    setPosition(findCurrentPosition(positionsByAgentGroup || [], selectedAMM));
  };
  const handleReset = () => {
    setFormMode(undefined);
    setAMM(undefined);
    setPosition(undefined);
  };

  return (
    <>
      {renderMode === 'pools' && (
        <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <Box sx={{ marginBottom: (theme) => theme.spacing(12) }}>
            <PageTitleDesc
              desc="Choose a pool and decide whether to trade fixed or variable rates."
              title="Trade Fixed or Variable Rates"
            />
          </Box>
          <AMMTable amms={aMMs} error={error} loading={loading} onSelectItem={handleSelectAmm} />
        </Box>
      )}

      {renderMode === 'form' && amm && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
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
        </Box>
      )}
    </>
  );
};
