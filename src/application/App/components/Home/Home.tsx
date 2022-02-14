import React, { useEffect, useMemo } from 'react';
import { DateTime, Duration } from 'luxon';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

import { Agents } from '@components/contexts';
import { useAgent } from '@hooks';
import { routes } from '@routes';
import { Typography, Button } from '@components/atomic';
import { Page, PoolTable } from '@components/interface';

const data = [
  {
    protocol: 'aUSDC',
    startDate: DateTime.now().minus(Duration.fromObject({ weeks: 1 })),
    endDate: DateTime.now().plus(Duration.fromObject({ weeks: 3 })),
    fixedApr: 5,
    variableApr: 15,
    positions: [
      {
        margin: 1000000,
        notional: 100000,
        agent: Agents.FIXED_TRADER,
      },
      {
        margin: 1050000,
        notional: 105000,
        agent: Agents.FIXED_TRADER,
      },
      {
        margin: 102300,
        notional: 10300,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
    ],
  },
  {
    protocol: 'cDAI',
    startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
    endDate: DateTime.now().plus(Duration.fromObject({ weeks: 2 })),
    fixedApr: 7,
    variableApr: 10,
    positions: [
      {
        margin: 100000,
        notional: 10000,
        agent: Agents.VARIABLE_TRADER,
      },
      {
        margin: 100000,
        notional: 10000,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
      {
        margin: 1023000,
        notional: 1023000,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
    ],
  },
  {
    protocol: 'cUSDC',
    startDate: DateTime.now().minus(Duration.fromObject({ weeks: 3 })),
    endDate: DateTime.now().plus(Duration.fromObject({ weeks: 7 })),
    fixedApr: 4,
    variableApr: 11,
    positions: [
      {
        margin: 100000,
        notional: 10000,
        agent: Agents.FIXED_TRADER,
      },
      {
        margin: 100000,
        notional: 10000,
        agent: Agents.VARIABLE_TRADER,
      },
      {
        margin: 100000,
        notional: 10000,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
      {
        margin: 1023000,
        notional: 1023000,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
    ],
  },
];

const Home: React.FunctionComponent = () => {
  const { onChangeAgent } = useAgent();
  const { pathname } = useLocation();
  const pathnameWithoutPrefix = pathname.slice(1);

  useEffect(() => {
    switch (pathnameWithoutPrefix) {
      case routes.POOLS:
      case routes.LP_FARM:
        onChangeAgent(Agents.LIQUIDITY_PROVIDER);

        break;

      default:
        onChangeAgent(Agents.FIXED_TRADER);

        break;
    }
  }, [pathname]);

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
  }, [pathname]);
  const pageSubtitle = useMemo(() => {
    switch (pathnameWithoutPrefix) {
      case routes.SWAP:
        return 'Our model allows for sophisticated trading strategies and produces highly attractive fixed rates of return for investors.';

      case routes.POOLS:
        return 'Our model allows for sophisticated trading strategies and produces highly attractive fixed rates of return for investors.';

      default:
        return null;
    }
  }, [pathname]);
  const tableMode = useMemo(() => {
    switch (pathnameWithoutPrefix) {
      case routes.SWAP:
      case routes.POOLS:
        return 'pools';

      default:
        return 'portfolio';
    }
  }, [pathname]);

  return (
    <Page>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
          <PoolTable data={data} mode={tableMode} />
        </Box>
      </Box>
    </Page>
  );
};

export default Home;
