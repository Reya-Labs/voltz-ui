import { LabelTokenTypography, MarketToken } from 'brokoli-ui';
import React from 'react';

import { selectFixedRateInfo, selectVariableRateInfo } from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { useSwapFormAMM } from '../../../../hooks/useSwapFormAMM';
import { formatTimestamp } from '../../../../utilities/date';
import { formatNumber } from '../../../../utilities/number';
import {
  FixedBox,
  MaturityBox,
  PoolHeaderBox,
  PoolHeaderDetailsBox,
  VariableBox,
} from './PoolHeader.styled';

type PoolHeaderProps = {};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = () => {
  const { aMM } = useSwapFormAMM();
  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);

  return (
    <PoolHeaderBox>
      <MarketToken market="Aave" token="usdc" />
      <PoolHeaderDetailsBox>
        <FixedBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Fixed"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token="%"
            typographyToken="secondaryBodyMediumBold"
            value={fixedRateInfo.status !== 'success' ? '--' : formatNumber(fixedRateInfo.value)}
          />
        </FixedBox>
        <VariableBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            // differenceValue={-2} //TODO Alex
            label="Variable"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token="%"
            tooltip="TODO: Missing tooltip"
            typographyToken="secondaryBodyMediumBold"
            value={
              variableRateInfo.status !== 'success' ? '--' : formatNumber(variableRateInfo.value)
            }
          />
        </VariableBox>
        <MaturityBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Maturity"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token=""
            typographyToken="secondaryBodyMediumBold"
            value={aMM ? formatTimestamp(aMM.termEndTimestampInMS) : '--'}
          />
        </MaturityBox>
      </PoolHeaderDetailsBox>
    </PoolHeaderBox>
  );
};
