import React from 'react';

import {
  selectAMMMaturityFormatted,
  selectFixedRateValueFormatted,
  selectLpFormAMM,
  selectVariableRate24hDelta,
  selectVariableRateValueFormatted,
} from '../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../app/hooks';
import { MarketTokenInformationProps } from '../../../../components/MarketTokenInformation';
import { PoolHeader as PoolHeaderComponent } from '../../../../components/PoolHeader';

type PoolHeaderProps = {};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = () => {
  const aMM = useAppSelector(selectLpFormAMM);
  const variableRate24hDelta = useAppSelector(selectVariableRate24hDelta);
  const aMMMaturity = useAppSelector(selectAMMMaturityFormatted);
  const fixedRateFormatted = useAppSelector(selectFixedRateValueFormatted);
  const variableRateFormatted = useAppSelector(selectVariableRateValueFormatted);

  if (!aMM) {
    return null;
  }
  const isAaveV3 = aMM.market.tags.isAaveV3;
  const isBorrowing = aMM.market.tags.isBorrowing;
  const market = aMM.market.name as MarketTokenInformationProps['market'];
  const token = aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token'];

  return (
    <PoolHeaderComponent
      aMMMaturity={aMMMaturity}
      fixedRateFormatted={fixedRateFormatted}
      isAaveV3={isAaveV3}
      isBorrowing={isBorrowing}
      market={market}
      token={token}
      variableRate24hDelta={variableRate24hDelta}
      variableRateFormatted={variableRateFormatted}
    />
  );
};
