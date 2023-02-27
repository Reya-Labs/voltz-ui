import { LabelTokenTypography, MarketToken, Pill } from 'brokoli-ui';
import React from 'react';

import { selectChainId } from '../../../../app/features/network';
import { selectFixedRateInfo, selectVariableRateInfo } from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { useSwapFormAMM } from '../../../../hooks/useSwapFormAMM';
import { getConfig } from '../../../../hooks/voltz-config/config';
import { isAaveV3, isBorrowing } from '../../../../utilities/amm';
import { formatTimestamp } from '../../../../utilities/date';
import { formatNumber } from '../../../../utilities/number';
import {
  FixedBox,
  MarketTokenBox,
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
  const chainId = useAppSelector(selectChainId);
  if (!aMM) {
    return null;
  }

  return (
    <PoolHeaderBox>
      <MarketTokenBox>
        <MarketToken market="Aave" token="usdc" />
        {isBorrowing(aMM?.rateOracle?.protocolId) ? (
          <Pill colorToken="wildStrawberry" typographyToken="primaryBodySmallRegular">
            Borrow
          </Pill>
        ) : null}
        {isAaveV3(getConfig(chainId)?.pools || [], aMM?.id) ? (
          <Pill colorToken="wildStrawberry" typographyToken="primaryBodySmallRegular">
            v3
          </Pill>
        ) : null}
      </MarketTokenBox>
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
