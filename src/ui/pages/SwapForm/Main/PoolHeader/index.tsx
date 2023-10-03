import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import { MAX_POOL_CAP, selectPoolsUI } from '../../../../../app/features/aMMs';
import { PoolUI } from '../../../../../app/features/aMMs/types';
import {
  resetStateAction,
  selectFixedRateValueFormatted,
  selectPoolMaturityFormatted,
  selectSwapFormPool,
  selectVariableRate24hDelta,
  selectVariableRateValueFormatted,
} from '../../../../../app/features/forms/trader/swap';
import { MarketTokenInformationProps } from '../../../../components/MarketTokenInformation';
import { PoolHeader as PoolHeaderComponent } from '../../../../components/PoolHeader';
import { useAppNavigate } from '../../../../hooks/useAppNavigate';

type PoolHeaderProps = {};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = () => {
  const pool = useAppSelector(selectSwapFormPool);
  const variableRate24hDelta = useAppSelector(selectVariableRate24hDelta);
  const poolMaturity = useAppSelector(selectPoolMaturityFormatted);
  const fixedRateFormatted = useAppSelector(selectFixedRateValueFormatted);
  const variableRateFormatted = useAppSelector(selectVariableRateValueFormatted);
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const pools = useAppSelector(selectPoolsUI);

  if (!pool) {
    return null;
  }
  const isAaveV3 = pool.market === 'Aave V3';
  const isBorrowing = pool.isBorrowing;
  const market = pool.market as MarketTokenInformationProps['market'];
  const token = pool.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token'];

  const handleOnPoolItemClick = ({ routePoolId, routeAmmId }: PoolUI) => {
    dispatch(resetStateAction());
    navigate.toDeprecatedSwapFormPage({
      ammId: routeAmmId,
      poolId: routePoolId,
    });
  };
  return (
    <PoolHeaderComponent
      chainId={pool.chainId}
      fixedRateFormatted={fixedRateFormatted}
      isAaveV3={isAaveV3}
      isBorrowing={isBorrowing}
      isV2={false}
      market={market}
      poolCap={MAX_POOL_CAP}
      poolMaturity={poolMaturity}
      pools={pools.filter((p) => p.id !== pool.id)}
      token={token}
      variableRate24hDelta={variableRate24hDelta}
      variableRateFormatted={variableRateFormatted}
      onPoolItemClick={handleOnPoolItemClick}
    />
  );
};
