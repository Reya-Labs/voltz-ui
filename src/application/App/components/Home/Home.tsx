import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import isNull from 'lodash/isNull';
import { AMM } from '@voltz/v1-sdk';

import { Agents } from '@components/contexts';
import { useAgent } from '@hooks';
import { routes } from '@routes';
import { Typography, Button } from '@components/atomic';
import { Page } from '@components/interface';
import { ConnectedAMMTable, ConnectedPoolForm } from './components';

const Home: React.FunctionComponent = () => {
  const [formActive, setFormActive] = useState(false);
  const [amm, setAMM] = useState<AMM | null>(null);
  const { agent, onChangeAgent } = useAgent();
  const { pathname } = useLocation();
  const pathnameWithoutPrefix = pathname.slice(1);

  useEffect(() => {
    setFormActive(false);
    setAMM(null);

    switch (pathnameWithoutPrefix) {
      case routes.POOLS:
      case routes.LP_FARM:
        onChangeAgent(Agents.LIQUIDITY_PROVIDER);

        break;

      default: {
        if (agent === Agents.LIQUIDITY_PROVIDER) {
          onChangeAgent(Agents.FIXED_TRADER);
        }

        break;
      }
    }
  }, [setFormActive, setAMM, pathnameWithoutPrefix, onChangeAgent]);

  const pageTitle = useMemo(() => {
    switch (pathnameWithoutPrefix) {
      case routes.SWAP:
        return 'Swap Fix or Variable Rates';

      case routes.PORTFOLIO:
        return 'PORTFOLIO';

      case routes.POOLS:
        return 'Provide Liquidity';

      case routes.LP_FARM:
        return 'LP FARM';

      default:
        return null;
    }
  }, [pathnameWithoutPrefix]);
  const pageSubtitle = useMemo(() => {
    switch (pathnameWithoutPrefix) {
      case routes.SWAP:
        return 'Our model allows for sophisticated trading strategies and produces highly attractive fixed rates of return for investors.';

      case routes.POOLS:
        return 'Our model allows for sophisticated trading strategies and produces highly attractive fixed rates of return for investors.';

      default:
        return null;
    }
  }, [pathnameWithoutPrefix]);
  const tableMode = useMemo(() => {
    switch (pathnameWithoutPrefix) {
      case routes.SWAP:
      case routes.POOLS:
        return 'pools';

      default:
        return 'portfolio';
    }
  }, [pathnameWithoutPrefix]);
  const handleSelectAmm = (selected: AMM) => {
    setFormActive(true);
    setAMM(selected);
  };
  const handleReset = () => {
    setFormActive(false);
    setAMM(null);
  };

  return (
    <Page>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!formActive && (
          <Box sx={{ height: '100%' }}>
            <Typography variant="h1">{pageTitle}</Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: (theme) => theme.spacing(90),
                marginBottom: (theme) => theme.spacing(4),
              }}
            >
              {pageSubtitle}
            </Typography>
            {pathnameWithoutPrefix === routes.SWAP && (
              <Button
                variant="text"
                size="large"
                sx={{ marginBottom: (theme) => theme.spacing(8) }}
                link={`/${routes.POOLS}`}
              >
                PROVIDE LIQUIDITY
              </Button>
            )}
            <ConnectedAMMTable mode={tableMode} onSelectItem={handleSelectAmm} />
          </Box>
        )}
        {formActive && !isNull(amm) && (
          <Box sx={{ height: '100%' }}>
            <ConnectedPoolForm isModifying={false} amm={amm} onReset={handleReset} />
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default Home;
