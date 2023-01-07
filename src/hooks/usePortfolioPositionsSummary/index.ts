import { Position } from '@voltz-protocol/v1-sdk';
import { useEffect, useState } from 'react';

import { Agents } from '../../contexts/AgentContext/types';
import {
  getHealthCounters,
  getNetPayingRate,
  getNetReceivingRate,
  getTotalAccruedCashflow,
  getTotalMargin,
  getTotalNotional,
} from './helpers';

export const usePortfolioPositionsSummary = (positions: Position[], agent: Agents) => {
  const [healthCounters, setHealthCounters] =
    useState<{ danger: number; warning: number; healthy: number }>();
  const [totalNotional, setTotalNotional] = useState<number | undefined>();
  const [totalMargin, setTotalMargin] = useState<number | undefined>();
  const [totalAccruedCashflow, setTotalAccruedCashflow] = useState<number | undefined>();
  const [netReceivingRate, setNetReceivingRate] = useState<number | undefined>();
  const [netPayingRate, setNetPayingRate] = useState<number | undefined>();

  useEffect(() => {
    if (positions && positions.length !== 0 && positions.every((p) => p.initialized)) {
      setHealthCounters(getHealthCounters(positions));
      setTotalNotional(getTotalNotional(positions));
      setTotalMargin(getTotalMargin(positions));
      setTotalAccruedCashflow(getTotalAccruedCashflow(positions));
      setNetReceivingRate(getNetReceivingRate(positions, agent));
      setNetPayingRate(getNetPayingRate(positions, agent));
    } else {
      setHealthCounters(undefined);
      setTotalNotional(undefined);
      setTotalMargin(undefined);
      setTotalAccruedCashflow(undefined);
      setNetReceivingRate(undefined);
      setNetPayingRate(undefined);
    }
  }, [agent, positions]);

  return {
    healthCounters,
    totalNotional,
    totalMargin,
    totalAccruedCashflow,
    netReceivingRate,
    netPayingRate,
  };
};
