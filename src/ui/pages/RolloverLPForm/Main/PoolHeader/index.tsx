import React from 'react';

import { selectPoolsOnCurrentChain } from '../../../../../app/features/aMMs';
import { PoolUI } from '../../../../../app/features/aMMs/types';
import {
  resetStateAction,
  selectAMMMaturityFormatted,
  selectFixedRateValueFormatted,
  selectRolloverLpFormAMM,
  selectVariableRate24hDelta,
  selectVariableRateValueFormatted,
} from '../../../../../app/features/forms/lps/rollover-lp';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useAppNavigate } from '../../../../../hooks/useAppNavigate';
import { MarketTokenInformationProps } from '../../../../components/MarketTokenInformation';
import { PoolHeader as PoolHeaderComponent } from '../../../../components/PoolHeader';

type PoolHeaderProps = {};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = () => {
  const aMM = useAppSelector(selectRolloverLpFormAMM);
  const variableRate24hDelta = useAppSelector(selectVariableRate24hDelta);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const fixedRateFormatted = useAppSelector(selectFixedRateValueFormatted);
  const variableRateFormatted = useAppSelector(selectVariableRateValueFormatted);
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const pools = useAppSelector(selectPoolsOnCurrentChain);

  if (!aMM) {
    return null;
  }
  const isAaveV3 = aMM.market.tags.isAaveV3;
  const isV2 = aMM.market.tags.isV2;
  const isBorrowing = aMM.market.tags.isBorrowing;
  const market = aMM.market.name as MarketTokenInformationProps['market'];
  const token = aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token'];

  const handleOnPoolItemClick = ({ routePoolId, routeAmmId }: PoolUI) => {
    dispatch(resetStateAction());
    navigate.toLPFormPage({
      ammId: routeAmmId,
      poolId: routePoolId,
    });
  };

  return (
    <PoolHeaderComponent
      aMMMaturity={aMMMaturity}
      fixedRateFormatted={fixedRateFormatted}
      isAaveV3={isAaveV3}
      isBorrowing={isBorrowing}
      isV2={isV2}
      market={market}
      poolCap={1000000}
      pools={pools.filter((p) => p.id !== aMM.id)}
      token={token}
      variableRate24hDelta={variableRate24hDelta}
      variableRateFormatted={variableRateFormatted}
      onPoolItemClick={handleOnPoolItemClick}
    />
  );
};
