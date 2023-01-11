import Box from '@mui/material/Box';
import { Position } from '@voltz-protocol/v1-sdk';

import { Agents } from '../../../../contexts/AgentContext/types';
import { usePortfolioPositionsSummary } from '../../../../hooks/usePortfolioPositionsSummary';
import { NetNotional } from './NetNotional/NetNotional';
import { PortfolioHeaderInfo } from './PorfolioHeaderInfo';
import { PortfolioHeaderHealth } from './PortfolioHeaderHealth';

export type PortfolioHeaderProps = {
  positions: Position[];
};

const currencyCode = 'USD';
const currencySymbol = '$';
export const PortfolioHeader = ({ positions }: PortfolioHeaderProps) => {
  const {
    totalNotional,
    totalMargin,
    totalAccruedCashflow,
    healthCounters,
    netPayingRate,
    netReceivingRate,
  } = usePortfolioPositionsSummary(positions, Agents.FIXED_TRADER);
  return (
    <>
      <NetNotional
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        totalNotional={totalNotional}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: (theme) => theme.spacing(6),
        }}
      >
        <Box>
          <PortfolioHeaderInfo
            currencyCode={currencyCode}
            currencySymbol={currencySymbol}
            netMargin={totalMargin}
            netMarginDiff={totalAccruedCashflow}
            netRatePaying={netPayingRate}
            netRateReceiving={netReceivingRate}
          />
        </Box>
        <Box>
          <PortfolioHeaderHealth
            positionsDanger={healthCounters?.danger}
            positionsHealthy={healthCounters?.healthy}
            positionsWarning={healthCounters?.warning}
          />
        </Box>
      </Box>
    </>
  );
};
