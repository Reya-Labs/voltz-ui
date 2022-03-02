import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import isNull from 'lodash/isNull';

import { data } from '@utilities';
import { Agents } from '@components/contexts';
import { useAgent } from '@hooks';
import { routes } from '@routes';
import { Typography, Button } from '@components/atomic';
import { Page, PoolTable } from '@components/interface';
import { ConnectedPoolForm } from './components';

const Home: React.FunctionComponent = () => {
  const [formActive, setFormActive] = useState(false);
  const [vammId, setVammId] = useState<string | null>(null);
  const [positionId, setPositionId] = useState<string | null>(null);
  const { agent, onChangeAgent } = useAgent();
  const { pathname } = useLocation();
  const pathnameWithoutPrefix = pathname.slice(1);

  useEffect(() => {
    setFormActive(false);
    setVammId(null);
    setPositionId(null);

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
  }, [setFormActive, setVammId, setPositionId, pathnameWithoutPrefix, onChangeAgent]);

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
  const handleSelectVamm = (selectedVammId: string, selectedPositionId?: string) => {
    setFormActive(true);
    setVammId(selectedVammId);
    setPositionId(selectedPositionId || null);
  };
  const handleReset = () => {
    setFormActive(false);
    setVammId(null);
    setPositionId(null);
  };
  const transformedData = data.transformData({ data: data.data, mode: tableMode, agent });
  const datum = transformedData.find(({ id: datumVammId, positionId: datumPositionId }) => {
    if (datumVammId !== vammId) {
      return false;
    }

    if (!isNull(positionId) && datumPositionId !== positionId) {
      return false;
    }

    return true;
  });
  const handleSubmit = async (args: Record<string, unknown>) => {
    await Promise.resolve();

    console.warn({ args, datum });
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
            <PoolTable data={data.data} mode={tableMode} onSelectVamm={handleSelectVamm} />
          </Box>
        )}
        {formActive && !isNull(vammId) && (
          <Box sx={{ height: '100%' }}>
            <ConnectedPoolForm
              isModifying={!isNull(positionId)}
              datum={datum}
              onReset={handleReset}
              onSubmit={handleSubmit}
            />
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default Home;
