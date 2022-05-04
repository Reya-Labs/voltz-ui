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
import ConnectedAMMTable from '../ConnectedAMMTable/ConnectedAMMTable';
import ConnectedPositionTable from '../ConnectedPositionTable/ConnectedPositionTable';
import { ConnectedMintBurnForm } from './components';
import PageTitleDesc from 'src/components/interface/Page/PageTitleDesc/PageTitleDesc';

const LiquidityProvider: React.FunctionComponent = () => {
  const [formActive, setFormActive] = useState(false);
  const [editMode, setEditMode] = useState<'margin' | 'liquidity'>();

  // const [burnFormActive, setBurnFormActive] = useState(false);
  const [amm, setAMM] = useState<AugmentedAMM | null>(null);
  const [position, setPosition] = useState<Position | undefined>();
  const { onChangeAgent } = useAgent();
  const { pathname, key } = useLocation();
  const pathnameWithoutPrefix = pathname.slice(1);

  const effectiveAmm = useMemo(() => {
    return (position?.amm as AugmentedAMM) || amm;
  }, [amm, position]);

  const marginEditMode = formActive && !isNull(effectiveAmm) && Boolean(position) && editMode === 'margin';
  const liquidityEditMode = formActive && !isNull(effectiveAmm) && Boolean(position) && editMode === 'liquidity';

  // Keep for debugging the liquidity burning mechanism 
  // // eslint-disable-next-line
  // console.log('liq edit mode', liquidityEditMode);
  // // eslint-disable-next-line
  // console.log('margin edit mode', marginEditMode);
  

  useEffect(() => {
    setFormActive(false);
    setAMM(null);
    setPosition(undefined);
    onChangeAgent(Agents.LIQUIDITY_PROVIDER);
  }, [setFormActive, setAMM, pathnameWithoutPrefix, onChangeAgent]);

  useEffect(() => {
    handleReset();
  }, [key]);

  const pageTitle = useMemo(() => {
    switch (pathnameWithoutPrefix) {
      case routes.POOLS:
        return 'Provide Liquidity';

      case routes.LP_FARM:
        return 'YOUR LP POSITIONS';

      default:
        return '';
    }
  }, [pathnameWithoutPrefix]);

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
      <Box sx={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        {!formActive && ( //if form not active then
          <Box sx={{ height: '100%' }}>
            <PageTitleDesc 
              title={pageTitle} 
              desc='Choose a pool and provide liquidity within your chosen ranges.' 
            />

            {pathnameWithoutPrefix === routes.POOLS ? (
              <ConnectedAMMTable onSelectItem={handleSelectAmm} />
            ) : (
              <ConnectedPositionTable amm={effectiveAmm} onSelectItem={handleSelectPosition}  agent={Agents.LIQUIDITY_PROVIDER} />
            )}
          </Box>
        )}

        {formActive && !isNull(effectiveAmm) && (
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
            <ConnectedMintBurnForm 
              amm={effectiveAmm} 
              marginEditMode={marginEditMode}
              liquidityEditMode={liquidityEditMode}
              onReset={handleReset} 
              position={position} 
            /> 
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default LiquidityProvider;
