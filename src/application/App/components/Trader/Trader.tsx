import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import isNull from 'lodash/isNull';
import { Position } from '@voltz-protocol/v1-sdk';

import { AugmentedAMM } from '@utilities';
import { Agents } from '@components/contexts';
import { useAgent } from '@hooks';
import { routes } from '@routes';
import { Typography, Button } from '@components/atomic';
import { Page } from '@components/interface';
import ConnectedAMMTable from '../ConnectedAMMTable/ConnectedAMMTable';
import ConnectedPositionTable from '../ConnectedPositionTable/ConnectedPositionTable';
import { ConnectedSwapForm } from './components';
import PageTitleDesc from 'src/components/interface/Page/PageTitleDesc/PageTitleDesc';

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

  const marginEditMode = formActive && !isNull(effectiveAmm) && !isNull(position);
  // const fcmMode = // How to make this depend on what is being clicked on the toggle button 

  useEffect(() => {
    setFormActive(false);
    setAMM(null);
    setPosition(null);
    onChangeAgent(Agents.FIXED_TRADER);
  }, [setFormActive, setAMM, pathnameWithoutPrefix, onChangeAgent]);

  useEffect(() => {
    handleReset();
  }, [key]);

  const pageTitle = useMemo(() => {
    switch (pathnameWithoutPrefix) {
      case routes.SWAP:
        return 'Trade Fixed or Variable Rates';

      case routes.PORTFOLIO:
        return 'PORTFOLIO SUMMARY';

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
    <Page backgroundView={formActive ? 'form' : 'table'}>
      <Box sx={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        {!formActive && (
          <Box sx={{ height: '100%' }}>
            <PageTitleDesc 
              title={pageTitle} 
              desc='Choose a pool and decide whether to trade fixed or variable rates.' 
            />
            {/* todo: bring this back once we have content for traders to link */}
            {/* {pathnameWithoutPrefix === routes.SWAP && (
              <Button
                variant="text"
                size="large"
                sx={{ marginBottom: (theme) => theme.spacing(8) }}
                link={`/${routes.POOLS}`}
              >
                PROVIDE LIQUIDITY
              </Button>
            )} */}
            {pathnameWithoutPrefix === routes.SWAP ? (
              <ConnectedAMMTable onSelectItem={handleSelectAmm} />
            ) : (
              <ConnectedPositionTable onSelectItem={handleSelectPosition} agent={Agents.FIXED_TRADER}/> // Agents.FIXED_TRADER by convention, Agents.VARIABLE_TRADER would also work 
            )}
          </Box>
        )}

        {formActive && !isNull(effectiveAmm) && (
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
            <ConnectedSwapForm 
              amm={effectiveAmm} 
              marginEditMode={marginEditMode} 
              onReset={handleReset} 
            />
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default Trader;
