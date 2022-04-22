import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import isNull from 'lodash/isNull';
import { Position } from '@voltz/v1-sdk';

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
  const [amm, setAMM] = useState<AugmentedAMM | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const { onChangeAgent } = useAgent();
  const { pathname, key } = useLocation();
  const pathnameWithoutPrefix = pathname.slice(1);

  const effectiveAmm = useMemo(() => {
    return (position?.amm as AugmentedAMM) || amm;
  }, [amm, position]);

  useEffect(() => {
    setFormActive(false);
    setAMM(null);
    setPosition(null);
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
    <Page>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!formActive && ( //if form not active then
          <Box sx={{ height: '100%' }}>
            <PageTitleDesc 
              title={pageTitle} 
              desc='Choose a pool and provide liquidity within your chosen ranges.' 
            />

            {pathnameWithoutPrefix === routes.POOLS ? (
              <ConnectedAMMTable onSelectItem={handleSelectAmm} />
            ) : (
              <ConnectedPositionTable onSelectItem={handleSelectPosition}  agent={Agents.LIQUIDITY_PROVIDER} />
            )}
          </Box>
        )}
        {formActive && !isNull(effectiveAmm) && !isNull(position) && (
          <Box sx={{ height: '100%' }}>
            <ConnectedMintBurnForm amm={effectiveAmm} onReset={handleReset} marginEditMode position={position} /> 
          </Box>
        )}  

        {formActive && !isNull(effectiveAmm) && isNull(position) && (
          <Box sx={{ height: '100%' }}>
            <ConnectedMintBurnForm amm={effectiveAmm} onReset={handleReset} /> 
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default LiquidityProvider;
//need cases for marginEditMode