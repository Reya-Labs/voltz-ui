import { useAMM } from '@hooks';
import { AMM, Position } from '@voltz-protocol/v1-sdk';
import { createContext, useContext } from 'react';

export type PositionProviderProps = {
  position?: Position;
};

export type PositionContextPopulated = ReturnType<typeof useAMM> & {
  amm: AMM;
  position: Position;
};

export type PositionContext = Partial<PositionContextPopulated>;

const positionCtx = createContext<PositionContext>({} as unknown as PositionContext);
positionCtx.displayName = 'PositionContext';

export const PositionProvider: React.FunctionComponent<PositionProviderProps> = ({
  children,
  position,
}) => {
  const amm = (position?.amm as AMM) || undefined;
  const ammFuncs = useAMM(amm);

  const value = position
    ? {
        amm,
        position,
        ...ammFuncs,
      }
    : ({} as unknown as PositionContext);

  return <positionCtx.Provider value={value}>{children}</positionCtx.Provider>;
};

export const usePositionContext = (): PositionContext => {
  return useContext(positionCtx);
};

export default PositionProvider;
