import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { PoolUI } from '../../../../../app/features/aMMs/types';
import {
  selectAMMMaturityFormatted,
  selectFixedRateValueFormatted,
  selectLpFormAMM,
  selectVariableRate24hDelta,
  selectVariableRateValueFormatted,
} from '../../../../../app/features/lp-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { routes } from '../../../../../routes/paths';
import { MarketTokenInformationProps } from '../../../../components/MarketTokenInformation';
import { PoolHeader as PoolHeaderComponent } from '../../../../components/PoolHeader';

type PoolHeaderProps = {};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = () => {
  const aMM = useAppSelector(selectLpFormAMM);
  const variableRate24hDelta = useAppSelector(selectVariableRate24hDelta);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const fixedRateFormatted = useAppSelector(selectFixedRateValueFormatted);
  const variableRateFormatted = useAppSelector(selectVariableRateValueFormatted);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!aMM) {
    return null;
  }
  const isAaveV3 = aMM.market.tags.isAaveV3;
  const isV2 = aMM.market.tags.isV2;
  const isBorrowing = aMM.market.tags.isBorrowing;
  const market = aMM.market.name as MarketTokenInformationProps['market'];
  const token = aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token'];

  const handleOnPoolItemClick = ({ routePoolId, routeAmmId }: PoolUI) => {
    // dispatch(resetStateAction());
    const path = generatePath(routes.LP_FORM, {
      form: 'liquidity',
      ammId: routeAmmId,
      poolId: routePoolId,
    });
    navigate(`/${path}`);
  };

  return (
    <PoolHeaderComponent
      aMMMaturity={aMMMaturity}
      fixedRateFormatted={fixedRateFormatted}
      id={aMM.id}
      isAaveV3={isAaveV3}
      isBorrowing={isBorrowing}
      isV2={isV2}
      market={market}
      token={token}
      variableRate24hDelta={variableRate24hDelta}
      variableRateFormatted={variableRateFormatted}
      onPoolItemClick={handleOnPoolItemClick}
    />
  );
};
