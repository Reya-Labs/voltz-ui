import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import isNull from 'lodash/isNull';
import { Position } from '@voltz-protocol/v1-sdk';

import { AugmentedAMM } from '@utilities';
import { Agents } from '@components/contexts';
import { PageTitleDesc } from '@components/composite';
import { Panel } from '@components/atomic';
import { useAgent } from '@hooks';
import { routes } from '@routes';
import { Page } from '@components/interface';
import ConnectedAMMTable from '../ConnectedAMMTable/ConnectedAMMTable';
import ConnectedPositionTable from '../ConnectedPositionTable/ConnectedPositionTable';
import { ConnectedSwapForm } from './components';

const Trader: React.FunctionComponent = () => {
  const [formActive, setFormActive] = useState(false);
  const [amm, setAMM] = useState<AugmentedAMM | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const { onChangeAgent } = useAgent();
  const { pathname, key } = useLocation();
  const pathnameWithoutPrefix = pathname.slice(1);

  const effectiveAmm = useMemo(() => {
    return (position?.amm as AugmentedAMM) || amm;
  }, [amm, position]);

  const getRenderMode = () => {
    if (!formActive) {
      if (pathnameWithoutPrefix === routes.SWAP) {
        return 'pools';
      } else {
        return 'portfolio';
      }
    }

    if (formActive && !isNull(effectiveAmm)) {
      return 'form'
    }
  };

  const renderMode = getRenderMode();
  const isEditingMargin = formActive && !isNull(effectiveAmm) && !isNull(position);

  useEffect(() => {
    setFormActive(false);
    setAMM(null);
    setPosition(null);
    onChangeAgent(Agents.FIXED_TRADER);
  }, [setFormActive, setAMM, pathnameWithoutPrefix, onChangeAgent]);

  useEffect(() => {
    handleReset();
  }, [key]);

  const handleSelectAmm = (selected: AugmentedAMM) => {
    setFormActive(true);
    setAMM(selected);
    setPosition(null);
  };
  const handleSelectPosition = (selected: Position) => {
    setFormActive(true);
    setAMM(null);
    setPosition(selected);
  };
  const handleReset = () => {
    setFormActive(false);
    setAMM(null);
    setPosition(null);
  };

  return (
    <Page backgroundView={formActive ? 'form' : 'table'}>

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
        <Panel variant='dark' sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <ConnectedPositionTable onSelectItem={handleSelectPosition} agent={Agents.FIXED_TRADER}/>
        </Panel>
      )}

      {renderMode === 'form' && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          <ConnectedSwapForm 
            amm={effectiveAmm} 
            isEditingMargin={isEditingMargin} 
            onReset={handleReset} 
          />
        </Box>
      )}
    </Page>
  );
};

export default Trader;
