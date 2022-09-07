import { useAgent, useAMM } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk/dist/types/entities';
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { getHealthCounters, getNetPayingRate, getNetReceivingRate, getTotalAccruedCashflow, getTotalMargin, getTotalNotional } from './services';

export type PortfolioProviderProps = {
  positions?: Position[];
};

export type PortfolioContext = {
  loadPosition: (position : Position) => void,
  info: Record<Position['id'], PositionInfo>,
  positions: Position[],
  healthCounters: {danger: number, warning: number, healthy: number} | undefined,
  totalNotional: number | undefined,
  totalMargin: number | undefined,
  totalAccruedCashflow: number | undefined,
  netReceivingRate: number | undefined,
  netPayingRate: number | undefined,
};

const PortfolioCtx = createContext<PortfolioContext>({} as unknown as PortfolioContext);
PortfolioCtx.displayName = 'PortfolioContext';

export const PortfolioProvider: React.FunctionComponent<PortfolioProviderProps> = ({ children, positions }) => {

  const defaultInfo = () => {
    const piData:Record<Position['id'], PositionInfo> = {};
    if (positions) {
      for (const pos of positions) {
        const positionInfo: PositionInfo = {
          notionalInUSD: 0,
          marginInUSD: 0,
          margin: 0,
          beforeMaturity: false,
          accruedCashflowInUSD: 0,
          accruedCashflow: 0,
          fixedApr: 0
        }
        piData[pos.id] = positionInfo;
      }
    }
    return piData;
  }

  const info = useRef<Record<Position['id'], PositionInfo>>({});
  const [loaded, setLoaded] = useState<string>("")
  const [healthCounters, setHealthCounters] = useState<{danger: number, warning: number, healthy: number}>();
  const [totalNotional, setTotalNotional] = useState<number | undefined>();
  const [totalMargin, setTotalMargin] = useState<number | undefined>();
  const [totalAccruedCashflow, setTotalAccruedCashflow] = useState<number | undefined>();
  const [netReceivingRate, setNetReceivingRate] = useState<number | undefined>();
  const [netPayingRate, setNetPayingRate] = useState<number | undefined>();

  const { agent } = useAgent();

  useEffect(() => {
    if (positions) {
        for ( let  i = 0; i < positions.length; i++ ) {
            void loadPositionInfo(positions[i]);
        }
    }
  }, [positions]);
  
  useEffect(() => {
    if (positions && positions.length > 0 && info.current && Object.keys(info.current).length === positions.length ) {
        setHealthCounters(getHealthCounters(positions, info.current));
        setTotalNotional(getTotalNotional(positions, info.current));
        setTotalMargin(getTotalMargin(positions, info.current));
        setTotalAccruedCashflow(getTotalAccruedCashflow(positions, info.current));
        setNetReceivingRate(getNetReceivingRate(positions, info.current, agent));
        setNetPayingRate(getNetPayingRate(positions, info.current, agent));
    }
  }, [info]);

  const loadPositionInfo = (position : Position) => {
    position.amm.getPositionInformation(position).then( positionInfo => {
      info.current[position.id] = positionInfo;
      setLoaded(JSON.stringify(info.current));
    })
  }

  const value = {
    loadPosition: loadPositionInfo,
    info: info.current,
    positions: positions,
    healthCounters,
    totalNotional,
    totalMargin,
    totalAccruedCashflow,
    netReceivingRate,
    netPayingRate,
  } as PortfolioContext;

  return <PortfolioCtx.Provider value={value}>{children}</PortfolioCtx.Provider>;
};

export const usePortfolioContext = () => useContext(PortfolioCtx);

export default PortfolioProvider;