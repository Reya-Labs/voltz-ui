import { useAgent, useAMM } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk/dist/types/entities';
import { createContext, useContext, useEffect, useState } from 'react'
import { getHealthCounters, getNetPayingRate, getNetReceivingRate, getTotalAccruedCashflow, getTotalMargin, getTotalNotional } from './services';

export type PortfolioProviderProps = {
  positions?: Position[];
};

export type PortfolioContextPopulated = ReturnType<typeof useAMM> & {
  info: Record<Position['id'], PositionInfo>,
  positions: Position[],
  healthCounters: {} | undefined,
  totalNotional: number | undefined,
  totalMargin: number | undefined,
  totalAccruedCashflow: number | undefined,
  netReceivingRate: number | undefined,
  netPayingRate: number | undefined,
};

export type PortfolioContext = Partial<PortfolioContextPopulated>;

const portfolioContext = createContext<PortfolioContext>({} as unknown as PortfolioContext);
portfolioContext.displayName = 'PortfolioContext';

export const PositionProvider: React.FunctionComponent<PortfolioProviderProps> = ({ children, positions }) => {

  const [info, setInfo] = useState<Record<Position['id'], PositionInfo> | undefined>();
  const [storedPositions, setStoredPositions] = useState<Position[]>(positions ?? []);
  const [healthCounters, setHealthCounters] = useState<{}>();
  const [totalNotional, setTotalNotional] = useState<number | undefined>();
  const [totalMargin, setTotalMargin] = useState<number | undefined>();
  const [totalAccruedCashflow, setTotalAccruedCashflow] = useState<number | undefined>();
  const [netReceivingRate, setNetReceivingRate] = useState<number | undefined>();
  const [netPayingRate, setNetPayingRate] = useState<number | undefined>();

  const { agent } = useAgent();

  useEffect(() => {
    if (positions && JSON.stringify(positions) !== JSON.stringify(storedPositions)) {
        for ( let  i = 0; i < positions.length; i++ ) {
            void loadPositionInfo(positions[i]);
        }
        setStoredPositions(positions);
    }
  }, [JSON.stringify(positions)]);

  useEffect(() => {
    if (positions && positions.length > 0 && info && Object.keys(info).length === positions.length ) {
        setHealthCounters(getHealthCounters(positions, info));
        setTotalNotional(getTotalNotional(positions, info));
        setTotalMargin(getTotalMargin(positions, info));
        setTotalAccruedCashflow(getTotalAccruedCashflow(positions, info));
        setNetReceivingRate(getNetReceivingRate(positions, info, agent));
        setNetPayingRate(getNetPayingRate(positions, info, agent));
    }
  }, [info]);

  const loadPositionInfo = async (position : Position) => {
    const piData:Record<Position['id'], PositionInfo> = info ?? {};
    const positionInfo = await position.amm.getPositionInformation(position);
    piData[position.id] = positionInfo;
    setInfo(piData);
  }

  const value = positions ? {
    info: info,
    positions: storedPositions,
    healthCounters,
    totalNotional,
    totalMargin,
    totalAccruedCashflow,
    netReceivingRate,
    netPayingRate,
  } : {} as unknown as PortfolioContext;

  return <portfolioContext.Provider value={value}>{children}</portfolioContext.Provider>;
};

export const usePortfolioContext = (): PortfolioContext => {
  return useContext(portfolioContext);
};

export default PositionProvider;