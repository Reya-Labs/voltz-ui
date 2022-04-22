import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import isNull from 'lodash/isNull';
import { Position } from '@voltz/v1-sdk';

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
    if (position) {
      return position.amm as AugmentedAMM;
    }

    return amm;
  }, [amm, position]);

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
    <Page>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
        
        {/* todo: below is a bit hacky */}

        {formActive && !isNull(effectiveAmm) && !isNull(position) && (
          <Box sx={{ height: '100%' }}>
            <ConnectedSwapForm amm={effectiveAmm} onReset={handleReset} marginEditMode />
          </Box>
        )}

        {formActive && !isNull(effectiveAmm) && isNull(position) && (
          <Box sx={{ height: '100%' }}>
            <ConnectedSwapForm amm={effectiveAmm} onReset={handleReset} />
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default Trader;
