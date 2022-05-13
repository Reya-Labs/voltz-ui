import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import isNull from 'lodash/isNull';
import { Position } from '@voltz-protocol/v1-sdk';

import { AugmentedAMM } from '@utilities';
import { Agents } from '@components/contexts';
import { useAgent } from '@hooks';
import { routes } from '@routes';
import { Page } from '@components/interface';
import { Panel } from '@components/atomic';
import { PageTitleDesc } from '@components/composite';
import ConnectedAMMTable from '../ConnectedAMMTable/ConnectedAMMTable';
import ConnectedPositionTable from '../ConnectedPositionTable/ConnectedPositionTable';
import { ConnectedMintBurnForm } from './components';

const LiquidityProvider: React.FunctionComponent = () => {
  const [formActive, setFormActive] = useState(false);
  const [editMode, setEditMode] = useState<'margin' | 'liquidity'>();

  const [amm, setAMM] = useState<AugmentedAMM | null>(null);
  const [position, setPosition] = useState<Position | undefined>();
  const { onChangeAgent } = useAgent();
  const { pathname, key } = useLocation();
  const pathnameWithoutPrefix = pathname.slice(1);

  const effectiveAmm = useMemo(() => {
    return (position?.amm as AugmentedAMM) || amm;
  }, [amm, position]);

  const getRenderMode = () => {
    if (!formActive) {
      if (pathnameWithoutPrefix === routes.POOLS) {
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
  const isEditingMargin = formActive && !isNull(effectiveAmm) && Boolean(position) && editMode === 'margin';
  const isEditingLiquidity = formActive && !isNull(effectiveAmm) && Boolean(position) && editMode === 'liquidity';

  useEffect(() => {
    setFormActive(false);
    setAMM(null);
    setPosition(undefined);
    onChangeAgent(Agents.LIQUIDITY_PROVIDER);
  }, [setFormActive, setAMM, pathnameWithoutPrefix, onChangeAgent]);

  useEffect(() => {
    handleReset();
  }, [key]);

  const handleSelectAmm = (selected: AugmentedAMM) => {
    setFormActive(true);
    setAMM(selected);
    setPosition(undefined);
  };

  const handleSelectPosition = (selected: Position, mode: 'margin' | 'liquidity') => {
    setEditMode(mode);
    setFormActive(true);
    setAMM(null);
    setPosition(selected);
  };
  const handleReset = () => {
    setFormActive(false);
    setAMM(null);
    setPosition(undefined);
  };

  return (
    <Page backgroundView={formActive ? 'form' : 'table'}>
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
          <ConnectedMintBurnForm 
            amm={effectiveAmm} 
            isEditingMargin={isEditingMargin}
            isEditingLiquidity={isEditingLiquidity}
            onReset={handleReset} 
            position={position} 
          /> 
        </Box>
      )}
    </Page>
  );
};

export default LiquidityProvider;
