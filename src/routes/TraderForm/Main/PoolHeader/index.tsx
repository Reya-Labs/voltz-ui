import { LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

import {
  selectFixedRateInfo,
  selectSwapFormAMM,
  selectVariableRateInfo,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { formatTimestamp } from '../../../../utilities/date';
import { formatNumber } from '../../../../utilities/number';
import { MarketTokenInformation, MarketTokenInformationProps } from '../../MarketTokenInformation';
import {
  FixedBox,
  MarketTokenInformationBox,
  MaturityBox,
  PoolHeaderBox,
  PoolHeaderDetailsBox,
  VariableBox,
} from './PoolHeader.styled';

type PoolHeaderProps = {};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = () => {
  const aMM = useAppSelector(selectSwapFormAMM);
  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  if (!aMM) {
    return null;
  }

  // TODO Alex
  return (
    <PoolHeaderBox>
      <MarketTokenInformationBox>
        <MarketTokenInformation
          isAaveV3={aMM.market.tags.isAaveV3}
          isBorrowing={aMM.market.tags.isBorrowing}
          market={aMM.market.name as MarketTokenInformationProps['market']}
          token={aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token']}
        />
      </MarketTokenInformationBox>
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
            tooltip="Variable rate and the change during the last 24hs in absolute value."
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
